import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Smartphone, Cloud, Shield, Battery, Wifi } from 'lucide-react';

const journeySteps = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced neural networks that learn from your behavior and adapt to your needs, providing personalized experiences like never before.",
    features: ["Machine Learning", "Predictive Analysis", "Smart Automation"]
  },
  {
    icon: Smartphone,
    title: "Seamless Integration", 
    description: "Connect effortlessly with all your devices and platforms. Our ecosystem works harmoniously across every touchpoint.",
    features: ["Cross-Platform", "Universal Compatibility", "Instant Sync"]
  },
  {
    icon: Cloud,
    title: "Cloud-Native Architecture",
    description: "Leveraging the power of cloud computing for unlimited scalability and real-time processing capabilities.",
    features: ["Edge Computing", "Real-time Processing", "Global CDN"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and zero-trust security architecture protect your data at every layer.",
    features: ["End-to-end Encryption", "Biometric Auth", "Zero Trust"]
  }
];

const ProductJourney: React.FC = () => {
  return (
    <section id="product-journey" className="py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 border border-blue-500/20 rounded-full rotate-animation"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-blue-400/20 rotate-45 float-animation"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            The Journey to Innovation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how NEXUS PRO transforms your digital experience through cutting-edge technology and intelligent design.
          </p>
        </motion.div>

        <div className="space-y-24">
          {journeySteps.map((step, index) => (
            <JourneyStep key={index} step={step} index={index} />
          ))}
        </div>

        {/* Technical specs preview */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect p-6 rounded-xl text-center">
            <Battery className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">48hr</div>
            <div className="text-gray-400 text-sm">Battery Life</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <Wifi className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">5G+</div>
            <div className="text-gray-400 text-sm">Connectivity</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">16GB</div>
            <div className="text-gray-400 text-sm">AI Memory</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <Shield className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">256-bit</div>
            <div className="text-gray-400 text-sm">Encryption</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const JourneyStep: React.FC<{ step: any; index: number }> = ({ step, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* 3D Element */}
      <div className="lg:w-1/2 flex justify-center">
        <div className="relative">
          {/* Main 3D shape */}
          <div className={`w-64 h-64 glass-effect rounded-3xl flex items-center justify-center relative overflow-hidden ${
            inView ? 'pulse-glow' : ''
          }`}>
            <step.icon className="w-24 h-24 text-blue-400" />
            
            {/* Floating geometric elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-purple-400 rotate-45 float-animation opacity-60"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-blue-500 rounded-full float-animation opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-8 w-4 h-4 bg-purple-500 rotate-animation opacity-50"></div>
          </div>

          {/* Orbiting elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse transform -translate-x-1/2 translate-y-2"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="lg:w-1/2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            {step.description}
          </p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {step.features.map((feature: string, featureIndex: number) => (
            <motion.div
              key={featureIndex}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + featureIndex * 0.1 }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 text-white px-8 py-3 rounded-full hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300 transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductJourney;