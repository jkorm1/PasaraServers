import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import OrderDetailSheet from './OrderDetailSheet';
import { SkeletonCard } from './SkeletonCard';
import SwipeableCard from './SwipeableCard.jsx';
import { useSelector, useDispatch } from 'react-redux';


function Orders({}) {
    const [loading, setLoading] = useState(true);
    const [cardStatus, setCardStatus] = useState({});
    const [showingStatus, setShowingStatus] = useState('onProcessOrPending');
    const cards = useSelector((state)=>state.gl_variables.cards)


    // Effect to initialize card statuses and simulate loading
      useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoading(false)
        },100);
        return()=> clearTimeout(timer)
      },[])


    //const closeOrderDetail = () => {
      //  if (window.confirm("Are you sure you want to close the order details?")) {
        //    setSelectedOrder(null);
          //  setExpandedCards([]);
        //}
    //};

    /**const filteredCards = cards.filter(card => {
        if (showingStatus === 'onProcessOrPending') {
            return cardStatus[card.user_id] === 'On Process' || cardStatus[card.user_id] === 'Pending';
        } else if (showingStatus === 'completed') {
            return cardStatus[card.user_id] === 'Completed';
        }
        return false; // Ensure no cards are shown when neither button is active
    });
    */

    useEffect(() => {
        console.log(cards);
    }, [cards]);

    return (
      <div className="bg-gray-200 h-screen flex overflow-hidden">
        <Sidebar />
          <div className="ml-[80px] p-4 w-full flex-grow overflow-auto">
              <div className="space-y-4">

                <div className="flex space-x-4 mb-4">
                    <button
                      className={`bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded ${showingStatus === 'onProcessOrPending' ? 'bg-blue-600' : ''}`}
                      //onClick={() => setShowingStatus('onProcessOrPending')}
                    >
                        On Process
                    </button>
                    <button
                      className={`bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded ${showingStatus === 'completed' ? 'bg-blue-600' : ''}`}
                      //onClick={() => setShowingStatus('completed')}
                    >
                      Completed
                    </button>
                </div>

                <div className="flex flex-col w-full md:w-[560px] space-y-4">
                  {loading ? (
                      Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                  ) : (
                      cards.map((card, index) => (
                          <SwipeableCard
                            key={index}
                            index={index}
                            card={card}
                            position={index + 1}
                          />
                      ))
                  )}
                </div>

                <OrderDetailSheet
                    //close={closeOrderDetail}
                  />


            </div>
          </div>
    
    </div>
    );
}

export default Orders;
