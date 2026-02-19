import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { supabase } from '../../supabase';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.header}>
          <Avatar initials="YO" size={100} />
          <ThemedText type="title" style={styles.name}>Yo Mismo</ThemedText>
          <ThemedText style={styles.bio}>Explorador urbano y fanático de la pizza 🍕</ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type="subtitle">120</ThemedText>
            <ThemedText style={styles.statLabel}>Amigos</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="subtitle">5</ThemedText>
            <ThemedText style={styles.statLabel}>Eventos</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="subtitle">12</ThemedText>
            <ThemedText style={styles.statLabel}>Grupos</ThemedText>
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Editar Perfil" variant="secondary" onPress={() => {}} style={styles.button} />
          <Button title="Cerrar Sesión" variant="outline" onPress={signOut} style={styles.button} />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  name: {
    marginTop: 16,
  },
  bio: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    opacity: 0.6,
  },
  actions: {
    width: '100%',
  },
  button: {
    marginBottom: 12,
  },
});
