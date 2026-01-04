import React from 'react';
import { motion } from 'framer-motion';
import { trustBannerItems } from '../../data/mock';

const TrustBanner = () => {
  // Double the items for seamless loop
  const items = [...trustBannerItems, ...trustBannerItems, ...trustBannerItems];

  return (
    <div className="relative overflow-hidden py-6 bg-gradient-to-r from-transparent via-white/5 to-transparent border-y border-white/10">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-33.33%'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center mx-8"
          >
            <span className="text-white/80 font-medium text-lg tracking-wide">
              {item}
            </span>
            <span className="ml-8 text-cyan-400 text-2xl">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustBanner;
