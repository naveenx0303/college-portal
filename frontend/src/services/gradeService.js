import API from './api';

export const getGrades = async () => {
  const { data } = await API.get('/grades');
  return data;
};