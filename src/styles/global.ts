import { StyleSheet } from 'react-native';
import { themes } from './theme';

// Legacy colors for compatibility
export const colors = themes.dark;

export const getGlobalStyles = (themeColors: typeof themes.dark) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.background,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: themeColors.text,
        letterSpacing: -0.5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: themeColors.text,
        marginTop: 32,
        marginBottom: 16,
    },
    empty: {
        color: themeColors.textSecondary,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
});

export const globalStyles = getGlobalStyles(themes.dark);
