"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchProperties() {
  const [city, setCity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"];
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home Button */}
        <Link 
          href="/tenant/dashboard" 
          className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors mb-6"
        >
          ← Back to Home
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Properties
          </h1>
          <p className="text-gray-600 text-lg">
            Find your perfect rental property with our advanced filters
          </p>
        </div>

        {/* Filter Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder:text-gray-500"
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
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-gray-900">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-900 placeholder:text-gray-500"
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
                type="text"
                placeholder="Any"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-900 placeholder:text-gray-500"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Bedrooms
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-gray-900">
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
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-gray-900">
                <option className="text-gray-500">Available</option>
                <option>Rented</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <button className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Clear Filters
          </button>
        </div>

        {/* Properties Found */}
        <p className="text-lg text-gray-900 font-medium">
          2 properties found
        </p>
      </div>
    </div>
  );
}