import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Floating Particle
const Particle = ({ delay, duration, size, x, y, color }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(1px)',
    }}
    animate={{
      y: [0, -100, 0],
      x: [0, Math.random() * 50 - 25, 0],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: 'easeInOut',
    }}
  />
);

// Floating Star
const Star = ({ x, y, size, delay }) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 1, 0.3],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: delay,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 18.77L12 15.27L7.09 18.77L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z"
        fill="rgba(255,255,255,0.8)"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
      />
    </svg>
  </motion.div>
);

// 3D Diamond Shape
const Diamond = ({ x, y, size, color, delay }) => (
  <motion.div
    className="absolute"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      transformStyle: 'preserve-3d',
    }}
    animate={{
      rotateX: [0, 360],
      rotateY: [0, 360],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      repeat: Infinity,
      delay: delay,
      ease: 'linear',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${color}40, ${color}10)`,
        transform: 'rotate(45deg)',
        border: `1px solid ${color}60`,
        boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`,
      }}
    />
  </motion.div>
);

// Hexagon Shape
const Hexagon = ({ x, y, size, color, delay }) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 20 + Math.random() * 10,
      repeat: Infinity,
      delay: delay,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="1"
        style={{ filter: `drop-shadow(0 0 10px ${color})` }}
      />
    </svg>
  </motion.div>
);

// Animated Grid Lines
const GridLines = ({ isDark }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Horizontal lines */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={`h-${i}`}
        className="absolute w-full h-px"
        style={{
          top: `${10 + i * 10}%`,
          background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(0,255,255,0.1)' : 'rgba(0,100,255,0.1)'}, transparent)`,
        }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
    {/* Vertical lines */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={`v-${i}`}
        className="absolute h-full w-px"
        style={{
          left: `${5 + i * 7}%`,
          background: `linear-gradient(180deg, transparent, ${isDark ? 'rgba(255,0,255,0.1)' : 'rgba(255,100,0,0.1)'}, transparent)`,
        }}
        animate={{ opacity: [0.05, 0.2, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

// Floating Orb with gradient
const GlowOrb = ({ x, y, size, colors, delay }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${colors[0]}40 0%, ${colors[1]}20 50%, transparent 70%)`,
      filter: 'blur(30px)',
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
      x: [0, 50, 0],
      y: [0, -50, 0],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

// Shooting Star
const ShootingStar = ({ delay }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
      boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff',
    }}
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{
      x: [0, 200],
      y: [0, 200],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      repeatDelay: 5 + Math.random() * 10,
    }}
  />
);

// Neon Ring
const NeonRing = ({ x, y, size, color, delay }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      border: `2px solid ${color}`,
      boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}40`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

// Main Enhanced 3D Background Component
export const Enhanced3DBackground = ({ segment = 'light' }) => {
  const { isDark } = useTheme();
  const isLightSegment = segment === 'light';
  
  const colors = isLightSegment 
    ? { primary: '#00ffff', secondary: '#ff00ff', tertiary: '#00ff00' }
    : { primary: '#0088ff', secondary: '#00aaff', tertiary: '#0066ff' };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Lines */}
      <GridLines isDark={isDark} />
      
      {/* Glow Orbs */}
      <GlowOrb x="10%" y="20%" size={300} colors={[colors.primary, colors.secondary]} delay={0} />
      <GlowOrb x="70%" y="60%" size={400} colors={[colors.secondary, colors.tertiary]} delay={2} />
      <GlowOrb x="40%" y="80%" size={250} colors={[colors.tertiary, colors.primary]} delay={4} />
      
      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle
          key={`particle-${i}`}
          delay={i * 0.5}
          duration={5 + Math.random() * 5}
          size={4 + Math.random() * 6}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          color={i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary}
        />
      ))}
      
      {/* Stars */}
      {[...Array(15)].map((_, i) => (
        <Star
          key={`star-${i}`}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          size={8 + Math.random() * 12}
          delay={i * 0.3}
        />
      ))}
      
      {/* Diamonds */}
      <Diamond x="15%" y="25%" size={60} color={colors.primary} delay={0} />
      <Diamond x="80%" y="35%" size={40} color={colors.secondary} delay={2} />
      <Diamond x="25%" y="70%" size={50} color={colors.tertiary} delay={4} />
      <Diamond x="70%" y="80%" size={35} color={colors.primary} delay={6} />
      
      {/* Hexagons */}
      <Hexagon x="5%" y="40%" size={80} color={colors.secondary} delay={1} />
      <Hexagon x="85%" y="55%" size={60} color={colors.primary} delay={3} />
      <Hexagon x="50%" y="15%" size={50} color={colors.tertiary} delay={5} />
      
      {/* Neon Rings */}
      <NeonRing x="20%" y="50%" size={100} color={colors.primary} delay={0} />
      <NeonRing x="75%" y="25%" size={80} color={colors.secondary} delay={2} />
      <NeonRing x="60%" y="70%" size={120} color={colors.tertiary} delay={4} />
      
      {/* Shooting Stars */}
      {[...Array(5)].map((_, i) => (
        <ShootingStar key={`shoot-${i}`} delay={i * 3} />
      ))}
    </div>
  );
};

export default Enhanced3DBackground;
