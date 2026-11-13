import React from 'react';
import { Building2, ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';

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
    <section id="clients" className="py-20 bg-[#F2EFE9]/60 border-t border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#0F2A4A]" />
            <span>Proven Track Record & Client Case Studies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight">
            Trusted by litigation firms, corporate counsel, and research institutions.
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            See how organizations leverage Scriptify Transcripts for confidential depositions, executive briefings, and clinical research records.
          </p>
        </div>

        {/* Client Roster Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-5 border-y border-[#E2DED5]">
          {clientLogos.map((org) => (
            <div key={org.name} className="p-2 text-center space-y-1">
              <div className="text-xs font-bold text-[#0F1E36] tracking-tight">{org.name}</div>
              <div className="text-[11px] text-[#9A6B2F] font-medium">{org.type}</div>
            </div>
          ))}
        </div>

        {/* In-Depth Client Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.client}
              className="p-8 rounded-xl bg-white border border-[#E2DED5] flex flex-col justify-between hover:border-[#0F2A4A] transition-all shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9A6B2F] font-semibold text-[11px]">
                    {study.sector}
                  </span>
                  <span className="text-slate-500">{study.location}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#0F1E36] leading-snug">
                    {study.headline}
                  </h3>
                  <div className="text-xs text-[#0F2A4A] font-semibold">{study.client}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {study.details}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2DED5] space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Outcome</span>
                    <span className="font-mono text-[#0F2A4A] font-bold">{study.metric}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Speed</span>
                    <span className="font-mono text-emerald-800 font-bold">{study.secondaryMetric}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenPortalWithSample(study.sampleId)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-[#0F2A4A] bg-[#FAF8F4] hover:bg-[#0F2A4A] hover:text-white rounded-lg border border-[#D4CFC4] hover:border-[#0F2A4A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Test this Format in Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certified Quality Guarantee Strip */}
        <div className="p-6 rounded-xl bg-white border border-[#E2DED5] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-700 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#0F1E36] text-sm block">Court-Certified Evidentiary Standards</span>
              <p className="text-slate-600">
                Rule 30(b)(6) line-numbering format, verbatim accuracy attestation, and certified court reporter compliance.
              </p>
            </div>
          </div>
          <div className="text-right text-slate-600 font-mono text-[11px] shrink-0">
            Headquarters: 30 N Gould St, Sheridan, WY 82801
          </div>
        </div>
      </div>
    </section>
  );
};
