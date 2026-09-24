import React, { useState, useRef } from 'react';
import { ArrowLeft, Check, AlertCircle, Camera, X, Clock, XCircle, CreditCard, Smartphone, Copy, CheckCircle } from 'lucide-react';
import { LawyerProfile } from '../components/LawyerCard';

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
  caseDescription: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}

const UserBookingPage: React.FC<UserBookingPageProps> = ({ lawyer, onBack, userId }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userCity: '',
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
      caseDescription: formData.caseDescription,
      amount: BOOKING_AMOUNT,
      status: status === 'paid' ? 'pending' : 'rejected',
      paymentStatus: status,
      paymentMethod: paymentMethod,
      transactionId: transactionId,
      createdAt: new Date().toISOString(),
    };

    setBooking(newBooking);

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <button onClick={onBack} className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 mb-6">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          {/* Lawyer Info Card with Photo */}
          <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-6 rounded-lg mb-8 backdrop-blur">
            <div className="flex items-center gap-4">
              {(lawyer as any).photo ? (
                <img src={(lawyer as any).photo} alt={lawyer.name} className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400/50" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl">
                  {lawyer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-emerald-100">{lawyer.name}</h2>
                <p className="text-teal-300 font-semibold">{lawyer.specialization}</p>
                <p className="text-emerald-300 text-sm mt-1">📍 {lawyer.city} | ⭐ {lawyer.rating || 'N/A'} | {lawyer.experience}+ years</p>
              </div>
            </div>
            {/* Show UPI ID */}
            <div className="mt-4 p-3 bg-purple-900/50 rounded-lg border border-emerald-400/20">
              <p className="text-emerald-400 text-xs font-semibold uppercase mb-1">Lawyer's UPI ID</p>
              <div className="flex items-center gap-2">
                <p className="text-emerald-100 font-mono">{lawyerUpiId}</p>
                <button onClick={copyUpiId} className="text-emerald-400 hover:text-emerald-300">
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-8 rounded-lg backdrop-blur space-y-4">
            <h3 className="text-xl font-bold text-emerald-100 mb-6">Enter Your Details</h3>

            {/* Profile Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-emerald-200 mb-3">Your Profile Photo (Optional)</label>
              <div className="flex items-center gap-4">
                {userPhoto ? (
                  <div className="relative">
                    <img src={userPhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400/50" />
                    <button 
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-400/50 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors"
                  >
                    <Camera className="w-8 h-8 text-emerald-400" />
                    <span className="text-xs text-emerald-300 mt-1">Add Photo</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="text-emerald-300 text-sm">
                  <p>Upload your photo</p>
                  <p className="text-xs text-emerald-400">Max 5MB, JPG/PNG</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Full Name *</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} 
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/30 text-emerald-100 placeholder-emerald-400/50 focus:border-emerald-400 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Email *</label>
              <input type="email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} 
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/30 text-emerald-100 placeholder-emerald-400/50 focus:border-emerald-400 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Phone *</label>
              <input type="tel" name="userPhone" value={formData.userPhone} onChange={handleInputChange} 
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/30 text-emerald-100 placeholder-emerald-400/50 focus:border-emerald-400 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">City *</label>
              <input type="text" name="userCity" value={formData.userCity} onChange={handleInputChange} 
                placeholder="Your city"
                className="w-full px-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/30 text-emerald-100 placeholder-emerald-400/50 focus:border-emerald-400 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Case Description *</label>
              <textarea name="caseDescription" value={formData.caseDescription} onChange={handleInputChange} rows={5}
                placeholder="Describe your case or legal issue..."
                className="w-full px-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/30 text-emerald-100 placeholder-emerald-400/50 resize-none focus:border-emerald-400 focus:outline-none" />
            </div>

            {/* Booking Fee Info */}
            <div className="bg-emerald-500/10 border border-emerald-400/30 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-emerald-200 font-semibold">Booking Fee:</span>
                <span className="text-2xl font-bold text-teal-300">₹{BOOKING_AMOUNT}</span>
              </div>
              <p className="text-emerald-300/70 text-xs mt-2">* Payment directly to lawyer via UPI</p>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="button" onClick={onBack} className="flex-1 px-6 py-3 border border-emerald-400/30 text-emerald-300 rounded-lg font-semibold hover:bg-purple-800/40 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleProceedToPayment} className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
        <div className="max-w-lg mx-auto px-4">
          <button onClick={() => setStep('details')} className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 mb-6">
            <ArrowLeft className="w-5 h-5" /> Back to Details
          </button>

          <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-8 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-bold text-emerald-100 mb-6 text-center">💳 Pay via UPI</h2>

            {/* Payment Summary */}
            <div className="bg-purple-900/40 border border-emerald-400/20 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                {(lawyer as any).photo ? (
                  <img src={(lawyer as any).photo} alt={lawyer.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    {lawyer.name[0]}
                  </div>
                )}
                <div>
                  <p className="text-emerald-100 font-semibold">{lawyer.name}</p>
                  <p className="text-emerald-400 text-sm">{lawyer.specialization}</p>
                </div>
              </div>
              
              <div className="border-t border-emerald-400/20 pt-4">
                <p className="text-emerald-300 text-sm mb-1">UPI ID:</p>
                <div className="flex items-center gap-2 bg-purple-800/50 px-3 py-2 rounded-lg">
                  <p className="text-emerald-100 font-mono flex-1">{lawyerUpiId}</p>
                  <button onClick={copyUpiId} className="text-emerald-400 hover:text-emerald-300">
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="border-t border-emerald-400/20 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300">Amount to Pay</span>
                  <span className="text-3xl font-bold text-teal-300">₹{BOOKING_AMOUNT}</span>
                </div>
              </div>
            </div>

            {!paymentProcessing ? (
              <>
                {/* UPI Payment Options */}
                <div className="space-y-3 mb-6">
                  <p className="text-emerald-200 font-semibold mb-3 text-center">Choose Payment App:</p>
                  
                  <button 
                    onClick={() => openPaymentApp('gpay')}
                    className="w-full flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 border border-emerald-400/30 rounded-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🅖</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white font-semibold">Google Pay</p>
                      <p className="text-emerald-300 text-sm">Pay with GPay</p>
                    </div>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button 
                    onClick={() => openPaymentApp('paytm')}
                    className="w-full flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 border border-emerald-400/30 rounded-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">₽</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white font-semibold">Paytm</p>
                      <p className="text-emerald-300 text-sm">Pay with Paytm UPI</p>
                    </div>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button 
                    onClick={() => openPaymentApp('phonepe')}
                    className="w-full flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 border border-emerald-400/30 rounded-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">📱</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white font-semibold">PhonePe</p>
                      <p className="text-emerald-300 text-sm">Pay with PhonePe</p>
                    </div>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button 
                    onClick={() => openPaymentApp('upi')}
                    className="w-full flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 border border-emerald-400/30 rounded-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white font-semibold">Other UPI Apps</p>
                      <p className="text-emerald-300 text-sm">BHIM, Amazon Pay, etc.</p>
                    </div>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                <div className="text-center text-emerald-300/70 text-xs">
                  <p>💡 Click on an app to open it for payment</p>
                  <p>After payment, confirm with transaction ID</p>
                </div>
              </>
            ) : (
              <>
                {/* Transaction Verification */}
                <div className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-300 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Verify Your Payment</span>
                    </div>
                    <p className="text-amber-200/80 text-sm">
                      Complete the payment in {paymentMethod === 'gpay' ? 'Google Pay' : paymentMethod === 'paytm' ? 'Paytm' : paymentMethod === 'phonepe' ? 'PhonePe' : 'your UPI app'} and enter the transaction ID below.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-200 mb-2">UPI Transaction ID / Reference Number *</label>
                    <input 
                      type="text" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter 12-digit UPI Ref No."
                      className="w-full px-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/30 text-emerald-100 placeholder-emerald-400/50 focus:border-emerald-400 focus:outline-none font-mono"
                    />
                    <p className="text-emerald-400/70 text-xs mt-1">Find this in your UPI app's transaction history</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => confirmPayment('failed')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 border border-red-400/30 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Payment Failed
                    </button>
                    <button 
                      onClick={() => confirmPayment('paid')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Payment Done
                    </button>
                  </div>

                  <button 
                    onClick={() => setPaymentProcessing(false)}
                    className="w-full px-4 py-2 text-emerald-300 hover:text-emerald-200 text-sm"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 p-8 rounded-lg backdrop-blur text-center">
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              {booking.paymentStatus === 'paid' ? (
                <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-emerald-400" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-500/20 border-2 border-red-400 rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-400" />
                </div>
              )}
            </div>

            {/* Status Message */}
            {booking.paymentStatus === 'paid' ? (
              <>
                <h2 className="text-2xl font-bold text-emerald-100 mb-2">Booking Confirmed! ✅</h2>
                <p className="text-emerald-300 mb-6">Payment received. Awaiting lawyer approval.</p>

                <div className="bg-purple-900/40 border border-emerald-400/20 p-6 rounded-lg mb-6 text-left space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-emerald-400/20">
                    {userPhoto && (
                      <img src={userPhoto} alt="You" className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="text-emerald-100 font-semibold">{booking.userName}</p>
                      <p className="text-emerald-400 text-sm">Booking with {booking.lawyerName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-xs font-semibold uppercase">Booking ID</p>
                    <p className="text-emerald-100 font-mono">{booking.id}</p>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-xs font-semibold uppercase">Transaction ID</p>
                    <p className="text-emerald-100 font-mono">{booking.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-xs font-semibold uppercase">Amount Paid</p>
                    <p className="text-teal-300 font-semibold">₹{booking.amount}</p>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-xs font-semibold uppercase">Status</p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                      <Clock className="w-4 h-4" /> Pending Approval
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-300 mb-2">Payment Failed ❌</h2>
                <p className="text-red-200/80 mb-6">Your payment could not be processed. Please try again.</p>

                <div className="bg-red-900/20 border border-red-400/30 p-4 rounded-lg mb-6">
                  <p className="text-red-200 text-sm">
                    The booking with <span className="font-semibold">{booking.lawyerName}</span> was not completed.
                  </p>
                </div>
              </>
            )}

            <button onClick={onBack} className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
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
