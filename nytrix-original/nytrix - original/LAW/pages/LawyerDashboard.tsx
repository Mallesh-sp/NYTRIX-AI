import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, MessageCircle, LogOut } from 'lucide-react';
import BookingRequestCard, { BookingRequest } from '../components/BookingRequestCard';

interface LawyerDashboardProps {
  lawyerId: string;
  lawyerName: string;
  onLogout: () => void;
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ lawyerId, lawyerName, onLogout }) => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load bookings for this lawyer from localStorage
  useEffect(() => {
    const allBookings = localStorage.getItem('bookings');
    if (allBookings) {
      const bookingsData = JSON.parse(allBookings) as BookingRequest[];
      const lawyerBookings = bookingsData.filter((b) => b.lawyerId === lawyerId);
      setBookings(lawyerBookings);
    }
  }, [lawyerId]);

  const handleApprove = (bookingId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'approved' as const, respondedAt: Date.now() } : b
      );
      setBookings(updatedBookings);

      // Update localStorage
      const allBookings = localStorage.getItem('bookings');
      if (allBookings) {
        const bookingsData = JSON.parse(allBookings);
        const updated = bookingsData.map((b: BookingRequest) =>
          b.id === bookingId ? { ...b, status: 'approved', respondedAt: Date.now() } : b
        );
        localStorage.setItem('bookings', JSON.stringify(updated));

        // Send notification to user
        const booking = bookingsData.find((b: BookingRequest) => b.id === bookingId);
        if (booking) {
          const userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
          userMessages.push({
            id: 'msg-' + Date.now(),
            userId: booking.userId,
            type: 'booking_approved',
            title: 'Booking Approved',
            message: `✅ Your booking with ${lawyerName} has been approved! They will contact you shortly to discuss your case.`,
            read: false,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('userMessages', JSON.stringify(userMessages));
        }
      }

      setMessage({ type: 'success', text: 'Booking approved! Notification sent to user.' });
      setTimeout(() => setMessage(null), 3000);
      setIsProcessing(false);
    }, 500);
  };

  const handleReject = (bookingId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'rejected' as const, respondedAt: Date.now() } : b
      );
      setBookings(updatedBookings);

      // Update localStorage
      const allBookings = localStorage.getItem('bookings');
      if (allBookings) {
        const bookingsData = JSON.parse(allBookings);
        const updated = bookingsData.map((b: BookingRequest) =>
          b.id === bookingId ? { ...b, status: 'rejected', respondedAt: Date.now() } : b
        );
        localStorage.setItem('bookings', JSON.stringify(updated));

        // Send notification to user
        const booking = bookingsData.find((b: BookingRequest) => b.id === bookingId);
        if (booking) {
          const userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
          userMessages.push({
            id: 'msg-' + Date.now(),
            userId: booking.userId,
            type: 'booking_rejected',
            title: 'Booking Rejected',
            message: `❌ Your booking with ${lawyerName} has been rejected. You may explore other lawyers or contact for more information.`,
            read: false,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('userMessages', JSON.stringify(userMessages));
        }
      }

      setMessage({ type: 'success', text: 'Booking rejected. Notification sent to user.' });
      setTimeout(() => setMessage(null), 3000);
      setIsProcessing(false);
    }, 500);
  };

  const filteredBookings =
    filterStatus === 'all'
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Lawyer Dashboard</h1>
              <p className="text-sm text-gray-600">👨‍⚖️ {lawyerName}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border-2 flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-semibold">{message.text}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Total Bookings</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
              </div>
              <MessageCircle className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Pending</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border-2 border-gray-200">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings</h3>
            <p className="text-gray-600">
              {filterStatus === 'all'
                ? 'No booking requests yet. Check back later!'
                : `No ${filterStatus} bookings at the moment.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <BookingRequestCard
                key={booking.id}
                booking={booking}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={isProcessing}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LawyerDashboard;
