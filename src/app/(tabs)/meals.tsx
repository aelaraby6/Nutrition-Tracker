import MealItem from '@/components/MealItem';
import { clearAllMeals, getMeals, Meal } from '@/storage/meals';
import { getGlobalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import * as Haptics from 'expo-haptics';

export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { colors } = useTheme();
  const globalStyles = getGlobalStyles(colors);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  const handleClearAll = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Clear All Meals',
      'Are you sure you want to delete all logged meals? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearAllMeals();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            loadMeals();
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[globalStyles.container, { paddingBottom: 40 }]}
    >
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        {meals.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.6}>
            <Text style={[styles.clearButton, { color: colors.alert }]}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={[globalStyles.empty, { color: colors.textSecondary }]}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={loadMeals}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    fontSize: 15,
    fontWeight: '600',
  },
});