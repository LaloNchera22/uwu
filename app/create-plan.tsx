import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  useColorScheme,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Colors from design reference
const COLORS = {
  primary: '#00ffe5',
  primaryDark: '#00cca7',
  backgroundLight: '#f5f8f8',
  backgroundDark: '#0f2321',
  surfaceLight: '#ffffff',
  surfaceDark: '#162e2b',
  neutralLight: '#e0f2f1',
  neutralDark: '#1e3835',
  textLight: '#0f172a', // slate-900
  textDark: '#f1f5f9', // slate-100
  textSecondaryLight: '#64748b', // slate-500
  textSecondaryDark: '#94a3b8', // slate-400
};

export default function CreatePlanScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [planTitle, setPlanTitle] = useState('Café y charla tranquila');
  const [groupSize, setGroupSize] = useState(4);

  const theme = {
    background: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
    surface: isDark ? COLORS.surfaceDark : COLORS.surfaceLight,
    neutral: isDark ? COLORS.neutralDark : COLORS.neutralLight,
    text: isDark ? COLORS.textDark : COLORS.textLight,
    textSecondary: isDark ? COLORS.textSecondaryDark : COLORS.textSecondaryLight,
    border: isDark ? COLORS.neutralDark : '#e2e8f0',
  };

  const categories = [
    { id: 'coffee', label: 'Café & Chill', icon: '☕' },
    { id: 'food', label: 'Comida Rica', icon: '🍕' },
    { id: 'drinks', label: 'Drinks', icon: '🍻' },
    { id: 'games', label: 'Juegos', icon: '🎲' },
  ];

  const suggestions = [
    'Café de especialidad ☕️',
    'Cena casual 🌮',
    'Paseo por el parque 🌳',
  ];

  const groupSizes = [
    { value: 2, label: 'Duo' },
    { value: 3, label: 'Trio' },
    { value: 4, label: 'Full' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background, borderColor: COLORS.primary + '1A' }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <MaterialIcons name="close" size={28} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Nuevo Plan</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, { backgroundColor: COLORS.primary }]} />
            <View style={[styles.progressDot, { backgroundColor: COLORS.primary + '4D' }]} />
            <View style={[styles.progressDot, { backgroundColor: COLORS.primary + '4D' }]} />
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="help-outline" size={28} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: Categories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>¿Qué vamos a hacer?</Text>
            </View>

            <View style={styles.grid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.card,
                    {
                      backgroundColor: theme.surface,
                      borderColor: selectedCategory === cat.id ? COLORS.primary : 'transparent',
                      borderWidth: 2,
                    }
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.cardIcon}>{cat.icon}</Text>
                  <Text style={[styles.cardLabel, { color: theme.text }]}>{cat.label}</Text>
                  {selectedCategory === cat.id && (
                    <View style={styles.checkIcon}>
                      <MaterialIcons name="check-circle" size={24} color={COLORS.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 2: Name it */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Ponle nombre</Text>
            </View>

            <View style={styles.suggestionsContainer}>
              <Text style={[styles.suggestionLabel, { color: theme.textSecondary }]}>SUGERENCIAS RÁPIDAS</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
                {suggestions.map((sug, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.suggestionChip, { backgroundColor: theme.neutral }]}
                    onPress={() => setPlanTitle(sug.replace(/ .*/, ''))}
                  >
                    <Text style={[styles.suggestionText, { color: theme.text }]}>{sug}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.surface }]}>
              <MaterialIcons name="edit" size={24} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={planTitle}
                onChangeText={setPlanTitle}
                placeholder="Escribe tu propio título..."
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          </View>

          {/* Section 3: Group Size */}
          <View style={[styles.section, { marginBottom: 100 }]}>
            <View style={styles.sectionHeader}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Tamaño del grupo</Text>
            </View>

            <View style={[styles.groupSizeContainer, { backgroundColor: theme.surface }]}>
              <View style={styles.groupSizeHeader}>
                <Text style={[styles.groupSizeLabel, { color: theme.textSecondary }]}>Incluyéndote a ti</Text>
                <View style={styles.maxBadge}>
                  <Text style={styles.maxBadgeText}>Max 4</Text>
                </View>
              </View>

              <View style={styles.groupSizeOptions}>
                {groupSizes.map((size) => (
                  <TouchableOpacity
                    key={size.value}
                    style={[
                      styles.sizeOption,
                      { backgroundColor: theme.neutral },
                      groupSize === size.value && {
                        backgroundColor: isDark ? COLORS.surfaceDark : COLORS.surfaceLight,
                        borderColor: COLORS.primary,
                        borderWidth: 2
                      }
                    ]}
                    onPress={() => setGroupSize(size.value)}
                  >
                    <Text style={[
                      styles.sizeValue,
                      { color: theme.textSecondary },
                      groupSize === size.value && { color: COLORS.primary }
                    ]}>
                      {size.value}
                    </Text>
                    <Text style={[
                      styles.sizeLabel,
                      { color: theme.textSecondary },
                      groupSize === size.value && { color: theme.text }
                    ]}>
                      {size.label}
                    </Text>
                    {groupSize === size.value && size.value === 4 && (
                       <View style={styles.pulseDot} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={[styles.groupSizeFooter, { color: theme.textSecondary }]}>Perfecto para conversaciones reales.</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: 'transparent' }]}>
        <View style={[styles.footerGradient, { backgroundColor: theme.background, opacity: 0.95 }]} />

        <View style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.summaryLeft}>
            <View style={styles.summaryIconContainer}>
              <Text style={{ fontSize: 20 }}>{categories.find(c => c.id === selectedCategory)?.icon}</Text>
            </View>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Resumen</Text>
              <Text style={[styles.summaryTitle, { color: theme.text }]} numberOfLines={1}>{planTitle}</Text>
            </View>
          </View>
          <View style={[styles.summaryRight, { backgroundColor: theme.neutral }]}>
            <MaterialIcons name="group" size={16} color={COLORS.primary} />
            <Text style={[styles.summaryCount, { color: theme.text }]}>{groupSize}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.launchButton}>
           <Text style={styles.launchButtonText}>Lanzar Plan</Text>
           <MaterialIcons name="rocket-launch" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  progressDot: {
    width: 8,
    height: 4,
    borderRadius: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 160,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  stepBadge: {
    backgroundColor: COLORS.primary + '33', // 20% opacity
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  stepText: {
    color: COLORS.primaryDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    height: 128,
    padding: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  suggestionsContainer: {
    marginBottom: 16,
  },
  suggestionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  suggestionsScroll: {
    gap: 8,
    paddingBottom: 8,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  groupSizeContainer: {
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  groupSizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupSizeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  maxBadge: {
    backgroundColor: COLORS.primary + '1A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  maxBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  groupSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  sizeOption: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  sizeValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sizeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  pulseDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  groupSizeFooter: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  footerGradient: {
    ...StyleSheet.absoluteFillObject,
    top: -20, // Extend gradient upwards slightly
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  summaryCount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  launchButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 16,
    gap: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  launchButtonText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
