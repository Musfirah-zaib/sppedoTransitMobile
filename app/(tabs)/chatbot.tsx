import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ChatbotScreen() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 🟢 Premium Minimal Header Setup */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="menu-outline" size={24} color="#1A202C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Speedo</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="person-circle-outline" size={28} color="#718096" />
        </TouchableOpacity>
      </View>

      <Text style={styles.dateLabel}>Today, 9:41 AM</Text>

      {/* 💬 Conversation Stream */}
      <ScrollView 
        style={styles.chatFeed} 
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI System Welcome Message (Dual-Language English & Urdu) */}
        <View style={[styles.messageWrapper, styles.aiWrapper]}>
          <View style={[styles.bubble, styles.aiBubble]}>
            <Text style={styles.aiTextEn}>Hello! How can I help you navigate today?</Text>
            <Text style={styles.aiTextUr}>السلام علیکم! میں آج آپ کی نیویگیشن میں کیسے مدد کر سکتا ہوں؟</Text>
          </View>
        </View>

        {/* User Query Message */}
        <View style={[styles.messageWrapper, styles.userWrapper]}>
          <View style={[styles.bubble, styles.userBubble]}>
            <Text style={styles.userText}>When is the next bus to Gulberg?</Text>
          </View>
        </View>

        {/* AI Optimized Route Response */}
        <View style={[styles.messageWrapper, styles.aiWrapper]}>
          <View style={[styles.bubble, styles.aiBubble]}>
            <Text style={styles.aiTextEn}>
              The next Speedo bus to Gulberg (Route 4) arrives in <Text style={styles.boldText}>12 minutes</Text> at Liberty Station.
            </Text>
            <Text style={styles.aiTextUr}>
              اگلی سپیڈو بس گلبرگ کے لیے (روٹ 4) 12 منٹ میں لبرٹی اسٹیشن پہ آۓ گی۔
            </Text>

            {/* Embedded Micro-Route Card from your Stitch UI design */}
            <View style={styles.embeddedRouteCard}>
              <View style={styles.routeLeftSection}>
                <View style={styles.busIconContainer}>
                  <Ionicons name="bus-outline" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.routeMeta}>
                  <Text style={styles.routeNameText}>Route 4</Text>
                  <Text style={styles.routeStationText}>Liberty Station</Text>
                </View>
              </View>
              <Text style={styles.timeBadgeText}>12m</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Dynamic Voice Control System Panel */}
      <View style={styles.voiceControlPanel}>
        <TouchableOpacity 
          style={[styles.micButton, isRecording && styles.micButtonActive]}
          onPress={() => setIsRecording(!isRecording)}
          activeOpacity={0.8}
        >
          <Ionicons 
            name="mic" 
            size={28} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderColor: '#F0F4F8',
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
  dateLabel: {
    textAlign: 'center',
    fontSize: 11,
    color: '#A0AEC0',
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
  },
  chatFeed: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  aiWrapper: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  userBubble: {
    backgroundColor: '#046A38',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#F7FAFC',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  aiTextEn: {
    color: '#2D3748',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  aiTextUr: {
    color: '#4A5568',
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'right',
    marginTop: 8,
    fontWeight: '500',
  },
  boldText: {
    fontWeight: '700',
    color: '#046A38',
  },
  embeddedRouteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  routeLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIconContainer: {
    backgroundColor: '#046A38',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  routeMeta: {
    justifyContent: 'center',
  },
  routeNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A202C',
  },
  routeStationText: {
    fontSize: 11,
    color: '#718096',
    marginTop: 1,
  },
  timeBadgeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#046A38',
  },
  voiceControlPanel: {
    paddingBottom: 25,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  micButton: {
    backgroundColor: '#046A38',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#046A38',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  micButtonActive: {
    backgroundColor: '#E53E3E',
    shadowColor: '#E53E3E',
  },
});
