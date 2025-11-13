import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const imageUrl = listing.images && listing.images.length > 0
    ? `http://localhost:5000${listing.images[0]}`
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Link to={`/listing/${listing._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
            ${listing.price}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {listing.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {listing.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {listing.condition}
            </span>
            
            <span className="text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {listing.location}
            </span>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {listing.views} views
            </span>
            <span>{listing.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
