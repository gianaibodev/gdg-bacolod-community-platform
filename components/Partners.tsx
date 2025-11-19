
import React, { useEffect, useState } from 'react';
import { Partner } from '../types';
import { getPartners } from '../services/mockCms';

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    getPartners().then(setPartners);
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#121212] transition-colors duration-500 border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-10">Supported By</h3>
        <div className="flex justify-center items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="w-48 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <img 
                src={partner.logoUrl} 
                alt={partner.name} 
                className="w-full h-auto object-contain dark:invert dark:brightness-0 dark:contrast-200" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
