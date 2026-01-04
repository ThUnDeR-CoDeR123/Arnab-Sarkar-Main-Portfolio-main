import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo, thumbnailStats, whyChooseMe } from '../../data/mock';
import { useTheme } from '../../context/ThemeContext';
import GlassCard from '../ui/GlassCard';

const HERO_BG_IMAGE = "https://customer-assets.emergentagent.com/job_glassmorphic-folio/artifacts/ilyp60vd_REVIEW.png";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Layer */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${HERO_BG_IMAGE}')`,
            filter: isDark ? 'brightness(0.35) saturate(1.1)' : 'brightness(0.85) saturate(1.1)',
          }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isDark 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.4), rgba(255,255,255,0.8))',
          }}
        />
        
        {/* Glassmorphism overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(4px)',
          }}
        />
      </motion.div>

      {/* Aurora Effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{ opacity: isDark ? 0.4 : 0.2 }}
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 30%, rgba(0,255,255,0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 70%, rgba(255,0,255,0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, rgba(0,255,128,0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 30%, rgba(0,255,255,0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16"
        style={{ y, opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name with Glassmorphic background */}
        <motion.div className="relative inline-block mb-6" variants={itemVariants}>
          <motion.div
            className="absolute -inset-x-8 -inset-y-4 rounded-2xl"
            style={{
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: isDark 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          />
          <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to right, #fff, #67e8f9, #fff)'
                  : 'linear-gradient(to right, #1e293b, #0891b2, #1e293b)',
              }}
            >
              {personalInfo.name}
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl mb-8 font-light tracking-wide transition-colors"
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
          variants={itemVariants}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Views Counter */}
        <motion.div className="mb-10" variants={itemVariants}>
          <motion.div
            className="inline-block px-6 py-3 rounded-xl"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))'
                : 'linear-gradient(135deg, rgba(0,150,200,0.15), rgba(150,50,200,0.15))',
              border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
            }}
            animate={{
              boxShadow: isDark 
                ? ['0 0 20px rgba(0,255,255,0.2)', '0 0 35px rgba(255,0,255,0.2)', '0 0 20px rgba(0,255,255,0.2)']
                : ['0 0 15px rgba(0,150,200,0.15)', '0 0 25px rgba(150,50,200,0.15)', '0 0 15px rgba(0,150,200,0.15)'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-3xl md:text-5xl font-bold">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark 
                    ? 'linear-gradient(to right, #22d3ee, #a855f7, #ec4899)'
                    : 'linear-gradient(to right, #0891b2, #7c3aed, #db2777)',
                }}
              >
                {thumbnailStats.views}
              </span>
            </p>
            <p 
              className="text-sm mt-1 transition-colors"
              style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
            >
              Total Views Generated
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {whyChooseMe.map((item, index) => (
            <motion.div
              key={item.label}
              className="p-3 rounded-lg text-center transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <p 
                className="text-xl md:text-2xl font-bold"
                style={{ color: isDark ? '#22d3ee' : '#0891b2' }}
              >
                {item.stat}
              </p>
              <p 
                className="text-xs transition-colors"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-6 h-9 rounded-full mx-auto flex justify-center pt-2"
            style={{
              border: isDark ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(0,0,0,0.2)',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
            }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 z-[2]"
        style={{
          background: isDark 
            ? 'linear-gradient(to top, rgba(0,0,0,1), transparent)'
            : 'linear-gradient(to top, rgba(245,245,247,1), transparent)',
        }}
      />
    </section>
  );
};

export default HeroSection;
