import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import PixelTransition from './PixelTransition';
import ShinyText from './ShinyText';
import TextType from './TextType';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  
  return (
    <section className="relative min-h-screen bg-[#030303] overflow-x-hidden flex flex-col">
      <Navbar />
      
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between px-6 pt-36 md:pt-24 pb-20">
        
        {/* Left Side: Big Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col items-start text-left mt-12 lg:mt-0"
        >
          <motion.div style={{ y: y1 }} className="relative">
            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-display font-bold leading-[0.9] tracking-tighter uppercase flex flex-col items-start">
              <ShinyText text="BUILDING" speed={3} className="text-white" />
              <span className="bg-gradient-to-b from-gray-400 to-[#030303] bg-clip-text text-transparent pb-4">
                DIGITAL VALUE.
              </span>
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-lg font-sans leading-relaxed min-h-[100px]">
              <TextType 
                text="I help brands and agencies create high-end digital experiences that are performant, accessible, and designed to convert."
                speed={0.03}
                delay={0.5}
              />
            </p>

            <div className="mt-8 flex flex-row items-center justify-start w-full sm:w-auto gap-3 sm:gap-6">
              <a 
                href="#projects" 
                className="group relative flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="relative z-10">View Work</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="5 5 19 5 19 19"></polyline>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <Link 
                to="/profile" 
                className="group relative flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:border-white/50 hover:bg-white/10 active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="relative z-10">View Profile</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="5 5 19 5 19 19"></polyline>
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Image with Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-[1500px] mt-16 lg:mt-0"
        >
          <PixelTransition
            firstContent={
              <img 
                src="/vashu-profile.jpg" 
                alt="Vashu Verma" 
                className="w-full h-full object-cover filter grayscale contrast-125" 
              />
            }
            secondContent={
              <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest text-white text-center">
                  VASHU<br/>VERMA
                </h2>
              </div>
            }
            gridSize={12}
            pixelColor="#ffffff"
            animationStepDuration={0.4}
            aspectRatio="133%"
            className="w-72 md:w-96 lg:w-[450px] shadow-2xl rounded-3xl overflow-hidden border border-white/20"
          />
        </motion.div>
        
      </div>
    </section>
  );
}
