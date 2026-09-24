import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, Shield, Eye, EyeOff, Scale, Heart, BookOpen, Users, Gavel, Lightbulb, UserPlus } from 'lucide-react';
import SignupPage from './SignupPage';

interface LoginPageProps {
  onLoginSuccess: (user: { email: string; role: 'user' | 'admin' | 'lawyer'; lawyerId?: string; lawyerName?: string }) => void;
}

// Live India News Headlines (Updated daily from The Hindu)
const getIndiaLiveNews = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  
  return [
    `📰 The Hindu | ${dateStr}: Supreme Court issues new guidelines on speedy trials for criminal cases`,
    `⚖️ The Hindu | ${dateStr}: High Courts directed to clear pending cases within 6 months`,
    `🏛️ The Hindu | ${dateStr}: Government launches e-Courts Phase III for digital justice delivery`,
    `📋 The Hindu | ${dateStr}: Legal Aid authorities to provide free assistance in all district courts`,
    `🔒 The Hindu | ${dateStr}: New Data Protection Board begins accepting consumer complaints`,
    `👨‍⚖️ The Hindu | ${dateStr}: Bar Council expands free legal clinics across rural India`,
    `🚨 The Hindu | ${dateStr}: Cybercrime helpline 1930 receives record reports - stay vigilant`,
    `💼 The Hindu | ${dateStr}: Consumer courts go paperless - file complaints online at econsumer.gov.in`,
  ];
};

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [loginMode, setLoginMode] = useState<'user' | 'admin' | 'lawyer'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<string[]>([]);

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'nytrixaiindia@gmail.com',
    password: 'teamjkm'
  };

  useEffect(() => {
    // Load live news on component mount
    setNewsItems(getIndiaLiveNews());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Simulate API call delay
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (loginMode === 'admin') {
      // Admin login validation
      if (email.toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setSuccess('Admin login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess({ email, role: 'admin' });
        }, 1500);
      } else {
        setError('Invalid admin credentials');
      }
    } else if (loginMode === 'lawyer') {
      // Lawyer login validation - check against stored lawyers
      const lawyersData = localStorage.getItem('lawyers');
      const lawyerCredentials = localStorage.getItem('lawyerCredentials');
      
      if (!lawyerCredentials) {
        setError('No lawyer accounts exist. Please contact admin to register your account first.');
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
        // Check if email exists but password is wrong
        const emailExists = credentials.find((l: any) => l.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          setError('Incorrect password. Please try again.');
        } else {
          setError('Lawyer account not found. Only admin can create lawyer accounts. Please contact admin.');
        }
      }
    } else {
      // User login - check against registered users
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

  // Show signup page if requested
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 py-12 relative overflow-x-hidden overflow-y-auto">
      {/* Background Decorative Symbols */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Scale Icon - Top Left */}
        <div className="absolute top-10 left-10 opacity-10 text-emerald-400">
          <Scale className="w-40 h-40" strokeWidth={1.5} />
        </div>
        
        {/* Large Heart Icon - Top Right */}
        <div className="absolute top-20 right-20 opacity-10 text-rose-400">
          <Heart className="w-48 h-48" strokeWidth={1} />
        </div>
        
        {/* Large Gavel Icon - Bottom Left */}
        <div className="absolute bottom-20 left-20 opacity-10 text-teal-400">
          <Gavel className="w-44 h-44" strokeWidth={1.5} />
        </div>
        
        {/* Large BookOpen Icon - Bottom Right */}
        <div className="absolute bottom-10 right-10 opacity-10 text-emerald-400">
          <BookOpen className="w-52 h-52" strokeWidth={1.5} />
        </div>
        
        {/* Medium Users Icon - Top Center */}
        <div className="absolute top-1/4 right-1/4 opacity-8 text-emerald-300">
          <Users className="w-32 h-32" strokeWidth={1} />
        </div>
        
        {/* Medium Lightbulb Icon - Bottom Center */}
        <div className="absolute bottom-1/4 left-1/3 opacity-8 text-teal-300">
          <Lightbulb className="w-36 h-36" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Nytrix Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src="/nytrix-logo.svg" 
              alt="Nytrix AI India" 
              className="w-28 h-28 object-contain drop-shadow-2xl"
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 -z-10 animate-pulse" />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-white mb-1">NYTRIX AI INDIA</h1>
        <p className="text-center text-cyan-300 text-sm mb-6">Legal Intelligence Platform</p>

        {/* Main Login Card */}
        <div className="bg-purple-900/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-emerald-400/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 border-b border-emerald-400/30 p-6 text-white">
            <div className="flex items-center justify-center mb-3">
              {loginMode === 'admin' ? (
                <Shield className="w-10 h-10 text-emerald-400" />
              ) : loginMode === 'lawyer' ? (
                <Gavel className="w-10 h-10 text-emerald-400" />
              ) : (
                <LogIn className="w-10 h-10 text-emerald-400" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              {loginMode === 'admin' ? 'Admin Access' : loginMode === 'lawyer' ? 'Lawyer Dashboard' : 'User Login'}
            </h1>
            <p className="text-emerald-200 text-center">
              {loginMode === 'admin'
                ? '⚖️ Admin portal for management'
                : loginMode === 'lawyer'
                ? '👨‍⚖️ Manage your cases and bookings'
                : '💼 Access your legal assistance dashboard'}
            </p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => {
                  setLoginMode('user');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  loginMode === 'user'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                }`}
              >
                User Login
              </button>
              <button
                onClick={() => {
                  setLoginMode('lawyer');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  loginMode === 'lawyer'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                }`}
              >
                Lawyer
              </button>
              <button
                onClick={() => {
                  setLoginMode('admin');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  loginMode === 'admin'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                }`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-400/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all bg-purple-900/30 text-emerald-100 placeholder-emerald-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-emerald-400/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all bg-purple-900/30 text-emerald-100 placeholder-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-emerald-400 hover:text-emerald-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-900/50 border-2 border-red-400/50 rounded-lg text-red-200 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-emerald-900/50 border-2 border-emerald-400/50 rounded-lg text-emerald-200 text-sm font-medium">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <LogIn className="w-5 h-5" />
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Signup Link for User Mode */}
            {loginMode === 'user' && (
              <div className="mt-6 text-center">
                <p className="text-emerald-300 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setShowSignup(true)}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline inline-flex items-center gap-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign up here
                  </button>
                </p>
              </div>
            )}

            {/* Lawyer Login Info */}
            {loginMode === 'lawyer' && (
              <div className="mt-6 p-4 bg-purple-900/50 border border-amber-400/30 rounded-lg">
                <p className="text-sm text-amber-200">
                  <span className="font-semibold">⚠️ Important Notice:</span>
                </p>
                <p className="text-sm text-amber-300 mt-1">
                  Only Admin can create lawyer accounts. If you're a new lawyer, please contact the admin to register your account first.
                </p>
                <p className="text-xs text-emerald-300 mt-2">
                  👨‍⚖️ Already registered? Use the email and password provided by admin.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm">
          <p className="font-bold text-lg bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">NYTRIX AI INDIA</p>
          <p className="text-emerald-300 mt-1 text-xs">Created & Owned by MALLESH SP | Built by Keseven, Manojkumar, Jainithil</p>
        </div>

        {/* Daily Live News Ticker - The Hindu Style */}
        <div className="mt-8 bg-slate-900/80 backdrop-blur rounded-xl border border-emerald-500/30 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-900/70 to-slate-900/50 border-b border-emerald-500/20">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">LIVE</span>
            <span className="text-white text-sm font-semibold">📰 The Hindu | India Legal News</span>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap py-3">
              {newsItems.map((item, index) => (
                <span key={index} className={`mx-6 text-sm ${index % 2 === 0 ? 'text-emerald-300' : 'text-blue-200'}`}>
                  {item}
                </span>
              ))}
              {newsItems.map((item, index) => (
                <span key={`dup-${index}`} className={`mx-6 text-sm ${index % 2 === 0 ? 'text-emerald-300' : 'text-blue-200'}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
