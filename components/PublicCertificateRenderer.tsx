import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Certificate, CertificateTemplate } from '../types';
import { ArrowDownToLine, Loader2, Share2 } from 'lucide-react';

interface PublicCertificateRendererProps {
  certificate: Certificate;
  template: CertificateTemplate;
}

const PublicCertificateRenderer: React.FC<PublicCertificateRendererProps> = ({ certificate, template }) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState<'pdf' | 'png' | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const formattedDate = new Date(certificate.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const downloadPdf = async () => {
    if (!previewRef.current) return;
    setDownloading('pdf');
    try {
      const canvas = await html2canvas(previewRef.current, { useCORS: true, scale: 3 });
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
      console.error(error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const downloadPng = async () => {
    if (!previewRef.current) return;
    setDownloading('png');
    try {
      const canvas = await html2canvas(previewRef.current, { useCORS: true, scale: 3 });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${certificate.recipientName}-${certificate.eventName}-certificate.png`;
      link.click();
    } catch (error) {
      console.error(error);
      alert('Failed to generate PNG. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/certificates?certId=${certificate.uniqueId}`;
      if (navigator.share) {
        await navigator.share({
          title: `${certificate.eventName} Certificate`,
          text: `Check out my certificate from ${certificate.eventName}!`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('Link copied to clipboard');
        setTimeout(() => setShareStatus(null), 4000);
      }
    } catch (error) {
      console.error(error);
      setShareStatus('Unable to share automatically. Copy the link manually.');
    }
  };

  const nameStyle = template.namePosition
    ? {
        left: `${template.namePosition.xPercent}%`,
        top: `${template.namePosition.yPercent}%`,
        transform: 'translate(-50%, -50%)',
      }
    : {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };

  const themeClasses =
    template.theme === 'devfest'
      ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
      : 'text-slate-900 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]';

  return (
    <div className="space-y-6">
      <div
        ref={previewRef}
        className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-[36px] overflow-hidden border border-white/40 shadow-2xl"
      >
        <img
          src={template.templateImageUrl}
          alt={`${template.eventName} certificate template`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

        <div
          className={`absolute text-2xl md:text-5xl font-black tracking-tight text-center px-4 ${themeClasses}`}
          style={nameStyle}
        >
          {certificate.recipientName}
        </div>

        <div className="absolute bottom-10 left-12 text-white/90 text-sm tracking-[0.3em] uppercase">
          {template.eventName}
        </div>

        <div className="absolute bottom-8 right-12 text-xs font-mono text-white/80 bg-black/40 px-3 py-1 rounded-full">
          Cert ID: {certificate.uniqueId}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-center">
        <button
          type="button"
          onClick={downloadPdf}
          disabled={downloading === 'pdf'}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-slate-900/30 hover:bg-slate-800 disabled:opacity-60"
        >
          {downloading === 'pdf' ? <Loader2 size={16} className="animate-spin" /> : <ArrowDownToLine size={16} />}
          Download PDF
        </button>
        <button
          type="button"
          onClick={downloadPng}
          disabled={downloading === 'png'}
          className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-2 text-sm font-semibold border border-slate-200 shadow hover:bg-slate-50 disabled:opacity-60"
        >
          {downloading === 'png' ? <Loader2 size={16} className="animate-spin" /> : <ArrowDownToLine size={16} />}
          Download PNG
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full bg-google-blue text-white px-5 py-2 text-sm font-semibold shadow hover:bg-blue-600"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      <div className="text-center text-sm text-slate-500">
        Issued on {formattedDate}. Save the PNG and post it to Instagram or Facebook Stories!
        {shareStatus && <span className="ml-2 font-semibold text-slate-700">{shareStatus}</span>}
      </div>
    </div>
  );
};

export default PublicCertificateRenderer;


