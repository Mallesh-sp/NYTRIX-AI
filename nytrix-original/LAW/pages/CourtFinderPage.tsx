import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Search, Filter, ChevronDown, Building2, Scale, Phone, Mail,
  Clock, Navigation, ExternalLink, X, Sun, Moon, Loader2, AlertCircle,
  Map as MapIcon, List, Star, Info, ArrowLeft, Locate,
  Home, Users, Briefcase, Shield, Heart, Gavel, ShoppingBag, HardHat
} from 'lucide-react';
import {
  Court, CourtType, courtsData, courtTypes,
  getAllStates, getDistrictsByState, getLocalAreasByDistrict,
  filterCourts, calculateDistance
} from '../data/courtData';

interface CourtFinderPageProps {
  onBack?: () => void;
}

// Court Type Icons
const courtTypeIcons: Record<CourtType, React.ReactNode> = {
  'High Court': <Scale className="w-5 h-5" />,
  'District Court': <Building2 className="w-5 h-5" />,
  'Civil Court': <Gavel className="w-5 h-5" />,
  'Family Court': <Heart className="w-5 h-5" />,
  'Sessions Court': <Shield className="w-5 h-5" />,
  'Magistrate Court': <Users className="w-5 h-5" />,
  'Consumer Court': <ShoppingBag className="w-5 h-5" />,
  'Labour Court': <HardHat className="w-5 h-5" />
};

// Court Type Colors
const courtTypeColors: Record<CourtType, { bg: string; text: string; border: string }> = {
  'High Court': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  'District Court': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Civil Court': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Family Court': { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  'Sessions Court': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Magistrate Court': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'Consumer Court': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  'Labour Court': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
};

const CourtFinderPage: React.FC<CourtFinderPageProps> = ({ onBack }) => {
  // Theme
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('courtfinder-theme');
    return saved ? saved === 'dark' : true;
  });

  // Location filters
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedLocalArea, setSelectedLocalArea] = useState<string>('all');
  const [selectedCourtType, setSelectedCourtType] = useState<CourtType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Districts and local areas based on selection
  const [districts, setDistricts] = useState<{ key: string; name: string }[]>([]);
  const [localAreas, setLocalAreas] = useState<string[]>([]);

  // Court data
  const [courts, setCourts] = useState<Court[]>(courtsData);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(courtsData);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  // UI States
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [courtsWithDistance, setCourtsWithDistance] = useState<(Court & { distance?: number })[]>([]);

  // States data
  const states = getAllStates();

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('courtfinder-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Update districts when state changes
  useEffect(() => {
    if (selectedState && selectedState !== 'all') {
      const stateDistricts = getDistrictsByState(selectedState);
      setDistricts(stateDistricts);
      setSelectedDistrict('all');
      setSelectedLocalArea('all');
      setLocalAreas([]);
    } else {
      setDistricts([]);
      setSelectedDistrict('all');
      setSelectedLocalArea('all');
      setLocalAreas([]);
    }
  }, [selectedState]);

  // Update local areas when district changes
  useEffect(() => {
    if (selectedState && selectedState !== 'all' && selectedDistrict && selectedDistrict !== 'all') {
      const areas = getLocalAreasByDistrict(selectedState, selectedDistrict);
      setLocalAreas(areas);
      setSelectedLocalArea('all');
    } else {
      setLocalAreas([]);
      setSelectedLocalArea('all');
    }
  }, [selectedState, selectedDistrict]);

  // Filter courts when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = filterCourts(courts, {
        stateKey: selectedState,
        districtKey: selectedDistrict,
        localArea: selectedLocalArea,
        courtType: selectedCourtType,
        searchQuery: searchQuery
      });

      // Calculate distances if user location is available
      if (userLocation) {
        const withDistances = filtered.map(court => ({
          ...court,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            court.latitude,
            court.longitude
          )
        }));
        // Sort by distance
        withDistances.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        setCourtsWithDistance(withDistances);
        setFilteredCourts(withDistances);
      } else {
        setFilteredCourts(filtered);
        setCourtsWithDistance(filtered);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedState, selectedDistrict, selectedLocalArea, selectedCourtType, searchQuery, courts, userLocation]);

  // Get user location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    }
  }, []);

  // No Google Maps initialization needed - using OpenStreetMap embeds instead
  // This provides a cleaner solution without requiring API keys

  // Get OpenStreetMap embed URL for a court
  const getMapEmbedUrl = (court: Court | null): string => {
    if (!court) {
      // Default to center of India
      return `https://www.openstreetmap.org/export/embed.html?bbox=68.1766,6.7472,97.4026,35.5087&layer=mapnik`;
    }
    const bbox = `${court.longitude - 0.01},${court.latitude - 0.01},${court.longitude + 0.01},${court.latitude + 0.01}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${court.latitude},${court.longitude}`;
  };

  // Theme classes
  const theme = {
    bg: isDark ? 'bg-[#0B1120]' : 'bg-gray-50',
    bgCard: isDark ? 'bg-slate-800/50' : 'bg-white',
    bgInput: isDark ? 'bg-slate-800/80' : 'bg-white',
    border: isDark ? 'border-slate-700' : 'border-gray-200',
    text: isDark ? 'text-white' : 'text-gray-900',
    textMuted: isDark ? 'text-slate-400' : 'text-gray-500',
    textSecondary: isDark ? 'text-slate-300' : 'text-gray-600',
    hover: isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-100',
    shadow: isDark ? 'shadow-xl shadow-black/20' : 'shadow-lg shadow-gray-200/50'
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-30 ${theme.bgCard} border-b ${theme.border} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Back & Title */}
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className={`p-2 rounded-lg ${theme.hover} ${theme.text} transition-colors`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl sm:text-2xl font-bold ${theme.text}`}>Find Court</h1>
                  <p className={`text-xs sm:text-sm ${theme.textMuted} hidden sm:block`}>
                    Locate courts across India
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getUserLocation}
                className={`p-2.5 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.text} ${theme.hover} transition-all flex items-center gap-2`}
                title="Use my location"
              >
                <Locate className="w-5 h-5 text-blue-500" />
                <span className="hidden sm:inline text-sm font-medium">My Location</span>
              </motion.button>

              {/* View Mode Toggle */}
              <div className={`flex items-center p-1 rounded-xl ${theme.bgInput} border ${theme.border}`}>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : `${theme.textMuted} ${theme.hover}`
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'map'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : `${theme.textMuted} ${theme.hover}`
                  }`}
                >
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDark(!isDark)}
                className={`p-2.5 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.hover} transition-all`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${theme.bgCard} rounded-2xl border ${theme.border} p-4 sm:p-6 mb-6 ${theme.shadow}`}
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
            <input
              type="text"
              placeholder="Search by court name, area, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.text} 
                placeholder:${theme.textMuted} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full ${theme.hover}`}
              >
                <X className={`w-4 h-4 ${theme.textMuted}`} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 mb-4 text-sm font-medium ${theme.textSecondary} ${theme.hover} px-3 py-1.5 rounded-lg transition-all`}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* State Selector */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                      <MapPin className="w-4 h-4 inline mr-1.5" />
                      State
                    </label>
                    <div className="relative">
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.text} 
                          appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
                      >
                        <option value="all">All States</option>
                        {states.map((state) => (
                          <option key={state.key} value={state.key}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                    </div>
                  </div>

                  {/* District Selector */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                      <Building2 className="w-4 h-4 inline mr-1.5" />
                      District
                    </label>
                    <div className="relative">
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={selectedState === 'all'}
                        className={`w-full px-4 py-3 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.text} 
                          appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="all">All Districts</option>
                        {districts.map((district) => (
                          <option key={district.key} value={district.key}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                    </div>
                  </div>

                  {/* Local Area Selector */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                      <Home className="w-4 h-4 inline mr-1.5" />
                      Local Area
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLocalArea}
                        onChange={(e) => setSelectedLocalArea(e.target.value)}
                        disabled={selectedDistrict === 'all'}
                        className={`w-full px-4 py-3 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.text} 
                          appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="all">All Areas</option>
                        {localAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                    </div>
                  </div>

                  {/* Court Type Selector */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                      <Scale className="w-4 h-4 inline mr-1.5" />
                      Court Type
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCourtType}
                        onChange={(e) => setSelectedCourtType(e.target.value as CourtType | 'All')}
                        className={`w-full px-4 py-3 rounded-xl ${theme.bgInput} border ${theme.border} ${theme.text} 
                          appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
                      >
                        <option value="All">All Court Types</option>
                        {courtTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                    </div>
                  </div>
                </div>

                {/* Quick Court Type Filters */}
                <div className="mt-4 pt-4 border-t border-dashed border-slate-700/50">
                  <p className={`text-sm font-medium ${theme.textMuted} mb-3`}>Quick Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCourtType('All')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCourtType === 'All'
                          ? 'bg-blue-500 text-white'
                          : `${theme.bgInput} ${theme.text} border ${theme.border} ${theme.hover}`
                      }`}
                    >
                      All
                    </button>
                    {courtTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedCourtType(type)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                          selectedCourtType === type
                            ? `${courtTypeColors[type].bg} ${courtTypeColors[type].text} border ${courtTypeColors[type].border}`
                            : `${theme.bgInput} ${theme.text} border ${theme.border} ${theme.hover}`
                        }`}
                      >
                        {courtTypeIcons[type]}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className={`text-sm ${theme.textMuted}`}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </span>
            ) : (
              <>
                Found <span className={`font-semibold ${theme.text}`}>{filteredCourts.length}</span> court{filteredCourts.length !== 1 ? 's' : ''}
                {userLocation && ' (sorted by distance)'}
              </>
            )}
          </p>
          {userLocation && (
            <span className={`text-xs ${theme.textMuted} flex items-center gap-1`}>
              <Locate className="w-3 h-3 text-green-500" />
              Location enabled
            </span>
          )}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Court List */}
          <div className={`${viewMode === 'map' ? 'lg:col-span-1 hidden lg:block' : 'lg:col-span-3'}`}>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className={`w-8 h-8 animate-spin ${theme.textMuted}`} />
              </div>
            ) : filteredCourts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${theme.bgCard} rounded-2xl border ${theme.border} p-12 text-center ${theme.shadow}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                  <AlertCircle className={`w-8 h-8 ${theme.textMuted}`} />
                </div>
                <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>No Courts Found</h3>
                <p className={`${theme.textMuted} max-w-sm mx-auto`}>
                  No courts match your current filters. Try adjusting your search criteria or selecting different locations.
                </p>
                <button
                  onClick={() => {
                    setSelectedState('all');
                    setSelectedDistrict('all');
                    setSelectedLocalArea('all');
                    setSelectedCourtType('All');
                    setSearchQuery('');
                  }}
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className={`grid gap-4 ${viewMode === 'list' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
                <AnimatePresence mode="popLayout">
                  {courtsWithDistance.map((court, index) => (
                    <CourtCard
                      key={court.id}
                      court={court}
                      isDark={isDark}
                      theme={theme}
                      isSelected={selectedCourt?.id === court.id}
                      onClick={() => setSelectedCourt(court)}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Map View */}
          {viewMode === 'map' && (
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${theme.bgCard} rounded-2xl border ${theme.border} overflow-hidden ${theme.shadow} h-[600px] relative`}
              >
                {/* OpenStreetMap Embed */}
                {selectedCourt ? (
                  <iframe
                    src={getMapEmbedUrl(selectedCourt)}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    title={`Map showing ${selectedCourt.name}`}
                  />
                ) : courtsWithDistance.length > 0 ? (
                  <iframe
                    src={getMapEmbedUrl(courtsWithDistance[0])}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    title="Court location map"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/90">
                    <MapIcon className={`w-16 h-16 ${theme.textMuted} mb-4`} />
                    <p className={`${theme.text} text-lg font-medium mb-2`}>No Courts Found</p>
                    <p className={`${theme.textMuted} text-sm text-center max-w-xs`}>
                      Adjust your filters to find courts in your area.
                    </p>
                  </div>
                )}

                {/* Selected Court Info Overlay */}
                {selectedCourt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-sm ${theme.bgCard} rounded-xl border ${theme.border} p-4 shadow-xl backdrop-blur-sm bg-opacity-95`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${courtTypeColors[selectedCourt.type].bg} ${courtTypeColors[selectedCourt.type].text}`}>
                            {selectedCourt.type}
                          </span>
                        </div>
                        <h3 className={`font-semibold ${theme.text} mb-1`}>{selectedCourt.name}</h3>
                        <p className={`text-sm ${theme.textMuted} mb-3`}>{selectedCourt.address}</p>
                        <div className="flex gap-2">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCourt.latitude},${selectedCourt.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                          >
                            <Navigation className="w-4 h-4" />
                            Directions
                          </a>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedCourt.latitude},${selectedCourt.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 px-3 py-1.5 ${theme.bgInput} border ${theme.border} ${theme.text} rounded-lg text-sm font-medium ${theme.hover} transition-colors`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open Maps
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCourt(null)}
                        className={`p-1 rounded-lg ${theme.hover}`}
                      >
                        <X className={`w-4 h-4 ${theme.textMuted}`} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Court Detail Modal */}
      <AnimatePresence>
        {selectedCourt && viewMode === 'list' && (
          <CourtDetailModal
            court={selectedCourt}
            isDark={isDark}
            theme={theme}
            onClose={() => setSelectedCourt(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Court Card Component
interface CourtCardProps {
  court: Court & { distance?: number };
  isDark: boolean;
  theme: any;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const CourtCard: React.FC<CourtCardProps> = ({ court, isDark, theme, isSelected, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`${theme.bgCard} rounded-xl border-2 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : theme.border
      } p-4 cursor-pointer transition-all hover:shadow-lg ${theme.hover} group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${courtTypeColors[court.type].bg}`}>
            {courtTypeIcons[court.type]}
          </div>
          <div>
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${courtTypeColors[court.type].bg} ${courtTypeColors[court.type].text}`}>
              {court.type}
            </span>
          </div>
        </div>
        {court.distance !== undefined && (
          <span className={`text-xs font-medium ${theme.textMuted} bg-slate-700/50 px-2 py-1 rounded-lg`}>
            {court.distance < 1 
              ? `${(court.distance * 1000).toFixed(0)}m`
              : `${court.distance.toFixed(1)} km`
            }
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className={`font-semibold ${theme.text} mb-2 group-hover:text-blue-400 transition-colors line-clamp-2`}>
        {court.name}
      </h3>

      <div className={`flex items-start gap-2 text-sm ${theme.textMuted} mb-3`}>
        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span className="line-clamp-2">{court.address}</span>
      </div>

      {/* Location Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`px-2 py-0.5 rounded-md text-xs ${isDark ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
          {court.state}
        </span>
        <span className={`px-2 py-0.5 rounded-md text-xs ${isDark ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
          {court.district}
        </span>
        <span className={`px-2 py-0.5 rounded-md text-xs ${isDark ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
          {court.localArea}
        </span>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {court.phone && (
          <div className={`flex items-center gap-1.5 ${theme.textMuted}`}>
            <Phone className="w-3.5 h-3.5" />
            <span className="truncate">{court.phone}</span>
          </div>
        )}
        {court.timings && (
          <div className={`flex items-center gap-1.5 ${theme.textMuted}`}>
            <Clock className="w-3.5 h-3.5" />
            <span className="truncate">{court.timings}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-dashed border-slate-700/50 flex gap-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${court.latitude},${court.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors"
        >
          <MapIcon className="w-4 h-4" />
          View on Map
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${court.latitude},${court.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Directions
        </a>
      </div>
    </motion.div>
  );
};

// Court Detail Modal
interface CourtDetailModalProps {
  court: Court;
  isDark: boolean;
  theme: any;
  onClose: () => void;
}

const CourtDetailModal: React.FC<CourtDetailModalProps> = ({ court, isDark, theme, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg ${theme.bgCard} rounded-2xl border ${theme.border} overflow-hidden ${theme.shadow}`}
      >
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-end p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium bg-white/20 text-white mb-3 inline-block`}>
              {court.type}
            </span>
            <h2 className="text-2xl font-bold text-white">{court.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Address */}
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                <MapPin className={`w-5 h-5 ${theme.textMuted}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${theme.textMuted} mb-1`}>Address</p>
                <p className={theme.text}>{court.address}</p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'} text-center`}>
              <p className={`text-xs ${theme.textMuted} mb-1`}>State</p>
              <p className={`text-sm font-medium ${theme.text}`}>{court.state}</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'} text-center`}>
              <p className={`text-xs ${theme.textMuted} mb-1`}>District</p>
              <p className={`text-sm font-medium ${theme.text}`}>{court.district}</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'} text-center`}>
              <p className={`text-xs ${theme.textMuted} mb-1`}>Area</p>
              <p className={`text-sm font-medium ${theme.text}`}>{court.localArea}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            {court.phone && (
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                  <Phone className={`w-4 h-4 ${theme.textMuted}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted}`}>Phone</p>
                  <a href={`tel:${court.phone}`} className={`${theme.text} hover:text-blue-400 transition-colors`}>
                    {court.phone}
                  </a>
                </div>
              </div>
            )}
            {court.email && (
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                  <Mail className={`w-4 h-4 ${theme.textMuted}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted}`}>Email</p>
                  <a href={`mailto:${court.email}`} className={`${theme.text} hover:text-blue-400 transition-colors`}>
                    {court.email}
                  </a>
                </div>
              </div>
            )}
            {court.timings && (
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                  <Clock className={`w-4 h-4 ${theme.textMuted}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted}`}>Timings</p>
                  <p className={theme.text}>{court.timings}</p>
                </div>
              </div>
            )}
            {court.established && (
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                  <Info className={`w-4 h-4 ${theme.textMuted}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted}`}>Established</p>
                  <p className={theme.text}>{court.established}</p>
                </div>
              </div>
            )}
          </div>

          {court.jurisdiction && (
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'} mb-6`}>
              <p className={`text-xs font-medium text-blue-400 mb-1`}>Jurisdiction</p>
              <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{court.jurisdiction}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${court.latitude},${court.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${court.latitude},${court.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-3 ${theme.bgInput} border ${theme.border} ${theme.text} rounded-xl font-medium ${theme.hover} transition-all`}
            >
              <ExternalLink className="w-5 h-5" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourtFinderPage;
