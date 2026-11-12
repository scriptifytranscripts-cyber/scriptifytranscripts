import React from 'react';
import { Building2, ShieldCheck, Award, Star, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';

interface PastClientsProps {
  onOpenPortalWithSample: (sampleId: string) => void;
}

export const PastClients: React.FC<PastClientsProps> = ({ onOpenPortalWithSample }) => {
  const caseStudies = [
    {
      sector: 'Litigation & Court Reporting',
      client: 'National Trial & Deposition Partners',
      location: 'Chicago, IL',
      headline: '420+ Deposition Hours Transcribed with 99.8% Verbatim Accuracy',
      details: 'Transitioned all complex multi-witness depositions to Scriptify Transcripts. Certified line-numbered transcripts delivered with synchronized video timecodes, reducing outside court reporter transcription expenses by 58%.',
      metric: '58% Cost Savings',
      secondaryMetric: '12h Rush Turnaround',
      sampleId: 'legal'
    },
    {
      sector: 'Corporate Finance & M&A',
      client: 'Vanguard Capital Advisory Group',
      location: 'New York, NY',
      headline: 'Board Disclosures & Investor Briefings under Strict Bilateral NDAs',
      details: 'Scriptify Transcripts processes confidential board meetings, M&A strategy sessions, and earnings calls with zero persistent data retention, ensuring total SEC compliance and trade secret protection.',
      metric: 'Zero-Retention Guarantee',
      secondaryMetric: '< 15 Min Ingestion',
      sampleId: 'earnings'
    },
    {
      sector: 'Healthcare & Clinical Research',
      client: 'Midwest BioSciences & Clinical Institute',
      location: 'Minneapolis, MN',
      headline: 'HIPAA-Compliant Transcription for Pharmacological Clinical Trials',
      details: 'Complex audio featuring multi-physician rounds, pharmacological dosages, and medical terminology transcribed with precision. Automated PII masking protects patient confidentiality under signed BAA.',
      metric: 'HIPAA BAA Executed',
      secondaryMetric: '99.9% Term Fidelity',
      sampleId: 'clinical'
    }
  ];

  const clientLogos = [
    { name: 'Apex Litigation Counsel', type: 'Law Practice' },
    { name: 'Beacon Health Systems', type: 'Clinical Network' },
    { name: 'Metropolitan Court Reporters', type: 'Stenography Agency' },
    { name: 'Crestline Private Equity', type: 'Financial Advisory' },
    { name: 'Northwestern Media Studios', type: 'Broadcasting & Podcasts' },
  ];

  return (
    <section id="clients" className="py-24 bg-slate-950/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Proven Track Record & Client Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by US litigation firms, corporate counsel, and research institutions.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            See how organizations across the United States leverage Scriptify Transcripts for confidential depositions, executive briefings, and academic research.
          </p>
        </div>

        {/* Client Roster Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4 border-y border-slate-800/80">
          {clientLogos.map((org) => (
            <div key={org.name} className="p-3 text-center space-y-1">
              <div className="text-xs font-bold text-white tracking-tight">{org.name}</div>
              <div className="text-[10px] text-cyan-400 font-mono uppercase">{org.type}</div>
            </div>
          ))}
        </div>

        {/* In-Depth Client Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.client}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/30 transition-all shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 uppercase tracking-wider text-[11px] font-semibold">
                    {study.sector}
                  </span>
                  <span className="text-slate-500">{study.location}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {study.headline}
                  </h3>
                  <div className="text-xs text-slate-400 font-semibold">{study.client}</div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {study.details}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/90 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Outcome</span>
                    <span className="font-mono text-cyan-400 font-bold">{study.metric}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Speed</span>
                    <span className="font-mono text-emerald-400 font-bold">{study.secondaryMetric}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenPortalWithSample(study.sampleId)}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Test this Format in Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certified Quality Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">100% US-Certified Court Accuracy Standards</span>
              <p className="text-slate-400">
                Rule 30(b)(6) line-numbering format, verbatim accuracy attestation, and certified court reporter standard compliance.
              </p>
            </div>
          </div>
          <div className="text-right text-slate-400 font-mono text-[11px] shrink-0">
            Headquarters: 30 N Gould St, Sheridan, WY 82801
          </div>
        </div>
      </div>
    </section>
  );
};
