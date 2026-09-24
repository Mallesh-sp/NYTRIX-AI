/**
 * ============================================================
 * NYTRIX AI - LEGAL DISCLAIMER PAGE
 * Professional legal disclaimer for the platform
 * ============================================================
 */


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Scale, Info, Shield, Users, Gavel, Heart, Calendar, Mail, ChevronDown, Check, Sun, Moon } from 'lucide-react';
import { disclaimerTranslations } from './LegalDisclaimerTranslations';

// Theme hook with localStorage persistence
const useTheme = (storageKey: string = 'nytrix-disclaimer-theme') => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
  }, [isDark, storageKey]);

  return { isDark, toggleTheme: () => setIsDark(!isDark) };
};

// Only languages with available translations
const LANGUAGES = [
  { code: 'english', label: 'English', flag: '🇬🇧' },
  { code: 'hindi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tamil', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'telugu', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kannada', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'malayalam', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'bengali', label: 'বাংলা', flag: '🇮🇳' },
  { code: 'marathi', label: 'मराठी', flag: '🇮🇳' },
].filter(lang => disclaimerTranslations[lang.code]);

const ICONS = [Info, Scale, Users, Shield, Gavel, Heart];

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('nytrix-disclaimer-lang');
    if (stored && disclaimerTranslations[stored]) return stored;
  }
  return 'english';
};

const LegalDisclaimer: React.FC = () => {
  const [language, setLanguage] = useState(getInitialLanguage());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme('nytrix-disclaimer-theme');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nytrix-disclaimer-lang', language);
    }
  }, [language]);

  const t = disclaimerTranslations[language] || disclaimerTranslations['english'];
  const sections = t.sections;

  // For smooth dropdown close on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) setDropdownOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  // Theme classes
  const theme = {
    bg: isDark ? 'bg-gradient-to-b from-[#0B0F1A] via-[#0d1225] to-[#050709]' : 'bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300',
    headerBg: isDark ? 'bg-[#0B0F1A]/90 border-slate-800/50' : 'bg-slate-200/95 border-slate-400',
    textPrimary: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-700',
    textMuted: isDark ? 'text-slate-500' : 'text-slate-600',
    card: isDark ? 'bg-slate-900/70 border-slate-800/50 hover:border-slate-700/50' : 'bg-slate-100 border-slate-400 hover:border-slate-500 shadow-md',
    cardHighlight: isDark ? 'bg-slate-900/70 border-amber-500/30 hover:border-amber-400/50' : 'bg-amber-100 border-amber-500 hover:border-amber-600',
    iconBg: isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-300 text-slate-700',
    iconBgHighlight: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-200 text-amber-700',
    noticeBg: isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-100 border-amber-500',
    noticeText: isDark ? 'text-amber-300' : 'text-amber-800',
    noticeTextLight: isDark ? 'text-amber-200/80' : 'text-amber-700',
    additionalBg: isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-slate-200 border-slate-400',
    ackBg: isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50' : 'bg-gradient-to-br from-slate-200 to-slate-100 border-slate-400',
    contactBg: isDark ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20' : 'bg-gradient-to-br from-amber-200 to-orange-200 border-amber-500',
    dropdownBg: isDark ? 'bg-[#181e2a] border-slate-700/70' : 'bg-slate-100 border-slate-400',
    dropdownItem: isDark ? 'text-slate-200 hover:bg-slate-700/60' : 'text-slate-800 hover:bg-slate-300',
    dropdownSelected: isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-200 text-amber-800',
    buttonBg: isDark ? 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-700/80' : 'bg-slate-200 border-slate-500 text-slate-800 hover:bg-slate-300',
    footerText: isDark ? 'text-slate-500' : 'text-slate-600',
    footerBorder: isDark ? 'border-slate-800/50' : 'border-slate-400',
    cyanAccent: isDark ? 'text-cyan-400' : 'text-cyan-700',
  };

  return (
    <div className={`h-full overflow-y-auto ${theme.bg}`}>
      {/* Header + Language Selector + Theme Toggle */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b ${theme.headerBg}`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${theme.textPrimary}`}>{t.hero?.title || 'Legal Disclaimer'}</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${theme.buttonBg}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm font-medium hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>
            {/* Language Dropdown */}
            <div className="relative lang-dropdown">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${theme.buttonBg}`}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Select Language"
              >
                <span className="font-semibold text-sm">
                  {LANGUAGES.find(l => l.code === language)?.flag} {LANGUAGES.find(l => l.code === language)?.label || 'English'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className={`absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto border rounded-xl shadow-xl z-50 py-2 lang-dropdown ${theme.dropdownBg}`}
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    {LANGUAGES.map((lang) => (
                      <li key={lang.code}>
                        <button
                          className={`w-full flex items-center gap-2 px-4 py-2 text-left text-sm rounded-lg transition-all focus:bg-slate-700/80 ${
                            language === lang.code ? `${theme.dropdownSelected} font-bold` : theme.dropdownItem
                          }`}
                          onClick={() => { setLanguage(lang.code); setDropdownOpen(false); }}
                          aria-current={language === lang.code}
                        >
                          {language === lang.code && <Check className="w-4 h-4 text-amber-400" />}
                          <span>{lang.flag} {lang.label}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Hero */}
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${theme.textPrimary}`}>{t.title}</h1>
              <p className={`text-lg mb-2 ${theme.textSecondary}`}>{t.subtitle}</p>
              <p className={`max-w-2xl mx-auto text-sm ${theme.textMuted}`}>
                {t.hero?.description || sections?.importantNotice?.content}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-amber-400">
                <Calendar className="w-4 h-4" />
                <span>{t.effectiveDate}</span>
              </div>
            </div>

            {/* Important Notice */}
            <div className={`mb-8 p-6 border rounded-xl ${theme.noticeBg}`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${theme.noticeText}`}>{sections?.importantNotice?.heading}</h3>
                  <p className={`text-sm leading-relaxed ${theme.noticeTextLight}`}>
                    {sections?.importantNotice?.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="space-y-6">
              {["informationalPurpose","noLegalAdvice","noAttorneyClient","liabilityLimitation","lawyerDirectory","consultAdvocate"].map((key, idx) => {
                const section = sections?.[key];
                const Icon = ICONS[idx % ICONS.length];
                const highlight = key === "informationalPurpose" || key === "noLegalAdvice" || key === "consultAdvocate";
                return (
                  <div
                    key={key}
                    className={`border rounded-xl p-6 transition-all ${
                      highlight ? theme.cardHighlight : theme.card
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${highlight ? theme.iconBgHighlight : theme.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className={`text-lg font-bold ${highlight ? theme.noticeText : theme.textPrimary}`}>
                        {section?.heading}
                      </h2>
                    </div>
                    <p className={`text-sm leading-relaxed pl-12 ${theme.textSecondary}`}>
                      {section?.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Additional Notices */}
            <div className={`mt-8 border rounded-xl p-6 ${theme.additionalBg}`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme.textPrimary}`}>
                <Info className={`w-5 h-5 ${theme.cyanAccent}`} />
                {sections?.additionalNotices?.heading}
              </h3>
              <ul className="space-y-3">
                {sections?.additionalNotices?.list?.map((notice: string, idx: number) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${theme.textSecondary}`}>
                    <span className={`mt-0.5 ${theme.cyanAccent}`}>⚠</span>
                    {notice}
                  </li>
                ))}
              </ul>
            </div>

            {/* User Acknowledgment */}
            <div className={`mt-8 p-6 border rounded-xl ${theme.ackBg}`}>
              <h3 className={`text-lg font-bold mb-3 ${theme.textPrimary}`}>{sections?.userAcknowledgment?.heading}</h3>
              <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                {sections?.userAcknowledgment?.content}
              </p>
            </div>

            {/* Contact */}
            <div className={`mt-12 border rounded-xl p-6 text-center ${theme.contactBg}`}>
              <Mail className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className={`text-lg font-bold mb-2 ${theme.textPrimary}`}>{sections?.contact?.heading}</h3>
              <p className={`text-sm mb-4 ${theme.textSecondary}`}>
                {sections?.contact?.subtitle}
              </p>
              <a
                href={`mailto:${sections?.contact?.email}`}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                <Mail className="w-4 h-4" />
                {sections?.contact?.email}
              </a>
            </div>

            {/* Footer */}
            <div className={`mt-12 pt-8 border-t text-center ${theme.footerBorder}`}>
              <p className={`text-sm ${theme.footerText}`}>
                {t.footer}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
