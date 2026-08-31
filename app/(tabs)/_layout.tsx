import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function CompleteNavigationLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#046A38',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', height: 65, paddingBottom: 10, paddingTop: 10 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Speedo Hub', tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="routes" options={{ title: 'Routes', tabBarLabel: 'Routes', tabBarIcon: ({ color, size }) => <Ionicons name="bus-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="chatbot" options={{ title: 'AI Assistant', tabBarLabel: 'AI Voice', tabBarIcon: ({ color, size }) => <Ionicons name="mic-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
