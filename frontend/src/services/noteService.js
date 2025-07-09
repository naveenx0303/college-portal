import API from './api';

export const getNotes = async () => {
  const { data } = await API.get('/notes');
  return data;
};

export const createNote = async (note) => {
  const { data } = await API.post('/notes', note);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await API.delete(`/notes/${id}`);
  return data;
};