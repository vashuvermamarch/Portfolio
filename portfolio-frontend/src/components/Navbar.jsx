import { motion } from 'framer-motion';
import TextPressure from './TextPressure';
import PillNav from './PillNav';
import TrueFocus from './TrueFocus';

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 md:px-12 w-full pointer-events-none">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[1400px] flex flex-row items-center justify-between relative"
      >
        {/* Left Side: VASHU VERMA with TrueFocus */}
        <a 
          href="#" 
          className="relative h-12 md:h-14 w-fit px-6 md:px-8 flex items-center justify-center pointer-events-auto bg-[#111111]/60 backdrop-blur-md border border-white/10 rounded-full py-1 shadow-2xl transition-all hover:bg-[#111111]/80 order-2 md:order-1 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <TrueFocus 
            sentence="VASHU VERMA"
            manualMode={false}
            blurAmount={3}
            borderColor="#ffffff"
            glowColor="rgba(255, 255, 255, 0.4)"
            animationDuration={0.4}
            pauseBetweenAnimations={1.5}
            style={{
              '--focus-font-size': '0.9rem',
              '--focus-font-weight': '700',
              '--focus-gap': '0.4rem',
              'fontFamily': 'Outfit, Inter, sans-serif'
            }}
          />
        </a>

        {/* Right Side: Menu Items with PillNav */}
        <div className="flex items-center justify-center pointer-events-auto drop-shadow-2xl order-1 md:order-2">
          <PillNav 
            items={navItems}
            baseColor="#000000"
            pillColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
          />
        </div>

        {/* Invisible spacer to balance the hamburger on mobile */}
        <div className="w-[42px] md:hidden order-3"></div>
      </motion.nav>
    </div>
  );
}
