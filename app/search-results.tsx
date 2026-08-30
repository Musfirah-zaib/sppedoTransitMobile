import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchResultsScreen() {
  const router = useRouter();

  const handleSelectRoute = (routeName: string) => {
    // Navigates directly downstream into the live tracking dashboard layout map views
    router.push({
      pathname: '/route-details',
      params: { selectedBus: routeName }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Modern Back Nav Header Node */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A202C" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Speedo</Text>
          <Text style={styles.headerSubtitle}>Johar Town to DHA Ph 5</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="navigate-circle-outline" size={26} color="#046A38" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Count Segment Header Bar */}
        <View style={styles.resultsCountBar}>
          <Text style={styles.countText}>3 Routes Found</Text>
          <TouchableOpacity style={styles.filterBadge}>
            <Ionicons name="options-outline" size={16} color="#4A5568" style={{ marginRight: 6 }} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* 🟢 CARD 1: Fastest Recommended Route Option (Route 14) */}
        <View style={styles.routeOptionCard}>
          {/* Micro Ribbon Badge for Sorting */}
          <View style={styles.ribbonBadge}>
            <Text style={styles.ribbonText}>Fastest</Text>
          </View>

          <View style={styles.cardHeaderRow}>
            <View style={styles.timeMeta}>
              <Text style={styles.durationText}>45 <Text style={styles.miniLabelText}>mins</Text></Text>
              <Text style={styles.clockRangeText}>10:15 AM - 11:00 AM</Text>
            </View>
            <Text style={styles.farePriceText}>PKR 25</Text>
          </View>

          {/* Timeline Node Chain Layout */}
          <View style={styles.timelineVisualBlock}>
            <View style={styles.nodeItem}>
              <Ionicons name="walk" size={16} color="#718096" />
              <Text style={styles.nodeSubLabel}>5m</Text>
            </View>
            
            <View style={styles.horizontalLineDivider} />
            
            <View style={styles.busNodeBadge}>
              <Ionicons name="bus" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.busNodeText}>Route 14</Text>
            </View>

            <View style={styles.horizontalLineDivider} />

            <View style={styles.nodeItem}>
              <Ionicons name="walk" size={16} color="#718096" />
              <Text style={styles.nodeSubLabel}>10m</Text>
            </View>
          </View>

          {/* Selection Trigger Button Layout */}
          <View style={styles.buttonFooterRow}>
            <View style={styles.iconIndicatorGroup}>
              <Ionicons name="people-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
              <Ionicons name="leaf-outline" size={16} color="#48BB78" />
            </View>
            <TouchableOpacity style={styles.actionSelectButton} onPress={() => handleSelectRoute('Speedo Bus 14')}>
              <Text style={styles.selectButtonText}>Select Route</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🟢 CARD 2: Alternative Option (Route 22) */}
        <View style={styles.routeOptionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.timeMeta}>
              <Text style={styles.durationText}>55 <Text style={styles.miniLabelText}>mins</Text></Text>
              <Text style={styles.clockRangeText}>10:20 AM - 11:15 AM</Text>
            </View>
            <Text style={styles.farePriceText}>PKR 25</Text>
          </View>

          <View style={styles.timelineVisualBlock}>
            <View style={styles.nodeItem}>
              <Ionicons name="walk" size={16} color="#718096" />
              <Text style={styles.nodeSubLabel}>15m</Text>
            </View>
            <View style={styles.horizontalLineDivider} />
            <View style={[styles.busNodeBadge, { backgroundColor: '#4A5568' }]}>
              <Ionicons name="bus" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.busNodeText}>Route 22</Text>
            </View>
            <View style={styles.horizontalLineDivider} />
            <View style={styles.nodeItem}>
              <Ionicons name="walk" size={16} color="#718096" />
              <Text style={styles.nodeSubLabel}>5m</Text>
            </View>
          </View>

          <View style={styles.buttonFooterRow}>
            <View style={styles.iconIndicatorGroup}>
              <Ionicons name="alert-circle-outline" size={16} color="#718096" />
            </View>
            <TouchableOpacity style={[styles.actionSelectButton, styles.disabledCardButton]} onPress={() => handleSelectRoute('Speedo Bus 22')}>
              <Text style={[styles.selectButtonText, { color: '#718096' }]}>Select Route</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#EDF2F7' },
  headerIcon: { padding: 6 },
  headerTitleContainer: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A202C' },
  headerSubtitle: { fontSize: 12, color: '#718096', marginTop: 1, fontWeight: '500' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 40 },
  resultsCountBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  countText: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  filterBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7FAFC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  filterText: { fontSize: 12, fontWeight: '600', color: '#4A5568' },
  routeOptionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', position: 'relative', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  ribbonBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#046A38', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  ribbonText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  timeMeta: { flex: 1 },
  durationText: { fontSize: 26, fontWeight: '800', color: '#1A202C' },
  miniLabelText: { fontSize: 14, fontWeight: '500', color: '#718096' },
  clockRangeText: { fontSize: 12, color: '#718096', marginTop: 4, fontWeight: '500' },
  farePriceText: { fontSize: 16, fontWeight: '700', color: '#1A202C', marginTop: 8 },
  timelineVisualBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20, paddingHorizontal: 10 },
  nodeItem: { alignItems: 'center', width: 35 },
  nodeSubLabel: { fontSize: 11, color: '#A0AEC0', marginTop: 4, fontWeight: '600' },
  horizontalLineDivider: { flex: 1, height: 2, backgroundColor: '#E2E8F0', marginHorizontal: 8 },
  busNodeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#046A38', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  busNodeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  buttonFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#F0F4F8', paddingTop: 14 },
  iconIndicatorGroup: { flexDirection: 'row', alignItems: 'center' },
  actionSelectButton: { backgroundColor: '#046A38', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 10 },
  disabledCardButton: { backgroundColor: '#E2E8F0' },
  selectButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' }
});
