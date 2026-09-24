import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Check, AlertCircle, Camera, X, Clock, XCircle, CreditCard, Smartphone, Copy, CheckCircle, Sun, Moon } from 'lucide-react';
import { LawyerProfile } from '../components/LawyerCard';

// Theme hook for booking page
const useBookingTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('nytrix-booking-theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('nytrix-booking-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);
  return { isDark, toggle };
};

interface UserBookingPageProps {
  lawyer: LawyerProfile;
  onBack: () => void;
  userId: string;
}

interface BookingData {
  id: string;
  userId: string;
  lawyerId: string;
  lawyerName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userCity: string;
  userPhoto: string | null;
  caseType: string;
  caseDescription: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  transactionId: string;
  bookedAt: number;
  createdAt: string;
}

const UserBookingPage: React.FC<UserBookingPageProps> = ({ lawyer, onBack, userId }) => {
  const { isDark, toggle: toggleTheme } = useBookingTheme();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userCity: '',
    caseType: 'General Consultation',
    caseDescription: '',
  });
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'failed'>('pending');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const BOOKING_AMOUNT = 100;
  const lawyerUpiId = (lawyer as any).upiId || 'lawyer@upi';

  // Theme classes for professional look
  const theme = {
    bg: isDark 
      ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
      : 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
    card: isDark 
      ? 'bg-slate-800/80 border-slate-700/50 shadow-xl shadow-black/20' 
      : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50',
    cardSecondary: isDark 
      ? 'bg-slate-900/60 border-slate-700/40' 
      : 'bg-slate-50 border-slate-200',
    text: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-300' : 'text-slate-600',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
    accent: isDark ? 'text-blue-400' : 'text-blue-600',
    accentBg: isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700',
    input: isDark 
      ? 'bg-slate-900/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20' 
      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20',
    labelColor: isDark ? 'text-slate-200' : 'text-slate-700',
    backBtn: isDark 
      ? 'text-blue-400 hover:text-blue-300' 
      : 'text-blue-600 hover:text-blue-500',
    upiBox: isDark 
      ? 'bg-slate-900/80 border-blue-500/30' 
      : 'bg-blue-50 border-blue-200',
    success: isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600',
    paymentBtn: isDark 
      ? 'bg-slate-700/50 hover:bg-slate-600/50 border-slate-600' 
      : 'bg-slate-50 hover:bg-slate-100 border-slate-200',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setUserPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProceedToPayment = () => {
    if (!formData.userName.trim() || !formData.userEmail.trim() || !formData.userPhone.trim() || !formData.userCity.trim() || !formData.caseDescription.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(lawyerUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate UPI payment links
  const generateUpiLink = (app: string) => {
    const encodedName = encodeURIComponent(lawyer.name);
    const note = encodeURIComponent(`Legal consultation booking - ${formData.userName}`);
    
    // UPI deep links
    const upiUrl = `upi://pay?pa=${lawyerUpiId}&pn=${encodedName}&am=${BOOKING_AMOUNT}&cu=INR&tn=${note}`;
    
    switch(app) {
      case 'gpay':
        return `gpay://upi/pay?pa=${lawyerUpiId}&pn=${encodedName}&am=${BOOKING_AMOUNT}&cu=INR&tn=${note}`;
      case 'paytm':
        return `paytmmp://pay?pa=${lawyerUpiId}&pn=${encodedName}&am=${BOOKING_AMOUNT}&cu=INR&tn=${note}`;
      case 'phonepe':
        return `phonepe://pay?pa=${lawyerUpiId}&pn=${encodedName}&am=${BOOKING_AMOUNT}&cu=INR&tn=${note}`;
      default:
        return upiUrl;
    }
  };

  const openPaymentApp = (app: string) => {
    setPaymentMethod(app);
    const link = generateUpiLink(app);
    
    // Try to open the UPI app
    // On mobile, this will open the app; on desktop, it may fail
    const startTime = Date.now();
    
    // Create a hidden iframe to try the deep link (works better on some browsers)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = link;
    document.body.appendChild(iframe);
    
    // Also try direct navigation
    window.location.href = link;
    
    // Clean up iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
    
    // Show transaction verification after a delay
    // On desktop, user will need to manually pay using the UPI ID
    setTimeout(() => {
      setPaymentProcessing(true);
    }, 1500);
  };

  const confirmPayment = async (status: 'paid' | 'failed') => {
    if (status === 'paid' && !transactionId.trim()) {
      alert('Please enter the UPI Transaction ID');
      return;
    }

    setPaymentStatus(status);

    const newBooking: BookingData = {
      id: 'BOOK-' + Date.now(),
      userId,
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhone: formData.userPhone,
      userCity: formData.userCity,
      userPhoto: userPhoto,
      caseType: formData.caseType,
      caseDescription: formData.caseDescription,
      amount: BOOKING_AMOUNT,
      status: status === 'paid' ? 'pending' : 'rejected',
      paymentStatus: status,
      paymentMethod: paymentMethod,
      transactionId: transactionId,
      bookedAt: Date.now(),
      createdAt: new Date().toISOString(),
    };

    setBooking(newBooking);

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Log for debugging
    console.log('Booking created:', {
      bookingId: newBooking.id,
      lawyerId: newBooking.lawyerId,
      lawyerName: newBooking.lawyerName,
      status: newBooking.status
    });
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('bookingCreated', { detail: newBooking }));

    // Save notification
    const messages = JSON.parse(localStorage.getItem('userMessages') || '[]');
    if (status === 'paid') {
      messages.push({
        id: 'msg-' + Date.now(),
        userId,
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: `✅ Your payment of ₹${BOOKING_AMOUNT} to ${lawyer.name} was successful! Booking ID: ${newBooking.id}. Awaiting lawyer approval.`,
        read: false,
        timestamp: new Date().toISOString(),
      });
    } else {
      messages.push({
        id: 'msg-' + Date.now(),
        userId,
        type: 'payment_failed',
        title: 'Payment Failed',
        message: `❌ Payment failed for booking with ${lawyer.name}. Please try again.`,
        read: false,
        timestamp: new Date().toISOString(),
      });
    }
    localStorage.setItem('userMessages', JSON.stringify(messages));

    setPaymentProcessing(false);
    setStep('confirmation');
  };

  // Step 1: User Details
  if (step === 'details') {
    return (
      <div className={`min-h-screen max-h-screen overflow-y-auto ${theme.bg} py-8 transition-colors duration-300`}>
        <div className="max-w-2xl mx-auto px-4">
          {/* Header with Back and Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className={`flex items-center gap-2 ${theme.backBtn} font-medium transition-colors`}>
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} shadow-lg`}
              title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Lawyer Info Card with Photo */}
          <div className={`${theme.card} border p-6 rounded-2xl mb-8 backdrop-blur transition-colors`}>
            <div className="flex items-center gap-4">
              {(lawyer as any).photo ? (
                <img src={(lawyer as any).photo} alt={lawyer.name} className={`w-20 h-20 rounded-full object-cover border-2 ${isDark ? 'border-blue-500/50' : 'border-blue-300'}`} />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {lawyer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <div>
                <h2 className={`text-2xl font-bold ${theme.text}`}>{lawyer.name}</h2>
                <p className={`${theme.accent} font-semibold`}>{lawyer.specialization}</p>
                <p className={`${theme.textMuted} text-sm mt-1`}>📍 {lawyer.city} | ⭐ {lawyer.rating || 'N/A'} | {lawyer.experience}+ years</p>
              </div>
            </div>
            {/* Show UPI ID */}
            <div className={`mt-4 p-3 ${theme.upiBox} rounded-xl border transition-colors`}>
              <p className={`${theme.accent} text-xs font-semibold uppercase mb-1`}>Lawyer's UPI ID</p>
              <div className="flex items-center gap-2">
                <p className={`${theme.text} font-mono`}>{lawyerUpiId}</p>
                <button onClick={copyUpiId} className={`${theme.accent} hover:opacity-80 transition-opacity`}>
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className={`${theme.card} border p-8 rounded-2xl backdrop-blur space-y-5 transition-colors`}>
            <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Enter Your Details</h3>

            {/* Profile Photo Upload */}
            <div className="mb-6">
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-3`}>Your Profile Photo (Optional)</label>
              <div className="flex items-center gap-4">
                {userPhoto ? (
                  <div className="relative">
                    <img src={userPhoto} alt="Profile" className={`w-24 h-24 rounded-full object-cover border-2 ${isDark ? 'border-blue-500/50' : 'border-blue-300'}`} />
                    <button 
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-24 h-24 rounded-full border-2 border-dashed ${isDark ? 'border-blue-500/50 hover:border-blue-400' : 'border-blue-300 hover:border-blue-500'} flex flex-col items-center justify-center cursor-pointer transition-colors`}
                  >
                    <Camera className={`w-8 h-8 ${theme.accent}`} />
                    <span className={`text-xs ${theme.textMuted} mt-1`}>Add Photo</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className={`${theme.textSecondary} text-sm`}>
                  <p>Upload your photo</p>
                  <p className={`text-xs ${theme.textMuted}`}>Max 5MB, JPG/PNG</p>
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>Full Name *</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} 
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-xl ${theme.input} focus:outline-none focus:ring-2 transition-colors`} />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>Email *</label>
              <input type="email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} 
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 border rounded-xl ${theme.input} focus:outline-none focus:ring-2 transition-colors`} />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>Phone *</label>
              <input type="tel" name="userPhone" value={formData.userPhone} onChange={handleInputChange} 
                placeholder="+91 XXXXX XXXXX"
                className={`w-full px-4 py-3 border rounded-xl ${theme.input} focus:outline-none focus:ring-2 transition-colors`} />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>City *</label>
              <input type="text" name="userCity" value={formData.userCity} onChange={handleInputChange} 
                placeholder="Your city"
                className={`w-full px-4 py-3 border rounded-xl ${theme.input} focus:outline-none focus:ring-2 transition-colors`} />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>Case Type *</label>
              <select 
                name="caseType" 
                value={formData.caseType} 
                onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl ${theme.input} focus:outline-none focus:ring-2 transition-colors`}
              >
                <option value="General Consultation">General Consultation</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Cyber Law">Cyber Law</option>
                <option value="Labour Law">Labour Law</option>
                <option value="Consumer Law">Consumer Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Tax Law">Tax Law</option>
                <option value="Constitutional Law">Constitutional Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>Case Description *</label>
              <textarea name="caseDescription" value={formData.caseDescription} onChange={handleInputChange} rows={5}
                placeholder="Describe your case or legal issue..."
                className={`w-full px-4 py-3 border rounded-xl ${theme.input} resize-none focus:outline-none focus:ring-2 transition-colors`} />
            </div>

            {/* Booking Fee Info */}
            <div className={`${theme.success} border p-4 rounded-xl transition-colors`}>
              <div className="flex justify-between items-center">
                <span className={`${theme.textSecondary} font-semibold`}>Booking Fee:</span>
                <span className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>₹{BOOKING_AMOUNT}</span>
              </div>
              <p className={`${theme.textMuted} text-xs mt-2`}>* Payment directly to lawyer via UPI</p>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="button" onClick={onBack} className={`flex-1 px-6 py-3.5 border rounded-xl font-semibold transition-all ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}>
                Cancel
              </button>
              <button type="button" onClick={handleProceedToPayment} className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 2: Payment
  if (step === 'payment' && !booking) {
    return (
      <div className={`min-h-screen max-h-screen overflow-y-auto ${theme.bg} py-8 transition-colors duration-300`}>
        <div className="max-w-lg mx-auto px-4">
          {/* Header with Back and Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setStep('details')} className={`flex items-center gap-2 ${theme.backBtn} font-medium transition-colors`}>
              <ArrowLeft className="w-5 h-5" /> Back to Details
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} shadow-lg`}
              title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className={`${theme.card} border p-8 rounded-2xl backdrop-blur transition-colors`}>
            <h2 className={`text-2xl font-bold ${theme.text} mb-6 text-center`}>💳 Pay via UPI</h2>

            {/* Payment Summary */}
            <div className={`${theme.cardSecondary} border p-6 rounded-xl mb-6 transition-colors`}>
              <div className="flex items-center gap-3 mb-4">
                {(lawyer as any).photo ? (
                  <img src={(lawyer as any).photo} alt={lawyer.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {lawyer.name[0]}
                  </div>
                )}
                <div>
                  <p className={`${theme.text} font-semibold`}>{lawyer.name}</p>
                  <p className={`${theme.accent} text-sm`}>{lawyer.specialization}</p>
                </div>
              </div>
              
              <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} pt-4`}>
                <p className={`${theme.textMuted} text-sm mb-1`}>UPI ID:</p>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-slate-800/80' : 'bg-slate-100'}`}>
                  <p className={`${theme.text} font-mono flex-1`}>{lawyerUpiId}</p>
                  <button onClick={copyUpiId} className={`${theme.accent} hover:opacity-80 transition-opacity`}>
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} mt-4 pt-4`}>
                <div className="flex justify-between items-center">
                  <span className={theme.textSecondary}>Amount to Pay</span>
                  <span className={`text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>₹{BOOKING_AMOUNT}</span>
                </div>
              </div>
            </div>

            {!paymentProcessing ? (
              <>
                {/* UPI Payment Options */}
                <div className="space-y-3 mb-6">
                  <p className={`${theme.textSecondary} font-semibold mb-3 text-center`}>Choose Payment App:</p>
                  
                  <button 
                    onClick={() => openPaymentApp('gpay')}
                    className={`w-full flex items-center gap-4 p-4 ${theme.paymentBtn} border rounded-xl transition-all group`}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-2xl">🅖</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className={`${theme.text} font-semibold`}>Google Pay</p>
                      <p className={`${theme.textMuted} text-sm`}>Pay with GPay</p>
                    </div>
                    <span className={`${theme.accent} group-hover:translate-x-1 transition-transform`}>→</span>
                  </button>

                  <button 
                    onClick={() => openPaymentApp('paytm')}
                    className={`w-full flex items-center gap-4 p-4 ${theme.paymentBtn} border rounded-xl transition-all group`}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">₽</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className={`${theme.text} font-semibold`}>Paytm</p>
                      <p className={`${theme.textMuted} text-sm`}>Pay with Paytm UPI</p>
                    </div>
                    <span className={`${theme.accent} group-hover:translate-x-1 transition-transform`}>→</span>
                  </button>

                  <button 
                    onClick={() => openPaymentApp('phonepe')}
                    className={`w-full flex items-center gap-4 p-4 ${theme.paymentBtn} border rounded-xl transition-all group`}
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">📱</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className={`${theme.text} font-semibold`}>PhonePe</p>
                      <p className={`${theme.textMuted} text-sm`}>Pay with PhonePe</p>
                    </div>
                    <span className={`${theme.accent} group-hover:translate-x-1 transition-transform`}>→</span>
                  </button>

                  <button 
                    onClick={() => openPaymentApp('upi')}
                    className={`w-full flex items-center gap-4 p-4 ${theme.paymentBtn} border rounded-xl transition-all group`}
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className={`${theme.text} font-semibold`}>Other UPI Apps</p>
                      <p className={`${theme.textMuted} text-sm`}>BHIM, Amazon Pay, etc.</p>
                    </div>
                    <span className={`${theme.accent} group-hover:translate-x-1 transition-transform`}>→</span>
                  </button>
                </div>

                <div className={`text-center ${theme.textMuted} text-xs`}>
                  <p>💡 Click on an app to open it for payment</p>
                  <p>After payment, confirm with transaction ID</p>
                </div>
              </>
            ) : (
              <>
                {/* Transaction Verification */}
                <div className="space-y-4">
                  <div className={`${isDark ? 'bg-amber-500/10 border-amber-400/30' : 'bg-amber-50 border-amber-200'} border p-4 rounded-xl`}>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-amber-300' : 'text-amber-600'} mb-2`}>
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Verify Your Payment</span>
                    </div>
                    <p className={`${isDark ? 'text-amber-200/80' : 'text-amber-700'} text-sm`}>
                      Complete the payment in {paymentMethod === 'gpay' ? 'Google Pay' : paymentMethod === 'paytm' ? 'Paytm' : paymentMethod === 'phonepe' ? 'PhonePe' : 'your UPI app'} and enter the transaction ID below.
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold ${theme.labelColor} mb-2`}>UPI Transaction ID / Reference Number *</label>
                    <input 
                      type="text" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter 12-digit UPI Ref No."
                      className={`w-full px-4 py-3 border rounded-xl ${theme.input} focus:outline-none focus:ring-2 font-mono transition-colors`}
                    />
                    <p className={`${theme.textMuted} text-xs mt-1`}>Find this in your UPI app's transaction history</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => confirmPayment('failed')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 ${isDark ? 'bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'} border rounded-xl font-semibold transition-colors`}
                    >
                      <XCircle className="w-5 h-5" />
                      Payment Failed
                    </button>
                    <button 
                      onClick={() => confirmPayment('paid')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Payment Done
                    </button>
                  </div>

                  <button 
                    onClick={() => setPaymentProcessing(false)}
                    className={`w-full px-4 py-2 ${theme.backBtn} text-sm transition-colors`}
                  >
                    ← Choose Different App
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Confirmation
  if (booking) {
    return (
      <div className={`min-h-screen max-h-screen overflow-y-auto ${theme.bg} py-8 flex items-center justify-center transition-colors duration-300`}>
        <div className="max-w-md mx-auto px-4 w-full">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} shadow-lg`}
              title={isDark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className={`${theme.card} border p-8 rounded-2xl backdrop-blur text-center transition-colors`}>
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              {booking.paymentStatus === 'paid' ? (
                <div className={`w-20 h-20 ${isDark ? 'bg-emerald-500/20 border-emerald-400' : 'bg-emerald-100 border-emerald-500'} border-2 rounded-full flex items-center justify-center`}>
                  <Check className={`w-10 h-10 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
              ) : (
                <div className={`w-20 h-20 ${isDark ? 'bg-red-500/20 border-red-400' : 'bg-red-100 border-red-500'} border-2 rounded-full flex items-center justify-center`}>
                  <XCircle className={`w-10 h-10 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
              )}
            </div>

            {/* Status Message */}
            {booking.paymentStatus === 'paid' ? (
              <>
                <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Booking Confirmed! ✅</h2>
                <p className={`${theme.textSecondary} mb-6`}>Payment received. Awaiting lawyer approval.</p>

                <div className={`${theme.cardSecondary} border p-6 rounded-xl mb-6 text-left space-y-3 transition-colors`}>
                  <div className={`flex items-center gap-3 pb-3 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    {userPhoto && (
                      <img src={userPhoto} alt="You" className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <p className={`${theme.text} font-semibold`}>{booking.userName}</p>
                      <p className={`${theme.accent} text-sm`}>Booking with {booking.lawyerName}</p>
                    </div>
                  </div>
                  <div>
                    <p className={`${theme.accent} text-xs font-semibold uppercase`}>Booking ID</p>
                    <p className={`${theme.text} font-mono`}>{booking.id}</p>
                  </div>
                  <div>
                    <p className={`${theme.accent} text-xs font-semibold uppercase`}>Lawyer ID</p>
                    <p className={`${theme.textMuted} font-mono text-xs`}>{booking.lawyerId}</p>
                  </div>
                  <div>
                    <p className={`${theme.accent} text-xs font-semibold uppercase`}>Transaction ID</p>
                    <p className={`${theme.text} font-mono`}>{booking.transactionId}</p>
                  </div>
                  <div>
                    <p className={`${theme.accent} text-xs font-semibold uppercase`}>Amount Paid</p>
                    <p className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-semibold`}>₹{booking.amount}</p>
                  </div>
                  <div>
                    <p className={`${theme.accent} text-xs font-semibold uppercase`}>Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 ${isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'} rounded-full text-sm`}>
                      <Clock className="w-4 h-4" /> Pending Approval
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-red-300' : 'text-red-600'} mb-2`}>Payment Failed ❌</h2>
                <p className={`${isDark ? 'text-red-200/80' : 'text-red-600/80'} mb-6`}>Your payment could not be processed. Please try again.</p>

                <div className={`${isDark ? 'bg-red-900/20 border-red-400/30' : 'bg-red-50 border-red-200'} border p-4 rounded-xl mb-6`}>
                  <p className={`${isDark ? 'text-red-200' : 'text-red-700'} text-sm`}>
                    The booking with <span className="font-semibold">{booking.lawyerName}</span> was not completed.
                  </p>
                </div>
              </>
            )}

            <button onClick={onBack} className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              {booking.paymentStatus === 'paid' ? 'Back to Lawyers' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UserBookingPage;
