import React, { useState } from 'react';
import { Mail, Lock, LogIn, Shield, Eye, EyeOff, Scale, Heart, BookOpen, Users, Gavel, Lightbulb } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { email: string; role: 'user' | 'admin' }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [loginMode, setLoginMode] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_CREDENTIALS = {
    email: 'xtro@gmail.com',
    password: 'tech'
  };

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
    } else {
      // User login - accept any valid email/password combination
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
      } else {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess({ email, role: 'user' });
        }, 1500);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Scale Icon - Top Left */}
        <div className="absolute top-10 left-10 opacity-10 text-amber-400">
          <Scale className="w-40 h-40" strokeWidth={1.5} />
        </div>
        
        {/* Large Heart Icon - Top Right */}
        <div className="absolute top-20 right-20 opacity-10 text-rose-400">
          <Heart className="w-48 h-48" strokeWidth={1} />
        </div>
        
        {/* Large Gavel Icon - Bottom Left */}
        <div className="absolute bottom-20 left-20 opacity-10 text-indigo-400">
          <Gavel className="w-44 h-44" strokeWidth={1.5} />
        </div>
        
        {/* Large BookOpen Icon - Bottom Right */}
        <div className="absolute bottom-10 right-10 opacity-10 text-amber-400">
          <BookOpen className="w-52 h-52" strokeWidth={1.5} />
        </div>
        
        {/* Medium Users Icon - Top Center */}
        <div className="absolute top-1/4 right-1/4 opacity-8 text-indigo-300">
          <Users className="w-32 h-32" strokeWidth={1} />
        </div>
        
        {/* Medium Lightbulb Icon - Bottom Center */}
        <div className="absolute bottom-1/4 left-1/3 opacity-8 text-rose-300">
          <Lightbulb className="w-36 h-36" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Main Login Card */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              {loginMode === 'admin' ? (
                <Shield className="w-12 h-12 text-amber-300" />
              ) : (
                <LogIn className="w-12 h-12 text-amber-300" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              {loginMode === 'admin' ? 'Admin Access' : 'User Login'}
            </h1>
            <p className="text-indigo-100 text-center">
              {loginMode === 'admin'
                ? '⚖️ Admin portal for management'
                : '💼 Access your legal assistance dashboard'}
            </p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            {/* Mode Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  setLoginMode('user');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  loginMode === 'user'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                User Login
              </button>
              <button
                onClick={() => {
                  setLoginMode('admin');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  loginMode === 'admin'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      loginMode === 'admin'
                        ? 'xtro@gmail.com'
                        : 'your.email@example.com'
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400/30 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      loginMode === 'admin' ? 'Enter admin password' : 'Enter your password'
                    }
                    className="w-full pl-12 pr-12 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400/30 transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
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
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700 text-sm font-medium">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <LogIn className="w-5 h-5" />
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Admin Credentials Hint */}
            {loginMode === 'admin' && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">🔐 Admin Credentials:</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Email: <span className="font-mono text-indigo-600">xtro@gmail.com</span>
                </p>
                <p className="text-sm text-gray-600">
                  Password: <span className="font-mono text-indigo-600">tech</span>
                </p>
              </div>
            )}

            {/* Demo Hint for User Login */}
            {loginMode === 'user' && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">✨ Demo Mode:</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Enter any valid email and a password with at least 6 characters to login.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm">
          <p className="font-semibold">⚖️ Legal Assistance Platform</p>
          <p className="text-indigo-200 mt-2">🔒 Secure Login Portal</p>
        </div>

        {/* Daily Live News Ticker */}
        <div className="mt-8 bg-slate-900/80 backdrop-blur rounded-xl border border-amber-500/30 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-900/50 to-slate-900/50 border-b border-amber-500/20">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">LIVE</span>
            <span className="text-amber-300 text-sm font-semibold">📰 India News</span>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap py-3">
              <span className="mx-6 text-blue-200 text-sm">🏛️ Supreme Court: New fast-track guidelines</span>
              <span className="mx-6 text-emerald-300 text-sm">⚖️ Free Legal Aid in 500+ district courts</span>
              <span className="mx-6 text-blue-200 text-sm">📋 Cybercrime helpline 1930 active 24/7</span>
              <span className="mx-6 text-amber-300 text-sm">🔒 Data Protection: File complaints online</span>
              <span className="mx-6 text-blue-200 text-sm">👨‍⚖️ Bar Council free consultations expanded</span>
              <span className="mx-6 text-rose-300 text-sm">🚨 Consumer Court: Digital complaint filing</span>
              <span className="mx-6 text-blue-200 text-sm">🏛️ Supreme Court: New fast-track guidelines</span>
              <span className="mx-6 text-emerald-300 text-sm">⚖️ Free Legal Aid in 500+ district courts</span>
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
