import React, { useEffect, useState, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const testimonials = [
    {
      name: 'Rahul Verma',
      role: 'Business Owner',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The AI analysis was remarkably accurate. It identified legal angles I never considered. Connected me with the perfect lawyer who won my case.',
      case: 'Corporate Dispute'
    },
    {
      name: 'Priya Sharma',
      role: 'IT Professional',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Facing cybercrime charges, I was lost. Nytrix AI broke down everything clearly and matched me with a specialist. Case dismissed in record time.',
      case: 'Cyber Law Defense'
    },
    {
      name: 'Amit Patel',
      role: 'Entrepreneur',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The platform transformed a complex custody battle into a strategic win. The AI suggestions were spot-on, and the lawyer was exceptional.',
      case: 'Family Law'
    },
    {
      name: 'Sneha Reddy',
      role: 'Doctor',
      location: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Professional negligence claim handled brilliantly. The AI understood medical-legal nuances perfectly. Highly recommended for professionals.',
      case: 'Medical Law'
    }
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0e1729] to-[#0B0F1A]" />
      
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] bg-purple-600" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px] bg-cyan-600" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-16
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <BadgeCheck className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Trusted by Thousands</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Success{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className={`
          relative
          transition-all duration-1000 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          {/* Glass Card */}
          <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-24 h-24 text-purple-400" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`
                    transition-all duration-500
                    ${activeIndex === index ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'}
                  `}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-purple-500/50"
                    />
                    <div>
                      <h4 className="text-white font-bold">{testimonial.name}</h4>
                      <p className="text-slate-400 text-sm">{testimonial.role} • {testimonial.location}</p>
                    </div>
                    <div className="ml-auto hidden md:block">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                        {testimonial.case}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${activeIndex === index 
                        ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-slate-600 hover:bg-slate-500'
                      }
                    `}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
