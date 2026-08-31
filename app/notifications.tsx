import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  const alerts = [
    { id: '1', title: 'Route 14 Delays', body: 'Expect 10-minute hold-ups near Model Town due to ongoing civic construction work.', time: '10m ago' },
    { id: '2', title: 'Fare System Update', body: 'Metro transit card synchronization services are fully operational again across all local terminals.', time: '2h ago' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#1A202C" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList 
        data={alerts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.alertCard}>
            <View style={styles.titleRow}>
              <Text style={styles.alertTitle}>{item.title}</Text>
              <Text style={styles.alertTime}>{item.time}</Text>
            </View>
            <Text style={styles.alertBody}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#EDF2F7' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#046A38' },
  alertCard: { backgroundColor: '#F7FAFC', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDF2F7' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  alertTitle: { fontSize: 15, fontWeight: '700', color: '#2D3748' },
  alertTime: { fontSize: 11, color: '#A0AEC0', fontWeight: '600' },
  alertBody: { fontSize: 13, color: '#718096', lineHeight: 18 }
});
