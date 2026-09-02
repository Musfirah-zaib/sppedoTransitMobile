import { Redirect } from 'expo-router';
import React from 'react';

export default function AppEntryRoutePointer() {
  // 🚀 Native Expo Router forward handler pushes users cleanly straight onto your login flow
  return <Redirect href="/(auth)/login" />;
}
