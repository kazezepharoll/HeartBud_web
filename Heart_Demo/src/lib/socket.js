import { io } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

let socket = null;

// Lazily creates a single shared socket connection for the whole app so
// multiple components (dashboard, vitals monitor, alerts feed) reuse one
// WebSocket instead of opening a new one each.
export function getSocket() {
  if (!socket) {
    socket = io(API_BASE, { autoConnect: true, transports: ['websocket', 'polling'] });
  }
  return socket;
}
