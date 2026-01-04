import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { developmentInfo } from '../../data/mock';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { Code, Smartphone, Layers, Palette, ExternalLink } from 'lucide-react';

const iconMap = {
  'Web Development': Code,
  'App Development': Smartphone,
  'Custom Software': Layers,
  'UI/UX Design': Palette,
};

const DevelopmentSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="development"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Dark Background with Neon Blue accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,136,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,136,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Neon glows */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,136,255,0.5) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.5) 0%, transparent 70%)' }}
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0,136,255,0.2)',
                '0 0 40px rgba(0,136,255,0.4)',
                '0 0 20px rgba(0,136,255,0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Development
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {developmentInfo.headline}
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {developmentInfo.targetAudience}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          variants={containerVariants}
        >
          {developmentInfo.services.map((service, index) => {
            const Icon = iconMap[service] || Code;
            return (
              <motion.div
                key={service}
                variants={itemVariants}
              >
                <GlassCard 
                  className="p-8 group relative overflow-hidden" 
                  variant="dark" 
                  hover
                >
                  {/* Neon border effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0,136,255,0.1), transparent)',
                    }}
                  />
                  
                  <div className="relative flex items-start gap-6">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {service}
                      </h3>
                      <p className="text-white/50">
                        Professional solutions tailored to your specific needs and goals.
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <MagneticButton
            href={developmentInfo.portfolioLink}
            variant="neon"
            className="text-lg"
          >
            <span>Visit Dedicated Dev Portfolio</span>
            <ExternalLink className="w-5 h-5" />
          </MagneticButton>
          
          <motion.p
            className="text-white/40 text-sm mt-4"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Explore complete development portfolio →
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DevelopmentSection;
