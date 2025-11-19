import React from 'react';
import { Certificate, CertificateTemplate } from '../types';

interface ShareCardProps {
  certificate: Certificate;
  template: CertificateTemplate;
}

const ShareCard: React.FC<ShareCardProps> = ({ certificate, template }) => {
  const shareUrl = `${window.location.origin}/certificates/share/${certificate.uniqueId}`;

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
        padding: '80px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      {/* Certificate in the middle with rounded corners */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          aspectRatio: '297 / 210',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          marginBottom: '60px',
        }}
      >
        <img
          src={template.templateImageUrl}
          alt="Certificate"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          crossOrigin="anonymous"
        />
        <div
          style={{
            position: 'absolute',
            fontSize: '32px',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            textAlign: 'center',
            paddingLeft: '32px',
            paddingRight: '32px',
            color: template.textColor === 'white' ? '#ffffff' : '#0f172a',
            textShadow: template.textColor === 'white' 
              ? '0 2px 10px rgba(0,0,0,0.5)' 
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
            bottom: '20px',
            right: '24px',
            fontSize: '10px',
            fontFamily: 'monospace',
            color: template.textColor === 'white' ? '#ffffff' : '#0f172a',
            textShadow: template.textColor === 'white' 
              ? '0 1px 3px rgba(0,0,0,0.4)' 
              : '0 1px 3px rgba(255,255,255,0.6)',
          }}
        >
          ID: {certificate.uniqueId}
        </div>
      </div>

      {/* Link below */}
      <div style={{
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 600,
        color: '#4285F4',
        wordBreak: 'break-all',
        padding: '0 40px',
      }}>
        {shareUrl}
      </div>
    </div>
  );
};

export default ShareCard;

