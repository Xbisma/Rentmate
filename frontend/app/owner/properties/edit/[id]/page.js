'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../Header';
import ImageUpload from '../../../../components/ImageUpload';
import { useProperty } from '../../../../context/PropertyContext';

export default function EditProperty({ params }) {
  const router = useRouter();
  const { properties, updateProperty } = useProperty();
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

  // Find the property based on propertyId
  const property = properties.find(prop => prop.id === parseInt(propertyId));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "Apartments",
    status: "Available",
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
        status: property.status || "Available",
        address: property.address || "",
        city: property.city || "",
        monthlyRent: property.rent?.toString() || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        area: property.area?.toString() || "",
        amenities: property.amenities || ""
      });
      setImages(property.images || []);
    }
  }, [property]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      updateProperty(propertyId, {
        ...formData,
        images: images
      });
      
      setTimeout(() => {
        router.push(`/owner/properties/edit/${propertyId}`);
      }, 1500);
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
            href={`/owner/properties/details/${propertyId}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            ← Back to Property Details
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

            {/* ... (Include all other form fields) ... */}

            {/* Image Upload */}
            <ImageUpload onImagesChange={handleImagesChange} existingImages={images} />

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Parking, Security, Gym, Swimming Pool (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple amenities with commas</p>
            </div>

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