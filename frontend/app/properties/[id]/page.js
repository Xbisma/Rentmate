'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyDetails from '../../components/PropertyDetails';
import { getPropertyById } from '../../../services/propertyService';

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  return <PropertyDetails property={property} />;
}
