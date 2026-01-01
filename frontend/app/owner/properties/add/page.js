'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../../../components/ImageUpload';
import { useProperty } from '../../../context/PropertyContext';

export default function AddProperty() {
  const router = useRouter();
  const { addProperty } = useProperty();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Available',
    address: '',
    city: '',
    monthlyRent: '',
    bedrooms: '',
    bathrooms: ''
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        city: formData.city,
        location: formData.address,
        price: Number(formData.monthlyRent),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        availability: formData.status.toLowerCase(),
        type: "Apartment", // ✅ REQUIRED FIX (DO NOT REMOVE)
        images: images.map(img => img.file).filter(Boolean)
      };

      await addProperty(data);
      router.push('/owner/properties');
    } catch (error) {
      console.error(error);
      alert('Failed to add property');
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
    setImages(newImages || []);
  };

  return (
    <div className="page-container">
      <main className="content-container">
        <div className="max-w-2xl mx-auto">
          <Link href="/owner/properties" className="btn-outline mb-6 inline-block">
            ← Back to Properties
          </Link>
          <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

          <form onSubmit={handleSubmit} className="card space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input-field"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="input-field"
            />

            <input
              type="number"
              name="monthlyRent"
              placeholder="Monthly Rent"
              value={formData.monthlyRent}
              onChange={handleChange}
              required
              className="input-field"
            />

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="input-field"
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="input-field"
            />

            <ImageUpload onImagesChange={handleImagesChange} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Adding...' : 'Add Property'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}