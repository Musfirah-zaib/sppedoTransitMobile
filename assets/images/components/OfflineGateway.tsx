import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OfflineGateway({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.overlayLayer}>
      <Ionicons name="wifi-outline" size={64} color="#E53E3E" />
      <Text style={styles.mainErrText}>Network Disconnected</Text>
      <Text style={styles.subErrPara}>Please verify your cellular data activation parameters or local wireless router connections to continue fetching live GPS telemetry data streams.</Text>
      <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryBtnText}>Retry Connection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayLayer: { ...StyleSheet.absoluteFillObject, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', padding: 30, zIndex: 9999 },
  mainErrText: { fontSize: 22, fontWeight: '800', color: '#1A202C', marginTop: 20 },
  subErrPara: { fontSize: 14, color: '#718096', textAlign: 'center', lineHeight: 22, marginTop: 10, fontWeight: '500' },
  retryBtn: { marginTop: 30, backgroundColor: '#046A38', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});
