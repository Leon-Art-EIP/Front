import { useEffect } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = "http://back-dev.leonart-dev.ovh";
const socket = io(BACKEND_URL);

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
