import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const darkVariants = {
    default: 'bg-white/5 border-white/10',
    light: 'bg-white/10 border-white/15',
    dark: 'bg-black/30 border-white/5',
    vibrant: 'bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/15',
  };
  
  const lightVariants = {
    default: 'bg-white/90 border-gray-200/80',
    light: 'bg-white/95 border-gray-200',
    dark: 'bg-white/80 border-gray-200/60',
    vibrant: 'bg-gradient-to-br from-cyan-50/80 via-purple-50/80 to-pink-50/80 border-gray-200/80',
  };

  const variants = isDark ? darkVariants : lightVariants;

  return (
    <motion.div
      className={cn(
        'relative rounded-xl backdrop-blur-md border overflow-hidden',
        variants[variant],
        glow && (isDark 
          ? 'shadow-[0_0_25px_rgba(34,211,238,0.15)]'
          : 'shadow-[0_0_25px_rgba(8,145,178,0.1)]'),
        className
      )}
      whileHover={hover ? { y: -3 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
};

export default GlassCard;
