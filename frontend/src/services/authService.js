import API from './api';

export const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await API.post('/auth/register', { name, email, password });
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getProfile = async () => {
  const { data } = await API.get('/users/profile');
  return data;
};