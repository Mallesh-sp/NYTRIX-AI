import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, MessageCircle, LogOut, Sun, Moon, Calendar, TrendingUp, Search, RefreshCw, Bell, Shield, Award, Wallet, Save, NotebookPen, Download, Plus, Trash2, Edit3 } from 'lucide-react';
import BookingRequestCard, { BookingRequest } from '../components/BookingRequestCard';

// Notes interface
interface DailyNote {
  id: string;
  date: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

// Theme hook
const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('nytrix-lawyer-theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('nytrix-lawyer-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);
  return { isDark, toggle };
};

interface LawyerDashboardProps {
  lawyerId: string;
  lawyerName: string;
  onLogout: () => void;
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ lawyerId, lawyerName, onLogout }) => {
  const { isDark, toggle: toggleTheme } = useTheme();
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [upiId, setUpiId] = useState('');
  const [upiSaving, setUpiSaving] = useState(false);
  const [showUpiSection, setShowUpiSection] = useState(false);
  
  // Notes state
  const [showNotesSection, setShowNotesSection] = useState(false);
  const [notes, setNotes] = useState<DailyNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Theme classes
  const theme = {
    bg: isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-indigo-50',
    header: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    headerText: isDark ? 'text-white' : 'text-slate-900',
    headerSub: isDark ? 'text-gray-300' : 'text-gray-600',
    card: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    cardHover: isDark ? 'hover:shadow-xl hover:shadow-blue-900/20' : 'hover:shadow-lg',
    text: isDark ? 'text-white' : 'text-slate-900',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-600',
    input: isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-slate-900 placeholder-gray-500',
    filterActive: isDark ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white shadow-lg',
    filterInactive: isDark ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
    emptyBg: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    iconMuted: isDark ? 'text-gray-600' : 'text-gray-400',
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Load lawyer's UPI ID from localStorage
  useEffect(() => {
    const lawyers = JSON.parse(localStorage.getItem('lawyers') || '[]');
    const currentLawyer = lawyers.find((l: any) => l.id === lawyerId);
    if (currentLawyer?.upiId) {
      setUpiId(currentLawyer.upiId);
    }
  }, [lawyerId]);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`lawyer-notes-${lawyerId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [lawyerId]);

  // Save notes to localStorage
  const saveNotesToStorage = (updatedNotes: DailyNote[]) => {
    localStorage.setItem(`lawyer-notes-${lawyerId}`, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  // Add new note
  const addNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      setMessage({ type: 'error', text: 'Please enter both title and content for the note' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const now = Date.now();
    const newNote: DailyNote = {
      id: `note-${now}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      createdAt: now,
      updatedAt: now,
    };
    const updatedNotes = [newNote, ...notes];
    saveNotesToStorage(updatedNotes);
    setNewNoteTitle('');
    setNewNoteContent('');
    setMessage({ type: 'success', text: 'Note added successfully!' });
    setTimeout(() => setMessage(null), 2000);
  };

  // Delete note
  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    saveNotesToStorage(updatedNotes);
    setMessage({ type: 'success', text: 'Note deleted!' });
    setTimeout(() => setMessage(null), 2000);
  };

  // Start editing note
  const startEditNote = (note: DailyNote) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Save edited note
  const saveEditedNote = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      setMessage({ type: 'error', text: 'Please enter both title and content' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const updatedNotes = notes.map(n => 
      n.id === editingNoteId 
        ? { ...n, title: editTitle.trim(), content: editContent.trim(), updatedAt: Date.now() }
        : n
    );
    saveNotesToStorage(updatedNotes);
    setEditingNoteId(null);
    setEditTitle('');
    setEditContent('');
    setMessage({ type: 'success', text: 'Note updated!' });
    setTimeout(() => setMessage(null), 2000);
  };

  // Download notes as PDF
  const downloadNotesAsPDF = () => {
    if (notes.length === 0) {
      setMessage({ type: 'error', text: 'No notes to download' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setMessage({ type: 'error', text: 'Please allow popups to download PDF' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    const notesHTML = notes.map(note => `
      <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h2 style="margin: 0; color: #1e3a5f; font-size: 18px;">${note.title}</h2>
          <span style="color: #666; font-size: 12px;">${note.date}</span>
        </div>
        <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.6;">${note.content}</p>
      </div>
    `).join('');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Notes - ${lawyerName}</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 40px; 
            max-width: 800px; 
            margin: 0 auto;
            background: #fff;
          }
          h1 { 
            color: #1e3a5f; 
            border-bottom: 3px solid #3b82f6; 
            padding-bottom: 15px; 
            margin-bottom: 30px;
          }
          .header-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            color: #666;
          }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <h1>📝 Daily Notes</h1>
        <div class="header-info">
          <span><strong>Lawyer:</strong> ${lawyerName}</span>
          <span><strong>Generated:</strong> ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>
        ${notesHTML}
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Load bookings for this lawyer from localStorage
  useEffect(() => {
    const loadBookings = () => {
      const allBookings = localStorage.getItem('bookings');
      if (allBookings) {
        const bookingsData = JSON.parse(allBookings) as BookingRequest[];
        const lawyerBookings = bookingsData.filter((b) => b.lawyerId === lawyerId);
        setBookings(lawyerBookings);
        console.log('LawyerDashboard - Loaded bookings for lawyer:', lawyerId, 'Found:', lawyerBookings.length);
      }
    };
    
    // Initial load
    loadBookings();
    
    // Auto-refresh every 5 seconds to catch new bookings
    const interval = setInterval(loadBookings, 5000);
    
    // Listen for storage changes (when user books from another tab/component)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bookings') {
        loadBookings();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom booking events (same tab)
    const handleBookingCreated = () => {
      loadBookings();
    };
    window.addEventListener('bookingCreated', handleBookingCreated);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bookingCreated', handleBookingCreated);
    };
  }, [lawyerId]);

  const handleApprove = (bookingId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'approved' as const, respondedAt: Date.now() } : b
      );
      setBookings(updatedBookings);

      // Update localStorage
      const allBookings = localStorage.getItem('bookings');
      if (allBookings) {
        const bookingsData = JSON.parse(allBookings);
        const updated = bookingsData.map((b: BookingRequest) =>
          b.id === bookingId ? { ...b, status: 'approved', respondedAt: Date.now() } : b
        );
        localStorage.setItem('bookings', JSON.stringify(updated));

        // Send notification to user
        const booking = bookingsData.find((b: BookingRequest) => b.id === bookingId);
        if (booking) {
          const userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
          userMessages.push({
            id: 'msg-' + Date.now(),
            userId: booking.userId,
            type: 'booking_approved',
            title: 'Booking Approved',
            message: `✅ Your booking with ${lawyerName} has been approved! They will contact you shortly to discuss your case.`,
            read: false,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('userMessages', JSON.stringify(userMessages));
        }
      }

      setMessage({ type: 'success', text: 'Booking approved! Notification sent to user.' });
      setTimeout(() => setMessage(null), 3000);
      setIsProcessing(false);
    }, 500);
  };

  const handleReject = (bookingId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'rejected' as const, respondedAt: Date.now() } : b
      );
      setBookings(updatedBookings);

      // Update localStorage
      const allBookings = localStorage.getItem('bookings');
      if (allBookings) {
        const bookingsData = JSON.parse(allBookings);
        const updated = bookingsData.map((b: BookingRequest) =>
          b.id === bookingId ? { ...b, status: 'rejected', respondedAt: Date.now() } : b
        );
        localStorage.setItem('bookings', JSON.stringify(updated));

        // Send notification to user
        const booking = bookingsData.find((b: BookingRequest) => b.id === bookingId);
        if (booking) {
          const userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
          userMessages.push({
            id: 'msg-' + Date.now(),
            userId: booking.userId,
            type: 'booking_rejected',
            title: 'Booking Rejected',
            message: `❌ Your booking with ${lawyerName} has been rejected. You may explore other lawyers or contact for more information.`,
            read: false,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('userMessages', JSON.stringify(userMessages));
        }
      }

      setMessage({ type: 'success', text: 'Booking rejected. Notification sent to user.' });
      setTimeout(() => setMessage(null), 3000);
      setIsProcessing(false);
    }, 500);
  };

  const filteredBookings =
    filterStatus === 'all'
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  // Apply search filter
  const searchedBookings = searchQuery
    ? filteredBookings.filter(
        (b) =>
          b.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.caseType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredBookings;

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  };

  // Response rate calculation
  const responseRate = stats.total > 0 
    ? Math.round(((stats.approved + stats.rejected) / stats.total) * 100) 
    : 0;

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  // Refresh bookings
  const refreshBookings = () => {
    const allBookings = localStorage.getItem('bookings');
    if (allBookings) {
      const bookingsData = JSON.parse(allBookings) as BookingRequest[];
      const lawyerBookings = bookingsData.filter((b) => b.lawyerId === lawyerId);
      setBookings(lawyerBookings);
    }
    setMessage({ type: 'success', text: 'Bookings refreshed!' });
    setTimeout(() => setMessage(null), 2000);
  };

  // Save UPI ID
  const saveUpiId = () => {
    if (!upiId.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid UPI ID' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    setUpiSaving(true);
    setTimeout(() => {
      const lawyers = JSON.parse(localStorage.getItem('lawyers') || '[]');
      const updatedLawyers = lawyers.map((l: any) => 
        l.id === lawyerId ? { ...l, upiId: upiId.trim() } : l
      );
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
      
      setMessage({ type: 'success', text: 'UPI ID saved successfully! Users will see this when booking.' });
      setTimeout(() => setMessage(null), 3000);
      setUpiSaving(false);
      setShowUpiSection(false);
    }, 500);
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-20 ${theme.header} border-b shadow-md transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900/50' : 'bg-indigo-100'}`}>
                <Shield className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-indigo-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme.headerText}`}>Lawyer Dashboard</h1>
                <p className={`text-sm ${theme.headerSub} flex items-center gap-2`}>
                  <Award className="w-4 h-4" />
                  {lawyerName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Date & Time */}
              <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-slate-100'}`}>
                <Calendar className={`w-4 h-4 ${theme.textMuted}`} />
                <span className={`text-sm font-medium ${theme.text}`}>{formatDate(currentTime)}</span>
                <span className={`text-sm ${theme.textMuted}`}>•</span>
                <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-indigo-600'}`}>{formatTime(currentTime)}</span>
              </div>

              {/* Refresh Button */}
              <button
                onClick={refreshBookings}
                className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                title="Refresh Bookings"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Notes Button */}
              <button
                onClick={() => setShowNotesSection(!showNotesSection)}
                className={`p-2 rounded-lg transition-all ${showNotesSection ? 'bg-purple-600 text-white' : isDark ? 'bg-gray-700 hover:bg-gray-600 text-purple-400' : 'bg-slate-100 hover:bg-slate-200 text-purple-600'}`}
                title="Daily Notes"
              >
                <NotebookPen className="w-5 h-5" />
              </button>

              {/* UPI Settings Button */}
              <button
                onClick={() => setShowUpiSection(!showUpiSection)}
                className={`p-2 rounded-lg transition-all ${showUpiSection ? 'bg-emerald-600 text-white' : isDark ? 'bg-gray-700 hover:bg-gray-600 text-emerald-400' : 'bg-slate-100 hover:bg-slate-200 text-emerald-600'}`}
                title="UPI Payment Settings"
              >
                <Wallet className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notification Bell */}
              <button
                className={`p-2 rounded-lg relative transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {stats.pending > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {stats.pending}
                  </span>
                )}
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border-2 flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-semibold">{message.text}</span>
          </div>
        )}

        {/* Notes Section */}
        {showNotesSection && (
          <div className={`mb-6 p-6 rounded-xl border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                  <NotebookPen className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${theme.text}`}>Daily Notes</h3>
                  <p className={`text-sm ${theme.textMuted}`}>Keep track of your daily activities and reminders</p>
                </div>
              </div>
              <button
                onClick={downloadNotesAsPDF}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                title="Download notes as PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </div>
            
            {/* Add New Note */}
            <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
              <h4 className={`text-sm font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                <Plus className="w-4 h-4" /> Add New Note
              </h4>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title..."
                className={`w-full px-4 py-2 rounded-lg border-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${theme.input} transition-colors`}
              />
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write your note here..."
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${theme.input} transition-colors resize-none`}
              />
              <button
                onClick={addNote}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
              >
                <Plus className="w-4 h-4" /> Add Note
              </button>
            </div>
            
            {/* Notes List */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {notes.length === 0 ? (
                <div className={`text-center py-8 ${theme.textMuted}`}>
                  <NotebookPen className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No notes yet. Start by adding your first note!</p>
                </div>
              ) : (
                notes.map(note => (
                  <div 
                    key={note.id} 
                    className={`p-4 rounded-lg border-2 ${isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-white border-gray-200'} transition-all`}
                  >
                    {editingNoteId === note.id ? (
                      // Edit Mode
                      <div>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme.input}`}
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 rounded-lg border-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme.input} resize-none`}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={saveEditedNote}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${isDark ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className={`font-bold ${theme.text}`}>{note.title}</h4>
                            <p className={`text-xs ${theme.textMuted}`}>{note.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditNote(note)}
                              className={`p-1.5 rounded-lg transition-all ${isDark ? 'hover:bg-gray-600 text-blue-400' : 'hover:bg-gray-100 text-blue-600'}`}
                              title="Edit note"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className={`p-1.5 rounded-lg transition-all ${isDark ? 'hover:bg-gray-600 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}
                              title="Delete note"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className={`text-sm ${theme.textMuted} whitespace-pre-wrap`}>{note.content}</p>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* UPI Settings Section */}
        {showUpiSection && (
          <div className={`mb-6 p-6 rounded-xl border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
                <Wallet className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${theme.text}`}>Payment Settings</h3>
                <p className={`text-sm ${theme.textMuted}`}>Set your UPI ID to receive booking payments</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className={`block text-sm font-semibold ${theme.textMuted} mb-2`}>Your UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi or yourname@paytm"
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${theme.input} transition-colors`}
                />
                <p className={`text-xs ${theme.textMuted} mt-1`}>
                  💡 This UPI ID will be shown to users when they book your services
                </p>
              </div>
              <div className="flex items-end">
                <button
                  onClick={saveUpiId}
                  disabled={upiSaving}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    upiSaving
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {upiSaving ? 'Saving...' : 'Save UPI ID'}
                </button>
              </div>
            </div>
            
            {upiId && (
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-emerald-900/30 border border-emerald-700' : 'bg-emerald-50 border border-emerald-200'}`}>
                <p className={`text-sm ${theme.textMuted}`}>
                  <span className="font-semibold">Current UPI ID:</span>{' '}
                  <span className={`font-mono ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{upiId}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Debug Info - shows lawyer ID for troubleshooting */}
        {bookings.length === 0 && (
          <div className={`mb-6 p-4 rounded-xl border-2 ${isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
            <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              <span className="font-semibold">🔍 Debug Info:</span> Your Lawyer ID is <code className="bg-black/20 px-2 py-0.5 rounded">{lawyerId}</code>
            </p>
            <p className={`text-xs ${theme.textMuted} mt-1`}>
              When users book you, their booking's lawyerId must match this ID. If bookings aren't showing, verify the same lawyer account is used.
            </p>
            <p className={`text-xs ${theme.textMuted} mt-1`}>
              💡 Bookings auto-refresh every 5 seconds. You can also click the refresh button.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className={`rounded-xl p-5 border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} font-semibold text-sm`}>Total Bookings</p>
                <p className={`text-3xl font-bold ${theme.text} mt-2`}>{stats.total}</p>
              </div>
              <MessageCircle className={`w-10 h-10 ${isDark ? 'text-indigo-400' : 'text-indigo-600'} opacity-30`} />
            </div>
          </div>

          <div className={`rounded-xl p-5 border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} font-semibold text-sm`}>Pending</p>
                <p className="text-3xl font-bold text-amber-500 mt-2">{stats.pending}</p>
              </div>
              <Clock className="w-10 h-10 text-amber-500 opacity-30" />
            </div>
          </div>

          <div className={`rounded-xl p-5 border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} font-semibold text-sm`}>Approved</p>
                <p className="text-3xl font-bold text-green-500 mt-2">{stats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500 opacity-30" />
            </div>
          </div>

          <div className={`rounded-xl p-5 border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} font-semibold text-sm`}>Rejected</p>
                <p className="text-3xl font-bold text-red-500 mt-2">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500 opacity-30" />
            </div>
          </div>

          <div className={`rounded-xl p-5 border-2 ${theme.card} ${theme.cardHover} transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.textMuted} font-semibold text-sm`}>Response Rate</p>
                <p className={`text-3xl font-bold mt-2 ${responseRate >= 80 ? 'text-green-500' : responseRate >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {responseRate}%
                </p>
              </div>
              <TrendingUp className={`w-10 h-10 ${responseRate >= 80 ? 'text-green-500' : responseRate >= 50 ? 'text-amber-500' : 'text-red-500'} opacity-30`} />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
            <input
              type="text"
              placeholder="Search by name, email, case type, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input} transition-colors`}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all border-2 ${
                  filterStatus === status
                    ? theme.filterActive
                    : theme.filterInactive
                }`}
              >
                {status === 'all' && '📋 '}
                {status === 'pending' && '⏳ '}
                {status === 'approved' && '✅ '}
                {status === 'rejected' && '❌ '}
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && ` (${stats[status]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className={`mb-4 text-sm ${theme.textMuted}`}>
            Found <span className="font-bold">{searchedBookings.length}</span> result{searchedBookings.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        {/* Bookings List */}
        {searchedBookings.length === 0 ? (
          <div className={`text-center py-16 rounded-xl border-2 ${theme.emptyBg} transition-colors`}>
            <MessageCircle className={`w-16 h-16 ${theme.iconMuted} mx-auto mb-4 opacity-50`} />
            <h3 className={`text-xl font-bold ${theme.text} mb-2`}>No Bookings Found</h3>
            <p className={theme.textMuted}>
              {searchQuery
                ? `No bookings match "${searchQuery}". Try a different search term.`
                : filterStatus === 'all'
                ? 'No booking requests yet. Check back later!'
                : `No ${filterStatus} bookings at the moment.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchedBookings.map((booking) => (
              <BookingRequestCard
                key={booking.id}
                booking={booking}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={isProcessing}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LawyerDashboard;
