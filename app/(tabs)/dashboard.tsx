import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_URL } from '../config'; 

interface BusStop {
  id: string;
  name: string;
  distance: string;
  lines: string[];
}

export default function DashboardScreen() {
  const router = useRouter();
  const [stops, setStops] = useState<BusStop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendOffline, setIsBackendOffline] = useState(false);

  const fallbackSeededStops: BusStop[] = [
    { id: '1', name: 'Kot Lakhpat Terminal (Local Cache)', distance: '0.4 km away', lines: ['Speedo 11', 'Speedo 14'] },
    { id: '2', name: 'Thokar Niaz Baig Interchange', distance: '1.8 km away', lines: ['Speedo 22', 'Speedo 34'] }
  ];

  const fetchLiveTransitData = async () => {
    try {
      setIsLoading(true);
      setIsBackendOffline(false);
      
      const response = await fetch(`${API_URL}/admin/stops/nearby?latitude=31.4806&longitude=74.3213`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Bypass-Tunnel-Reminder': 'true', 
          'User-Agent': 'SpeedoTransitMobileClient'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStops(data);
      } else {
        setIsBackendOffline(true);
        setStops(fallbackSeededStops);
      }
    } catch (error) {
      console.error("Failed to fetch live database records from your ASP.NET Core server:", error);
      setIsBackendOffline(true);
      setStops(fallbackSeededStops); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveTransitData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
          <Ionicons name="person-circle-outline" size={30} color="#046A38" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Speedo</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#1A202C" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.searchBarContainer} activeOpacity={0.9} onPress={() => router.push('/search-entry')}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" />
          <Text style={styles.searchPlaceholderText}>Where are you going?</Text>
          <TouchableOpacity style={styles.searchMicButton} onPress={() => router.push('/chatbot')}>
            <Ionicons name="mic-outline" size={20} color="#046A38" />
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.sectionHeaderTitle}>Quick Access</Text>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/search-entry')}>
            <View style={[styles.iconWrapper, { backgroundColor: '#E6F0EC' }]}>
              <Ionicons name="home" size={18} color="#046A38" />
            </View>
            <Text style={styles.cardHeader}>Home</Text>
            <Text style={styles.cardSub}>Tap to configure</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/search-entry')}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EDF2F7' }]}>
              <Ionicons name="briefcase" size={18} color="#4A5568" />
            </View>
            <Text style={styles.cardHeader}>Work</Text>
            <Text style={styles.cardSub}>Tap to configure</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Nearby Live Stations</Text>
          {isBackendOffline && <Text style={styles.offlineBadgeTag}>Offline Cache</Text>}
        </View>
        
        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#046A38" />
            <Text style={styles.loadingText}>Fetching database streams from ASP.NET Core...</Text>
          </View>
        ) : (
          stops.map(item => (
            <View key={item.id} style={styles.journeyHistoryRow}>
              <Ionicons name="pin-outline" size={22} color="#046A38" style={styles.journeyHistoryIcon} />
              <View style={styles.journeyHistoryMeta}>
                <Text style={styles.historyMainText}>{item.name}</Text>
                <Text style={styles.historySubText}>{item.distance}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.floatingMicTrigger} activeOpacity={0.8} onPress={() => router.push('/chatbot')}>
        <Ionicons name="mic" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  appBar: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F0F4F8', backgroundColor: '#FFFFFF' },
  iconButton: { padding: 4 },
  brandTitle: { fontSize: 22, fontWeight: '700', color: '#046A38', letterSpacing: 0.5 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 130 },
  searchBarContainer: { height: 54, backgroundColor: '#F7FAFC', borderRadius: 14, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 6, marginVertical: 14 },
  searchPlaceholderText: { flex: 1, marginLeft: 12, color: '#A0AEC0', fontSize: 15, fontWeight: '500' },
  searchMicButton: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#E6F0EC', justifyContent: 'center', alignItems: 'center' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 14 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  offlineBadgeTag: { fontSize: 11, color: '#E53E3E', fontWeight: '700', backgroundColor: '#FFF5F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  gridRow: { flexDirection: 'row', gap: 16 },
  quickCard: { flex: 1, backgroundColor: '#FAFAFA', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#F0F0F0' },
  iconWrapper: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardHeader: { fontSize: 14, fontWeight: '700', color: '#1A202C' },
  cardSub: { fontSize: 11, color: '#718096', marginTop: 2, fontWeight: '500' },
  journeyHistoryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F7FAFC' },
  journeyHistoryIcon: { marginRight: 16, backgroundColor: '#E6F0EC', padding: 8, borderRadius: 12 },
  journeyHistoryMeta: { flex: 1 },
  historyMainText: { fontSize: 15, fontWeight: '600', color: '#2D3748' },
  historySubText: { fontSize: 12, color: '#718096', marginTop: 2, fontWeight: '500' },
  loadingBox: { paddingVertical: 30, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontSize: 13, color: '#718096', marginTop: 12, textAlign: 'center' },
  floatingMicTrigger: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#046A38', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 }
});
