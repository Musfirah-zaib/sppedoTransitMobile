import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#046A38',
      tabBarInactiveTintColor: '#666666',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home Dashboard', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="chatbot" options={{ title: 'AI Assistant', tabBarLabel: 'AI Voice' }} />
    </Tabs>
  );
}
