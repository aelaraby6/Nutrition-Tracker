import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { getMeals, Meal } from '@/storage/meals';
import { getGlobalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Pressable } from 'react-native';
import ShareButton from '@/components/ShareButton';
import CopyButton from '@/components/CopyButton';
import ReminderToggle from '@/components/ReminderToggle';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { colors, theme, toggleTheme } = useTheme();
  const globalStyles = getGlobalStyles(colors);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  const handleThemeToggle = async () => {
    await toggleTheme();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[globalStyles.container, { paddingBottom: 40 }]}
    >
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Nutrition-Tracker</Text>
        <View style={styles.headerActions}>
          <Pressable 
            onPress={handleThemeToggle} 
            style={({ pressed }) => [
              styles.actionButton, 
              { backgroundColor: colors.surface },
              pressed && styles.buttonPressed
            ]}
          >
            <Ionicons 
              name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} 
              size={22} 
              color={colors.primary} 
            />
          </Pressable>
          <ShareButton meals={meals} />
        </View>
      </View>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <CopyButton meals={meals} />
      <ReminderToggle />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});