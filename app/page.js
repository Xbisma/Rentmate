'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [selectedCity, setSelectedCity] = useState('Islamabad');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Homes');
  const [selectedBeds, setSelectedBeds] = useState('All');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '0', max: 'Any' });
  const [areaRange, setAreaRange] = useState({ min: '0', max: 'Any' });

  const backgroundImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1984&q=80",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  const cities = [
    'Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Faisalabad', 
    'Peshawar', 'Quetta', 'Multan', 'Gujranwala', 'Sialkot'
  ];

  const propertyTypes = [
    'Homes', 'Upper Portion', 'Lower Portion', 'Flat', 'Apartment',
    'Penthouse', 'Villa', 'Farm House', 'Commercial'
  ];

  const bedOptions = [
    'All', '1', '2', '3', '4', '5', '6', '7', '8+'
  ];

  const priceOptions = [
    { min: '0', max: 'Any' },
    { min: '0', max: '500000' },
    { min: '500000', max: '1000000' },
    { min: '1000000', max: '2000000' },
    { min: '2000000', max: '3500000' },
    { min: '3500000', max: '5000000' },
    { min: '5000000', max: 'Any' }
  ];

  const areaOptions = [
    { min: '0', max: 'Any' },
    { min: '0', max: '2' },
    { min: '2', max: '3' },
    { min: '3', max: '5' },
    { min: '5', max: '8' },
    { min: '8', max: '10' },
    { min: '10', max: 'Any' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bgInterval);
    };
  }, []);

  // Handle search function
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Prepare search parameters
    const searchParams = new URLSearchParams({
      city: selectedCity,
      propertyType: selectedPropertyType,
      beds: selectedBeds,
      location: location,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minArea: areaRange.min,
      maxArea: areaRange.max
    });

    // Redirect to search page with filters
    router.push(`/properties/search?${searchParams.toString()}`);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Format price display
  const formatPriceDisplay = (option) => {
    if (option.min === '0' && option.max === 'Any') return '0 to Any';
    if (option.min === '5000000' && option.max === 'Any') return '5,000,000+';
    
    const minFormatted = parseInt(option.min).toLocaleString();
    const maxFormatted = option.max === 'Any' ? 'Any' : parseInt(option.max).toLocaleString();
    
    return `${minFormatted} to ${maxFormatted}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Your original animated navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            className="flex flex-col"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-bold text-blue-600">Rentmate</h1>
            <span className="text-sm text-gray-600 italic">tension nahi, hum hain na</span>
          </motion.div>
          <Link href="/auth/login">
            <motion.button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section with Animated Background */}
        <section className="pt-32 pb-20 text-white relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Animated Background Images */}
          {backgroundImages.map((bg, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bg})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentBg === index ? 1 : 0 
              }}
              transition={{ duration: 1.5 }}
            />
          ))}
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Search, Select, Settle In
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl mb-8 opacity-90"
              >
                Find your perfect home with Rentmate
              </motion.p>
              
              {/* Compact Search Box */}
              <motion.form 
                variants={itemVariants}
                className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 text-gray-800"
                onSubmit={handleSearch}
              >
                {/* Top Text */}
                <div className="text-center mb-4">
                  <h3 className="text-md font-semibold text-gray-700">Search properties for sale in Pakistan</h3>
                </div>

                {/* First Row: CITY, PROPERTY TYPE, BEDS */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {/* CITY */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">CITY</label>
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* PROPERTY TYPE */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">PROPERTY TYPE</label>
                    <select 
                      value={selectedPropertyType}
                      onChange={(e) => setSelectedPropertyType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* BEDS */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">BEDS</label>
                    <select 
                      value={selectedBeds}
                      onChange={(e) => setSelectedBeds(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                    >
                      {bedOptions.map(beds => (
                        <option key={beds} value={beds}>{beds}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Second Row: LOCATION, PRICE, AREA */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {/* LOCATION */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">LOCATION</label>
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="Enter area or sector"
                    />
                  </div>
                  
                  {/* PRICE (PKR) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">PRICE (PKR)</label>
                    <select 
                      value={`${priceRange.min} to ${priceRange.max}`}
                      onChange={(e) => {
                        const selected = priceOptions.find(opt => 
                          `${opt.min} to ${opt.max}` === e.target.value
                        );
                        if (selected) setPriceRange(selected);
                      }}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                    >
                      {priceOptions.map((option, index) => (
                        <option key={index} value={`${option.min} to ${option.max}`}>
                          {formatPriceDisplay(option)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* AREA (MARLA) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">AREA (MARLA)</label>
                    <select 
                      value={`${areaRange.min} to ${areaRange.max}`}
                      onChange={(e) => {
                        const selected = areaOptions.find(opt => 
                          `${opt.min} to ${opt.max}` === e.target.value
                        );
                        if (selected) setAreaRange(selected);
                      }}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                    >
                      {areaOptions.map((option, index) => (
                        <option key={index} value={`${option.min} to ${option.max}`}>
                          {option.min} to {option.max}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* FIND Button */}
                <div className="flex justify-center">
                  <motion.button 
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    FIND
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer 
          className="bg-gray-800 text-white py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Home Partners</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Company",
                  items: ['About Us', 'Contact Us', 'Jobs', 'Help & Support', 'Advertise On Rentmate', 'Terms Of Use']
                },
                {
                  title: "Connect",
                  items: ['Blog', 'News', 'Forum', 'Expo', 'Real Estate Agents', 'Add Property']
                },
                {
                  title: "Head Office",
                  items: [
                    'Pearl One, 94-B/1, MM Alam Road, Gulberg III, Lahore, Pakistan',
                    'Q800-RENTMATE (736862)',
                    'Monday To Sunday 9AM To 6PM',
                    'Email Us'
                  ]
                },
                {
                  title: "Roshani Digital Account",
                  items: ['Get Connected', 'TOP']
                }
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.li 
                        key={item}
                        className="hover:text-blue-300 transition-colors cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 pt-8 border-t border-gray-700 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>&copy; {new Date().getFullYear()} Rentmate. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}