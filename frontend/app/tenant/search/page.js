"use client";
import { useState } from "react";
import Link from "next/link";
import { filterProperties } from "../../../services/propertyService";
import PropertyCard from "../../components/PropertyCard";

export default function SearchProperties() {
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [status, setStatus] = useState("Available");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"];
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setShowDropdown(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (city) filters.city = city;
      if (propertyType && propertyType !== "All Types") filters.type = propertyType;
      if (minPrice) filters.price = { $gte: parseInt(minPrice) };
      if (maxPrice) {
        filters.price = { ...filters.price, $lte: parseInt(maxPrice) };
      }
      if (bedrooms && bedrooms !== "Any") filters.bedrooms = parseInt(bedrooms);
      if (status) filters.availability = status.toLowerCase();

      const result = await filterProperties(filters);
      setProperties(result);
    } catch (error) {
      console.error("Error searching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setCity("");
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setStatus("Available");
    setProperties([]);
  };

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Back to Home Button */}
        <Link 
          href="/tenant/dashboard" 
          className="btn-secondary inline-flex items-center gap-2 mb-6 animate-fade-in"
        >
          ← Back to Home
        </Link>

        {/* Header Section */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Properties
          </h1>
          <p className="text-gray-600 text-lg">
            Find your perfect rental property with our advanced filters
          </p>
        </div>

        {/* Filter Box */}
        <div className="card mb-8 animate-fade-in">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* City Field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                City
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="input-field"
                />
                {showDropdown && filteredCities.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredCities.map((c) => (
                      <li
                        key={c}
                        className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors text-gray-900"
                        onMouseDown={() => handleSelectCity(c)}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Property Type
              </label>
              <select 
                className="input-field"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option className="text-gray-500">All Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Plot</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Min Price
              </label>
              <input
                type="number"
                placeholder="0"
                className="input-field"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Max Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Any"
                className="input-field"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Bedrooms
              </label>
              <select 
                className="input-field"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option className="text-gray-500">Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Status
              </label>
              <select 
                className="input-field"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Available</option>
                <option>Rented</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex gap-4">
            <button 
              className="btn-secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <button 
              className="btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search Properties"}
            </button>
          </div>
        </div>

        {/* Properties Found */}
        <div className="animate-fade-in">
          <p className="text-lg text-gray-900 font-medium mb-6">
            {properties.length} {properties.length === 1 ? "property" : "properties"} found
          </p>
          
          {/* Properties Grid */}
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search filters to find more properties.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}