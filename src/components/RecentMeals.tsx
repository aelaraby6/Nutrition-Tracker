import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/storage/meals';
import MealItem from './MealItem';
import { useTheme } from '@/context/ThemeContext';

type RecentMealsProps = {
  meals: Meal[];
  onDelete: () => void;
};

export default function RecentMeals({ meals, onDelete }: RecentMealsProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginTop: 32 }}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Meals</Text>
      {meals.length === 0 ? (
        <Text style={[styles.empty, { color: colors.textSecondary }]}>No meals logged today.</Text>
      ) : (
        meals
          .slice(0, 5)
          .map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={onDelete}
            />
          ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  empty: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});