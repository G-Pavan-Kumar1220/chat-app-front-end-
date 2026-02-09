import { io } from "socket.io-client";

const socket = io("https://chat-app-server-wn9j.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;