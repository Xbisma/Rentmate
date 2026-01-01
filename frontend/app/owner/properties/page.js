'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOwnerProperties } from '../../../services/propertyService';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getOwnerProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'PKR N/A';
    if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(1)} Lakh`;
    }
    return `PKR ${price.toLocaleString()}`;
  };

  const formatArea = (area) => {
    if (!area && area !== 0) return 'N/A';
    if (area >= 180) { // Assuming 1 marla = 30 sq yards
      const marla = Math.round(area / 30);
      return `${marla} Marla`;
    }
    return `${area} sqft`;
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `Added: ${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Added: ${diffInDays} days ago`;
  };

  return (
    <div className="page-container">

      <main className="content-container">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Properties</h1>
          <p className="text-gray-600">Manage your property listings and track performance</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="card text-center border-red-200 bg-red-50">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-lg font-semibold mb-2">Failed to load properties</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={fetchProperties}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <div className="col-span-full card text-center">
                <p className="text-gray-600 mb-4">No properties found.</p>
                <Link href="/owner/properties/add" className="btn-primary">
                  Add Your First Property
                </Link>
              </div>
            ) : (
              properties.map((property) => (
                <div key={property?._id || property?.id || Math.random()} className="card card-hover animate-fade-in">
                  {/* Property Image */}
                  <div className="relative">
                    <img
                      src={property?.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"}
                      alt={property?.title || "Property"}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />

                    {/* Featured Badge */}
                    {property?.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          SUPER HOT
                        </span>
                      </div>
                    )}

                    {/* Property Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                        {property?.propertyType?.toUpperCase() || 'PROPERTY'}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    {/* Price */}
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {formatPrice(property?.rent)}
                      </h3>
                    </div>

                    {/* Address */}
                    <p className="text-gray-700 font-medium mb-4">
                      {property?.address || 'Address not available'}
                    </p>

                    {/* Property Features */}
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property?.bedrooms || 'N/A'}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {property?.bathrooms || 'N/A'}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        {formatArea(property?.area)}
                      </span>
                    </div>

                    {/* Property Description */}
                    <p className="text-gray-800 text-sm mb-4 line-clamp-2">
                      {property?.description || 'No description available'}
                    </p>

                    {/* Added Date */}
                    <div className="text-xs text-gray-500 mb-4">
                      {getTimeAgo(property?.addedDate)}
                      {property?.updatedDate && property?.updatedDate !== property?.addedDate && (
                        <span className="ml-2">(Updated: {getTimeAgo(property.updatedDate)})</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          EMAIL
                        </button>
                        <button className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          CALL
                        </button>
                      </div>
                      
                      <Link
                        href={`/owner/properties/details/${property?.id || property?._id || '#'}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}