import API from "./api";

export const getAllProperties = async () => {
  const res = await API.get("/properties");
  return res.data;
};

export const getOwnerProperties = async () => {
  const res = await API.get("/properties/owner");
  return res.data;
};

export const addProperty = async (data) => {
  const res = await API.post("/properties", data);
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
