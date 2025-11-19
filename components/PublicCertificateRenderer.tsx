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
  const [sharing, setSharing] = useState(false);

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
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;
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
    if (!previewRef.current) return;
    setSharing(true);
    setShareStatus(null);

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setShareStatus('Could not create image. Try downloading PNG instead.');
          setSharing(false);
          return;
        }

        try {
          const file = new File([blob], `certificate-${certificate.eventName.replace(/\s+/g, '-')}.png`, { 
            type: 'image/png',
            lastModified: Date.now(),
          });

          // Check if browser supports file sharing
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: `${certificate.eventName} Certificate`,
                text: `Just got my certificate for ${certificate.eventName}!`,
              });
              setShareStatus('Shared successfully!');
              setSharing(false);
              return;
            } catch (shareError: any) {
              // User cancelled or share failed
              if (shareError.name === 'AbortError') {
                setSharing(false);
                return; // User cancelled, don't show error
              }
              console.log('File share failed, trying fallback:', shareError);
              // Fall through to fallback
            }
          }

          // Fallback: Try sharing as data URL or download
          const dataUrl = canvas.toDataURL('image/png');
          if (navigator.share) {
            // Some browsers support sharing text/URL but not files
            const shareUrl = `${window.location.origin}/certificates?certId=${certificate.uniqueId}`;
            try {
              await navigator.share({
                title: `${certificate.eventName} Certificate`,
                text: `Check out my certificate! Download: ${shareUrl}`,
                url: shareUrl,
              });
              setShareStatus('Link shared! Download the PNG to post to Stories.');
            } catch (linkError: any) {
              if (linkError.name !== 'AbortError') {
                // Final fallback: download the image
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `certificate-${certificate.eventName.replace(/\s+/g, '-')}.png`;
                link.click();
                setShareStatus('Image downloaded! Open it and share to Stories manually.');
              }
            }
          } else {
            // No share API at all - just download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `certificate-${certificate.eventName.replace(/\s+/g, '-')}.png`;
            link.click();
            setShareStatus('Image downloaded! Open it and share to Stories manually.');
          }
        } catch (error) {
          console.error('Error in share process:', error);
          // Last resort: download
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `certificate-${certificate.eventName.replace(/\s+/g, '-')}.png`;
          link.click();
          setShareStatus('Downloaded! Open the image and share to Stories manually.');
        }
        
        setSharing(false);
      }, 'image/png', 0.95);

    } catch (error) {
      console.error('Error generating canvas:', error);
      setShareStatus('Error generating image. Try downloading PNG instead.');
      setSharing(false);
    }
  };

  const nameStyle = template.namePosition
    ? {
        left: `${template.namePosition.x}%`,
        top: `${template.namePosition.y}%`,
        transform: 'translate(-50%, -50%)',
      }
    : {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
  
  const textColorClass = template.textColor === 'white' 
     ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]' 
     : 'text-slate-900 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]';

  // Fallback for old templates without textColor
  const legacyThemeClass = template.theme === 'devfest'
      ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
      : 'text-slate-900 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]';

  const finalClassName = template.textColor ? textColorClass : legacyThemeClass;

  return (
    <div className="space-y-6">
      <div
        ref={previewRef}
        className="relative w-full max-w-5xl mx-auto aspect-[1.414/1] rounded-[20px] overflow-hidden border border-white/40 shadow-2xl"
      >
        <img
          src={template.templateImageUrl}
          alt={`${template.eventName} certificate template`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div
          className={`absolute text-2xl md:text-5xl font-black tracking-tight text-center px-4 ${finalClassName}`}
          style={nameStyle}
        >
          {certificate.recipientName}
        </div>

        <div className="absolute bottom-10 left-12 text-white/90 text-sm tracking-[0.3em] uppercase hidden md:block">
          {template.eventName}
        </div>

        <div className="absolute bottom-8 right-12 text-xs font-mono text-white/80 bg-black/40 px-3 py-1 rounded-full hidden md:block">
          ID: {certificate.uniqueId}
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
          PDF
        </button>
        <button
          type="button"
          onClick={downloadPng}
          disabled={downloading === 'png'}
          className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-2 text-sm font-semibold border border-slate-200 shadow hover:bg-slate-50 disabled:opacity-60"
        >
          {downloading === 'png' ? <Loader2 size={16} className="animate-spin" /> : <ArrowDownToLine size={16} />}
          PNG
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={sharing}
          className="inline-flex items-center gap-2 rounded-full bg-google-blue text-white px-5 py-2 text-sm font-semibold shadow hover:bg-blue-600 disabled:opacity-70"
        >
          {sharing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
          Share to Stories
        </button>
      </div>

      <div className="text-center text-sm text-slate-500">
        Issued on {formattedDate}.
        {shareStatus && <span className="block mt-1 font-semibold text-google-blue">{shareStatus}</span>}
      </div>
    </div>
  );
};

export default PublicCertificateRenderer;


