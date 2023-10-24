import { useEffect } from 'react';
import { io } from 'socket.io-client';

const NEXT_PUBLIC_BACKEND_URL = "http://back-dev.leonart-dev.ovh" || 'http://localhost:5000';
const socket = io(NEXT_PUBLIC_BACKEND_URL);

export function useWebSocket() {
  useEffect(() => {
    socket.connect();

    socket.on('RecieveMessage', (message) => {
      console.log('Message reçu:', message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
