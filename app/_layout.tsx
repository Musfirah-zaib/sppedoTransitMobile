import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState, createContext, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (val: boolean) => {}
});

export const useAuth = () => useContext(AuthContext);

export default function GlobalRootAppLayout() {
  const segments = useSegments();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // 🚀 FIXED: Force segment arrays data to string lists to bypass compilation errors
    const stringSegments = segments as string[];

    const inAuthGroup = stringSegments.includes('(auth)');
    const inTabsGroup = stringSegments.includes('(tabs)');

    // Fallback security protection wall redirection mapping sequence
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
    <SafeAreaProvider>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/signup" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="search-entry" />
          <Stack.Screen name="search-results" />
          <Stack.Screen name="route-details" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="settings" />
        </Stack>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
