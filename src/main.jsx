import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import App from './App.jsx'
import store from './Store'
import { WebSocketProvider } from './components/WebSocketContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </Provider>
  </StrictMode>,
)
