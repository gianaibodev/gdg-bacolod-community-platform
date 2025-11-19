import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import UpcomingEvents from './components/UpcomingEvents';
import PastEventsGallery from './components/PastEventsGallery';
import CertificateShowcase from './components/CertificateShowcase';
import Team from './components/Team';
import Partners from './components/Partners';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import AdminDashboard from './components/AdminDashboard';

// Google Style Loading Screen (4 Dots)
const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#121212] z-[60] flex flex-col items-center justify-center transition-colors duration-500">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 bg-[#4285F4] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#DB4437] rounded-full animate-bounce [animation-delay:0.15s]"></div>
        <div className="w-5 h-5 bg-[#F4B400] rounded-full animate-bounce [animation-delay:0.3s]"></div>
        <div className="w-5 h-5 bg-[#0F9D58] rounded-full animate-bounce [animation-delay:0.45s]"></div>
      </div>
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }
      
      if (outlineRef.current) {
        outlineRef.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    const handleMouseDown = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }
    };

    const handleMouseUp = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const clickables = document.querySelectorAll('a, button, .cursor-pointer');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (outlineRef.current) {
          outlineRef.current.style.transform = 'translate(-50%, -50%) scale(2.5)';
          outlineRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
          outlineRef.current.style.borderColor = 'transparent';
          outlineRef.current.style.backdropFilter = 'invert(100%)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (outlineRef.current) {
          outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
          outlineRef.current.style.backgroundColor = 'transparent';
          outlineRef.current.style.borderColor = '';
          outlineRef.current.style.backdropFilter = 'none';
        }
      });
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block"></div>
      <div ref={outlineRef} className="cursor-outline hidden md:block"></div>
    </>
  );
};

const Home: React.FC<{ darkMode: boolean; toggleTheme: () => void }> = ({ darkMode, toggleTheme }) => {
  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="flex flex-col min-h-screen bg-white dark:bg-[#121212] overflow-hidden transition-colors duration-500">
        <Hero />
        <About />
        <UpcomingEvents />
        <PastEventsGallery />
        <CertificateShowcase />
        <SocialFeed />
        <Team />
        <Partners />
      </main>
      <Footer />
      <AiAssistant />
    </>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Handle Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Ensure loading screen stays for 2.5s
    return () => clearTimeout(timer);
  }, []);

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <CustomCursor />
      <div className={`font-sans text-slate-900 dark:text-slate-200 bg-white dark:bg-[#121212] relative animate-fade-in min-h-screen selection:bg-google-blue selection:text-white`}>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
