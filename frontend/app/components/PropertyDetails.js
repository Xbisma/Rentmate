'use client';

import React, { useState, useEffect } from 'react';
import { Bed, Bath, Square, Home, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  applyForProperty,
  getTenantApplications
} from '../../services/rentalApplicationService';

export default function PropertyDetails({ property }) {
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // ================= CHECK IF TENANT ALREADY APPLIED =================
  useEffect(() => {
    const checkApplied = async () => {
      try {
        const userType = localStorage.getItem('userType');
        if (userType !== 'tenant') return;

        const apps = await getTenantApplications();
        if (!Array.isArray(apps)) return;

        const applied = apps.some(app => {
          const pid =
            app.property?._id ||
            (typeof app.property === 'string' ? app.property : null);

          return pid === property._id;
        });

        setHasApplied(applied);
      } catch (err) {
        console.error('Check applied error:', err);
      }
    };

    checkApplied();
  }, [property._id]);

  // ================= IMAGE NAVIGATION =================
  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // ================= APPLY BUTTON CLICK =================
  const handleContactOwner = () => {
    if (hasApplied) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    setShowApplicationModal(true);
  };

  // ================= SUBMIT APPLICATION =================
  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    setApplicationMessage('');

    try {
      const data = await applyForProperty({
        propertyId: property._id,
        message: 'Interested in renting this property'
      });

      setApplicationMessage(
        data?.message || 'Application submitted successfully'
      );
      setHasApplied(true);

      setTimeout(() => {
        setShowApplicationModal(false);
        router.push('/tenant/applications');
      }, 1200);
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message ||
        error.message ||
        'Failed to submit application';
      setApplicationMessage(serverMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= UI =================
  return (
    <div className="page-container">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-800">Rentmate</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <Link href="/auth/login" className="flex items-center text-gray-700 hover:text-blue-600">
              <User className="w-4 h-4 mr-1" /> Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* IMAGE GALLERY */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="relative h-80">
            <img
              src={property.images[currentImageIndex]}
              alt="Property"
              className="w-full h-full object-cover"
            />

            {property.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 bg-white p-2 rounded-full">←</button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 bg-white p-2 rounded-full">→</button>
              </>
            )}
          </div>

          {property.images.length > 1 && (
            <div className="p-4 grid grid-cols-4 gap-2">
              {property.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-16 w-full object-cover rounded cursor-pointer border-2 ${
                    i === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between"><span>Type</span><span>{property.type}</span></div>
              <div className="flex justify-between"><span>Price</span><span>{property.price}</span></div>
              <div className="flex justify-between"><span>Bedrooms</span><span>{property.bedrooms}</span></div>
              <div className="flex justify-between"><span>Bathrooms</span><span>{property.bathrooms}</span></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span>City</span><span>{property.city}</span></div>
              <div className="flex justify-between"><span>Status</span><span>{property.availability}</span></div>
              <div className="flex justify-between"><span>Location</span><span>{property.location}</span></div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Description</h2>
          <p className="text-gray-700">{property.description}</p>
        </div>

        {/* APPLY BUTTON */}
        <div className="text-center py-8">
          <button
            onClick={handleContactOwner}
            disabled={hasApplied}
            className={`bg-blue-600 text-white px-16 py-4 rounded-lg text-lg ${hasApplied ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {hasApplied ? 'Already Applied' : 'Apply for Property'}
          </button>
        </div>
      </div>

      {/* ================= APPLICATION MODAL ================= */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Apply for Property</h3>

            {applicationMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                {applicationMessage}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 border rounded py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white rounded py-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
