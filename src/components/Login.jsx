import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setcards, setisLoggedIn, setsocket} from '@/Reducer';

function Login({}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const authenticateAndConnect = async (username,password) => {
        try {
            // Send a request to authenticate the user
            const response = await fetch('http://192.168.12.163:8002/servers/login_user/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    username:username,
                    password: password,
                }),
                credentials: 'include', // Ensure cookies are sent with the request
            });
            
            const data = await response.json();
            
           
            if (data.message === "Successfully") {
                //Cookies.set('isLoggedIn', 'true', { expires: 7 });
                dispatch(setisLoggedIn(true));
                navigate('/orders');
                console.log("at this point the user logged in successfully and isloggedIn is being set to true")
            } else {
                console.error("Authentication failed");
            }
            
        } catch (error) {
            console.error(username,"is not a staff");
            console.error("Error during authentication:", error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            //onLogin({ username, password });
            authenticateAndConnect(username,password);
        } else {
            console.log('Please enter both username and password.');
        }
    };


    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100"> {/* Normal background */}
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md rounded-lg p-6 w-full max-w-sm" // Colorful background
            >
                <h2 className="text-xl font-bold text-center text-white mb-4">Login</h2> {/* Changed text color to white */}
                <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-1">Username</label> {/* Changed label color to white */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="shadow border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-1">Password</label> {/* Changed label color to white */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white hover:bg-gray-200 text-blue-600 font-semibold py-2 rounded-md transition duration-200 ease-in-out w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
