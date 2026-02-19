import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AvatarProps {
  source?: { uri: string };
  initials?: string;
  size?: number;
}

export function Avatar({ source, initials, size = 48 }: AvatarProps) {
  const colorScheme = useColorScheme() ?? 'light';

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Colors[colorScheme].tint,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    text: {
      color: '#fff',
      fontSize: size / 2.5,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <ThemedText style={styles.text}>{initials?.substring(0, 2).toUpperCase()}</ThemedText>
      )}
    </View>
  );
}
