
import React, { useState, useEffect } from 'react';
import { Event, TeamMember } from '../types';
import * as CMS from '../services/mockCms';
import { Trash2, Edit, Plus, Save, LogOut, LayoutDashboard, Users, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'events' | 'team'>('events');

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
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
             <h2 className="text-2xl font-bold text-slate-900">GDG Admin Portal</h2>
             <p className="text-slate-500">Please sign in to manage content.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="w-full bg-google-blue text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Access Dashboard
            </button>
            <p className="text-xs text-center text-slate-400 mt-4">Hint: gdgbacolod</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
             <LayoutDashboard className="text-google-blue" /> CMS Admin
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-google-blue text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Calendar size={20} /> Events
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'team' ? 'bg-google-blue text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users size={20} /> Team Members
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800 capitalize">{activeTab} Management</h2>
        </header>

        {activeTab === 'events' ? <EventsManager /> : <TeamManager />}
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
    <div className="space-y-6">
      {editingId ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
           <h3 className="text-xl font-bold mb-4">{editingId === 'new' ? 'Create Event' : 'Edit Event'}</h3>
           <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2">
               <label className="block text-sm font-medium mb-1">Title</label>
               <input className="w-full p-2 border rounded" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Date</label>
               <input className="w-full p-2 border rounded" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g., November 16, 2024" />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Time</label>
               <input className="w-full p-2 border rounded" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Venue</label>
               <input className="w-full p-2 border rounded" value={formData.venue || ''} onChange={e => setFormData({...formData, venue: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Category</label>
               <select className="w-full p-2 border rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                  <option value="Social">Social</option>
                  <option value="Talk">Talk</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Status</label>
               <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
               </select>
             </div>
             <div className="col-span-2">
               <label className="block text-sm font-medium mb-1">Image URL</label>
               <input 
                 className="w-full p-2 border rounded mb-2" 
                 value={formData.imageUrl || ''} 
                 onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                 placeholder="https://example.com/image.jpg"
               />
               {formData.imageUrl && (
                 <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                   <img 
                     src={formData.imageUrl} 
                     alt="Preview" 
                     className="w-full h-full object-contain"
                     onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                       // You could show a 'broken image' icon here instead
                     }}
                   />
                   <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-2 py-1">Preview</div>
                 </div>
               )}
             </div>
             <div className="col-span-2">
               <label className="block text-sm font-medium mb-1">Registration Link</label>
               <input className="w-full p-2 border rounded" value={formData.registrationLink || ''} onChange={e => setFormData({...formData, registrationLink: e.target.value})} />
             </div>
             <div className="col-span-2">
               <label className="block text-sm font-medium mb-1">Description</label>
               <textarea className="w-full p-2 border rounded h-24" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
             </div>
           </div>
           <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-google-blue text-white rounded hover:bg-blue-700 flex items-center gap-2"><Save size={18} /> Save Event</button>
           </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
             <button onClick={handleNew} className="flex items-center gap-2 bg-google-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
               <Plus size={20} /> Add Event
             </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-600">Event</th>
                  <th className="p-4 font-semibold text-slate-600">Date</th>
                  <th className="p-4 font-semibold text-slate-600">Status</th>
                  <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map(event => (
                  <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                       <div className="font-bold text-slate-900">{event.title}</div>
                       <div className="text-xs text-slate-500">{event.category}</div>
                    </td>
                    <td className="p-4 text-slate-600">{event.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {event.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button onClick={() => handleEdit(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"><Edit size={18} /></button>
                         <button onClick={() => handleDelete(event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    <div className="space-y-6">
      {editingId ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
           <h3 className="text-xl font-bold mb-4">{editingId === 'new' ? 'Add Member' : 'Edit Member'}</h3>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium mb-1">Name</label>
               <input className="w-full p-2 border rounded" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Role</label>
               <input className="w-full p-2 border rounded" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
             </div>
             <div className="col-span-2">
               <label className="block text-sm font-medium mb-1">Photo URL</label>
               <input className="w-full p-2 border rounded" value={formData.photoUrl || ''} onChange={e => setFormData({...formData, photoUrl: e.target.value})} />
             </div>
           </div>
           <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-google-blue text-white rounded hover:bg-blue-700 flex items-center gap-2"><Save size={18} /> Save Member</button>
           </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
             <button onClick={handleNew} className="flex items-center gap-2 bg-google-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
               <Plus size={20} /> Add Member
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                 <img src={member.photoUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover bg-slate-100" />
                 <div className="flex-grow">
                    <h4 className="font-bold text-slate-900">{member.name}</h4>
                    <p className="text-sm text-slate-500">{member.role}</p>
                 </div>
                 <div className="flex flex-col gap-2">
                    <button onClick={() => handleEdit(member)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={16} /></button>
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
