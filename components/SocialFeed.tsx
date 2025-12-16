
import React from 'react';
import { Facebook, ExternalLink, MapPin, Megaphone } from 'lucide-react';

const SocialFeed: React.FC = () => {
  const featuredPost = {
    imageUrl: 'https://scontent-sin2-1.xx.fbcdn.net/v/t39.30808-6/569044633_122217334112100644_1819860683245894704_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHawKZrF-V2VnGerVXyDEX9d94Xaaq9YUF33hdpqr1hQQ9Its40JtmhsCNSgbAeRLXs6WlF5ms8F3bw3dbmdfXU&_nc_ohc=UmmbqfbDMw0Q7kNvwHVou_8&_nc_oc=AdnXWRKLVHPmXb0Fg4dkTj4Qcpyap_Y4smDBHablgFSxyfAugA2WXDue85ooRnUTWgU&_nc_zt=23&_nc_ht=scontent-sin2-1.xx&_nc_gid=ZivBL0x1fYHd7QyM9BtSog&oh=00_AfhCDk3mNqSNhTdPAUJU9QRWQH1Pd_CaIe9i9DCMpCifmA&oe=6923A44F',
    title: 'Get ready for DevFest Bacolod 2025!',
    content: `DevFest Bacolod 2025 is officially making its way to the University of St. La Salle! Mark your calendars for November 22, 2025, because this is going to be epic. 🔥\n\nBut don't wait too long – registration closes on November 8, 2025! Secure your slot before it's gone!`,
    venue: 'University of St. La Salle and College of Computing Studies',
    hashtags: ['#devfest2025', '#googledevfest', '#devfestbacolod', '#googleAI', '#geminiAI', '#firebase']
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#1C1C1E] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1877F2] p-2 rounded-full text-white shadow-lg shadow-blue-500/30">
                <Megaphone size={24} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Update</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Stay connected with what's happening in <span className="font-bold text-[#1877F2]">@gdgbacolod</span></p>
          </div>
          <a 
            href="https://www.facebook.com/gdgbacolod" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white font-bold rounded-full hover:bg-[#1465d6] transition-all hover:shadow-lg hover:-translate-y-1 transform"
          >
            <Facebook size={20} />
            Visit Facebook Page
          </a>
        </div>

        <div className="bg-white dark:bg-[#121212] rounded-[2rem] shadow-2xl dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row min-h-[600px] transition-colors duration-500">
          {/* Image Side */}
          <div className="lg:w-1/2 relative bg-black overflow-hidden flex items-center justify-center">
             <div 
               className="absolute inset-0 opacity-50 bg-cover bg-center blur-3xl scale-110"
               style={{ backgroundImage: `url(${featuredPost.imageUrl})` }}
             ></div>
             <img 
              src={featuredPost.imageUrl} 
              alt="DevFest Bacolod 2025" 
              className="relative z-10 max-h-[600px] w-auto object-contain shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234285F4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='800' height='600'/%3E%3Ctext fill='white' font-family='system-ui' font-size='36' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EDevFest Bacolod 2025%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              {featuredPost.title}
            </h3>
            
            <div className="space-y-8 mb-8">
              <p className="text-xl text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed font-light">
                {featuredPost.content}
              </p>
              
              <div className="flex items-start gap-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                <MapPin className="text-google-red shrink-0 mt-1" size={24} />
                <div>
                  <span className="block font-bold text-xs text-slate-400 uppercase tracking-widest mb-1">Official Venue Partner</span>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">{featuredPost.venue}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredPost.hashtags.map(tag => (
                  <span key={tag} className="text-sm text-google-blue font-medium bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-white/10">
              <a 
                href="https://www.facebook.com/gdgbacolod" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-lg text-google-blue font-bold hover:underline group"
              >
                Check our Facebook Feed <ExternalLink size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialFeed;
