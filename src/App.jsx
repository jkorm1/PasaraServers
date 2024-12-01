import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import Notifications from './components/Notification';
import Reports from './components/Reports';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setcardsData] = useState([]);
    return(
    <Router>
        <Routes>

            <Route path="/authentication" element={<Login isLoggedIn={isLoggedIn} 
                                                    setIsLoggedIn={setIsLoggedIn}
                                                    cards={cards}
                                                    setcardsData={setcardsData}/>}
                                                    />

            <Route path="/orders" element={<Orders isLoggedIn={isLoggedIn}
                                            setIsLoggedIn={setIsLoggedIn} 
                                            cards={cards}
                                            setcardsData={setcardsData}/>}
                                            />

            <Route path="/dashboard" element={<Dashboard/>}/>

            <Route path="/profile" element={<UserProfile isLoggedIn={isLoggedIn} 
                                            setIsLoggedIn={setIsLoggedIn}/>}
                                            />

            <Route path="/order-history" element={<OrderHistory/>}/>

            <Route path="/notifications" element={<Notifications />}/>

            <Route path="/reports" element={<Reports />}/>

            <Route path="/settings" element={<Settings />}/>

            <Route path="/user-management" element={<UserManagement />}/>

        </Routes>
    </Router>
    )} 
            
export default App;
