import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({ title, variant = 'primary', loading = false, style, disabled, ...rest }: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';

  const getBackgroundColor = () => {
    if (disabled) return '#94a3b8';
    switch (variant) {
      case 'primary': return Colors[colorScheme].tint;
      case 'secondary': return colorScheme === 'dark' ? '#333' : '#f1f5f9';
      case 'outline': return 'transparent';
      default: return Colors[colorScheme].tint;
    }
  };

  const getTextColor = () => {
    if (disabled) return '#f1f5f9';
    switch (variant) {
      case 'primary': return '#fff';
      case 'secondary': return Colors[colorScheme].text;
      case 'outline': return Colors[colorScheme].tint;
      default: return '#fff';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor(), borderColor: variant === 'outline' ? Colors[colorScheme].tint : 'transparent', borderWidth: variant === 'outline' ? 1 : 0 },
        style,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText style={{ color: getTextColor(), fontWeight: 'bold' }}>{title}</ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
