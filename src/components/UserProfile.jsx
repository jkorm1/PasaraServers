import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../Reducer'; // Fixed import path
import { useWebSocket } from './WebSocketContext';

const UserProfile = () => {
    const userData = useSelector((state) => state.gl_variables.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('https://orders-management-control-centre-l52z5.ondigitalocean.app/servers/logout_user/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                dispatch(clearUserData());
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-gray-400 text-sm">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-3 sm:p-4">
            <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                {/* Header with Logout Button */}
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-white">Profile</h1>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        Logout
                    </button>
                </div>

                {/* Profile Content */}
                <div className="p-4 space-y-4">
                    {/* Basic Info */}
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-lg text-gray-300">
                                {userData.first_name?.[0] || userData.username?.[0] || '?'}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-base font-medium text-white">
                                {userData.first_name} {userData.last_name}
                            </h2>
                            <p className="text-sm text-gray-400">{userData.role}</p>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid gap-3">
                        <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-xs text-gray-400 mb-1">Username</p>
                            <p className="text-sm text-white">{userData.username}</p>
                        </div>
                        <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-xs text-gray-400 mb-1">Email</p>
                            <p className="text-sm text-white">{userData.email}</p>
                        </div>
                        {userData.phone && (
                            <div className="bg-gray-700/30 p-3 rounded-md">
                                <p className="text-xs text-gray-400 mb-1">Phone</p>
                                <p className="text-sm text-white">{userData.phone}</p>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-xs text-gray-400 mb-1">Total Sales</p>
                            <p className="text-base font-medium text-white">
                                GH₵{userData.total_sales?.toFixed(2) || '0.00'}
                            </p>
                        </div>
                        <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-xs text-gray-400 mb-1">Average Sale</p>
                            <p className="text-base font-medium text-white">
                                GH₵{userData.average_sale?.toFixed(2) || '0.00'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
