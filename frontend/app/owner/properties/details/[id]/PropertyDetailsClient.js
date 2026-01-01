'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperty } from '../../../../context/PropertyContext';
import EditPropertyModal from '../../../properties/edit/[id]/page';
import { updateProperty as updatePropertyApi } from '../../../../../services/propertyService';
import toast from 'react-hot-toast';

export default function PropertyDetailsClient({ propertyId }) {
  const router = useRouter();
  const { properties, deleteProperty, fetchPropertyById } = useProperty();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!propertyId) return;
    setIsLoading(true);

    // Try to find the property in the local list first (support both _id and id)
    const found = (properties || []).find(
      (prop) => String(prop._id) === String(propertyId) || String(prop.id) === String(propertyId)
    );

    if (found) {
      setProperty(found);
      setIsLoading(false);
      return;
    }

    // If not found locally, fetch from API
    fetchPropertyById(propertyId)
      .then((res) => {
        setProperty(res);
      })
      .catch(() => {
        setProperty(null);
      })
      .finally(() => setIsLoading(false));
  }, [propertyId, properties, fetchPropertyById]);

  const handleDelete = () => {
    deleteProperty(propertyId);
    setShowDeleteConfirm(false);
    setTimeout(() => {
      router.push('/owner/properties');
    }, 1000);
  };

  const handleUpdateProperty = async (propertyId, formData) => {
  setIsUpdating(true);
  try {
    // Convert FormData to regular object if your API expects JSON
    // Or keep as FormData if your API handles multipart/form-data
    
    const updatedProperty = await updatePropertyApi(propertyId, formData);
    
    // Update local property state with the returned updated property
    setProperty(prev => ({
      ...prev,
      ...updatedProperty,
      // Ensure images are preserved if not returned
      images: updatedProperty.images || prev.images
    }));
    
    // Close modal
    setIsEditModalOpen(false);
    
    toast.success('Property updated successfully!');
    
  } catch (error) {
    console.error('Failed to update property:', error);
    
    toast.error('Failed to update property');
  } finally {
    setIsUpdating(false);
  }
};

  const formatPrice = (price) => {
    // Accept explicit price or fall back to known property fields
    const p = price ?? property?.price ?? property?.rent ?? property?.monthlyRent;
    if (p === undefined || p === null) return 'Price not available';
    if (p >= 100000) return `PKR ${(p / 100000).toFixed(1)} Lakh`;
    return `PKR ${p.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          Loading property details...
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Property not found
          </h1>
          <Link
            href="/owner/properties"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 transition-colors mb-6"
            aria-label="Back to properties"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back to Properties</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/owner/properties"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 transition-colors mb-6"
            aria-label="Back to properties"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back to Properties</span>
          </Link>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <img
                  src={
                    property.images[selectedImage] ||
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
                  }
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {property.images?.map((image, index) => (
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

          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="max-w-3xl mb-4 md:mb-0">
                {/* Conditionally hide title when it is identical to the address to avoid duplicate display */}
                {(() => {
                  const addressValue = (property.location || property.address || property.city || '').toString();
                  const titleValue = (property.title || '').toString();
                  const titleIsSameAsAddress = addressValue && titleValue && titleValue.trim().toLowerCase() === addressValue.trim().toLowerCase();
                  // If title matches address, hide the title entirely to avoid duplication
                  return !titleIsSameAsAddress && titleValue ? (
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  ) : null;
                })()}

                {/* Helper to render numbers safely */}
                {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                <script type="text/javascript">{`function __displayNumber(val){const n=Number(val);return Number.isFinite(n)&&n>=0?n:'—';}`}</script>

                {/* Address block */}
                <div className="mb-4 mt-2">
                  <h3 className="text-sm font-semibold text-gray-700">Address</h3>
                  <p className="text-gray-700 mt-2 text-lg font-medium">{property.location || property.address || property.city}</p>
                </div>

                <div className="flex items-center space-x-6 text-gray-700">
                  <span className="flex items-center">🛏 {property.bedrooms ?? '—'} Bedrooms</span>
                  <span className="flex items-center">🛁 {property.bathrooms ?? '—'} Bathrooms</span>
                  <span className="flex items-center">📐 {property.area ?? '—'} sqft</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{formatPrice(property.price ?? property.rent ?? property.monthlyRent)}</div>
                <div className="text-gray-600">per month</div>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${property.availability === 'rented' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {property.availability?.charAt(0).toUpperCase() + property.availability?.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full sm:flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Edit Property
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full sm:flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete Property
            </button>
          </div>
        </div>
      </main>

      {/* Edit Property Modal */}
      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        property={property}
        onUpdate={handleUpdateProperty}
        isSubmitting={isUpdating}
      />

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-4">This action cannot be undone.</p>
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