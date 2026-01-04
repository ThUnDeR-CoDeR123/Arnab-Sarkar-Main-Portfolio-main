import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';

// Context
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Components
import CustomCursor from './components/ui/CustomCursor';
import FloatingDock from './components/ui/FloatingDock';
import ThemeToggle from './components/ui/ThemeToggle';
import HeroSection from './components/sections/HeroSection';
import CTRServicesSection from './components/sections/CTRServicesSection';
import ThumbnailSection from './components/sections/ThumbnailSection';
import VideoEditingSection from './components/sections/VideoEditingSection';
import SEOSection from './components/sections/SEOSection';
import DevelopmentSection from './components/sections/DevelopmentSection';
import ContactSection from './components/sections/ContactSection';
import PerformanceGraph from './components/sections/PerformanceGraph';
import { LightSegmentScene, DarkSegmentScene } from './components/3d/Scene';

// Loading Screen
const LoadingScreen = () => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: isDark ? '#000' : '#f5f5f7',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-full"
          style={{
            border: `2px solid ${isDark ? 'rgba(34,211,238,0.3)' : 'rgba(8,145,178,0.3)'}`,
            borderTopColor: isDark ? '#22d3ee' : '#0891b2',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          className="text-sm font-medium transition-colors"
          style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

// Main App Content
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  
  const { scrollYProgress } = useScroll();
  const lightSceneOpacity = useTransform(scrollYProgress, [0, 0.55, 0.65], [1, 1, 0]);
  const darkSceneOpacity = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'thumbnails', 'editing', 'seo', 'development', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`App min-h-screen overflow-x-hidden transition-colors duration-500`}
      style={{ background: isDark ? '#000' : '#f5f5f7' }}
      ref={containerRef}
    >
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Custom Cursor - Desktop Only */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      {/* 3D Background Scenes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div className="absolute inset-0" style={{ opacity: lightSceneOpacity }}>
          <LightSegmentScene />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: darkSceneOpacity }}>
          <DarkSegmentScene />
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Segment 1: Creative & Strategy */}
        <HeroSection />
        <CTRServicesSection />
        
        <div className="max-w-6xl mx-auto px-6">
          <PerformanceGraph />
        </div>
        
        <ThumbnailSection />
        <VideoEditingSection />
        <SEOSection />

        {/* Transition */}
        <div 
          className="h-32 transition-colors duration-500"
          style={{
            background: isDark 
              ? 'linear-gradient(to bottom, #0a0a0a, #050505)'
              : 'linear-gradient(to bottom, #e0e0e8, #d5d5dd)',
          }}
        />

        {/* Segment 2: Development */}
        <div 
          className="transition-colors duration-500"
          style={{ background: isDark ? '#050505' : '#d5d5dd' }}
        >
          <DevelopmentSection />
          <ContactSection />
        </div>
      </main>

      {/* Floating Navigation Dock */}
      <FloatingDock onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.012,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
