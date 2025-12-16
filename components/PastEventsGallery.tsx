import React, { useEffect, useState, useRef } from 'react';
import { Event } from '../types';
import { getPastEvents } from '../services/mockCms';
import { X, Maximize2 } from 'lucide-react';

const PastEventsGallery: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getPastEvents();
      setEvents(data); 
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleImageClick = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreen();
      }
    };
    if (fullscreenImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [fullscreenImage]);

  return (
    <section id="gallery" ref={sectionRef} className="py-40 bg-white dark:bg-[#121212] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-24 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-[12rem] leading-none font-bold text-slate-50 dark:text-white/5 tracking-tighter absolute top-[-4rem] left-[-2rem] pointer-events-none select-none scale-150 opacity-50">
            MOMENTS
          </h2>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-google-blue via-google-red to-google-yellow animate-gradient-x">
              Community <br/> 
              Gallery
            </h3>
            <div className="h-1.5 w-24 bg-gradient-to-r from-google-blue via-google-red to-google-yellow rounded-full animate-gradient-x"></div>
          </div>
        </div>

        {/* Masonry-style Grid - Pure Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 auto-rows-[350px] md:auto-rows-[450px]">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className={`relative group rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 ease-out shadow-2xl shadow-slate-200/50 dark:shadow-black/50 ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={event.imageUrl} 
                alt="Event Highlight" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%234285F4' width='800' height='600'/%3E%3Ctext fill='white' font-family='system-ui' font-size='32' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(event.title)}%3C/text%3E%3C/svg%3E`;
                }}
              />
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>

              {/* Floating Icon */}
              <button
                className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(event.imageUrl);
                }}
                aria-label={`View ${event.title} in fullscreen`}
              >
                <Maximize2 size={28} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150 z-10"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>
          <img 
            src={fullscreenImage} 
            alt="Event fullscreen" 
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%234285F4' width='800' height='600'/%3E%3Ctext fill='white' font-family='system-ui' font-size='32' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EEvent Image%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>
      )}
    </section>
  );
};

export default PastEventsGallery;
