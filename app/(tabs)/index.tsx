import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Error', error.message);
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.logo}>👋 SoloAmigos</Text>
          <Text style={styles.subtitle}>Conecta. Sal. Haz amigos de verdad.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Correo electrónico"
            placeholderTextColor="#94a3b8"
            autoCapitalize={'none'}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="#94a3b8"
            autoCapitalize={'none'}
          />

          <TouchableOpacity style={styles.primaryButton} disabled={loading} onPress={signInWithEmail}>
            <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} disabled={loading} onPress={signUpWithEmail}>
            <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Aquí es donde estaba el problema, ¡esta es la lista completa de estilos!
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  header: { marginBottom: 50, alignItems: 'center' },
  logo: { fontSize: 36, fontWeight: '900', color: '#0f172a', marginBottom: 10, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', fontWeight: '500' },
  form: { width: '100%' },
  input: { backgroundColor: '#f1f5f9', borderRadius: 16, padding: 20, fontSize: 16, marginBottom: 16, color: '#0f172a', fontWeight: '500' },
  primaryButton: { backgroundColor: '#4f46e5', borderRadius: 100, padding: 20, alignItems: 'center', marginTop: 10, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  primaryButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: 'transparent', borderRadius: 100, padding: 20, alignItems: 'center', marginTop: 15, borderWidth: 2, borderColor: '#e2e8f0' },
  secondaryButtonText: { color: '#0f172a', fontSize: 18, fontWeight: 'bold' }
});