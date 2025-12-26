'use client';

import Header from '../Header';
import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTenantProperties } from '../../../services/propertyService';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    city: '',
    propertyType: 'All Types',
    minPrice: 0,
    maxPrice: '',
    bedrooms: 'Any',
    status: 'Available'
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getTenantProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Properties</h1>
          <p className="text-gray-600 mb-8">
            Find your perfect rental property with our advanced filters
          </p>
        </div>

        {/* Filters Table */}
        <div className="card mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="input-field"
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Property Type</label>
              <select 
                className="input-field"
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              >
                <option>All Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                className="input-field"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Max Price</label>
              <select 
                className="input-field"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              >
                <option>Any</option>
                <option>50000</option>
                <option>100000</option>
                <option>150000</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Bedrooms</label>
              <select 
                className="input-field"
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              >
                <option>Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select 
                className="input-field"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option>Available</option>
                <option>Rented</option>
                <option>Under Maintenance</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-secondary flex items-center">
              <Filter size={20} className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 animate-fade-in">
          {loading ? (
            <p className="text-gray-700">Loading properties...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p className="text-gray-700">{properties.length} properties found</p>
          )}
        </div>

        {/* Properties List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchProperties} className="btn-primary">
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="card card-hover animate-fade-in">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600">PKR {property.price?.toLocaleString()}</p>
                  </div>
                  <span className={`status-badge ${property.availability === 'available' ? 'status-available' : 'status-rented'}`}>
                    {property.availability}
                  </span>
                </div>

                <div className="flex space-x-4 text-gray-600 mb-4">
                  <span>Beds: {property.bedrooms || 'N/A'}</span>
                  <span>Baths: {property.bathrooms || 'N/A'}</span>
                </div>

                <Link href={`/properties/${property._id}`} className="btn-primary w-full text-center block">
                  View Details
                </Link>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}