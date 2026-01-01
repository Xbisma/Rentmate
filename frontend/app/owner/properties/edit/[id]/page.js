'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '../../../../components/ImageUpload';

export default function EditPropertyModal({ 
  isOpen, 
  onClose, 
  property, 
  onUpdate,
  isSubmitting = false 
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "Apartments",
    availability: "available",
    address: "",
    city: "",
    monthlyRent: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: ""
  });

  const [images, setImages] = useState([]);

  // In the EditPropertyModal component, update the useEffect:

useEffect(() => {
  if (property) {
    setFormData({
      title: property.title || "",
      description: property.description || "",
      propertyType: property.propertyType || "Apartments",
      availability: property.availability || "available",
      address: property.location || property.address || "",
      city: property.city || "",
      monthlyRent: property.price?.toString() || property.rent?.toString() || "",
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area?.toString() || "",
      amenities: property.amenities || ""
    });
    
    // Normalize existing image URLs
    const normalizedImages = (property.images || []).map((img, index) => {
      if (typeof img === 'string') {
        return { 
          id: `existing-${index}`, 
          preview: img, 
          isExisting: true 
        };
      }
      return { 
        ...img, 
        isExisting: true 
      };
    });
    
    setImages(normalizedImages);
  }
}, [property]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build FormData to match API expectations
    const fd = new FormData();
    fd.append('title', formData.title || '');
    fd.append('description', formData.description || '');
    fd.append('propertyType', formData.propertyType || 'Apartments');
    fd.append('availability', formData.availability || 'available');
    fd.append('location', formData.address || '');
    fd.append('city', formData.city || '');
    fd.append('price', formData.monthlyRent || '');
    fd.append('rent', formData.monthlyRent || '');
    fd.append('bedrooms', formData.bedrooms || '');
    fd.append('bathrooms', formData.bathrooms || '');
    fd.append('area', formData.area || '');
    fd.append('amenities', formData.amenities || '');

    // Separate new files from existing image URLs
    const newFiles = images.filter(img => img && img.file).map(img => img.file);
    const existingImages = images
      .filter(img => img && !img.file && img.isExisting)
      .map(img => img.preview || img);

    newFiles.forEach(file => fd.append('images', file));
    fd.append('existingImages', JSON.stringify(existingImages));

    // Call update function
    onUpdate(property?._id || property?.id, fd);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Property
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Update your property details
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white">
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Property Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="Apartments">Apartments</option>
                      <option value="House">House</option>
                      <option value="Flat">Flat</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  {/* Monthly Rent */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Rent *
                    </label>
                    <input
                      type="number"
                      name="monthlyRent"
                      value={formData.monthlyRent}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Status
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="available">Available</option>
                      <option value="rented">Rented</option>
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      min="0"
                    />
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      min="0"
                    />
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (sqft)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    min="0"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="e.g., Parking, Gym, Pool, Security"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Images
                  </label>
                  <ImageUpload 
                    onImagesChange={handleImagesChange} 
                    existingImages={images}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : 'Update Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}