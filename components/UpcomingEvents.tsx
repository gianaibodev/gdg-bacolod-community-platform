import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import { getUpcomingEvents } from '../services/mockCms';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getUpcomingEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) return null; // Or a skeleton loader

  if (events.length === 0) {
      return (
        <section id="upcoming" className="py-20 bg-slate-50 dark:bg-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex flex-col items-center justify-center mb-6">
                   <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 animate-bounce">
                      <Calendar className="text-slate-400 dark:text-slate-500" size={32} />
                   </div>
                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">No Upcoming Events</h2>
                   <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">We're currently planning our next big gathering! Stay tuned for updates.</p>
                </div>
                <a 
                   href="https://gdg.community.dev/gdg-bacolod/" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
                >
                   Check Past Events <ArrowRight size={18} />
                </a>
            </div>
        </section>
      )
  }

  return (
    <section id="upcoming" className="py-20 bg-slate-50 dark:bg-[#1a1a1a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h2 className="text-sm font-bold text-google-blue tracking-widest uppercase mb-2">What's Next</h2>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Upcoming Events</h3>
            </div>
            <a href="https://gdg.community.dev/gdg-bacolod/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-google-blue font-bold hover:underline">
                View All on Community Page <ArrowRight size={16} />
            </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-[#252527] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row h-full md:h-[280px]">
              {/* Image Section */}
              <div className="w-full md:w-2/5 relative h-48 md:h-full bg-slate-100 dark:bg-slate-800">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='280'%3E%3Crect fill='%234285F4' width='400' height='280'/%3E%3Ctext fill='white' font-family='system-ui' font-size='20' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(event.title)}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white shadow-sm z-10">
                    {event.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-google-blue transition-colors">
                        {event.title}
                    </h4>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                            <Calendar size={18} className="text-google-red" />
                            <span>{event.date}</span>
                        </div>
                        {event.time && (
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                                <Clock size={18} className="text-google-yellow" />
                                <span>{event.time}</span>
                            </div>
                        )}
                         {event.venue && (
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                                <MapPin size={18} className="text-google-green" />
                                <span className="line-clamp-1">{event.venue}</span>
                            </div>
                        )}
                    </div>
                </div>

                <a 
                    href={event.registrationLink || '#'}
                    target="_blank"
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-google-blue dark:hover:bg-google-blue hover:text-white dark:hover:text-white transition-colors w-full md:w-fit"
                >
                    RSVP Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;

