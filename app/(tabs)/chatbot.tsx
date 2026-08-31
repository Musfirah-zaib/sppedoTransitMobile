import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AIVoiceChatbotScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [feed, setFeed] = useState([
    { id: '1', text: 'Hello! Speak or type your destination route requirement.', type: 'ai' }
  ]);

  const handleSendMessage = () => {
    if (!textMessage.trim()) return;
    const userMsg = { id: Date.now().toString(), text: textMessage, type: 'user' };
    setFeed(prev => [...prev, userMsg]);
    setTextMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Voice Hub</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollFeed} showsVerticalScrollIndicator={false}>
          {feed.map(item => (
            <View key={item.id} style={[styles.bubble, item.type === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={item.type === 'user' ? styles.userText : styles.aiText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Unified Audio + Text Input Box Panel */}
        <View style={styles.inputBarRow}>
          <TouchableOpacity 
            style={[styles.micActionCircle, isRecording && { backgroundColor: '#E53E3E' }]}
            onPress={() => setIsRecording(!isRecording)}
          >
            <Ionicons name={isRecording ? "stop" : "mic"} size={22} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TextInput 
            style={styles.chatTextInputField}
            placeholder="Type your destination..."
            placeholderTextColor="#A0AEC0"
            value={textMessage}
            onChangeText={setTextMessage}
            onSubmitEditing={handleSendMessage}
          />
          
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <Ionicons name="send" size={18} color="#046A38" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 55, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#EDF2F7' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#046A38' },
  scrollFeed: { padding: 20 },
  bubble: { padding: 14, borderRadius: 14, marginBottom: 12, maxWidth: '80%' },
  userBubble: { backgroundColor: '#046A38', alignSelf: 'flex-end' },
  aiBubble: { backgroundColor: '#F7FAFC', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#E2E8F0' },
  userText: { color: '#FFFFFF', fontSize: 14 },
  aiText: { color: '#2D3748', fontSize: 14 },
  inputBarRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderColor: '#EDF2F7', alignItems: 'center', backgroundColor: '#FFFFFF' },
  micActionCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#046A38', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  chatTextInputField: { flex: 1, height: 42, backgroundColor: '#F7FAFC', borderRadius: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#EDF2F7', color: '#2D3748' },
  sendBtn: { padding: 10, marginLeft: 4 }
});
