import React, { useState } from 'react';
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
  Sparkles
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

  return (
    <div className="min-h-screen bg-[#0a0d14] flex">
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
      <div className="flex-1 flex flex-col min-h-screen h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0a0d14]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Nytrix AI</span>
            </div>

            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-400">
                {currentUser?.email?.charAt(0).toUpperCase() || 'G'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 h-full flex flex-col min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
