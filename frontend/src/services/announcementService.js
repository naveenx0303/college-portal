import API from './api';

export const getAnnouncements = async () => {
  const { data } = await API.get('/announcements');
  return data;
};

export const createAnnouncement = async (announcement) => {
  const { data } = await API.post('/announcements', announcement);
  return data;
};

export const updateAnnouncement = async (id, announcement) => {
  const { data } = await API.put(`/announcements/${id}`, announcement);
  return data;
};

export const deleteAnnouncement = async (id) => {
  const { data } = await API.delete(`/announcements/${id}`);
  return data;
};