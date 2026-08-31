import { Redirect } from 'expo-router';
import React from 'react';

export default function AppEntryRoutePointer() {
  // 🚀 Native Expo Router forward handler pushes users cleanly straight onto your splash screen layout
  return <Redirect href="/splash" />;
}
