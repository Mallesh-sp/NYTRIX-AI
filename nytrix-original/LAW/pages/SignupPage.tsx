import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Scale, Heart, BookOpen, Users, Gavel, Lightbulb, ArrowLeft, Phone } from 'lucide-react';

interface SignupPageProps {
  onSignupSuccess: (user: { email: string; role: 'user' }) => void;
  onBackToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess, onBackToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!fullName.trim()) {
      setError('Full name is required');
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const emailExists = existingUsers.some((user: any) => user.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      setError('An account with this email already exists');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save user to localStorage (simulating database)
    const newUser = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: password, // In production, this should be hashed
      role: 'user',
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    setSuccess('Account created successfully! Redirecting to login...');
    setIsLoading(false);

    setTimeout(() => {
      onBackToLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 opacity-10 text-emerald-400">
          <Scale className="w-40 h-40" strokeWidth={1.5} />
        </div>
        <div className="absolute top-20 right-20 opacity-10 text-rose-400">
          <Heart className="w-48 h-48" strokeWidth={1} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10 text-teal-400">
          <Gavel className="w-44 h-44" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 text-emerald-400">
          <BookOpen className="w-52 h-52" strokeWidth={1.5} />
        </div>
        <div className="absolute top-1/4 right-1/4 opacity-8 text-emerald-300">
          <Users className="w-32 h-32" strokeWidth={1} />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-8 text-teal-300">
          <Lightbulb className="w-36 h-36" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Nytrix Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img 
              src="/nytrix-logo.svg" 
              alt="Nytrix AI India" 
              className="w-24 h-24 object-contain drop-shadow-2xl"
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 -z-10 animate-pulse" />
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Login</span>
        </button>

        {/* Main Signup Card */}
        <div className="bg-purple-900/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-emerald-400/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 border-b border-emerald-400/30 p-6 text-white">
            <div className="flex items-center justify-center mb-3">
              <UserPlus className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-emerald-200 text-center">
              ✨ Join our legal assistance platform
            </p>
          </div>

          {/* Signup Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-400/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all bg-purple-900/30 text-emerald-100 placeholder-emerald-400"
                  />
                </div>
              </div>

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

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
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
                    placeholder="Create a password (min 6 characters)"
                    className="w-full pl-12 pr-12 py-3 border-2 border-emerald-400/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all bg-purple-900/30 text-emerald-100 placeholder-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-emerald-400 hover:text-emerald-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-emerald-400/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all bg-purple-900/30 text-emerald-100 placeholder-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-emerald-400 hover:text-emerald-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                <UserPlus className="w-5 h-5" />
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-emerald-300 text-sm">
                Already have an account?{' '}
                <button
                  onClick={onBackToLogin}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm">
          <p className="font-bold text-lg bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">NYTRIX AI INDIA</p>
          <p className="text-emerald-300 mt-1 text-xs">Created & Owned by MALLESH SP | Built by Keseven, Manojkumar, Jainithil</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
