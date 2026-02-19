import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { supabase } from '../../supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Error', error.message);
    else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('¡Súper!', 'Revisa tu correo para verificar tu cuenta.');
    setLoading(false);
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>

        <View style={styles.header}>
          <ThemedText type="title" style={styles.logo}>👋 SoloAmigos</ThemedText>
          <ThemedText style={styles.subtitle}>Conecta. Sal. Haz amigos de verdad.</ThemedText>
        </View>

        <View style={styles.form}>
          <Input
            label="Correo electrónico"
            onChangeText={setEmail}
            value={email}
            placeholder="ejemplo@correo.com"
            autoCapitalize={'none'}
            keyboardType="email-address"
          />
          <Input
            label="Contraseña"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="********"
            autoCapitalize={'none'}
          />

          <Button
            title="Iniciar Sesión"
            onPress={signInWithEmail}
            loading={loading}
            style={{ marginTop: 20 }}
          />

          <Button
            title="Crear Cuenta"
            variant="secondary"
            onPress={signUpWithEmail}
            disabled={loading}
            style={{ marginTop: 12 }}
          />
        </View>

      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  header: { marginBottom: 40, alignItems: 'center' },
  logo: { marginBottom: 10, textAlign: 'center' },
  subtitle: { textAlign: 'center', opacity: 0.7 },
  form: { width: '100%' },
});
