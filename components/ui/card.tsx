import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedView } from '../themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView
      style={[
        styles.card,
        {
          shadowColor: Colors[colorScheme].tint,
          backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
          borderColor: colorScheme === 'dark' ? '#374151' : '#e2e8f0',
        },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
});
