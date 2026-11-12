import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Julian Vance, Esq.',
      role: 'Partner & Litigation Practice Lead',
      organization: 'Vance & Sterling LLP (New York)',
      quote:
        'Prior to Scriptify Transcripts, our litigation team waited 48 hours and paid $2.20 per minute for witness deposition transcripts. With Scriptify, certified transcripts are synchronized with video in 4 minutes, cutting outside stenography spend by 68% while maintaining court-certified fidelity.',
      metric: '68% Stenography Cost Reduction',
    },
    {
      name: 'Dr. Rebecca Aris, MD',
      role: 'Chief Medical Information Officer',
      organization: 'Pacific Rim Health System',
      quote:
        'Zero retention was our non-negotiable prerequisite. Scriptify signed our BAA within 24 hours. The team handles complex pharmacological terms and multi-physician rounds without hallucinatory errors, saving our clinical specialists over 2.5 hours per shift in EHR documentation.',
      metric: '2.5 Hours Saved Per Clinical Shift',
    },
    {
      name: 'Marcus K. Lind',
      role: 'VP of Data Protection & Information Security',
      organization: 'FinScale Capital Markets',
      quote:
        'Client-side AES-256 pre-encryption allows us to process confidential M&A audio recordings without exposing unencrypted voice buffers to external cloud storage. In our annual SOC 2 Type II audit, Scriptify passed all cryptographic compliance checks with zero exceptions.',
      metric: 'Zero Audit Exceptions Across 3 Years',
      avatar: '/src/assets/images/avatar_security_director_1794310482642.jpg',
    },
  ];

  return (
    <section className="py-24 bg-slate-950/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>Verified Customer Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by organizations where privacy is mandatory.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            From Fortune 500 legal counsel to regional hospital networks, see how leading teams safeguard sensitive speech data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.name}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-cyan-400/60" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/90 space-y-3">
                <div className="text-xs font-bold text-cyan-400 font-mono">
                  {item.metric}
                </div>

                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div className="text-xs">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-slate-400">{item.role}</div>
                    <div className="text-slate-500 text-[11px]">{item.organization}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
