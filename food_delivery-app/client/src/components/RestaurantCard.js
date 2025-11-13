import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-semibold">{restaurant.rating}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {restaurant.cuisine.map((type, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        
        {restaurant.minOrder > 0 && (
          <p className="text-xs text-gray-500 mt-2">Min. order: ${restaurant.minOrder}</p>
        )}
      </div>
    </Link>
  );
};

export default RestaurantCard;
