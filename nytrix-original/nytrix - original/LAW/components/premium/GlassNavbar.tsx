import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Menu, X, Sparkles } from 'lucide-react';

interface GlassNavbarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const GlassNavbar: React.FC<GlassNavbarProps> = ({ onNavigate, currentPage = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'analyzer', label: 'AI Analyzer' },
    { id: 'lawyers', label: 'Elite Lawyers' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'sdg', label: 'Impact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'py-2 bg-slate-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5' 
          : 'py-4 bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate?.('landing')}
          >
            <div className={`
              relative p-2 rounded-xl
              bg-gradient-to-br from-blue-600 to-cyan-500
              shadow-[0_0_20px_rgba(37,99,235,0.5)]
              group-hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]
              transition-all duration-300
              ${isScrolled ? 'scale-90' : 'scale-100'}
            `}>
              <Scale className="w-6 h-6 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-cyan-300 animate-pulse" />
            </div>
            <div className={`transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}`}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Nytrix AI
              </h1>
              <p className="text-[10px] text-cyan-400/80 font-medium tracking-widest uppercase">
                Legal Empire
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                onMouseEnter={() => setActiveHover(item.id)}
                onMouseLeave={() => setActiveHover(null)}
                className={`
                  relative px-4 py-2 rounded-lg
                  text-sm font-medium
                  transition-all duration-300
                  ${currentPage === item.id 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-white'
                  }
                `}
              >
                {/* Active/Hover indicator */}
                <span className={`
                  absolute inset-0 rounded-lg
                  bg-gradient-to-r from-blue-600/20 to-cyan-600/20
                  transition-opacity duration-300
                  ${currentPage === item.id || activeHover === item.id ? 'opacity-100' : 'opacity-0'}
                `} />
                
                {/* Gold active dot */}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                )}
                
                {/* Glowing underline on hover */}
                <span className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500
                  transition-all duration-300
                  shadow-[0_0_10px_rgba(0,245,255,0.5)]
                  ${activeHover === item.id && currentPage !== item.id ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
                `} />
                
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onNavigate?.('analyzer')}
              className="
                relative px-6 py-2.5 rounded-xl
                bg-gradient-to-r from-blue-600 to-cyan-500
                text-white font-semibold text-sm
                shadow-[0_0_20px_rgba(37,99,235,0.4)]
                hover:shadow-[0_0_30px_rgba(37,99,235,0.6),0_0_40px_rgba(0,245,255,0.3)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:scale-105
                overflow-hidden group
              "
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Start AI Analysis</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onNavigate?.(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full px-4 py-3 rounded-xl text-left
                      transition-colors duration-300
                      ${currentPage === item.id 
                        ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border-l-2 border-amber-400' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => {
                    onNavigate?.('analyzer');
                    setIsMobileMenuOpen(false);
                  }}
                  className="
                    w-full px-4 py-3 rounded-xl
                    bg-gradient-to-r from-blue-600 to-cyan-500
                    text-white font-semibold
                    mt-4
                  "
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start AI Analysis
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default GlassNavbar;
