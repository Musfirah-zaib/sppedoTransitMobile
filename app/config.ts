import { Platform } from 'react-native';
export const LAPTOP_IP = "10.9.134.196"; 
export const PORT = "5000"; 
export const BASE_URL = `http://${LAPTOP_IP}:${PORT}`;
export const API_URL = `${BASE_URL}/api/v1`;

console.log(`[Speedo Transit Initialized Gateway]: Connecting downstream to ${API_URL}`);
