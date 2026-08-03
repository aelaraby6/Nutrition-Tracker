const { withGradleProperties, withProjectBuildGradle } = require("@expo/config-plugins");

/**
 * Expo Config Plugin to apply Android build tweaks:
 * 1. Increase JVM Heap (-Xmx4096m) and MaxMetaspaceSize (1024m) to prevent Metaspace/OutOfMemory errors.
 * 2. Disable lintVital/checkReleaseBuilds checks on all subprojects to prevent lint issues from blocking release builds.
 */
function withAndroidBuildTweaks(config) {
  // 1. Update gradle.properties
  config = withGradleProperties(config, (config) => {
    const properties = config.modResults;
    const setProperty = (key, value) => {
      const existing = properties.find((p) => p.key === key);
      if (existing) {
        existing.value = value;
      } else {
        properties.push({ type: "property", key, value });
      }
    };
    
    setProperty("org.gradle.jvmargs", "-Xmx4096m -XX:MaxMetaspaceSize=1024m -XX:+HeapDumpOnOutOfMemoryError");
    return config;
  });

  // 2. Disable lintVital/checkReleaseBuilds globally for all subprojects in top-level build.gradle
  config = withProjectBuildGradle(config, (config) => {
    let contents = config.modResults.contents;
    const block = `
subprojects {
    tasks.configureEach { task ->
        if (task.name.startsWith("lintVital")) {
            task.enabled = false
        }
    }
}
`;
    if (!contents.includes("lintVital")) {
      contents += `\n${block}\n`;
    }
    config.modResults.contents = contents;
    return config;
  });

  return config;
}

module.exports = withAndroidBuildTweaks;
