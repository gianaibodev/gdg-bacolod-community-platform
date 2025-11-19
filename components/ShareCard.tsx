import React from 'react';
import { Certificate, CertificateTemplate } from '../types';

interface ShareCardProps {
  certificate: Certificate;
  template: CertificateTemplate;
}

const ShareCard: React.FC<ShareCardProps> = ({ certificate, template }) => {
  // Format date
  const date = new Date(certificate.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="relative w-[1080px] h-[1350px] bg-gradient-to-br from-google-blue via-blue-600 to-blue-800 flex flex-col items-center justify-center p-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* GDG Logo/Header */}
      <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
        <div className="text-center">
          <div className="text-white/90 text-sm font-semibold tracking-[0.3em] uppercase mb-2">
            Google Developer Groups
          </div>
          <div className="text-white text-2xl font-black tracking-tight">
            GDG Bacolod
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="relative z-20 w-full max-w-[900px] aspect-[1.414/1] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white">
        <img
          src={template.templateImageUrl}
          alt="Certificate"
          className="absolute inset-0 w-full h-full object-cover"
          crossOrigin="anonymous"
          loading="eager"
          decoding="sync"
        />
        <div
          className={`absolute text-3xl font-black tracking-tight text-center px-8 ${
            template.textColor === 'white'
              ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
              : 'text-slate-900 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]'
          }`}
          style={{
            left: `${template.namePosition?.x ?? 50}%`,
            top: `${template.namePosition?.y ?? 50}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {certificate.recipientName}
        </div>
      </div>

      {/* Event Info */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-10">
        <div className="text-white text-4xl font-black mb-3 tracking-tight">
          {certificate.eventName}
        </div>
        <div className="text-white/80 text-lg font-semibold">
          Certificate of Participation
        </div>
        <div className="text-white/60 text-sm font-medium mt-2">
          {formattedDate}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </div>
  );
};

export default ShareCard;

