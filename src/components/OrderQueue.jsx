import React from 'react';
import { useSelector } from 'react-redux';
import SwipeableCard from './SwipeableCard';

function OrderQueue() {
  const orders = useSelector(state => state.gl_variables.cards);
  
  return (
    <div className="grid gap-4 p-4">
      {/* Active Orders */}
      <div className="text-xl font-bold text-white mb-2">
        Active Orders ({orders.length})
      </div>
      
      {orders.map((order, index) => (
        <SwipeableCard
          key={order.id}
          card={order}
          index={index}
          position={index + 1}
        />
      ))}
    </div>
  );
}

export default OrderQueue; 