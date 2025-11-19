import React, { useState, useEffect } from 'react';
import { Event, TeamMember, Partner } from '../types';
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
} from 'lucide-react';
import CertificateGenerator from './CertificateGenerator';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'events' | 'team' | 'partners' | 'certificates'>('events');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-8 md:mb-10">
             <div className="w-14 h-14 md:w-16 md:h-16 bg-google-blue/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <LayoutDashboard className="text-google-blue" size={28} />
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Admin Portal</h2>
             <p className="text-sm md:text-base text-slate-500">Welcome back! Please sign in to continue.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all"
                placeholder="Enter access key"
              />
            </div>
            <button type="submit" className="w-full bg-google-blue text-white py-3 md:py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02]">
              Access Dashboard
            </button>
            <div className="text-center">
                <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Hint: gdgbacolod</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
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
        w-72 bg-white border-r border-slate-200 flex flex-col h-full z-40 md:z-20 shadow-lg md:shadow-sm
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100 md:border-none">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-slate-900">
             <div className="w-9 h-9 md:w-10 md:h-10 bg-google-blue rounded-lg flex items-center justify-center text-white">
                <LayoutDashboard size={18} />
             </div>
             <span className="hidden sm:inline">CMS</span>
          </h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
          <button 
            onClick={() => { setActiveTab('events'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'events' ? 'bg-google-blue/10 text-google-blue' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Calendar size={20} /> Events
            {activeTab === 'events' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => { setActiveTab('team'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'team' ? 'bg-google-blue/10 text-google-blue' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Users size={20} /> Team
            {activeTab === 'team' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => { setActiveTab('partners'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'partners' ? 'bg-google-blue/10 text-google-blue' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Award size={20} /> Partners
            {activeTab === 'partners' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => { setActiveTab('certificates'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${
              activeTab === 'certificates' ? 'bg-google-blue/10 text-google-blue' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FileText size={20} /> Certificates
            {activeTab === 'certificates' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 w-full min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold text-slate-900 capitalize">{activeTab} Management</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          <header className="mb-6 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize mb-2">
              {activeTab === 'certificates' ? 'Certificates' : activeTab} Management
            </h2>
            <p className="text-sm md:text-base text-slate-500 hidden md:block">
              {activeTab === 'certificates'
                ? 'Generate and download certificates for your attendees.'
                : `Manage your community ${activeTab} efficiently.`}
            </p>
          </header>

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'team' && <TeamManager />}
            {activeTab === 'partners' && <PartnersManager />}
            {activeTab === 'certificates' && <CertificateGenerator />}
          </div>
        </div>
      </main>
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
           <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-slate-100 pb-4 md:pb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">{editingId === 'new' ? 'Create New Event' : 'Edit Event'}</h3>
              <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <X size={20} />
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 mb-2">Event Title</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. DevFest 2025" />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g., November 16, 2024" />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} placeholder="e.g. 1:00 PM - 5:00 PM" />
             </div>
             
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 mb-2">Venue</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.venue || ''} onChange={e => setFormData({...formData, venue: e.target.value})} placeholder="Event Location" />
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
               <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                  <option value="Social">Social</option>
                  <option value="Talk">Talk</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
               <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all bg-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
               </select>
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
               <div className="flex flex-col md:flex-row gap-4 items-start">
                   <div className="flex-grow w-full">
                       <input 
                         className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" 
                         value={formData.imageUrl || ''} 
                         onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                         placeholder="https://..."
                       />
                       <p className="text-xs text-slate-400 mt-2">Paste a direct link to an image</p>
                   </div>
                   {formData.imageUrl && (
                     <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative group">
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
               <label className="block text-sm font-bold text-slate-700 mb-2">Registration Link</label>
               <input className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all" value={formData.registrationLink || ''} onChange={e => setFormData({...formData, registrationLink: e.target.value})} placeholder="https://..." />
             </div>
             
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
               <textarea className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue outline-none transition-all h-32 resize-none" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Event details..." />
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 md:mt-8 pt-6 border-t border-slate-100">
              <button onClick={() => setEditingId(null)} className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors order-2 sm:order-1">Cancel</button>
              <button onClick={handleSave} className="px-6 py-3 bg-google-blue text-white rounded-xl hover:bg-blue-600 flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 order-1 sm:order-2"><Save size={18} /> Save Event</button>
           </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search events..." className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-google-blue/30 focus:ring-2 focus:ring-google-blue/20 transition-all outline-none text-sm md:text-base" />
             </div>
             <button onClick={handleNew} className="flex items-center justify-center gap-2 bg-google-blue text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 text-sm md:text-base">
               <Plus size={18} /> <span className="hidden sm:inline">Create</span> Event
             </button>
          </div>
          
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-3 md:p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Event</th>
                    <th className="p-3 md:p-5 font-bold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="p-3 md:p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="p-3 md:p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-3 md:p-5">
                         <div className="flex items-center gap-3 md:gap-4">
                             {event.imageUrl && (
                               <img src={event.imageUrl} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                             )}
                             <div className="min-w-0">
                                 <div className="font-bold text-slate-900 text-sm md:text-lg truncate">{event.title}</div>
                                 <div className="text-xs md:text-sm text-slate-500 mt-0.5">{event.date}</div>
                                 <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block mt-1">{event.category}</div>
                             </div>
                         </div>
                      </td>
                      <td className="p-3 md:p-5 text-slate-600 font-medium hidden md:table-cell">{event.date}</td>
                      <td className="p-3 md:p-5">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="p-3 md:p-5 text-right">
                         <div className="flex justify-end gap-1 md:gap-2">
                           <button onClick={() => handleEdit(event)} className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                           <button onClick={() => handleDelete(event.id)} className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
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

export default AdminDashboard;
