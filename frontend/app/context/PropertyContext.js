'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  getAllProperties,
  getOwnerProperties,
  updateProperty as apiUpdateProperty,
  deleteProperty as apiDeleteProperty,
  getPropertyById,
  filterProperties,
  getTenantProperties
} from '../../services/propertyService';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const API_URL = 'http://localhost:5000/api/properties';

  const getUserRole = () => localStorage.getItem('userType');

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const userRole = getUserRole();
      let data;

      if (userRole === 'owner') {
        data = await getOwnerProperties();
      } else if (userRole === 'tenant') {
        data = await getTenantProperties();
      } else {
        data = await getAllProperties();
      }

      setProperties(data || []);
    } catch (err) {
      console.error(err);
      showNotification('Failed to load properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add property (fixed)
  const addProperty = async (propertyData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      const formData = new FormData();
      formData.append('title', propertyData.title || '');
      formData.append('description', propertyData.description || '');
      formData.append('city', propertyData.city || '');
      formData.append('location', propertyData.location || propertyData.address || '');
      formData.append('price', propertyData.price || propertyData.monthlyRent || '');
      formData.append('bedrooms', propertyData.bedrooms || '');
      formData.append('bathrooms', propertyData.bathrooms || '');
      formData.append('availability', propertyData.availability || 'available');

      // Images
      const images = propertyData.images || [];
      images.forEach(file => {
        if (file) formData.append('images', file);
      });

      // ✅ Fix here: use backticks
      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProperties(prev => [...prev, res.data.property]);
      showNotification('Property added successfully!');
      return res.data.property;
    } catch (err) {
      console.error('Add property error:', err);
      showNotification(
        err.response?.data?.message || 'Failed to add property',
        'error'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update property
  const updateProperty = async (id, propertyData) => {
    setLoading(true);
    try {
      const updatedProperty = await apiUpdateProperty(id, propertyData);
      setProperties(prev =>
        prev.map(prop => (String(prop._id) === String(id) ? updatedProperty : prop))
      );
      showNotification('Property updated successfully!');
      return updatedProperty;
    } catch (err) {
      console.error(err);
      showNotification('Failed to update property', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    setLoading(true);
    try {
      await apiDeleteProperty(id);
      setProperties(prev => prev.filter(prop => prop._id !== id));
      showNotification('Property deleted successfully!');
    } catch (err) {
      console.error(err);
      showNotification('Failed to delete property', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyById = async (id) => {
    setLoading(true);
    try {
      return await getPropertyById(id);
    } finally {
      setLoading(false);
    }
  };

  const filterPropertiesData = async (filters) => {
    setLoading(true);
    try {
      const filtered = await filterProperties(filters);
      setProperties(filtered || []);
      return filtered;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProperties();
    }
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        notification,
        setNotification,
        addProperty,
        updateProperty,
        deleteProperty,
        fetchPropertyById,
        filterProperties: filterPropertiesData,
        fetchProperties,
        showNotification
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider');
  }
  return context;
};
