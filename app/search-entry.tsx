import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchEntry() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.searchHeaderRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A202C" />
        </TouchableOpacity>
        <Text style={styles.appTitleText}>Speedo</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color="#1A202C" />
        </TouchableOpacity>
      </View>

      {/* Input Route Fields */}
      <View style={styles.formCardBox}>
        <View style={styles.fieldFlexRow}>
          <View style={[styles.indicatorDot, { backgroundColor: '#CBD5E0' }]} />
          <TextInput 
            style={styles.routeFieldInput}
            placeholder="Current Location"
            placeholderTextColor="#A0AEC0"
            value={pickup}
            onChangeText={setPickup}
          />
          <TouchableOpacity style={styles.fieldMicIconTouch} onPress={() => router.replace('/chatbot')}>
            <Ionicons name="mic-outline" size={20} color="#4A5568" />
          </TouchableOpacity>
        </View>

        <View style={styles.connectorLineLayout}>
          <TouchableOpacity style={styles.swapButtonNode} activeOpacity={0.8}>
            <Ionicons name="swap-vertical" size={16} color="#1A202C" />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldFlexRow}>
          <View style={[styles.indicatorDot, { backgroundColor: '#E53E3E' }]} />
          <TextInput 
            style={styles.routeFieldInput}
            placeholder="Enter Destination"
            placeholderTextColor="#A0AEC0"
            value={destination}
            onChangeText={setDestination}
          />
          <TouchableOpacity style={styles.fieldMicIconTouch} onPress={() => router.replace('/chatbot')}>
            <Ionicons name="mic-outline" size={20} color="#4A5568" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListPadding}>
        <Text style={styles.recentSectionHeader}>Recent Searches</Text>

        <TouchableOpacity style={styles.recentSearchCard}>
          <View style={styles.recentLeftBlock}>
            <Ionicons name="repeat-outline" size={20} color="#718096" style={styles.searchItemIconBG} />
            <View>
              <Text style={styles.recentMainText}>Gulberg to RA Bazar</Text>
              <Text style={styles.recentSubText}>Route 1A • 25 min</Text>
            </View>
          </View>
          <Ionicons name="arrow-back-outline" size={18} color="#A0AEC0" style={styles.diagonalArrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recentSearchCard}>
          <View style={styles.recentLeftBlock}>
            <Ionicons name="repeat-outline" size={20} color="#718096" style={styles.searchItemIconBG} />
            <View>
              <Text style={styles.recentMainText}>BaghbanPura to Gaju Mata</Text>
              <Text style={styles.recentSubText}>Route 5 • 45 min</Text>
            </View>
          </View>
          <Ionicons name="arrow-back-outline" size={18} color="#A0AEC0" style={styles.diagonalArrow} />
        </TouchableOpacity>

        {/* Choose on Map Section */}
        <View style={styles.mapGraphicSectionContainer}>
          <View style={styles.mapLineGraphicDecoration} />
          <TouchableOpacity 
            style={styles.chooseMapButton} 
            activeOpacity={0.8}
            onPress={() => router.push('./app/search-results')}
          >
            <Text style={styles.mapButtonTextText}>Choose on Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  searchHeaderRow: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  backButton: { padding: 6 },
  appTitleText: { fontSize: 20, fontWeight: '700', color: '#046A38' },
  profileButton: { padding: 6, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  formCardBox: { paddingHorizontal: 20, marginTop: 10 },
  fieldFlexRow: { height: 52, backgroundColor: '#F7FAFC', borderRadius: 14, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  indicatorDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  routeFieldInput: { flex: 1, fontSize: 15, color: '#2D3748', fontWeight: '500' },
  fieldMicIconTouch: { padding: 6, marginLeft: 8 },
  connectorLineLayout: { height: 24, paddingLeft: 19, justifyContent: 'center', position: 'relative' },
  swapButtonNode: { position: 'absolute', right: 16, width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', zIndex: 10, elevation: 1 },
  scrollListPadding: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  recentSectionHeader: { fontSize: 16, fontWeight: '700', color: '#1A202C', marginBottom: 14 },
  recentSearchCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAFAFA', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#F0F0F0' },
  recentLeftBlock: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  searchItemIconBG: { marginRight: 14, backgroundColor: '#FFFFFF', padding: 8, borderRadius: 10, borderWidth: 1, borderColor: '#EDF2F7' },
  recentMainText: { fontSize: 14, fontWeight: '600', color: '#2D3748' },
  recentSubText: { fontSize: 12, color: '#718096', marginTop: 3 },
  diagonalArrow: { transform: [{ rotate: '135deg' }] },
  mapGraphicSectionContainer: { marginTop: 30, alignItems: 'center', position: 'relative', height: 80, justifyContent: 'center' },
  mapLineGraphicDecoration: { position: 'absolute', width: '100%', height: 2, backgroundColor: '#F0F4F8', zIndex: 1 },
  chooseMapButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', zIndex: 5, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  mapButtonTextText: { fontSize: 13, fontWeight: '700', color: '#046A38' }
});
