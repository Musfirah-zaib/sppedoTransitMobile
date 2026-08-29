import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Lets you test and view splash transitions directly via swipe down actions
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      router.replace('/splash'); // Re-triggers splash layout check
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.authContainer}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#046A38']} />}
      >
        {/* Your Form Layout elements remain here */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ authContainer: { flex: 1, backgroundColor: '#FFFFFF' } });
