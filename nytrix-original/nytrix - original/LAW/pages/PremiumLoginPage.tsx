import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, Shield, Eye, EyeOff, Scale, Heart, Sparkles, Brain, UserPlus, Gavel, ArrowRight } from 'lucide-react';
import SignupPage from './SignupPage';

interface LoginPageProps {
  onLoginSuccess: (user: { email: string; role: 'user' | 'admin' | 'lawyer'; lawyerId?: string; lawyerName?: string }) => void;
}

// Live India News Headlines
const getIndiaLiveNews = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  
  return [
    `📰 ${dateStr}: Supreme Court issues new guidelines on speedy trials`,
    `⚖️ ${dateStr}: High Courts directed to clear pending cases`,
    `🏛️ ${dateStr}: e-Courts Phase III launched for digital justice`,
    `📋 ${dateStr}: Free legal aid expanded across district courts`,
    `🔒 ${dateStr}: Data Protection Board accepting complaints`,
    `👨‍⚖️ ${dateStr}: Free legal clinics expanded across rural India`,
  ];
};

const PremiumLoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [loginMode, setLoginMode] = useState<'user' | 'admin' | 'lawyer'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<string[]>([]);

  const ADMIN_CREDENTIALS = {
    email: 'nytrixaiindia@gmail.com',
    password: 'teamjkm'
  };

  useEffect(() => {
    setNewsItems(getIndiaLiveNews());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (loginMode === 'admin') {
      if (email.toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setSuccess('Admin login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess({ email, role: 'admin' });
        }, 1500);
      } else {
        setError('Invalid admin credentials');
      }
    } else if (loginMode === 'lawyer') {
      const lawyerCredentials = localStorage.getItem('lawyerCredentials');
      
      if (!lawyerCredentials) {
        setError('No lawyers registered in the system');
        setIsLoading(false);
        return;
      }

      const credentials = JSON.parse(lawyerCredentials);
      const lawyerLogin = credentials.find((l: any) => l.email.toLowerCase() === email.toLowerCase() && l.password === password);

      if (lawyerLogin) {
        setSuccess('Lawyer login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess({ 
            email, 
            role: 'lawyer',
            lawyerId: lawyerLogin.id,
            lawyerName: lawyerLogin.name
          });
        }, 1500);
      } else {
        setError('Invalid lawyer credentials');
      }
    } else {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userLogin = registeredUsers.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (userLogin) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess({ email: userLogin.email, role: 'user' });
        }, 1500);
      } else {
        setError('Invalid email or password. Please sign up if you don\'t have an account.');
      }
    }

    setIsLoading(false);
  };

  if (showSignup) {
    return (
      <SignupPage 
        onSignupSuccess={(user) => {
          setShowSignup(false);
          onLoginSuccess(user);
        }}
        onBackToLogin={() => setShowSignup(false)}
      />
    );
  }

  const modeConfig = {
    user: { icon: LogIn, title: 'Welcome Back', subtitle: 'Access your legal intelligence dashboard' },
    admin: { icon: Shield, title: 'Admin Portal', subtitle: 'System management & control' },
    lawyer: { icon: Gavel, title: 'Lawyer Dashboard', subtitle: 'Manage cases and client bookings' }
  };

  const currentMode = modeConfig[loginMode];
  const Icon = currentMode.icon;

  return (
    <div className="min-h-screen bg-[#0a0d14] flex relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(6,182,212,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_100%,rgba(99,102,241,0.08),transparent)]" />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]"
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                NYTRIX AI INDIA
              </h1>
              <p className="text-xs text-slate-500 uppercase tracking-[0.15em] font-medium">
                Legal Intelligence Platform
              </p>
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-4 leading-tight"
          >
            AI-Powered Legal
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Risk Analysis
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg mb-8 leading-relaxed"
          >
            Enterprise-grade legal intelligence for Indian law. 
            Understand your rights, assess risks, and get actionable guidance.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: Scale, text: 'Comprehensive legal analysis' },
              { icon: Shield, text: 'Protection rights guidance' },
              { icon: Sparkles, text: 'AI-powered recommendations' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-lg font-bold text-white">NYTRIX AI INDIA</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Legal Intelligence</p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.06] overflow-hidden shadow-2xl z-20 relative pointer-events-auto">
            {/* Header */}
            <div className="p-6 border-b border-white/[0.06]">
              <motion.div
                key={loginMode}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  loginMode === 'admin' 
                    ? 'bg-rose-500/10 border border-rose-500/20' 
                    : loginMode === 'lawyer'
                      ? 'bg-purple-500/10 border border-purple-500/20'
                      : 'bg-blue-500/10 border border-blue-500/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    loginMode === 'admin' ? 'text-rose-400' : loginMode === 'lawyer' ? 'text-purple-400' : 'text-blue-400'
                  }`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{currentMode.title}</h2>
                  <p className="text-sm text-slate-400">{currentMode.subtitle}</p>
                </div>
              </motion.div>
            </div>

            {/* Mode Selector */}
            <div className="p-4 border-b border-white/[0.06]">
              <div className="flex gap-2 p-1 bg-white/[0.02] rounded-xl">
                {(['user', 'lawyer', 'admin'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setLoginMode(mode);
                      setError('');
                      setSuccess('');
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      loginMode === mode
                        ? mode === 'admin'
                          ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/25'
                          : mode === 'lawyer'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm"
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                  isLoading
                    ? 'bg-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {/* Sign Up Link */}
              {loginMode === 'user' && (
                <div className="text-center pt-2">
                  <p className="text-sm text-slate-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setShowSignup(true)}
                      className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign up
                    </button>
                  </p>
                </div>
              )}

              {/* Lawyer Info */}
              {loginMode === 'lawyer' && (
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 text-sm text-slate-400">
                  <span className="font-medium text-purple-300">Note:</span> Use credentials provided by admin after registration approval.
                </div>
              )}
            </form>
          </div>

          {/* News Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06]">
              <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded animate-pulse">
                LIVE
              </span>
              <span className="text-xs text-slate-400 font-medium">Legal News India</span>
            </div>
            <div className="overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap py-3">
                {[...newsItems, ...newsItems].map((item, index) => (
                  <span key={index} className="mx-6 text-sm text-slate-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-slate-500">
            <p>By Team JKM • Legal Assistance Platform</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumLoginPage;
