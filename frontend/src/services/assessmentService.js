import API from './api';

export const getAssessments = async () => {
  const { data } = await API.get('/assessments');
  return data;
};

export const createAssessment = async (assessment) => {
  const { data } = await API.post('/assessments', assessment);
  return data;
};

export const updateAssessment = async (id, assessment) => {
  const { data } = await API.put(`/assessments/${id}`, assessment);
  return data;
};

export const deleteAssessment = async (id) => {
  const { data } = await API.delete(`/assessments/${id}`);
  return data;
};