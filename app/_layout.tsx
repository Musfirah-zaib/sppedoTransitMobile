import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function GlobalRootAppLayout() {
  const segments = useSegments();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Guest mode skips this state

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Smooth entry window
      setIsLoading(false);
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Check what group the current screen is in
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    // Dynamic routing fallback loop
    if (!isAuthenticated && !inAuthGroup && !inTabsGroup) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#046A38' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="search-entry" />
      <Stack.Screen name="search-results" />
      <Stack.Screen name="route-details" />
    </Stack>
  );
}
