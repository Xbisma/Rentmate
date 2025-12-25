'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperty } from '../../../../context/PropertyContext';
import Header from '../../../Header';

export default function PropertyDetails({ params }) {
  const router = useRouter();
  const { properties, deleteProperty } = useProperty();
  const [propertyId, setPropertyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Handle the async params
  useEffect(() => {
    async function getParams() {
      try {
        const resolvedParams = await params;
        setPropertyId(resolvedParams.id);
      } catch (error) {
        console.error('Error resolving params:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getParams();
  }, [params]);

  // Find the property based on propertyId
  const property = properties.find(prop => prop.id === parseInt(propertyId));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center">
            <div className="text-gray-600">Loading property details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Property not found</h1>
            <Link 
              href="/owner/properties" 
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteProperty(propertyId);
    setShowDeleteConfirm(false);
    setTimeout(() => {
      router.push('/owner/properties');
    }, 1000);
  };

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(1)} Lakh`;
    }
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/owner/properties" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            ← Back to Properties
          </Link>

          {/* Property Images */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Image */}
              <div className="lg:col-span-2">
                <img
                  src={property.images[selectedImage] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-2 gap-2">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Property Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 mb-4">📍 {property.address}</p>
                
                <div className="flex items-center space-x-6 text-gray-700 mb-4">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.bedrooms} Bedrooms
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {property.bathrooms} Bathrooms
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    {property.area} sqft
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(property.rent)}
                </div>
                <div className="text-gray-600">per month</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {property.amenities && property.amenities.split(', ').map((amenity, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            {amenity}
            </li>
  ))}
          </ul>
          </div>

          {/* Available From */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Available from 27 November 2025
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex space-x-4">
              <Link
                href={`/owner/properties/edit/${property.id}`}
                className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit Property
              </Link>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-4">This action cannot be undone. This will permanently delete the property.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}