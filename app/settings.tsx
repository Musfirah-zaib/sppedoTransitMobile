import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#1A202C" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.profileHero}>
        <Ionicons name="person-circle" size={72} color="#046A38" />
        <Text style={styles.userName}>Guest User</Text>
        <Text style={styles.userEmail}>dev.mode@speedotransit.local</Text>
      </View>

      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/alarm-set')}>
          <Ionicons name="alarm-outline" size={20} color="#4A5568" />
          <Text style={styles.rowText}>Configure Station Alarms</Text>
          <Ionicons name="chevron-forward" size={16} color="#CBD5E0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => router.replace('/(auth)/login')}>
          <Ionicons name="log-out-outline" size={20} color="#E53E3E" />
          <Text style={[styles.rowText, { color: '#E53E3E' }]}>Sign Out Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#EDF2F7' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#046A38' },
  profileHero: { alignItems: 'center', marginVertical: 30 },
  userName: { fontSize: 20, fontWeight: '700', color: '#2D3748', marginTop: 10 },
  userEmail: { fontSize: 13, color: '#718096', marginTop: 2 },
  menuBox: { paddingHorizontal: 20 },
  row: { flexDirection: 'row', height: 54, alignItems: 'center', borderBottomWidth: 1, borderColor: '#FAFAFA' },
  rowText: { flex: 1, marginLeft: 14, fontSize: 15, fontWeight: '500', color: '#2D3748' }
});
