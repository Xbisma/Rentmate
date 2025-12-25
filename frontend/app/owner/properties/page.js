'use client';
import Link from 'next/link';
// import Header from '../../components/Header';
import { useProperty } from '../../context/PropertyContext';
import Header from '../Header';

export default function Properties() {
  const { properties } = useProperty();

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(1)} Lakh`;
    }
    return `PKR ${price.toLocaleString()}`;
  };

  const formatArea = (area) => {
    if (area >= 180) { // Assuming 1 marla = 30 sq yards
      const marla = Math.round(area / 30);
      return `${marla} Marla`;
    }
    return `${area} sqft`;
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `Added: ${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Added: ${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.images[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Featured Badge */}
                {property.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      SUPER HOT
                    </span>
                  </div>
                )}
                
                {/* Property Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                    {property.propertyType.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                {/* Price */}
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {formatPrice(property.rent)}
                  </h3>
                </div>

                {/* Address */}
                <p className="text-gray-700 font-medium mb-3">
                  {property.address}
                </p>

                {/* Property Features */}
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    {formatArea(property.area)}
                  </span>
                </div>

                {/* Property Description */}
                <p className="text-gray-800 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                {/* Added Date */}
                <div className="text-xs text-gray-500 mb-4">
                  {getTimeAgo(property.addedDate)}
                  {property.updatedDate !== property.addedDate && (
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
                    href={`/owner/properties/details/${property.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new property.</p>
            <div className="mt-6">
              <Link
                href="/owner/properties/add"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Property
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}