import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Briefcase, Phone, MessageCircle, Mail, X, ChevronDown, Users, Scale, Shield, Globe, Sun, Moon, ExternalLink, Plus, AlertCircle, IndianRupee, ClipboardList, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import UserBookingPage from './UserBookingPage';

// Booking Data Interface
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

// Lawyer Profile Interface
interface LawyerProfile {
  id: string;
  name: string;
  city: string;
  state: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  specialization: string;
  experience: number;
  fees?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  rating?: number;
  totalReviews?: number;
  casesClosed?: number;
  bio?: string;
  photo?: string;
  languages?: string[];
  availability?: string;
  verified?: boolean;
  upiId?: string;
}

// Lawyers are now loaded from localStorage (admin-created)
// No demo lawyers - only admin-added lawyers are shown

// Specialization Options
const specializations = [
  'All Specializations',
  'Criminal Law',
  'Family Law',
  'Property Law',
  'Cyber Law',
  'Labour Law',
  'Constitutional Law',
  'Consumer Law',
  'Corporate Law',
  'Tax Law',
  'Intellectual Property'
];

// Indian States
const states = [
  'All States',
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Gujarat',
  'Rajasthan',
  'Kerala',
  'West Bengal',
  'Uttar Pradesh',
  'Punjab',
  'Haryana'
];

// Get Google Maps URL
const getGoogleMapsUrl = (lawyer: LawyerProfile): string => {
  if (lawyer.latitude && lawyer.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${lawyer.latitude},${lawyer.longitude}`;
  }
  const searchQuery = encodeURIComponent(lawyer.address || `${lawyer.city}, ${lawyer.state}`);
  return `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
};

// Lawyer Card Component
const LawyerCard: React.FC<{ 
  lawyer: LawyerProfile; 
  theme: 'dark' | 'light'; 
  onViewDetails: (lawyer: LawyerProfile) => void;
  onBookLawyer: (lawyer: LawyerProfile) => void;
}> = ({ lawyer, theme, onViewDetails, onBookLawyer }) => {
  const isDark = theme === 'dark';
  
  const getInitials = (name: string) => {
    return name.split(' ').filter(n => n.length > 3).map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
      isDark 
        ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10' 
        : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
    }`}>
      {/* Header */}
      <div className={`p-5 ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${isDark ? 'border-blue-500/30' : 'border-blue-200'}`}>
              {lawyer.photo ? (
                <img src={lawyer.photo} alt={lawyer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(lawyer.name)}
                </div>
              )}
            </div>
            {lawyer.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lawyer.name}
                </h3>
                <p className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {lawyer.specialization}
                </p>
              </div>
              {lawyer.rating && (
                <div className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${isDark ? 'bg-amber-500/20' : 'bg-amber-50'}`}>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className={`font-bold text-sm ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{lawyer.rating}</span>
                </div>
              )}
            </div>

            {/* Location */}
            <a
              href={getGoogleMapsUrl(lawyer)}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 flex items-center gap-1.5 text-sm group ${isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-800'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>{lawyer.city}, {lawyer.state}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`px-5 py-3 grid grid-cols-3 gap-3 ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/50'}`}>
        <div className="text-center">
          <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.experience}+</p>
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Years Exp.</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.casesClosed || 0}</p>
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Cases Won</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.totalReviews || 0}</p>
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Reviews</p>
        </div>
      </div>

      {/* Fees & Languages */}
      <div className="px-5 py-3">
        {lawyer.fees && (
          <div className={`mb-3 p-2.5 rounded-lg ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
            <p className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Consultation: <span className="font-bold">{lawyer.fees}</span>
            </p>
          </div>
        )}

        {lawyer.languages && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {lawyer.languages.map((lang, idx) => (
              <span key={idx} className={`px-2 py-0.5 rounded text-xs font-medium ${
                isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={`px-5 pb-5 flex flex-col gap-2`}>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(lawyer)}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isDark 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            View Profile
          </button>
          {lawyer.whatsapp && (
            <a
              href={`https://wa.me/${lawyer.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          )}
        </div>
        {/* Book Now Button */}
        <button
          onClick={() => onBookLawyer(lawyer)}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <IndianRupee className="w-4 h-4" />
          Book Now - ₹100
        </button>
      </div>
    </div>
  );
};

// Lawyer Detail Modal
const LawyerDetailModal: React.FC<{ 
  lawyer: LawyerProfile; 
  theme: 'dark' | 'light'; 
  onClose: () => void;
  onBookLawyer: (lawyer: LawyerProfile) => void;
}> = ({ lawyer, theme, onClose, onBookLawyer }) => {
  const isDark = theme === 'dark';

  const getInitials = (name: string) => {
    return name.split(' ').filter(n => n.length > 3).map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl ${
        isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white'
      } shadow-2xl`}>
        {/* Header */}
        <div className={`sticky top-0 p-5 border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${isDark ? 'border-blue-500/30' : 'border-blue-200'}`}>
                {lawyer.photo ? (
                  <img src={lawyer.photo} alt={lawyer.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(lawyer.name)}
                  </div>
                )}
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.name}</h2>
                <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{lawyer.specialization}</p>
                {lawyer.verified && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-medium">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Bio */}
          {lawyer.bio && (
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>About</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{lawyer.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-3 p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <div className="text-center">
              <Briefcase className={`w-5 h-5 mx-auto mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.experience}+</p>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Years</p>
            </div>
            <div className="text-center">
              <Scale className={`w-5 h-5 mx-auto mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.casesClosed}</p>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Cases</p>
            </div>
            <div className="text-center">
              <Star className={`w-5 h-5 mx-auto mb-1 text-amber-500`} />
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lawyer.rating}</p>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Rating</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Contact Information</h3>
            
            <a
              href={getGoogleMapsUrl(lawyer)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
            >
              <MapPin className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{lawyer.address || `${lawyer.city}, ${lawyer.state}`}</span>
            </a>

            {lawyer.phone && (
              <a
                href={`tel:${lawyer.phone}`}
                className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              >
                <Phone className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{lawyer.phone}</span>
              </a>
            )}

            {lawyer.email && (
              <a
                href={`mailto:${lawyer.email}`}
                className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              >
                <Mail className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{lawyer.email}</span>
              </a>
            )}

            {lawyer.availability && (
              <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                <Globe className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{lawyer.availability}</span>
              </div>
            )}
          </div>

          {/* Fees */}
          {lawyer.fees && (
            <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
              <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                <strong>Consultation Fee:</strong> {lawyer.fees}
              </p>
            </div>
          )}

          {/* Languages */}
          {lawyer.languages && (
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Languages</h3>
              <div className="flex flex-wrap gap-2">
                {lawyer.languages.map((lang, idx) => (
                  <span key={idx} className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`sticky bottom-0 p-5 border-t ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              {lawyer.phone && (
                <a
                  href={`tel:${lawyer.phone}`}
                  className={`flex-1 py-3 rounded-xl font-medium text-center ${
                    isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  } transition-colors`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Call
                </a>
              )}
              {lawyer.whatsapp && (
                <a
                  href={`https://wa.me/${lawyer.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl font-medium text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  WhatsApp
                </a>
              )}
            </div>
            {/* Book Now Button */}
            <button
              onClick={() => onBookLawyer(lawyer)}
              className="w-full py-3.5 rounded-xl font-semibold text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <IndianRupee className="w-5 h-5" />
              Book Consultation - ₹100
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// My Bookings Modal - Shows user's booking statuses
const MyBookingsModal: React.FC<{
  userId: string;
  theme: 'dark' | 'light';
  onClose: () => void;
}> = ({ userId, theme, onClose }) => {
  const isDark = theme === 'dark';
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = () => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        const allBookings: BookingData[] = JSON.parse(storedBookings);
        const userBookings = allBookings.filter(b => b.userId === userId);
        // Sort by most recent first
        userBookings.sort((a, b) => (b.bookedAt || 0) - (a.bookedAt || 0));
        setBookings(userBookings);
      } catch (e) {
        console.error('Error loading bookings:', e);
        setBookings([]);
      }
    }
  };

  useEffect(() => {
    loadBookings();
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadBookings, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadBookings();
    setTimeout(() => setRefreshing(false), 500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-4 h-4" />
            Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const formatDate = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl ${
        isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white'
      } shadow-2xl flex flex-col`}>
        {/* Header */}
        <div className={`flex-shrink-0 p-5 border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <ClipboardList className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>My Bookings</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Track your booking requests
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-lg transition-all ${
                  isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
                } ${refreshing ? 'animate-spin' : ''}`}
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {bookings.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
              <ClipboardList className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                No Bookings Yet
              </p>
              <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Book a lawyer to see your booking status here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {booking.lawyerName}
                        </h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className={`space-y-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <p>
                          <span className="font-medium">Case Type:</span> {booking.caseType || 'General Consultation'}
                        </p>
                        <p>
                          <span className="font-medium">Amount Paid:</span> ₹{booking.amount || 100}
                        </p>
                        <p>
                          <span className="font-medium">Booked on:</span> {formatDate(booking.bookedAt || booking.createdAt)}
                        </p>
                      </div>

                      {/* Status Message */}
                      <div className={`mt-3 p-3 rounded-lg text-sm ${
                        booking.status === 'approved'
                          ? isDark ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : booking.status === 'rejected'
                          ? isDark ? 'bg-red-500/10 text-red-300 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-200'
                          : isDark ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {booking.status === 'approved' && (
                          <>✅ The lawyer has accepted your booking request. They will contact you soon.</>
                        )}
                        {booking.status === 'rejected' && (
                          <>❌ The lawyer has declined your booking request. You may try booking another lawyer.</>
                        )}
                        {booking.status === 'pending' && (
                          <>⏳ Your booking is awaiting the lawyer's response. This may take some time.</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex-shrink-0 p-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
          <p className={`text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Bookings auto-refresh every 5 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const LawyerDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [lawyersData, setLawyersData] = useState<LawyerProfile[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingLawyer, setBookingLawyer] = useState<LawyerProfile | null>(null);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [userBookingsCount, setUserBookingsCount] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lawyerDirectoryTheme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  const isDark = theme === 'dark';

  // Load lawyers from localStorage (admin-created lawyers only)
  useEffect(() => {
    const loadLawyers = () => {
      const storedLawyers = localStorage.getItem('lawyers');
      if (storedLawyers) {
        try {
          const parsed = JSON.parse(storedLawyers);
          setLawyersData(parsed);
        } catch (e) {
          console.error('Error loading lawyers:', e);
          setLawyersData([]);
        }
      } else {
        setLawyersData([]);
      }
    };
    loadLawyers();
    
    // Listen for storage changes
    window.addEventListener('storage', loadLawyers);
    return () => window.removeEventListener('storage', loadLawyers);
  }, []);

  useEffect(() => {
    localStorage.setItem('lawyerDirectoryTheme', theme);
  }, [theme]);

  // Load user bookings count
  useEffect(() => {
    const loadUserBookingsCount = () => {
      const userId = getUserId();
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        try {
          const allBookings = JSON.parse(storedBookings);
          const userBookings = allBookings.filter((b: BookingData) => b.userId === userId);
          setUserBookingsCount(userBookings.length);
        } catch (e) {
          setUserBookingsCount(0);
        }
      }
    };
    loadUserBookingsCount();
    
    // Listen for storage and custom events
    window.addEventListener('storage', loadUserBookingsCount);
    window.addEventListener('bookingCreated', loadUserBookingsCount);
    return () => {
      window.removeEventListener('storage', loadUserBookingsCount);
      window.removeEventListener('bookingCreated', loadUserBookingsCount);
    };
  }, []);

  // Generate user ID for booking
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user-' + Date.now();
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // Handle book lawyer click
  const handleBookLawyer = (lawyer: LawyerProfile) => {
    setBookingLawyer(lawyer);
    setShowBooking(true);
    setSelectedLawyer(null);
  };

  const filteredLawyers = lawyersData.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lawyer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All Specializations' || lawyer.specialization === selectedSpecialization;
    const matchesState = selectedState === 'All States' || lawyer.state === selectedState;
    return matchesSearch && matchesSpecialization && matchesState;
  });

  // Show booking page if a lawyer is selected for booking
  if (showBooking && bookingLawyer) {
    return (
      <UserBookingPage
        lawyer={{
          id: bookingLawyer.id,
          name: bookingLawyer.name,
          specialization: bookingLawyer.specialization,
          experience: bookingLawyer.experience,
          city: bookingLawyer.city,
          rating: bookingLawyer.rating,
          photo: bookingLawyer.photo,
          upiId: bookingLawyer.upiId || bookingLawyer.email?.replace('@', '') + '@upi'
        }}
        onBack={() => {
          setShowBooking(false);
          setBookingLawyer(null);
        }}
        userId={getUserId()}
      />
    );
  }

  return (
    <div className={`h-full flex flex-col overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Fixed Header */}
      <div className={`flex-shrink-0 border-b ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Users className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                Find Verified Lawyers
              </h1>
              <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Connect with experienced legal professionals across India
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* My Bookings Button */}
              <button
                onClick={() => setShowMyBookings(true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span className="hidden sm:inline">My Bookings</span>
                {userBookingsCount > 0 && (
                  <span className={`ml-1 px-2 py-0.5 text-xs font-bold rounded-full ${
                    isDark ? 'bg-white/20' : 'bg-white/30'
                  }`}>
                    {userBookingsCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className={`p-3 rounded-xl transition-all ${
                  isDark 
                    ? 'bg-slate-800 border border-slate-700 text-yellow-400 hover:bg-slate-700' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}>
            {/* Search */}
            <div className="relative mb-4">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search by name, city, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${
                  isDark 
                    ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full ${isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-200'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="grid sm:grid-cols-2 gap-3">
              {/* Specialization Filter */}
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl appearance-none cursor-pointer ${
                    isDark 
                      ? 'bg-slate-700/50 border border-slate-600 text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-900'
                  }`}
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              </div>

              {/* State Filter */}
              <div className="relative">
                <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl appearance-none cursor-pointer ${
                    isDark 
                      ? 'bg-slate-700/50 border border-slate-600 text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-900'
                  }`}
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mt-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Found <span className={isDark ? 'text-white' : 'text-slate-900'}>{filteredLawyers.length}</span> lawyers
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredLawyers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLawyers.map(lawyer => (
                <LawyerCard
                  key={lawyer.id}
                  lawyer={lawyer}
                  theme={theme}
                  onViewDetails={setSelectedLawyer}
                  onBookLawyer={handleBookLawyer}
                />
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
              <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {lawyersData.length === 0 ? 'No Lawyers Available Yet' : 'No lawyers found'}
              </p>
              <p className={`mt-2 max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lawyersData.length === 0 
                  ? 'Lawyers will appear here once the admin adds them to the system. Please check back later.'
                  : 'Try adjusting your search or filters to find lawyers.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lawyer Detail Modal */}
      {selectedLawyer && (
        <LawyerDetailModal
          lawyer={selectedLawyer}
          theme={theme}
          onClose={() => setSelectedLawyer(null)}
          onBookLawyer={handleBookLawyer}
        />
      )}

      {/* My Bookings Modal */}
      {showMyBookings && (
        <MyBookingsModal
          userId={getUserId()}
          theme={theme}
          onClose={() => setShowMyBookings(false)}
        />
      )}
    </div>
  );
};

export default LawyerDirectoryPage;
