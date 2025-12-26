import API from "./api";

export const getAllProperties = async () => {
  const res = await API.get("/properties");
  return res.data;
};

export const getOwnerProperties = async () => {
  const res = await API.get("/properties/owner");
  return res.data;
};

export const addProperty = async (propertyData) => {
  const formData = new FormData();

  for (const key in propertyData) {
    if (key === "images") {
      propertyData.images.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      formData.append(key, propertyData[key]);
    }
  }

  const res = await api.post("/properties", formData);
  return res.data;
};

export const deleteProperty = async (id) => {
  const res = await API.delete(`/properties/${id}`);
  return res.data;
};
export const updateProperty = async (id, data) => {
  const res = await API.put(`/properties/${id}`, data);
  return res.data;
};
export const getPropertyById = async (id) => {
  const res = await API.get(`/properties/${id}`);
  return res.data;
};

export const filterProperties = async (filters) => {
  const queryParams = new URLSearchParams();
  
  if (filters.city) queryParams.append('city', filters.city);
  if (filters.location) queryParams.append('location', filters.location);
  if (filters.type) queryParams.append('type', filters.type);
  if (filters.availability) queryParams.append('availability', filters.availability);
  if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
  if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms);
  if (filters.price?.$gte) queryParams.append('minPrice', filters.price.$gte);
  if (filters.price?.$lte) queryParams.append('maxPrice', filters.price.$lte);
  
  const res = await API.get(`/properties/filter?${queryParams.toString()}`);
  return res.data;
};

// Tenant-specific functions
export const getTenantProperties = async () => {
  const res = await API.get("/tenant/properties");
  return res.data;
};

export const getTenantPropertyById = async (id) => {
  const res = await API.get(`/tenant/properties/${id}`);
  return res.data;
};

export const filterTenantProperties = async (filters) => {
  const queryParams = new URLSearchParams();
  
  if (filters.city) queryParams.append('city', filters.city);
  if (filters.location) queryParams.append('location', filters.location);
  if (filters.type) queryParams.append('type', filters.type);
  if (filters.availability) queryParams.append('availability', filters.availability);
  if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
  if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms);
  if (filters.price?.$gte) queryParams.append('minPrice', filters.price.$gte);
  if (filters.price?.$lte) queryParams.append('maxPrice', filters.price.$lte);
  
  const res = await API.get(`/tenant/properties/filter?${queryParams.toString()}`);
  return res.data;
};
