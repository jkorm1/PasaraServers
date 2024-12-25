import React from 'react';
import { useSelector } from 'react-redux';
import { X, MapPin, Circle } from 'lucide-react';

const OrderDetailSheet = ({ close }) => {
    const selectedcard = useSelector((state) => state.gl_variables.selectedcard)
    
    if (!selectedcard) return null;
    
    const { user_id, location, order_type, payment_method: Payment, containers } = selectedcard;

    const handleBackdropClick = (e) => {
        // Only close if clicking the backdrop, not the content
        if (e.target === e.currentTarget) {
            close();
        }
    };

    const calculateTotalAmount = () => {
        if (!containers) return 0;
        
        let total = 0;
        try {
            // Iterate through each container
            Object.values(containers).forEach(container => {
                if (!Array.isArray(container)) return;
                
                // Calculate total for each item in container
                container.forEach(item => {
                    // Base item calculation (base_price * quantity)
                    const basePrice = parseFloat(item?.base_price || 0);
                    const quantity = parseInt(item?.quantity || 0);
                    total += (basePrice * quantity);

                    // Add customization costs if they exist
                    if (item.customizations) {
                        Object.values(item.customizations).forEach(category => {
                            Object.values(category).forEach(custom => {
                                if (custom.price && custom.quantity) {
                                    const customPrice = parseFloat(custom.price);
                                    const customQuantity = parseInt(custom.quantity);
                                    total += (customPrice * customQuantity);
                                }
                            });
                        });
                    }
                });
            });
        } catch (error) {
            console.error('Error calculating total:', error);
            return 0;
        }
        return total;
    };

    const totalAmount = calculateTotalAmount();

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45]"
                onClick={handleBackdropClick}
            />
            
            <div className={`fixed right-0 top-0 
                ${selectedcard ? 'translate-x-0' : 'translate-x-full'}
                h-screen w-full max-w-[400px]
                bg-gray-900/95 border-l border-gray-800/50 
                backdrop-blur-sm z-[50] 
                transition-all duration-300 ease-in-out
                overflow-hidden`}>
                
                {/* Header with close button */}
                <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-white">Order #{user_id}</h2>
                            <p className="text-xs text-gray-400 mt-1">{order_type}</p>
                        </div>
                        <button 
                            onClick={close}
                            className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 
                                     hover:text-white transition-all"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    <div className="divide-y divide-gray-800/50">
                        {/* Order Info Section */}
                        <div className="p-4 bg-gray-800/10">
                            <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-300">
                                            {location ? `${location.lat}, ${location.long}` : 'On-site'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            Payment === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                                        }`} />
                                        <span className={`text-sm font-medium ${
                                            Payment === 'Paid' ? 'text-green-400' : 'text-yellow-400'
                                        }`}>
                                            {Payment}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="p-4 space-y-4">
                            {Object.entries(containers).map(([containerId, items]) => (
                                <div key={containerId} 
                                     className="bg-gray-800/30 rounded-lg overflow-hidden hover:bg-gray-800/40 transition-colors">
                                    <div className="bg-gray-800/50 p-3 border-b border-gray-700/50">
                                        <h3 className="text-sm font-medium text-blue-300">
                                            Container #{containerId}
                                        </h3>
                                    </div>
                                    <div className="p-4 space-y-6">
                                        {items.map((item, index) => (
                                            <div key={index} className="space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <p className="text-lg font-medium text-amber-200/90">
                                                            {item.item_name}
                                                        </p>
                                                        <p className="text-sm text-blue-300/80">
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-gray-400">GH₵{item.base_price}</p>
                                                </div>
                                                
                                                {item.customizations && (
                                                    <div className="pl-4 space-y-2 border-l-2 border-amber-500/20">
                                                        {Object.entries(item.customizations).map(([categoryId, customizations]) => (
                                                            <div key={categoryId}>
                                                                {Object.values(customizations).map((custom, idx) => (
                                                                    <div key={idx} 
                                                                         className="flex justify-between text-sm items-center py-0.5">
                                                                        <span className="flex items-center gap-2 text-gray-300">
                                                                            <Circle className="w-1.5 h-1.5 text-blue-400" />
                                                                            <span className="font-medium">
                                                                                {custom.name}
                                                                            </span>
                                                                            <span className="text-gray-500">
                                                                                x{custom.quantity}
                                                                            </span>
                                                                        </span>
                                                                        <span className="text-xs text-gray-500">
                                                                            GH₵{custom.price}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Section */}
                        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm p-4">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Total Amount</span>
                                <span>GH₵{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailSheet;
