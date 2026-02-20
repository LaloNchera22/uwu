import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: "#00ffe5",
  primaryDark: "#00cccc", // Darker shade for contrast if needed
  backgroundLight: "#f5f8f8",
  backgroundDark: "#0f2321",
  surfaceLight: "#ffffff",
  surfaceDark: "#162e2b",
  neutralSoft: "#eef4f4",
  neutralDark: "#1a3835",
  textLight: "#0f172a", // slate-900
  textDark: "#f1f5f9", // slate-100
  textSubtleLight: "#94a3b8", // slate-400
  textSubtleDark: "#cbd5e1", // slate-300
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    background: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
    surface: isDark ? COLORS.surfaceDark : COLORS.surfaceLight,
    text: isDark ? COLORS.textDark : COLORS.textLight,
    textSubtle: isDark ? COLORS.textSubtleDark : COLORS.textSubtleLight,
    neutral: isDark ? COLORS.neutralDark : COLORS.neutralSoft,
    border: isDark ? '#1e293b' : '#f1f5f9', // slate-800 : slate-100
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.iconButton}>
            <IconSymbol name="arrow.left" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Mi Perfil</Text>
          <TouchableOpacity style={styles.iconButton}>
            <IconSymbol name="gearshape.fill" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <TouchableOpacity style={styles.editButton}>
             <IconSymbol name="square.and.pencil" size={20} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[COLORS.primary, '#67e8f9', '#99f6e4']} // primary, cyan-300, teal-200
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.avatarGradient}
              >
                <View style={[styles.avatarBorder, { borderColor: theme.surface }]}>
                  <Image
                    source="https://lh3.googleusercontent.com/aida-public/AB6AXuAkVp7xQ4j4w7unMG0JJpRM2RZ4cJdkQ6UJznO5yx31uRvCRVxGa-7FSkWZAgyL4i3R1YDtnp8LWGyXqcQBqcELn0CXtkADmYsaKc65Y1ENTnWe0YPENdV1ryI68krg8DiLYYewN6nPu7in25rtd_xluCWn8ey98xOmYeQXCSzHutq9UVDeA9FPHosiAlK8fL73beUafp94Ex6Rx4I3Nxxv9_2pBRlnKU70JjLIfnTrunuSQhR-1bKOH5BVDrXLoA8yK1OqWn4Jthg"
                    style={styles.avatarImage}
                    contentFit="cover"
                  />
                </View>
              </LinearGradient>
              <View style={[styles.onlineIndicator, { borderColor: theme.surface }]} />
            </View>

            <Text style={[styles.name, { color: theme.text }]}>Laura García</Text>

            <View style={styles.handleContainer}>
              <Text style={[styles.handle, { color: theme.textSubtle }]}>@laura_g</Text>
              <View style={[styles.dot, { backgroundColor: isDark ? '#475569' : '#cbd5e1' }]} />
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>142</Text>
                <Text style={styles.statLabel}>Amigos</Text>
              </View>
              <View style={[styles.verticalDivider, { backgroundColor: theme.border }]} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>28</Text>
                <Text style={styles.statLabel}>Eventos</Text>
              </View>
              <View style={[styles.verticalDivider, { backgroundColor: theme.border }]} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>

            <Text style={[styles.bio, { color: isDark ? '#cbd5e1' : '#475569' }]}>
              Amante del café de especialidad y las caminatas urbanas. Buscando gente para jugar pádel los fines de semana. 🎾☕️
            </Text>
          </View>
        </View>

        {/* Vibe Check */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <IconSymbol name="wand.and.stars" size={24} color={COLORS.primary} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>Vibe Check</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editLink}>EDITAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            <VibeCard
              icon="laptopcomputer"
              title="Techie"
              subtitle="Gadgets & Code"
              emoji="💻"
              color={COLORS.primary}
              theme={theme}
            />
            <VibeCard
              icon="tennis.racket"
              title="Deportista"
              subtitle="Pádel Lover"
              emoji="🎾"
              color="#4ade80" // green-400
              theme={theme}
            />
            <VibeCard
              icon="cup.and.saucer.fill"
              title="Cafetero"
              subtitle="Specialty Coffee"
              emoji="☕️"
              color="#b45309" // amber-700
              theme={theme}
            />
            <VibeCard
              icon="popcorn.fill"
              title="Cinéfilo"
              subtitle="Movies & Chill"
              emoji="🎬"
              color="#a855f7" // purple-500
              theme={theme}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, marginBottom: 100 }]}>
          <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 16 }]}>Preferencias</Text>

          <View style={styles.preferencesList}>
            <View style={[styles.preferenceItem, { backgroundColor: isDark ? 'rgba(30, 41, 59, 0.3)' : '#f8fafc' }]}>
              <View style={styles.preferenceLeft}>
                <IconSymbol name="person.3.fill" size={20} color="#94a3b8" />
                <Text style={[styles.preferenceLabel, { color: isDark ? '#e2e8f0' : '#334155' }]}>Grupos pequeños</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: isDark ? 'rgba(20, 83, 45, 0.3)' : '#dcfce7' }]}>
                <Text style={[styles.tagText, { color: isDark ? '#86efac' : '#15803d' }]}>Max 4</Text>
              </View>
            </View>

            <View style={[styles.preferenceItem, { backgroundColor: isDark ? 'rgba(30, 41, 59, 0.3)' : '#f8fafc' }]}>
              <View style={styles.preferenceLeft}>
                <IconSymbol name="calendar" size={20} color="#94a3b8" />
                <Text style={[styles.preferenceLabel, { color: isDark ? '#e2e8f0' : '#334155' }]}>Disponibilidad</Text>
              </View>
              <Text style={styles.preferenceValue}>Fines de semana</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function VibeCard({ icon, title, subtitle, emoji, color, theme }: any) {
  return (
    <View style={[styles.vibeCard, { backgroundColor: theme.neutral }]}>
      <View style={[styles.emojiContainer, { backgroundColor: theme.surface }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View>
        <Text style={[styles.vibeTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.vibeSubtitle, { color: theme.textSubtle }]}>{subtitle}</Text>
      </View>
      {/* Decorative blur effect simulation */}
      <View style={[styles.vibeDecor, { backgroundColor: color, opacity: 0.1 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: 'transparent', // Let background show through if needed, or set consistent
    zIndex: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradient: {
    width: 112,
    height: 112,
    borderRadius: 56,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBorder: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0', // slate-200
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ade80', // green-400
    borderWidth: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  handleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  handle: {
    fontSize: 14,
    fontWeight: '500',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  premiumBadge: {
    backgroundColor: 'rgba(0, 255, 229, 0.1)', // primary/10
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00cccc', // darker primary
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  verticalDivider: {
    width: 1,
    height: 32,
  },
  bio: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 280,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vibeCard: {
    width: '48%', // Approx half with gap
    borderRadius: 16,
    padding: 12,
    gap: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  emojiContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  emoji: {
    fontSize: 20,
  },
  vibeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  vibeSubtitle: {
    fontSize: 10,
  },
  vibeDecor: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    width: 64,
    height: 64,
    borderRadius: 32,
    zIndex: -1,
  },
  preferencesList: {
    gap: 12,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  preferenceValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b', // slate-500
  },
});
