import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/portfolio/certificates/')
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch certificates:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-32 mb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold uppercase mb-12 flex flex-wrap items-center gap-4 justify-start"
        >
          <span className="text-white">Professional</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Certifications</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] min-h-[280px]"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150"></div>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-2 leading-tight flex-1">
                  {cert.name}
                </h3>
                
                <p className="text-base text-gray-400 font-mono uppercase tracking-wider mb-8">
                  Issued by: <span className="text-white font-bold">{cert.issuer}</span>
                </p>
              </div>

              {cert.file && (
                <a 
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center justify-between w-full px-6 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="text-lg tracking-wide">View Certificate</span>
                  <ExternalLink className="w-6 h-6" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
