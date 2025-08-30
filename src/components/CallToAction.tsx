import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, Users, Award, Globe } from 'lucide-react';

const CallToAction: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const stats = [
    { icon: Users, value: '1M+', label: 'Active Users' },
    { icon: Star, value: '4.9', label: 'User Rating' },
    { icon: Award, value: '15+', label: 'Tech Awards' },
    { icon: Globe, value: '50+', label: 'Countries' }
  ];

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-800 to-blue-500 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Ready for the Future?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join millions of users who have already transformed their digital experience. 
            Don't just keep up with technology—lead it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold pulse-glow flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pre-Order Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="border border-white/30 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing tiers */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Essential */}
          <div className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Essential</h3>
              <div className="text-4xl font-bold gradient-text mb-4">$899</div>
              <p className="text-gray-400">Perfect for getting started</p>
            </div>
            <ul className="space-y-3 mb-8 h-100">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                16GB RAM, 512GB Storage
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Basic AI Features
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                1 Year Warranty
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Fast charging
              </li>
            </ul>
            


            <button className="w-full border border-blue-500 text-blue-400 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
              Choose Essential
            </button>
          </div>

          {/* Pro (Featured) */}
          <div className="glass-effect p-8 rounded-2xl border-2 border-blue-400 hover:bg-white/10 transition-all duration-300 group relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold gradient-text mb-4">$1,299</div>
              <p className="text-gray-400">For power users</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                32GB RAM, 1TB Storage
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Advanced AI Features
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Priority Support
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                2 Year Warranty
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-blue-800 to-blue-500 text-white py-3 rounded-full hover:from-blue-900 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
              Choose Pro
            </button>
          </div>

          {/* Ultra */}
          <div className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Ultra</h3>
              <div className="text-4xl font-bold gradient-text mb-4">$1,899</div>
              <p className="text-gray-400">Maximum performance</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                64GB RAM, 2TB Storage
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Ultimate AI Features
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                White-glove Setup
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                3 Year Warranty
              </li>
            </ul>
            <button className="w-full border border-blue-400 text-blue-400 py-3 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300">
              Choose Ultra
            </button>
          </div>
        </motion.div>

        {/* Final message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-gray-400 mb-4">Free shipping worldwide • 30-day money-back guarantee</p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Ships in 2-3 Days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;