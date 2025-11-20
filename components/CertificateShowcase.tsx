import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Info } from 'lucide-react';

const CertificateShowcase: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
    <section className="py-24 bg-slate-50 dark:bg-[#121212] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900/70 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-2xl overflow-hidden">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <p className="text-xs font-semibold tracking-[0.4em] uppercase text-google-blue mb-4">
                Certificates
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Claim your official GDG Bacolod certificate
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6">
                Attended DevFest, I/O Extended, or a community workshop? Verify your attendance in seconds and download
                a PDF/PNG with a unique verification ID. Perfect for LinkedIn, portfolios, and recruiting.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/certificates"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-slate-900/40 hover:bg-slate-800 transition"
                >
                  Claim your certificate
                </Link>
                <button
                  onClick={() => setShowInstructions(true)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/20 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition duration-150"
                >
                  View instructions
                </button>
              </div>
            </div>

            <div className="relative p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-google-blue/10 via-google-red/10 to-google-yellow/10 blur-3xl" />
              <div className="relative rounded-[1.75rem] border border-white/30 bg-slate-900 text-white px-8 py-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 mb-3">
                  Preview
                </p>
                <p className="text-2xl font-black mb-2">Juan Dela Cruz</p>
                <p className="text-sm text-slate-300">DevFest Bacolod 2024</p>
                <div className="mt-6 text-xs font-mono bg-white/10 px-3 py-1 rounded-full inline-flex">
                  Cert ID: GDG-XXXX-0001
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  Verified at gdgbacolod.com/certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Instructions Modal */}
    {showInstructions && (
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setShowInstructions(false)}
      >
        <div 
          className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 border border-slate-200 dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-google-blue/10 dark:bg-google-blue/20 flex items-center justify-center">
                <Info className="text-google-blue" size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">How to Claim Your Certificate</h3>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors duration-150"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 md:p-5">
              <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Important: RSVP Required</p>
              <p className="text-sm md:text-base leading-relaxed">
                To claim your certificate, you <strong>must have registered and RSVP'd</strong> for the event through our Bevy event page. 
                The certificate system uses the official attendee list from Bevy RSVP to verify your participation.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">Steps to Claim:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Make sure you registered and RSVP'd for the event on our <a href="https://gdg.community.dev/gdg-bacolod/" target="_blank" rel="noreferrer" className="text-google-blue hover:underline font-semibold">Bevy event page</a></li>
                <li>Go to the <Link to="/certificates" className="text-google-blue hover:underline font-semibold">Certificates page</Link></li>
                <li>Select the event you attended from the dropdown</li>
                <li>Enter your <strong>full name exactly as it appears</strong> in your Bevy RSVP</li>
                <li>Click "Find My Certificate"</li>
                <li>Download your certificate as PNG or PDF</li>
              </ol>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 md:p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm md:text-base">
                <strong className="text-slate-900 dark:text-white">Note:</strong> If you can't find your certificate, please verify that:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm md:text-base">
                <li>You completed the RSVP on Bevy</li>
                <li>Your name matches exactly (including capitalization and spacing)</li>
                <li>The event has been configured for certificates by the admin</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Link
                to="/certificates"
                onClick={() => setShowInstructions(false)}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-google-blue text-white px-6 py-3 text-sm font-semibold hover:bg-blue-600 transition-colors duration-150"
              >
                Go to Certificates
              </Link>
              <button
                onClick={() => setShowInstructions(false)}
                className="px-6 py-3 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default CertificateShowcase;
