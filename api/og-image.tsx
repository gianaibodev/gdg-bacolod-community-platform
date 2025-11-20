import React from 'react';

export default function OGImage() {
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
        padding: '60px',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src="https://www.svgrepo.com/show/353810/google-developers.svg"
          alt="Google Developers"
          style={{
            width: '120px',
            height: '120px',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          textAlign: 'center',
          lineHeight: '1.2',
        }}
      >
        GDG Bacolod
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '32px',
          margin: '0 0 40px 0',
          textAlign: 'center',
          opacity: 0.9,
          fontWeight: '300',
        }}
      >
        Google Developer Group
      </p>

      {/* Features */}
      <div
        style={{
          display: 'flex',
          gap: '40px',
          marginTop: '40px',
          fontSize: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🎉</div>
          <div>DevFest</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>📚</div>
          <div>Workshops</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🤝</div>
          <div>Community</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🏆</div>
          <div>Certificates</div>
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: '60px',
          fontSize: '18px',
          opacity: 0.8,
          fontFamily: 'monospace',
        }}
      >
        gdg-bacolod.vercel.app
      </div>
    </div>
  );
}

