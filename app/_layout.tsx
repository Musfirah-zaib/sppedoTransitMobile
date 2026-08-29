import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#046A38" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="splash">
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" options={{ animation: 'fade' }} />
        <Stack.Screen name="signup" options={{ animation: 'slide_from_right' }} />
        
        {/* 🔑 This tells your app that the (tabs) folder contains its own internal layout */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
