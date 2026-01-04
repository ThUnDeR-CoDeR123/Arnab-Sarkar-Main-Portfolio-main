import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MagneticButton = ({ 
  children, 
  className = '', 
  onClick,
  href,
  variant = 'default',
  glow = true,
  ...props 
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const variants = {
    default: {
      base: 'bg-white/10 border-white/20 text-white',
      hover: 'hover:bg-white/20',
      glow: '0 0 30px rgba(255,255,255,0.3)',
    },
    primary: {
      base: 'bg-gradient-to-r from-cyan-500/80 to-blue-500/80 border-cyan-400/30 text-white',
      hover: 'hover:from-cyan-400/90 hover:to-blue-400/90',
      glow: '0 0 40px rgba(0,255,255,0.5)',
    },
    neon: {
      base: 'bg-black/50 border-cyan-400/50 text-cyan-400',
      hover: 'hover:border-cyan-300',
      glow: '0 0 30px rgba(0,255,255,0.6), inset 0 0 20px rgba(0,255,255,0.1)',
    },
  };

  const variantStyles = variants[variant];

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`
        relative px-8 py-4 rounded-xl backdrop-blur-md border font-medium
        transition-all duration-300 overflow-hidden
        ${variantStyles.base} ${variantStyles.hover}
        ${className}
      `}
      style={{
        x: xSpring,
        y: ySpring,
        boxShadow: isHovered && glow ? variantStyles.glow : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      data-cursor-hover
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
        animate={{
          x: isHovered ? ['0%', '200%'] : '0%',
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  );
};

export default MagneticButton;
