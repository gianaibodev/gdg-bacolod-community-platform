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
    <div 
      className="relative w-[1080px] h-[1350px] flex flex-col items-center justify-center p-16 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #4285F4, #2563eb, #1e40af)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* GDG Logo/Header */}
      <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
        <div className="text-center">
          <div className="text-sm font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Google Developer Groups
          </div>
          <div className="text-2xl font-black tracking-tight" style={{ color: '#ffffff' }}>
            GDG Bacolod
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      <div 
        className="relative z-20 w-full max-w-[900px] aspect-[1.414/1] rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#ffffff',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <img
          src={template.templateImageUrl}
          alt="Certificate"
          className="absolute inset-0 w-full h-full object-cover"
          crossOrigin="anonymous"
          loading="eager"
          decoding="sync"
        />
        <div
          className="absolute text-3xl font-black tracking-tight text-center px-8"
          style={{
            color: template.textColor === 'white' ? '#ffffff' : '#0f172a',
            textShadow: template.textColor === 'white' 
              ? '0 2px 10px rgba(0,0,0,0.4)' 
              : '0 1px 6px rgba(255,255,255,0.9)',
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
        <div className="text-4xl font-black mb-3 tracking-tight" style={{ color: '#ffffff' }}>
          {certificate.eventName}
        </div>
        <div className="text-lg font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Certificate of Participation
        </div>
        <div className="text-sm font-medium mt-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          {formattedDate}
        </div>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-0 left-0 w-64 h-64 rounded-full" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%)' 
        }} 
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(40px)',
          transform: 'translate(50%, 50%)' 
        }} 
      />
    </div>
  );
};

export default ShareCard;

