import React from 'react';

// This route renders a preview of the website for social media
// It can be accessed at /og-preview and used with screenshot services
const OGPreview: React.FC = () => {
  return (
    <div style={{
      width: '1200px',
      height: '630px',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      margin: '0 auto',
    }}>
      {/* Google Colors Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)',
      }} />
      
      {/* Logo */}
      <img
        src="https://www.svgrepo.com/show/353810/google-developers.svg"
        alt="Google Developers"
        style={{
          width: '120px',
          height: '120px',
          marginBottom: '30px',
        }}
      />
      
      {/* Title */}
      <h1 style={{
        fontSize: '64px',
        fontWeight: 700,
        color: '#1a73e8',
        marginBottom: '16px',
        textAlign: 'center',
        margin: 0,
      }}>
        GDG Bacolod
      </h1>
      
      {/* Subtitle */}
      <p style={{
        fontSize: '32px',
        color: '#5f6368',
        marginBottom: '50px',
        textAlign: 'center',
        fontWeight: 400,
        margin: '0 0 50px 0',
      }}>
        Google Developer Group
      </p>
      
      {/* Features */}
      <div style={{
        display: 'flex',
        gap: '50px',
        marginTop: '40px',
      }}>
        {[
          { icon: '🎉', text: 'DevFest' },
          { icon: '📚', text: 'Workshops' },
          { icon: '🤝', text: 'Community' },
          { icon: '🏆', text: 'Certificates' },
        ].map((feature, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{feature.icon}</div>
            <div style={{ fontSize: '20px', color: '#5f6368', fontWeight: 500 }}>{feature.text}</div>
          </div>
        ))}
      </div>
      
      {/* URL */}
      <div style={{
        marginTop: '50px',
        fontSize: '18px',
        color: '#9aa0a6',
        fontFamily: 'monospace',
      }}>
        gdg-bacolod.vercel.app
      </div>
    </div>
  );
};

export default OGPreview;
