
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code2, Cpu, Sparkles } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    setTimeout(() => setIsLoaded(true), 100);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}deg`);
      containerRef.current.style.setProperty('--mouse-y', `${y}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#121212] pt-24 pb-0 transition-colors duration-500"
      style={{ perspective: '1000px' }}
    >
      {/* --- TECHNICAL GRID BACKGROUND (UNCHANGED) --- */}
      <div className="absolute inset-0 bg-dot-pattern dark:bg-dot-pattern-dark opacity-40 pointer-events-none"></div>
      
      {/* --- ORBITAL SYSTEM (BACKGROUND) --- */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        {/* Large Orbit Ring - Responsive sizing */}
        <div className="w-[350px] h-[350px] md:w-[800px] md:h-[800px] rounded-full border border-slate-100 dark:border-white/5 animate-orbit">
           <div className="absolute top-0 left-1/2 w-4 h-4 bg-google-blue rounded-full blur-sm shadow-[0_0_20px_rgba(66,133,244,0.6)]"></div>
        </div>
        {/* Medium Orbit Ring - Responsive sizing */}
        <div className="absolute w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full border border-slate-100 dark:border-white/5 animate-orbit-reverse">
           <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-google-red rounded-full blur-sm shadow-[0_0_20px_rgba(219,68,55,0.6)]"></div>
        </div>
      </div>

      {/* --- CONTENT CORE --- */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* HERO TYPOGRAPHY STACK */}
        <div className="relative mb-4 mt-4 md:mb-6 md:mt-8">
          {/* Floating 3D Shapes (Decorations) */}
          <div className="absolute -left-4 md:-left-12 top-0 animate-float-slow opacity-100 hidden lg:block">
            <div className="glass-pill p-4 rounded-full shadow-xl dark:bg-white/5 dark:border-white/10">
              <Code2 className="text-google-blue w-8 h-8" />
            </div>
          </div>
          <div className="absolute -right-4 md:-right-12 bottom-0 animate-float-slow [animation-delay:2s] opacity-100 hidden lg:block">
            <div className="glass-pill p-4 rounded-full shadow-xl dark:bg-white/5 dark:border-white/10">
              <Cpu className="text-google-red w-8 h-8" />
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-slate-900 dark:text-white select-none leading-tight">
            Google Developer <br/> Group <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#F4B400] animate-gradient-x pb-2">Bacolod</span>
          </h1>
        </div>

        <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8 md:mb-10 font-normal leading-relaxed px-4">
          Google Developer Groups are community groups for college and university students interested in Google developer technologies.
        </p>

        {/* ACTION ISLAND */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
          <a 
            href="https://gdg.community.dev/gdg-bacolod/"
            target="_blank"
            rel="noreferrer"
            className="group relative px-8 py-4 bg-google-blue text-white rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl shadow-lg shadow-blue-500/30 w-full sm:w-auto text-center"
          >
            <span className="relative flex items-center justify-center gap-2">
              Join Chapter <ArrowRight size={20} />
            </span>
          </a>
          
          <HashLink 
            smooth
            to="/#gallery"
            className="px-8 py-4 bg-white dark:bg-transparent text-slate-700 dark:text-white border border-slate-200 dark:border-white/20 rounded-full font-medium text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Sparkles size={20} className="text-google-yellow" />
            View Gallery
          </HashLink>
        </div>

      </div>
    </section>
  );
};

export default Hero;
