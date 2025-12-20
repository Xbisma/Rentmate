'use client';
import { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern 3BR Apartment in DHA",
      description: "Spacious 3-bedroom apartment with modern amenities, great location near schools and shopping centers.",
      address: "123 Main Street, DHA Phase 5, Lahore",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rent: 85000,
      propertyType: "Apartments",
      status: "Available",
      city: "Lahore",
      amenities: "Parking, Security, Gym, Swimming Pool",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400"
      ],
      featured: true,
      addedDate: "2024-01-15",
      updatedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Luxury Villa in Bahria Town",
      description: "Beautiful 5-bedroom villa with private garden and modern features throughout.",
      address: "456 Park Avenue, Bahria Town, Islamabad",
      bedrooms: 5,
      bathrooms: 4,
      area: 5000,
      rent: 250000,
      propertyType: "Villa",
      status: "Available",
      city: "Islamabad",
      amenities: "Parking, Garden, Security",
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400"
      ],
      featured: false,
      addedDate: "2024-01-14",
      updatedDate: "2024-01-14"
    },
    {
      id: 3,
      title: "6 Marla Full Marble Flooring House For Rent",
      description: "House for rental - ideal for living with modern amenities and marble flooring throughout.",
      address: "Sector 1-10, Islamabad",
      bedrooms: 4,
      bathrooms: 4,
      area: 180, // 6 marla in sq yards
      rent: 140000,
      propertyType: "House",
      status: "Available",
      city: "Islamabad",
      amenities: "Marble Flooring, Modern Kitchen, Parking",
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400"
      ],
      featured: true,
      addedDate: "2024-01-15",
      updatedDate: "2024-01-15"
    }
  ]);

  // ... rest of the context code remains the same
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      rent: parseInt(property.monthlyRent),
      area: parseInt(property.area),
      bedrooms: parseInt(property.bedrooms),
      bathrooms: parseInt(property.bathrooms),
      images: property.images || [],
      featured: Math.random() > 0.7, // Randomly feature some properties
      addedDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [...prev, newProperty]);
    showNotification('The property has been successfully added to the list.');
  };

  const updateProperty = (id, updatedProperty) => {
    setProperties(prev => prev.map(prop => 
      prop.id === parseInt(id) 
        ? { 
            ...updatedProperty, 
            id: parseInt(id),
            rent: parseInt(updatedProperty.monthlyRent),
            area: parseInt(updatedProperty.area),
            bedrooms: parseInt(updatedProperty.bedrooms),
            bathrooms: parseInt(updatedProperty.bathrooms),
            images: updatedProperty.images || prop.images,
            updatedDate: new Date().toISOString().split('T')[0]
          }
        : prop
    ));
    showNotification('Your property details have been successfully updated.');
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(prop => prop.id !== parseInt(id)));
    showNotification('Property has been deleted successfully.');
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      addProperty,
      updateProperty,
      deleteProperty,
      notification,
      setNotification
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};