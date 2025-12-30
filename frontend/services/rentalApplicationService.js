import API from "./api";

/* ================= APPLY FOR PROPERTY ================= */
export const applyForProperty = async (data) => {
  const res = await API.post("/applications", data);
  return res.data;
};

/* ================= TENANT APPLICATIONS ================= */
export const getTenantApplications = async () => {
  const res = await API.get("/applications/tenant");
  return res.data;
};

/* ================= OWNER APPLICATIONS ================= */
export const getOwnerApplications = async () => {
  const res = await API.get("/applications/owner");
  return res.data;
};

/* ================= OWNER SINGLE APPLICATION ================= */
export const getOwnerApplicationById = async (id) => {
  const res = await API.get(`/applications/owner/${id}`);
  return res.data;
};

/* ================= UPDATE STATUS ================= */
export const updateApplicationStatus = async (id, status) => {
  const res = await API.put(`/applications/${id}`, { status });
  return res.data;
};
