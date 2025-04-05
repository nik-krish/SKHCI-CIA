// src/utils/socket.js
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  withCredentials: true,
  autoConnect: false,
});

export const connectSocket = (user) => {
  if (!socket.connected && user) {
    socket.auth = { userId: user._id };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
