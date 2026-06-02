import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HorizontalWrapper({ children, id, height = "800vh" }) {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const [xRange, setXRange] = useState([0, 0]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateRange = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        // Translate left by the total width minus the viewport width
        // so the last item ends exactly at the right edge.
        setXRange([0, -(scrollWidth - windowWidth)]);
      }
    };
    
    // Initial measurement
    updateRange();
    
    // Observe the container for any size changes (e.g. web fonts loading, flex rendering)
    const resizeObserver = new ResizeObserver(() => {
      updateRange();
    });
    
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateRange);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateRange);
    };
  }, []);

  // Map the scroll progress to our calculated pixel range, finishing at 0.85
  // This leaves a 15% buffer at the bottom of the container where horizontal
  // scrolling is completely stopped before the next section appears.
  const x = useTransform(scrollYProgress, [0, 0.85], [xRange[0], xRange[1]]);
  
  // Add a spring for incredibly smooth, premium feeling scroll
  const smoothX = useSpring(x, { stiffness: 400, damping: 90, mass: 0.1 });

  return (
    <section id={id} ref={targetRef} className="relative bg-[#0a0a0a] z-10" style={{ height: height }}>
      <div 
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <motion.div 
          ref={containerRef}
          style={{ x: smoothX }} 
          className="flex items-center h-full w-max pl-[10vw] pr-0"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
