import React from 'react';
import { Plus, Star, Leaf } from 'lucide-react';

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.isVegetarian && (
          <div className="absolute top-2 left-2 bg-green-500 text-white p-1 rounded-full">
            <Leaf className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold">{item.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
          
          <button
            onClick={() => onAddToCart(item)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
        
        <div className="mt-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
