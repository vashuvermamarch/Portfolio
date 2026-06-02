import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClickSpark({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}) {
  const [sparks, setSparks] = useState([]);

  const handleClick = useCallback((e) => {
    const id = Date.now();
    setSparks((current) => [...current, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setSparks((current) => current.filter((spark) => spark.id !== id));
    }, duration);
  }, [duration]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <AnimatePresence>
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="pointer-events-none fixed z-[9999]"
          style={{ left: spark.x, top: spark.y }}
        >
          {Array.from({ length: sparkCount }).map((_, i) => {
            const angle = (i * 360) / sparkCount;
            const rad = (angle * Math.PI) / 180;
            const distance = sparkRadius;

            return (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos(rad) * distance,
                  y: Math.sin(rad) * distance,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: duration / 1000,
                  ease: "easeOut",
                }}
                style={{
                  width: sparkSize,
                  height: 2,
                  backgroundColor: sparkColor,
                  borderRadius: '2px',
                  transformOrigin: '0 0',
                  rotate: `${angle}deg`,
                }}
              />
            );
          })}
        </div>
      ))}
    </AnimatePresence>
  );
}
