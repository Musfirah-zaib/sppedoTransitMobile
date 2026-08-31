import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  FlatList, 
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProximityAlarm {
  id: string;
  stopName: string;
  routeBusNo: string;
  targetTime: string;
  isActive: boolean;
}

export default function ProximityAlarmDashboard() {
  // Mock listing array variables mimicking active SQL Server / Redis local state logic
  const [alarms, setAlarms] = useState<ProximityAlarm[]>([
    { id: '1', stopName: 'Model Town Link Road', routeBusNo: 'Speedo Route 14', targetTime: '08:30 AM', isActive: true },
    { id: '2', stopName: 'Kot Lakhpat Station', routeBusNo: 'Speedo Route 11', targetTime: '05:45 PM', isActive: false },
  ]);

  // Modal configuration states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBusDropdownOpen, setIsBusDropdownOpen] = useState(false);
  
  // New input tracking form parameters
  const [inputStop, setInputStop] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [selectedBus, setSelectedBus] = useState('Select Route Bus');

  const busRoutesList = ['Speedo Route 4', 'Speedo Route 11', 'Speedo Route 14', 'Speedo Route 22', 'Speedo Route 34'];

  const toggleAlarmSwitch = (id: string) => {
    setAlarms(prevAlarms =>
      prevAlarms.map(alarm =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  const handleAddNewAlarm = () => {
    if (!inputStop || !inputTime || selectedBus === 'Select Route Bus') {
      alert("Please fill in all layout configuration parameters before scheduling your alarm node.");
      return;
    }

    const newAlarmNode: ProximityAlarm = {
      id: Date.now().toString(),
      stopName: inputStop,
      routeBusNo: selectedBus,
      targetTime: inputTime,
      isActive: true,
    };

    setAlarms(prev => [...prev, newAlarmNode]);
    
    // Clear structural input forms
    setInputStop('');
    setInputTime('');
    setSelectedBus('Select Route Bus');
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 🟢 Top Safe Padding Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.headerMainTitle}>Station Alarms</Text>
        <Text style={styles.headerSubPara}>Receive real-time buzzing reminders before reaching targeted bus stops.</Text>
      </View>

      {/* Active Scheduled Feed Feed */}
      <ScrollView style={styles.scrollListContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionGroupingLabel}>Your Active Alarms</Text>
        
        {alarms.map(item => (
          <View key={item.id} style={styles.alarmItemCard}>
            <View style={styles.cardInfoSection}>
              <View style={styles.iconCircleWrapper}>
                <Ionicons 
                  name="alarm" 
                  size={22} 
                  color={item.isActive ? "#046A38" : "#A0AEC0"} 
                />
              </View>
              <View style={styles.metaDataBlock}>
                <Text style={[styles.stopHeadingText, !item.isActive && styles.disabledTextColor]}>
                  {item.stopName}
                </Text>
                <Text style={styles.busLabelSubtitle}>{item.routeBusNo} • {item.targetTime}</Text>
              </View>
            </View>
            <Switch 
              value={item.isActive} 
              onValueChange={() => toggleAlarmSwitch(item.id)}
              trackColor={{ true: '#046A38', false: '#CBD5E0' }}
              thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
            />
          </View>
        ))}
      </ScrollView>

      {/* 🚀 Primary White & Green Execution Trigger Action Button */}
      <View style={styles.bottomFixedActionPanel}>
        <TouchableOpacity 
          style={styles.primaryAddButton} 
          activeOpacity={0.8}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.addButtonLabelText}>Add New Alarm</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalDimmedBackground}>
          <View style={styles.modalSurfaceCard}>
            
            {/* Modal Heading Control Row */}
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitleText}>Configure Proximity Reminder</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#4A5568" />
              </TouchableOpacity>
            </View>

            {/* Input Stop Text Form Node */}
            <Text style={styles.formInputLabelStyle}>Target Bus Stop Name</Text>
            <View style={styles.inputFormBoxRow}>
              <Ionicons name="location-outline" size={18} color="#A0AEC0" style={styles.innerFormIcon} />
              <TextInput 
                style={styles.modalTextInputField}
                placeholder="e.g., Model Town Terminal"
                placeholderTextColor="#A0AEC0"
                value={inputStop}
                onChangeText={setInputStop}
              />
            </View>

            {/* Input Time Text Form Node */}
            <Text style={styles.formInputLabelStyle}>Estimated Arrival Time</Text>
            <View style={styles.inputFormBoxRow}>
              <Ionicons name="time-outline" size={18} color="#A0AEC0" style={styles.innerFormIcon} />
              <TextInput 
                style={styles.modalTextInputField}
                placeholder="e.g., 08:30 AM"
                placeholderTextColor="#A0AEC0"
                value={inputTime}
                onChangeText={setInputTime}
              />
            </View>

            {/* 🔽 Dynamic Interactive Bus Route Dropdown Menu Selection Field */}
            <Text style={styles.formInputLabelStyle}>Assigned Speedo Transit Line</Text>
            <TouchableOpacity 
              style={styles.dropdownSelectorFieldBox}
              activeOpacity={0.8}
              onPress={() => setIsBusDropdownOpen(!isBusDropdownOpen)}
            >
              <View style={styles.dropdownLeftBlock}>
                <Ionicons name="bus-outline" size={18} color="#046A38" style={{ marginRight: 10 }} />
                <Text style={[styles.dropdownValueText, selectedBus === 'Select Route Bus' && { color: '#A0AEC0' }]}>
                  {selectedBus}
                </Text>
              </View>
              <Ionicons name={isBusDropdownOpen ? "chevron-up" : "chevron-down"} size={18} color="#4A5568" />
            </TouchableOpacity>

            {/* Dropdown Options List Container Expansion Menu */}
            {isBusDropdownOpen && (
              <View style={styles.dropdownExpansionContainerList}>
                {busRoutesList.map((busOption, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    style={styles.dropdownListItemRow}
                    onPress={() => {
                      setSelectedBus(busOption);
                      setIsBusDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownListItemLabel}>{busOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Save Modal Action Button Trigger */}
            <TouchableOpacity 
              style={styles.modalSaveActionSubmitBtn} 
              activeOpacity={0.8}
              onPress={handleAddNewAlarm}
            >
              <Text style={styles.modalSaveBtnTextText}>Initialize Location Tracker</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  headerBlock: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 },
  headerMainTitle: { fontSize: 26, fontWeight: '800', color: '#045028', letterSpacing: -0.5 },
  headerSubPara: { fontSize: 13, color: '#718096', lineHeight: 18, marginTop: 4, fontWeight: '500' },
  scrollListContainer: { flex: 1, paddingHorizontal: 24, marginTop: 10 },
  sectionGroupingLabel: { fontSize: 15, fontWeight: '700', color: '#1A202C', marginBottom: 14 },
  alarmItemCard: { backgroundColor: '#F7FAFC', borderRadius: 14, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#EDF2F7' },
  cardInfoSection: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  iconCircleWrapper: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  metaDataBlock: { flex: 1 },
  stopHeadingText: { fontSize: 15, fontWeight: '700', color: '#2D3748' },
  disabledTextColor: { color: '#A0AEC0', textDecorationLine: 'line-through' },
  busLabelSubtitle: { fontSize: 12, color: '#718096', marginTop: 3, fontWeight: '500' },
  bottomFixedActionPanel: { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 10 : 20, paddingTop: 10, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#F0F4F8' },
  primaryAddButton: { height: 50, backgroundColor: '#046A38', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 2 },addButtonLabelText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },modalDimmedBackground: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' },modalSurfaceCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 24, paddingTop: 24, paddingBottom: Platform.OS === 'ios' ? 44 : 30, maxHeight: '85%' },modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },modalTitleText: { fontSize: 18, fontWeight: '700', color: '#1A202C' },formInputLabelStyle: { fontSize: 13, fontWeight: '600', color: '#046A38', marginTop: 14, marginBottom: 6 },inputFormBoxRow: { height: 48, backgroundColor: '#F7FAFC', borderRadius: 10, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', 
  paddingHorizontal: 12 },innerFormIcon: { marginRight: 8 },modalTextInputField: { flex: 1, fontSize: 14, color: '#2D3748', fontWeight: '500' },dropdownSelectorFieldBox: { height: 48, backgroundColor: '#F7FAFC', borderRadius: 10, borderWidth: 1, borderColor: '#EDF2F7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },dropdownLeftBlock: { flexDirection: 'row', alignItems: 'center' },dropdownValueText: { fontSize: 14, color: '#2D3748', fontWeight: '500' },dropdownExpansionContainerList: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EDF2F7', borderRadius: 10, marginTop: 4, overflow: 'hidden', elevation: 2 },dropdownListItemRow: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#F7FAFC' },dropdownListItemLabel: { fontSize: 13, color: '#4A5568', fontWeight: '500' },modalSaveActionSubmitBtn: { height: 48, backgroundColor: '#045028', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 24, elevation: 1 },modalSaveBtnTextText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }});