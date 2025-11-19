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
      id="share-card-container"
      style={{
        position: 'relative',
        width: '1080px',
        height: '1350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px',
        overflow: 'hidden',
        backgroundColor: '#4285F4', // Force HEX - primary background
        background: 'linear-gradient(to bottom right, #4285F4, #2563eb, #1e40af)', // Fallback gradient
        color: '#ffffff', // Force HEX - default text color
        // Override any CSS classes that might use oklch
        border: 'none',
        boxShadow: 'none',
      }}
    >
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: '0', opacity: 0.1 }}>
        <div style={{
          position: 'absolute',
          inset: '0',
          backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* GDG Logo/Header */}
      <div style={{ position: 'absolute', top: '48px', left: '0', right: '0', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.9)' }}>
            Google Developer Groups
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.025em', color: '#ffffff' }}>
            GDG Bacolod
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      <div 
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '900px',
          aspectRatio: '297 / 210',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <img
          src={template.templateImageUrl}
          alt="Certificate"
          style={{
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: '1',
            visibility: 'visible',
            backgroundColor: '#ffffff',
          }}
          crossOrigin="anonymous"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            console.error('Image failed to load:', template.templateImageUrl);
            (e.target as HTMLImageElement).style.backgroundColor = '#f0f0f0';
          }}
        />
        <div
          style={{
            position: 'absolute',
            fontSize: '30px',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            textAlign: 'center',
            paddingLeft: '32px',
            paddingRight: '32px',
            color: template.textColor === 'white' ? '#ffffff' : '#0f172a',
            textShadow: template.textColor === 'white' 
              ? '0 2px 10px rgba(0,0,0,0.4)' 
              : '0 1px 6px rgba(255,255,255,0.9)',
            left: `${template.namePosition?.x ?? 50}%`,
            top: `${template.namePosition?.y ?? 50}%`,
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {certificate.recipientName}
        </div>
        <div 
          style={{ 
            position: 'absolute',
            bottom: '24px',
            right: '32px',
            fontSize: '10px',
            fontFamily: 'monospace',
            color: template.textColor === 'white' ? '#ffffff' : '#0f172a',
            textShadow: template.textColor === 'white' 
              ? '0 1px 3px rgba(0,0,0,0.3)' 
              : '0 1px 3px rgba(255,255,255,0.5)',
          }}
        >
          ID: {certificate.uniqueId}
        </div>
      </div>

      {/* Event Info */}
      <div style={{ position: 'absolute', bottom: '48px', left: '0', right: '0', textAlign: 'center', zIndex: 10 }}>
        <div style={{ fontSize: '36px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.025em', color: '#ffffff' }}>
          {certificate.eventName}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)' }}>
          Certificate of Participation
        </div>
        <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>
          {formattedDate}
        </div>
      </div>

      {/* Decorative Elements */}
      <div 
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          width: '256px',
          height: '256px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%)' 
        }} 
      />
      <div 
        style={{ 
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '384px',
          height: '384px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(40px)',
          transform: 'translate(50%, 50%)' 
        }} 
      />
    </div>
  );
};

export default ShareCard;

