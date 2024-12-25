import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setcards } from '../Reducer';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.gl_variables.isLoggedIn);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const dispatch = useDispatch();

    const handleMessage = useCallback((event) => {
        console.log('Raw WebSocket message received:', event.data);
        
        try {
            const parsedData = JSON.parse(event.data);
            console.log('Parsed WebSocket message:', parsedData);
            
            const messageContent = parsedData.message;
            
            if (messageContent && messageContent.type) {
                switch (messageContent.type) {
                    case "Order_Message_refresh":
                        console.log('Processing refresh data:', messageContent.Data);
                        dispatch(setcards({
                            type: "Order_Message_refresh",
                            Data: messageContent.Data
                        }));
                        break;
                    case "Order_Message":
                        console.log('Processing new order:', messageContent.Data);
                        dispatch(setcards({
                            type: "Order_Message",
                            Data: messageContent.Data
                        }));
                        break;
                }
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            const ws = new WebSocket('wss://orders-management-control-centre-l52z5.ondigitalocean.app/ws/socket-server/Server');

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

            ws.onmessage = handleMessage;

            setSocket(ws);

            return () => {
                if (ws) {
                    ws.close();
                }
            };
        } else {
            console.log('User not logged in, not establishing WebSocket connection');
            setSocket(null);
            setIsConnected(false);
        }
    }, [isLoggedIn, handleMessage]);

    return (
        <WebSocketContext.Provider value={{ 
            socket, 
            isConnected, 
            sendMessage: (message) => {
                if (socket && isConnected) {
                    socket.send(JSON.stringify(message));
                }
            }
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};
