import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { Design } from '@/constants/Design';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AvatarGroup } from './AvatarGroup';

interface PlanCardProps {
  image: string;
  category: string;
  categoryIcon: any;
  distance: string;
  title: string;
  date: string;
  participants: string[];
  extraParticipants?: number;
  seats: number;
  maxSeats: number;
  isLastSeat?: boolean;
}

export function PlanCard({
  image,
  category,
  categoryIcon,
  distance,
  title,
  date,
  participants,
  extraParticipants,
  seats,
  maxSeats,
  isLastSeat,
}: PlanCardProps) {
  const [joined, setJoined] = useState(false);
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[
        styles.cardContainer,
        isDark ? styles.cardContainerDark : styles.cardContainerLight
    ]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />

        {/* Favorite Button */}
        <BlurView intensity={20} tint="light" style={styles.favoriteButton}>
           <IconSymbol name="heart" size={24} color={Design.colors.white} />
        </BlurView>

        {/* Content Overlay */}
        <View style={styles.overlayContent}>
          <View style={styles.tagsRow}>
            <BlurView intensity={30} tint="dark" style={styles.categoryTag}>
               <IconSymbol name={categoryIcon} size={14} color={Design.colors.slate900} />
               <Text style={styles.categoryText}>{category}</Text>
            </BlurView>
             <BlurView intensity={30} tint="dark" style={styles.distanceTag}>
               <Text style={styles.distanceText}>{distance}</Text>
            </BlurView>
          </View>

          <Text style={styles.title}>{title}</Text>
          <View style={styles.dateRow}>
             <IconSymbol name="calendar" size={16} color="rgba(255,255,255,0.9)" />
             <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.participantsRow}>
           <AvatarGroup images={participants} extraCount={extraParticipants} />
           <View style={styles.seatsContainer}>
              {isLastSeat && <Text style={styles.lastSeatText}>¡Última plaza!</Text>}
              <Text style={[styles.seatsText, isDark ? styles.seatsTextDark : styles.seatsTextLight]}>
                  {seats} <Text style={styles.maxSeatsText}>/ {maxSeats}</Text>
              </Text>
           </View>
        </View>

        <Pressable
          style={[
              styles.joinButton,
              isDark ? styles.joinButtonDark : styles.joinButtonLight,
              joined && styles.joinedButton
          ]}
          onPress={() => setJoined(!joined)}
        >
           {joined ? (
             <View style={styles.joinedContent}>
                <IconSymbol name="checkmark.circle" size={20} color={Design.colors.white} />
                <Text style={styles.joinedText}>¡Apuntado!</Text>
             </View>
           ) : (
             <View style={styles.joinedContent}>
                <Text style={[styles.joinText, isDark ? styles.joinTextDark : styles.joinTextLight]}>
                    Unirme al plan
                </Text>
             </View>
           )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Design.borderRadius.xxxl,
    overflow: 'hidden',
    marginBottom: 32,
    ...Design.shadows.card,
    borderWidth: 1,
  },
  cardContainerLight: {
    backgroundColor: Design.colors.white,
    borderColor: Design.colors.slate100,
  },
  cardContainerDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-800/50
    borderColor: 'rgba(51, 65, 85, 0.5)', // slate-700/50
  },
  imageContainer: {
    height: 288,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 255, 229, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Design.borderRadius.xl,
    overflow: 'hidden',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Design.colors.slate900,
  },
  distanceTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Design.borderRadius.xl,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '500',
    color: Design.colors.white,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Design.colors.white,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  detailsContainer: {
    padding: 24,
    paddingTop: 20,
  },
  participantsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  seatsContainer: {
    alignItems: 'flex-end',
  },
  seatsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seatsTextLight: {
    color: Design.colors.slate900,
  },
  seatsTextDark: {
    color: Design.colors.white,
  },
  maxSeatsText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Design.colors.slate400,
  },
  lastSeatText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Design.colors.orange500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  joinButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: Design.borderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Design.shadows.card,
  },
  joinButtonLight: {
      backgroundColor: Design.colors.slate900,
  },
  joinButtonDark: {
      backgroundColor: Design.colors.white,
  },
  joinedButton: {
    backgroundColor: '#10b981', // emerald-500
  },
  joinText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinTextLight: {
      color: Design.colors.white,
  },
  joinTextDark: {
      color: Design.colors.slate900,
  },
  joinedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  joinedText: {
     color: Design.colors.white,
     fontSize: 16,
     fontWeight: 'bold',
  }
});
