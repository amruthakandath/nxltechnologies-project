import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Zap, Cpu, Sparkles } from 'lucide-react';
import ThreeScene from './ThreeScene';

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-12 h-12 border-2 border-blue-400 rotate-45 float-animation opacity-60"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-purple-500 rounded-full float-animation opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border-2 border-purple-400 rounded-full rotate-animation opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto hero-highlight">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold gradient-text leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            NEXUS PRO
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Experience the future of technology with our revolutionary AI-powered device
            that transforms how you interact with the digital world.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div 
              className="flex items-center gap-3 glass-effect px-6 py-3 rounded-full feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-5 h-5 text-blue-400" />
              </motion.div>
              <span className="text-white font-medium">Lightning Fast</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 glass-effect px-6 py-3 rounded-full feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Cpu className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="text-white font-medium">AI Enhanced</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 glass-effect px-6 py-3 rounded-full feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-5 h-5 text-blue-300" />
              </motion.div>
              <span className="text-white font-medium">Next-Gen</span>
            </motion.div>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold pulse-glow transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hero-highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;