import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, MapPin } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { orderAPI } from '../services/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Order not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Your order has been confirmed and will be delivered soon.
          </p>
          <p className="text-sm text-gray-500">
            Order ID: #{order._id.slice(-8)}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">{order.restaurant?.name}</p>
                <div className="mt-2 space-y-1">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Delivery Address</p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
                  {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Estimated Delivery</p>
                <p className="text-sm text-gray-600">30-45 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${(order.totalAmount - 2.99 - order.totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(order.totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
