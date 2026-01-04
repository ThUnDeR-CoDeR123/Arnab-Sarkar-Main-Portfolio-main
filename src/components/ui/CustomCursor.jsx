import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Reduced particle trail for better performance
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev.slice(-8), newParticle]);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-6));
    }, 150);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Particle Trail - smaller and less intrusive */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4,
            height: 4,
            background: `rgba(0, 255, 255, ${0.4 - index * 0.05})`,
            zIndex: 9997,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
      
      {/* Main Cursor - smaller */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
          zIndex: 9999,
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 40 : 12,
            height: isHovering ? 40 : 12,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
      
      {/* Cursor Ring - smaller */}
      <motion.div
        className="fixed pointer-events-none rounded-full border border-white/20"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
          zIndex: 9998,
        }}
        animate={{
          width: isHovering ? 50 : 24,
          height: isHovering ? 50 : 24,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
