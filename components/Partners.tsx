import React, { useEffect, useState } from 'react';
import { Partner } from '../types';
import { getPartners } from '../services/mockCms';

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
        const data = await getPartners();
        setPartners(data);
    };
    fetchPartners();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#121212] transition-colors duration-500 border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-10">Supported By</h3>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map((partner) => (
            <a 
                key={partner.id} 
                href={partner.websiteUrl || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="w-48 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <img 
                src={partner.logoUrl} 
                alt={partner.name} 
                className="w-full h-auto object-contain transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect fill='%23f1f3f4' width='200' height='100'/%3E%3Ctext fill='%234285F4' font-family='system-ui' font-size='16' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(partner.name)}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
