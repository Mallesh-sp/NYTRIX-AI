import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, MapPin, FileText, Phone, Mail, MessageCircle } from 'lucide-react';
import { LawyerProfile } from '../components/LawyerCard';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<LawyerProfile>>({
    name: '',
    city: '',
    specialization: '',
    experience: 0,
    fees: '',
    phone: '',
    whatsapp: '',
    email: '',
    rating: 4.5,
    casesClosed: 0,
    bio: '',
  });

  // Load lawyers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lawyers');
    if (saved) {
      setLawyers(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience' || name === 'rating' || name === 'casesClosed'
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.city || !formData.specialization) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedLawyers: LawyerProfile[];

    if (editingId) {
      // Update existing lawyer
      updatedLawyers = lawyers.map((l) =>
        l.id === editingId ? { ...l, ...formData } as LawyerProfile : l
      );
      setEditingId(null);
    } else {
      // Add new lawyer
      const newLawyer: LawyerProfile = {
        id: Date.now().toString(),
        ...formData as LawyerProfile,
      };
      updatedLawyers = [...lawyers, newLawyer];
    }

    setLawyers(updatedLawyers);
    localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
    setFormData({
      name: '',
      city: '',
      specialization: '',
      experience: 0,
      fees: '',
      phone: '',
      whatsapp: '',
      email: '',
      rating: 4.5,
      casesClosed: 0,
      bio: '',
    });
    setShowForm(false);
  };

  const handleEdit = (lawyer: LawyerProfile) => {
    setFormData(lawyer);
    setEditingId(lawyer.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lawyer?')) {
      const updatedLawyers = lawyers.filter((l) => l.id !== id);
      setLawyers(updatedLawyers);
      localStorage.setItem('lawyers', JSON.stringify(updatedLawyers));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      city: '',
      specialization: '',
      experience: 0,
      fees: '',
      phone: '',
      whatsapp: '',
      email: '',
      rating: 4.5,
      casesClosed: 0,
      bio: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-600">Manage lawyer profiles and directory</p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Lawyer
        </button>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingId ? 'Edit Lawyer Profile' : 'Add New Lawyer'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., Pandra Mari"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City/Location *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., Chennai"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">Select Specialization</option>
                    <option value="Criminal Defense">Criminal Defense</option>
                    <option value="Family Court (Custody/Divorce)">Family Court (Custody/Divorce)</option>
                    <option value="Cyber Crime">Cyber Crime</option>
                    <option value="Defamation">Defamation</option>
                    <option value="False Case Defense">False Case Defense</option>
                    <option value="Civil Rights">Civil Rights</option>
                    <option value="Corporate Law">Corporate Law</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience || 0}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Fees */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Fees
                  </label>
                  <input
                    type="text"
                    name="fees"
                    value={formData.fees || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹1,500 - ₹4,000 per hour"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., +91-98765-43210"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., +91-98765-43210"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., lawyer@example.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating || 4.5}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Cases Closed */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Cases Closed
                  </label>
                  <input
                    type="number"
                    name="casesClosed"
                    value={formData.casesClosed || 0}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bio/Description
                </label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  placeholder="Write a brief description of the lawyer's expertise..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  {editingId ? 'Update Lawyer' : 'Add Lawyer'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lawyers List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Registered Lawyers ({lawyers.length})
          </h2>

          {lawyers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No lawyers added yet. Click "Add New Lawyer" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{lawyer.name}</h3>
                      <p className="text-sm font-semibold text-blue-600 mt-1">{lawyer.specialization}</p>
                    </div>
                    {lawyer.rating && (
                      <div className="bg-amber-50 px-3 py-1 rounded-lg">
                        <p className="text-sm font-bold text-amber-700">⭐ {lawyer.rating}</p>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {lawyer.city}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4 bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Experience:</span>
                      <span className="font-semibold text-slate-900">{lawyer.experience} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cases Closed:</span>
                      <span className="font-semibold text-slate-900">{lawyer.casesClosed}</span>
                    </div>
                    {lawyer.fees && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Fees:</span>
                        <span className="font-semibold text-slate-900">{lawyer.fees}</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 text-sm text-slate-600">
                    {lawyer.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {lawyer.phone}
                      </div>
                    )}
                    {lawyer.whatsapp && (
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        {lawyer.whatsapp}
                      </div>
                    )}
                    {lawyer.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {lawyer.email}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(lawyer)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lawyer.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
