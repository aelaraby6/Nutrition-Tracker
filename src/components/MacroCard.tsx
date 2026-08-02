import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function MacroCard({
  label,
  value,
  goal,
  color,
}: MacroCardProps) {
  const { colors } = useTheme();

  // Parse values to calculate progress percentage
  const numValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const numGoal = parseFloat(goal.replace(/[^0-9.]/g, '')) || 0;
  const progressRatio = numGoal > 0 ? numValue / numGoal : 0;
  const percentage = Math.min(progressRatio, 1);
  const displayPercentage = Math.round(progressRatio * 100);

  // Get matching icon based on label
  let iconName: any = 'flame';
  if (label.toLowerCase().includes('protein')) {
    iconName = 'barbell-outline';
  } else if (label.toLowerCase().includes('carb')) {
    iconName = 'nutrition-outline';
  } else if (label.toLowerCase().includes('fat')) {
    iconName = 'water-outline';
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, colors.cardShadow]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconContainer, { backgroundColor: color + '1A' }]}>
          <Ionicons name={iconName} size={18} color={color} />
        </View>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      </View>

      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.goal, { color: colors.textSecondary }]}>/ {goal}</Text>
      </View>

      <View style={styles.progressSection}>
        <View style={[styles.progressBarTrack, { backgroundColor: colors.surface }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                backgroundColor: color, 
                width: `${percentage * 100}%` 
              }
            ]} 
          />
        </View>
        <Text style={[styles.percentText, { color: colors.textSecondary }]}>
          {displayPercentage}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    width: '48%',
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  valueContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  goal: {
    fontSize: 12,
  },
  progressSection: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentText: {
    fontSize: 11,
    fontWeight: '700',
    minWidth: 26,
    textAlign: 'right',
  },
});