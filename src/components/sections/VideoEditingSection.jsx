import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { videoEditingInfo, reviews, recommendationLetter } from '../../data/mock';
import GlassCard from '../ui/GlassCard';
import { Star, ChevronLeft, ChevronRight, FileText, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const VideoEditingSection = () => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const [currentReview, setCurrentReview] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section
      ref={containerRef}
      id="editing"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isDark 
              ? 'linear-gradient(to bottom, #0d0d20, #0f0a2e, #1a0a3e)'
              : 'linear-gradient(to bottom, #e8e8f0, #e0e0f0, #d8d8e8)',
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ 
            background: isDark 
              ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], x: [-30, 30, -30] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6"
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span
            className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full border transition-colors"
            style={{
              color: isDark ? '#a78bfa' : '#7c3aed',
              backgroundColor: isDark ? 'rgba(167,139,250,0.1)' : 'rgba(124,58,237,0.1)',
              borderColor: isDark ? 'rgba(167,139,250,0.2)' : 'rgba(124,58,237,0.2)',
            }}
          >
            Video Production
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)'
                  : 'linear-gradient(to right, #2563eb, #7c3aed, #db2777)',
              }}
            >
              {videoEditingInfo.headline}
            </span>
          </h2>
          
          <p 
            className="text-lg max-w-2xl mx-auto transition-colors"
            style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
          >
            {videoEditingInfo.subheadline}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto" variants={itemVariants}>
          {Object.entries(videoEditingInfo.stats).map(([key, value]) => (
            <GlassCard key={key} className="p-4 text-center" variant="light">
              <div 
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
              >
                {value}
              </div>
              <p 
                className="text-xs capitalize transition-colors"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              >
                {key}
              </p>
            </GlassCard>
          ))}
        </motion.div>

        {/* Reviews Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h3 
            className="text-xl font-bold mb-8 text-center transition-colors"
            style={{ color: isDark ? '#fff' : '#1a1a1a' }}
          >
            Client Testimonials
          </h3>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Navigation Buttons */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              }}
              onClick={prevReview}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              }}
              onClick={nextReview}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Review Cards */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewCard review={reviews[currentReview]} isDark={isDark} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: index === currentReview ? 24 : 8,
                    background: index === currentReview 
                      ? (isDark ? '#a78bfa' : '#7c3aed')
                      : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'),
                  }}
                  onClick={() => setCurrentReview(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recommendation Letter CTA */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.button
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(167,139,250,0.2))'
                : 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(167,139,250,0.15))',
              border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
              color: isDark ? '#fff' : '#1a1a1a',
            }}
            onClick={() => setShowLetter(true)}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(167,139,250,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            View Letter of Recommendation
          </motion.button>
        </motion.div>

        {/* Letter Modal */}
        <AnimatePresence>
          {showLetter && (
            <LetterModal letter={recommendationLetter} onClose={() => setShowLetter(false)} isDark={isDark} />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// Review Card Component
const ReviewCard = ({ review, isDark }) => {
  return (
    <GlassCard className="p-6 md:p-8" variant="vibrant">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Review Image */}
        {review.image && !review.placeholder && (
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
            <img 
              src={review.image} 
              alt={`${review.name} review`}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        )}
        
        {/* Review Content */}
        <div className={`flex-1 flex flex-col justify-center ${review.image ? '' : 'text-center'}`}>
          {/* Verified Badge */}
          {review.verified && (
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400 font-medium">Verified Client</span>
            </div>
          )}
          
          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : (isDark ? 'text-white/20' : 'text-black/20')}`}
              />
            ))}
          </div>

          {/* Review Text */}
          <p 
            className="text-sm md:text-base mb-4 italic leading-relaxed"
            style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}
          >
            "{review.text}"
          </p>

          {/* Name & Role */}
          <div>
            <p 
              className="font-bold"
              style={{ color: isDark ? '#fff' : '#1a1a1a' }}
            >
              {review.name}
            </p>
            <p 
              className="text-sm"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
            >
              {review.role} • {review.subscribers} subscribers
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// Letter Modal Component
const LetterModal = ({ letter, onClose, isDark }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <GlassCard className="p-6 md:p-8" variant="light">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ color: isDark ? '#fff' : '#1a1a1a' }}
            >
              {letter.title}
            </h3>
            <div 
              className="w-16 h-0.5 mx-auto"
              style={{ background: isDark ? 'linear-gradient(90deg, transparent, #a78bfa, transparent)' : 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }}
            />
          </div>
          
          {/* From Info */}
          <div 
            className="flex items-center justify-between mb-4 pb-4 border-b"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          >
            <div>
              <p className="font-bold" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
                {letter.from}
              </p>
              <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                {letter.position} • {letter.subscribers} subscribers
              </p>
            </div>
            <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              {letter.date}
            </p>
          </div>
          
          {/* Letter Content */}
          <div 
            className="text-sm leading-relaxed whitespace-pre-wrap mb-6"
            style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}
          >
            {letter.content}
          </div>
          
          {/* Contact Info */}
          <div 
            className="text-sm mb-6 pt-4 border-t"
            style={{ 
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            }}
          >
            <p>Sincerely,</p>
            <p className="font-semibold mt-2" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
              {letter.from}
            </p>
            <p>{letter.email}</p>
            <p>{letter.website}</p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <motion.a
              href={letter.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: isDark ? 'rgba(167,139,250,0.2)' : 'rgba(124,58,237,0.1)',
                color: isDark ? '#a78bfa' : '#7c3aed',
                border: isDark ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(124,58,237,0.3)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.a>
            
            <motion.button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
              }}
              onClick={onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default VideoEditingSection;
