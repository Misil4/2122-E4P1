import socketIO from 'socket.io-client';
export const socket = socketIO('https://ballin-api-stage.herokuapp.com/', {
      transports: ['websocket'],
      jsonp: false,
    });