import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ctrServices, processSteps } from '../../data/mock';
import { useTheme } from '../../context/ThemeContext';
import GlassCard from '../ui/GlassCard';
import { GitBranch, Brain, Zap, User, Palette, Type, ArrowRight } from 'lucide-react';

const iconMap = {
  split: GitBranch,
  brain: Brain,
  zap: Zap,
  user: User,
  palette: Palette,
  type: Type,
};

const CTRServicesSection = () => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const isInView = useInView(containerRef, { once: false, margin: '-50px' });

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
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark 
            ? 'linear-gradient(to bottom, #000, #0a0a1a, #0d0d20)'
            : 'linear-gradient(to bottom, #f5f5f7, #e8e8f0, #e0e0e8)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.span
            className="inline-block px-3 py-1.5 mb-4 text-xs font-medium rounded-full border transition-colors"
            style={{
              color: isDark ? '#22d3ee' : '#0891b2',
              backgroundColor: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(8,145,178,0.1)',
              borderColor: isDark ? 'rgba(34,211,238,0.2)' : 'rgba(8,145,178,0.2)',
            }}
          >
            What I Offer
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to right, #22d3ee, #a855f7)'
                  : 'linear-gradient(to right, #0891b2, #7c3aed)',
              }}
            >
              CTR Optimization Services
            </span>
          </h2>
          
          <p 
            className="text-base max-w-xl mx-auto transition-colors"
            style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
          >
            Industry-leading techniques used by top creators to maximize clicks
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          variants={containerVariants}
        >
          {ctrServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Zap;
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <GlassCard className="p-5 h-full group" hover>
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: isDark 
                          ? 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2))'
                          : 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(124,58,237,0.15))',
                        border: isDark ? '1px solid rgba(34,211,238,0.2)' : '1px solid rgba(8,145,178,0.2)',
                      }}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                    >
                      <Icon 
                        className="w-5 h-5"
                        style={{ color: isDark ? '#22d3ee' : '#0891b2' }}
                      />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-bold mb-1 text-sm transition-colors"
                        style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="text-xs leading-relaxed transition-colors"
                        style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process Section */}
        <motion.div variants={itemVariants}>
          <h3 
            className="text-xl font-bold text-center mb-8 transition-colors"
            style={{ color: isDark ? '#fff' : '#1a1a1a' }}
          >
            My Process
          </h3>
          
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.step}>
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard className="p-4 h-full text-center">
                    <div 
                      className="w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-bold"
                      style={{
                        background: isDark 
                          ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                          : 'linear-gradient(135deg, #0891b2, #7c3aed)',
                        color: '#fff',
                      }}
                    >
                      {step.step}
                    </div>
                    <h4 
                      className="font-bold text-sm mb-1 transition-colors"
                      style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                    >
                      {step.title}
                    </h4>
                    <p 
                      className="text-xs transition-colors"
                      style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                    >
                      {step.description}
                    </p>
                  </GlassCard>
                </motion.div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight 
                      className="w-5 h-5"
                      style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTRServicesSection;
