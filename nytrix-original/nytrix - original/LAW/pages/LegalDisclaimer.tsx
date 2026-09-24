/**
 * ============================================================
 * NYTRIX AI - LEGAL DISCLAIMER PAGE
 * Professional legal disclaimer for the platform
 * ============================================================
 */


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Scale, Info, Shield, Users, Gavel, Heart, Calendar, Mail, ChevronDown, Check } from 'lucide-react';
import { disclaimerTranslations } from './LegalDisclaimerTranslations';

const LANGUAGES = [
  { code: 'english', label: 'English' },
  { code: 'hindi', label: 'हिन्दी' },
  { code: 'tamil', label: 'தமிழ்' },
  { code: 'telugu', label: 'తెలుగు' },
  { code: 'kannada', label: 'ಕನ್ನಡ' },
  { code: 'malayalam', label: 'മലയാളം' },
  { code: 'bengali', label: 'বাংলা' },
  { code: 'marathi', label: 'मराठी' },
  { code: 'gujarati', label: 'ગુજરાતી' },
  { code: 'punjabi', label: 'ਪੰਜਾਬੀ' },
  { code: 'urdu', label: 'اردو' },
  { code: 'odia', label: 'ଓଡ଼ିଆ' },
  { code: 'assamese', label: 'অসমীয়া' },
  { code: 'sanskrit', label: 'संस्कृतम्' },
  { code: 'konkani', label: 'Konkani' },
  { code: 'manipuri', label: 'Manipuri' },
  { code: 'nepali', label: 'Nepali' },
  { code: 'bodo', label: 'Bodo' },
  { code: 'dogri', label: 'Dogri' },
  { code: 'maithili', label: 'Maithili' },
  { code: 'santhali', label: 'Santhali' },
  { code: 'kashmiri', label: 'Kashmiri' },
  { code: 'sindhi', label: 'Sindhi' },
];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] via-[#0d1225] to-[#050709]">
      {/* Header + Language Selector */}
      <div className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">{t.hero?.title || 'Legal Disclaimer'}</h1>
          </div>
          {/* Language Dropdown */}
          <div className="relative lang-dropdown">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 hover:bg-slate-700/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-label="Select Language"
            >
              <span className="font-semibold text-sm">
                {LANGUAGES.find(l => l.code === language)?.label || 'English'}
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
                  className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto bg-[#181e2a] border border-slate-700/70 rounded-xl shadow-xl z-50 py-2 lang-dropdown"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code}>
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-left text-sm rounded-lg transition-all hover:bg-slate-700/60 focus:bg-slate-700/80 ${
                          language === lang.code ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-200'
                        }`}
                        onClick={() => { setLanguage(lang.code); setDropdownOpen(false); }}
                        aria-current={language === lang.code}
                      >
                        {language === lang.code && <Check className="w-4 h-4 text-amber-400" />}
                        <span>{lang.label}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                {sections?.importantNotice?.content}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-amber-400">
                <Calendar className="w-4 h-4" />
                <span>{t.effectiveDate}</span>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mb-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-300 mb-2">{sections?.importantNotice?.heading}</h3>
                  <p className="text-amber-200/80 text-sm leading-relaxed">
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
                      highlight
                        ? 'bg-slate-900/70 border-amber-500/30 hover:border-amber-400/50'
                        : 'bg-slate-900/50 border-slate-800/50 hover:border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${highlight ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className={`text-lg font-bold ${highlight ? 'text-amber-300' : 'text-white'}`}>
                        {section?.heading}
                      </h2>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed pl-12">
                      {section?.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Additional Notices */}
            <div className="mt-8 bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                {sections?.additionalNotices?.heading}
              </h3>
              <ul className="space-y-3">
                {sections?.additionalNotices?.list?.map((notice: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-cyan-400 mt-0.5">⚠</span>
                    {notice}
                  </li>
                ))}
              </ul>
            </div>

            {/* User Acknowledgment */}
            <div className="mt-8 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">{sections?.userAcknowledgment?.heading}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {sections?.userAcknowledgment?.content}
              </p>
            </div>

            {/* Contact */}
            <div className="mt-12 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{sections?.contact?.heading}</h3>
              <p className="text-slate-400 text-sm mb-4">
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
            <div className="mt-12 pt-8 border-t border-slate-800/50 text-center">
              <p className="text-slate-500 text-sm">
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
