import { useState, useEffect, useCallback } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    setVelocity({
      x: newX - mousePosition.x,
      y: newY - mousePosition.y
    });
    
    setMousePosition({ x: newX, y: newY });
    setIsMoving(true);
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    const timeout = setTimeout(() => {
      setIsMoving(false);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [handleMouseMove]);

  return { mousePosition, velocity, isMoving };
};

export default useMousePosition;
