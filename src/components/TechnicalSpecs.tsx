import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, HardDrive, Zap, Monitor, Bluetooth, Wifi as Wifi6 } from 'lucide-react';

const specs = [
  {
    category: "Processing Power",
    icon: Cpu,
    items: [
      { label: "Neural Processing Unit", value: "16-core AI chip" },
      { label: "CPU", value: "Quantum 8-core @3.2GHz" },
      { label: "GPU", value: "Advanced Graphics 64-core" },
      { label: "RAM", value: "32GB LPDDR5X" }
    ]
  },
  {
    category: "Storage & Memory",
    icon: HardDrive,
    items: [
      { label: "Storage", value: "2TB NVMe SSD" },
      { label: "Cache", value: "128MB L3" },
      { label: "Expansion", value: "Up to 8TB" },
      { label: "Transfer Speed", value: "7,400 MB/s" }
    ]
  },
  {
    category: "Display & Interface",
    icon: Monitor,
    items: [
      { label: "Display", value: "6.8\" OLED 4K HDR" },
      { label: "Refresh Rate", value: "120Hz Adaptive" },
      { label: "Touch", value: "Multi-touch Haptic" },
      { label: "Brightness", value: "2000 nits peak" }
    ]
  },
  {
    category: "Connectivity",
    icon: Wifi6,
    items: [
      { label: "Wireless", value: "Wi-Fi 7, 5G mmWave" },
      { label: "Bluetooth", value: "6.0 LE Audio" },
      { label: "USB", value: "4x Thunderbolt 5" },
      { label: "NFC", value: "Ultra Wideband" }
    ]
  }
];

const TechnicalSpecs: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            Technical Excellence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by cutting-edge technology and engineered for peak performance.
            Every component is optimized for the future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <SpecCard key={index} spec={spec} index={index} inView={inView} />
          ))}
        </div>

        {/* Performance indicators */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500/30 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-800 to-blue-500 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-400/50 animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Lightning Speed</h3>
            <p className="text-gray-400">10x faster than previous generation</p>
          </div>

          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-400/30 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                  <Monitor className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-300/50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Crystal Clear</h3>
            <p className="text-gray-400">Ultra-high resolution display</p>
          </div>

          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-300/30 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center">
                  <Bluetooth className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-200/50 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Always Connected</h3>
            <p className="text-gray-400">Seamless multi-device sync</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SpecCard: React.FC<{ spec: any; index: number; inView: boolean }> = ({ spec, index, inView }) => {
  return (
    <motion.div
      className="glass-effect p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg flex items-center justify-center">
          <spec.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{spec.category}</h3>
      </div>

      <div className="space-y-4">
        {spec.items.map((item: any, itemIndex: number) => (
          <motion.div
            key={itemIndex}
            className="flex justify-between items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: (index * 0.1) + (itemIndex * 0.05) }}
          >
            <span className="text-gray-400 text-sm">{item.label}</span>
            <span className="text-white font-medium text-sm">{item.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-800 to-blue-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${85 + (index * 3)}%` } : {}}
            transition={{ duration: 1.2, delay: (index * 0.1) + 0.5 }}
          ></motion.div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Performance Score: {85 + (index * 3)}/100</p>
      </div>
    </motion.div>
  );
};

export default TechnicalSpecs;