import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeType } from '../styles/theme';

type ThemeContextType = {
  theme: ThemeType;
  isDark: boolean;
  colors: typeof themes.dark;
  toggleTheme: () => Promise<void>;
  setExplicitTheme: (theme: ThemeType) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'user_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const fallbackTheme: ThemeType = (systemScheme === 'light' || systemScheme === 'dark') ? systemScheme : 'dark';
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setTheme(savedTheme);
        } else {
          setTheme(fallbackTheme);
        }
      } catch (e) {
        console.error('Failed to load theme preference', e);
        setTheme(fallbackTheme);
      }
    };
    loadTheme();
  }, [fallbackTheme]);

  const toggleTheme = async () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  const setExplicitTheme = async (selected: ThemeType) => {
    setTheme(selected);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, selected);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  const currentColors = themes[theme];
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        colors: currentColors,
        toggleTheme,
        setExplicitTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
