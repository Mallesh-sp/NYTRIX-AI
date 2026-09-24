import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Award, Star, AlertCircle } from 'lucide-react';
import LawyerCard, { LawyerProfile } from '../components/LawyerCard';
import LegalDisclaimer from '../components/LegalDisclaimer';
import UserBookingPage from './UserBookingPage';

const LawyerDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [allLawyers, setAllLawyers] = useState<LawyerProfile[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);

  // Load lawyers from localStorage on mount (only admin-created lawyers)
  useEffect(() => {
    const saved = localStorage.getItem('lawyers');
    if (saved) {
      const customLawyers = JSON.parse(saved);
      setAllLawyers(customLawyers);
    }
  }, []);

  const specializations = [...new Set(allLawyers.map(l => l.specialization))];
  const cities = [...new Set(allLawyers.map(l => l.city))];

  const filteredLawyers = allLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = !selectedSpecialization || lawyer.specialization === selectedSpecialization;
    const matchesCity = !selectedCity || lawyer.city === selectedCity;
    return matchesSearch && matchesSpec && matchesCity;
  });

  // If a lawyer is selected, show the booking page
  if (selectedLawyer) {
    return (
      <UserBookingPage
        lawyer={selectedLawyer}
        onBack={() => setSelectedLawyer(null)}
        userId={'user-' + Date.now()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Lawyer Directory</h1>
          <p className="text-emerald-100 text-lg">Find experienced lawyers for your legal needs</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur rounded-xl shadow-lg border border-emerald-400/30 p-6 mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" />
            <input
              type="text"
              placeholder="Search lawyer name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-emerald-400/30 rounded-lg bg-purple-900/50 text-white placeholder-emerald-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Specialization Filter */}
            <div>
              <label className="block text-sm font-semibold text-emerald-300 mb-2">
                <Filter className="w-4 h-4 inline mr-2" /> Specialization
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSpecialization(null)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    !selectedSpecialization
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                  }`}
                >
                  All
                </button>
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialization(spec)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selectedSpecialization === spec
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                    }`}
                  >
                    {spec.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-emerald-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" /> City
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCity(null)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    !selectedCity
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                  }`}
                >
                  All
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selectedCity === city
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-purple-800/40 text-emerald-200 hover:bg-purple-800/60 border border-emerald-400/30'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              Found {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''}
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-300 bg-purple-800/40 border border-emerald-400/30 rounded-lg hover:bg-purple-800/60 transition-colors">
              <Star className="w-4 h-4" /> Sort by Rating
            </button>
          </div>

          {filteredLawyers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} onBook={() => setSelectedLawyer(lawyer)} />
              ))}
            </div>
          ) : allLawyers.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur rounded-lg border-2 border-dashed border-emerald-400/30">
              <AlertCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4 opacity-60" />
              <p className="text-white font-bold text-lg">No Lawyers Available Yet</p>
              <p className="text-emerald-200 text-sm mt-2">Admin is adding lawyers soon. Check back later!</p>
            </div>
          ) : (
            <div className="text-center py-12 bg-purple-800/40 backdrop-blur rounded-lg border border-emerald-400/30">
              <p className="text-emerald-100 font-semibold">No lawyers found matching your criteria.</p>
              <p className="text-emerald-300 text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur rounded-xl p-6 border border-emerald-400/30">
          <LegalDisclaimer />
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-emerald-200 text-sm">
          <p>This is a demonstration directory. Please verify lawyer credentials before hiring.</p>
          <p className="mt-1">Always ensure your lawyer is registered with the Bar Council of their state.</p>
        </div>
      </div>
    </div>
  );
};

export default LawyerDirectoryPage;
