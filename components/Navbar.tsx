
import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', type: 'hash' },
    { name: 'Moments', href: '#gallery', type: 'hash' },
    { name: 'Team', href: '#team', type: 'hash' },
    { name: 'Certificates', href: '/certificates', type: 'route' },
  ] as const;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav className={`
        pointer-events-auto
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? 'w-[95%] md:w-[850px] py-3 px-6' : 'w-full max-w-7xl py-4 px-4 md:px-8 bg-transparent border-transparent shadow-none backdrop-blur-none'}
        ${scrolled ? 'glass-pill rounded-full' : ''}
        flex items-center justify-between
      `}>
        
        {/* Logo Section */}
        <HashLink smooth to="/#" className="flex-shrink-0 group cursor-pointer flex items-center gap-2">
          <div className="h-8 flex items-center">
             {!logoError ? (
                <img 
                  src="https://i.postimg.cc/7CnMJDwq/GDG-Bacolod.png" 
                  alt="GDG Bacolod" 
                  className={`h-full w-auto object-contain transition-transform group-hover:scale-105 duration-300 ${darkMode ? 'brightness-0 invert' : ''}`}
                  onError={(e) => {
                    setLogoError(true);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-lg">
                   <span className="text-google-blue">&lt;</span>
                   GDG Bacolod
                   <span className="text-google-blue">/&gt;</span>
                </div>
              )}
          </div>
        </HashLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link =>
            link.type === 'hash' ? (
              <HashLink
                key={link.name}
                smooth
                to={`/${link.href}`}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative group/link"
              >
                {link.name}
              </HashLink>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative group/link"
              >
                {link.name}
              </Link>
            ),
          )}
          
          <div className={`w-px h-4 bg-slate-300 dark:bg-slate-700 mx-2 ${!scrolled && 'hidden'}`}></div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href="https://gdg.community.dev/gdg-bacolod/"
            target="_blank"
            rel="noreferrer"
            className={`
              text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300
              ${scrolled 
                ? 'bg-slate-900 text-white hover:bg-google-blue hover:scale-105 shadow-lg dark:bg-white dark:text-black dark:hover:bg-google-blue dark:hover:text-white' 
                : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-400 hover:shadow-md dark:bg-transparent dark:text-white dark:border-white/20'}
            `}
          >
            Join
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-md"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-800 dark:text-white bg-white/50 dark:bg-black/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors backdrop-blur-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Overlay */}
      <div className={`md:hidden fixed inset-0 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl z-40 transition-all duration-500 pointer-events-auto flex flex-col justify-center items-center space-y-8 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {navLinks.map(link =>
          link.type === 'hash' ? (
            <HashLink
              key={link.name}
              smooth
              to={`/${link.href}`}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-bold text-slate-900 dark:text-white hover:text-google-blue transition-colors"
            >
              {link.name}
            </HashLink>
          ) : (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-bold text-slate-900 dark:text-white hover:text-google-blue transition-colors"
            >
              {link.name}
            </Link>
          ),
        )}
          <a
            href="https://gdg.community.dev/gdg-bacolod/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 bg-google-blue text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl"
          >
            Join Chapter
          </a>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full">
            <X size={24} />
          </button>
      </div>
    </div>
  );
};

export default Navbar;
