import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import CentralCommuterDashboard from './(tabs)/dashboard';
import AIChatbotHub from './(tabs)/chatbot'; 
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
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
        },
      }}
    >
      <Tab.Screen
        name="DashboardHome"
        component={CentralCommuterDashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="VoiceAssistant"
        component={AIChatbotHub}
        options={{
          tabBarLabel: 'AI Voice',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mic-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}export default function CompleteNavigationLayout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#046A38',
        drawerInactiveTintColor: '#4A5568',
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
        headerStyle: {
          backgroundColor: '#046A38',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >   <Drawer.Screen 
        name="MainTabs" 
        component={BottomTabNavigator} 
        options={{ 
          title: 'Speedo Transit Hub',
          drawerLabel: 'Home Dashboard',
          drawerIcon: ({ color, size }) => <Ionicons name="bus-outline" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="RouteHistory" 
        component={PlaceholderScreen} 
        options={{ 
          title: 'Your Trips',
          drawerLabel: 'Travel History',
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />
        }} 
      />
    </Drawer.Navigator>
  );
}

function PlaceholderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
      <Text style={{ fontSize: 16, color: '#718096', fontWeight: '500' }}>Screen UI Layout Coming Next!</Text>
    </View>
  );
}
