import api from "./api";

export const getDoctors = async () => {
  return await api.get("/doctors");
};

export const addDoctor = async (doctor) => {
  return await api.post("/doctors", doctor);
};

export const updateDoctor = async (id, doctor) => {
  return await api.put(`/doctors/${id}`, doctor);
};

export const deleteDoctor = async (id) => {
  return await api.delete(`/doctors/${id}`);
};