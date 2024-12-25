import React from 'react';
import { ShoppingCart, History, Bell, BarChart, Settings, LayoutDashboard, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Toggle Button - Always visible, overlaid on content */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900/95 text-white hover:bg-gray-800 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar - Slides in/out */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 text-white shadow-xl 
                      backdrop-blur-sm border-r border-gray-800/50 
                      transition-transform duration-300 ease-in-out z-40
                      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-16 px-4">
          <ul className="space-y-6">
            <li className="flex flex-col items-center">
              <Link to="/profile" 
                    onClick={() => setIsOpen(false)}
                    className="group relative p-2 w-full flex items-center space-x-3 rounded-lg hover:bg-gray-800/50">
                <div className="relative">
                  <Avatar className="w-8 h-8 ring-2 ring-blue-500/50 group-hover:ring-blue-500 transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ATI</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-gray-900" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Profile</span>
              </Link>
            </li>
            
            <li className="w-full">
              <Link to="/orders" 
                    onClick={() => setIsOpen(false)}
                    className="group w-full flex items-center space-x-3 p-2 relative
                              hover:bg-gray-800/50 rounded-lg transition-all">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full 
                                flex items-center justify-center text-[10px] font-bold">3</div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Orders</span>
              </Link>
            </li>

            {/* Add other menu items with similar structure */}
          </ul>
        </div>
      </div>

      {/* Overlay - Closes sidebar when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
