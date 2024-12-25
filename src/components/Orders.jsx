import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SwipeableCard from './SwipeableCard';
import OrderDetailSheet from './OrderDetailSheet';
import { setselectedcard } from '../Reducer';
import { useWebSocket } from './WebSocketContext';

function Orders() {
  const cards = useSelector((state) => state.gl_variables.cards);
  const userData = useSelector((state) => state.gl_variables.userData);
  const dispatch = useDispatch();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };
    setGreeting(getGreeting());
  }, []);

  const handleCloseDetails = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-5xl">
      {/* Compact Greeting */}
      <div className="flex items-center justify-between mb-4 bg-gray-800/50 rounded-lg p-2">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400 text-sm">👋</span>
          <div>
            <p className="text-sm text-gray-300">
              {greeting}, <span className="text-white font-medium">{userData?.first_name || 'Server'}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              You have {cards?.length || 0} orders to prepare
            </p>
          </div>
        </div>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 auto-rows-max">
        {cards?.map((card, index) => (
          <SwipeableCard
            key={card.Data.uuid}
            card={card}
            index={index}
            position={index + 1}
            onSelect={() => setIsSheetOpen(true)}
          />
        ))}
      </div>

      {/* Order Detail Sheet */}
      {isSheetOpen && <OrderDetailSheet close={handleCloseDetails} />}
    </div>
  );
}

export default Orders;
