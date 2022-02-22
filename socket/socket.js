import socketIO from 'socket.io-client';
export const socket = socketIO('https://ballin-api-production.herokuapp.com/', {
      transports: ['websocket'],
      jsonp: false,
    });