import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { restaurantAPI, menuAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        restaurantAPI.getById(id),
        menuAPI.getByRestaurant(id),
      ]);
      
      setRestaurant(restaurantRes.data);
      setMenuItems(menuRes.data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setError('Failed to load restaurant details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item, restaurant);
    // Optional: Show toast notification
    alert(`${item.name} added to cart!`);
  };

  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
  
  const filteredMenuItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Restaurants</span>
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full md:w-64 h-48 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {restaurant.name}
              </h1>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                
                {restaurant.minOrder > 0 && (
                  <div className="text-gray-600">
                    Min. order: ${restaurant.minOrder}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.cuisine.map((type, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredMenuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No menu items available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
