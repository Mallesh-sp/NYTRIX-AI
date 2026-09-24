import React, { useEffect, useState, useRef } from 'react';
import { Star, Award, MapPin, CheckCircle, Users, Shield, Crown } from 'lucide-react';
import PremiumCard from './PremiumCard';
import PremiumButton from './PremiumButton';

interface EliteLawyerSectionProps {
  onNavigate?: (page: string) => void;
}

const EliteLawyerSection: React.FC<EliteLawyerSectionProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const eliteLawyers = [
    {
      name: 'Adv. Rajesh Sharma',
      specialty: 'Criminal Defense',
      location: 'Delhi High Court',
      experience: '18+ Years',
      rating: 4.9,
      cases: '2,500+',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Adv. Priya Mehta',
      specialty: 'Corporate Law',
      location: 'Mumbai High Court',
      experience: '15+ Years',
      rating: 4.8,
      cases: '1,800+',
      verified: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Adv. Vikram Singh',
      specialty: 'Family Law',
      location: 'Supreme Court',
      experience: '22+ Years',
      rating: 5.0,
      cases: '3,200+',
      verified: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0f1a2e] to-[#0B0F1A]" />
      
      {/* Gold accent glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] bg-amber-500" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] bg-blue-600" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-20
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">Verified Elite Network</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Elite{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Lawyer Network
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect with India's most distinguished legal minds. Every lawyer is verified, rated, and ready to champion your cause.
          </p>
        </div>

        {/* Lawyers Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {eliteLawyers.map((lawyer, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <PremiumCard glowColor="gold" className="p-6 h-full">
                {/* Verified Badge */}
                {lawyer.verified && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-300">Verified</span>
                  </div>
                )}

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                      <img 
                        src={lawyer.image} 
                        alt={lawyer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/30">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-amber-300 font-bold">{lawyer.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{lawyer.name}</h3>
                  <p className="text-cyan-400 font-medium mb-3">{lawyer.specialty}</p>
                  
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {lawyer.location}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-800/50">
                      <div className="text-lg font-bold text-white">{lawyer.experience}</div>
                      <div className="text-xs text-slate-500">Experience</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/50">
                      <div className="text-lg font-bold text-white">{lawyer.cases}</div>
                      <div className="text-xs text-slate-500">Cases Won</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate?.('lawyers')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-500/30 text-amber-300 font-semibold hover:bg-amber-500/30 transition-all duration-300"
                  >
                    View Profile
                  </button>
                </div>
              </PremiumCard>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`
          text-center mt-16
          transition-all duration-1000 delay-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <PremiumButton 
            variant="gold" 
            size="lg"
            onClick={() => onNavigate?.('lawyers')}
            icon={<Users className="w-5 h-5" />}
          >
            Explore All 500+ Lawyers
          </PremiumButton>
        </div>
      </div>
    </section>
  );
};

export default EliteLawyerSection;
