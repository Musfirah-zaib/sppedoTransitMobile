// 🟢 Bound directly to your current active laptop IPv4 address pool
export const LAPTOP_IP = "10.78.136.125"; 

// 🔌 Aligned strictly with your C# launchSettings.json profile port configuration
export const PORT = "5034"; 

export const BASE_URL = `http://${LAPTOP_IP}:${PORT}`;
export const API_URL = `${BASE_URL}/api/v1`;

console.log(`[Speedo Transit API Bridge Configured]: Streaming requests directly onto ${API_URL}`);
