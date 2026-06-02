import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Loader from './components/Loader';
import ClickSpark from './components/ClickSpark';
import ChatAgent from './components/ChatAgent';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400} />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 md:h-1.5 bg-white origin-left z-[9998]"
        style={{ scaleX }}
      />
      
      <AnimatePresence mode="wait">
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen bg-bg text-text selection:bg-white/20">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<MyProfile />} />
            </Routes>
          </AnimatePresence>
          <ChatAgent />
        </main>
      )}
    </>
  );
}

export default App;
