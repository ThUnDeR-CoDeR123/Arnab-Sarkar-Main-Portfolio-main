import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '../../data/mock';
import { useTheme } from '../../context/ThemeContext';
import { Home, Image, Film, Search, Code, Mail } from 'lucide-react';

const iconMap = {
  home: Home,
  thumbnails: Image,
  editing: Film,
  seo: Search,
  development: Code,
  contact: Mail,
};

const FloatingDock = ({ onNavigate, activeSection }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isDark } = useTheme();

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl backdrop-blur-xl border transition-colors"
        style={{
          background: isDark 
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.85)',
          borderColor: isDark 
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(0,0,0,0.1)',
          boxShadow: isDark 
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        {navigationItems.map((item) => {
          const Icon = iconMap[item.id];
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <motion.button
              key={item.id}
              className="relative p-2.5 rounded-xl transition-colors"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onNavigate(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active/Hover background */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: isActive 
                        ? (isDark 
                          ? 'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(168,85,247,0.25))'
                          : 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(124,58,237,0.2))')
                        : (isDark 
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.05)'),
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
              
              <Icon 
                className="relative z-10 w-4 h-4 transition-colors"
                style={{
                  color: isActive 
                    ? (isDark ? '#22d3ee' : '#0891b2')
                    : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'),
                }}
              />
              
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors"
                    style={{
                      background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)',
                      color: isDark ? '#fff' : '#1a1a1a',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
};

export default FloatingDock;
