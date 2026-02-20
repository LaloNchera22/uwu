import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, useColorScheme } from 'react-native';
import { Design } from '@/constants/Design';

interface FilterPillProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function FilterPill({ label, isActive, onPress, style }: FilterPillProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isActive
          ? (isDark ? styles.activeContainerDark : styles.activeContainer)
          : (isDark ? styles.inactiveContainerDark : styles.inactiveContainer),
        style,
      ]}>
      <Text style={[
        styles.text,
        isActive
          ? (isDark ? styles.activeTextDark : styles.activeText)
          : (isDark ? styles.inactiveTextDark : styles.inactiveText)
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Design.borderRadius.full,
    marginRight: 12,
  },
  activeContainer: {
    backgroundColor: Design.colors.slate900,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  activeContainerDark: {
    backgroundColor: Design.colors.slate100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  inactiveContainer: {
    backgroundColor: Design.colors.white,
    borderWidth: 1,
    borderColor: Design.colors.slate200,
  },
  inactiveContainerDark: {
    backgroundColor: Design.colors.slate800,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // slightly visible border
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: Design.colors.white,
  },
  activeTextDark: {
    color: Design.colors.slate900,
  },
  inactiveText: {
    color: Design.colors.slate500,
  },
  inactiveTextDark: {
    color: Design.colors.slate400,
  },
});
