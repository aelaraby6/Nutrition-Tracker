import { addMeal } from '@/storage/meals';
import { getGlobalStyles } from '@/styles/global';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { macroColors } from '@/styles/theme';

export default function AddMealScreen() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { colors } = useTheme();
  const globalStyles = getGlobalStyles(colors);

  const handleAddMeal = async () => {
    if (!name || !calories) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Please enter a meal name and calories.');
      return;
    }

    await addMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });

    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Success', 'Meal added successfully!');
    router.push('/');
  };

  const getInputStyle = (fieldId: string) => [
    styles.input,
    {
      backgroundColor: colors.card,
      borderColor: focusedField === fieldId ? colors.primary : colors.border,
      color: colors.text,
    }
  ];

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[globalStyles.container, { paddingBottom: 40 }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={globalStyles.title}>Add Meal</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Log what you ate to keep track of your daily macros.</Text>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Meal Details</Text>
        
        <View style={styles.inputWrapper}>
          <TextInput
            style={getInputStyle('name')}
            placeholder='Meal name (e.g. Grilled Chicken Salad)'
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            selectionColor={colors.primary}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={getInputStyle('calories')}
            placeholder='Calories (kcal)'
            placeholderTextColor={colors.textSecondary}
            keyboardType='numeric'
            value={calories}
            onChangeText={setCalories}
            onFocus={() => setFocusedField('calories')}
            onBlur={() => setFocusedField(null)}
            selectionColor={colors.primary}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Macros (Optional)</Text>
        
        <View style={styles.row}>
          <View style={styles.rowInputWrapper}>
            <Text style={[styles.macroMiniLabel, { color: macroColors.protein }]}>PROTEIN</Text>
            <TextInput
              style={getInputStyle('protein')}
              placeholder='0g'
              placeholderTextColor={colors.textSecondary}
              keyboardType='numeric'
              value={protein}
              onChangeText={setProtein}
              onFocus={() => setFocusedField('protein')}
              onBlur={() => setFocusedField(null)}
              selectionColor={colors.primary}
            />
          </View>

          <View style={styles.rowInputWrapper}>
            <Text style={[styles.macroMiniLabel, { color: macroColors.carbs }]}>CARBS</Text>
            <TextInput
              style={getInputStyle('carbs')}
              placeholder='0g'
              placeholderTextColor={colors.textSecondary}
              keyboardType='numeric'
              value={carbs}
              onChangeText={setCarbs}
              onFocus={() => setFocusedField('carbs')}
              onBlur={() => setFocusedField(null)}
              selectionColor={colors.primary}
            />
          </View>

          <View style={styles.rowInputWrapper}>
            <Text style={[styles.macroMiniLabel, { color: macroColors.fat }]}>FAT</Text>
            <TextInput
              style={getInputStyle('fat')}
              placeholder='0g'
              placeholderTextColor={colors.textSecondary}
              keyboardType='numeric'
              value={fat}
              onChangeText={setFat}
              onFocus={() => setFocusedField('fat')}
              onBlur={() => setFocusedField(null)}
              selectionColor={colors.primary}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.primary }]} 
        onPress={handleAddMeal}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={20} color="#ffffff" style={{ marginRight: 4 }} />
        <Text style={styles.buttonText}>Log Meal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 24,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  macroMiniLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowInputWrapper: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});