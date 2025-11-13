import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { restaurantAPI } from '../services/api';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.cuisine.some((c) =>
            c.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchTerm, restaurants]);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('Failed to load restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Delicious Food, Delivered Fast
          </h1>
          <p className="text-xl mb-8">
            Order from your favorite restaurants and get it delivered to your doorstep
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {searchTerm ? 'Search Results' : 'All Restaurants'}
            </h2>
            
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {searchTerm
                    ? 'No restaurants found matching your search.'
                    : 'No restaurants available at the moment.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
