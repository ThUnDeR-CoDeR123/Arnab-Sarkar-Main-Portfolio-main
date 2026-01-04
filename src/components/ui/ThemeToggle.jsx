import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all"
      style={{
        background: isDark 
          ? 'rgba(255,255,255,0.08)' 
          : 'rgba(0,0,0,0.05)',
        border: isDark 
          ? '1px solid rgba(255,255,255,0.15)' 
          : '1px solid rgba(0,0,0,0.1)',
        boxShadow: isDark 
          ? '0 0 20px rgba(34,211,238,0.15)' 
          : '0 0 20px rgba(251,191,36,0.15)',
      }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-cyan-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
