import React, { useEffect, useState } from 'react';
import { X, Instagram, Facebook, Twitter, Link2, Download, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareToStories: () => void;
  onDownloadPng: () => void;
  certificateName: string;
  eventName: string;
  certificateUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShareToStories,
  onDownloadPng,
  certificateName,
  eventName,
  certificateUrl,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(certificateUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleInstagramShare = async () => {
    try {
      await onShareToStories();
      onClose();
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const shareOptions = [
    {
      icon: Instagram,
      label: 'Stories',
      action: handleInstagramShare,
      gradient: 'from-purple-500 via-pink-500 to-orange-500',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(certificateUrl)}`, '_blank'),
      gradient: 'from-blue-600 to-blue-700',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just got my certificate for ${eventName}!`)}&url=${encodeURIComponent(certificateUrl)}`, '_blank'),
      gradient: 'from-sky-400 to-sky-500',
    },
    {
      icon: Download,
      label: 'Download',
      action: onDownloadPng,
      gradient: 'from-slate-600 to-slate-700',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Share Certificate</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {certificateName} • {eventName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Share Options Grid */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                {shareOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={option.action}
                      className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${option.gradient} hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity`} />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon size={24} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-white">{option.label}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Copy Link Section */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Share Link
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 truncate font-mono">
                      {certificateUrl}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;

