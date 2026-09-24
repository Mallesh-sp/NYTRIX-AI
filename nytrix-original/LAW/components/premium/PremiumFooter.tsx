import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

interface PremiumFooterProps {
  onNavigate?: (page: string) => void;
}

const PremiumFooter: React.FC<PremiumFooterProps> = ({ onNavigate }) => {
  const footerLinks = {
    platform: [
      { label: 'AI Analysis', page: 'analyzer' },
      { label: 'Lawyer Directory', page: 'lawyers' },
      { label: 'Knowledge Base', page: 'knowledge' },
      { label: 'Evidence Checklist', page: 'evidence' }
    ],
    resources: [
      { label: 'Legal Concepts', page: 'knowledge' },
      { label: 'SDG Impact', page: 'sdg' },
      { label: 'How It Works', page: 'landing' },
      { label: 'Action Guide', page: 'guide' }
    ],
    legal: [
      { label: 'Privacy Policy', page: 'privacy' },
      { label: 'Terms of Service', page: 'terms' },
      { label: 'Legal Disclaimer', page: 'disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/nytrix_ai?igsh=ZnpkMTIwNmlyM2Vv', 
      label: 'Instagram',
      highlight: true 
    },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0B0F1A] to-[#050709] border-t border-slate-800/50">
      {/* Animated Glow effect */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Nytrix AI</h3>
                <p className="text-xs text-cyan-400/80 font-medium tracking-widest uppercase">Legal Empire</p>
              </div>
            </motion.div>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              India's most advanced AI-powered legal intelligence platform. 
              Empowering citizens with knowledge, connecting them with elite lawyers, 
              and transforming how legal challenges are approached.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    social.highlight 
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/30 text-pink-400 hover:text-white hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20' 
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, i) => (
                <li key={i}>
                  <motion.button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                    whileHover={{ x: 3 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <motion.button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                    whileHover={{ x: 3 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <motion.li 
                whileHover={{ x: 3 }}
              >
                <a 
                  href="mailto:nytrixaiindia@gmail.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-500" />
                  nytrixaiindia@gmail.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 text-slate-400 text-sm"
                whileHover={{ x: 3 }}
              >
                <MapPin className="w-4 h-4 text-cyan-500 mt-0.5" />
                <span>Theni, Tamil Nadu, India</span>
              </motion.li>
              <motion.li whileHover={{ x: 3 }}>
                <a 
                  href="https://www.instagram.com/nytrix_ai?igsh=ZnpkMTIwNmlyM2Vv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-pink-400 text-sm transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  @nytrix_ai
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          className="pt-8 border-t border-slate-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Branding */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-lg">
                NYTRIX AI <span className="text-cyan-400">–</span> <span className="text-slate-400 font-normal text-sm">Created & Owned by</span> <span className="text-cyan-400">MALLESH SP</span>
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Built by <span className="text-slate-400">Keseven</span>, <span className="text-slate-400">Manojkumar</span>, <span className="text-slate-400">Jainithil</span>
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link, i) => (
                <motion.button
                  key={i}
                  onClick={() => onNavigate?.(link.page)}
                  className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © 2026 NYTRIX AI. All rights reserved. |{' '}
              <span className="text-cyan-400">Powered by Advanced AI</span>
            </p>
            
            <a 
              href="https://www.instagram.com/nytrixaiindia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-pink-400 text-sm transition-colors group"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Follow us on Instagram
            </a>
          </div>
        </motion.div>

        {/* Legal notice */}
        <motion.div 
          className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            ⚖️ <strong className="text-slate-400">Legal Disclaimer:</strong> Nytrix AI provides general legal awareness and education. 
            It is NOT a substitute for professional legal advice. Always consult a qualified, registered advocate for your specific legal matters.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
