'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../data/properties';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    // Get search parameters from URL
    const filters = {
      city: searchParams.get('city') || '',
      propertyType: searchParams.get('propertyType') || '',
      beds: searchParams.get('beds') || '',
      location: searchParams.get('location') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minArea: searchParams.get('minArea') || '',
      maxArea: searchParams.get('maxArea') || '',
    };
    
    setActiveFilters(filters);
    handleSearch(filters);
  }, [searchParams]);

  const handleSearch = (filters) => {
    setLoading(true);
    
    let filtered = properties;

    // Filter by city (more flexible matching)
    if (filters.city && filters.city !== 'All') {
      filtered = filtered.filter(prop => 
        prop.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Filter by property type (more flexible matching)
    if (filters.propertyType && filters.propertyType !== 'Homes') {
      filtered = filtered.filter(prop => 
        prop.type.toLowerCase().includes(filters.propertyType.toLowerCase()) ||
        filters.propertyType.toLowerCase().includes(prop.type.toLowerCase())
      );
    }

    // Filter by bedrooms
    if (filters.beds && filters.beds !== 'All') {
      if (filters.beds === '8+') {
        filtered = filtered.filter(prop => prop.bedrooms >= 8);
      } else {
        filtered = filtered.filter(prop => prop.bedrooms === parseInt(filters.beds));
      }
    }

    // Filter by location (if provided)
    if (filters.location) {
      filtered = filtered.filter(prop => 
        prop.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.minPrice && filters.minPrice !== '0' && filters.minPrice !== 'Any') {
      filtered = filtered.filter(prop => prop.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice && filters.maxPrice !== 'Any') {
      filtered = filtered.filter(prop => prop.price <= parseInt(filters.maxPrice));
    }

    // Filter by area range
    if (filters.minArea && filters.minArea !== '0' && filters.minArea !== 'Any') {
      filtered = filtered.filter(prop => prop.area >= parseFloat(filters.minArea));
    }
    if (filters.maxArea && filters.maxArea !== 'Any') {
      filtered = filtered.filter(prop => prop.area <= parseFloat(filters.maxArea));
    }

    setFilteredProperties(filtered);
    setLoading(false);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && value !== '' && value !== 'All' && value !== 'Homes' && value !== '0' && value !== 'Any'
    ).length;
  };

  // Add more sample properties to your data/properties.js
  const additionalProperties = [
    {
      id: "4",
      type: "House",
      purpose: "For Rent",
      price: 120000,
      currency: "PKR",
      bedrooms: 4,
      bathrooms: 3,
      area: 8,
      areaUnit: "Marla",
      location: "Sector F-10, Islamabad",
      added: "1 day ago",
      description: "Spacious 4-bedroom house in prime location of Islamabad with modern amenities and beautiful garden.",
      features: ["Garden", "Modern Kitchen", "Security", "Parking", "Near Market"],
      images: [
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80"
      ]
    },
    {
      id: "5",
      type: "Flat",
      purpose: "For Rent",
      price: 35000,
      currency: "PKR",
      bedrooms: 1,
      bathrooms: 1,
      area: 2,
      areaUnit: "Marla",
      location: "Blue Area, Islamabad",
      added: "3 days ago",
      description: "Cozy 1-bedroom flat in the heart of Blue Area with great connectivity to commercial areas.",
      features: ["Central Location", "Furnished", "Elevator", "Security"],
      images: [
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80"
      ]
    },
    {
      id: "6",
      type: "Apartment",
      purpose: "For Rent",
      price: 75000,
      currency: "PKR",
      bedrooms: 2,
      bathrooms: 2,
      area: 4,
      areaUnit: "Marla",
      location: "DHA Phase 2, Islamabad",
      added: "1 week ago",
      description: "Modern 2-bedroom apartment with premium finishes in DHA Phase 2.",
      features: ["Modern Design", "Parking", "Security", "Balcony"],
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "7",
      type: "House",
      purpose: "For Rent",
      price: 95000,
      currency: "PKR",
      bedrooms: 3,
      bathrooms: 2,
      area: 6,
      areaUnit: "Marla",
      location: "Bahria Town Phase 7, Islamabad",
      added: "2 days ago",
      description: "Beautiful 3-bedroom house in Bahria Town with modern amenities.",
      features: ["Garden", "Modern Kitchen", "Security", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
      ]
    },
    {
      id: "8",
      type: "Flat",
      purpose: "For Rent",
      price: 55000,
      currency: "PKR",
      bedrooms: 2,
      bathrooms: 1,
      area: 3,
      areaUnit: "Marla",
      location: "G-11 Markaz, Islamabad",
      added: "4 days ago",
      description: "Well-maintained 2-bedroom flat near G-11 Markaz with all basic amenities.",
      features: ["Near Market", "Security", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1984&q=80"
      ]
    }
  ];

  // Combine original properties with additional properties
  const allProperties = [...properties, ...additionalProperties];

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading properties...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Your Dream Home
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {filteredProperties.length > 0 
              ? `We found ${filteredProperties.length} perfect properties for you` 
              : 'No properties found with current filters'
            }
          </p>
        </motion.div>

        {/* Active Filters Badge */}
        {getActiveFilterCount() > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Active Filters: {getActiveFilterCount()}
            </span>
            {activeFilters.city && activeFilters.city !== 'All' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                📍 {activeFilters.city}
              </span>
            )}
            {activeFilters.propertyType && activeFilters.propertyType !== 'Homes' && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                🏠 {activeFilters.propertyType}
              </span>
            )}
            {activeFilters.beds && activeFilters.beds !== 'All' && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                🛏️ {activeFilters.beds} Beds
              </span>
            )}
          </motion.div>
        )}

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-6">
                Don't worry! Try adjusting your search criteria to find more options.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Quick Tips:</h4>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Try a different city or location
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Adjust your price range
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Consider different property types
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Modify number of bedrooms
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Load More Button (Optional) */}
        {filteredProperties.length > 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Load More Properties
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="page-container">
        <div className="content-container">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}