import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { API_URL } from '../config'; 
interface OptimizedRoute {
  id: string;
  duration: string;
  clockRange: string;
  busLine: string;
  junctionNode: string; // Tracks transfer stops like Depot Chowk
}

export default function SearchResults() {

  const router = useRouter();
  const { origin, target } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<OptimizedRoute[]>([]);

  const fallbackRoutes: OptimizedRoute[] = [
    { id: '1', duration: '45 mins', clockRange: 'Calculated Route via Optimizer', busLine: 'Speedo 14', junctionNode: 'Direct Line' },
    { id: '2', duration: '60 mins', clockRange: 'Transfer via Interchange Hub', busLine: 'Speedo 11 ➔ Speedo 34', junctionNode: 'Depot Chowk Transfer' }
  ];

  useEffect(() => {
    fetchGraphOptimizedPaths();
  }, [origin, target]);

  const fetchGraphOptimizedPaths = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/routing/optimize?from=${encodeURIComponent(origin as string)}&to=${encodeURIComponent(target as string)}`);
      
      if (response.ok) {
        const data = await response.json();
        setRoutes(data);
      } else {
        setRoutes(fallbackRoutes);
      }
    } catch (error) {
      console.warn("Using offline graph model fallback tracking layouts.");
      setRoutes(fallbackRoutes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#1A202C" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Optimal Solutions</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#046A38" />
          <Text style={styles.loadingText}>Running Multi-Hop Graph Pathfinding Optimizations...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {routes.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.timeText}>{item.duration}</Text>
              <Text style={styles.subText}>{item.clockRange}</Text>
              
              <View style={styles.badgeRow}>
                <View style={styles.badge}><Text style={styles.badgeText}>{item.busLine}</Text></View>
                <Text style={styles.junctionLabel}> Jnc: {item.junctionNode}</Text>
              </View>

              <TouchableOpacity 
                style={styles.selectBtn}
                onPress={() => router.push({ pathname: '/route-details', params: { selectedBus: item.busLine } })}
              >
                <Text style={styles.selectBtnText}>Select & Track Live</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#EDF2F7' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#046A38' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 14, color: '#718096', fontSize: 13, textAlign: 'center' },
  card: { backgroundColor: '#F7FAFC', padding: 18, borderRadius: 14, marginBottom: 16, borderWidth: 1, borderColor: '#EDF2F7' },
  timeText: { fontSize: 24, fontWeight: '800', color: '#1A202C' },
  subText: { fontSize: 12, color: '#718096', marginTop: 2 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  badge: { backgroundColor: '#046A38', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  junctionLabel: { fontSize: 12, color: '#4A5568', fontWeight: '500', marginLeft: 8 },
  selectBtn: { backgroundColor: '#045028', height: 42, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  selectBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' }
});
