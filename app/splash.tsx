import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
       router.replace('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.splashContainer}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoIcon}>🚌</Text>
      </View>
      <Text style={styles.splashTitle}>Speedo Transit</Text>
      <Text style={styles.splashSubtitle}>Smart Lahore Commute</Text>
      <ActivityIndicator color="#A3D9C9" size="small" style={{ marginTop: 40 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#046A38', alignItems: 'center', justifyContent: 'center' },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  logoIcon: { fontSize: 50 },
  splashTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 0.5 },
  splashSubtitle: { fontSize: 16, color: '#A3D9C9', marginTop: 5 },
});
