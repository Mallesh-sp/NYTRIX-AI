import React from 'react';
import { CheckCircle, XCircle, Clock, User, Phone, Mail, FileText } from 'lucide-react';

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

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  booking,
  onApprove,
  onReject,
  isProcessing,
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
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
  const caseType = booking.userDetails?.caseType || 'General Consultation';
  const caseDescription = booking.userDetails?.caseDescription || booking.caseDescription || 'No description provided';
  const urgency = booking.userDetails?.urgency || 'medium';
  const paymentMethod = booking.userDetails?.paymentMethod || booking.paymentMethod || null;
  const paymentAmount = booking.userDetails?.paymentAmount || booking.amount || null;
  const paymentStatus = booking.paymentStatus || 'paid';
  const userPhoto = booking.userPhoto || null;
  
  const bookedDate = new Date(booking.bookedAt || booking.createdAt || Date.now());

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
      {/* Header with Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {userPhoto ? (
            <img src={userPhoto} alt={userName} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {userName}
            </h3>
            <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
          </div>
        </div>
        {getStatusBadge(booking.status)}
      </div>

      {/* User Contact Information */}
      <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-indigo-600" />
          <div>
            <p className="text-xs text-gray-500 font-medium">Email</p>
            <p className="text-sm font-semibold text-gray-900">{userEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-indigo-600" />
          <div>
            <p className="text-xs text-gray-500 font-medium">Phone</p>
            <p className="text-sm font-semibold text-gray-900">{userPhone}</p>
          </div>
        </div>
      </div>

      {/* Case Information */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h4 className="font-semibold text-slate-900">Case Details</h4>
        </div>
        <div className="ml-7">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Type:</span> {caseType}
          </p>
          <p className={`px-3 py-2 rounded-lg border text-sm font-medium mb-2 ${getUrgencyColor(urgency)}`}>
            Priority: {urgency.toUpperCase()}
          </p>
          <p className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
            <span className="font-semibold block mb-1">Description:</span>
            {caseDescription}
          </p>
        </div>
      </div>

      {/* Payment Information */}
      {(paymentMethod || paymentAmount) && (
        <div className="mb-6">
          <div className={`border-2 rounded-lg p-4 ${paymentStatus === 'paid' ? 'bg-green-50 border-green-200' : paymentStatus === 'failed' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <p className={`text-sm font-semibold mb-2 ${paymentStatus === 'paid' ? 'text-green-700' : paymentStatus === 'failed' ? 'text-red-700' : 'text-yellow-700'}`}>
              {paymentStatus === 'paid' ? '✅ Payment Confirmed' : paymentStatus === 'failed' ? '❌ Payment Failed' : '⏳ Payment Pending'}
            </p>
            {paymentMethod && (
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Method:</span> {paymentMethod.toUpperCase()}
              </p>
            )}
            {paymentAmount && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Amount:</span> ₹{paymentAmount}
              </p>
            )}
            {booking.transactionId && (
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-semibold">Transaction ID:</span> {booking.transactionId}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 pb-4 border-t border-gray-200 pt-4">
        <Clock className="w-4 h-4" />
        <span>Booked {bookedDate.toLocaleDateString()} at {bookedDate.toLocaleTimeString()}</span>
      </div>

      {/* Action Buttons */}
      {booking.status === 'pending' && (
        <div className="flex gap-3">
          <button
            onClick={() => onApprove(booking.id)}
            disabled={isProcessing}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-5 h-5" />
            Approve
          </button>
          <button
            onClick={() => onReject(booking.id)}
            disabled={isProcessing}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className="w-5 h-5" />
            Reject
          </button>
        </div>
      )}

      {booking.status !== 'pending' && (
        <div className="p-4 rounded-lg bg-gray-100 text-center text-sm font-semibold text-gray-700">
          {booking.status === 'approved' ? '✅ Case Approved' : '❌ Case Rejected'}
        </div>
      )}
    </div>
  );
};

export default BookingRequestCard;
export type { BookingRequest, UserDetails };
