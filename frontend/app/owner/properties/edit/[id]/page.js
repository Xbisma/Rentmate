'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../Header';
import ImageUpload from '../../../../components/ImageUpload';
import { useProperty } from '../../../../context/PropertyContext';

export default function EditProperty({ params }) {
  const router = useRouter();
  const { properties, updateProperty, fetchPropertyById } = useProperty();
  const [propertyId, setPropertyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  // Find the property based on propertyId (support both _id and id)
  const property = (properties || []).find(
    (prop) => String(prop._id) === String(propertyId) || String(prop.id) === String(propertyId)
  );

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
      // Normalize existing image URLs into objects for ImageUpload component
      setImages((property.images || []).map(img => (typeof img === 'string' ? { id: img, preview: img } : img)));
      return;
    }

    // If property not found locally, fetch from API and populate form
    if (propertyId) {
      let cancelled = false;
      setIsLoading(true);
      fetchPropertyById(propertyId)
        .then((data) => {
          if (!cancelled && data) {
            setFormData({
              title: data.title || "",
              description: data.description || "",
              propertyType: data.propertyType || "Apartments",
              availability: data.availability || "available",
              address: data.location || data.address || data.city || "",
              city: data.city || "",
              monthlyRent: (data.price ?? data.rent ?? data.monthlyRent)?.toString() || "",
              bedrooms: data.bedrooms?.toString() || "",
              bathrooms: data.bathrooms?.toString() || "",
              area: data.area?.toString() || "",
              amenities: data.amenities || ""
            });
            // Normalize existing image URLs into objects for ImageUpload component
            setImages((data.images || []).map(img => (typeof img === 'string' ? { id: img, preview: img } : img)));
          }
        })
        .catch((err) => console.error('Failed to fetch property for edit:', err))
        .finally(() => setIsLoading(false));

      return () => { cancelled = true; };
    }
  }, [property, propertyId, fetchPropertyById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Build FormData to match addProperty behavior and support file uploads
      const fd = new FormData();
      fd.append('title', formData.title || '');
      fd.append('description', formData.description || '');
      fd.append('propertyType', formData.propertyType || 'Apartments');
      fd.append('availability', formData.availability || 'available');
      fd.append('location', formData.address || '');
      fd.append('city', formData.city || '');
      fd.append('price', formData.monthlyRent || '');
      fd.append('bedrooms', formData.bedrooms || '');
      fd.append('bathrooms', formData.bathrooms || '');
      fd.append('area', formData.area || '');

      // Separate new files from existing image URLs
      const newFiles = images.filter(img => img && img.file).map(img => img.file);
      const existingImages = images
        .filter(img => img && !img.file)
        .map(img => (typeof img === 'string' ? img : img.preview || img));

      newFiles.forEach(file => fd.append('images', file));
      // Pass existing image URLs to backend so it can merge them
      fd.append('existingImages', JSON.stringify(existingImages));

      // Call updateProperty with FormData
      await updateProperty(propertyId, fd);

      // After successful update, stay on edit page and show notification (already handled in context), optionally reload form
      router.push(`/owner/properties/details/${propertyId}`);
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center">
            <div className="text-gray-600">Loading edit form...</div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            href="/owner/properties"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 transition-colors mb-6"
            aria-label="Back to properties"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back to Properties</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Property</h1>
          <p className="text-gray-600 mb-6">Update your property details.</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* ... (Include all the same form fields as Add Property page) ... */}
            
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

            {/* Property Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Status</label>
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

            {/* Image Upload */}
            <ImageUpload onImagesChange={handleImagesChange} existingImages={images} />

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link
                href={`/owner/properties/details/${propertyId}`}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Property'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}