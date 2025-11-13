import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, restaurant, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {/* Restaurant Info */}
        {restaurant && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{restaurant.name}</h2>
            <p className="text-gray-600 text-sm">{restaurant.cuisine.join(', ')}</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-primary-600 font-semibold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="h-5 w-5 text-gray-600" />
                </button>
                
                <span className="font-semibold text-gray-900 w-8 text-center">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(getTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${(getTotal() + 2.99 + getTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Proceed to Checkout
            </button>
            
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
