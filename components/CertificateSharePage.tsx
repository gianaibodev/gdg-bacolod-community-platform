import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { getIssuedCertificateById, getCertificateTemplates } from '../services/mockCms';
import { Certificate, CertificateTemplate } from '../types';
import HolographicCard from './HolographicCard';
import PublicCertificateRenderer from './PublicCertificateRenderer';

const CertificateSharePage: React.FC = () => {
  const { certId } = useParams<{ certId: string }>();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [template, setTemplate] = useState<CertificateTemplate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCertificate = async () => {
      if (!certId) {
        setError('Certificate ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const cert = await getIssuedCertificateById(certId);
        
        if (!cert) {
          setError('Certificate not found');
          setLoading(false);
          return;
        }

        const templates = await getCertificateTemplates();
        const certTemplate = templates.find(t => t.eventId === cert.eventId);

        if (!certTemplate) {
          setError('Certificate template not found');
          setLoading(false);
          return;
        }

        setCertificate(cert);
        setTemplate(certTemplate);

        // Update page meta tags for social sharing
        document.title = `${cert.recipientName} - ${cert.eventName} Certificate | GDG Bacolod`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `${cert.recipientName} has been awarded a certificate for participating in ${cert.eventName}.`);
        }

        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (ogTitle) ogTitle.setAttribute('content', `${cert.recipientName} - ${cert.eventName} Certificate`);
        if (ogDescription) ogDescription.setAttribute('content', `Certificate of Participation awarded to ${cert.recipientName} for ${cert.eventName}`);
        if (ogImage) ogImage.setAttribute('content', certTemplate.templateImageUrl);
        if (ogUrl) ogUrl.setAttribute('content', window.location.href);

        // Twitter card tags
        const twitterCard = document.querySelector('meta[name="twitter:card"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');

        if (twitterCard) twitterCard.setAttribute('content', 'summary_large_image');
        if (twitterTitle) twitterTitle.setAttribute('content', `${cert.recipientName} - ${cert.eventName} Certificate`);
        if (twitterDescription) twitterDescription.setAttribute('content', `Certificate of Participation awarded to ${cert.recipientName}`);
        if (twitterImage) twitterImage.setAttribute('content', certTemplate.templateImageUrl);

        setLoading(false);
      } catch (err) {
        console.error('Error loading certificate:', err);
        setError('Failed to load certificate');
        setLoading(false);
      }
    };

    loadCertificate();
  }, [certId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 bg-[#4285F4] rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-[#DB4437] rounded-full animate-bounce [animation-delay:0.15s]"></div>
          <div className="w-5 h-5 bg-[#F4B400] rounded-full animate-bounce [animation-delay:0.3s]"></div>
          <div className="w-5 h-5 bg-[#0F9D58] rounded-full animate-bounce [animation-delay:0.45s]"></div>
        </div>
      </div>
    );
  }

  if (error || !certificate || !template) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Certificate Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error || 'The certificate you are looking for does not exist.'}</p>
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Certificates
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(certificate.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-slate-50 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 bg-dot-pattern dark:bg-dot-pattern-dark opacity-40"></div>
        
        {/* Orbital System */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Large Orbit Ring */}
          <div className="w-[350px] h-[350px] md:w-[800px] md:h-[800px] rounded-full border border-slate-100 dark:border-white/5 animate-orbit">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-google-blue rounded-full blur-sm shadow-[0_0_20px_rgba(66,133,244,0.6)]"></div>
          </div>
          {/* Medium Orbit Ring */}
          <div className="absolute w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full border border-slate-100 dark:border-white/5 animate-orbit-reverse">
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-google-red rounded-full blur-sm shadow-[0_0_20px_rgba(219,68,55,0.6)]"></div>
          </div>
          {/* Small Orbit Ring */}
          <div className="absolute w-[150px] h-[150px] md:w-[400px] md:h-[400px] rounded-full border border-slate-100 dark:border-white/5 animate-orbit" style={{ animationDuration: '15s' }}>
            <div className="absolute right-0 top-1/2 w-2 h-2 bg-google-yellow rounded-full blur-sm shadow-[0_0_15px_rgba(244,180,0,0.6)]"></div>
          </div>
        </div>

        {/* Gradient Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-google-blue/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-google-red/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-google-yellow/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-google-blue transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <img
                src="https://i.postimg.cc/7CnMJDwq/GDG-Bacolod.png"
                alt="GDG Bacolod"
                className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Confirmation Banner */}
        <div className="mb-12 text-center relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-google-blue via-google-red to-google-yellow mb-6 shadow-2xl shadow-google-blue/30 animate-pulse-glow">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-google-blue mb-4">Certificate Verified</p>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 bg-clip-text">
            Certificate Awarded
          </h1>
          <div className="max-w-3xl mx-auto bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white text-xl">{certificate.recipientName}</span> has been awarded a{' '}
              <span className="font-bold text-google-blue">Certificate of Participation</span> for successfully completing{' '}
              <span className="font-bold text-google-red">{certificate.eventName}</span>.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Issued on <span className="font-semibold text-slate-700 dark:text-slate-300">{formattedDate}</span> • Certificate ID: <span className="font-mono text-google-blue">{certificate.uniqueId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Holographic Certificate Display */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-google-blue via-google-red to-google-yellow rounded-3xl blur-2xl opacity-30 animate-pulse-glow"></div>
              <div className="relative">
                <HolographicCard
                  certificate={certificate}
                  onDownload={() => {
                    // Trigger download
                    const link = document.createElement('a');
                    link.href = `/certificates?certId=${certificate.uniqueId}`;
                    link.click();
                  }}
                  onShare={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: `${certificate.eventName} Certificate`,
                        text: `Check out my certificate!`,
                        url: window.location.href,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Certificate View */}
        <div className="mb-12">
          <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-12 border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-google-blue via-google-red to-google-yellow"></div>
            
            <div className="mb-6 text-center relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">View Full Certificate</h2>
              <p className="text-slate-600 dark:text-slate-400">Download as PNG or PDF</p>
            </div>
            <div className="relative z-10">
              <PublicCertificateRenderer certificate={certificate} template={template} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/certificates"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Claim Another Certificate
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-google-blue to-google-red text-white rounded-full font-semibold hover:from-blue-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Visit Homepage
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CertificateSharePage;

