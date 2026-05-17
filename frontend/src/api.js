import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

export const uploadEvidence = (data) => api.post('/evidence/upload', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMyVault = () => api.get('/evidence/my-vault');
export const getPublicEvidence = () => api.get('/evidence/public');
export const getEvidenceById = (id) => api.get(`/evidence/${id}`);
export const updateVisibility = (id, data) => api.put(`/evidence/${id}/visibility`, data);
export const updateStatus = (id, data) => api.put(`/evidence/${id}/status`, data);
export const getReport = (id) => api.get(`/evidence/${id}/report`);
export const deleteEvidence = (id) => api.delete(`/evidence/${id}`);

export const getAdminEvidence = (params) => api.get('/admin/evidence', { params });
export const getAdminStats = () => api.get('/admin/stats');

export default api;
