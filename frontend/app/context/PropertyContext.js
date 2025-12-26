'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllProperties,
  getOwnerProperties,
  addProperty as apiAddProperty,
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

  // Get user role from localStorage
  const getUserRole = () => {
    return localStorage.getItem('userType');
  };

  // Fetch properties based on user role
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

      setProperties(data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
      showNotification('Failed to load properties. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Add property
  const addProperty = async (propertyData) => {
    setLoading(true);
    try {
      const newProperty = await apiAddProperty(propertyData);
      setProperties(prev => [...prev, newProperty]);
      showNotification('Property added successfully!');
      return newProperty;
    } catch (err) {
      console.error('Error adding property:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add property';
      showNotification(errorMessage, 'error');
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
      setProperties(prev => prev.map(prop =>
        prop._id === id ? updatedProperty : prop
      ));
      showNotification('Property updated successfully!');
      return updatedProperty;
    } catch (err) {
      console.error('Error updating property:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update property';
      showNotification(errorMessage, 'error');
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
      console.error('Error deleting property:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete property';
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get single property
  const fetchPropertyById = async (id) => {
    setLoading(true);
    try {
      const property = await getPropertyById(id);
      return property;
    } catch (err) {
      console.error('Error fetching property:', err);
      setError('Failed to load property');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter properties
  const filterPropertiesData = async (filters) => {
    setLoading(true);
    try {
      const filteredData = await filterProperties(filters);
      setProperties(filteredData);
      return filteredData;
    } catch (err) {
      console.error('Error filtering properties:', err);
      setError('Failed to filter properties');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load properties on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProperties();
    }
  }, []);

  return (
    <PropertyContext.Provider value={{
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