import React from 'react';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Standard Human-Verified',
      audience: 'For litigation law firms, corporate counsel & researchers',
      price: '$1.45',
      unit: '/ audio minute',
      comparison: 'vs. $1.99–$2.25/min legacy bureaus',
      description: 'Court-certified 99.8% verbatim transcription delivered in 48 hours. No monthly commitments or hidden platform fees.',
      features: [
        '99.8% Verified Verbatim Accuracy',
        'Automatic Speaker Diarization',
        'Certified Line-Numbered Deposition Format',
        'Client-Side AES-256 Pre-Encryption',
        'US Corporate Invoicing (Sheridan, WY)',
        'Zero Data Retention Guarantee'
      ],
      cta: 'Get Started at $1.45/min',
      featured: true
    },
    {
      name: 'Rush & Expedited Depo',
      audience: 'For urgent trial hearings & critical board deadlines',
      price: '$1.95',
      unit: '/ audio minute (24h turnaround)',
      comparison: 'vs. $2.75–$3.25/min expedited stenography',
      description: 'Next-day turnaround with priority legal proofing and dedicated multi-speaker transcription specialists.',
      features: [
        'Guaranteed 24-Hour Turnaround Delivery',
        'Priority Queue Processing',
        'Dual-Pass Stenographic Proofreading',
        'Same-Day 12h Priority Available ($2.50/min)',
        'Video-Synchronized Timecodes',
        'Full Multi-Format Export (.DOCX, .PDF, .SRT)'
      ],
      cta: 'Select Rush Service',
      featured: false
    },
    {
      name: 'Enterprise Legal & Volume Retainer',
      audience: 'For high-volume litigation & healthcare networks',
      price: 'Custom',
      unit: 'Volume SLA & Dedicated Team',
      comparison: 'Volume rates starting from $1.15/min',
      description: 'Dedicated transcription team, custom case lexicons, signed bilateral NDAs, and automated EHR/legal integrations.',
      features: [
        'Volume Rates starting from $1.15/min',
        'Signed Bilateral NDA & HIPAA BAA',
        'Dedicated Project Lead & Priority Support',
        'Custom Legal / Medical Glossary Ingestion',
        'Net-30 / Net-60 Invoicing for Firms',
        'Private Cloud / On-Prem Ingestion Options'
      ],
      cta: 'Request Enterprise Terms',
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F2EFE9]/60 border-t border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
            <span>Competitive Market Pricing</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1E36] tracking-tight">
            Institutional quality with competitive market rates.
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
            Transparent per-minute billing calibrated slightly below traditional agency benchmarks, giving corporate and legal clients a clear competitive edge without compromising security, chain of custody, or accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.featured
                  ? 'bg-white border-2 border-[#0F2A4A] shadow-md'
                  : 'bg-white border border-[#E2DED5] hover:border-[#0F2A4A]/40 shadow-xs'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#0F2A4A] text-white text-[11px] font-bold rounded uppercase tracking-wider">
                  Most Popular · Predictable Rate
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-[#0F1E36]">{plan.name}</h3>
                  <div className="text-xs text-slate-600">{plan.audience}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2A4A] tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-600">{plan.unit}</span>
                  </div>
                  <div className="text-[11px] text-[#9A6B2F] font-mono font-medium">
                    {plan.comparison}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{plan.description}</p>

                <div className="space-y-3 pt-4 border-t border-[#E2DED5]">
                  <div className="text-xs font-bold text-[#0F1E36]">Included capabilities:</div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#0F2A4A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    plan.featured
                      ? 'bg-[#0F2A4A] hover:bg-[#173B66] text-white shadow-sm'
                      : 'bg-[#FAF8F4] hover:bg-[#0F2A4A] hover:text-white text-[#0F2A4A] border border-[#D4CFC4] hover:border-[#0F2A4A]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* US Corporate Headquarters Badge */}
        <div className="p-6 rounded-xl bg-white border border-[#E2DED5] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
          <div className="flex items-center gap-2 text-[#0F1E36] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#0F2A4A] shrink-0" />
            <span>Official US Headquarters: 30 N Gould St, STE R, Sheridan, WY 82801 · US Invoicing & Form W-9 Available</span>
          </div>
          <button
            onClick={() => onSelectPlan('Custom Volume Retainer')}
            className="text-xs font-semibold text-[#0F2A4A] hover:text-[#9A6B2F] cursor-pointer"
          >
            Inquire for Enterprise Retainers →
          </button>
        </div>
      </div>
    </section>
  );
};
