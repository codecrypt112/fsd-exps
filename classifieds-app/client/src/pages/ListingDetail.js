import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
      setListing(response.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate('/my-listings');
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing');
      }
    }
  };

  const handleMarkAsSold = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('status', 'sold');
      
      await axios.put(`http://localhost:5000/api/listings/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchListing();
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
        </div>
      </div>
    );
  }

  const images = listing.images && listing.images.length > 0
    ? listing.images.map(img => `http://localhost:5000${img}`)
    : ['https://via.placeholder.com/800x600?text=No+Image'];

  const isOwner = user && listing.seller._id === user.id;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={listing.title}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
              }}
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${listing.title} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${
                    currentImageIndex === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Listing Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
            {listing.status === 'sold' && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                SOLD
              </span>
            )}
          </div>
          
          <div className="text-3xl font-bold text-blue-600 mb-6">
            ${listing.price}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-semibold mr-2">Category:</span> {listing.category}
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold mr-2">Condition:</span> {listing.condition}
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="font-semibold mr-2">Location:</span> {listing.location}
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-semibold mr-2">Views:</span> {listing.views}
            </div>
          </div>

          <div className="border-t pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
          </div>

          {/* Seller Information */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Seller Information</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {listing.seller.name}
              </p>
              {listing.seller.phone && (
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> {listing.seller.phone}
                </p>
              )}
              {listing.seller.email && (
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {listing.seller.email}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isOwner ? (
            <div className="flex gap-3">
              {listing.status === 'active' && (
                <button
                  onClick={handleMarkAsSold}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Mark as Sold
                </button>
              )}
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Delete Listing
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {listing.seller.phone && (
                <a
                  href={`tel:${listing.seller.phone}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Call Seller
                </a>
              )}
              {listing.seller.email && (
                <a
                  href={`mailto:${listing.seller.email}?subject=Inquiry about ${listing.title}`}
                  className="block w-full bg-gray-600 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Email Seller
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
