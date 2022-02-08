import socketIO from 'socket.io-client';
export const socket = socketIO('http://192.168.1.218:3001/', {
  
      transports: ['websocket'],
      jsonp: false,
    });