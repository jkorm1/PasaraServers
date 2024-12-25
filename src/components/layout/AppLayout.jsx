import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { Bell, Settings } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";

export function AppLayout() {
    const isLoggedIn = useSelector((state) => state.gl_variables.isLoggedIn);

    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className={cn(
                    "flex-1 overflow-y-auto",
                    "bg-gray-950/95 text-gray-100",
                    "transition-all duration-300 ease-in-out",
                    "scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent",
                )}>
                    <div className="flex items-center justify-between p-4 pl-16 mb-2">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                                <Bell className="w-5 h-5 text-gray-400" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                                <Settings className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="h-[calc(100vh-5rem)]">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}

export default AppLayout; 