'use client';
import React, { useState } from 'react';
import { Bed, Bath, Square, Home, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { applyForProperty } from '../../services/rentalApplicationService';

export default function PropertyDetails({ property }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactOwner = () => {
    // Check if user is logged in (you might want to check auth state here)
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    try {
      await applyForProperty({ propertyId: property._id });
      setApplicationMessage('Application submitted successfully!');
      setTimeout(() => {
        setShowApplicationModal(false);
        setApplicationMessage('');
      }, 2000);
    } catch (error) {
      setApplicationMessage('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-800">Rentmate</span>
            </Link>

            {/* Navigation Links - Removed Search */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/auth/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Rest of the PropertyDetails component remains exactly the same */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Image Gallery and Details */}
          <div className="lg:col-span-3">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative h-80">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.type}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.type} ${index + 1}`}
                      className={`h-16 w-full object-cover rounded cursor-pointer border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details Table */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Type</span>
                    <span className="text-gray-900">{property.type}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Price</span>
                    <span className="text-gray-900">{property.currency} {property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Bath(s)</span>
                    <span className="text-gray-900">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Area</span>
                    <span className="text-gray-900">{property.area} {property.areaUnit}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Purpose</span>
                    <span className="text-gray-900">{property.purpose}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Bedroom(s)</span>
                    <span className="text-gray-900">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Added</span>
                    <span className="text-gray-900">{property.added}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Location</span>
                    <span className="text-gray-900 text-right max-w-[200px] truncate">{property.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Main Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Built in year:</span>
                    <span className="text-gray-900">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Parking Spaces:</span>
                    <span className="text-gray-900">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Double Glazed Windows</span>
                    <span className="text-green-500">✓</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Central Air Conditioning</span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Central Heating</span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Flooring</span>
                    <span className="text-green-500">✓</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Electricity Backup</span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Waste Disposal</span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Floors:</span>
                    <span className="text-gray-900">2</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <div className="text-center">
                  <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1</div>
                  <div className="text-gray-600">Servant Quarters</div>
                </div>
              </div>
            </div>

            {/* Contact Owner Button */}
            <div className="text-center py-8">
              <button
                onClick={handleContactOwner}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-16 rounded-lg transition-colors duration-300 text-lg shadow-lg"
              >
                Apply for Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for Property</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to apply for this property? The owner will be notified of your application.
            </p>
            
            {applicationMessage && (
              <div className={`mb-4 p-3 rounded-lg ${
                applicationMessage.includes('successfully') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {applicationMessage}
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                className="flex-1 btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}