import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Opening Portfolio",
    "Booting up interface...",
    "Loading Experience"
  ];

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Change text every second
    const textInterval = setInterval(() => {
      setTextIndex(prev => Math.min(prev + 1, texts.length - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Wait a bit before completing
    }
  }, [progress, onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] text-white px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center gap-12">
        <div className="h-20 flex items-center justify-center">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl md:text-4xl lg:text-5xl tracking-widest text-white uppercase text-center"
          >
            {texts[textIndex]}
            <br />
            {progress > 0 && (
              <span className="text-gray-400">{progress}%</span>
            )}
          </motion.div>
        </div>
        
        <div className="w-full relative">
          {/* Background Bar */}
          <div className="h-3 md:h-4 w-full bg-white/10 rounded-full overflow-hidden" />
          
          {/* Animated Progress Bar */}
          <motion.div
            className="absolute top-0 left-0 h-3 md:h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
