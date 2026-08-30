import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const BACKEND_URL = 'http://192.168.0';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUpSubmit = async () => {


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

    if (!fullName || !phone || !password) {
      alert("Please populate all text criteria fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phoneNumber: phone, password }),
      });
      if (response.ok) {
        alert("Account created successfully!");
        router.replace('/(tabs)');
      } else {
        const result = await response.json();
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      alert("Backend offline. Simulating account creation for testing layout...");
      router.replace('/(tabs)');
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
            <TextInput style={styles.textInput} placeholder="Enter your full name" placeholderTextColor="#A0A0A0" value={fullName} onChangeText={setFullName} />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput style={styles.textInput} placeholder="+92 300 1234567" keyboardType="phone-pad" placeholderTextColor="#A0A0A0" value={phone} onChangeText={setPhone} />

            <Text style={styles.inputLabel}>Create Password</Text>
            <TextInput style={styles.textInput} placeholder="Minimum 8 characters" secureTextEntry placeholderTextColor="#A0A0A0" value={password} onChangeText={setPassword} />

            <TouchableOpacity style={styles.primaryButton} onPress={handleSignUpSubmit} activeOpacity={0.8}>
              {isSubmitting ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text style={styles.buttonText}>Create Account</Text>}
            </TouchableOpacity>

            {/* 🌐 VISUAL DESIGN SEPARATOR */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>
        
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
  authHeaderBlock: { marginTop: 40, marginBottom: 20 },
  authMainTitle: { fontSize: 32, fontWeight: 'bold', color: '#212121' },
  authSubText: { fontSize: 15, color: '#666666', marginTop: 8 },
  formBlock: { flex: 1 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#046A38', marginBottom: 8, marginTop: 14 },
  textInput: { height: 50, borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: '#212121', backgroundColor: '#FAFAFA' },
  primaryButton: { height: 54, backgroundColor: '#046A38', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 24, elevation: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
   
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },

  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' }, 
  dividerText: { marginHorizontal: 10, paddingHorizontal: 10, color: '#888888', fontSize: 14 },
  googleIconText: { fontSize: 18 },
  switchAuthRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, paddingBottom: 20 },
  switchLabel: { fontSize: 15, color: '#666666' },
  switchAnchor: { fontSize: 15, fontWeight: 'bold', color: '#046A38' },

  googleButton: { height: 50, borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 12,
  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', marginTop: 14, gap: 12 },
  googleButtonText: { color: '#212121', fontSize: 16, fontWeight: '600' },
  googleIconContainer: { width: 18, height: 18, position: 'relative', overflow: 'hidden' },
  quadrant: { position: 'absolute', width: 10, height: 10, borderRadius: 2 }

});
