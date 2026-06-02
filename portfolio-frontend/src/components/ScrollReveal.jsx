import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="inline-block mr-[0.25em] mt-2">
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};

export default function ScrollReveal({ text, className = "" }) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 90%", "end 40%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        // Extend the end range significantly so words take much longer to fade in
        const end = Math.min(start + 0.2, 1);
        
        // Handle explicit newlines inside the text if we want paragraph breaks
        if (word === "<br/>") {
          return <span key={i} className="w-full h-6 block" />;
        }
        
        return (
          <Word key={i} progress={smoothProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
