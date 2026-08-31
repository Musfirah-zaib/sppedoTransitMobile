import { Redirect } from 'expo-router';
import React from 'react';

export default function AppEntryRoutePointer() {
  // 🚀 Instantly redirects the application root to the main login group on boot
  return <Redirect href="/(auth)/login" />;
}
