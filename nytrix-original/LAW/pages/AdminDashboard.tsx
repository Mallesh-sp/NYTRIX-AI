import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Users, MapPin, FileText, Phone, Mail, MessageCircle, 
  Camera, X, Sun, Moon, Wallet, Search, Filter, StickyNote, CheckSquare, 
  Square, Calendar, TrendingUp, TrendingDown, IndianRupee, Save, ChevronRight, 
  ChevronLeft, AlertTriangle, CheckCircle, Clock, Activity, Download, Upload, 
  RefreshCw, Star, BarChart3, UserCheck, UserX, Shield, Zap, Bell, Settings, 
  Eye, EyeOff, MessageSquare, Home, Briefcase, PieChart, FileBarChart, LogOut,
  Menu, ChevronDown, Sparkles, Globe, Award, BadgeCheck, MoreVertical, Scale,
  Building2, Navigation, ExternalLink, Gavel
} from 'lucide-react';
import { LawyerProfile } from '../components/LawyerCard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type for autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Premium Theme System
const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('nytrix-admin-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('nytrix-admin-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);
  return { isDark, toggle };
};

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

interface LawyerCredentials {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AdminNote {
  id: string;
  text: string;
  createdAt: string;
  lawyerId?: string;
  lawyerName?: string;
}

interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'add' | 'edit' | 'delete' | 'booking' | 'note';
}

interface UserFeedback {
  id?: string;
  text: string;
  user: string;
  time: string;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

// Court Types
const courtTypes = [
  'High Court', 'District Court', 'Civil Court', 'Family Court',
  'Sessions Court', 'Magistrate Court', 'Consumer Court', 'Labour Court',
  'Supreme Court', 'Tribunal', 'Other'
];

// Indian States for Court Location
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh'
];

// Court Interface
interface Court {
  id: string;
  name: string;
  type: string;
  state: string;
  district: string;
  localArea: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  latitude: number;
  longitude: number;
  jurisdiction: string;
  established: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Premium Navigation Items
const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', active: true },
  { id: 'lawyers', icon: Users, label: 'Lawyers', active: false },
  { id: 'courts', icon: Building2, label: 'Courts', active: false },
  { id: 'bookings', icon: Calendar, label: 'Bookings', active: false },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', active: false },
  { id: 'reports', icon: FileBarChart, label: 'Reports', active: false },
  { id: 'feedback', icon: MessageSquare, label: 'Feedback', active: false },
  { id: 'settings', icon: Settings, label: 'Settings', active: false },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { isDark, toggle: toggleTheme } = useTheme();
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Admin features state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpec, setFilterSpec] = useState('');
  const [selectedLawyers, setSelectedLawyers] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lawyerStatus, setLawyerStatus] = useState<Record<string, boolean>>({});
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [showLawyerMenu, setShowLawyerMenu] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<LawyerProfile & { lawyerPassword: string }>>({
    name: '', state: '', city: '', specialization: '', experience: 0, fees: '',
    phone: '', whatsapp: '', email: '', upiId: '', rating: 4.5,
    casesClosed: 0, bio: '', lawyerPassword: '', photo: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Courts Management State
  const [courts, setCourts] = useState<Court[]>([]);
  const [showCourtForm, setShowCourtForm] = useState(false);
  const [editingCourtId, setEditingCourtId] = useState<string | null>(null);
  const [courtSearchTerm, setCourtSearchTerm] = useState('');
  const [filterCourtType, setFilterCourtType] = useState('');
  const [filterCourtState, setFilterCourtState] = useState('');
  const [showCourtMenu, setShowCourtMenu] = useState<string | null>(null);
  const [courtFormData, setCourtFormData] = useState<Partial<Court>>({
    name: '', type: '', state: '', district: '', localArea: '', address: '',
    phone: '', email: '', timings: '10:00 AM - 5:00 PM', latitude: 0, longitude: 0,
    jurisdiction: '', established: '', isActive: true,
  });

  // Premium Theme Classes
  const theme = {
    bgPrimary: isDark ? 'bg-[#0B1120]' : 'bg-[#F8FAFC]',
    bgSecondary: isDark ? 'bg-[#111827]' : 'bg-white',
    bgTertiary: isDark ? 'bg-[#1F2937]' : 'bg-[#F1F5F9]',
    bgGlass: isDark 
      ? 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl' 
      : 'bg-white/80 backdrop-blur-xl',
    bgCard: isDark 
      ? 'bg-gradient-to-br from-[#1F2937] to-[#111827]' 
      : 'bg-white',
    border: isDark ? 'border-white/[0.08]' : 'border-slate-200',
    borderGlow: isDark ? 'border-indigo-500/30' : 'border-indigo-200',
    textPrimary: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    textMuted: isDark ? 'text-slate-500' : 'text-slate-400',
    input: isDark 
      ? 'bg-[#1F2937] border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20' 
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20',
    shadow: isDark ? 'shadow-2xl shadow-black/20' : 'shadow-xl shadow-slate-200/50',
    shadowGlow: isDark ? 'shadow-lg shadow-indigo-500/20' : 'shadow-lg shadow-indigo-200/50',
  };

  // Live clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lawyers');
    if (saved) setLawyers(JSON.parse(saved));
    
    const savedNotes = localStorage.getItem('adminNotes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    
    const savedActivity = localStorage.getItem('adminActivityLog');
    if (savedActivity) setActivityLog(JSON.parse(savedActivity));
    
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    
    const savedStatus = localStorage.getItem('lawyerStatus');
    if (savedStatus) setLawyerStatus(JSON.parse(savedStatus));
    
    const savedFeedback = localStorage.getItem('userFeedback');
    if (savedFeedback) {
      const feedbackData = JSON.parse(savedFeedback).map((f: any, idx: number) => ({
        ...f, id: f.id || `fb-${idx}-${Date.now()}`
      }));
      setFeedback(feedbackData);
    }
    
    // Load courts from localStorage and attempt to fetch from API
    const savedCourts = localStorage.getItem('adminCourts');
    if (savedCourts) setCourts(JSON.parse(savedCourts));
    
    // Try to fetch courts from API
    fetchCourts();
  }, []);

  const API_BASE = (import.meta as any).env?.VITE_BACKEND_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

  // Fetch courts from API
  const fetchCourts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/courts`);
      const data = await response.json();
      if (data.success && data.data) {
        setCourts(data.data);
        localStorage.setItem('adminCourts', JSON.stringify(data.data));
      }
    } catch (error) {
      console.log('Using local courts data');
    }
  };

  // Activity log helper
  const addActivity = (action: string, details: string, type: ActivityLog['type']) => {
    const newActivity: ActivityLog = {
      id: Date.now().toString(), action, details,
      timestamp: new Date().toISOString(), type
    };
    const updated = [newActivity, ...activityLog].slice(0, 20);
    setActivityLog(updated);
    localStorage.setItem('adminActivityLog', JSON.stringify(updated));
  };

  // Filter lawyers
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterSpec || lawyer.specialization === filterSpec;
    const isActive = lawyerStatus[lawyer.id] !== false;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && isActive) ||
                         (filterStatus === 'inactive' && !isActive);
    return matchesSearch && matchesFilter && matchesStatus;
  });

  const specializations = [...new Set(lawyers.map(l => l.specialization))];

  // Selection handlers
  const toggleSelectLawyer = (id: string) => {
    const newSelected = new Set(selectedLawyers);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedLawyers(newSelected);
  };

  const selectAll = () => {
    if (selectedLawyers.size === filteredLawyers.length) setSelectedLawyers(new Set());
    else setSelectedLawyers(new Set(filteredLawyers.map(l => l.id)));
  };

  const bulkDelete = () => {
    if (selectedLawyers.size === 0) return;
    if (confirm(`Delete ${selectedLawyers.size} selected lawyer(s)? This cannot be undone.`)) {
      const updatedLawyers = lawyers.filter(l => !selectedLawyers.has(l.id));
      setLawyers(updatedLawyers);
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
      
      const existingCredentials = localStorage.getItem('lawyerCredentials');
      if (existingCredentials) {
        const credentials = JSON.parse(existingCredentials);
        const updatedCredentials = credentials.filter((c: any) => !selectedLawyers.has(c.id));
        localStorage.setItem('lawyerCredentials', JSON.stringify(updatedCredentials));
      }
      
      addActivity('Bulk Delete', `Deleted ${selectedLawyers.size} lawyers`, 'delete');
      setSelectedLawyers(new Set());
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Notes handlers
  const saveNote = () => {
    if (!newNote.trim()) return;
    const note: AdminNote = { id: Date.now().toString(), text: newNote.trim(), createdAt: new Date().toISOString() };
    const updated = [note, ...notes];
    setNotes(updated);
    localStorage.setItem('adminNotes', JSON.stringify(updated));
    addActivity('Note Added', newNote.substring(0, 50) + '...', 'note');
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('adminNotes', JSON.stringify(updated));
  };

  // Feedback handlers
  const deleteFeedback = (id: string) => {
    const updated = feedback.filter(f => f.id !== id);
    setFeedback(updated);
    localStorage.setItem('userFeedback', JSON.stringify(updated));
    addActivity('Feedback Deleted', 'Feedback removed', 'delete');
  };

  const clearAllFeedback = () => {
    if (window.confirm('Clear all feedback?')) {
      setFeedback([]);
      localStorage.setItem('userFeedback', JSON.stringify([]));
      addActivity('Feedback Cleared', 'All feedback cleared', 'delete');
    }
  };

  // Calculate stats
  const totalRevenue = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const averageRating = lawyers.length > 0 
    ? (lawyers.reduce((sum, l) => sum + (l.rating || 0), 0) / lawyers.length).toFixed(1) : '0.0';
  const activeLawyers = lawyers.filter(l => lawyerStatus[l.id] !== false).length;

  // Toggle lawyer status
  const toggleLawyerStatus = (lawyerId: string) => {
    const newStatus = { ...lawyerStatus, [lawyerId]: lawyerStatus[lawyerId] === false };
    setLawyerStatus(newStatus);
    localStorage.setItem('lawyerStatus', JSON.stringify(newStatus));
    const lawyer = lawyers.find(l => l.id === lawyerId);
    addActivity('Status Changed', `${lawyer?.name} status updated`, 'edit');
  };

  // Export PDF
  const exportData = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const currentDate = new Date();
    
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('NYTRIX AI INDIA', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Admin Dashboard Report', pageWidth / 2, 28, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated: ${currentDate.toLocaleDateString('en-IN')}`, pageWidth / 2, 36, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Dashboard Summary', 14, 55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Lawyers: ${lawyers.length}`, 20, 70);
    doc.text(`Active: ${activeLawyers}`, 20, 80);
    doc.text(`Bookings: ${bookings.length}`, 100, 70);
    doc.text(`Revenue: ₹${totalRevenue.toLocaleString()}`, 100, 80);
    
    if (lawyers.length > 0) {
      doc.autoTable({
        startY: 100,
        head: [['Name', 'Specialization', 'City', 'Exp', 'Rating', 'Status']],
        body: lawyers.map(l => [
          l.name, l.specialization, l.city, `${l.experience}y`,
          l.rating?.toString() || 'N/A', lawyerStatus[l.id] === false ? 'Inactive' : 'Active'
        ]),
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] },
      });
    }
    
    doc.save(`nytrix-report-${currentDate.toISOString().split('T')[0]}.pdf`);
    addActivity('PDF Exported', 'Report downloaded', 'note');
  };

  // Export JSON
  const exportJsonBackup = () => {
    const exportObj = { lawyers, bookings, notes, lawyerStatus, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nytrix-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addActivity('Backup Created', 'JSON backup downloaded', 'note');
  };

  // Import data
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.lawyers) { setLawyers(data.lawyers); localStorage.setItem('lawyers', JSON.stringify(data.lawyers)); }
        if (data.lawyerStatus) { setLawyerStatus(data.lawyerStatus); localStorage.setItem('lawyerStatus', JSON.stringify(data.lawyerStatus)); }
        if (data.notes) { setNotes(data.notes); localStorage.setItem('adminNotes', JSON.stringify(data.notes)); }
        addActivity('Data Imported', 'Restored from backup', 'note');
        alert('Data imported successfully!');
      } catch (err) { alert('Error importing data.'); }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Clear all data
  const clearAllData = () => {
    if (confirm('⚠️ Delete ALL data? This cannot be undone.')) {
      if (confirm('FINAL confirmation: All data will be permanently deleted.')) {
        ['lawyers', 'bookings', 'adminNotes', 'lawyerCredentials', 'lawyerStatus'].forEach(k => localStorage.removeItem(k));
        setLawyers([]); setBookings([]); setNotes([]); setLawyerStatus({});
        addActivity('Data Cleared', 'All data reset', 'delete');
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['experience', 'rating', 'casesClosed'].includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.state || !formData.city || !formData.specialization) {
      alert('Please fill required fields'); return;
    }
    if (!editingId && (!formData.email || !formData.lawyerPassword)) {
      alert('Email and password required for new lawyer'); return;
    }

    const { lawyerPassword, ...lawyerData } = formData;
    let updatedLawyers: LawyerProfile[];

    if (editingId) {
      updatedLawyers = lawyers.map(l => l.id === editingId ? { ...l, ...lawyerData } as LawyerProfile : l);
      setEditingId(null);
      addActivity('Lawyer Updated', `Updated ${lawyerData.name}`, 'edit');
    } else {
      const newLawyer: LawyerProfile = { id: Date.now().toString(), ...lawyerData as LawyerProfile };
      updatedLawyers = [...lawyers, newLawyer];
      
      const existingCreds = localStorage.getItem('lawyerCredentials');
      const credentials: LawyerCredentials[] = existingCreds ? JSON.parse(existingCreds) : [];
      credentials.push({ id: newLawyer.id, name: newLawyer.name, email: newLawyer.email || '', password: lawyerPassword || '' });
      localStorage.setItem('lawyerCredentials', JSON.stringify(credentials));
      addActivity('Lawyer Added', `Added ${lawyerData.name}`, 'add');
    }

    setLawyers(updatedLawyers);
    localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
    setFormData({ name: '', state: '', city: '', specialization: '', experience: 0, fees: '', phone: '', whatsapp: '', email: '', upiId: '', rating: 4.5, casesClosed: 0, bio: '', lawyerPassword: '', photo: '' });
    setShowForm(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('Photo size should be less than 2MB'); return; }
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, photo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (lawyer: LawyerProfile) => {
    setFormData(lawyer);
    setEditingId(lawyer.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const lawyer = lawyers.find(l => l.id === id);
    if (confirm('Delete this lawyer and all associated data?')) {
      const updatedLawyers = lawyers.filter(l => l.id !== id);
      setLawyers(updatedLawyers);
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
      
      const existingCreds = localStorage.getItem('lawyerCredentials');
      if (existingCreds) {
        const creds = JSON.parse(existingCreds).filter((c: any) => c.id !== id);
        localStorage.setItem('lawyerCredentials', JSON.stringify(creds));
      }
      
      const existingBookings = localStorage.getItem('bookings');
      if (existingBookings) {
        const bks = JSON.parse(existingBookings).filter((b: any) => b.lawyerId !== id);
        localStorage.setItem('bookings', JSON.stringify(bks));
      }
      
      addActivity('Lawyer Deleted', `Deleted ${lawyer?.name || 'Unknown'}`, 'delete');
      window.dispatchEvent(new Event('storage'));
    }
  };

  // ==================== COURTS MANAGEMENT ====================
  
  // Filter courts
  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(courtSearchTerm.toLowerCase()) ||
                         court.address.toLowerCase().includes(courtSearchTerm.toLowerCase()) ||
                         court.district.toLowerCase().includes(courtSearchTerm.toLowerCase());
    const matchesType = !filterCourtType || court.type === filterCourtType;
    const matchesState = !filterCourtState || court.state === filterCourtState;
    return matchesSearch && matchesType && matchesState;
  });

  // Court form input handler
  const handleCourtInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourtFormData(prev => ({
      ...prev,
      [name]: ['latitude', 'longitude'].includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  // Court form submit handler
  const handleCourtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courtFormData.name || !courtFormData.type || !courtFormData.state || !courtFormData.address) {
      alert('Please fill in required fields: Name, Type, State, Address');
      return;
    }

    try {
      if (editingCourtId) {
        // Update existing court
        const response = await fetch(`${API_BASE}/api/courts/${editingCourtId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courtFormData),
        });
        const data = await response.json();
        
        if (data.success) {
          const updatedCourts = courts.map(c => c.id === editingCourtId ? data.data : c);
          setCourts(updatedCourts);
          localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
          addActivity('Court Updated', `Updated ${courtFormData.name}`, 'edit');
        } else {
          // Fallback to local update
          const updatedCourts = courts.map(c => c.id === editingCourtId ? { ...c, ...courtFormData, updatedAt: new Date().toISOString() } as Court : c);
          setCourts(updatedCourts);
          localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
          addActivity('Court Updated', `Updated ${courtFormData.name}`, 'edit');
        }
        setEditingCourtId(null);
      } else {
        // Create new court
        const response = await fetch(`${API_BASE}/api/courts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courtFormData),
        });
        const data = await response.json();
        
        if (data.success) {
          const updatedCourts = [...courts, data.data];
          setCourts(updatedCourts);
          localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
          addActivity('Court Added', `Added ${courtFormData.name}`, 'add');
        } else {
          // Fallback to local creation
          const newCourt: Court = {
            id: `court-${Date.now()}`,
            ...courtFormData as Court,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          const updatedCourts = [...courts, newCourt];
          setCourts(updatedCourts);
          localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
          addActivity('Court Added', `Added ${courtFormData.name}`, 'add');
        }
      }
      
      // Reset form
      setCourtFormData({
        name: '', type: '', state: '', district: '', localArea: '', address: '',
        phone: '', email: '', timings: '10:00 AM - 5:00 PM', latitude: 0, longitude: 0,
        jurisdiction: '', established: '', isActive: true,
      });
      setShowCourtForm(false);
    } catch (error) {
      // Fallback to local storage only
      if (editingCourtId) {
        const updatedCourts = courts.map(c => c.id === editingCourtId ? { ...c, ...courtFormData, updatedAt: new Date().toISOString() } as Court : c);
        setCourts(updatedCourts);
        localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
        addActivity('Court Updated', `Updated ${courtFormData.name}`, 'edit');
        setEditingCourtId(null);
      } else {
        const newCourt: Court = {
          id: `court-${Date.now()}`,
          ...courtFormData as Court,
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        const updatedCourts = [...courts, newCourt];
        setCourts(updatedCourts);
        localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
        addActivity('Court Added', `Added ${courtFormData.name}`, 'add');
      }
      setCourtFormData({
        name: '', type: '', state: '', district: '', localArea: '', address: '',
        phone: '', email: '', timings: '10:00 AM - 5:00 PM', latitude: 0, longitude: 0,
        jurisdiction: '', established: '', isActive: true,
      });
      setShowCourtForm(false);
    }
  };

  // Edit court
  const handleEditCourt = (court: Court) => {
    setCourtFormData(court);
    setEditingCourtId(court.id);
    setShowCourtForm(true);
  };

  // Delete court
  const handleDeleteCourt = async (id: string) => {
    const court = courts.find(c => c.id === id);
    if (confirm(`Delete "${court?.name}"? This cannot be undone.`)) {
      try {
        const response = await fetch(`${API_BASE}/api/courts/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.success) {
          const updatedCourts = courts.filter(c => c.id !== id);
          setCourts(updatedCourts);
          localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
          addActivity('Court Deleted', `Deleted ${court?.name || 'Unknown'}`, 'delete');
        }
      } catch (error) {
        // Fallback to local delete
        const updatedCourts = courts.filter(c => c.id !== id);
        setCourts(updatedCourts);
        localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
        addActivity('Court Deleted', `Deleted ${court?.name || 'Unknown'}`, 'delete');
      }
    }
  };

  // Toggle court active status
  const toggleCourtStatus = async (id: string) => {
    const court = courts.find(c => c.id === id);
    if (!court) return;
    
    const updatedCourt = { ...court, isActive: !court.isActive };
    
    try {
      await fetch(`${API_BASE}/api/courts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updatedCourt.isActive }),
      });
    } catch (error) {
      // Continue with local update
    }
    
    const updatedCourts = courts.map(c => c.id === id ? updatedCourt : c);
    setCourts(updatedCourts);
    localStorage.setItem('adminCourts', JSON.stringify(updatedCourts));
    addActivity('Court Status Changed', `${court.name} is now ${updatedCourt.isActive ? 'active' : 'inactive'}`, 'edit');
  };

  // Format helpers
  const formatTime = (date: Date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formatDate = (date: Date) => date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className={`min-h-screen ${theme.bgPrimary} transition-all duration-500`}>
      {/* Premium Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className={`fixed left-0 top-0 h-full ${theme.bgSecondary} border-r ${theme.border} z-40 ${theme.shadow}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-4 border-b ${theme.border}`}>
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative w-12 h-12 flex-shrink-0"
              >
                <img src="/nytrix-logo.svg" alt="NYTRIX AI" className="w-12 h-12 object-contain drop-shadow-lg" />
              </motion.div>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <h1 className={`font-bold text-lg ${theme.textPrimary}`}>NYTRIX AI</h1>
                    <p className={`text-xs ${theme.textMuted}`}>Admin Panel</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'feedback') setShowFeedback(true);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 shadow-lg shadow-indigo-500/10' 
                      : `${theme.textSecondary} hover:bg-white/5`
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-r-full"
                    />
                  )}
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.id === 'feedback' && feedback.length > 0 && !sidebarCollapsed && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {feedback.length}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Collapse Button & Logout */}
          <div className={`p-3 border-t ${theme.border} space-y-2`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${theme.textSecondary} hover:bg-white/5 transition-all`}
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              {!sidebarCollapsed && <span className="font-medium">Collapse</span>}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('landing')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Logout</span>}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-[280px]'}`}
        style={{ minHeight: '100vh' }}
      >
        {/* Premium Top Header */}
        <header className={`sticky top-0 z-30 ${theme.bgGlass} border-b ${theme.border}`}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left: Title & Search */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Dashboard</h1>
                <p className={`text-sm ${theme.textMuted}`}>Welcome back, Admin</p>
              </div>
              
              {/* Global Search */}
              <div className="relative hidden md:block">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-80 pl-12 pr-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Live Clock */}
              <div className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl ${theme.bgTertiary}`}>
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className={`text-sm font-mono ${theme.textPrimary}`}>{formatTime(currentTime)}</span>
                <span className={`text-xs ${theme.textMuted}`}>{formatDate(currentTime)}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-3 rounded-xl ${theme.bgTertiary} hover:bg-indigo-500/10 transition-all`}
                >
                  <Bell className={`w-5 h-5 ${theme.textSecondary}`} />
                  {(feedback.length + activityLog.length) > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white font-bold flex items-center justify-center">
                      {Math.min(feedback.length + activityLog.length, 9)}
                    </span>
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 top-14 w-80 ${theme.bgCard} rounded-2xl border ${theme.border} ${theme.shadow} overflow-hidden`}
                    >
                      <div className={`p-4 border-b ${theme.border}`}>
                        <h3 className={`font-bold ${theme.textPrimary}`}>Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {activityLog.slice(0, 5).map((item) => (
                          <div key={item.id} className={`p-3 border-b ${theme.border} hover:bg-white/5`}>
                            <p className={`text-sm ${theme.textPrimary}`}>{item.action}</p>
                            <p className={`text-xs ${theme.textMuted}`}>{item.details}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${theme.bgTertiary} hover:bg-indigo-500/10 transition-all`}
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
              </motion.button>

              {/* Profile */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl ${theme.bgTertiary} hover:bg-indigo-500/10 transition-all`}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className={`text-sm font-semibold ${theme.textPrimary}`}>Admin</p>
                    <p className={`text-xs ${theme.textMuted}`}>Super Admin</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 ${theme.textMuted}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards - Premium KPI */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Lawyers', value: lawyers.length, icon: Users, color: 'from-blue-500 to-cyan-500', trend: '+12%', trendUp: true },
              { label: 'Active Lawyers', value: activeLawyers, icon: UserCheck, color: 'from-green-500 to-emerald-500', trend: '+8%', trendUp: true },
              { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'from-purple-500 to-pink-500', trend: '+24%', trendUp: true },
              { label: 'Revenue', value: totalRevenue, icon: IndianRupee, color: 'from-amber-500 to-orange-500', trend: '+18%', trendUp: true, prefix: '₹' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative overflow-hidden p-6 rounded-2xl ${theme.bgCard} border ${theme.border} ${theme.shadow} group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                    stat.trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
                <p className={`text-sm ${theme.textMuted} mb-1`}>{stat.label}</p>
                <p className={`text-3xl font-bold ${theme.textPrimary}`}>
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                </p>
                <p className={`text-xs ${theme.textMuted} mt-2`}>vs last month</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions - Premium */}
          <div className={`mb-8 p-6 rounded-2xl ${theme.bgCard} border ${theme.border} ${theme.shadow}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Quick Actions</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { icon: FileText, label: 'Export PDF', color: 'text-red-400', bg: 'hover:bg-red-500/10', action: exportData },
                { icon: Download, label: 'Backup', color: 'text-green-400', bg: 'hover:bg-green-500/10', action: exportJsonBackup },
                { icon: Upload, label: 'Import', color: 'text-blue-400', bg: 'hover:bg-blue-500/10', action: () => importInputRef.current?.click() },
                { icon: RefreshCw, label: 'Refresh', color: 'text-purple-400', bg: 'hover:bg-purple-500/10', action: () => window.location.reload() },
                { icon: Plus, label: 'Add Lawyer', color: 'text-indigo-400', bg: 'hover:bg-indigo-500/10', action: () => setShowForm(true) },
                { icon: StickyNote, label: 'Notes', color: 'text-amber-400', bg: 'hover:bg-amber-500/10', action: () => setShowNotes(true) },
                { icon: MessageSquare, label: 'Feedback', color: 'text-cyan-400', bg: 'hover:bg-cyan-500/10', action: () => setShowFeedback(true), badge: feedback.length },
                { icon: Trash2, label: 'Reset', color: 'text-red-400', bg: 'hover:bg-red-500/10', action: clearAllData },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border ${theme.border} ${action.bg} transition-all group`}
                >
                  <action.icon className={`w-6 h-6 ${action.color} group-hover:scale-110 transition-transform`} />
                  <span className={`text-xs font-medium ${theme.textSecondary}`}>{action.label}</span>
                  {action.badge !== undefined && action.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white font-bold flex items-center justify-center">
                      {action.badge}
                    </span>
                  )}
                </motion.button>
              ))}
              <input type="file" ref={importInputRef} accept=".json" onChange={importData} className="hidden" />
            </div>
          </div>

          {/* Filters & Selection */}
          <div className={`mb-6 p-4 rounded-2xl ${theme.bgCard} border ${theme.border}`}>
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Lawyer
              </motion.button>

              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted}`} />
                  <input
                    type="text"
                    placeholder="Search lawyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all`}
                  />
                </div>
              </div>

              <select
                value={filterSpec}
                onChange={(e) => setFilterSpec(e.target.value)}
                className={`px-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all min-w-[180px]`}
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => <option key={spec} value={spec}>{spec}</option>)}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className={`px-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {selectedLawyers.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={bulkDelete}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedLawyers.size})
                </motion.button>
              )}
            </div>
          </div>

          {/* Lawyers Grid - Premium Cards */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
              Registered Lawyers ({filteredLawyers.length})
            </h2>
            <button
              onClick={selectAll}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme.textSecondary} hover:bg-white/5 transition-all text-sm`}
            >
              {selectedLawyers.size === filteredLawyers.length && filteredLawyers.length > 0 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              Select All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLawyers.map((lawyer, idx) => {
                const isActive = lawyerStatus[lawyer.id] !== false;
                const isSelected = selectedLawyers.has(lawyer.id);
                return (
                  <motion.div
                    key={lawyer.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`relative overflow-hidden rounded-2xl ${theme.bgGlass} border ${
                      isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/30' : theme.border
                    } ${theme.shadow} group transition-all duration-300`}
                  >
                    {/* Selection checkbox */}
                    <button
                      onClick={() => toggleSelectLawyer(lawyer.id)}
                      className={`absolute top-4 left-4 z-10 p-1 rounded-lg ${
                        isSelected ? 'bg-indigo-500 text-white' : `${theme.bgTertiary} ${theme.textSecondary}`
                      } transition-all`}
                    >
                      {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </button>

                    {/* Status & Menu */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setShowLawyerMenu(showLawyerMenu === lawyer.id ? null : lawyer.id)}
                          className={`p-1.5 rounded-lg ${theme.bgTertiary} hover:bg-white/10 transition-all`}
                        >
                          <MoreVertical className={`w-4 h-4 ${theme.textSecondary}`} />
                        </motion.button>
                        <AnimatePresence>
                          {showLawyerMenu === lawyer.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className={`absolute right-0 top-8 w-40 ${theme.bgCard} rounded-xl border ${theme.border} ${theme.shadow} overflow-hidden`}
                            >
                              <button onClick={() => { handleEdit(lawyer); setShowLawyerMenu(null); }} className={`w-full flex items-center gap-2 px-4 py-2.5 ${theme.textSecondary} hover:bg-white/5`}>
                                <Edit2 className="w-4 h-4" /> Edit
                              </button>
                              <button onClick={() => toggleLawyerStatus(lawyer.id)} className={`w-full flex items-center gap-2 px-4 py-2.5 ${theme.textSecondary} hover:bg-white/5`}>
                                {isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                {isActive ? 'Deactivate' : 'Activate'}
                              </button>
                              <button onClick={() => { handleDelete(lawyer.id); setShowLawyerMenu(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 pt-14">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          {lawyer.photo ? (
                            <img src={lawyer.photo} alt={lawyer.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10" />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                              <span className="text-2xl font-bold text-white">{lawyer.name.charAt(0)}</span>
                            </div>
                          )}
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                            isDark ? 'border-[#1F2937]' : 'border-white'
                          } ${isActive ? 'bg-green-500' : 'bg-slate-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-bold ${theme.textPrimary} truncate`}>{lawyer.name}</h3>
                            <BadgeCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          </div>
                          <p className={`text-sm ${theme.textMuted} truncate`}>{lawyer.specialization}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${theme.textMuted}`} />
                          <span className={`text-sm ${theme.textSecondary}`}>{lawyer.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className={`w-4 h-4 ${theme.textMuted}`} />
                          <span className={`text-sm ${theme.textSecondary}`}>{lawyer.experience} years experience</span>
                        </div>
                        {lawyer.email && (
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme.textMuted}`} />
                            <span className={`text-sm ${theme.textSecondary} truncate`}>{lawyer.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= (lawyer.rating || 0) ? 'text-yellow-400 fill-yellow-400' : theme.textMuted}`}
                            />
                          ))}
                          <span className={`text-sm font-semibold ${theme.textPrimary} ml-1`}>{lawyer.rating?.toFixed(1)}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-lg ${theme.bgTertiary}`}>
                          <span className={`text-sm font-semibold ${theme.textPrimary}`}>{lawyer.fees || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredLawyers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-16 ${theme.bgCard} rounded-2xl border ${theme.border}`}
            >
              <Users className={`w-16 h-16 mx-auto mb-4 ${theme.textMuted}`} />
              <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>No lawyers found</h3>
              <p className={theme.textMuted}>Add your first lawyer or adjust filters</p>
            </motion.div>
          )}

          {/* ==================== COURTS MANAGEMENT SECTION ==================== */}
          {activeNav === 'courts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {/* Courts Header */}
              <div className={`mb-6 p-6 rounded-2xl ${theme.bgCard} border ${theme.border}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>Courts Management</h2>
                      <p className={`text-sm ${theme.textMuted}`}>Add and manage court locations</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCourtForm(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Court
                  </motion.button>
                </div>

                {/* Courts Filters */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted}`} />
                      <input
                        type="text"
                        placeholder="Search courts..."
                        value={courtSearchTerm}
                        onChange={(e) => setCourtSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                  </div>
                  <select
                    value={filterCourtType}
                    onChange={(e) => setFilterCourtType(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all min-w-[180px]`}
                  >
                    <option value="">All Court Types</option>
                    {courtTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <select
                    value={filterCourtState}
                    onChange={(e) => setFilterCourtState(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 transition-all min-w-[180px]`}
                  >
                    <option value="">All States</option>
                    {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
              </div>

              {/* Courts Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Courts', value: courts.length, icon: Building2, color: 'from-purple-500 to-indigo-500' },
                  { label: 'Active Courts', value: courts.filter(c => c.isActive).length, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
                  { label: 'High Courts', value: courts.filter(c => c.type === 'High Court').length, icon: Gavel, color: 'from-amber-500 to-orange-500' },
                  { label: 'States Covered', value: [...new Set(courts.map(c => c.state))].length, icon: Globe, color: 'from-blue-500 to-cyan-500' },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-xl ${theme.bgCard} border ${theme.border} ${theme.shadow}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${theme.textPrimary}`}>{stat.value}</p>
                        <p className={`text-xs ${theme.textMuted}`}>{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Courts Grid */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                  Court Listings ({filteredCourts.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredCourts.map((court, idx) => (
                    <motion.div
                      key={court.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      className={`relative overflow-hidden rounded-2xl ${theme.bgGlass} border ${theme.border} ${theme.shadow} group transition-all duration-300`}
                    >
                      {/* Status Badge & Menu */}
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          court.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {court.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <div className="relative">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setShowCourtMenu(showCourtMenu === court.id ? null : court.id)}
                            className={`p-1.5 rounded-lg ${theme.bgTertiary} hover:bg-white/10 transition-all`}
                          >
                            <MoreVertical className={`w-4 h-4 ${theme.textSecondary}`} />
                          </motion.button>
                          <AnimatePresence>
                            {showCourtMenu === court.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`absolute right-0 top-8 w-40 ${theme.bgCard} rounded-xl border ${theme.border} ${theme.shadow} overflow-hidden z-20`}
                              >
                                <button onClick={() => { handleEditCourt(court); setShowCourtMenu(null); }} className={`w-full flex items-center gap-2 px-4 py-2.5 ${theme.textSecondary} hover:bg-white/5`}>
                                  <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button onClick={() => toggleCourtStatus(court.id)} className={`w-full flex items-center gap-2 px-4 py-2.5 ${theme.textSecondary} hover:bg-white/5`}>
                                  {court.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  {court.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${court.latitude},${court.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full flex items-center gap-2 px-4 py-2.5 ${theme.textSecondary} hover:bg-white/5`}
                                >
                                  <Navigation className="w-4 h-4" /> View on Map
                                </a>
                                <button onClick={() => { handleDeleteCourt(court.id); setShowCourtMenu(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10">
                                  <Trash2 className="w-4 h-4" /> Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Court Type Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-400`}>
                          {court.type}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 pt-14">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold ${theme.textPrimary} truncate`}>{court.name}</h3>
                            <p className={`text-sm ${theme.textMuted}`}>{court.state}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-start gap-2">
                            <MapPin className={`w-4 h-4 ${theme.textMuted} mt-0.5 flex-shrink-0`} />
                            <span className={`text-sm ${theme.textSecondary} line-clamp-2`}>{court.address}</span>
                          </div>
                          {court.district && (
                            <div className="flex items-center gap-2">
                              <Globe className={`w-4 h-4 ${theme.textMuted}`} />
                              <span className={`text-sm ${theme.textSecondary}`}>{court.district}, {court.localArea || court.state}</span>
                            </div>
                          )}
                          {court.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className={`w-4 h-4 ${theme.textMuted}`} />
                              <span className={`text-sm ${theme.textSecondary}`}>{court.phone}</span>
                            </div>
                          )}
                          {court.timings && (
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 ${theme.textMuted}`} />
                              <span className={`text-sm ${theme.textSecondary}`}>{court.timings}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${court.latitude},${court.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all"
                          >
                            <Navigation className="w-4 h-4" />
                            Directions
                          </a>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${court.latitude},${court.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 ${theme.bgTertiary} ${theme.textSecondary} rounded-lg text-sm font-medium hover:bg-white/10 transition-all`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Map
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredCourts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 ${theme.bgCard} rounded-2xl border ${theme.border}`}
                >
                  <Building2 className={`w-16 h-16 mx-auto mb-4 ${theme.textMuted}`} />
                  <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>No courts found</h3>
                  <p className={theme.textMuted}>Add your first court or adjust filters</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Add/Edit Lawyer Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowForm(false); setEditingId(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${theme.bgCard} rounded-2xl border ${theme.border} ${theme.shadow}`}
            >
              <div className={`sticky top-0 ${theme.bgCard} p-6 border-b ${theme.border} flex items-center justify-between z-10`}>
                <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>
                  {editingId ? 'Edit Lawyer' : 'Add New Lawyer'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditingId(null); }} className={`p-2 rounded-xl hover:bg-white/10 ${theme.textSecondary}`}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Photo Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {formData.photo ? (
                      <img src={formData.photo} alt="Preview" className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500/30" />
                    ) : (
                      <div className={`w-24 h-24 rounded-2xl ${theme.bgTertiary} flex items-center justify-center border-2 border-dashed ${theme.border}`}>
                        <Camera className={`w-8 h-8 ${theme.textMuted}`} />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handlePhotoChange} ref={fileInputRef} className="hidden" />
                  </div>
                  <div>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-xl font-medium hover:bg-indigo-500/30 transition-all">
                      Upload Photo
                    </button>
                    <p className={`text-xs ${theme.textMuted} mt-2`}>Max 2MB, JPG/PNG</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>State *</label>
                    <select name="state" value={formData.state} onChange={handleInputChange} required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`}>
                      <option value="">Select State</option>
                      {/* States */}
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      {/* Union Territories */}
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="City name" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Specialization *</label>
                    <select name="specialization" value={formData.specialization} onChange={handleInputChange} required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`}>
                      <option value="">Select</option>
                      {['Criminal Defense', 'Family Law', 'Corporate Law', 'Civil Rights', 'Property Law', 'Immigration', 'Tax Law', 'Labor Law'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Experience (years)</label>
                    <input type="number" name="experience" value={formData.experience} onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="Years" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required={!editingId}
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Fees</label>
                    <input type="text" name="fees" value={formData.fees} onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="₹500/consultation" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Rating</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="5" step="0.1"
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="4.5" />
                  </div>
                  {!editingId && (
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Password *</label>
                      <input type="password" name="lawyerPassword" value={formData.lawyerPassword} onChange={handleInputChange} required={!editingId}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="Login password" />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 resize-none`} placeholder="Brief description..." />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                    className={`flex-1 py-3 rounded-xl border ${theme.border} ${theme.textSecondary} font-semibold hover:bg-white/5 transition-all`}>
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
                    {editingId ? 'Update Lawyer' : 'Add Lawyer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Court Modal */}
      <AnimatePresence>
        {showCourtForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowCourtForm(false); setEditingCourtId(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${theme.bgCard} rounded-2xl border ${theme.border} ${theme.shadow}`}
            >
              <div className={`sticky top-0 ${theme.bgCard} p-6 border-b ${theme.border} flex items-center justify-between z-10`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>
                    {editingCourtId ? 'Edit Court' : 'Add New Court'}
                  </h2>
                </div>
                <button onClick={() => { setShowCourtForm(false); setEditingCourtId(null); }} className={`p-2 rounded-xl hover:bg-white/10 ${theme.textSecondary}`}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCourtSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className={`text-sm font-semibold ${theme.textMuted} uppercase tracking-wider mb-4`}>Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Court Name *</label>
                      <input type="text" name="name" value={courtFormData.name} onChange={handleCourtInputChange} required
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., Delhi High Court" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Court Type *</label>
                      <select name="type" value={courtFormData.type} onChange={handleCourtInputChange} required
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`}>
                        <option value="">Select Type</option>
                        {courtTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Established Year</label>
                      <input type="text" name="established" value={courtFormData.established} onChange={handleCourtInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., 1966" />
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h3 className={`text-sm font-semibold ${theme.textMuted} uppercase tracking-wider mb-4`}>Location Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>State *</label>
                      <select name="state" value={courtFormData.state} onChange={handleCourtInputChange} required
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`}>
                        <option value="">Select State</option>
                        {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>District *</label>
                      <input type="text" name="district" value={courtFormData.district} onChange={handleCourtInputChange} required
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., New Delhi" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Local Area</label>
                      <input type="text" name="localArea" value={courtFormData.localArea} onChange={handleCourtInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., Sher Shah Road" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Timings</label>
                      <input type="text" name="timings" value={courtFormData.timings} onChange={handleCourtInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., 10:00 AM - 5:00 PM" />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Full Address *</label>
                      <textarea name="address" value={courtFormData.address} onChange={handleCourtInputChange} required rows={2}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 resize-none`} placeholder="Complete address..." />
                    </div>
                  </div>
                </div>

                {/* GPS Coordinates */}
                <div>
                  <h3 className={`text-sm font-semibold ${theme.textMuted} uppercase tracking-wider mb-4`}>GPS Coordinates (for Map)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Latitude *</label>
                      <input type="number" step="any" name="latitude" value={courtFormData.latitude} onChange={handleCourtInputChange} required
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., 28.6315" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Longitude *</label>
                      <input type="number" step="any" name="longitude" value={courtFormData.longitude} onChange={handleCourtInputChange} required
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., 77.2454" />
                    </div>
                  </div>
                  <p className={`text-xs ${theme.textMuted} mt-2`}>
                    💡 Tip: Get coordinates from Google Maps by right-clicking on the location
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className={`text-sm font-semibold ${theme.textMuted} uppercase tracking-wider mb-4`}>Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Phone</label>
                      <input type="text" name="phone" value={courtFormData.phone} onChange={handleCourtInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., 011-23385657" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Email</label>
                      <input type="email" name="email" value={courtFormData.email} onChange={handleCourtInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2`} placeholder="e.g., registry@court.nic.in" />
                    </div>
                  </div>
                </div>

                {/* Jurisdiction */}
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Jurisdiction</label>
                  <textarea name="jurisdiction" value={courtFormData.jurisdiction} onChange={handleCourtInputChange} rows={2}
                    className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 resize-none`} placeholder="Describe the territorial/subject matter jurisdiction..." />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => { setShowCourtForm(false); setEditingCourtId(null); }}
                    className={`flex-1 py-3 rounded-xl border ${theme.border} ${theme.textSecondary} font-semibold hover:bg-white/5 transition-all`}>
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                    {editingCourtId ? 'Update Court' : 'Add Court'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Sidebar */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed right-0 top-0 h-full w-96 ${theme.bgCard} border-l ${theme.border} ${theme.shadow} z-50`}
          >
            <div className="flex flex-col h-full">
              <div className={`p-6 border-b ${theme.border} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20">
                    <StickyNote className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Notes</h2>
                </div>
                <button onClick={() => setShowNotes(false)} className={`p-2 rounded-xl hover:bg-white/10 ${theme.textSecondary}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 border-b border-white/10">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write a note..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 resize-none`}
                />
                <button
                  onClick={saveNote}
                  disabled={!newNote.trim()}
                  className={`w-full mt-3 py-2.5 rounded-xl font-semibold transition-all ${
                    newNote.trim() ? 'bg-amber-500 text-white hover:bg-amber-600' : `${theme.bgTertiary} ${theme.textMuted}`
                  }`}
                >
                  Save Note
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notes.length === 0 ? (
                  <div className="text-center py-8">
                    <StickyNote className={`w-12 h-12 mx-auto mb-3 ${theme.textMuted}`} />
                    <p className={theme.textMuted}>No notes yet</p>
                  </div>
                ) : (
                  notes.map((note) => (
                    <motion.div
                      key={note.id}
                      layout
                      className={`p-4 rounded-xl ${theme.bgTertiary} group`}
                    >
                      <p className={`text-sm ${theme.textPrimary} whitespace-pre-wrap`}>{note.text}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs ${theme.textMuted}`}>
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                        <button onClick={() => deleteNote(note.id)} className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-500/20 rounded transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Sidebar */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed right-0 top-0 h-full w-96 ${theme.bgCard} border-l ${theme.border} ${theme.shadow} z-50`}
          >
            <div className="flex flex-col h-full">
              <div className={`p-6 border-b ${theme.border} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Feedback</h2>
                  {feedback.length > 0 && (
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold">{feedback.length}</span>
                  )}
                </div>
                <button onClick={() => setShowFeedback(false)} className={`p-2 rounded-xl hover:bg-white/10 ${theme.textSecondary}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {feedback.length > 0 && (
                <div className="p-4 border-b border-white/10">
                  <button onClick={clearAllFeedback} className="w-full py-2.5 rounded-xl bg-red-500/20 text-red-400 font-semibold hover:bg-red-500/30 transition-all">
                    Clear All Feedback
                  </button>
                </div>
              )}
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {feedback.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className={`w-12 h-12 mx-auto mb-3 ${theme.textMuted}`} />
                    <p className={theme.textMuted}>No feedback yet</p>
                    <p className={`text-xs ${theme.textMuted} mt-1`}>User feedback will appear here</p>
                  </div>
                ) : (
                  feedback.map((fb) => (
                    <motion.div
                      key={fb.id}
                      layout
                      className={`p-4 rounded-xl ${theme.bgTertiary} border-l-4 border-cyan-500 group`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-cyan-400">{fb.user.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className={`text-sm font-semibold ${theme.textPrimary}`}>{fb.user}</span>
                      </div>
                      <p className={`text-sm ${theme.textSecondary} whitespace-pre-wrap`}>{fb.text}</p>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                        <span className={`text-xs ${theme.textMuted}`}>
                          {new Date(fb.time).toLocaleDateString('en-IN')}
                        </span>
                        <button onClick={() => deleteFeedback(fb.id || '')} className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-500/20 rounded transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close menus */}
      {(showLawyerMenu || showCourtMenu || showProfileMenu || showNotifications) && (
        <div className="fixed inset-0 z-20" onClick={() => { setShowLawyerMenu(null); setShowCourtMenu(null); setShowProfileMenu(false); setShowNotifications(false); }} />
      )}
    </div>
  );
};

export default AdminDashboard;
