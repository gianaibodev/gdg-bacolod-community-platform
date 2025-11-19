
import React, { useEffect, useState } from 'react';
import { getTeamMembers } from '../services/mockCms';
import { TeamMember } from '../types';

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers().then((data) => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="team" className="py-32 bg-slate-50 dark:bg-[#1C1C1E] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-google-blue tracking-widest uppercase mb-4">Community Leaders</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Meet the Team</h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[1,2,3,4,5].map(i => (
               <div key={i} className="animate-pulse flex flex-col items-center">
                 <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-full mb-4"></div>
                 <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
               </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-12">
            {team.map((member) => (
              <div key={member.id} className="group flex flex-col items-center text-center">
                <div className="relative mb-4 md:mb-6 w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 bg-gradient-to-tr from-google-blue to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <img 
                    src={member.photoUrl} 
                    alt={member.name} 
                    className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white dark:border-[#121212] transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name}&background=random`;
                    }}
                  />
                </div>
                
                <div>
                  <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-3">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
