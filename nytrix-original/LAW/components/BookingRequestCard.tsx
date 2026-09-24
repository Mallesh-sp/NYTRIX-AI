import React from 'react';
import { CheckCircle, XCircle, Clock, User, Phone, Mail, FileText, CreditCard, MapPin } from 'lucide-react';

interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  caseType: string;
  caseDescription: string;
  urgency: 'low' | 'medium' | 'high';
  paymentMethod?: 'upi' | 'card' | 'bank' | 'cash';
  paymentAmount?: number;
}

interface BookingRequest {
  id: string;
  userId: string;
  userEmail?: string;
  lawyerId: string;
  lawyerName?: string;
  userDetails?: UserDetails;
  // New flat format from UserBookingPage
  userName?: string;
  userPhone?: string;
  userCity?: string;
  userPhoto?: string | null;
  caseType?: string;
  caseDescription?: string;
  amount?: number;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  transactionId?: string;
  status: 'pending' | 'approved' | 'rejected';
  bookedAt?: number;
  createdAt?: string;
  respondedAt?: number;
}

interface BookingRequestCardProps {
  booking: BookingRequest;
  onApprove: (bookingId: string) => void;
  onReject: (bookingId: string) => void;
  isProcessing: boolean;
}

// Get theme from localStorage
const getIsDark = () => {
  const saved = localStorage.getItem('nytrix-lawyer-theme');
  return saved === 'dark';
};

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  booking,
  onApprove,
  onReject,
  isProcessing,
}) => {
  const isDark = getIsDark();
  
  // Theme classes
  const theme = {
    card: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    cardHover: isDark ? 'hover:shadow-xl hover:shadow-blue-900/20' : 'hover:shadow-lg',
    text: isDark ? 'text-white' : 'text-slate-900',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-600',
    textLight: isDark ? 'text-gray-300' : 'text-gray-700',
    detailsBg: isDark ? 'bg-gray-700/50' : 'bg-gray-50',
    descriptionBg: isDark ? 'bg-gray-700' : 'bg-gray-100',
    borderLight: isDark ? 'border-gray-700' : 'border-gray-200',
    iconColor: isDark ? 'text-blue-400' : 'text-indigo-600',
    avatarBg: isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-indigo-100 text-indigo-600',
    avatarBorder: isDark ? 'border-blue-500' : 'border-indigo-200',
    finalStatus: isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700',
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return isDark 
          ? 'bg-red-900/30 border-red-700 text-red-400' 
          : 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return isDark 
          ? 'bg-amber-900/30 border-amber-700 text-amber-400' 
          : 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low':
        return isDark 
          ? 'bg-green-900/30 border-green-700 text-green-400' 
          : 'bg-green-50 border-green-200 text-green-700';
      default:
        return isDark 
          ? 'bg-gray-700 border-gray-600 text-gray-400' 
          : 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'}`}>
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-700'}`}>
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  // Handle both old format (userDetails) and new flat format
  const userName = booking.userDetails?.fullName || booking.userName || 'Unknown User';
  const userEmail = booking.userDetails?.email || booking.userEmail || 'N/A';
  const userPhone = booking.userDetails?.phone || booking.userPhone || 'N/A';
  const userCity = booking.userCity || 'N/A';
  const caseType = booking.userDetails?.caseType || booking.caseType || 'General Consultation';
  const caseDescription = booking.userDetails?.caseDescription || booking.caseDescription || 'No description provided';
  const urgency = booking.userDetails?.urgency || 'medium';
  const paymentMethod = booking.userDetails?.paymentMethod || booking.paymentMethod || null;
  const paymentAmount = booking.userDetails?.paymentAmount || booking.amount || null;
  const paymentStatus = booking.paymentStatus || 'paid';
  const userPhoto = booking.userPhoto || null;
  
  const bookedDate = new Date(booking.bookedAt || booking.createdAt || Date.now());

  return (
    <div className={`border-2 rounded-xl p-6 ${theme.card} ${theme.cardHover} transition-all`}>
      {/* Header with Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {userPhoto ? (
            <img src={userPhoto} alt={userName} className={`w-12 h-12 rounded-full object-cover border-2 ${theme.avatarBorder}`} />
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${theme.avatarBg}`}>
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className={`text-lg font-bold ${theme.text} mb-1`}>
              {userName}
            </h3>
            <p className={`text-sm ${theme.textMuted}`}>Booking ID: {booking.id}</p>
          </div>
        </div>
        {getStatusBadge(booking.status)}
      </div>

      {/* User Contact Information */}
      <div className={`space-y-3 mb-6 p-4 ${theme.detailsBg} rounded-lg`}>
        <div className="flex items-center gap-3">
          <Mail className={`w-4 h-4 ${theme.iconColor}`} />
          <div>
            <p className={`text-xs ${theme.textMuted} font-medium`}>Email</p>
            <p className={`text-sm font-semibold ${theme.text}`}>{userEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className={`w-4 h-4 ${theme.iconColor}`} />
          <div>
            <p className={`text-xs ${theme.textMuted} font-medium`}>Phone</p>
            <p className={`text-sm font-semibold ${theme.text}`}>{userPhone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className={`w-4 h-4 ${theme.iconColor}`} />
          <div>
            <p className={`text-xs ${theme.textMuted} font-medium`}>City</p>
            <p className={`text-sm font-semibold ${theme.text}`}>{userCity}</p>
          </div>
        </div>
      </div>

      {/* Case Information */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText className={`w-5 h-5 ${theme.iconColor}`} />
          <h4 className={`font-semibold ${theme.text}`}>Case Details</h4>
        </div>
        <div className="ml-7 space-y-2">
          <p className={`text-sm ${theme.textLight}`}>
            <span className="font-semibold">Type:</span> {caseType}
          </p>
          <p className={`px-3 py-2 rounded-lg border text-sm font-medium ${getUrgencyColor(urgency)}`}>
            Priority: {urgency.toUpperCase()}
          </p>
          <div className={`text-sm ${theme.descriptionBg} p-3 rounded-lg`}>
            <span className={`font-semibold block mb-1 ${theme.text}`}>Description:</span>
            <p className={theme.textLight}>{caseDescription}</p>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      {(paymentMethod || paymentAmount) && (
        <div className="mb-6">
          <div className={`border-2 rounded-lg p-4 ${
            paymentStatus === 'paid' 
              ? isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200' 
              : paymentStatus === 'failed' 
                ? isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200' 
                : isDark ? 'bg-amber-900/20 border-amber-700' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className={`w-4 h-4 ${
                paymentStatus === 'paid' 
                  ? isDark ? 'text-green-400' : 'text-green-600' 
                  : paymentStatus === 'failed' 
                    ? isDark ? 'text-red-400' : 'text-red-600' 
                    : isDark ? 'text-amber-400' : 'text-yellow-600'
              }`} />
              <p className={`text-sm font-semibold ${
                paymentStatus === 'paid' 
                  ? isDark ? 'text-green-400' : 'text-green-700' 
                  : paymentStatus === 'failed' 
                    ? isDark ? 'text-red-400' : 'text-red-700' 
                    : isDark ? 'text-amber-400' : 'text-yellow-700'
              }`}>
                {paymentStatus === 'paid' ? '✅ Payment Confirmed' : paymentStatus === 'failed' ? '❌ Payment Failed' : '⏳ Payment Pending'}
              </p>
            </div>
            {paymentMethod && (
              <p className={`text-sm ${theme.textLight} mb-1`}>
                <span className="font-semibold">Method:</span> {paymentMethod.toUpperCase()}
              </p>
            )}
            {paymentAmount && (
              <p className={`text-sm ${theme.textLight}`}>
                <span className="font-semibold">Amount:</span> ₹{paymentAmount}
              </p>
            )}
            {booking.transactionId && (
              <p className={`text-sm ${theme.textMuted} mt-1 text-xs`}>
                <span className="font-semibold">Transaction ID:</span> {booking.transactionId}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className={`flex items-center gap-2 text-xs ${theme.textMuted} mb-6 pb-4 border-t ${theme.borderLight} pt-4`}>
        <Clock className="w-4 h-4" />
        <span>Booked on {bookedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {bookedDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
      </div>

      {/* Action Buttons */}
      {booking.status === 'pending' && (
        <div className="flex gap-3">
          <button
            onClick={() => onApprove(booking.id)}
            disabled={isProcessing}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20"
          >
            <CheckCircle className="w-5 h-5" />
            Approve
          </button>
          <button
            onClick={() => onReject(booking.id)}
            disabled={isProcessing}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20"
          >
            <XCircle className="w-5 h-5" />
            Reject
          </button>
        </div>
      )}

      {booking.status !== 'pending' && (
        <div className={`p-4 rounded-xl text-center text-sm font-semibold ${theme.finalStatus}`}>
          {booking.status === 'approved' ? '✅ Case Approved - Client notified' : '❌ Case Rejected - Client notified'}
        </div>
      )}
    </div>
  );
};

export default BookingRequestCard;
export type { BookingRequest, UserDetails };
