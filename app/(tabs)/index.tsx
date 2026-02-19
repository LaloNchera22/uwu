import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const MOCK_FRIENDS = [
  { id: '1', name: 'Ana Garcia', bio: 'Amante del senderismo y el café ☕️', initials: 'AG' },
  { id: '2', name: 'Carlos Ruiz', bio: 'Tech lover y gamer 🎮', initials: 'CR' },
  { id: '3', name: 'Elena Lopez', bio: 'Viajera y fotógrafa 📸', initials: 'EL' },
  { id: '4', name: 'Miguel Torres', bio: 'Músico y soñador 🎸', initials: 'MT' },
];

export default function HomeScreen() {
  const renderItem = ({ item }: { item: typeof MOCK_FRIENDS[0] }) => (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Avatar initials={item.initials} />
        <View style={styles.textContainer}>
          <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
          <ThemedText style={styles.bio}>{item.bio}</ThemedText>
        </View>
      </View>
      <Button title="Conectar" variant="secondary" style={styles.button} onPress={() => {}} />
    </Card>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Descubre</ThemedText>
          <ThemedText style={styles.subtitle}>Gente increíble cerca de ti</ThemedText>
        </View>
        <FlatList
          data={MOCK_FRIENDS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  bio: {
    opacity: 0.7,
    marginTop: 2,
  },
  button: {
    marginTop: 8,
    paddingVertical: 10,
  },
});
