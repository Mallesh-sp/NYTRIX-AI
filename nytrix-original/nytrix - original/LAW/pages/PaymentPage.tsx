import React, { useState } from 'react';
import { ArrowLeft, Check, Lock, Zap, Heart, Shield, Award, FileText } from 'lucide-react';
import { LawyerProfile } from '../components/LawyerCard';
import { UserDetails } from '../components/BookingRequestCard';

interface PaymentPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  badge?: string;
}

interface PaymentPageProps {
  userDetails: UserDetails;
  selectedLawyer: LawyerProfile;
  onPaymentSuccess: (planId: string, amount: number) => void;
  onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  userDetails,
  selectedLawyer,
  onPaymentSuccess,
  onBack,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');

  const paymentPlans: PaymentPlan[] = [
    {
      id: 'single',
      name: 'Quick Assist',
      duration: '24 Hours',
      price: 100,
      description: 'Urgent assistance',
      icon: <Zap className="w-8 h-8 text-orange-400" />,
      features: [
        '24-hour lawyer access',
        'Urgent case review',
        'Initial consultation',
        'Email support',
      ],
    },
    {
      id: 'monthly',
      name: 'Monthly Support',
      duration: '30 Days',
      price: 500,
      description: 'Ongoing assistance',
      icon: <Heart className="w-8 h-8 text-red-400" />,
      badge: 'Popular',
      features: [
        '30-day continuous access',
        'Multiple consultations',
        'Document review',
        'Email & chat support',
        'Case strategy guidance',
      ],
    },
    {
      id: 'yearly',
      name: 'Annual Protection',
      duration: '365 Days',
      price: 1000,
      description: 'Complete coverage',
      icon: <Shield className="w-8 h-8 text-indigo-400" />,
      badge: 'Best Value',
      features: [
        '365-day full protection',
        'Priority access 24/7',
        'Unlimited consultations',
        'Document drafting',
        'Court representation',
        'Emergency hotline',
      ],
    },
  ];

  const handlePayment = async () => {
    if (!selectedPlan) {
      alert('Please select a payment plan');
      return;
    }

    const plan = paymentPlans.find(p => p.id === selectedPlan);
    if (!plan) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onPaymentSuccess(selectedPlan, plan.price);
  };

  const selectedPlanData = paymentPlans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-amber-300 hover:text-amber-400 font-bold text-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Details
          </button>

          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Legal Plan</span>
            </h1>
            <p className="text-xl text-indigo-200">Select the perfect protection package. Payment goes to our legal platform for process administration.</p>
          </div>

          {/* Lawyer & User Info Card */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Lawyer Info */}
            <div className="bg-gradient-to-br from-indigo-800/40 to-indigo-900/40 border-2 border-indigo-600/50 rounded-2xl p-8 backdrop-blur-sm hover:border-indigo-500/80 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm text-indigo-300 uppercase tracking-widest font-bold">Your Lawyer</h3>
                  <p className="text-2xl font-bold text-white mt-1">{selectedLawyer.name}</p>
                </div>
              </div>
              <div className="space-y-2 text-indigo-100">
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">⚖️</span>
                  <span>{selectedLawyer.specialization}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">📍</span>
                  <span>{selectedLawyer.city} • ⭐ {selectedLawyer.rating}/5</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>{selectedLawyer.casesClosed} cases closed</span>
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 border-2 border-amber-600/50 rounded-2xl p-8 backdrop-blur-sm hover:border-amber-500/80 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm text-amber-300 uppercase tracking-widest font-bold">Booking Details</h3>
                  <p className="text-2xl font-bold text-white mt-1">{userDetails.fullName}</p>
                </div>
              </div>
              <div className="space-y-2 text-amber-100">
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">📧</span>
                  <span className="text-sm">{userDetails.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">📱</span>
                  <span>{userDetails.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">⚠️</span>
                  <span>{userDetails.caseType}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Plans */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Premium Legal Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {paymentPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative rounded-2xl cursor-pointer transition-all duration-300 group ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-amber-400 scale-105'
                      : 'hover:scale-102'
                  }`}
                >
                  {/* 3D Shadow Effect */}
                  <div className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-br from-amber-600/50 to-orange-600/50'
                      : 'bg-gradient-to-br from-indigo-800/30 to-indigo-900/30'
                  }`}></div>

                  {/* Card Content */}
                  <div className={`relative p-8 rounded-2xl transition-all duration-300 border-2 ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-br from-amber-900/60 to-orange-900/60 border-amber-500/80'
                      : 'bg-gradient-to-br from-indigo-800/40 to-indigo-900/40 border-indigo-600/40 group-hover:border-indigo-500/60'
                  }`}>
                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute -top-4 right-6">
                        <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="mb-4">{plan.icon}</div>

                    {/* Plan Header */}
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-indigo-300 text-sm mb-4">{plan.duration}</p>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-indigo-600/30">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                          ₹{plan.price}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300 mt-2">{plan.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-indigo-100">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Selection Button */}
                    <button
                      className={`w-full py-3 rounded-xl font-bold transition-all duration-300 text-lg ${
                        selectedPlan === plan.id
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg shadow-orange-500/50'
                          : 'bg-indigo-700/50 text-white hover:bg-indigo-600/70'
                      }`}
                    >
                      {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method & Summary */}
          {selectedPlanData && (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Payment Methods */}
              <div className="md:col-span-2 bg-gradient-to-br from-indigo-800/40 to-indigo-900/40 border-2 border-indigo-600/50 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-amber-400" /> Secure Payment
                </h3>
                <div className="space-y-3">
                  {['upi', 'card', 'bank', 'cash'].map((method) => (
                    <label key={method} className="flex items-center p-4 rounded-lg border-2 border-indigo-600/30 hover:border-amber-500/50 cursor-pointer transition-all hover:bg-indigo-700/20">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="ml-4 font-semibold text-white">
                        {method === 'upi' && '📱 UPI Payment'}
                        {method === 'card' && '💳 Credit/Debit Card'}
                        {method === 'bank' && '🏦 Bank Transfer'}
                        {method === 'cash' && '💰 Cash Payment'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 border-2 border-amber-600/50 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6 pb-6 border-b border-amber-600/30">
                  <div className="flex justify-between text-indigo-100">
                    <span>Plan</span>
                    <span className="font-semibold text-white">{selectedPlanData.name}</span>
                  </div>
                  <div className="flex justify-between text-indigo-100">
                    <span>Duration</span>
                    <span className="font-semibold text-white">{selectedPlanData.duration}</span>
                  </div>
                  <div className="flex justify-between text-indigo-100">
                    <span>Lawyer</span>
                    <span className="font-semibold text-white text-right text-sm max-w-[150px]">{selectedLawyer.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-white text-lg">Total</span>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                    ₹{selectedPlanData.price}
                  </span>
                </div>
                <p className="text-xs text-amber-200/70 text-center">Payment processed securely</p>
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="mt-12 mb-8">
            {selectedPlanData ? (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full md:w-96 mx-auto block py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-2xl hover:shadow-orange-500/50 text-slate-900'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-3 border-slate-900 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            ) : (
              <div className="text-center text-indigo-300 py-8">
                <p>Select a plan to continue</p>
              </div>
            )}
          </div>

          {/* Security Footer */}
          <div className="mt-12 pt-8 border-t border-indigo-600/30">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Lock className="w-6 h-6 text-amber-400" />
                <p className="text-sm text-indigo-200"><span className="font-bold">256-bit SSL</span></p>
                <p className="text-xs text-indigo-300">Encrypted</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-amber-400" />
                <p className="text-sm text-indigo-200"><span className="font-bold">Safe & Secure</span></p>
                <p className="text-xs text-indigo-300">Payment Gateway</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-6 h-6 text-amber-400" />
                <p className="text-sm text-indigo-200"><span className="font-bold">Money-back</span></p>
                <p className="text-xs text-indigo-300">Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
