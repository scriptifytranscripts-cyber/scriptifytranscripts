import React, { useState } from 'react';
import { Calculator, Clock, Check, ArrowRight, ShieldCheck, DollarSign, TrendingDown } from 'lucide-react';

interface CostCalculatorProps {
  onOpenQuoteWithEstimate: (estimateString: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenQuoteWithEstimate }) => {
  const [minutes, setMinutes] = useState(60);
  const [selectedSpeed, setSelectedSpeed] = useState({
    id: 'standard',
    label: 'Standard 48h',
    rate: 1.45,
    desc: '48h human verified (Competitive US rate)'
  });
  const [addonVerbatim, setAddonVerbatim] = useState(false);
  const [addonTimestamp, setAddonTimestamp] = useState(true);

  // Competitive US rates calibrated slightly below legacy market benchmarks without bargain-bin discount claims
  const speedTiers = [
    { id: 'instant', label: 'Instant AI', rate: 0.20, desc: 'Sub-minute automated transcription' },
    { id: 'standard', label: 'Standard 48h', rate: 1.45, desc: '48h human certified (Save vs $1.99 agency rate)' },
    { id: 'rush', label: 'Rush 24h', rate: 1.95, desc: 'Next-day priority delivery' },
    { id: 'priority', label: 'Same-Day 12h', rate: 2.50, desc: 'Expedited courtroom deadline' }
  ];

  let ratePerMin = selectedSpeed.rate;
  if (addonVerbatim) ratePerMin += 0.15;
  if (addonTimestamp) ratePerMin += 0.10;

  const total = minutes * ratePerMin;
  
  // Benchmark comparison with traditional US agencies (e.g. Rev.com $1.99/min standard, $3.50 rush)
  const usMarketRate = selectedSpeed.id === 'instant' ? 0.25 : selectedSpeed.id === 'priority' ? 3.50 : selectedSpeed.id === 'rush' ? 2.75 : 1.99;
  const marketTotal = minutes * usMarketRate;
  const totalSavings = Math.max(0, marketTotal - total);

  const breakdownText = `${minutes} mins × $${ratePerMin.toFixed(2)}/min (${selectedSpeed.label}${addonVerbatim ? ' + Strict Verbatim' : ''}${addonTimestamp ? ' + Timestamps' : ''})`;

  return (
    <section id="estimator" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Pricing & Turnaround Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Institutional Quality. Competitive US Per-Minute Rates.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            While legacy transcription bureaus and traditional stenographers charge $1.99 to $3.50+ per minute, Scriptify delivers certified 99.8% verbatim accuracy starting at a competitive $1.45/minute with predictable, transparent billing.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Minutes Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Audio Recording Length</span>
                <span className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">
                  {minutes} Minutes{' '}
                  <span className="text-xs text-slate-400 font-sans font-normal">
                    ({(minutes / 60).toFixed(1)} hrs)
                  </span>
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>10 mins (Brief Hearing)</span>
                <span>60 mins (Standard Depo)</span>
                <span>300 mins (Full Trial Day)</span>
              </div>
            </div>

            {/* Turnaround Speed Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Select Turnaround Speed SLA
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {speedTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedSpeed(tier)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSpeed.id === tier.id
                        ? 'bg-slate-950 border-cyan-400 shadow-md shadow-cyan-950/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{tier.label}</span>
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        ${tier.rate.toFixed(2)}/min
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 leading-tight block">
                      {tier.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formatting Add-ons */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Formatting & Specialized Options
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                  <div>
                    <span className="font-bold text-slate-200 block text-xs">Strict Verbatim</span>
                    <span className="text-[11px] text-slate-400">Includes false starts & stutters (+ $0.15/min)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addonVerbatim}
                    onChange={(e) => setAddonVerbatim(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                  <div>
                    <span className="font-bold text-slate-200 block text-xs">Synchronized Timestamps</span>
                    <span className="text-[11px] text-slate-400">Every 30s or speaker change (+ $0.10/min)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addonTimestamp}
                    onChange={(e) => setAddonTimestamp(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-6">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
                Scriptify Estimate
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-cyan-400 font-mono tabular-nums">
                  ${total.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-mono line-through">
                  ${marketTotal.toFixed(2)} (US Agency Benchmark)
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-1 font-mono">
                {breakdownText}
              </div>
            </div>

            {/* Savings Callout */}
            <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/50 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold block">
                  Competitive Rate Value
                </span>
                <span className="text-base font-bold text-emerald-300 font-mono">
                  Save ${totalSavings.toFixed(2)} vs Legacy Agency Benchmark
                </span>
              </div>
              <TrendingDown className="w-6 h-6 text-emerald-400 shrink-0" />
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>US Corporate Invoicing: 30 N Gould St, Sheridan, WY 82801</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Strict Non-Disclosure Agreement (NDA) Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Line-numbered court format / Rule 30(b)(6) standard</span>
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteWithEstimate(`Estimated Quote: $${total.toFixed(2)} (${breakdownText}) [Save $${totalSavings.toFixed(2)} vs US agency rates]`)}
              className="w-full py-3.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <span>Request Quote with this Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
