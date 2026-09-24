import React, { useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';

interface LegalDisclaimerProps {
  isFullPage?: boolean;
}

const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ isFullPage = false }) => {
  const [isExpanded, setIsExpanded] = useState(isFullPage);

  if (isFullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-red-500/30 border border-red-400/30 p-4 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">Legal Disclaimer</h1>
            <p className="text-emerald-200">Important information about our platform</p>
          </div>

          {/* Disclaimer Content */}
          <div className="space-y-6">
            {/* Main Disclaimer */}
            <div className="bg-red-500/20 border-l-4 border-red-400 p-6 rounded-r-lg backdrop-blur">
              <h2 className="text-lg font-bold text-red-300 mb-3">General Disclaimer</h2>
              <p className="text-red-200 font-semibold text-lg mb-4">
                "This platform provides general legal awareness and guidance, NOT legal advice."
              </p>
              <p className="text-red-200 leading-relaxed mb-3">
                Nytrix AI's content is for informational and educational purposes only. This platform does not provide legal advice, and any information provided should not be construed as legal counsel.
              </p>
              <p className="text-red-200 leading-relaxed">
                <strong>Always consult a qualified, licensed lawyer before taking any legal action.</strong> The information on this platform is general in nature and may not address your specific situation.
              </p>
            </div>

            {/* Not a Substitute */}
            <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-6 rounded-lg backdrop-blur">
              <h2 className="text-lg font-bold text-emerald-100 mb-3">Not a Substitute for Legal Counsel</h2>
              <p className="text-emerald-200 leading-relaxed">
                This platform cannot replace the advice and guidance of a licensed attorney. Every legal situation is unique and requires personalized attention from a qualified legal professional.
              </p>
            </div>

            {/* Accuracy Disclaimer */}
            <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-6 rounded-lg backdrop-blur">
              <h2 className="text-lg font-bold text-emerald-100 mb-3">No Guarantee of Accuracy</h2>
              <p className="text-emerald-200 leading-relaxed">
                While we strive to provide accurate and updated information about Indian legal concepts, laws change frequently. We make no guarantee that the information is complete, accurate, or current.
              </p>
            </div>

            {/* Liability Limitation */}
            <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-6 rounded-lg backdrop-blur">
              <h2 className="text-lg font-bold text-emerald-100 mb-3">Limitation of Liability</h2>
              <p className="text-emerald-200 leading-relaxed mb-3">
                Nytrix AI, its creators, and contributors shall not be liable for:
              </p>
              <ul className="text-emerald-200 space-y-2 ml-4">
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Any direct, indirect, or consequential damages arising from the use of this platform</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Loss of income, profits, or business opportunities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Any legal consequences from actions taken based on platform information</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Technical errors or service interruptions</span>
                </li>
              </ul>
            </div>

            {/* Professional Consultation */}
            <div className="bg-teal-500/20 border border-teal-400/30 p-6 rounded-lg backdrop-blur">
              <h2 className="text-lg font-bold text-teal-200 mb-3">When to Consult a Lawyer</h2>
              <p className="text-teal-200 leading-relaxed mb-4">
                You should consult a qualified lawyer immediately if you:
              </p>
              <ul className="text-teal-200 space-y-2 ml-4">
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Are facing legal action or charges</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Need to file a case or petition</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Are in a custody or family law dispute</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Need to gather evidence or documentation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Are experiencing harassment or threats</span>
                </li>
              </ul>
            </div>

            {/* Mental Health Support */}
            <div className="bg-emerald-500/20 border border-emerald-400/30 p-6 rounded-lg backdrop-blur">
              <h2 className="text-lg font-bold text-emerald-200 mb-3">Mental Health & Emotional Support</h2>
              <p className="text-emerald-200 leading-relaxed">
                Legal issues can be emotionally challenging. If you're experiencing stress, anxiety, or other mental health concerns, please reach out to:
              </p>
              <ul className="text-emerald-200 space-y-2 ml-4 mt-3">
                <li>• <strong>AASRA Crisis Helpline:</strong> 1-9820-466-726</li>
                <li>• <strong>iCall Mental Health Helpline:</strong> 1-9152-987-821</li>
                <li>• <strong>Vandrevala Foundation:</strong> 1-9999-666-555</li>
                <li>• Speak with a trusted family member or counselor</li>
              </ul>
            </div>

            {/* Fairness Statement */}
            <div className="bg-cyan-500/20 border border-cyan-400/30 p-6 rounded-lg backdrop-blur">
              <h2 className="text-lg font-bold text-cyan-200 mb-3">Commitment to Fairness & Equality</h2>
              <p className="text-cyan-200 leading-relaxed">
                Nytrix AI is committed to promoting equality before the law and fair treatment for all citizens. This platform is designed to promote awareness and fairness, not conflict or discrimination.
              </p>
            </div>

            {/* User Agreement */}
            <div className="bg-purple-900/40 p-6 rounded-lg border border-emerald-400/30 backdrop-blur">
              <h2 className="text-lg font-bold text-emerald-100 mb-3">By Using This Platform, You Acknowledge:</h2>
              <ul className="text-emerald-200 space-y-2">
                <li className="flex gap-2">
                  <input type="checkbox" disabled defaultChecked className="mt-1 accent-emerald-500" />
                  <span>You have read and understand this disclaimer</span>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" disabled defaultChecked className="mt-1 accent-emerald-500" />
                  <span>You understand this is not legal advice</span>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" disabled defaultChecked className="mt-1 accent-emerald-500" />
                  <span>You will consult a qualified lawyer for specific legal matters</span>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" disabled defaultChecked className="mt-1 accent-emerald-500" />
                  <span>You use this platform at your own risk</span>
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/30 text-emerald-100 p-6 rounded-lg mt-8 backdrop-blur">
              <p className="font-semibold mb-2">Questions or Concerns?</p>
              <p className="text-emerald-200 text-sm">
                Contact us for more information or to report any issues with this platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact version for embedding
  return (
    <div className={`border border-emerald-400/30 rounded-lg overflow-hidden ${isExpanded ? 'bg-purple-900/40' : 'bg-purple-800/40'} backdrop-blur`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-purple-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div className="text-left">
            <p className="font-bold text-emerald-100">Legal Disclaimer</p>
            <p className="text-xs text-emerald-300">This platform provides general guidance, not legal advice</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-emerald-400/30 space-y-3 text-sm text-emerald-200">
          <p className="font-semibold text-red-300">
            Always consult a qualified lawyer before taking legal action.
          </p>
          <ul className="space-y-2 ml-4">
            <li>• This is for educational and awareness purposes only</li>
            <li>• Laws change frequently and vary by jurisdiction</li>
            <li>• Information may not address your specific situation</li>
            <li>• Every legal case requires personalized professional advice</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LegalDisclaimer;
