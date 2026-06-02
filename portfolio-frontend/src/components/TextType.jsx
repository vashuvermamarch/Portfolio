import { motion } from 'framer-motion';

const TextType = ({ 
  text, 
  className = "", 
  cursor = true,
  cursorClassName = "",
  delay = 0,
  speed = 0.02
}) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <span className={`inline-block ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {letters.map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "linear",
          }}
          className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle ${cursorClassName}`}
        />
      )}
    </span>
  );
};

export default TextType;
