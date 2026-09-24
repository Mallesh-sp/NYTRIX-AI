import React from 'react';

const LiveNewsTicker: React.FC = () => {
  const news = [
    { icon: '🏛️', text: 'Supreme Court announces new digital filing guidelines for faster case disposal', type: 'breaking' },
    { icon: '⚖️', text: 'Legal Aid Services now available in 500+ district courts nationwide', type: 'update' },
    { icon: '📋', text: 'New cybercrime helpline 1930 receives 15,000+ calls daily', type: 'info' },
    { icon: '🔐', text: 'Data Protection Bill: Enhanced privacy rights for citizens', type: 'breaking' },
    { icon: '👨‍⚖️', text: 'Bar Council expands pro-bono legal services across India', type: 'update' },
    { icon: '🚨', text: 'Consumer Court digitization: 100% online dispute filing', type: 'info' },
    { icon: '📱', text: 'E-Courts app crosses 75 million downloads', type: 'update' },
    { icon: '✅', text: 'Fast Track Courts deliver 3 lakh+ judgments this quarter', type: 'breaking' },
  ];

  return (
    <div className="relative bg-gradient-to-r from-slate-950 via-blue-950/50 to-slate-950 border-y border-blue-500/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
      
      <div className="relative py-3">
        <div className="flex items-center">
          {/* Live badge */}
          <div className="flex-shrink-0 px-6 border-r border-blue-500/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-sm font-bold text-white">LIVE</span>
              <span className="text-sm text-blue-300 font-medium">India News</span>
            </div>
          </div>
          
          {/* Ticker */}
          <div className="overflow-hidden flex-1">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...news, ...news].map((item, index) => (
                <span 
                  key={index}
                  className={`
                    mx-8 text-sm
                    ${item.type === 'breaking' ? 'text-amber-300' : item.type === 'update' ? 'text-emerald-300' : 'text-blue-200'}
                  `}
                >
                  {item.icon} {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LiveNewsTicker;
