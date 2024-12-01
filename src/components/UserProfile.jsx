import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';


const UserProfile = ({setIsLoggedIn}) => {
  const user = {
    name: "Solomon Attipoe",
    role: "Salesperson",
    email: "solomonattipoemensah@gmail.com",
    phone: "+233543316245",
    totalSales: 10000,
    averageSale: 200,
  };

  const navigate = useNavigate()

    
const handleLogout = async () => {
      try {
          // Send a request to logout the user on the backend
          const response = await fetch('http://192.168.20.163:8002/servers/logout_user/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
              credentials: 'include', // Ensure cookies are sent with the request
          });
  
          const data = await response.json();
  
          if (data.message === "Logged Out") {
              navigate('/authentication')
              // Clear the cookies and client-side state
              setIsLoggedIn(false); // Update the login state in parent
              //Cookies.remove('isLoggedIn'); // Remove the session cookie
              console.log("User logged out gracefully");
  
              // Optionally, you can redirect the user to the login page after logout:
              // window.location.href = '/login';
          } else {
              console.error("Couldn't log out. Error:", data.message);
          }
      } catch (error) {
          console.error("Error during logout:", error);
      }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center mb-4 space-y-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>ATI</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
        <p className="text-gray-500">{user.role}</p>
        <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
        <p className="text-gray-700 dark:text-gray-300">{user.phone}</p>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Sales Performance</h3>
      <p>Total Sales: <span className="font-medium text-gray-900 dark:text-white">${user.totalSales}</span></p>
      <p>Average Sale: <span className="font-medium text-gray-900 dark:text-white">${user.averageSale}</span></p>
      
      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Account Settings</h3>
      <ul className="list-disc list-inside mb-4 text-gray-900 dark:text-white">
        <li><a href="#" className="text-blue-500 hover:underline dark:text-blue-400">Change Password</a></li>
        <li><a href="#" className="text-blue-500 hover:underline dark:text-blue-400">Manage Payment Methods</a></li>
        <li><a href="#" className="text-blue-500 hover:underline dark:text-blue-400">Notification Preferences</a></li>
      </ul>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Help & Support</h3>
      <ul className="list-disc list-inside mb-4 text-gray-900 dark:text-white">
        <li><a href="#" className="text-blue-500 hover:underline dark:text-blue-400">Help Center</a></li>
        <li><a href="#" className="text-blue-500 hover:underline dark:text-blue-400">Contact Support</a></li>
      </ul>

      <div className="flex justify-center">
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-300 ease-in-out">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
