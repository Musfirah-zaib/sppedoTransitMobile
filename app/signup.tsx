import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// 🛑 REPLACE THIS with your actual local computer Wi-Fi IPv4 address and ASP.NET Port!
const BACKEND_URL = 'http://192.168.10';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUpSubmit = async () => {
    if (!fullName || !phone || !password) {
      alert("Please populate all text criteria fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          phoneNumber: phone,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        router.replace('/');
      } else {
        alert(result.message || "Registration processing failed.");
      }
    } catch (error) {
      console.error("Network connection failure: ", error);
      alert("Backend offline. Account bypass simulated for testing layout framework flow...");
      router.replace('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.authHeaderBlock}>
            <Text style={styles.authMainTitle}>Create Account</Text>
            <Text style={styles.authSubText}>Join the digital routing network system</Text>
          </View>

          <View style={styles.formBlock}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Enter your full name"
              placeholderTextColor="#A0A0A0"
              value={fullName}
              onChangeText={setFullName}
              editable={!isSubmitting}
            />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="+92 300 1234567"
              keyboardType="phone-pad"
              placeholderTextColor="#A0A0A0"
              value={phone}
              onChangeText={setPhone}
              editable={!isSubmitting}
            />

            <Text style={styles.inputLabel}>Create Password</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Minimum 8 characters" 
              secureTextEntry
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              editable={!isSubmitting}
            />

            <TouchableOpacity 
              style={[styles.primaryButton, isSubmitting && { backgroundColor: '#A3D9C9' }]} 
              onPress={handleSignUpSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.switchAuthRow}>
              <Text style={styles.switchLabel}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.switchAnchor}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContainer: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24 },
  authHeaderBlock: { marginTop: 60, marginBottom: 40 },
  authMainTitle: { fontSize: 32, fontWeight: 'bold', color: '#212121' },
  authSubText: { fontSize: 15, color: '#666666', marginTop: 8, lineHeight: 22 },
  formBlock: { flex: 1 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#046A38', marginBottom: 8, marginTop: 18 },
  textInput: { height: 52, borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: '#212121', backgroundColor: '#FAFAFA' },
  primaryButton: { height: 54, backgroundColor: '#046A38', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 30, elevation: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  switchAuthRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, paddingBottom: 20 },
  switchLabel: { fontSize: 15, color: '#666666' },
  switchAnchor: { fontSize: 15, fontWeight: 'bold', color: '#046A38' },
});
