import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Design } from '@/constants/Design';

interface AvatarGroupProps {
  images: string[];
  extraCount?: number;
}

export function AvatarGroup({ images, extraCount }: AvatarGroupProps) {
  const isDark = useColorScheme() === 'dark';
  const borderColor = isDark ? Design.colors.slate800 : Design.colors.white;
  const extraBgColor = isDark ? 'rgba(51, 65, 85, 0.5)' : Design.colors.slate100; // slate-700/50 approx
  const extraTextColor = isDark ? Design.colors.slate400 : Design.colors.slate500;

  return (
    <View style={styles.container}>
      {images.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={[
            styles.avatar,
            {
                zIndex: images.length - index,
                marginLeft: index > 0 ? -12 : 0,
                borderColor: borderColor
            },
          ]}
        />
      ))}
      {extraCount !== undefined && extraCount > 0 && (
        <View style={[
            styles.extraContainer,
            {
                marginLeft: -12,
                zIndex: 0,
                borderColor: borderColor,
                backgroundColor: extraBgColor
            }
        ]}>
          <Text style={[styles.extraText, { color: extraTextColor }]}>+{extraCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    // borderColor set dynamically
  },
  extraContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor and backgroundColor set dynamically
  },
  extraText: {
    fontSize: 12,
    fontWeight: 'bold',
    // color set dynamically
  },
});
