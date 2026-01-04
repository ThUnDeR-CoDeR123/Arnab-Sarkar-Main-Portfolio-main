import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ====================== THUMBNAILS ======================

export const getThumbnails = async () => {
  try {
    const response = await api.get('/thumbnails');
    return response.data;
  } catch (error) {
    console.error('Error fetching thumbnails:', error);
    return [];
  }
};

export const createThumbnail = async (thumbnail) => {
  try {
    const response = await api.post('/thumbnails', thumbnail);
    return response.data;
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    throw error;
  }
};

export const updateThumbnail = async (id, thumbnail) => {
  try {
    const response = await api.put(`/thumbnails/${id}`, thumbnail);
    return response.data;
  } catch (error) {
    console.error('Error updating thumbnail:', error);
    throw error;
  }
};

export const deleteThumbnail = async (id) => {
  try {
    await api.delete(`/thumbnails/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting thumbnail:', error);
    throw error;
  }
};

// ====================== REVIEWS ======================

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const createReview = async (review) => {
  try {
    const response = await api.post('/reviews', review);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateReview = async (id, review) => {
  try {
    const response = await api.put(`/reviews/${id}`, review);
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    await api.delete(`/reviews/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// ====================== RECOMMENDATION LETTER ======================

export const getRecommendation = async () => {
  try {
    const response = await api.get('/recommendation');
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    return null;
  }
};

export const saveRecommendation = async (recommendation) => {
  try {
    const response = await api.post('/recommendation', recommendation);
    return response.data;
  } catch (error) {
    console.error('Error saving recommendation:', error);
    throw error;
  }
};

// ====================== PERFORMANCE METRICS ======================

export const getMetrics = async () => {
  try {
    const response = await api.get('/metrics');
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return { views: 70, retention: 85, ctr: 12, subscribers: 500 };
  }
};

export const updateMetrics = async (metrics) => {
  try {
    const response = await api.put('/metrics', metrics);
    return response.data;
  } catch (error) {
    console.error('Error updating metrics:', error);
    throw error;
  }
};

// ====================== PERSONAL INFO ======================

export const getPersonalInfo = async () => {
  try {
    const response = await api.get('/personal-info');
    return response.data;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
};

export const updatePersonalInfo = async (info) => {
  try {
    const response = await api.put('/personal-info', info);
    return response.data;
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw error;
  }
};

// ====================== FILE UPLOAD ======================

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default api;
