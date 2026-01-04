import React from 'react';
import { motion } from 'framer-motion';

// Import theme context with fallback
let useTheme;
try {
  useTheme = require('../../context/ThemeContext').useTheme;
} catch {
  useTheme = () => ({ isDark: true });
}

// Floating 3D Shape Base Component
const FloatingShape = ({ 
  className = '', 
  style = {}, 
  delay = 0, 
  duration = 20,
  children 
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      animate={{
        y: [0, -30, 0],
        rotateX: [0, 15, 0],
        rotateY: [0, 360],
        rotateZ: [0, 10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Glass Sphere with enhanced effects
const GlassSphere = ({ size = 100, color = 'cyan', x, y, delay = 0 }) => {
  const colorMap = {
    cyan: { primary: 'rgba(0,255,255,0.3)', glow: 'rgba(0,255,255,0.4)' },
    magenta: { primary: 'rgba(255,0,255,0.3)', glow: 'rgba(255,0,255,0.4)' },
    lime: { primary: 'rgba(0,255,0,0.3)', glow: 'rgba(0,255,0,0.4)' },
    blue: { primary: 'rgba(0,136,255,0.3)', glow: 'rgba(0,136,255,0.4)' },
    amber: { primary: 'rgba(255,191,0,0.3)', glow: 'rgba(255,191,0,0.4)' },
  };
  
  const colors = colorMap[color] || colorMap.cyan;
  
  return (
    <FloatingShape
      className="rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), ${colors.primary}, transparent)`,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: `0 0 40px ${colors.glow}, inset 0 0 20px rgba(255,255,255,0.1)`,
      }}
      delay={delay}
      duration={15 + Math.random() * 10}
    />
  );
};

// YouTube Play Button
const PlayButton = ({ size = 80, isGold = true, x, y, delay = 0 }) => {
  const color = isGold ? '#FFD700' : '#C0C0C0';
  const glowColor = isGold ? 'rgba(255,215,0,0.5)' : 'rgba(192,192,192,0.5)';
  
  return (
    <FloatingShape
      style={{
        left: x,
        top: y,
        width: size * 1.5,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${isGold ? '#FFA500' : '#A0A0A0'})`,
        borderRadius: '8px',
        boxShadow: `0 10px 40px ${glowColor}, 0 0 60px ${glowColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      delay={delay}
      duration={12 + Math.random() * 8}
    >
      <div 
        style={{
          width: 0,
          height: 0,
          borderTop: `${size * 0.25}px solid transparent`,
          borderBottom: `${size * 0.25}px solid transparent`,
          borderLeft: `${size * 0.35}px solid white`,
          marginLeft: '5px',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
        }}
      />
    </FloatingShape>
  );
};

// Torus Ring
const TorusRing = ({ size = 120, color = 'cyan', x, y, delay = 0 }) => {
  const colorMap = {
    cyan: 'rgba(0,255,255,0.4)',
    magenta: 'rgba(255,0,255,0.4)',
    blue: 'rgba(0,136,255,0.4)',
  };
  const ringColor = colorMap[color] || colorMap.cyan;
  
  return (
    <FloatingShape
      className="rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: 'transparent',
        border: `${size * 0.12}px solid ${ringColor}`,
        boxShadow: `
          0 0 30px ${ringColor},
          inset 0 0 30px ${ringColor}
        `,
      }}
      delay={delay}
      duration={18 + Math.random() * 7}
    />
  );
};

// 3D Pyramid
const Pyramid = ({ size = 80, color = '#00ffff', x, y, delay = 0 }) => (
  <FloatingShape
    style={{
      left: x,
      top: y,
      width: 0,
      height: 0,
      borderLeft: `${size/2}px solid transparent`,
      borderRight: `${size/2}px solid transparent`,
      borderBottom: `${size}px solid ${color}40`,
      filter: `drop-shadow(0 0 20px ${color})`,
    }}
    delay={delay}
    duration={20 + Math.random() * 10}
  />
);

// Glowing Cube
const GlowingCube = ({ size = 60, color = '#ff00ff', x, y, delay = 0 }) => (
  <FloatingShape
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `${color}20`,
      border: `2px solid ${color}60`,
      boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
      transform: 'rotate(45deg)',
    }}
    delay={delay}
    duration={15 + Math.random() * 8}
  />
);

// Floating Code Bracket for Dev Section
const CodeBracket = ({ x, y, size = 60, delay = 0 }) => (
  <FloatingShape
    style={{ left: x, top: y }}
    delay={delay}
    duration={12 + Math.random() * 6}
  >
    <span 
      style={{ 
        fontSize: size, 
        color: 'rgba(0,136,255,0.6)',
        fontFamily: 'monospace',
        textShadow: '0 0 20px rgba(0,136,255,0.5)',
      }}
    >
      {'</>'}
    </span>
  </FloatingShape>
);

// Floating DNA Helix Style
const HelixDot = ({ x, y, size = 10, color, delay = 0, phase = 0 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: color,
      boxShadow: `0 0 15px ${color}`,
    }}
    animate={{
      x: [0, 30 * Math.sin(phase), 0, -30 * Math.sin(phase), 0],
      opacity: [0.5, 1, 0.5, 1, 0.5],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

// Light Segment Scene (Aurora/Vibrant)
export const LightSegmentScene = () => {
  // Always call the hook - fallback to isDark: true if undefined
  const themeContext = useTheme();
  const isDark = themeContext?.isDark ?? true;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {/* Multiple Glass Spheres */}
      <GlassSphere size={140} color="cyan" x="5%" y="10%" delay={0} />
      <GlassSphere size={100} color="magenta" x="80%" y="15%" delay={1} />
      <GlassSphere size={70} color="lime" x="65%" y="55%" delay={2} />
      <GlassSphere size={120} color="cyan" x="15%" y="65%" delay={3} />
      <GlassSphere size={60} color="magenta" x="88%" y="70%" delay={4} />
      <GlassSphere size={50} color="lime" x="40%" y="80%" delay={5} />
      <GlassSphere size={90} color="cyan" x="25%" y="35%" delay={6} />
      
      {/* Play Buttons */}
      <PlayButton size={70} isGold={true} x="12%" y="45%" delay={0} />
      <PlayButton size={50} isGold={false} x="75%" y="40%" delay={1.5} />
      <PlayButton size={40} isGold={true} x="55%" y="75%" delay={3} />
      
      {/* Torus Rings */}
      <TorusRing size={180} color="cyan" x="35%" y="15%" delay={0} />
      <TorusRing size={120} color="magenta" x="2%" y="50%" delay={2} />
      <TorusRing size={100} color="cyan" x="82%" y="60%" delay={4} />
      <TorusRing size={80} color="magenta" x="45%" y="85%" delay={6} />
      
      {/* Pyramids */}
      <Pyramid size={100} color="#00ffff" x="60%" y="20%" delay={1} />
      <Pyramid size={70} color="#ff00ff" x="8%" y="75%" delay={3} />
      
      {/* Glowing Cubes */}
      <GlowingCube size={50} color="#00ffff" x="92%" y="30%" delay={0} />
      <GlowingCube size={40} color="#ff00ff" x="30%" y="90%" delay={2} />
      <GlowingCube size={60} color="#00ff00" x="70%" y="5%" delay={4} />
      
      {/* DNA Helix Effect */}
      {[...Array(8)].map((_, i) => (
        <React.Fragment key={`helix-${i}`}>
          <HelixDot 
            x={`${50 + i * 3}%`} 
            y={`${20 + i * 8}%`} 
            color="#00ffff" 
            delay={i * 0.2} 
            phase={i * 0.5}
          />
          <HelixDot 
            x={`${50 + i * 3}%`} 
            y={`${20 + i * 8}%`} 
            color="#ff00ff" 
            delay={i * 0.2 + 2} 
            phase={i * 0.5 + Math.PI}
          />
        </React.Fragment>
      ))}
      
      {/* Ambient Glow Orbs */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          left: '25%',
          top: '25%',
          background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          right: '15%',
          bottom: '25%',
          background: 'radial-gradient(circle, rgba(255,0,255,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.4, 1, 1.4],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          left: '60%',
          top: '60%',
          background: 'radial-gradient(circle, rgba(0,255,0,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
};

// Gear Shape for Dark Segment
const GearShape = ({ size = 100, x, y, delay = 0 }) => (
  <FloatingShape
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    delay={delay}
    duration={25 + Math.random() * 10}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        border: '2px solid rgba(0,136,255,0.4)',
        boxShadow: '0 0 40px rgba(0,136,255,0.3), inset 0 0 30px rgba(0,136,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0088ff, #0055ff)',
          boxShadow: '0 0 30px rgba(0,136,255,0.6)',
        }}
      />
    </div>
  </FloatingShape>
);

// Wireframe Cube for Dark Segment
const WireframeCube = ({ size = 80, x, y, delay = 0 }) => (
  <FloatingShape
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    delay={delay}
    duration={20 + Math.random() * 10}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid rgba(0,136,255,0.6)',
        boxShadow: '0 0 25px rgba(0,136,255,0.4), inset 0 0 25px rgba(0,136,255,0.15)',
        background: 'transparent',
      }}
    />
  </FloatingShape>
);

// Metallic Sphere for Dark Segment
const MetallicSphere = ({ size = 80, x, y, delay = 0 }) => (
  <FloatingShape
    className="rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: 'linear-gradient(135deg, #4a4a6a 0%, #2a2a4a 50%, #1a1a2a 100%)',
      border: '1px solid rgba(0,136,255,0.3)',
      boxShadow: '0 0 40px rgba(0,136,255,0.3), inset -15px -15px 40px rgba(255,255,255,0.08)',
    }}
    delay={delay}
    duration={18 + Math.random() * 8}
  />
);

// Circuit Line for Dark Segment
const CircuitLine = ({ x1, y1, x2, y2, delay = 0 }) => (
  <motion.div
    className="absolute"
    style={{
      left: x1,
      top: y1,
      width: `calc(${x2} - ${x1})`,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(0,136,255,0.6), transparent)',
      boxShadow: '0 0 10px rgba(0,136,255,0.5)',
    }}
    animate={{
      opacity: [0.3, 0.8, 0.3],
      scaleX: [0.8, 1, 0.8],
    }}
    transition={{ duration: 3, repeat: Infinity, delay }}
  />
);

// Dark Segment Scene (Cyberpunk/Matrix)
export const DarkSegmentScene = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,136,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,136,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Gears */}
      <GearShape size={160} x="8%" y="10%" delay={0} />
      <GearShape size={120} x="78%" y="15%" delay={1} />
      <GearShape size={100} x="65%" y="60%" delay={2} />
      <GearShape size={80} x="5%" y="70%" delay={3} />
      <GearShape size={140} x="85%" y="75%" delay={4} />
      
      {/* Wireframe Cubes */}
      <WireframeCube size={120} x="35%" y="25%" delay={0} />
      <WireframeCube size={80} x="12%" y="55%" delay={1} />
      <WireframeCube size={100} x="75%" y="45%" delay={2} />
      <WireframeCube size={70} x="55%" y="80%" delay={3} />
      <WireframeCube size={90} x="25%" y="85%" delay={4} />
      
      {/* Metallic Spheres */}
      <MetallicSphere size={110} x="28%" y="45%" delay={0} />
      <MetallicSphere size={80} x="72%" y="70%" delay={1} />
      <MetallicSphere size={60} x="45%" y="15%" delay={2} />
      <MetallicSphere size={90} x="90%" y="40%" delay={3} />
      
      {/* Code Brackets */}
      <CodeBracket x="20%" y="20%" size={50} delay={0} />
      <CodeBracket x="80%" y="30%" size={40} delay={1} />
      <CodeBracket x="50%" y="70%" size={45} delay={2} />
      <CodeBracket x="10%" y="85%" size={35} delay={3} />
      
      {/* Circuit Lines */}
      <CircuitLine x1="10%" y1="35%" x2="40%" y2="35%" delay={0} />
      <CircuitLine x1="60%" y1="50%" x2="90%" y2="50%" delay={1} />
      <CircuitLine x1="20%" y1="65%" x2="60%" y2="65%" delay={2} />
      
      {/* Neon Glow Lines */}
      <motion.div
        className="absolute h-0.5"
        style={{
          left: '5%',
          top: '40%',
          width: '90%',
          background: 'linear-gradient(90deg, transparent, rgba(0,136,255,0.6), rgba(0,200,255,0.6), transparent)',
          boxShadow: '0 0 30px rgba(0,136,255,0.6)',
        }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scaleX: [0.9, 1, 0.9],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Ambient Blue Glows */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          left: '15%',
          top: '15%',
          background: 'radial-gradient(circle, rgba(0,136,255,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          right: '10%',
          bottom: '15%',
          background: 'radial-gradient(circle, rgba(0,200,255,0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
      />
    </div>
  );
};

export default { LightSegmentScene, DarkSegmentScene };
