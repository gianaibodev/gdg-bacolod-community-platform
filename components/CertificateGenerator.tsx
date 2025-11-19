import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { Certificate } from '../types';

type Theme = 'devfest' | 'io';

const defaultCertificate: Certificate = {
  id: 'preview',
  eventName: 'DevFest Bacolod 2025',
  recipientName: 'Juan Dela Cruz',
  date: new Date().toISOString().substring(0, 10),
  theme: 'devfest',
};

const CertificateGenerator: React.FC = () => {
  const [certificate, setCertificate] = useState<Certificate>(defaultCertificate);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (field: keyof Certificate, value: string | Theme) => {
    setCertificate(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formattedDate = new Date(certificate.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownload = async () => {
    if (!previewRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`${certificate.recipientName}-${certificate.eventName}-certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Something went wrong while generating the PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const isDevFest = certificate.theme === 'devfest';

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 p-4 md:p-6">
      {/* Configuration Form */}
      <div className="w-full lg:w-1/3 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">Certificate Generator</h2>
        <p className="text-sm text-slate-500">
          Configure the certificate details and download a high quality PDF for attendees.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Event Name</label>
            <input
              type="text"
              value={certificate.eventName}
              onChange={e => handleChange('eventName', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue text-sm"
              placeholder="DevFest Bacolod 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Recipient Name</label>
            <input
              type="text"
              value={certificate.recipientName}
              onChange={e => handleChange('recipientName', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue text-sm"
              placeholder="Full name of attendee"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              value={certificate.date.substring(0, 10)}
              onChange={e => handleChange('date', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Theme</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleChange('theme', 'devfest')}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  isDevFest
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                DevFest (Dark)
              </button>
              <button
                type="button"
                onClick={() => handleChange('theme', 'io')}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  !isDevFest
                    ? 'bg-google-blue text-white border-google-blue'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                I/O Extended
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center justify-center w-full mt-4 px-4 py-3 rounded-xl bg-google-blue text-white font-semibold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {downloading ? 'Generating PDF…' : 'Download PDF'}
        </button>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-2/3 flex items-center justify-center">
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full max-w-3xl aspect-[16/9] rounded-3xl shadow-2xl border relative overflow-hidden ${
            isDevFest
              ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border-slate-700'
              : 'bg-gradient-to-br from-white via-sky-50 to-slate-50 border-slate-200'
          }`}
          style={{
            fontFamily: '"Google Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {/* Decorative orbs / grid */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-google-blue/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-10 w-64 h-64 rounded-full bg-google-yellow/20 blur-3xl" />
          </div>

          <div className="relative z-10 h-full px-10 py-8 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/90 flex items-center justify-center shadow-md">
                  <span className="text-google-blue font-black text-xl">&lt;/&gt;</span>
                </div>
                <div>
                  <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                    isDevFest ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    GDG BACOLOD
                  </p>
                  <p className={isDevFest ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>
                    Google Developer Group
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={isDevFest ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>
                  Certificate ID
                </p>
                <p className={isDevFest ? 'text-xs font-mono text-slate-300' : 'text-xs font-mono text-slate-700'}>
                  #{certificate.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <p className={`text-xs font-semibold tracking-[0.3em] uppercase mb-4 ${
                isDevFest ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Certificate of Participation
              </p>
              <p className={`mb-2 text-sm ${
                isDevFest ? 'text-slate-300' : 'text-slate-600'
              }`}>
                This certificate is proudly presented to
              </p>
              <p className={`mb-4 md:mb-6 text-2xl md:text-3xl font-black tracking-tight ${
                isDevFest ? 'text-white' : 'text-slate-900'
              }`}>
                {certificate.recipientName || 'Recipient Name'}
              </p>
              <p className={isDevFest ? 'text-sm text-slate-300 mb-1' : 'text-sm text-slate-700 mb-1'}>
                for actively participating in
              </p>
              <p className={`mb-4 md:mb-6 text-lg md:text-xl font-semibold ${
                isDevFest
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-yellow'
                  : 'text-google-blue'
              }`}>
                {certificate.eventName || 'Event Title'}
              </p>
              <p className={isDevFest ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>
                Held on <span className="font-semibold">{formattedDate || 'Event Date'}</span>
              </p>
            </div>

            {/* Footer / Signatures */}
            <div className="mt-6 flex items-end justify-between text-xs">
              <div>
                <div className={`h-px w-40 mb-1 ${
                  isDevFest ? 'bg-slate-500' : 'bg-slate-300'
                }`} />
                <p className={isDevFest ? 'font-semibold text-slate-100' : 'font-semibold text-slate-800'}>
                  GDG Bacolod Community Lead
                </p>
                <p className={isDevFest ? 'text-slate-400' : 'text-slate-500'}>
                  Official Signatory
                </p>
              </div>
              <div className="text-right">
                <p className={isDevFest ? 'text-slate-400' : 'text-slate-500'}>Powered by</p>
                <p className="font-semibold text-google-blue">Google Developer Groups</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateGenerator;


