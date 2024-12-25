import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import Login from './components/Login';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import Notifications from './components/Notification';
import Reports from './components/Reports';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';
import { useDispatch, useSelector } from 'react-redux';
import { setisLoggedIn, setUserData } from './Reducer';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.gl_variables.isLoggedIn);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('https://orders-management-control-centre-l52z5.ondigitalocean.app/servers/login_user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        username: '',
                        password: ''
                    })
                });

                const data = await response.json();
                
                if (data.message === "Successfully") {
                    dispatch(setisLoggedIn(true));
                    dispatch(setUserData(data.user));
                } else {
                    dispatch(setisLoggedIn(false));
                    dispatch(setUserData(null));
                }
            } catch (error) {
                console.error('Session check error:', error);
                dispatch(setisLoggedIn(false));
                dispatch(setUserData(null));
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        isLoggedIn ? (
                            <Navigate to="/orders" replace />
                        ) : (
                            <Navigate to="/authentication" replace />
                        )
                    } 
                />
                <Route 
                    path="/authentication" 
                    element={
                        isLoggedIn ? (
                            <Navigate to="/orders" replace />
                        ) : (
                            <Login />
                        )
                    } 
                />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}><AppLayout /></ProtectedRoute>}>
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/user-management" element={<UserManagement />} />
                </Route>
            </Routes>
        </Router>
    );
}

const ProtectedRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <Navigate to="/authentication" replace />;
};

export default App;
