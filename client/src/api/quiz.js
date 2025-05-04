import axios from 'axios';

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:5000/api';

export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const getQuiz = async (quizId) => {
  try {
    const response = await axios.get(`${API_URL}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await axios.post(`${API_URL}/quizzes/submit`, {
      quizId,
      answers
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const getUserResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes/user/results`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};