import React, { useEffect, useState, useRef } from 'react';
import { Upload, Brain, FileCheck, ArrowRight, Sparkles } from 'lucide-react';
import PremiumButton from './PremiumButton';

interface HowItWorksSectionProps {
  onNavigate?: (page: string) => void;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Describe Your Case',
      description: 'Share your legal situation in plain language. Our AI understands context, nuance, and complexity.',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Analyzes Everything',
      description: 'Our neural network processes your case against millions of precedents, laws, and expert strategies.',
      color: 'cyan',
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      number: '03',
      icon: FileCheck,
      title: 'Get Expert Guidance',
      description: 'Receive a comprehensive report with risk assessment, recommendations, and verified lawyer matches.',
      color: 'gold',
      gradient: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0a1220] to-[#0B0F1A]" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px] bg-blue-600" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-20
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Simple Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three simple steps to transform your legal challenges into strategic advantages.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line - desktop only */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-amber-500 opacity-30" />

          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative
                transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${activeStep === index ? 'scale-105' : 'scale-100'}
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Card */}
              <div className={`
                relative p-8 rounded-3xl
                bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90
                backdrop-blur-xl
                border border-slate-700/50
                transition-all duration-500
                ${activeStep === index 
                  ? `border-${step.color === 'gold' ? 'amber' : step.color}-500/50 shadow-[0_0_40px_rgba(${step.color === 'blue' ? '37,99,235' : step.color === 'cyan' ? '0,245,255' : '212,175,55'},0.2)]` 
                  : ''
                }
              `}>
                {/* Step number */}
                <div className={`
                  absolute -top-4 left-8
                  px-4 py-1 rounded-full
                  bg-gradient-to-r ${step.gradient}
                  text-white font-black text-sm
                  shadow-lg
                `}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6 mt-4">
                  <div className={`
                    p-5 rounded-2xl
                    bg-gradient-to-br ${step.gradient}
                    shadow-lg
                    transition-transform duration-500
                    ${activeStep === index ? 'scale-110' : 'scale-100'}
                  `}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow to next - desktop only */}
                {index < 2 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className={`
                      w-8 h-8 text-cyan-500/50
                      transition-all duration-500
                      ${activeStep === index ? 'translate-x-2 text-cyan-400' : ''}
                    `} />
                  </div>
                )}
              </div>
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
            variant="primary" 
            size="lg"
            onClick={() => onNavigate?.('analyzer')}
            icon={<Brain className="w-5 h-5" />}
          >
            Start Your Analysis Now
          </PremiumButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
