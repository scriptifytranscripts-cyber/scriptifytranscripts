import React from 'react';
import { Quote } from 'lucide-react';
import avatarSecurityDirector from '../assets/images/avatar_security_director_1794310482642.jpg';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Julian Vance, Esq.',
      role: 'Partner & Litigation Practice Lead',
      organization: 'Vance & Sterling LLP (New York)',
      quote:
        'Prior to Scriptify Transcripts, our litigation team waited 48 hours and paid $2.20 per minute for witness deposition transcripts. With Scriptify, certified transcripts are synchronized with video in 4 minutes, cutting outside stenography spend while maintaining court-certified fidelity.',
      metric: 'Rule 30(b)(6) Litigation Ready',
    },
    {
      name: 'Dr. Rebecca Aris, MD',
      role: 'Chief Medical Information Officer',
      organization: 'Pacific Rim Health System',
      quote:
        'Zero retention was our non-negotiable prerequisite. Scriptify signed our BAA within 24 hours. The team handles complex pharmacological terms and multi-physician rounds without errors, saving our clinical specialists over 2.5 hours per shift in documentation.',
      metric: '2.5 Hours Saved Per Clinical Shift',
    },
    {
      name: 'Marcus K. Lind',
      role: 'VP of Data Protection & Information Security',
      organization: 'FinScale Capital Markets',
      quote:
        'Client-side AES-256 pre-encryption allows us to process confidential M&A audio recordings without exposing unencrypted voice buffers to external cloud storage. In our annual SOC 2 Type II audit, Scriptify passed all cryptographic compliance checks with zero exceptions.',
      metric: 'Zero Audit Exceptions Across 3 Years',
      avatar: avatarSecurityDirector,
    },
  ];

  return (
    <section className="py-20 bg-[#F2EFE9]/50 border-t border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
            <span>Verified Client Counsel & Institutions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight">
            Trusted by organizations where evidentiary accuracy is mandatory.
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            From national litigation firms to clinical trial boards, see how institutional teams protect privileged speech records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.name}
              className="p-8 rounded-xl bg-white border border-[#E2DED5] flex flex-col justify-between hover:border-[#0F2A4A]/40 transition-all shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#9A6B2F]/70" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-serif">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DED5] space-y-3">
                <div className="text-xs font-bold text-[#0F2A4A] font-mono">
                  {item.metric}
                </div>

                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#D4CFC4]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0F2A4A] text-white flex items-center justify-center font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div className="text-xs">
                    <div className="font-bold text-[#0F1E36]">{item.name}</div>
                    <div className="text-slate-600">{item.role}</div>
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
