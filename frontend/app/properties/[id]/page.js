// app/properties/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import PropertyDetails from '../../components/PropertyDetails';
import { getTenantPropertyById } from '../../../services/propertyService';

export default function PropertyPage({ params }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { id } = await params;
        const data = await getTenantPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError('Failed to load property');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="card text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="card text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-4">
              {error || "The property you're looking for doesn't exist."}
            </p>
            <a 
              href="/" 
              className="btn-primary"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <PropertyDetails property={property} />;
}