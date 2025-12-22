'use client';

import Navbar from '../components/Navbar';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function PropertiesPage() {
  const [properties] = useState([
    { id: 1, status: 'Available', type: 'House', price: 'PKR 1.25 Lakh', beds: 5, baths: 6 },
    { id: 2, status: 'Available', type: 'Apartment', price: 'PKR 85,000', beds: 3, baths: 2 },
  ]);

  const [filters, setFilters] = useState({
    city: '',
    propertyType: 'All Types',
    minPrice: 0,
    maxPrice: '',
    bedrooms: 'Any',
    status: 'Available'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Properties</h1>
        <p className="text-gray-600 mb-8">
          Find your perfect rental property with our advanced filters
        </p>

        {/* Filters Table */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full border rounded-lg p-3"
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Property Type</label>
              <select 
                className="w-full border rounded-lg p-3"
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
                className="w-full border rounded-lg p-3"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Max Price</label>
              <select 
                className="w-full border rounded-lg p-3"
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
                className="w-full border rounded-lg p-3"
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
                className="w-full border rounded-lg p-3"
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
            <button className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <Filter size={20} className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-700">{properties.length} properties found</p>
        </div>

        {/* Properties List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{property.type}</h3>
                  <p className="text-gray-600">{property.price}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {property.status}
                </span>
              </div>
              
              <div className="flex space-x-4 text-gray-600 mb-4">
                <span>Beds: {property.beds}</span>
                <span>Baths: {property.baths}</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}