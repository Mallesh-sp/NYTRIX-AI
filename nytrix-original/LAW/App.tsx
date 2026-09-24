
import React, { useState, useRef, useEffect } from 'react';
import { Scale, Send, Info, RefreshCcw, Heart, Shield, Globe, BookOpen, Menu, X, Home, Users, AlertCircle, Award, Zap, LogOut, Building2 } from 'lucide-react';
import { ChatMessage, LegalAnalysis } from './types';
import { analyzeSituation } from './services/geminiService';
import { searchMultipleLawConcepts } from './services/lawConceptsService';
import AnalysisReport from './components/AnalysisReport';
import LawConceptCard from './components/LawConceptCard';
import LandingPage from './pages/LandingPage';
import PremiumLandingPage from './pages/PremiumLandingPage';
import KnowledgeCardsPage from './pages/KnowledgeCardsPage';
import LawyerDirectoryPage from './pages/LawyerDirectoryPage';
import StepByStepGuide from './pages/StepByStepGuide';
import SDGPage from './pages/SDGPage';
import LegalDisclaimer from './components/LegalDisclaimer';
import LoginPage from './pages/PremiumLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LegalDisclaimerPage from './pages/LegalDisclaimer';
import SidebarLayout from './components/SidebarLayout';
import ChatInterface from './components/ChatInterface';
import CourtFinderPage from './pages/CourtFinderPage';

type PageType = 'landing' | 'analyzer' | 'knowledge' | 'lawyers' | 'courts' | 'guide' | 'sdg' | 'disclaimer' | 'privacy' | 'terms';

interface User {
  email: string;
  role: 'user' | 'admin' | 'lawyer';
  lawyerId?: string;
  lawyerName?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  const navItems = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'analyzer', label: 'AI Analyzer', icon: <Zap className="w-5 h-5" /> },
    { id: 'knowledge', label: 'Knowledge Cards', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'lawyers', label: 'Find Lawyers', icon: <Users className="w-5 h-5" /> },
    { id: 'courts', label: 'Find Court', icon: <Building2 className="w-5 h-5" /> },
    { id: 'guide', label: 'Action Guide', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'sdg', label: 'SDG Impact', icon: <Award className="w-5 h-5" /> },
    { id: 'disclaimer', label: 'Legal Disclaimer', icon: <Shield className="w-5 h-5" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAnalyzing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsAnalyzing(true);
    setError(null);

    try {
      // First check if user's input matches any law concepts
      const matchedConcepts = searchMultipleLawConcepts(input);
      
      if (matchedConcepts.length > 0) {
        // Create a message with law concepts
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I found ${matchedConcepts.length} law concept${matchedConcepts.length > 1 ? 's' : ''} matching your question. Here are the detailed explanations:`,
          lawConcepts: matchedConcepts.map((m) => ({
            concept: m.concept,
            detail: m.detail,
          })),
          timestamp: Date.now(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // If no law concept matches, use AI analysis
        const analysis = await analyzeSituation(input);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I have analyzed your situation based on Indian legal context. Here is your report:",
          analysis,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('landing');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMessages([]);
    setInput('');
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Show admin dashboard if user is admin
  if (currentUser?.role === 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Admin Header */}
        <header className="sticky top-0 z-20 bg-gradient-to-r from-slate-900 to-purple-900 border-b border-emerald-500/20 px-4 py-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => handleLogout()}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/nytrix-logo.svg" 
                alt="Nytrix AI India" 
                className="w-12 h-12 object-contain drop-shadow-lg"
              />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent leading-none">Admin Panel</h1>
                <p className="text-[9px] font-semibold text-emerald-300 uppercase tracking-widest mt-1">NYTRIX AI INDIA</p>
              </div>
            </button>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-semibold text-emerald-200">{currentUser.email}</p>
                  <p className="text-[10px] text-red-400 font-bold">ADMIN</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors text-sm font-semibold border border-red-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Dashboard */}
        <div className="flex-1 overflow-y-auto">
          <AdminDashboard onNavigate={setCurrentPage} />
        </div>
      </div>
    );
  }

  // Show lawyer dashboard if user is lawyer
  if (currentUser?.role === 'lawyer') {
    return (
      <LawyerDashboard
        lawyerId={currentUser.lawyerId || ''}
        lawyerName={currentUser.lawyerName || ''}
        onLogout={handleLogout}
      />
    );
  }

  // Landing page without sidebar
  if (currentPage === 'landing') {
    return <PremiumLandingPage onNavigate={(page) => setCurrentPage(page as any)} onLogout={handleLogout} />;
  }

  // All other pages with sidebar layout
  return (
    <SidebarLayout
      navItems={navItems as any}
      currentPage={currentPage as any}
      onNavigate={(id: string) => setCurrentPage(id as PageType)}
      currentUser={currentUser}
      onLogout={handleLogout}
    >
      {/* Page Content */}
      {currentPage === 'knowledge' && <KnowledgeCardsPage />}
      {currentPage === 'lawyers' && <LawyerDirectoryPage />}
      {currentPage === 'courts' && <CourtFinderPage onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'guide' && <StepByStepGuide onNavigate={(page) => setCurrentPage(page as any)} />}
      {currentPage === 'sdg' && <SDGPage />}
      {currentPage === 'disclaimer' && <LegalDisclaimerPage onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'privacy' && <PrivacyPolicy onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'terms' && <TermsOfService onBack={() => setCurrentPage('landing')} />}

      {/* AI Analyzer Page - ChatGPT-style Interface */}
      {currentPage === 'analyzer' && <ChatInterface />}
    </SidebarLayout>
  );
};

export default App;
