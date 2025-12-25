'use client';

import Link from 'next/link';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            HOT
          </span>
        </div>
        
        {/* Property Image - Show actual image from property data */}
        <div className="h-48 relative overflow-hidden">
          {property.images && property.images.length > 0 ? (
            // Show actual property image from your data
            <img
              src={property.images[0]}
              alt={property.type}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Fallback gradient - shown if no image or image fails to load */}
          <div 
            className={`h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${
              property.images && property.images.length > 0 ? 'hidden' : 'flex'
            }`}
          >
            <div className="text-white text-center">
              <div className="text-4xl mb-2">🏠</div>
              <p className="text-sm font-medium">Property Image</p>
              {property.images && property.images.length > 0 && (
                <p className="text-xs mt-2 opacity-75">
                  Image URL: {property.images[0]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Price */}
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {property.currency} {property.price.toLocaleString()}
        </div>
        
        {/* Location */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {property.location}
        </h3>
        
        {/* Property Type */}
        <div className="text-gray-600 text-sm mb-4">
          {property.type} • {property.purpose}
        </div>
        
        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-1">
            🛏️ {property.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            🚿 {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            📐 {property.area} {property.areaUnit}
          </span>
        </div>
        
        {/* Added Date */}
        <div className="text-xs text-gray-500 mb-4">
          Added {property.added}
        </div>
        
        {/* Image URLs (for debugging) */}
        {property.images && property.images.length > 0 && (
          <div className="text-xs text-gray-400 mb-3">
            <details>
              <summary className="cursor-pointer">View Image URLs</summary>
              <div className="mt-2 space-y-1">
                {property.images.map((image, index) => (
                  <div key={index} className="break-all">
                    Image {index + 1}: {image}
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
        
        {/* View Details Button */}
        <Link href={`/properties/${property.id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;