import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import { getPastEvents } from '../services/mockCms';

const PastEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getPastEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-slate-900">Past Events Gallery</h2>
           <p className="text-slate-500 mt-2">Highlights from our previous gatherings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <div key={event.id} className="relative group overflow-hidden rounded-2xl cursor-pointer h-64">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-lg">{event.title}</h4>
                <p className="text-slate-300 text-sm">{event.date}</p>
              </div>
            </div>
          ))}
          {/* Placeholder items to fill grid */}
          <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-64 lg:col-span-2">
             <img src="https://picsum.photos/800/400?random=99" alt="Community" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <span className="text-white font-bold text-xl border-2 border-white px-6 py-2 rounded-full">View Full Gallery</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastEvents;