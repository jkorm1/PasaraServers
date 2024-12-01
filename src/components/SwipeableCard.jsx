import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch} from 'react-redux';
import { setselectedcard, setcards } from '@/Reducer';
import { useWebSocket } from './WebSocketContext';

function SwipeableCard({ card, index, position }) {
    const selectedcard = useSelector((state) => state.gl_variables.selectedcard);
    const cards = useSelector((state) => state.gl_variables.cards);
    const { socket, isConnected, sendMessage } = useWebSocket();
    const [swiped, setSwiped] = useState(false);
    const dispatch = useDispatch();
    
    const handleOnSwipeRight = () => {
        sendMessage({"type": "Completed Order", "Data": cards[index]})
        const updatedCards = cards.filter((_, i) => i !== index);
        dispatch(setcards(updatedCards));        
    }

    const calculateTotalCost = (containers) => {
        let totalCost = 0;
        
        // Iterate through each container
        Object.values(containers).forEach(container => {
            // Each container is an array of items
            container.forEach(item => {
                // Add main dish price
                totalCost += parseFloat(item.current_price || 0);
            });
        });
        
        return totalCost;
    };

    const getTotalItems = (containers) => {
        let totalItems = 0;
        Object.values(containers).forEach(container => {
            container.forEach(item => {
                totalItems += item.quantity || 1;
            });
        });
        return totalItems;
    };

    const handlers = useSwipeable({
        onSwipedRight: () => {
            console.log(`Swiped right on card ${card.user_id}`);
            setSwiped(true);
            handleOnSwipeRight();
        },
    });

    return (
        <div {...handlers} className={'swipeable-card transition-transform duration-1500 ease-out'}>
            <div
                onClick={() => {dispatch(setselectedcard(card))}}
                className={'rounded-lg ml-2 cursor-pointer transition-transform duration-200'}
            >
                <Card className="relative border rounded-lg shadow-md w-full md:w-[560px] h-[105px] p-3 flex flex-col items-center justify-center">
                    <CardHeader className="w-full">
                        <div className="flex justify-between w-full items-center">
                            <CardTitle className="text-left">Order #{card.user_id}</CardTitle>
                            <CardDescription className="text-right">{card.order_type}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="w-full flex justify-center">
                        <div className="flex justify-between items-start w-full">
                            <div className="flex flex-col items-start">
                                <p className="text-sm">Queue Number: {position}</p>
                                <p className="text-sm">Items: {getTotalItems(card.containers)}</p>
                            </div>
                            <div className="text-right flex flex-col">
                                <p className="text-lg">
                                    <span className='font-bold text-teal-950'>Ghc </span>
                                    <span>{calculateTotalCost(card.containers).toFixed(2)}</span>
                                </p>
                                <p className={'text-sm mt-2 text-blue-600'}>
                                    {card.Payment}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default SwipeableCard;
