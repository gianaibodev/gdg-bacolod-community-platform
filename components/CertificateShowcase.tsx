import React from 'react';

const CertificateShowcase: React.FC = () => {
  return (
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
                <a
                  href="/certificates"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-slate-900/40 hover:bg-slate-800 transition"
                >
                  Claim your certificate
                </a>
                <a
                  href="/certificates"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/20 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition"
                >
                  View instructions
                </a>
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
  );
};

export default CertificateShowcase;
