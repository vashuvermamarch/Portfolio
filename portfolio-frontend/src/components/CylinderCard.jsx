import { useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function CylinderCard({ children }) {
  const ref = useRef(null);
  
  // Distance from the exact center of the screen
  const distance = useMotionValue(0);

  useLayoutEffect(() => {
    let animationFrameId;
    
    const measure = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const screenCenter = window.innerWidth / 2;
        
        // Normalize distance: 0 is center, 1 is right edge, -1 is left edge
        distance.set((cardCenter - screenCenter) / (window.innerWidth / 2));
      }
      animationFrameId = requestAnimationFrame(measure);
    };
    
    measure();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Spring physics for ultra-smooth 3D rendering
  const springConfig = { stiffness: 400, damping: 40, mass: 0.5 };

  // Rotate away from the viewer at the edges
  const rotateY = useSpring(useTransform(distance, [-1.5, 0, 1.5], [60, 0, -60]), springConfig);
  
  // Push the card backward into 3D space at the edges
  const z = useSpring(useTransform(distance, [-1.5, 0, 1.5], [-800, 0, -800]), springConfig);
  
  // Fade opacity slightly at the edges
  const opacity = useSpring(useTransform(distance, [-1.5, 0, 1.5], [0.1, 1, 0.1]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateY,
        z,
        opacity
        // transformStyle: "preserve-3d" // Removed to fix Chrome hover bug on nested flat elements
      }}
      className="shrink-0 h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}
