import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Sparkles } from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

interface Props {
  navItems: NavItem[];
  currentPage: string;
  onNavigate: (id: string) => void;
  currentUser?: { email?: string; role?: string } | null;
  onLogout: () => void;
}

const EliteNavbar: React.FC<Props> = ({ 
  navItems, 
  currentPage, 
  onNavigate, 
  currentUser, 
  onLogout 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div 
          className={`max-w-[1400px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled 
              ? 'bg-[#0a0d14]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/20' 
              : 'bg-[#0f1419]/80 backdrop-blur-lg border border-white/[0.05]'
          }`}
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 cursor-pointer"
              onClick={() => onNavigate('landing')}
            >
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 hover:opacity-20 transition-opacity" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight">
                NYTRIX AI INDIA
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.15em]">
                Legal Intelligence
              </p>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-1.5 py-1 bg-white/[0.02] rounded-xl border border-white/[0.04]">
            {navItems.slice(0, 7).map((item, index) => {
              const isActive = currentPage === item.id;
              const isAI = item.id === 'analyzer';
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-250 flex items-center gap-2 ${
                    isAI 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
                      : isActive
                        ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/15 border border-blue-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.icon && (
                    <span className={`w-4 h-4 ${isActive || isAI ? 'opacity-100' : 'opacity-60'}`}>
                      {item.icon}
                    </span>
                  )}
                  <span className="whitespace-nowrap">{item.label}</span>
                  
                  {/* Active indicator dot */}
                  {isActive && !isAI && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400">
                    {currentUser?.email?.charAt(0).toUpperCase() || 'G'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-300 leading-tight max-w-[120px] truncate">
                    {currentUser?.email || 'Guest'}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wide">
                    {currentUser?.role || 'User'}
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 mx-auto max-w-[1400px] p-4 bg-[#0a0d14]/98 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl"
            >
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white border border-blue-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {item.icon && <span className="w-5 h-5 opacity-70">{item.icon}</span>}
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Mobile User Section */}
              <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-400">
                      {currentUser?.email?.charAt(0).toUpperCase() || 'G'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{currentUser?.email || 'Guest'}</p>
                    <p className="text-xs text-slate-500 uppercase">{currentUser?.role || 'User'}</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default EliteNavbar;
