import API from './api';

export const getCourses = async () => {
  const { data } = await API.get('/courses');
  return data;
};

export const getCourse = async (id) => {
  const { data } = await API.get(`/courses/${id}`);
  return data;
};

export const createCourse = async (course) => {
  const { data } = await API.post('/courses', course);
  return data;
};

export const updateCourse = async (id, course) => {
  const { data } = await API.put(`/courses/${id}`, course);
  return data;
};

export const deleteCourse = async (id) => {
  const { data } = await API.delete(`/courses/${id}`);
  return data;
};