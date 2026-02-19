import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const CATEGORIES = [
  { id: '1', name: 'Deportes', color: '#f87171' },
  { id: '2', name: 'Música', color: '#60a5fa' },
  { id: '3', name: 'Arte', color: '#fbbf24' },
  { id: '4', name: 'Comida', color: '#34d399' },
  { id: '5', name: 'Cine', color: '#818cf8' },
  { id: '6', name: 'Tecnología', color: '#a78bfa' },
];

export default function ExploreScreen() {
  const renderItem = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <ThemedText style={styles.cardText}>{item.name}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Explorar</ThemedText>
          <ThemedText style={styles.subtitle}>Encuentra actividades que te gusten</ThemedText>
        </View>
        <FlatList
          data={CATEGORIES}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
  },
  subtitle: {
    opacity: 0.6,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 0.48,
    aspectRatio: 1.2,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  cardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
