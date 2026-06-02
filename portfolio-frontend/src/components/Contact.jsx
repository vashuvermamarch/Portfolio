import React, { Component, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ShapeBlur from './ShapeBlur';
import BorderGlow from './BorderGlow';
import ShinyText from './ShinyText';

class LocalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }
  render() {
    if (this.state.hasError) {
      return null; // Fail silently since we have CSS fallbacks
    }
    return this.props.children;
  }
}

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(data)
      });
      
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error("Django API Error:", result);
        setStatus('error');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setStatus('error');
    }
  };

  return (
    <div id="contact" className="w-full min-h-screen flex flex-col justify-end items-center pb-24 pt-48 relative z-20 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row gap-16 items-end">
        
        {/* Contact Info */}
        <div className="lg:w-1/2 w-full z-10">
          <h2 className="text-6xl md:text-8xl font-display font-bold mb-6 uppercase tracking-wider leading-tight flex flex-col items-start">
            <ShinyText text="LET'S" speed={3} className="text-white" />
            <ShinyText text="TALK" speed={3} className="text-white" />
          </h2>
          <div className="h-2 w-32 bg-white mb-12" />
          
          <p className="text-gray-400 text-xl font-mono uppercase tracking-widest leading-relaxed mb-12">
            Interested in building something great together? Drop me a message and I'll get back to you shortly.
          </p>

          <div className="space-y-8">
            <a href="mailto:karanverma24march@gmail.com" className="flex items-center gap-6 group cursor-pointer w-fit">
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
                <Mail className="w-6 h-6 text-current" />
              </div>
              <div>
                <p className="text-white font-mono uppercase tracking-widest">Email</p>
                <p className="text-gray-400 group-hover:text-white transition-colors">karanverma24march@gmail.com</p>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/vashu-verma-61a70a316v" target="_blank" rel="noreferrer" className="flex items-center gap-6 group cursor-pointer w-fit">
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
                <FaLinkedin className="w-6 h-6 text-current" />
              </div>
              <div>
                <p className="text-white font-mono uppercase tracking-widest">LinkedIn</p>
                <p className="text-gray-400 group-hover:text-white transition-colors">vashu-verma-61a70a316v</p>
              </div>
            </a>

            <a href="https://github.com/vashuvermamarch" target="_blank" rel="noreferrer" className="flex items-center gap-6 group cursor-pointer w-fit">
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
                <FaGithub className="w-6 h-6 text-current" />
              </div>
              <div>
                <p className="text-white font-mono uppercase tracking-widest">GitHub</p>
                <p className="text-gray-400 group-hover:text-white transition-colors">vashuvermamarch</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="lg:w-1/2 w-full relative">
          
          {/* Background Effects Container */}
          <div className="absolute -inset-10 z-0 pointer-events-none">
            
            {/* CSS Fallback Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 blur-[100px] rounded-full animate-pulse opacity-50" />

            {/* ShapeBlur WebGL Canvas */}
            <LocalErrorBoundary>
              <ShapeBlur 
                variation={0} 
                pixelRatioProp={1} 
                shapeSize={1.2} 
                roundness={0.4} 
                borderSize={0.05} 
                circleSize={0.3} 
                circleEdge={0.5} 
                className="opacity-100"
              />
            </LocalErrorBoundary>
          </div>

          <BorderGlow
            glowColor="0 0 100" 
            colors={['#ffffff', '#ffffff', '#ffffff']}
            backgroundColor="#0a0a0a"
            fillOpacity={0}
            borderWidth={1}
            className="w-full relative z-10 rounded-2xl shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-6 w-full h-full relative z-10">
              {/* Optional Web3Forms Config */}
              <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />
              <input type="checkbox" name="botcheck" id="" style={{ display: 'none' }} />
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-white font-mono uppercase tracking-widest text-sm">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  className="bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-white/50 transition-colors font-mono"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white font-mono uppercase tracking-widest text-sm">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-white/50 transition-colors font-mono"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="message" className="text-white font-mono uppercase tracking-widest text-sm">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows="4" 
                  className="bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-white/50 transition-colors font-mono resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p className="text-red-400 font-mono text-sm uppercase tracking-widest">Failed to send message. Please check the console.</p>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="group bg-white text-black font-mono uppercase tracking-widest py-4 flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                {status !== 'loading' && status !== 'success' && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </BorderGlow>
        </div>

      </div>
    </div>
  );
}
