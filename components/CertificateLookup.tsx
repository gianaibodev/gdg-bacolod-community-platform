import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Certificate, CertificateTemplate } from '../types';
import {
  getCertificateTemplates,
  getCertificateAttendeesByEvent,
  saveIssuedCertificate,
  getIssuedCertificateById,
} from '../services/mockCms';
import PublicCertificateRenderer from './PublicCertificateRenderer';
import { Loader2, Search, ShieldCheck, ArrowLeft, Moon, Sun } from 'lucide-react';

const normalizeName = (value: string) => value.trim().replace(/\s+/g, ' ').toLowerCase();

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `cert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const CertificateLookup: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [fullName, setFullName] = useState('');
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingCertificate, setLoadingCertificate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [result, setResult] = useState<{ certificate: Certificate; template: CertificateTemplate } | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Handle Dark Mode
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'true' : prefersDark;
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Redirect to share page if certId is present in query params (do this FIRST)
  useEffect(() => {
    const certId = searchParams.get('certId');
    if (certId) {
      console.log('Redirecting from query param certId:', certId);
      // Immediately redirect to the dedicated share page - use window.location for hard redirect
      window.location.href = `/certificates/share/${certId}`;
      return;
    }
  }, [searchParams]);

  useEffect(() => {
    // Only load templates if we're not redirecting
    const certId = searchParams.get('certId');
    if (certId) return; // Skip if redirecting
    
    const load = async () => {
      setLoadingTemplates(true);
      try {
        const list = await getCertificateTemplates();
        setTemplates(list);
        if (list.length) {
          setSelectedEventId(list[0].eventId);
        }
      } finally {
        setLoadingTemplates(false);
      }
    };
    load();
  }, [searchParams]);

  const handleLookup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedEventId || !fullName.trim()) {
      setStatus({ type: 'error', text: 'Please select an event and enter your full name.' });
      return;
    }

    const template = templates.find(t => t.eventId === selectedEventId);
    if (!template) {
      setStatus({ type: 'error', text: 'Selected event is not available for certificates yet.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    setResult(null);
    try {
      const attendees = await getCertificateAttendeesByEvent(template.eventId);
      const normalized = normalizeName(fullName);
      const match = attendees.find(att => normalizeName(att.fullName) === normalized);

      if (!match) {
        setStatus({
          type: 'error',
          text: `We couldn't find a certificate for "${fullName}" in ${template.eventName}. Please double-check the spelling or reach out to the organizers.`,
        });
        return;
      }

      const uniqueId = generateId();
      const certificate: Certificate = {
        id: `${template.id}-${uniqueId}`,
        uniqueId,
        eventId: template.eventId,
        eventName: template.eventName,
        recipientName: match.fullName,
        date: new Date().toISOString(),
        theme: template.theme,
      };

      await saveIssuedCertificate(certificate);
      setResult({ certificate, template });
      setStatus({
        type: 'success',
        text: `Certificate ready for ${match.fullName}. Cert ID: ${uniqueId}`,
      });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', text: 'Something went wrong while looking up your certificate.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-[#121212] min-h-screen text-slate-900 dark:text-slate-50">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-google-blue transition-colors duration-150 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-150" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Toggle dark mode"
                style={{ willChange: 'background-color' }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
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
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-google-blue mb-4">Certificates</p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Verify & Download Your Certificate
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Enter your full name and select the event you attended. We’ll verify it against the official attendee list
            and render a certificate you can download as PDF or PNG.
          </p>
        </div>

        {loadingCertificate && (
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl p-8 text-center">
            <Loader2 size={32} className="animate-spin mx-auto mb-4 text-google-blue" />
            <p className="text-slate-600 dark:text-slate-400">Loading certificate...</p>
          </div>
        )}

        {!loadingCertificate && (
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
            <form onSubmit={handleLookup} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-1">Event</label>
                <div className="relative">
                  <select
                    value={selectedEventId}
                    style={{ fontSize: '16px' }}
                    onChange={e => setSelectedEventId(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none"
                  >
                    {templates.map(template => (
                      <option key={template.id} value={template.eventId}>
                        {template.eventName}
                      </option>
                    ))}
                  </select>
                  {loadingTemplates && (
                    <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400" />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  style={{ fontSize: '16px' }}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting || !templates.length}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              Find My Certificate
            </button>
          </form>

          {status && (
            <div
              className={`rounded-2xl px-4 py-3 text-sm border ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border-green-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {status.text}
            </div>
          )}

          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-4 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <ShieldCheck className="text-google-blue" size={18} />
            <div>
              Certificates issued include a unique ID that can be verified later. Share the verification link with
              recruiters or on your profiles.
            </div>
          </div>
          </div>
        )}

        {result && (
          <div className="mt-12">
            <PublicCertificateRenderer certificate={result.certificate} template={result.template} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificateLookup;


