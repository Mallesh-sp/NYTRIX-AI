import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Zap, 
  BookOpen, 
  Users, 
  FileText, 
  AlertCircle, 
  Award, 
  Shield,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Sparkles,
  Clock,
  Calendar,
  Bell,
  Settings,
  Wifi,
  WifiOff,
  HelpCircle,
  MessageSquare,
  Star,
  TrendingUp
} from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface Props {
  navItems: NavItem[];
  currentPage: string;
  onNavigate: (id: string) => void;
  currentUser?: { email?: string; role?: string } | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const SidebarLayout: React.FC<Props> = ({ 
  navItems, 
  currentPage, 
  onNavigate, 
  currentUser, 
  onLogout,
  children 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{id: string; text: string; time: string; read: boolean}[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionStart] = useState(() => {
    const saved = sessionStorage.getItem('sessionStart');
    return saved ? new Date(saved) : new Date();
  });
  const [sessionDuration, setSessionDuration] = useState('0m');

  // Save session start
  useEffect(() => {
    sessionStorage.setItem('sessionStart', sessionStart.toISOString());
  }, [sessionStart]);

  // Update session duration
  useEffect(() => {
    const updateDuration = () => {
      const diff = Math.floor((Date.now() - sessionStart.getTime()) / 1000);
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      if (hours > 0) {
        setSessionDuration(`${hours}h ${minutes}m`);
      } else {
        setSessionDuration(`${minutes}m`);
      }
    };
    updateDuration();
    const timer = setInterval(updateDuration, 60000);
    return () => clearInterval(timer);
  }, [sessionStart]);

  // Live clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Online/Offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('userNotifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: any) => !n.read).length);
    } else {
      // Default welcome notification
      const defaultNotifications = [
        { id: '1', text: 'Welcome to NYTRIX AI India! Start analyzing your legal documents.', time: new Date().toISOString(), read: false },
      ];
      setNotifications(defaultNotifications);
      setUnreadCount(1);
      localStorage.setItem('userNotifications', JSON.stringify(defaultNotifications));
    }
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short'
    });
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('userNotifications', JSON.stringify(updated));
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem('userNotifications', JSON.stringify([]));
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0a0d14] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 280,
          x: sidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        className={`sidebar-fixed lg:relative z-50 flex flex-col bg-[#0f1219] border-r border-white/[0.06] transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ width: collapsed ? 80 : 280 }}
      >
        {/* Logo Header */}
        <div className={`p-4 border-b border-white/[0.06] ${collapsed ? 'px-2' : 'px-4'}`}>
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 cursor-pointer flex-shrink-0"
              onClick={() => onNavigate('landing')}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <h1 className="text-sm font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight whitespace-nowrap">
                  NYTRIX AI INDIA
                </h1>
                <p className="text-[9px] text-slate-500 font-medium uppercase tracking-[0.1em] whitespace-nowrap">
                  Legal Intelligence
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Date & Time Display */}
        <div className={`px-3 py-3 border-b border-white/[0.06] ${collapsed ? 'px-2' : ''}`}>
          {!collapsed ? (
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-3 border border-blue-500/20">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-lg font-bold text-white">{formatTime(currentTime)}</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{formatDate(currentTime)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-bold text-white">{formatTime(currentTime).split(' ')[0]}</span>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="px-3 py-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-lg transition-all ${
                    showNotifications 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
                
                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute left-0 top-12 w-72 bg-[#1a1f2e] rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/10 flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">Notifications</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={markAllRead}
                            className="text-[10px] text-blue-400 hover:underline"
                          >
                            Mark all read
                          </button>
                          <button 
                            onClick={clearNotifications}
                            className="text-[10px] text-slate-400 hover:text-red-400"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-slate-500 text-sm">
                            No notifications
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div 
                              key={notif.id}
                              className={`p-3 border-b border-white/5 hover:bg-white/5 ${
                                !notif.read ? 'bg-blue-500/5' : ''
                              }`}
                            >
                              <p className="text-xs text-slate-300">{notif.text}</p>
                              <p className="text-[10px] text-slate-500 mt-1">
                                {new Date(notif.time).toLocaleString('en-IN')}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Help */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('disclaimer')}
                className="p-2 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Help & Legal Info"
              >
                <HelpCircle className="w-4 h-4" />
              </motion.button>

              {/* Feedback */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const feedback = prompt('Share your feedback with us:');
                  if (feedback) {
                    const savedFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
                    savedFeedback.push({ 
                      text: feedback, 
                      user: currentUser?.email || 'Guest',
                      time: new Date().toISOString() 
                    });
                    localStorage.setItem('userFeedback', JSON.stringify(savedFeedback));
                    alert('Thank you for your feedback!');
                  }
                }}
                className="p-2 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Send Feedback"
              >
                <MessageSquare className="w-4 h-4" />
              </motion.button>

              {/* Rate App */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const rating = prompt('Rate NYTRIX AI (1-5 stars):');
                  if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                    localStorage.setItem('userRating', rating);
                    alert(`Thank you for rating us ${rating} stars!`);
                  }
                }}
                className="p-2 rounded-lg bg-white/[0.04] text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                title="Rate App"
              >
                <Star className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const isAI = item.id === 'analyzer';
            
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isAI 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                    : isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/15 text-white border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className={`w-5 h-5 flex-shrink-0 ${isActive || isAI ? 'opacity-100' : 'opacity-60'}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={`p-3 border-t border-white/[0.06] ${collapsed ? 'px-2' : 'px-3'}`}>
          {/* Session Duration */}
          {!collapsed && (
            <div className="flex items-center justify-between px-2 py-1.5 mb-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-green-400 font-medium">Session</span>
              </div>
              <span className="text-xs font-bold text-green-400">{sessionDuration}</span>
            </div>
          )}
          
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 mb-2 rounded-xl bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-400">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'G'}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {currentUser?.email || 'Guest'}
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-medium">
                  {currentUser?.role || 'User'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-400">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'G'}
                </span>
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </motion.button>

          {/* Collapse Toggle - Desktop only */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 mt-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-all"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && <span className="text-xs">Collapse</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex-shrink-0 bg-[#0a0d14]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              {/* Date Time on Mobile */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-white">{formatTime(currentTime)}</span>
                <span className="text-[9px] text-slate-400">{formatDate(currentTime)}</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Online Status Indicator */}
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
              {/* Mobile Notification Bell */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-white/[0.05] text-white"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-400">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'G'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Mobile Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 bg-[#1a1f2e] rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">Notifications</span>
                  <button 
                    onClick={() => { markAllRead(); setShowNotifications(false); }}
                    className="text-[10px] text-blue-400"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No notifications
                    </div>
                  ) : (
                    notifications.slice(0, 3).map(notif => (
                      <div key={notif.id} className="p-3 border-b border-white/5">
                        <p className="text-xs text-slate-300">{notif.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Page Content - Fixed container, content scrolls inside */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
