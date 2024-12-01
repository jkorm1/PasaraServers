import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux'; // If using Redux to track login status
// Create a context for WebSocket
const WebSocketContext = createContext();
import { setcards } from '@/Reducer';

// Custom hook to use the WebSocket context
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

// WebSocket provider component
export const WebSocketProvider = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.gl_variables.isLoggedIn); // Get the login status from Redux, or pass it as a prop
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.gl_variables.cards)


  useEffect(() => {
    if (isLoggedIn) {
      // Only establish WebSocket connection if the user is logged in
      const ws = new WebSocket('ws://192.168.12.163:8002/ws/socket-server/Server'); // Replace with your WebSocket server URL

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error', error);
      };

      ws.onmessage = (event) => {
        let newMessage;

        try {
            newMessage = JSON.parse(event.data);
        } catch (error) {
            console.error("Error parsing message:", error);
            return; // Exit early if parsing fails
        }
    
    
        // Check if newMessage.message exists and has the expected structure
        if (newMessage && newMessage.message) {
            const { type, Data } = newMessage.message;
    
            if (type === "Order_Message" && Data) {
                dispatch(setcards(Data))
            } else if (type === "greeting" && Data) {
                console.log("Greeting message:", newMessage.message);
            } else if(type === "Order_Message_refresh" && Data ){
                dispatch(setcards(Data))
            } 
            else {
                console.warn("Invalid message format or missing 'Data' property", newMessage);
            }
        } else {
            console.error("Received message does not have the expected structure:", newMessage);
        }
    };

      setSocket(ws);

      // Cleanup WebSocket connection on unmount or when user logs out
      return () => {
        if (ws) {
          ws.close();
        }
      };
    } else {
      console.log('User not logged in, not establishing WebSocket connection');
      setSocket(null); // Make sure socket is null if not logged in
      setIsConnected(false);
    }
  }, [isLoggedIn]); // Re-run the effect whenever `isLoggedIn` changes

  const sendMessage = (message) => {
    if (socket && isConnected) {
        socket.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
