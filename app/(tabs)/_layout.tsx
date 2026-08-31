import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#046A38',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: { 
          backgroundColor: '#FFFFFF', 
          borderTopWidth: 1, 
          borderTopColor: '#E2E8F0', 
          height: 70,        // 🚀 Tall layout frame provides full spacing protection
          paddingBottom: 14,  // 🚀 Lifts screen indicators clearly into visible ranges
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' }
      }}
    >
      <Tabs.Screen 
        name="dashboard" 
        options={{ 
          title: 'Speedo Hub', 
          tabBarLabel: 'Home', 
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="routes" 
        options={{ 
          title: 'Routes', 
          tabBarLabel: 'Routes', 
          tabBarIcon: ({ color, size }) => <Ionicons name="bus-outline" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="alarm-set" 
        options={{ 
          title: 'Alarms', 
          tabBarLabel: 'Alarms', 
          tabBarIcon: ({ color, size }) => <Ionicons name="alarm-outline" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="chatbot" 
        options={{ 
          title: 'AI Assistant', 
          tabBarLabel: 'AI Voice', 
          tabBarIcon: ({ color, size }) => <Ionicons name="mic-outline" size={size} color={color} /> 
        }} 
      />
    </Tabs>
  );
}
