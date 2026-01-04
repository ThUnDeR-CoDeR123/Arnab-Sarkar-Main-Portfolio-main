import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { thumbnailStats, thumbnails, thumbnailCategories } from '../../data/mock';
import { useTheme } from '../../context/ThemeContext';
import GlassCard from '../ui/GlassCard';
import { Sparkles } from 'lucide-react';

const ThumbnailSection = () => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const isInView = useInView(containerRef, { once: false, margin: '-50px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  const filteredThumbnails = activeCategory === 'All' 
    ? thumbnails 
    : thumbnails.filter(t => t.category === activeCategory);

  // Split into rows for marquee effect
  const row1 = [...filteredThumbnails.slice(0, 10), ...filteredThumbnails.slice(0, 10)];
  const row2 = [...filteredThumbnails.slice(10), ...filteredThumbnails.slice(10)].reverse();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="thumbnails"
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isDark 
              ? 'linear-gradient(to bottom, #0a0a1a, #0d0d20, #0a0a1a)'
              : 'linear-gradient(to bottom, #e8e8f0, #e0e0e8, #e8e8f0)',
          }}
        />
        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ 
            background: isDark 
              ? 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,150,200,0.1) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], x: [-30, 30, -30] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ 
            background: isDark 
              ? 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(150,50,200,0.1) 0%, transparent 70%)',
          }}
          animate={{ scale: [1.3, 1, 1.3], y: [-30, 30, -30] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6"
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border transition-colors"
            style={{
              background: isDark ? 'rgba(0,255,255,0.1)' : 'rgba(0,150,200,0.1)',
              borderColor: isDark ? 'rgba(0,255,255,0.2)' : 'rgba(0,150,200,0.2)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-4 h-4" style={{ color: isDark ? '#22d3ee' : '#0891b2' }} />
            <span 
              className="text-sm font-medium"
              style={{ color: isDark ? '#22d3ee' : '#0891b2' }}
            >
              Thumbnail Portfolio
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to right, #22d3ee, #a855f7, #ec4899)'
                  : 'linear-gradient(to right, #0891b2, #7c3aed, #db2777)',
              }}
            >
              {thumbnailStats.headline}
            </span>
          </h2>

          {/* Animated Stats */}
          <motion.div
            className="inline-block px-6 py-3 rounded-xl mb-8"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))'
                : 'linear-gradient(135deg, rgba(0,150,200,0.1), rgba(150,50,200,0.1))',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            }}
            animate={{
              boxShadow: isDark 
                ? ['0 0 20px rgba(0,255,255,0.15)', '0 0 40px rgba(255,0,255,0.15)', '0 0 20px rgba(0,255,255,0.15)']
                : ['0 0 15px rgba(0,150,200,0.1)', '0 0 25px rgba(150,50,200,0.1)', '0 0 15px rgba(0,150,200,0.1)'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span 
              className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to right, #22d3ee, #ec4899)'
                  : 'linear-gradient(to right, #0891b2, #db2777)',
              }}
            >
              Generating over {thumbnailStats.views} Views
            </span>
          </motion.div>
        </motion.div>

        {/* Floating Keywords */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
          variants={itemVariants}
        >
          {thumbnailStats.keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-full backdrop-blur-sm transition-all cursor-default"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              }}
              whileHover={{ 
                scale: 1.05,
                background: isDark ? 'rgba(0,255,100,0.15)' : 'rgba(0,200,100,0.15)',
                borderColor: isDark ? 'rgba(0,255,100,0.4)' : 'rgba(0,200,100,0.4)',
                color: isDark ? '#00ff66' : '#00aa44',
                boxShadow: isDark ? '0 0 20px rgba(0,255,100,0.3)' : '0 0 15px rgba(0,200,100,0.2)',
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ 
                y: { duration: 2 + index * 0.2, repeat: Infinity, ease: 'easeInOut' },
                default: { duration: 0.2 }
              }}
            >
              {keyword}
            </motion.span>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          variants={itemVariants}
        >
          {thumbnailCategories.map((category) => (
            <motion.button
              key={category}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
              style={{
                background: activeCategory === category 
                  ? (isDark ? 'linear-gradient(135deg, #22d3ee, #a855f7)' : 'linear-gradient(135deg, #0891b2, #7c3aed)')
                  : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                color: activeCategory === category 
                  ? '#fff' 
                  : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
              }}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Thumbnail Carousel - Row 1 (Right to Left) */}
        <div className="relative mb-4 overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10"
            style={{ background: isDark ? 'linear-gradient(90deg, #0a0a1a, transparent)' : 'linear-gradient(90deg, #e8e8f0, transparent)' }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10"
            style={{ background: isDark ? 'linear-gradient(270deg, #0a0a1a, transparent)' : 'linear-gradient(270deg, #e8e8f0, transparent)' }}
          />
          
          <motion.div
            className="flex gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            {row1.map((item, index) => (
              <ThumbnailCard 
                key={`row1-${index}`} 
                item={item} 
                isDark={isDark}
                isHovered={hoveredId === `row1-${index}`}
                onHover={() => setHoveredId(`row1-${index}`)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </motion.div>
        </div>

        {/* Thumbnail Carousel - Row 2 (Left to Right) */}
        <div className="relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10"
            style={{ background: isDark ? 'linear-gradient(90deg, #0a0a1a, transparent)' : 'linear-gradient(90deg, #e8e8f0, transparent)' }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10"
            style={{ background: isDark ? 'linear-gradient(270deg, #0a0a1a, transparent)' : 'linear-gradient(270deg, #e8e8f0, transparent)' }}
          />
          
          <motion.div
            className="flex gap-4"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
          >
            {row2.map((item, index) => (
              <ThumbnailCard 
                key={`row2-${index}`} 
                item={item} 
                isDark={isDark}
                isHovered={hoveredId === `row2-${index}`}
                onHover={() => setHoveredId(`row2-${index}`)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Thumbnail Card Component
const ThumbnailCard = ({ item, isDark, isHovered, onHover, onLeave }) => {
  // Use beforeAfter image if available, otherwise use after
  const displayImage = item.beforeAfter || item.after;
  
  return (
    <motion.div
      className="flex-shrink-0 w-72 md:w-80 lg:w-96 relative group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03, y: -5 }}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative rounded-xl overflow-hidden transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? '0 0 30px rgba(0,255,100,0.4), 0 20px 40px rgba(0,0,0,0.3)'
            : (isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)'),
          border: isHovered 
            ? '2px solid rgba(0,255,100,0.5)'
            : (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)'),
        }}
      >
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={displayImage} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-white font-bold text-sm md:text-base">{item.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span 
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(0,255,100,0.2)',
                  color: '#00ff66',
                  border: '1px solid rgba(0,255,100,0.3)',
                }}
              >
                {item.category}
              </span>
              {item.hasBeforeAfter && (
                <span className="text-xs text-white/60">Before / After</span>
              )}
            </div>
          </motion.div>
          
          {/* Green glow border on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                boxShadow: 'inset 0 0 30px rgba(0,255,100,0.3)',
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ThumbnailSection;
