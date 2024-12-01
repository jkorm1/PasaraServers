import React from 'react';
import { useSelector } from 'react-redux';

const OrderDetailSheet = ({ close }) => {
    const selectedcard = useSelector((state) => state.gl_variables.selectedcard)
    
    if (!selectedcard) {
        return null;
    }

    const { user_id, location, order_type, Payment, containers } = selectedcard;

    const calculateTotalAmount = () => {
        let total = 0;
        Object.values(containers).forEach(container => {
            container.forEach(item => {
                total += parseFloat(item.current_price || 0);
            });
        });
        return total;
    };

    const totalAmount = calculateTotalAmount();
    const tax = (totalAmount * 0.08).toFixed(2);
    const totalToPay = (parseFloat(totalAmount) + parseFloat(tax)).toFixed(2);

    return (
        <div className="fixed right-0 top-0 w-1/3 h-full shadow-lg p-6 z-20 overflow-y-auto bg-white">
            <button onClick={close} className="text-red-500 mb-4 text-lg font-semibold hover:underline">
                Close
            </button>

            <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Order #{user_id}</h2>
                <p className="text-gray-600">Location: {location ? `${location.lat}, ${location.long}` : 'On-site'}</p>
                <p className="text-gray-600">Order Type: {order_type}</p>
                <p className="text-gray-600">Payment Method: {Payment}</p>
            </div>

            <div className="mt-4">
                {Object.entries(containers).map(([containerId, items]) => (
                    <div key={containerId} className="mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800">Container #{containerId}</h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4 border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xl font-bold text-blue-600">{item.item_name}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            {item.customizations && Object.entries(item.customizations).map(([categoryId, customizations]) => (
                                                <div key={categoryId} className="ml-4 mt-2">
                                                    {Object.values(customizations).map((custom, idx) => (
                                                        <p key={idx} className="text-sm text-gray-600">
                                                            • {custom.name} (x{custom.quantity}) - ${custom.price}
                                                        </p>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">${item.current_price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg shadow-md">
                <p className="font-bold text-lg text-green-700">Summary:</p>
                <p className="text-gray-700">Subtotal: ${totalAmount.toFixed(2)}</p>
                <p className="text-gray-700">Tax (8%): ${tax}</p>
                <p className="font-bold text-lg text-green-800">Total to Pay: ${totalToPay}</p>
            </div>
        </div>
    );
};

export default OrderDetailSheet;
