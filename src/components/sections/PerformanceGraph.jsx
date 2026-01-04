import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import GlassCard from '../ui/GlassCard';
import { TrendingUp, Users, Eye, Play } from 'lucide-react';

const PerformanceGraph = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimation();
  const { isDark } = useTheme();
  
  const [counters, setCounters] = useState({
    views: 0,
    retention: 0,
    ctr: 0,
    subscribers: 0,
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate counters
      const duration = 2000;
      const targets = { views: 70, retention: 85, ctr: 12, subscribers: 500 };
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        setCounters({
          views: Math.floor(targets.views * eased),
          retention: Math.floor(targets.retention * eased),
          ctr: Math.floor(targets.ctr * eased),
          subscribers: Math.floor(targets.subscribers * eased),
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [isInView, controls]);

  // Generate skyrocket growth path
  const generateGrowthPath = () => {
    const points = [];
    const width = 600;
    const height = 200;
    
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * width;
      // Exponential growth curve
      const y = height - (Math.pow(i / 100, 2.5) * height * 0.9);
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    
    return points.join(' ');
  };

  const growthPath = generateGrowthPath();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const metrics = [
    { icon: Eye, label: 'Million Views', value: counters.views, suffix: 'M+', color: '#00ffff' },
    { icon: TrendingUp, label: 'Avg. Retention', value: counters.retention, suffix: '%', color: '#ff00ff' },
    { icon: Play, label: 'Avg. CTR', value: counters.ctr, suffix: '%', color: '#00ff00' },
    { icon: Users, label: 'K Subscribers Gained', value: counters.subscribers, suffix: 'K+', color: '#ffaa00' },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="py-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <motion.span
          className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full border"
          style={{
            color: isDark ? '#00ffff' : '#0066cc',
            backgroundColor: isDark ? 'rgba(0,255,255,0.1)' : 'rgba(0,102,204,0.1)',
            borderColor: isDark ? 'rgba(0,255,255,0.3)' : 'rgba(0,102,204,0.3)',
          }}
        >
          Performance Metrics
        </motion.span>
        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, #00ffff, #ff00ff, #00ff00)'
                : 'linear-gradient(to right, #0066cc, #9933ff, #00cc66)',
            }}
          >
            Skyrocket Growth Results
          </span>
        </h3>
      </motion.div>

      {/* Main Graph */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-8 max-w-4xl mx-auto" variant="vibrant" glow>
          <div className="relative h-64 mb-8">
            {/* Graph Background Grid */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t"
                  style={{
                    top: `${i * 25}%`,
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  }}
                />
              ))}
            </div>

            {/* SVG Graph */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="50%" stopColor="#ff00ff" />
                  <stop offset="100%" stopColor="#00ff00" />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,255,255,0)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Fill Area */}
              <motion.path
                d={`${growthPath} L 600 200 L 0 200 Z`}
                fill="url(#fillGradient)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Main Line */}
              <motion.path
                d={growthPath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />

              {/* Animated Dot at End */}
              <motion.circle
                cx="600"
                cy="20"
                r="8"
                fill="#00ff00"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
              />
            </svg>

            {/* Rocket Icon at the end */}
            <motion.div
              className="absolute right-0 top-0 text-4xl"
              initial={{ opacity: 0, y: 50, x: -50 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              🚀
            </motion.div>

            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs opacity-50">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
          </div>

          {/* Timeline Labels */}
          <div className="flex justify-between text-sm opacity-50 mb-8">
            <span>Month 1</span>
            <span>Month 3</span>
            <span>Month 6</span>
            <span>Month 9</span>
            <span>Month 12</span>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="p-4 rounded-xl text-center"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${metric.color}40`,
                  boxShadow: `0 0 20px ${metric.color}20`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${metric.color}40` }}
              >
                <metric.icon
                  className="w-6 h-6 mx-auto mb-2"
                  style={{ color: metric.color }}
                />
                <motion.div
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: metric.color, textShadow: `0 0 20px ${metric.color}` }}
                >
                  {metric.value}{metric.suffix}
                </motion.div>
                <div className="text-xs opacity-60 mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default PerformanceGraph;
