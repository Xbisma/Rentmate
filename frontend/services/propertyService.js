import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// ===================== PROPERTIES =====================

// Get all properties
export const getAllProperties = async () => {
  const res = await API.get("/properties");
  return res.data;
};

// Get properties of the logged-in owner
export const getOwnerProperties = async () => {
  const res = await API.get("/properties/owner", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

// Get properties for tenants (all)
export const getTenantProperties = async () => {
  const res = await API.get("/properties", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

// Add property (expects FormData with images)
// export const addProperty = async (propertyData) => {
//   const res = await API.post("/properties", propertyData, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data.property;
// };

// Update your addProperty function
export const addProperty = async (propertyData) => {
  // Check if propertyData is FormData or regular object
  const isFormData = propertyData instanceof FormData;
  
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // Only set Content-Type for FormData (axios sets it automatically)
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
    },
  };
  
  const res = await API.post("/properties", propertyData, config);
  return res.data.property;
};

// // Update property
// export const updateProperty = async (id, propertyData) => {
//   const res = await API.put(`/properties/${id}`, propertyData, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return res.data.property;
// };

// services/propertyService.js

export const updateProperty = async (propertyId, formData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser sets it automatically
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update property');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// Delete property
export const deleteProperty = async (id) => {
  const res = await API.delete(`/properties/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

// Get property by ID
export const getPropertyById = async (id) => {
  const res = await API.get(`/properties/${id}`);
  return res.data;
};

// ===================== FILTER PROPERTIES (TENANT SEARCH) =====================
export const filterProperties = async (filters) => {
  const queryParams = new URLSearchParams();

  if (filters.city) queryParams.append("city", filters.city);
  if (filters.address) queryParams.append("address", filters.address); // ✅ address
  if (filters.type) queryParams.append("type", filters.type);
  if (filters.availability) queryParams.append("availability", filters.availability);
  if (filters.bedrooms) queryParams.append("bedrooms", filters.bedrooms);
  if (filters.bathrooms) queryParams.append("bathrooms", filters.bathrooms);
  if (filters.price?.$gte) queryParams.append("minPrice", filters.price.$gte);
  if (filters.price?.$lte) queryParams.append("maxPrice", filters.price.$lte);

  const res = await API.get(`/properties/filter?${queryParams.toString()}`);
  return res.data;
};

// ===================== TENANT HELPERS =====================

// Get a single tenant-facing property by ID
export const getTenantPropertyById = async (id) => {
  const res = await API.get(`/properties/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
