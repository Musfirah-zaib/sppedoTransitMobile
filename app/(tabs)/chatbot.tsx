import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';

// 📍 Wired to your ASP.NET Core local Voice API controller endpoint
const CHATBOT_API_URL = 'http://192.168.0';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export default function VoiceChatbotHub() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([
    { id: '1', sender: 'assistant', text: 'Assalam-o-Alaikum! Where do you want to travel in Lahore today? (English/Urdu/Punjabi)' }
  ]);

  const toggleRecordingWorkflow = async () => {
    if (isRecording) {
      // Stopping mic recording capture
      setIsRecording(false);
      setIsProcessing(true);
      simulateVoicePayloadTransmission();
    } else {
      // Initializing physical phone mic audio stream capture pipeline
      setIsRecording(true);
    }
  };

  const simulateVoicePayloadTransmission = () => {
    // Simulates binary .wav transmission fetch pipeline to Whisper engine workers
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'user', text: 'From Kot Lakhpat to Thokar Niaz Baig' },
        { id: (Date.now() + 1).toString(), sender: 'assistant', text: 'Route Found! Take Speedo Line 14 to Depot Chowk Junction Terminal, then swap directly onto Speedo Line 22.' }
      ]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.bannerTitle}>Speedo AI Assistant</Text>
        <Text style={styles.bannerSubtitle}>Voice Routing Optimizer Engine</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chatStream} showsVerticalScrollIndicator={false}>
        {conversation.map((msg) => (
          <View key={msg.id} style={[styles.bubbleWrapper, msg.sender === 'user' ? styles.userAlign : styles.assistantAlign]}>
            <View style={[styles.bubble, msg.sender === 'user' ? styles.userBubble : styles.assistantBubble]}>
              <Text style={msg.sender === 'user' ? styles.userText : styles.assistantText}>{msg.text}</Text>
            </View>
          </View>
        ))}
        {isProcessing && (
          <View style={styles.loaderRow}>
            <ActivityIndicator color="#046A38" size="small" />
            <Text style={styles.loaderLabel}>Whisper AI Transcribing Speech Scripts...</Text>
          </View>
        )}
      </ScrollView>

      {/* Persistent Floating Mic Action Control Dock */}
      <View style={styles.microphoneDock}>
        <Text style={styles.dockInstruction}>
          {isRecording ? '🔴 Listening closely... Tap again to process audio text' : 'Tap mic icon to state transit query parameters'}
        </Text>
        <TouchableOpacity 
          style={[styles.micCircle, isRecording && styles.micRecordingActive]} 
          onPress={toggleRecordingWorkflow}
          activeOpacity={0.8}
        >
          <Text style={styles.micEmojiIcon}>{isRecording ? '⏹️' : '🎙️'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  headerBanner: { backgroundColor: '#046A38', padding: 20, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  bannerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  bannerSubtitle: { fontSize: 13, color: '#A3D9C9', marginTop: 2 },
  chatStream: { padding: 20, paddingBottom: 140 },
  bubbleWrapper: { width: '100%', flexDirection: 'row', marginBottom: 14 },
  userAlign: { justifyContent: 'flex-end' },
  assistantAlign: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
  userBubble: { backgroundColor: '#046A38', borderBottomRightRadius: 2 },
  assistantBubble: { backgroundColor: '#EBEBEB', borderBottomLeftRadius: 2 },
  userText: { color: '#FFFFFF', fontSize: 15 },
  assistantText: { color: '#212121', fontSize: 15, lineHeight: 20 },
  loaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start', marginLeft: 10 },
  loaderLabel: { fontSize: 13, color: '#666666' },
  microphoneDock: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', paddingTop: 16, paddingBottom: 24, alignItems: 'center', borderTopWidth: 1, borderColor: '#EBEBEB', shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 10 },
  dockInstruction: { fontSize: 13, color: '#666666', marginBottom: 12, fontWeight: '500' },
  micCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#046A38', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  micRecordingActive: { backgroundColor: '#D32F2F' },
  micEmojiIcon: { fontSize: 28, color: '#FFFFFF' }
});
