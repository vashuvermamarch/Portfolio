import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import ScrollVelocity from '../components/ScrollVelocity';
import CardSwap from '../components/CardSwap';
import Cubes from '../components/Cubes';
import Certifications from '../components/Certifications';

const educationData = [
  {
    id: 1,
    year: "2023 - 2026",
    title: "Bachelor of Computer Applications",
    institution: "Islamia College of Commerce, Gorakhpur",
    percentage: "75.5% (till 4 semester)"
  },
  {
    id: 2,
    year: "2023",
    title: "Intermediate (12th - Maths)",
    institution: "Shishu Vidya Peeth Inter College, Lucknow",
    percentage: "74%"
  },
  {
    id: 3,
    year: "2021",
    title: "High School (10th)",
    institution: "Saraswati Vidya Mandir, Gorakhpur",
    percentage: "72%"
  }
];

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-bg text-white pt-32 pb-0 overflow-hidden relative">
      
      {/* Go Back Button */}
      <Link 
        to="/" 
        className="fixed top-8 left-4 md:left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-mono uppercase tracking-widest text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight uppercase mb-8">
            Education, certifications, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
              and the foundation behind my work.
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-white mb-8"></div>
          
          <p className="text-xl md:text-2xl font-body text-gray-300 leading-relaxed max-w-3xl">
            I am a passionate Computer Science student with a strong foundation in web development and programming. I enjoy building scalable applications and solving complex problems. My expertise lies in the MERN stack, and I am always eager to learn new technologies.
          </p>
        </motion.div>
      </div>

      {/* Full-width scrolling text animation */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
      >
        <ScrollVelocity text="The learning, achievements, and experiences that shape my work." baseVelocity={1.5} />
        <ScrollVelocity text="The learning, achievements, and experiences that shape my work." baseVelocity={-1.5} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mt-20 relative z-10">
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="prose prose-invert prose-lg max-w-4xl mx-auto mb-32"
        >
          <div className="bg-[#111111] border border-white/10 p-8 md:p-12 relative overflow-hidden group hover:border-white/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
            
            <p className="font-body text-xl md:text-2xl text-gray-300 leading-relaxed relative z-10">
              Driven by curiosity and a passion for technology, I have built a strong foundation through academic studies, professional certifications, and hands-on projects. Each experience has helped shape my skills in AI, software development, automation, and problem-solving.
            </p>
          </div>
        </motion.div>

        {/* Education Timeline: Cubes left, Cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch w-full mb-16">
          
          {/* Cubes Animation on the Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full flex justify-center items-center h-[400px] md:h-full min-h-[400px] bg-[#111111]/50 border border-white/5 rounded-3xl overflow-hidden relative cursor-crosshair"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0"></div>
            <Cubes
              gridSize={8}
              borderStyle="1px solid rgba(255, 255, 255, 0.3)"
              faceColor="rgba(255, 255, 255, 0.05)"
              rippleColor="rgba(255, 255, 255, 0.8)"
              shadow={true}
              radius={2}
            />
          </motion.div>

          {/* Education Card Swap on the Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col justify-center items-center relative"
          >
            <h2 className="text-xl md:text-2xl font-display uppercase tracking-widest text-white mb-12 text-center">
              // Academic Timeline
            </h2>
            <CardSwap cards={educationData} />
          </motion.div>

        </div>
      </div>
      
      {/* Backend-Driven Certifications Section */}
      <Certifications />
      
      {/* Contact Section at the Bottom */}
      <div className="w-full bg-[#111111] pt-16 pb-0 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 -mb-4 md:-mb-8 lg:-mb-12">
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-sans text-5xl md:text-7xl lg:text-[10rem] font-extrabold uppercase tracking-tight text-[#363636] leading-none">
              Let's Connect
            </h3>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="mailto:vashu@example.com" 
              className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}
