import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Certificate, CertificateTemplate } from '../types';
import { ArrowDownToLine, Loader2, Share2 } from 'lucide-react';
import ShareModal from './ShareModal';
import ShareCard from './ShareCard';

interface PublicCertificateRendererProps {
  certificate: Certificate;
  template: CertificateTemplate;
}

const PublicCertificateRenderer: React.FC<PublicCertificateRendererProps> = ({ certificate, template }) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const shareCardRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState<'pdf' | 'png' | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const formattedDate = new Date(certificate.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const downloadPdf = async () => {
    if (!previewRef.current) return;
    setDownloading('pdf');
    try {
      const canvas = await html2canvas(previewRef.current, { 
        useCORS: true, 
        scale: 3,
        onclone: (clonedDoc) => {
           const element = clonedDoc.querySelector('[data-html2canvas-ignore]') as HTMLElement;
           if (element) element.style.display = 'none';
        }
      });
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
      const canvas = await html2canvas(previewRef.current, { 
        useCORS: true, 
        scale: 3,
        backgroundColor: null, // Transparent background
      });
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
    if (!shareCardRef.current) {
      setShareStatus('Error: Share card element not found.');
      return;
    }
    setSharing(true);
    setShareStatus(null);

    try {
      const cardElement = shareCardRef.current;
      
      // Make element temporarily visible for html2canvas (but keep it off-screen)
      const originalStyle = {
        position: cardElement.style.position,
        left: cardElement.style.left,
        top: cardElement.style.top,
        opacity: cardElement.style.opacity,
        visibility: cardElement.style.visibility,
        zIndex: cardElement.style.zIndex,
      };
      
      // Position it off-screen but visible to html2canvas
      cardElement.style.position = 'fixed';
      cardElement.style.left = '0';
      cardElement.style.top = '0';
      cardElement.style.opacity = '1';
      cardElement.style.visibility = 'visible';
      cardElement.style.zIndex = '9999';
      
      // Wait for images to load
      const img = cardElement.querySelector('img') as HTMLImageElement;
      if (img) {
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('Image load timeout'));
            }, 10000);
            
            img.onload = () => {
              clearTimeout(timeout);
              resolve(null);
            };
            img.onerror = () => {
              clearTimeout(timeout);
              reject(new Error('Image failed to load'));
            };
            
            // Force reload if already loaded but broken
            if (img.complete && img.naturalWidth === 0) {
              const src = img.src;
              img.src = '';
              img.src = src;
            }
          });
        }
        // Additional wait for rendering
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Force a reflow
      cardElement.offsetHeight;
      
      // Convert computed styles to avoid oklab/oklch color issues
      const computedStyles = window.getComputedStyle(cardElement);
      const bgColor = computedStyles.backgroundColor || '#4285F4';
      
      // Convert all computed styles to safe colors before html2canvas
      const convertToSafeColors = (element: HTMLElement) => {
        const computed = window.getComputedStyle(element);
        const styles = element.style;
        
        // Convert background color
        if (computed.backgroundColor && (computed.backgroundColor.includes('oklab') || computed.backgroundColor.includes('oklch'))) {
          styles.backgroundColor = '#4285F4';
        }
        
        // Convert color
        if (computed.color && (computed.color.includes('oklab') || computed.color.includes('oklch'))) {
          const textColor = computed.color.includes('white') || computed.color.includes('255') ? '#ffffff' : '#000000';
          styles.color = textColor;
        }
        
        // Convert border color
        if (computed.borderColor && (computed.borderColor.includes('oklab') || computed.borderColor.includes('oklch'))) {
          styles.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
        
        // Recursively process children
        Array.from(element.children).forEach(child => {
          convertToSafeColors(child as HTMLElement);
        });
      };
      
      convertToSafeColors(cardElement);
      
      const canvas = await html2canvas(cardElement, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#4285F4',
        logging: false,
        allowTaint: false,
        width: 1080,
        height: 1350,
        windowWidth: 1080,
        windowHeight: 1350,
        onclone: (clonedDoc, element) => {
          // Force convert all colors in cloned document
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computed = window.getComputedStyle(htmlEl);
            
            // Replace any oklab/oklch colors with hex
            if (computed.backgroundColor && (computed.backgroundColor.includes('oklab') || computed.backgroundColor.includes('oklch'))) {
              htmlEl.style.backgroundColor = '#4285F4';
            }
            if (computed.color && (computed.color.includes('oklab') || computed.color.includes('oklch'))) {
              htmlEl.style.color = computed.color.includes('255') || computed.color.includes('white') ? '#ffffff' : '#000000';
            }
            if (computed.borderColor && (computed.borderColor.includes('oklab') || computed.borderColor.includes('oklch'))) {
              htmlEl.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
          });
        },
      });
      
      // Restore original styles
      cardElement.style.position = originalStyle.position;
      cardElement.style.left = originalStyle.left;
      cardElement.style.top = originalStyle.top;
      cardElement.style.opacity = originalStyle.opacity;
      cardElement.style.visibility = originalStyle.visibility;
      cardElement.style.zIndex = originalStyle.zIndex;

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

    } catch (error: any) {
      console.error('Error generating canvas:', error);
      
      // Restore styles in case of error
      if (shareCardRef.current) {
        shareCardRef.current.style.position = '';
        shareCardRef.current.style.left = '';
        shareCardRef.current.style.top = '';
        shareCardRef.current.style.opacity = '';
        shareCardRef.current.style.visibility = '';
        shareCardRef.current.style.zIndex = '';
      }
      
      // Fallback: try using the regular certificate preview
      try {
        if (previewRef.current) {
          const canvas = await html2canvas(previewRef.current, {
            useCORS: true,
            scale: 2,
            backgroundColor: null,
            logging: false,
          });
          
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `certificate-${certificate.eventName.replace(/\s+/g, '-')}.png`;
          link.click();
          setShareStatus('Certificate downloaded! Share it manually.');
          setSharing(false);
          return;
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
      
      setShareStatus(`Error: ${error.message || 'Failed to generate image'}. Try downloading PNG instead.`);
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
        className="relative w-full max-w-5xl mx-auto aspect-[1.414/1] rounded-[20px] overflow-hidden shadow-2xl"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
      >
        <img
          src={template.templateImageUrl}
          alt={`${template.eventName} certificate template`}
          className="absolute inset-0 w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        
        <div
          className="absolute text-2xl md:text-5xl font-black tracking-tight text-center px-4"
          style={{
            ...nameStyle,
            color: template.textColor === 'white' ? '#ffffff' : '#0f172a',
            textShadow: template.textColor === 'white' 
              ? '0 2px 10px rgba(0,0,0,0.4)' 
              : '0 1px 6px rgba(255,255,255,0.9)',
          }}
        >
          {certificate.recipientName}
        </div>

        <div 
          className="absolute bottom-10 left-12 text-sm tracking-[0.3em] uppercase hidden md:block"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          {template.eventName}
        </div>

        <div 
          className="absolute bottom-8 right-12 text-xs font-mono px-3 py-1 rounded-full hidden md:block"
          style={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}
        >
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
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-google-blue text-white px-5 py-2 text-sm font-semibold shadow hover:bg-blue-600 transition-colors"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      <div className="text-center text-sm text-slate-500">
        Issued on {formattedDate}.
        {shareStatus && <span className="block mt-1 font-semibold text-google-blue">{shareStatus}</span>}
      </div>

      {/* Hidden Share Card for generating share image */}
      <div 
        ref={shareCardRef}
        className="w-[1080px] h-[1350px] pointer-events-none"
        style={{ 
          position: 'fixed',
          left: '-9999px',
          top: '0',
          opacity: '0',
          visibility: 'hidden',
          zIndex: '-1'
        }}
      >
        <ShareCard certificate={certificate} template={template} />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShareToStories={handleShare}
        onDownloadPng={downloadPng}
        certificateName={certificate.recipientName}
        eventName={certificate.eventName}
        certificateUrl={`${window.location.origin}/certificates?certId=${certificate.uniqueId}`}
      />
    </div>
  );
};

export default PublicCertificateRenderer;


