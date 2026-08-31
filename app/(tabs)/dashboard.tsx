import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 🛑 REPLACE THIS WITH YOUR LAPTOP'S ACTIVE WIRELESS INTERNET IPV4 ADDRESS (Run 'ipconfig' in command prompt)
const LAPTOP_IPV4 = "192.168.0.103"; 
const API_BASE_URL = `http://${LAPTOP_IPV4}:5000/api`; // Matches your ASP.NET Core server port binding

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
  const [errorOccurred, setErrorOccurred] = useState(false);

  // Fallback high-fidelity dataset if your ASP.NET backend database seeding pipeline is idle
  const fallbackStops: BusStop[] = [
    { id: '1', name: 'Kot Lakhpat Station (Seeded)', distance: '0.4 km away', lines: ['Speedo 11', 'Speedo 14'] },
    { id: '2', name: 'Thokar Niaz Baig Terminal', distance: '1.8 km away', lines: ['Speedo 22', 'Speedo 34'] }
  ];

  useEffect(() => {
    fetchLiveBackendStops();
  }, []);

  const fetchLiveBackendStops = async () => {
    try {
      setIsLoading(true);
      setErrorOccurred(false);
      
      // Sending query signals to your ASP.NET Core Controller (passing mock Lahore coordinates)
      const response = await fetch(`${API_BASE_URL}/v1/admin/stops/nearby?latitude=31.4806&longitude=74.3213`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Map your C# Models arrays data cleanly into mobile flat parameters state nodes
        setStops(data);
      } else {
        console.warn("Backend responded with an error code, loading fallback database records.");
        setStops(fallbackStops);
      }
    } catch (error) {
      console.error("ASP.NET Server unreachable. Verify your laptop IPv4 network bindings:", error);
      setErrorOccurred(true);
      setStops(fallbackStops); // Graceful interface degradation during offline local development
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Safe Padded Header Component Layout */}
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
        
        {/* Journey Destination Search Box Linker */}
        <TouchableOpacity 
          style={styles.searchBarContainer} 
          activeOpacity={0.9} 
          onPress={() => router.push('/search-entry')}
        >
          <Ionicons name="search-outline" size={20} color="#A0AEC0" />
          <Text style={styles.searchPlaceholderText}>Where are you going?</Text>
          <TouchableOpacity style={styles.searchMicButton} onPress={() => router.push('/chatbot')}>
            <Ionicons name="mic-outline" size={20} color="#046A38" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Quick Access Block Navigation Links */}
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

        {/* Async Recent Journeys History Data Feed Layer */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Nearby Live Stations</Text>
          {errorOccurred && <Text style={styles.offlineIndicatorTag}>Offline Mode</Text>}
        </View>
        
        {isLoading ? (
          <View style={styles.loaderFrameBox}>
            <ActivityIndicator size="small" color="#046A38" />
            <Text style={styles.loaderLabelParagraphText}>Querying database records from ASP.NET Core server...</Text>
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

      {/* Floating Action Voice Bot Hub Gateway Toggle */}
      <TouchableOpacity 
        style={styles.floatingMicTrigger} 
        activeOpacity={0.8}
        onPress={() => router.push('/chatbot')}
      >
        <Ionicons name="mic" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  appBar: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F0F4F8', backgroundColor: '#FFFFFF' },
  iconButton: { padding: 4 },
  brandTitle: { fontSize: 22, fontWeight: '700', color: '#046A38', letterSpacing: 0.5 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  searchBarContainer: { height: 54, backgroundColor: '#F7FAFC', borderRadius: 14, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 6, marginVertical: 14 },
  searchPlaceholderText: { flex: 1, marginLeft: 12, color: '#A0AEC0', fontSize: 15, fontWeight: '500' },
  searchMicButton: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#E6F0EC', justifyContent: 'center', alignItems: 'center' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 14 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  offlineIndicatorTag: { fontSize: 11, color: '#E53E3E', fontWeight: '700', backgroundColor: '#FFF5F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
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
  loaderFrameBox: { paddingVertical: 30, alignItems: 'center', justifyContent: 'center' },
  loaderLabelParagraphText: { fontSize: 13, color: '#718096', marginTop: 12, textAlign: 'center' },
  floatingMicTrigger: { position: 'absolute', bottom: 24, right: 20, backgroundColor: '#046A38', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 }
});
