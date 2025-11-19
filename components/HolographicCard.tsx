import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDownToLine, Share2 } from 'lucide-react';
import { Certificate } from '../types';

interface HolographicCardProps {
  certificate: Certificate;
  onDownload?: (certificate: Certificate) => void;
  onShare?: (certificate: Certificate) => void;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ certificate, onDownload, onShare }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const posX = ((e.clientX - centerX) / bounds.width) * 100;
    const posY = ((e.clientY - centerY) / bounds.height) * 100;

    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const formattedDate = new Date(certificate.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow / shadow */}
      <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-r from-google-blue/30 via-google-yellow/20 to-google-red/30 blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <motion.div
        className="group/card relative rounded-[1.5rem] overflow-hidden bg-slate-900 text-white shadow-xl border border-white/10 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(66,133,244,0.4),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(219,68,55,0.4),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(244,180,0,0.4),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(15,157,88,0.5),transparent_55%)] opacity-70 mix-blend-screen" />

        {/* Moving shine highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent mix-blend-screen"
          style={{
            x: useTransform(x, [-50, 50], [-80, 80]),
            y: useTransform(y, [-50, 50], [80, -80]),
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 p-5 md:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-300 mb-1">
                GDG Bacolod
              </p>
              <h3 className="text-lg md:text-xl font-bold truncate max-w-[14rem]">
                {certificate.eventName}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[0.65rem] text-slate-300 uppercase tracking-wide">Awarded to</p>
              <p className="text-sm md:text-base font-semibold truncate max-w-[9rem]">
                {certificate.recipientName}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <div className="flex flex-col">
              <span className="font-medium">{formattedDate}</span>
              <span className="text-[0.65rem] uppercase tracking-wide opacity-80">
                Event Date
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[0.65rem] uppercase tracking-[0.15em]">
              Certificate
            </div>
          </div>

          {/* Subtle pattern */}
          <div className="relative mt-2 rounded-2xl border border-white/10 bg-gradient-to-r from-black/40 via-slate-900/40 to-black/40 overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:6px_6px]" />
            <div className="relative px-4 py-3 text-xs text-slate-200">
              <p className="font-semibold mb-1">Certificate of Participation</p>
              <p className="text-[0.7rem] leading-relaxed opacity-90">
                This certifies that <span className="font-semibold">{certificate.recipientName}</span> has
                successfully participated in <span className="font-semibold">{certificate.eventName}</span>.
              </p>
            </div>
          </div>

          {/* Hover actions */}
          <div className="mt-2 flex items-center justify-end gap-2 opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onShare?.(certificate);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold hover:bg-white/20"
            >
              <Share2 size={12} />
              Share
            </button>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onDownload?.(certificate);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 px-3 py-1.5 text-[0.7rem] font-semibold hover:bg-slate-100"
            >
              <ArrowDownToLine size={12} />
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HolographicCard;


