import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import {
  cancelMealReminders,
  requestPermissions,
  scheduleMealReminders,
} from '@/utils/notifications';

const REMINDERS_KEY = 'remindersEnabled';

export default function ReminderToggle() {
  const [enabled, setEnabled] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const load = async () => {
      const val = await AsyncStorage.getItem(REMINDERS_KEY);
      setEnabled(val === 'true');
    };
    load();
  }, []);

  const toggle = async (value: boolean) => {
    if (value) {
      const granted = await requestPermissions();
      if (!granted) return;
      await scheduleMealReminders();
    } else {
      await cancelMealReminders();
    }
    setEnabled(value);
    await AsyncStorage.setItem(REMINDERS_KEY, value.toString());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }, colors.cardShadow]}>
      <View style={styles.leftCol}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.primaryLighter }]}>
          <Ionicons name="notifications-outline" size={18} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.label, { color: colors.text }]}>Meal Reminders</Text>
          <Text style={[styles.subLabel, { color: colors.textSecondary }]}>Get notified to log your meals</Text>
        </View>
      </View>
      <Switch
        value={enabled}
        onValueChange={toggle}
        trackColor={{ false: colors.surface, true: colors.primary }}
        thumbColor={enabled ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  subLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});