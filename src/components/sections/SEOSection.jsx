import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { seoInfo } from '../../data/mock';
import GlassCard from '../ui/GlassCard';
import { Search, TrendingUp, BarChart3, Zap } from 'lucide-react';

const iconMap = {
  'Keyword Research': Search,
  'Metadata Optimization': Zap,
  'Algorithm Strategy': TrendingUp,
  'Analytics & Insights': BarChart3,
};

const SEOSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Neon Green Growth Bar Chart Data
  const growthBars = [
    { label: 'Month 1', value: 15, growth: '+15%' },
    { label: 'Month 2', value: 28, growth: '+28%' },
    { label: 'Month 3', value: 42, growth: '+42%' },
    { label: 'Month 4', value: 58, growth: '+58%' },
    { label: 'Month 5', value: 72, growth: '+72%' },
    { label: 'Month 6', value: 95, growth: '+95%' },
  ];

  return (
    <section
      ref={containerRef}
      id="seo"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background Gradient - Amber/Gold */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a3e] via-[#1a1a0a] to-[#0a0a0a]" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        {/* Neon green glow for the graph section */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,255,100,0.5) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-medium text-amber-400 bg-amber-400/10 rounded-full border border-amber-400/20"
            whileHover={{ scale: 1.05 }}
          >
            YouTube SEO
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {seoInfo.headline}
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {seoInfo.subheadline}
          </p>
        </motion.div>

        {/* NEON GREEN Growth Bar Chart */}
        <motion.div 
          className="mb-20 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <GlassCard className="p-8" variant="dark" glow>
            <h3 className="text-xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                Performance Metrics
              </span>
            </h3>
            <p className="text-center text-white/50 text-sm mb-8">Channel Growth Over Time</p>
            
            {/* Bar Chart Container */}
            <div className="relative h-72 flex items-end justify-around gap-3 px-4 pb-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[100, 75, 50, 25, 0].map((val) => (
                  <div key={val} className="flex items-center">
                    <span className="text-xs text-white/30 w-8">{val}%</span>
                    <div className="flex-1 border-t border-white/10" />
                  </div>
                ))}
              </div>
              
              {/* Bars */}
              {growthBars.map((bar, index) => (
                <div key={bar.label} className="flex flex-col items-center flex-1 relative z-10">
                  {/* Growth indicator */}
                  <motion.span
                    className="text-xs font-bold mb-2"
                    style={{
                      color: '#00ff66',
                      textShadow: '0 0 10px rgba(0,255,102,0.8), 0 0 20px rgba(0,255,102,0.5)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 1.5 + index * 0.15 }}
                  >
                    {bar.growth}
                  </motion.span>
                  
                  {/* Bar */}
                  <motion.div
                    className="w-full max-w-12 rounded-t-lg relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(to top, #00ff66, #00cc52, #00ff66)',
                      boxShadow: '0 0 30px rgba(0,255,102,0.6), 0 0 60px rgba(0,255,102,0.3), inset 0 0 20px rgba(255,255,255,0.2)',
                    }}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${bar.value * 2}px` } : { height: 0 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, transparent, rgba(255,255,255,0.3), transparent)',
                      }}
                      animate={{ y: ['100%', '-100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    />
                    
                    {/* Inner glow */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                      }}
                    />
                  </motion.div>
                  
                  {/* Label */}
                  <p className="text-white/60 text-xs mt-3 text-center whitespace-nowrap">{bar.label}</p>
                </div>
              ))}
            </div>
            
            {/* Growth indicator line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '60px' }}>
              <defs>
                <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ff66" stopOpacity="0" />
                  <stop offset="50%" stopColor="#00ff66" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00ff66" stopOpacity="0" />
                </linearGradient>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            {/* Stats summary */}
            <motion.div 
              className="flex justify-center gap-8 mt-8 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2 }}
            >
              <div className="text-center">
                <p 
                  className="text-3xl font-bold"
                  style={{
                    color: '#00ff66',
                    textShadow: '0 0 20px rgba(0,255,102,0.8), 0 0 40px rgba(0,255,102,0.5)',
                  }}
                >
                  +95%
                </p>
                <p className="text-white/50 text-sm">Total Growth</p>
              </div>
              <div className="text-center">
                <p 
                  className="text-3xl font-bold"
                  style={{
                    color: '#00ff66',
                    textShadow: '0 0 20px rgba(0,255,102,0.8), 0 0 40px rgba(0,255,102,0.5)',
                  }}
                >
                  6x
                </p>
                <p className="text-white/50 text-sm">Views Increase</p>
              </div>
              <div className="text-center">
                <p 
                  className="text-3xl font-bold"
                  style={{
                    color: '#00ff66',
                    textShadow: '0 0 20px rgba(0,255,102,0.8), 0 0 40px rgba(0,255,102,0.5)',
                  }}
                >
                  Top 5
                </p>
                <p className="text-white/50 text-sm">Search Rankings</p>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {seoInfo.services.map((service, index) => {
            const Icon = iconMap[service] || Search;
            return (
              <motion.div
                key={service}
                variants={itemVariants}
              >
                <GlassCard 
                  className="p-8 group" 
                  variant="default" 
                  hover
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-amber-400" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {service}
                      </h3>
                      <p className="text-white/50">
                        Strategic optimization to maximize your content's reach and engagement.
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative line */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 mt-6"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SEOSection;
