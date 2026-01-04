import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, trustBannerItems } from '../../data/mock';
import { useTheme } from '../../context/ThemeContext';
import GlassCard from '../ui/GlassCard';
import { Phone, Mail, Copy, Check, MapPin } from 'lucide-react';

// Trust Banner Component
const TrustBanner = () => {
  const { isDark } = useTheme();
  const items = [...trustBannerItems, ...trustBannerItems, ...trustBannerItems];

  return (
    <div 
      className="relative overflow-hidden py-4 border-y transition-colors"
      style={{ 
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        background: isDark 
          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.02), transparent)',
      }}
    >
      <div 
        className="absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: isDark ? 'linear-gradient(90deg, #050505, transparent)' : 'linear-gradient(90deg, #d5d5dd, transparent)' }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: isDark ? 'linear-gradient(270deg, #050505, transparent)' : 'linear-gradient(270deg, #d5d5dd, transparent)' }}
      />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center mx-6">
            <span 
              className="font-medium text-sm transition-colors"
              style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
            >
              {item}
            </span>
            <span 
              className="ml-6 text-lg"
              style={{ color: isDark ? '#22d3ee' : '#0891b2' }}
            >
              •
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ContactSection = () => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
    <section ref={containerRef} id="contact" className="relative py-20 overflow-hidden">
      <TrustBanner />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 pt-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span style={{ color: isDark ? '#fff' : '#1a1a1a' }}>Let's Work </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to right, #22d3ee, #a855f7)'
                  : 'linear-gradient(to right, #0891b2, #7c3aed)',
              }}
            >
              Together
            </span>
          </h2>
        </motion.div>

        {/* Availability Status */}
        <motion.div className="flex justify-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors"
            style={{
              background: isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.08)',
              borderColor: isDark ? 'rgba(34,197,94,0.25)' : 'rgba(34,197,94,0.2)',
            }}
            animate={{
              boxShadow: [
                '0 0 15px rgba(34,197,94,0.15)',
                '0 0 25px rgba(34,197,94,0.25)',
                '0 0 15px rgba(34,197,94,0.15)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-green-500 text-sm font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.availability}
            </span>
          </motion.div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12" variants={containerVariants}>
          {/* Phone */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 text-center" hover glow>
              <a href={`tel:${personalInfo.phone}`} className="block group">
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(59,130,246,0.15))'
                      : 'linear-gradient(135deg, rgba(8,145,178,0.1), rgba(37,99,235,0.1))',
                    border: isDark ? '1px solid rgba(34,211,238,0.2)' : '1px solid rgba(8,145,178,0.15)',
                  }}
                  whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
                >
                  <Phone className="w-5 h-5" style={{ color: isDark ? '#22d3ee' : '#0891b2' }} />
                </motion.div>
                
                <p className="text-xs mb-1 transition-colors" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                  Call Me
                </p>
                <p 
                  className="text-lg font-bold transition-colors"
                  style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                >
                  {personalInfo.phone}
                </p>
              </a>
            </GlassCard>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 text-center" hover glow>
              <motion.div
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))'
                    : 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(219,39,119,0.1))',
                  border: isDark ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(124,58,237,0.15)',
                }}
                whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
              >
                <Mail className="w-5 h-5" style={{ color: isDark ? '#a855f7' : '#7c3aed' }} />
              </motion.div>
              
              <p className="text-xs mb-1 transition-colors" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                Email Me
              </p>
              <div className="flex items-center justify-center gap-2">
                <p 
                  className="text-base md:text-lg font-bold break-all transition-colors"
                  style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                >
                  {personalInfo.email}
                </p>
                <motion.button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                  )}
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center pt-8 border-t transition-colors"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}
          variants={itemVariants}
        >
          <p className="text-xs transition-colors" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)' }}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
};

export default ContactSection;
