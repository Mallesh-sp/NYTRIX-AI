/**
 * ============================================================
 * NYTRIX AI - TERMS OF SERVICE PAGE
 * Professional terms and conditions for the platform
 * ============================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, CheckCircle, XCircle, Shield, AlertTriangle, Gavel, Scale, Calendar, Mail } from 'lucide-react';

interface TermsOfServiceProps {
  onBack?: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  const sections = [
    {
      icon: CheckCircle,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using NYTRIX AI, you agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, you must not use the platform.",
        "We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms.",
        "Users must be at least 18 years old or have parental consent to use this platform."
      ]
    },
    {
      icon: Scale,
      title: "2. Platform Usage Terms",
      content: [
        "NYTRIX AI provides AI-powered legal information and lawyer connection services.",
        "The platform is designed for legal awareness and education purposes in India.",
        "Users may access legal information, connect with verified lawyers, and use AI analysis features.",
        "All features are subject to availability and may be modified or discontinued at our discretion.",
        "Premium features may require subscription or payment as specified on the platform."
      ]
    },
    {
      icon: Shield,
      title: "3. User Responsibilities",
      content: [
        "Provide accurate and truthful information when registering and using the platform.",
        "Maintain the confidentiality of your account credentials.",
        "Use the platform only for lawful purposes related to legal awareness and assistance.",
        "Respect the intellectual property rights of NYTRIX AI and third parties.",
        "Report any security vulnerabilities or suspicious activities immediately.",
        "Not impersonate any person or entity or misrepresent your affiliation."
      ]
    },
    {
      icon: XCircle,
      title: "4. Prohibited Activities",
      content: [
        "Using the platform for any illegal or unauthorized purpose.",
        "Attempting to hack, disrupt, or compromise platform security.",
        "Uploading malicious code, viruses, or harmful content.",
        "Harassing, threatening, or defaming other users or lawyers.",
        "Scraping, data mining, or automated access without permission.",
        "Creating multiple accounts or sharing account access.",
        "Using the platform to commit fraud or deceive others.",
        "Violating any applicable local, state, national, or international law."
      ]
    },
    {
      icon: FileText,
      title: "5. Intellectual Property",
      content: [
        "All content, features, and functionality on NYTRIX AI are owned by R. Jainithil and protected by intellectual property laws.",
        "The NYTRIX AI name, logo, and branding are trademarks of the platform.",
        "Users may not reproduce, distribute, or create derivative works without written permission.",
        "User-generated content remains the property of users, but grants NYTRIX AI a license to use for platform improvement.",
        "AI-generated legal insights are provided for informational purposes and may not be reproduced commercially."
      ]
    },
    {
      icon: AlertTriangle,
      title: "6. Account Suspension & Termination",
      content: [
        "We reserve the right to suspend or terminate accounts that violate these terms.",
        "Suspension may occur without prior notice for serious violations.",
        "Users may request account deletion at any time through platform settings.",
        "Upon termination, access to platform features and data will be revoked.",
        "We may retain certain data as required by law or for legitimate business purposes."
      ]
    },
    {
      icon: Shield,
      title: "7. Limitation of Liability",
      content: [
        "NYTRIX AI provides information 'as is' without warranties of any kind.",
        "We are not liable for any direct, indirect, incidental, or consequential damages arising from platform use.",
        "The platform does not guarantee the accuracy, completeness, or reliability of legal information.",
        "Users are responsible for verifying information and seeking professional legal advice.",
        "Our total liability shall not exceed the amount paid by you for platform services, if any."
      ]
    },
    {
      icon: Gavel,
      title: "8. Governing Law & Jurisdiction",
      content: [
        "These Terms of Service are governed by the laws of India.",
        "Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Tamil Nadu, India.",
        "Users agree to resolve disputes through arbitration before pursuing litigation, where applicable.",
        "If any provision of these terms is found unenforceable, remaining provisions shall continue in effect."
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
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Terms of Service</h1>
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
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Please read these Terms of Service carefully before using NYTRIX AI.
            By using our platform, you agree to comply with and be bound by these terms.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-purple-400">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: February 15, 2026</span>
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
              className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="text-purple-400 mt-1">•</span>
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
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 text-center"
        >
          <Mail className="w-8 h-8 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Questions About Terms?</h3>
          <p className="text-slate-400 text-sm mb-4">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <a
            href="mailto:nytrixaiindia@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
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

export default TermsOfService;
