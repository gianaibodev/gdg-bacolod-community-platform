
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-white border-t border-slate-100 dark:bg-[#0F0F0F] dark:border-slate-800 pt-32 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3 group">
               {/* Footer Logo - Same logic as Navbar */}
               <div className="relative h-8 w-auto flex items-center">
                  <img 
                    src="https://www.svgrepo.com/show/353810/google-developers.svg" 
                    alt="GDG Bacolod" 
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback SVG (Hidden by default unless img fails) */}
                  <div className="hidden flex items-center gap-2">
                    <svg viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                       <path d="M10 2 L2 10 L10 18" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white" />
                       <path d="M22 2 L30 10 L22 18" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white" />
                    </svg>
                    <span className="text-lg font-bold text-slate-500 dark:text-slate-400">GDG Bacolod</span>
                  </div>
               </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-loose text-lg font-light max-w-xs">
              Empowering Bacolod's developers through Google technology, innovation, and community.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold mb-8 tracking-[0.2em] uppercase text-slate-400 dark:text-slate-600">Menu</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300 font-medium">
              <li><a href="#about" className="hover:text-google-blue transition-colors inline-block hover:translate-x-1 duration-300">About Us</a></li>
              <li><a href="#gallery" className="hover:text-google-blue transition-colors inline-block hover:translate-x-1 duration-300">Moments</a></li>
              <li><a href="#team" className="hover:text-google-blue transition-colors inline-block hover:translate-x-1 duration-300">Team</a></li>
              <li><Link to="/admin" className="hover:text-google-blue transition-colors inline-block hover:translate-x-1 duration-300">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-8 tracking-[0.2em] uppercase text-slate-400 dark:text-slate-600">Connect</h4>
            <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">Bacolod City, Philippines</p>
            
            <div className="flex gap-4">
               <a href="https://www.facebook.com/gdgbacolod" target="_blank" rel="noreferrer" className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-2 hover:shadow-xl text-slate-600 dark:text-white">
                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M9.94 22v-9.83H7V9h2.94V6.82c0-2.54 1.5-4.5 4.38-4.5 1.38 0 2.66.1 2.66.1v3h-1.5c-1.43 0-1.87.9-1.87 1.82V9h3.49l-.56 3.17h-2.93V22h-3.6z"/></svg>
               </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-medium">
          <p>&copy; 2025 Google Developer Group Bacolod. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0 opacity-50">Made with ❤️ in the City of Smiles.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
