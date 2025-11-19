
import React, { useRef, useState, useEffect } from 'react';
import { Code2, Users, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Visibility Observer to fix "invisible text" bug
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Holographic Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    imgRef.current.style.transform = `scale(1.1) translateX(${(x - centerX) / 20}px) translateY(${(y - centerY) / 20}px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !imgRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    imgRef.current.style.transform = 'scale(1) translateX(0) translateY(0)';
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 bg-white dark:bg-[#1C1C1E] transition-colors duration-500 overflow-hidden relative"
    >
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-google-blue/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Premium 3D Image Card */}
          <div 
            className={`relative group perspective-1000 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
             {/* Animated Border Gradient */}
             <div className="absolute -inset-1 bg-gradient-to-r from-google-blue via-google-red to-google-yellow rounded-[2.5rem] opacity-30 group-hover:opacity-100 blur-md transition-opacity duration-500 animate-gradient-xy"></div>
             
             <div 
                ref={cardRef}
                className="relative rounded-[2.5rem] bg-white dark:bg-[#121212] p-2 transition-transform duration-200 ease-out shadow-2xl"
             >
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square">
                   <img 
                     ref={imgRef}
                     src="https://scontent-sin11-1.xx.fbcdn.net/v/t39.30808-6/475382349_122184384248100644_5124867120317991802_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeF3S8G8iMKJF_3Dvh4WwslxkX4drwhnPbyRfh2vCGc9vHeawSRWPK80ItJN_k9snGrJlxUT1dd0Jb16ur-UYk4p&_nc_ohc=EjtSnJp-EAAQ7kNvwHVT4yj&_nc_oc=AdnM8z9AYmTC1yTru9ucMq2bKrlLqObgTaSRVypdTCZN06e7_pujf3DIZ-UGWIi-8hE&_nc_zt=23&_nc_ht=scontent-sin11-1.xx&_nc_gid=q8KSfontJTtFVcLQiJZpaQ&oh=00_AfjJYoToJFR5rOBaLxXvBbWUSXqIcbxCvvGJ5V-Agw8dRw&oe=6923A6FC" 
                     alt="GDG Bacolod Community" 
                     className="w-full h-full object-cover transition-transform duration-200"
                   />
                   
                   {/* Holographic Shine Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
                </div>
             </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-sm font-bold text-google-blue tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-google-blue inline-block"></span>
              Who We Are
            </h2>
            <h3 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              Tech Innovation <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-purple-600">In the City of Smiles</span>
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-light">
              GDG Bacolod is a non-profit developer group dedicated to building a strong software development community in Bacolod City. We organize events, workshops, and meetups to share knowledge about Google technologies.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-blue-100 dark:border-blue-800/30">
                  <Code2 className="text-google-blue" size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-google-blue transition-colors">Workshops & Codelabs</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Hands-on experience with Web, Mobile, AI, and Cloud technologies.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-red-100 dark:border-red-800/30">
                  <Users className="text-google-red" size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-google-red transition-colors">Community Building</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Connecting students, professionals, and startups in Bacolod.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-yellow-100 dark:border-yellow-800/30">
                  <Lightbulb className="text-google-yellow" size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-google-yellow transition-colors">Innovation</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Fostering ideas that solve local problems using global tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
