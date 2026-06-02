import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardSwap({ cards }) {
  const [cardsList, setCardsList] = useState(cards);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500 || offset < -100 || velocity < -500) {
      // Swiped far enough, send to back
      setCardsList((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift();
        newCards.push(swipedCard);
        return newCards;
      });
    }
  };

  return (
    <div className="relative w-full max-w-2xl h-80 md:h-[22rem] mx-auto flex items-center justify-center perspective-[1200px]">
      <AnimatePresence>
        {cardsList.map((card, index) => {
          const isTop = index === 0;
          return (
            <motion.div
              key={card.id}
              className="absolute top-0 w-full h-full bg-[#151515] border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col justify-center cursor-grab active:cursor-grabbing backdrop-blur-sm"
              style={{
                zIndex: cardsList.length - index,
                transformOrigin: "bottom center"
              }}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 15,
                opacity: 1 - index * 0.2,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.05 }}
              layout
            >
              <div className="flex flex-col gap-3 md:gap-4 h-full justify-center">
                <span className="text-base md:text-lg font-mono text-gray-400">{card.year}</span>
                <h3 className="text-2xl md:text-4xl font-bold font-display text-white leading-tight">{card.title}</h3>
                <h4 className="text-lg md:text-xl text-gray-300">{card.institution}</h4>
                <div className="mt-4 md:mt-6 inline-flex items-center px-4 py-2 bg-white/10 w-max rounded-full border border-white/5">
                  <span className="text-base md:text-lg font-bold text-white tracking-wide">{card.percentage}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <p className="absolute -bottom-12 text-sm text-gray-500 font-mono tracking-widest animate-pulse">
        SWIPE TO EXPLORE →
      </p>
    </div>
  );
}
