import React, { useState, useEffect } from 'react';
import { Event, TeamMember, Partner, CertificateTemplate, CertificateAttendee } from '../types';
import * as CMS from '../services/mockCms';
import {
  Trash2,
  Edit,
  Plus,
  Save,
  LogOut,
  LayoutDashboard,
  Users,
  Calendar,
  X,
  Search,
  ChevronRight,
  Menu,
  Award,
  FileText,
  UploadCloud,
  Loader2,
  ImageIcon,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Moon,
  Sun,
} from 'lucide-react';
import CertificateGenerator from './CertificateGenerator';
import {
  getCertificateTemplates,
  saveCertificateTemplate,
  deleteCertificateTemplate,
  bulkSaveCertificateAttendees,
} from '../services/mockCms';

const AdminNavBar: React.FC<{ darkMode: boolean; toggleTheme: () => void }> = ({ darkMode, toggleTheme }) => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    // Check localStorage or system preference
    const saved = localStorage.getItem('adminDarkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'true' : prefersDark;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <header className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/70 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-google-blue via-google-red to-google-yellow text-white font-black flex items-center justify-center shadow-lg shadow-blue-500/30">
            &lt;/&gt;
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-[0.3em] uppercase">GDG Bacolod</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Admin Portal</p>
          </div>
        </a>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-150 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition duration-150"
          >
            Back to site
          </a>
        </div>
      </div>
    </header>
  );
};

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'events' | 'team' | 'partners' | 'certificates'>('events');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Handle Dark Mode
  useEffect(() => {
    const saved = localStorage.getItem('adminDarkMode');
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
    localStorage.setItem('adminDarkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'gdgbacolod') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Try: gdgbacolod');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] flex flex-col transition-colors duration-150">
        <AdminNavBar darkMode={darkMode} toggleTheme={toggleTheme} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900/70 p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-xl w-full max-w-md border border-slate-100 dark:border-white/10 transition-colors duration-150">
          <div className="text-center mb-8 md:mb-10">
             <div className="w-14 h-14 md:w-16 md:h-16 bg-google-blue/10 dark:bg-google-blue/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <LayoutDashboard className="text-google-blue dark:text-google-blue" size={28} />
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h2>
             <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">Welcome back! Please sign in to continue.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150"
                placeholder="Enter access key"
              />
            </div>
            <button type="submit" className="w-full bg-google-blue text-white py-3 md:py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all duration-150 shadow-lg shadow-blue-500/30 hover:scale-[1.02]">
              Access Dashboard
            </button>
            <div className="text-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Hint: gdgbacolod</span>
            </div>
          </form>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] flex flex-col font-sans text-slate-900 dark:text-slate-200 transition-colors duration-150">
      <AdminNavBar darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="flex flex-1">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static
        w-72 bg-white dark:bg-slate-900/70 border-r border-slate-200 dark:border-white/10 flex flex-col h-full z-40 md:z-20 shadow-lg md:shadow-sm
        transform transition-all duration-150 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/10 md:border-none">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
             <div className="w-9 h-9 md:w-10 md:h-10 bg-google-blue rounded-lg flex items-center justify-center text-white">
                <LayoutDashboard size={18} />
             </div>
             <span className="hidden sm:inline">CMS</span>
          </h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 transition-colors duration-150"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">Menu</p>
          <button 
            onClick={() => { setActiveTab('events'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 font-medium ${activeTab === 'events' ? 'bg-google-blue/10 dark:bg-google-blue/20 text-google-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Calendar size={20} /> Events
            {activeTab === 'events' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => { setActiveTab('team'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 font-medium ${activeTab === 'team' ? 'bg-google-blue/10 dark:bg-google-blue/20 text-google-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Users size={20} /> Team
            {activeTab === 'team' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => { setActiveTab('partners'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 font-medium ${activeTab === 'partners' ? 'bg-google-blue/10 dark:bg-google-blue/20 text-google-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Award size={20} /> Partners
            {activeTab === 'partners' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => { setActiveTab('certificates'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 font-medium ${
              activeTab === 'certificates' ? 'bg-google-blue/10 dark:bg-google-blue/20 text-google-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText size={20} /> Certificates
            {activeTab === 'certificates' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-white/10">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 font-medium"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-20 bg-white dark:bg-slate-900/70 border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between transition-colors duration-150">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 transition-colors duration-150"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{activeTab} Management</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <header className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white capitalize mb-2">
              {activeTab === 'certificates' ? 'Certificates' : activeTab} Management
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 hidden md:block">
              {activeTab === 'certificates'
                ? 'Generate and download certificates for your attendees.'
                : `Manage your community ${activeTab} efficiently.`}
            </p>
          </header>

          <div className="bg-white dark:bg-slate-900/70 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden min-h-[400px] transition-colors duration-150">
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'team' && <TeamManager />}
            {activeTab === 'partners' && <PartnersManager />}
            {activeTab === 'certificates' && <CertificatesManager />}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

// --- EVENTS MANAGER SUB-COMPONENT ---
const EventsManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});

  const fetchEvents = async () => {
    const data = await CMS.getAllEvents();
    setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData(event);
  };

  const handleNew = () => {
    setEditingId('new');
    setFormData({
      id: Date.now().toString(),
      title: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      registrationLink: '',
      imageUrl: '',
      category: 'Social',
      status: 'upcoming'
    });
  };

  const handleSave = async () => {
    if (formData.id && formData.title) {
      await CMS.saveEvent(formData as Event);
      setEditingId(null);
      fetchEvents();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await CMS.deleteEvent(id);
      fetchEvents();
    }
  };

  return (
    <div className="p-4 md:p-6">
      {editingId ? (
        <div className="max-w-4xl mx-auto">
           <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-slate-100 dark:border-white/10 pb-4 md:pb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{editingId === 'new' ? 'Create New Event' : 'Edit Event'}</h3>
              <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full text-slate-600 dark:text-slate-300 transition-colors duration-150">
                  <X size={20} />
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Event Title</label>
               <input className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. DevFest 2025" />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Date</label>
               <input className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g., November 16, 2024" />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Time</label>
               <input className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} placeholder="e.g. 1:00 PM - 5:00 PM" />
             </div>
             
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Venue</label>
               <input className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.venue || ''} onChange={e => setFormData({...formData, venue: e.target.value})} placeholder="Event Location" />
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Category</label>
               <select className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                  <option value="Social">Social</option>
                  <option value="Talk">Talk</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Status</label>
               <select className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
               </select>
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Image URL</label>
               <div className="flex flex-col md:flex-row gap-4 items-start">
                   <div className="flex-grow w-full">
                       <input 
                         className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" 
                         value={formData.imageUrl || ''} 
                         onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                         placeholder="https://..."
                       />
                       <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Paste a direct link to an image</p>
                   </div>
                   {formData.imageUrl && (
                     <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex-shrink-0 relative group">
                       <img 
                         src={formData.imageUrl} 
                         alt="Preview" 
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           (e.target as HTMLImageElement).style.display = 'none';
                         }}
                       />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Preview</div>
                     </div>
                   )}
               </div>
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Registration Link</label>
               <input className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150" value={formData.registrationLink || ''} onChange={e => setFormData({...formData, registrationLink: e.target.value})} placeholder="https://..." />
             </div>
             
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Description</label>
               <textarea className="w-full p-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all duration-150 h-32 resize-none" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Event details..." />
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 md:mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
              <button onClick={() => setEditingId(null)} className="px-6 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl font-bold transition-colors duration-150 order-2 sm:order-1">Cancel</button>
              <button onClick={handleSave} className="px-6 py-3 bg-google-blue text-white rounded-xl hover:bg-blue-600 flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all duration-150 hover:scale-105 order-1 sm:order-2"><Save size={18} /> Save Event</button>
           </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input type="text" placeholder="Search events..." className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-800 border-transparent dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-google-blue/30 focus:ring-2 focus:ring-google-blue/20 transition-all duration-150 outline-none text-slate-900 dark:text-white text-sm md:text-base" />
             </div>
             <button onClick={handleNew} className="flex items-center justify-center gap-2 bg-google-blue text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:bg-blue-600 transition-all duration-150 shadow-lg shadow-blue-500/20 hover:scale-105 text-sm md:text-base">
               <Plus size={18} /> <span className="hidden sm:inline">Create</span> Event
             </button>
          </div>
          
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 dark:bg-slate-800/50">
                  <tr>
                    <th className="p-3 md:p-5 font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Event</th>
                    <th className="p-3 md:p-5 font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="p-3 md:p-5 font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">Status</th>
                    <th className="p-3 md:p-5 font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors duration-150 group">
                      <td className="p-3 md:p-5">
                         <div className="flex items-center gap-3 md:gap-4">
                             {event.imageUrl && (
                               <img src={event.imageUrl} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                             )}
                             <div className="min-w-0">
                                 <div className="font-bold text-slate-900 dark:text-white text-sm md:text-lg truncate">{event.title}</div>
                                 <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">{event.date}</div>
                                 <div className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block mt-1">{event.category}</div>
                             </div>
                         </div>
                      </td>
                      <td className="p-3 md:p-5 text-slate-600 dark:text-slate-300 font-medium hidden md:table-cell">{event.date}</td>
                      <td className="p-3 md:p-5">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${event.status === 'upcoming' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="p-3 md:p-5 text-right">
                         <div className="flex justify-end gap-1 md:gap-2">
                           <button onClick={() => handleEdit(event)} className="p-1.5 md:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"><Edit size={16} /></button>
                           <button onClick={() => handleDelete(event.id)} className="p-1.5 md:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"><Trash2 size={16} /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- TEAM MANAGER SUB-COMPONENT ---
const TeamManager: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});

  const fetchTeam = async () => {
    const data = await CMS.getTeamMembers();
    setTeam(data);
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData(member);
  };

  const handleNew = () => {
    setEditingId('new');
    setFormData({ id: Date.now().toString(), name: '', role: '', photoUrl: '' });
  };

  const handleSave = async () => {
    if (formData.id && formData.name) {
      await CMS.saveTeamMember(formData as TeamMember);
      setEditingId(null);
      fetchTeam();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remove this member?')) {
      await CMS.deleteTeamMember(id);
      fetchTeam();
    }
  };

  return (
    <div className="p-4 md:p-6">
      {editingId ? (
        <div className="max-w-2xl mx-auto">
           <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-slate-100 pb-4 md:pb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">{editingId === 'new' ? 'Add Team Member' : 'Edit Member'}</h3>
              <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <X size={20} />
              </button>
           </div>
           
           <div className="space-y-4 md:space-y-6">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Role / Position</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Lead Organizer" />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Photo URL</label>
               <div className="flex flex-col sm:flex-row gap-4">
                   <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.photoUrl || ''} onChange={e => setFormData({...formData, photoUrl: e.target.value})} placeholder="https://..." />
                   {formData.photoUrl && (
                      <div className="w-16 h-16 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                          <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                   )}
               </div>
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 md:mt-8 pt-6 border-t border-slate-100">
              <button onClick={() => setEditingId(null)} className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors order-2 sm:order-1">Cancel</button>
              <button onClick={handleSave} className="px-6 py-3 bg-google-blue text-white rounded-xl hover:bg-blue-600 flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 order-1 sm:order-2"><Save size={18} /> Save Member</button>
           </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4 md:mb-6">
             <button onClick={handleNew} className="flex items-center justify-center gap-2 bg-google-blue text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 text-sm md:text-base">
               <Plus size={18} /> <span className="hidden sm:inline">Add</span> Member
             </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {team.map(member => (
              <div key={member.id} className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 mb-3 md:mb-4">
                     <img src={member.photoUrl} alt={member.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover bg-slate-100 border-2 border-white shadow-sm flex-shrink-0" />
                     <div className="text-center sm:text-left flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm md:text-lg leading-tight truncate">{member.name}</h4>
                        <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5 line-clamp-2">{member.role}</p>
                     </div>
                 </div>
                 <div className="flex gap-2 pt-3 md:pt-4 border-t border-slate-50">
                    <button onClick={() => handleEdit(member)} className="flex-1 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs md:text-sm font-bold transition-colors">Edit</button>
                    <button onClick={() => handleDelete(member.id)} className="flex-1 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs md:text-sm font-bold transition-colors">Remove</button>
                 </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- PARTNERS MANAGER SUB-COMPONENT ---
const PartnersManager: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({});

  const fetchPartners = async () => {
    const data = await CMS.getPartners();
    setPartners(data);
  };

  useEffect(() => { fetchPartners(); }, []);

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData(partner);
  };

  const handleNew = () => {
    setEditingId('new');
    setFormData({ 
      id: Date.now().toString(), 
      name: '', 
      logoUrl: '', 
      websiteUrl: '', 
      tier: 'Community' 
    });
  };

  const handleSave = async () => {
    if (formData.id && formData.name && formData.logoUrl) {
      await CMS.savePartner(formData as Partner);
      setEditingId(null);
      fetchPartners();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remove this partner?')) {
      await CMS.deletePartner(id);
      fetchPartners();
    }
  };

  return (
    <div className="p-4 md:p-6">
      {editingId ? (
        <div className="max-w-2xl mx-auto">
           <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-slate-100 pb-4 md:pb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">{editingId === 'new' ? 'Add Partner' : 'Edit Partner'}</h3>
              <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <X size={20} />
              </button>
           </div>
           
           <div className="space-y-4 md:space-y-6">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Partner Name</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Google" />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Tier</label>
               <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all bg-white" value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value as any})}>
                  <option value="Platinum">Platinum</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Community">Community</option>
               </select>
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Logo URL</label>
               <div className="flex flex-col sm:flex-row gap-4 items-start">
                   <div className="flex-grow w-full">
                       <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.logoUrl || ''} onChange={e => setFormData({...formData, logoUrl: e.target.value})} placeholder="https://..." />
                       <p className="text-xs text-slate-400 mt-2">Direct link to logo image</p>
                   </div>
                   {formData.logoUrl && (
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative group flex items-center justify-center">
                          <img src={formData.logoUrl} alt="Preview" className="max-w-full max-h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Preview</div>
                      </div>
                   )}
               </div>
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Website URL</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.websiteUrl || ''} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} placeholder="https://..." />
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 md:mt-8 pt-6 border-t border-slate-100">
              <button onClick={() => setEditingId(null)} className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors order-2 sm:order-1">Cancel</button>
              <button onClick={handleSave} className="px-6 py-3 bg-google-blue text-white rounded-xl hover:bg-blue-600 flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 order-1 sm:order-2"><Save size={18} /> Save Partner</button>
           </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4 md:mb-6">
             <button onClick={handleNew} className="flex items-center justify-center gap-2 bg-google-blue text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 text-sm md:text-base">
               <Plus size={18} /> <span className="hidden sm:inline">Add</span> Partner
             </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {partners.map(partner => (
              <div key={partner.id} className="bg-white p-5 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                 <div className="flex flex-col items-center text-center mb-4">
                     {partner.logoUrl && (
                       <div className="w-24 h-24 mb-4 flex items-center justify-center bg-slate-50 rounded-xl p-4">
                         <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                       </div>
                     )}
                     <h4 className="font-bold text-slate-900 text-lg mb-1">{partner.name}</h4>
                     <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                       partner.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                       partner.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                       partner.tier === 'Silver' ? 'bg-slate-100 text-slate-700' :
                       'bg-blue-100 text-blue-700'
                     }`}>
                       {partner.tier}
                     </span>
                 </div>
                 <div className="flex gap-2 pt-4 border-t border-slate-50">
                    <button onClick={() => handleEdit(partner)} className="flex-1 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-bold transition-colors">Edit</button>
                    <button onClick={() => handleDelete(partner.id)} className="flex-1 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-bold transition-colors">Remove</button>
                 </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const createEmptyTemplate = (): CertificateTemplate => ({
  id: generateId(),
  eventId: '',
  eventName: '',
  templateImageUrl: '',
  theme: 'devfest',
  textColor: 'black',
  namePosition: { x: 50, y: 50 },
});

const CertificatesManager: React.FC = () => {
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formState, setFormState] = useState<CertificateTemplate>(createEmptyTemplate());
  const [loading, setLoading] = useState(true);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [deletingTemplate, setDeletingTemplate] = useState(false);
  const [uploadingCsv, setUploadingCsv] = useState(false);
  const [csvPreview, setCsvPreview] = useState<CertificateAttendee[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [csvMessage, setCsvMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const list = await getCertificateTemplates();
      setTemplates(list);
      if (list.length && (!selectedId || !list.find(t => t.id === selectedId))) {
        setSelectedId(list[0].id);
        setFormState(list[0]);
      } else if (!list.length) {
        setSelectedId(null);
        setFormState(createEmptyTemplate());
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to load templates.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: CertificateTemplate) => {
    setSelectedId(template.id);
    setFormState(template);
    setCsvPreview([]);
    setCsvMessage(null);
  };

  const handleCreateTemplate = () => {
    const fresh = createEmptyTemplate();
    setSelectedId(fresh.id);
    setFormState(fresh);
    setCsvPreview([]);
    setCsvMessage(null);
  };

  const handleTemplateChange = (field: keyof CertificateTemplate, value: string | number | object) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveTemplate = async () => {
    if (!formState.eventId.trim() || !formState.eventName.trim() || !formState.templateImageUrl.trim()) {
      setMessage({ type: 'error', text: 'Event ID, Event Name, and Template URL are required.' });
      return;
    }

    setSavingTemplate(true);
    try {
      await saveCertificateTemplate({
        ...formState,
        id: formState.id || generateId(),
      });
      setMessage({ type: 'success', text: 'Template saved successfully.' });
      await loadTemplates();
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to save template.' });
    } finally {
      setSavingTemplate(false);
    }
  };

  const handleDeleteTemplate = async () => {
    if (!selectedId) return;
    if (!confirm('Delete this certificate template?')) return;
    setDeletingTemplate(true);
    try {
      await deleteCertificateTemplate(selectedId);
      setMessage({ type: 'success', text: 'Template deleted.' });
      await loadTemplates();
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to delete template.' });
    } finally {
      setDeletingTemplate(false);
    }
  };

  const parseCsvLine = (line: string) => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  };

  const handleCsvUpload = async (file: File) => {
    if (!selectedId) {
      setCsvMessage({ type: 'error', text: 'Select or create a template first.' });
      return;
    }
    if (!formState.eventId.trim()) {
      setCsvMessage({ type: 'error', text: 'Enter an Event ID before uploading attendees.' });
      return;
    }
    setUploadingCsv(true);
    setCsvMessage(null);
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(line => line.trim().length);
      if (!lines.length) {
        setCsvMessage({ type: 'error', text: 'CSV appears to be empty.' });
        return;
      }
      const header = parseCsvLine(lines[0]).map(h => h.toLowerCase());
      const nameIndex = header.indexOf('full_name');
      if (nameIndex === -1) {
        setCsvMessage({ type: 'error', text: 'CSV must include a full_name column.' });
        return;
      }

      const attendees: CertificateAttendee[] = [];

      lines.slice(1).forEach((line, idx) => {
        const cols = parseCsvLine(line);
        const fullName = cols[nameIndex]?.replace(/^"|"$/g, '').trim();
        if (fullName) {
          attendees.push({
            id: `${formState.eventId}-${Date.now()}-${idx}`,
            eventId: formState.eventId,
            fullName,
          });
        }
      });

      if (!attendees.length) {
        setCsvMessage({ type: 'error', text: 'No attendee rows found after parsing.' });
        return;
      }

      await bulkSaveCertificateAttendees(formState.eventId, attendees);
      setCsvMessage({ type: 'success', text: `${attendees.length} attendees uploaded successfully.` });
      setCsvPreview(attendees.slice(0, 5));
    } catch (error) {
      console.error(error);
      setCsvMessage({ type: 'error', text: 'Failed to process CSV upload.' });
    } finally {
      setUploadingCsv(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Templates
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Select an event</p>
            </div>
            <button
              type="button"
              onClick={handleCreateTemplate}
              className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-white/10 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Plus size={14} />
              New
            </button>
          </div>

          {loading ? (
            <div className="py-10 text-center text-slate-500 text-sm">Loading templates…</div>
          ) : (
            <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
              {templates.length === 0 && (
                <p className="text-xs text-slate-500">
                  No templates yet. Create one to get started.
                </p>
              )}
              {templates.map(template => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className={`w-full text-left px-3 py-2 rounded-xl border text-sm transition ${
                    selectedId === template.id
                      ? 'border-google-blue bg-google-blue/5 text-google-blue font-semibold'
                      : 'border-slate-200 hover:border-google-blue/40'
                  }`}
                >
                  <p className="font-semibold">{template.eventName}</p>
                  <p className="text-[0.7rem] uppercase tracking-wide text-slate-500">{template.eventId}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Template details</h3>
              <p className="text-sm text-slate-500">Manage the certificate design per event.</p>
            </div>
            {selectedId && templates.some(t => t.id === selectedId) && (
              <button
                type="button"
                onClick={handleDeleteTemplate}
                disabled={deletingTemplate}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-500 disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </div>

          {message && (
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event ID (slug)</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none"
                placeholder="devfest-2024"
                value={formState.eventId}
                onChange={e => handleTemplateChange('eventId', e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">Used for matching attendee CSV uploads.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event Name</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none"
                placeholder="DevFest Bacolod 2024"
                value={formState.eventName}
                onChange={e => handleTemplateChange('eventName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Template PNG URL</label>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 outline-none"
                  placeholder="https://…/certificate.png"
                  value={formState.templateImageUrl}
                  onChange={e => handleTemplateChange('templateImageUrl', e.target.value)}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">We will overlay participant names on this image.</p>
            </div>
          </div>

          <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Text Color & Position</label>
              <div className="flex flex-wrap gap-4 items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleTemplateChange('textColor', 'black' as any)}
                    className={`w-8 h-8 rounded-full border-2 ${formState.textColor === 'black' ? 'border-google-blue ring-2 ring-google-blue/20' : 'border-slate-300'}`}
                    style={{ backgroundColor: 'black' }}
                    title="Black Text"
                  />
                  <button
                    type="button"
                    onClick={() => handleTemplateChange('textColor', 'white' as any)}
                    className={`w-8 h-8 rounded-full border-2 ${formState.textColor === 'white' ? 'border-google-blue ring-2 ring-google-blue/20' : 'border-slate-300'}`}
                    style={{ backgroundColor: 'white' }}
                    title="White Text"
                  />
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex gap-4">
                   <div>
                     <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1 block">X Pos (%)</label>
                     <input
                       type="number"
                       min="0"
                       max="100"
                       value={formState.namePosition?.x ?? 50}
                       onChange={e => setFormState(prev => ({ ...prev, namePosition: { ...prev.namePosition, x: Number(e.target.value), y: prev.namePosition?.y ?? 50 } }))}
                       className="w-20 px-2 py-1 rounded border border-slate-200 text-sm"
                     />
                   </div>
                   <div>
                     <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1 block">Y Pos (%)</label>
                     <input
                       type="number"
                       min="0"
                       max="100"
                       value={formState.namePosition?.y ?? 50}
                       onChange={e => setFormState(prev => ({ ...prev, namePosition: { ...prev.namePosition, y: Number(e.target.value), x: prev.namePosition?.x ?? 50 } }))}
                       className="w-20 px-2 py-1 rounded border border-slate-200 text-sm"
                     />
                   </div>
                </div>
              </div>
            </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveTemplate}
              disabled={savingTemplate}
              className="inline-flex items-center gap-2 rounded-xl bg-google-blue text-white px-4 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-600 disabled:opacity-60"
            >
              {savingTemplate && <Loader2 size={16} className="animate-spin" />}
              Save template
            </button>
            <button
              type="button"
              onClick={() => {
                setFormState(prev => ({ ...prev, templateImageUrl: '', eventName: '', eventId: '' }));
                setMessage(null);
              }}
              className="text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              Clear
            </button>
          </div>

          {formState.templateImageUrl && (
            <div className="mt-4 rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <div className="bg-slate-50 text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 flex items-center gap-2 border-b border-slate-200">
                <ImageIcon size={14} />
                Live preview with sample name
              </div>
              <div className="p-4">
                <div 
                  className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-slate-200 shadow-lg"
                  style={{
                    // A4 Landscape: 297mm x 210mm
                    aspectRatio: '297 / 210',
                  }}
                >
                  <img
                    src={formState.templateImageUrl}
                    alt="Certificate template"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className={`absolute text-2xl md:text-4xl font-black tracking-tight text-center px-4 ${
                      formState.textColor === 'white'
                        ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
                        : 'text-slate-900 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]'
                    }`}
                    style={{
                      left: `${formState.namePosition?.x ?? 50}%`,
                      top: `${formState.namePosition?.y ?? 50}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    Sample Name
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  This is how names will appear on certificates. Adjust position and color above.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-900 text-white p-2">
            <FileSpreadsheet size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload attendee CSV</h3>
            <p className="text-sm text-slate-500">
              CSV must include a <code className="font-mono">full_name</code> column. All rows apply to the selected event.
            </p>
          </div>
        </div>

        {csvMessage && (
          <div
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
              csvMessage.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-100'
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {csvMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {csvMessage.text}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <label
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold cursor-pointer hover:border-google-blue/50"
          >
            <UploadCloud size={16} />
            {uploadingCsv ? 'Uploading…' : 'Select CSV'}
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  handleCsvUpload(file);
                  e.target.value = '';
                }
              }}
            />
          </label>
          <span className="text-xs text-slate-500">
            Example row: <code>"Juan Dela Cruz"</code>
          </span>
        </div>

        {csvPreview.length > 0 && (
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold mb-2 text-slate-700">Preview (first {csvPreview.length} names)</p>
            <ul className="text-sm text-slate-600 space-y-1">
              {csvPreview.map(att => (
                <li key={att.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-google-blue inline-block" />
                  {att.fullName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-900/40 px-4 py-2 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400">
          <FileText size={14} />
          Live preview
        </div>
        <CertificateGenerator />
      </div>
    </div>
  );
};

export default AdminDashboard;
