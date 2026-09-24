/**
 * ============================================================
 * NYTRIX AI - PRIVACY POLICY PAGE
 * Professional legal privacy policy for the platform
 * ============================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Lock, Eye, Database, Cookie, Users, Mail, Calendar } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content: [
        "Personal Information: When you register on NYTRIX AI, we collect your name, email address, phone number, and location to provide personalized legal assistance.",
        "Usage Data: We automatically collect information about how you interact with our platform, including pages visited, features used, and time spent on the platform.",
        "Device Information: We collect device type, operating system, browser type, and IP address for security and optimization purposes.",
        "Legal Queries: The legal situations and questions you submit are processed to provide relevant legal information and connect you with appropriate lawyers."
      ]
    },
    {
      icon: Lock,
      title: "2. How We Protect Your Data",
      content: [
        "All data transmissions are encrypted using industry-standard SSL/TLS encryption protocols.",
        "We implement strict access controls and authentication measures to protect your personal information.",
        "Our servers are hosted in secure data centers with 24/7 monitoring and regular security audits.",
        "We do not sell, trade, or share your personal information with third parties for marketing purposes.",
        "Regular security assessments and penetration testing are conducted to identify and address vulnerabilities."
      ]
    },
    {
      icon: Cookie,
      title: "3. Use of Cookies",
      content: [
        "Essential Cookies: Required for the platform to function properly, including authentication and session management.",
        "Analytics Cookies: Help us understand how users interact with NYTRIX AI to improve our services.",
        "Preference Cookies: Remember your settings and preferences for a better user experience.",
        "You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality."
      ]
    },
    {
      icon: Users,
      title: "4. Third-Party Services",
      content: [
        "We use Google Analytics to analyze platform usage and improve our services.",
        "Payment processing is handled by secure, PCI-DSS compliant third-party providers.",
        "Lawyer verification services may involve third-party background check providers.",
        "AI processing utilizes Google's Gemini API with strict data handling protocols.",
        "All third-party services are bound by confidentiality agreements and data protection requirements."
      ]
    },
    {
      icon: Eye,
      title: "5. Your Rights",
      content: [
        "Access: You have the right to request a copy of your personal data held by NYTRIX AI.",
        "Correction: You can request correction of any inaccurate or incomplete personal information.",
        "Deletion: You may request deletion of your account and associated personal data.",
        "Portability: You can request your data in a structured, commonly used format.",
        "Objection: You have the right to object to certain processing of your personal data."
      ]
    },
    {
      icon: Shield,
      title: "6. Data Retention",
      content: [
        "Active account data is retained as long as your account remains active.",
        "Legal query history is retained for 2 years to provide continuity of service.",
        "Upon account deletion, personal data is removed within 30 days, except where retention is required by law.",
        "Anonymized usage data may be retained indefinitely for analytics and platform improvement."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] via-[#0d1225] to-[#050709]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            At NYTRIX AI, we are committed to protecting your privacy and ensuring the security of your personal information.
            This policy explains how we collect, use, and safeguard your data.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-cyan-400">
            <Calendar className="w-4 h-4" />
            <span>Effective Date: February 15, 2026</span>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="text-cyan-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 text-center"
        >
          <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Questions About Privacy?</h3>
          <p className="text-slate-400 text-sm mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us.
          </p>
          <a
            href="mailto:nytrixaiindia@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <Mail className="w-4 h-4" />
            nytrixaiindia@gmail.com
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 NYTRIX AI. Created & Owned by R. Jainithil
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
