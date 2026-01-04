import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import * as mockData from '../data/mock';

// Hook to fetch and manage portfolio data
export const usePortfolioData = () => {
  const [data, setData] = useState({
    personalInfo: mockData.personalInfo,
    thumbnails: mockData.thumbnails,
    reviews: mockData.reviews,
    recommendation: mockData.recommendationLetter,
    metrics: mockData.performanceMetrics,
    isLoading: true,
    error: null,
  });

  const fetchAllData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Fetch all data in parallel
      const [personalInfo, thumbnails, reviews, recommendation, metrics] = await Promise.all([
        api.getPersonalInfo(),
        api.getThumbnails(),
        api.getReviews(),
        api.getRecommendation(),
        api.getMetrics(),
      ]);

      setData({
        personalInfo: personalInfo || mockData.personalInfo,
        thumbnails: thumbnails.length > 0 ? thumbnails.map(t => ({
          ...t,
          placeholder: !t.before_image && !t.after_image,
          before: t.before_image,
          after: t.after_image,
        })) : mockData.thumbnails,
        reviews: reviews.length > 0 ? reviews.map(r => ({
          ...r,
          placeholder: false,
        })) : mockData.reviews,
        recommendation: recommendation ? {
          ...recommendation,
          from: recommendation.from_name,
          placeholder: false,
        } : mockData.recommendationLetter,
        metrics: metrics || mockData.performanceMetrics,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load data',
      }));
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { ...data, refetch: fetchAllData };
};

// Hook for thumbnails
export const useThumbnails = () => {
  const [thumbnails, setThumbnails] = useState(mockData.thumbnails);
  const [isLoading, setIsLoading] = useState(true);

  const fetchThumbnails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getThumbnails();
      if (data.length > 0) {
        setThumbnails(data.map(t => ({
          ...t,
          placeholder: !t.before_image && !t.after_image,
          before: t.before_image,
          after: t.after_image,
        })));
      }
    } catch (error) {
      console.error('Error fetching thumbnails:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThumbnails();
  }, [fetchThumbnails]);

  const addThumbnail = async (thumbnail) => {
    const created = await api.createThumbnail(thumbnail);
    setThumbnails(prev => [...prev, { ...created, placeholder: false }]);
    return created;
  };

  const updateThumbnail = async (id, thumbnail) => {
    const updated = await api.updateThumbnail(id, thumbnail);
    setThumbnails(prev => prev.map(t => t.id === id ? { ...updated, placeholder: false } : t));
    return updated;
  };

  const removeThumbnail = async (id) => {
    await api.deleteThumbnail(id);
    setThumbnails(prev => prev.filter(t => t.id !== id));
  };

  return { thumbnails, isLoading, addThumbnail, updateThumbnail, removeThumbnail, refetch: fetchThumbnails };
};

// Hook for reviews
export const useReviews = () => {
  const [reviews, setReviews] = useState(mockData.reviews);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getReviews();
      if (data.length > 0) {
        setReviews(data.map(r => ({ ...r, placeholder: false })));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (review) => {
    const created = await api.createReview(review);
    setReviews(prev => [...prev, { ...created, placeholder: false }]);
    return created;
  };

  const updateReview = async (id, review) => {
    const updated = await api.updateReview(id, review);
    setReviews(prev => prev.map(r => r.id === id ? { ...updated, placeholder: false } : r));
    return updated;
  };

  const removeReview = async (id) => {
    await api.deleteReview(id);
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return { reviews, isLoading, addReview, updateReview, removeReview, refetch: fetchReviews };
};

// Hook for metrics
export const useMetrics = () => {
  const [metrics, setMetrics] = useState(mockData.performanceMetrics);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getMetrics();
      if (data) {
        setMetrics(data);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const updateMetrics = async (newMetrics) => {
    const updated = await api.updateMetrics(newMetrics);
    setMetrics(updated);
    return updated;
  };

  return { metrics, isLoading, updateMetrics, refetch: fetchMetrics };
};

// Hook for personal info
export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(mockData.personalInfo);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPersonalInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getPersonalInfo();
      if (data) {
        setPersonalInfo({
          name: data.name,
          tagline: data.tagline,
          phone: data.phone,
          email: data.email,
          devPortfolio: data.dev_portfolio,
          availability: data.availability,
        });
      }
    } catch (error) {
      console.error('Error fetching personal info:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonalInfo();
  }, [fetchPersonalInfo]);

  const updateInfo = async (newInfo) => {
    const updated = await api.updatePersonalInfo({
      name: newInfo.name,
      tagline: newInfo.tagline,
      phone: newInfo.phone,
      email: newInfo.email,
      dev_portfolio: newInfo.devPortfolio,
      availability: newInfo.availability,
    });
    setPersonalInfo({
      name: updated.name,
      tagline: updated.tagline,
      phone: updated.phone,
      email: updated.email,
      devPortfolio: updated.dev_portfolio,
      availability: updated.availability,
    });
    return updated;
  };

  return { personalInfo, isLoading, updateInfo, refetch: fetchPersonalInfo };
};

export default usePortfolioData;
