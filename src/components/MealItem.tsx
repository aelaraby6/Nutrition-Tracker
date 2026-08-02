import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteMeal } from '@/storage/meals';
import { useTheme } from '@/context/ThemeContext';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { macroColors } from '@/styles/theme';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
}: MealItemProps) {
  const { colors } = useTheme();

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Delete Meal', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onDelete();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }, colors.cardShadow]}>
      <View style={styles.leftCol}>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <View style={styles.macroRow}>
          <Text style={[styles.macroTag, { color: macroColors.protein }]}>{protein}g <Text style={{ color: colors.textSecondary, fontWeight: '400', fontSize: 10 }}>P</Text></Text>
          <Text style={styles.dot}>•</Text>
          <Text style={[styles.macroTag, { color: macroColors.carbs }]}>{carbs}g <Text style={{ color: colors.textSecondary, fontWeight: '400', fontSize: 10 }}>C</Text></Text>
          <Text style={styles.dot}>•</Text>
          <Text style={[styles.macroTag, { color: macroColors.fat }]}>{fat}g <Text style={{ color: colors.textSecondary, fontWeight: '400', fontSize: 10 }}>F</Text></Text>
        </View>
      </View>
      <View style={styles.rightCol}>
        <View style={[styles.calorieBadge, { backgroundColor: colors.primaryLighter }]}>
          <Text style={[styles.calorieText, { color: colors.primary }]}>{calories} kcal</Text>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton} activeOpacity={0.6}>
          <Ionicons name="trash-outline" size={18} color={colors.alert} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  leftCol: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  macroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  macroTag: {
    fontSize: 12,
    fontWeight: '700',
  },
  dot: {
    color: '#94A3B8',
    fontSize: 10,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  calorieBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  calorieText: {
    fontSize: 13,
    fontWeight: '700',
  },
  deleteButton: {
    padding: 4,
  },
});