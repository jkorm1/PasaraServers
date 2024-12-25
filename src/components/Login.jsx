import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setisLoggedIn, setUserData } from '../Reducer';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const authenticateAndConnect = async (username, password) => {
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('https://orders-management-control-centre-l52z5.ondigitalocean.app/servers/login_user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                credentials: 'include',
            });
            
            const data = await response.json();
            
            if (data.message === "Successfully") {
                dispatch(setisLoggedIn(true));
                dispatch(setUserData(data.user));
                navigate('/orders');
            } else {
                setError(data.error || 'Invalid username or password');
                dispatch(setisLoggedIn(false));
                dispatch(setUserData(null));
            }
        } catch (error) {
            console.error("Login error details:", error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }
        authenticateAndConnect(username, password);
    };

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
                    // Don't automatically redirect to login on session check failure
                    if (window.location.pathname !== '/authentication') {
                        dispatch(setisLoggedIn(false));
                        dispatch(setUserData(null));
                    }
                }
            } catch (error) {
                console.error('Session check error:', error);
                // Don't automatically redirect to login on network error
                if (window.location.pathname !== '/authentication') {
                    dispatch(setisLoggedIn(false));
                    dispatch(setUserData(null));
                }
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm w-full space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-lg font-medium text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Please sign in to continue
                    </p>
                </div>

                {/* Form */}
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-center text-red-500 bg-red-100/10 rounded-md py-2">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                loading 
                                    ? 'bg-indigo-500 opacity-50 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
