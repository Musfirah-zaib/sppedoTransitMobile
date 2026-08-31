import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Top Banner App Bar */}
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
        
        {/* Search Proxy Navigation Block */}
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

        {/* Quick Access Block Grid */}
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

        {/* Recent Journeys History Data Feed */}
        <Text style={styles.sectionHeaderTitle}>Recent Journeys</Text>
        
        <View style={styles.journeyHistoryRow}>
          <Ionicons name="time-outline" size={22} color="#718096" style={styles.journeyHistoryIcon} />
          <View style={styles.journeyHistoryMeta}>
            <Text style={styles.historyMainText}>Kot Lakhpat Station</Text>
            <Text style={styles.historySubText}>Yesterday, 5:30 PM</Text>
          </View>
        </View>

        <View style={styles.journeyHistoryRow}>
          <Ionicons name="time-outline" size={22} color="#718096" style={styles.journeyHistoryIcon} />
          <View style={styles.journeyHistoryMeta}>
            <Text style={styles.historyMainText}>Thokar Niaz Baig Terminal</Text>
            <Text style={styles.historySubText}>August 28, 9:15 AM</Text>
          </View>
        </View>
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  appBar: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#F0F4F8' },
  iconButton: { padding: 6 },
  brandTitle: { fontSize: 22, fontWeight: '700', color: '#046A38', letterSpacing: 0.5 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  searchBarContainer: { height: 54, backgroundColor: '#F7FAFC', borderRadius: 14, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 6, marginVertical: 14 },
  searchPlaceholderText: { flex: 1, marginLeft: 12, color: '#A0AEC0', fontSize: 15, fontWeight: '500' },
  searchMicButton: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#E6F0EC', justifyContent: 'center', alignItems: 'center' },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C', marginTop: 22, marginBottom: 14 },
  gridRow: { flexDirection: 'row', gap: 16 },
  quickCard: { flex: 1, backgroundColor: '#FAFAFA', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#F0F0F0' },
  iconWrapper: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardHeader: { fontSize: 14, fontWeight: '700', color: '#1A202C' },
  cardSub: { fontSize: 11, color: '#718096', marginTop: 2, fontWeight: '500' },
  journeyHistoryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F7FAFC' },
  journeyHistoryIcon: { marginRight: 16, backgroundColor: '#F7FAFC', padding: 8, borderRadius: 12 },
  journeyHistoryMeta: { flex: 1 },
  historyMainText: { fontSize: 15, fontWeight: '600', color: '#2D3748' },
  historySubText: { fontSize: 12, color: '#A0AEC0', marginTop: 2 },
  floatingMicTrigger: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#046A38', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 }
});
