import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function CompleteNavigationLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Shows the top layout header bar cleanly
        headerStyle: {
          backgroundColor: '#046A38', // Premium Speedo Emerald Green
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#046A38',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      }}
    >
      {/* 1️⃣ Points directly to your app/(tabs)/dashboard.tsx screen */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Speedo Transit Hub',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 2️⃣ Points directly to your app/(tabs)/routes.tsx screen */}
      <Tabs.Screen
        name="routes"
        options={{
          title: 'Routes Directory',
          tabBarLabel: 'Routes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bus-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 3️⃣ Points directly to your app/(tabs)/chatbot.tsx screen */}
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'AI Voice Assistant',
          tabBarLabel: 'AI Voice',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mic-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
