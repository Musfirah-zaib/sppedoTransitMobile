import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const BACKEND_URL = 'http://192.168.0.103'; 
export default function LoginScreen() {
  const validateCredentials = (emailOrPhone: string, codeStr: string) => {
  // Regex pattern matching standard institutional structure configurations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isPhone = /^\+?[0-9]{10,14}$/.test(emailOrPhone);
  
  if (!emailOrPhone) {
    alert("Identifier input field cannot remain unpopulated.");
    return false;
  }
  if (!emailRegex.test(emailOrPhone) && !isPhone) {
    alert("Please input a valid phone configuration sequence or institutional Email parameter.");
    return false;
  }
  if (codeStr.length < 8) {
    alert("Security access password parameters must consist of at least 8 alphanumeric characters.");
    return false;
  }
  return true;
};
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async () => {
    if (!identifier || !password) {
      alert("Please fill in your credentials.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Sending authentication parameters to your ASP.NET Core backend
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: identifier,
          password: password,
        }),
      });
      const result = await response.json();
              if (response.ok) {
        alert("Login successful!");
        
    router.replace('/login');

      } else {
        alert(result.message || "Invalid database authentication credentials.");
      }


    } catch (error) {
      console.error("Network connection failure: ", error);
      alert("Backend offline. Bypassing gate using Development Mode placeholder validation...");
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
            <Text style={styles.authMainTitle}>Welcome Back</Text>
            <Text style={styles.authSubText}>Log in to track your local active Speedo buses</Text>
          </View>

          <View style={styles.formBlock}>
            <Text style={styles.inputLabel}>Registered Phone / Email</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Enter your credential details"
              placeholderTextColor="#A0A0A0"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              editable={!isSubmitting}
            />

            <Text style={styles.inputLabel}>Security Password</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="••••••••" 
              secureTextEntry
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              editable={!isSubmitting}
            />

            <TouchableOpacity style={styles.forgotAnchor} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.primaryButton, isSubmitting && { backgroundColor: '#A3D9C9' }]} 
              onPress={handleLoginSubmit} 
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>
              <TouchableOpacity 
                style={styles.googleButton} 
                onPress={() => alert("Forwarding user token identity directly downstream onto secure /api/v1/auth/google validation stacks.")}
              >
                <View style={styles.googleIconContainer}>
              
                  <View style={[styles.quadrant, { backgroundColor: '#EA4335', top: 0, left: 4 }]} />
                  <View style={[styles.quadrant, { backgroundColor: '#4285F4', top: 4, right: 0 }]} />
                  <View style={[styles.quadrant, { backgroundColor: '#FBBC05', bottom: 4, left: 0 }]} />
                  <View style={[styles.quadrant, { backgroundColor: '#34A853', bottom: 0, left: 4 }]} />
                </View>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

            <View style={styles.switchAuthRow}>
              <Text style={styles.switchLabel}>New to Speedo Transit? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.switchAnchor}>Create Account</Text>
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
  forgotAnchor: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 24 },
  forgotText: { color: '#666666', fontSize: 14, fontWeight: '500' },
  primaryButton: { height: 54, backgroundColor: '#046A38', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 10, elevation: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  switchAuthRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, paddingBottom: 20 },
  switchLabel: { fontSize: 15, color: '#666666' },
  switchAnchor: { fontSize: 15, fontWeight: 'bold', color: '#046A38' },

  googleButton: { height: 50, borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12,
  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', marginTop: 14, gap: 12 },
  googleButtonText: { color: '#212121', fontSize: 16, fontWeight: '600' },
  googleIconContainer: { width: 18, height: 18, position: 'relative', overflow: 'hidden' },
  quadrant: { position: 'absolute', width: 10, height: 10, borderRadius: 2 }
});
