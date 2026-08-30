import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransitRoute {
  id: string;
  name: string;
  description: string;
  status: 'Clear' | 'Busy' | 'Jammed';
  statusColor: string;
}

export default function RoutesScreen() {
  const routesData: TransitRoute[] = [
    { id: '1', name: 'Route 1', description: 'Downtown Loop', status: 'Clear', statusColor: '#48BB78' },
    { id: '2', name: 'Route 2', description: 'Northside Express', status: 'Busy', statusColor: '#ECC94B' },
    { id: '3', name: 'Route 3', description: 'West End Commuter', status: 'Clear', statusColor: '#48BB78' },
    { id: '4', name: 'Route 4', description: 'South Metro Park &...', status: 'Jammed', statusColor: '#F56565' },
    { id: '5', name: 'Route 5', description: 'Airport Shuttle', status: 'Clear', statusColor: '#48BB78' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Layout */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="menu-outline" size={24} color="#1A202C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Speedo</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="options-outline" size={22} color="#718096" />
        </TouchableOpacity>
      </View>

      {/* Directory Title Panel */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitleText}>Routes Directory</Text>
        <Text style={styles.subtitleText}>
          Select a route to view details and live traffic conditions.
        </Text>
      </View>

      {/* Premium List Construction */}
      <FlatList
        data={routesData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.routeItemCard} activeOpacity={0.7}>
            <View style={styles.cardLeftContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="bus-outline" size={20} color="#718096" />
              </View>
              <View style={styles.metaTextData}>
                <Text style={styles.routeName}>{item.name}</Text>
                <Text style={styles.routeDesc} numberOfLines={1}>{item.description}</Text>
              </View>
            </View>

            {/* Traffic Status Indicator Node */}
            <View style={styles.statusBadgeWrapper}>
              <Text style={styles.statusLabelText}>{item.status}</Text>
              <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerIconButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#046A38',
    letterSpacing: 0.5,
  },
  titleSection: {
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 15,
  },
  mainTitleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#045028',
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
    marginTop: 6,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  routeItemCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  cardLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 14,
  },
  metaTextData: {
    flex: 1,
  },
  routeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
  },
  routeDesc: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
    fontWeight: '500',
  },
  statusBadgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabelText: {
    fontSize: 11,
    color: '#4A5568',
    fontWeight: '700',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
