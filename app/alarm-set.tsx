import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AlarmSetScreen() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#1A202C" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Station Alarms</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.alarmCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.alarmTitle}>Arriving at Model Town</Text>
            <Text style={styles.alarmSub}>Trigger reminder 400m before terminal node</Text>
          </View>
          <Switch value={enabled} onValueChange={setEnabled} trackColor={{ true: '#046A38' }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#EDF2F7' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#046A38' },
  content: { padding: 20 },
  alarmCard: { flexDirection: 'row', backgroundColor: '#F7FAFC', padding: 18, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#EDF2F7' },
  alarmTitle: { fontSize: 16, fontWeight: '700', color: '#2D3748' },
  alarmSub: { fontSize: 12, color: '#718096', marginTop: 4, fontWeight: '500' }
});
