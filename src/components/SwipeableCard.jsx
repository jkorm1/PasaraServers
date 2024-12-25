import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { setselectedcard, setcards } from '@/Reducer';
import { useWebSocket } from './WebSocketContext';
import { Card, CardContent } from "@/components/ui/card";

function SwipeableCard({ card, index, position, onSelect }) {
  const dispatch = useDispatch();
  const { sendMessage } = useWebSocket();
  const cards = useSelector((state) => state.gl_variables.cards);
  const selectedcard = useSelector((state) => state.gl_variables.selectedcard);
  const [swipeAmount, setSwipeAmount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!card?.Data?.containers) {
    console.log('Invalid card structure:', card);
    return null;
  }

  const orderData = card.Data;
  const isActive = selectedcard && selectedcard.uuid === orderData.uuid;

  console.log('Card Check:', {
    currentUUID: orderData.uuid,
    selectedUUID: selectedcard?.uuid,
    isActive
  });

  const handleCardClick = (e) => {
    if (swipeAmount === 0) {
      e.stopPropagation();
      dispatch(setselectedcard(orderData));
      onSelect?.();
    }
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Right') {
        setSwipeAmount(Math.max(0, Math.min(eventData.deltaX, 200)));
      }
    },
    onSwipedRight: (eventData) => {
      if (eventData.deltaX >= 150) {
        handleComplete();
      } else {
        setSwipeAmount(0);
      }
    },
    onSwiped: () => {
      if (!isCompleting) {
        setSwipeAmount(0);
      }
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  const handleComplete = () => {
    setIsCompleting(true);
    
    try {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }

    sendMessage({ 
      type: "Completed_Order", 
      Data: orderData,
      completedAt: new Date().toISOString(),
      serverID: "SERVER_ID"
    });

    setTimeout(() => {
      dispatch(setcards({
        type: "Order_Message_refresh",
        Data: cards.filter(c => c.Data.uuid !== orderData.uuid)
      }));
      setIsCompleting(false);
      setSwipeAmount(0);
    }, 500);
  };

  return (
    <Card
      {...handlers}
      onClick={handleCardClick}
      className={`relative overflow-hidden transition-all duration-200 
                 transform cursor-pointer
                 ${isCompleting ? 'opacity-50' : 'opacity-100'}
                 ${isActive ? 'ring-2 ring-yellow-500 shadow-lg shadow-yellow-500/20' : ''}
                 hover:bg-gray-700/50`}
      style={{
        transform: `translateX(${swipeAmount}px)`,
        backgroundColor: '#1f2937', // dark background
      }}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isActive ? 'text-yellow-400' : 'text-gray-300'}`}>
              #{position}
            </span>
            <span className="text-sm font-medium text-white">{orderData.name}</span>
          </div>
          <span className="text-xs text-gray-400">{orderData.order_type}</span>
        </div>
        <div className="mt-1">
          <span className="text-xs text-gray-400">ID: {orderData.user_id}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SwipeableCard;
