import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function DashboardScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu-outline" size={26} color="#1A202C" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Speedo</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#1A202C" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.searchBarContainer} 
          activeOpacity={0.9} 
          onPress={() => router.push('./search-entry')}
        >
          <Ionicons name="search-outline" size={20} color="#718096" />
          <Text style={styles.searchPlaceholderText}>Where to?</Text>
          <TouchableOpacity style={styles.searchMicButton} onPress={() => router.replace('./chatbot')}>
            <Ionicons name="mic-outline" size={20} color="#1A202C" />
          </TouchableOpacity>
        </TouchableOpacity>
        {/* Quick Access Block Grid */}
        <Text style={styles.sectionHeaderTitle}>Quick Access</Text>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.quickCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#E6F0EC' }]}>
              <Ionicons name="home" size={20} color="#046A38" />
            </View>
            <Text style={styles.cardHeader}>Home</Text>
            <Text style={styles.cardSub}>32 min via M4</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#E2E8F0' }]}>
              <Ionicons name="briefcase" size={20} color="#4A5568" />
            </View>
            <Text style={styles.cardHeader}>Work</Text>
            <Text style={styles.cardSub}>18 min via Rail</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.fullWidthCard}>
          <View style={styles.fullWidthLeftContent}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EDF2F7' }]}>
              <Ionicons name="school" size={20} color="#4A5568" />
            </View>
            <View style={styles.fullWidthTextContainer}>
              <Text style={styles.cardHeader}>University</Text>
              <Text style={styles.cardSub}>Central Campus</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
        </TouchableOpacity>
        <Text style={styles.sectionHeaderTitle}>Recent Journeys</Text>
        <View style={styles.journeyHistoryRow}>
          <Ionicons name="time-outline" size={22} color="#718096" style={styles.journeyHistoryIcon} />
          <View style={styles.journeyHistoryMeta}>
            <Text style={styles.historyMainText}>North Station</Text>
            <Text style={styles.historySubText}>Yesterday, 5:30 PM</Text>
          </View>
        </View>
        <View style={styles.journeyHistoryRow}>
          <Ionicons name="time-outline" size={22} color="#718096" style={styles.journeyHistoryIcon} />
          <View style={styles.journeyHistoryMeta}>
            <Text style={styles.historyMainText}>Coffee District</Text>
            <Text style={styles.historySubText}>August 28, 9:15 AM</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.floatingMicTrigger} 
        activeOpacity={0.8}
        onPress={() => router.replace('./(tabs)/chatbot')}
      >
        <Ionicons name="mic" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  appBar: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  iconButton: { padding: 6 },
  brandTitle: { fontSize: 22, fontWeight: '700', color: '#046A38', letterSpacing: 0.5 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  searchBarContainer: { height: 54, backgroundColor: '#F7FAFC', borderRadius: 27, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 6, marginVertical: 14 },
  searchPlaceholderText: { flex: 1, marginLeft: 12, color: '#A0AEC0', fontSize: 16, fontWeight: '500' },
  searchMicButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  sectionHeaderTitle: { fontSize: 18, fontWeight: '700', color: '#1A202C', marginTop: 22, marginBottom: 14 },
  gridRow: { flexDirection: 'row', gap: 16 },
  quickCard: { flex: 1, backgroundColor: '#FAFAFA', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#F0F0F0' },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  cardHeader: { fontSize: 15, fontWeight: '700', color: '#1A202C' },
  cardSub: { fontSize: 12, color: '#718096', marginTop: 4, fontWeight: '500' },
  fullWidthCard: { backgroundColor: '#FAFAFA', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#F0F0F0', marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fullWidthLeftContent: { flexDirection: 'row', alignItems: 'center' },
  fullWidthTextContainer: { marginLeft: 14 },
  journeyHistoryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F7FAFC' },
  journeyHistoryIcon: { marginRight: 16, backgroundColor: '#F7FAFC', padding: 8, borderRadius: 12 },
  journeyHistoryMeta: { flex: 1 },
  historyMainText: { fontSize: 15, fontWeight: '600', color: '#2D3748' },
  historySubText: { fontSize: 12, color: '#A0AEC0', marginTop: 2 },
  floatingMicTrigger: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#045028', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3 }
});
