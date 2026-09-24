import React, { useState } from 'react';
import { MapPin, Award, Phone, MessageCircle, Mail, MapPinIcon, Plus, ExternalLink } from 'lucide-react';

export interface LawyerProfile {
  id: string;
  name: string;
  city: string;
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
  casesClosed?: number;
  bio?: string;
  photo?: string;
  upiId?: string;
}

interface LawyerCardProps {
  lawyer: LawyerProfile;
  onBook?: (lawyer: LawyerProfile) => void;
}

// Helper function to generate Google Maps URL
const getGoogleMapsUrl = (lawyer: LawyerProfile): string => {
  if (lawyer.latitude && lawyer.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${lawyer.latitude},${lawyer.longitude}`;
  }
  // Fallback to address/city search if no coordinates
  const searchQuery = encodeURIComponent(lawyer.address || lawyer.city);
  return `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
};

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate initials for fallback avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 border border-emerald-400/30 rounded-xl p-5 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all backdrop-blur">
        {/* Header with Photo */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Profile Photo */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-400/50 flex-shrink-0">
              {lawyer.photo && !imageError ? (
                <img 
                  src={lawyer.photo} 
                  alt={lawyer.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(lawyer.name)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-100">{lawyer.name}</h3>
              <p className="text-sm font-semibold text-teal-300 mt-1">{lawyer.specialization}</p>
            </div>
          </div>
          {lawyer.rating && (
            <div className="bg-amber-500/30 px-2 py-1 rounded-lg text-center border border-amber-400/30">
              <p className="text-xs font-bold text-amber-200">⭐ {lawyer.rating}</p>
            </div>
          )}
        </div>

        {/* Location - Clickable Google Maps */}
        <a
          href={getGoogleMapsUrl(lawyer)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-emerald-300 text-sm mb-3 hover:text-emerald-200 transition-colors group"
        >
          <MapPin className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>{lawyer.address || lawyer.city}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Experience & Cases */}
        <div className="grid grid-cols-2 gap-3 mb-4 bg-purple-900/30 p-3 rounded-lg border border-emerald-400/20">
          <div>
            <p className="text-xs text-emerald-400 font-semibold uppercase">Experience</p>
            <p className="text-lg font-bold text-emerald-300">{lawyer.experience}+</p>
            <p className="text-xs text-emerald-300">Years</p>
          </div>
          {lawyer.casesClosed && (
            <div>
              <p className="text-xs text-emerald-400 font-semibold uppercase">Cases</p>
              <p className="text-lg font-bold text-emerald-300">{lawyer.casesClosed}</p>
              <p className="text-xs text-emerald-300">Closed</p>
            </div>
          )}
        </div>

        {/* Fees */}
        {lawyer.fees && (
          <div className="bg-teal-500/20 border border-teal-400/30 p-2 rounded-lg mb-4">
            <p className="text-xs text-teal-200 font-semibold">Fees: <span className="font-bold">{lawyer.fees}</span></p>
          </div>
        )}

        {/* Contact Buttons */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-purple-800/40 border border-emerald-400/30 text-emerald-200 py-2 rounded-lg font-semibold text-sm hover:bg-purple-800/60 transition-all"
          >
            View Details
          </button>
          {onBook && (
            <button
              onClick={() => onBook(lawyer)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Book Now
            </button>
          )}
          {lawyer.whatsapp && (
            <a
              href={`https://wa.me/${lawyer.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-emerald-400/30">
            {/* Header with Photo */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                {/* Large Profile Photo */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-emerald-400/50 flex-shrink-0">
                  {lawyer.photo && !imageError ? (
                    <img 
                      src={lawyer.photo} 
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl">
                      {getInitials(lawyer.name)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-100">{lawyer.name}</h2>
                  <p className="text-teal-300 font-semibold mt-1">{lawyer.specialization}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-emerald-400 hover:text-emerald-300 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Bio */}
            {lawyer.bio && (
              <p className="text-emerald-200 text-sm mb-4 leading-relaxed">{lawyer.bio}</p>
            )}

            {/* Details */}
            <div className="space-y-3 mb-4">
              <a
                href={getGoogleMapsUrl(lawyer)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-emerald-200 hover:text-emerald-100 transition-colors group bg-purple-900/30 p-3 rounded-lg border border-emerald-400/20 hover:border-emerald-400/40"
              >
                <MapPinIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm flex-1">{lawyer.address || lawyer.city}</span>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </a>
              <div className="flex items-center gap-3 text-emerald-200">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">{lawyer.experience}+ years experience</span>
              </div>
              {lawyer.casesClosed && (
                <div className="flex items-center gap-3 text-emerald-200">
                  <span className="text-sm">✓ {lawyer.casesClosed} cases successfully closed</span>
                </div>
              )}
              {lawyer.fees && (
                <div className="flex items-center gap-3 bg-teal-500/20 p-3 rounded-lg border border-teal-400/30">
                  <span className="text-sm font-semibold text-teal-200">Fees: {lawyer.fees}</span>
                </div>
              )}
            </div>

            {/* Contact Methods */}
            <div className="space-y-2 border-t border-emerald-400/30 pt-4">
              {lawyer.phone && (
                <a
                  href={`tel:${lawyer.phone}`}
                  className="flex items-center gap-3 w-full bg-purple-900/40 p-3 rounded-lg hover:bg-purple-900/60 transition-colors border border-emerald-400/20"
                >
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-200">{lawyer.phone}</span>
                </a>
              )}
              {lawyer.email && (
                <a
                  href={`mailto:${lawyer.email}`}
                  className="flex items-center gap-3 w-full bg-purple-900/40 p-3 rounded-lg hover:bg-purple-900/60 transition-colors border border-emerald-400/20"
                >
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-200">{lawyer.email}</span>
                </a>
              )}
              {lawyer.whatsapp && (
                <a
                  href={`https://wa.me/${lawyer.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-emerald-500/20 p-3 rounded-lg hover:bg-emerald-500/30 transition-colors border border-emerald-400/30"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-200">WhatsApp: {lawyer.whatsapp}</span>
                </a>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LawyerCard;
