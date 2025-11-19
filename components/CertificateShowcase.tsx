import React from 'react';
import HolographicCard from './HolographicCard';
import { Certificate } from '../types';

const demoCertificates: Certificate[] = [
  {
    id: 'demo-1',
    eventName: 'DevFest Bacolod 2024',
    recipientName: 'Your Name',
    date: '2024-11-16',
    theme: 'devfest',
  },
  {
    id: 'demo-2',
    eventName: 'Google I/O Extended Bacolod',
    recipientName: 'Your Name',
    date: '2024-07-27',
    theme: 'io',
  },
];

const CertificateShowcase: React.FC = () => {
  const handleDownload = (certificate: Certificate) => {
    // This is a demo; in a real setup you would trigger PDF download or navigate to detail page.
    alert(`Download certificate for ${certificate.recipientName} – ${certificate.eventName}`);
  };

  const handleShare = (certificate: Certificate) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${certificate.eventName} Certificate`,
          text: `Check out my certificate from ${certificate.eventName}!`,
          url: window.location.href,
        })
        .catch(() => {
          // ignore cancel/errors
        });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#121212] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-sm font-bold text-google-blue tracking-widest uppercase mb-3">
              Certificates
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Your Moments, Certified
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl text-sm md:text-base">
              A futuristic, holographic view of your achievements from GDG Bacolod events.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demoCertificates.map(cert => (
            <HolographicCard
              key={cert.id}
              certificate={cert}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateShowcase;


