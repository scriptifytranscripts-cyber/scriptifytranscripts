import React from 'react';
import { Scale, Briefcase, GraduationCap, Radio, ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';

interface IndustrySolutionsProps {
  onSelectDomain: (domain: 'legal' | 'finance' | 'medical' | 'general') => void;
}

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ onSelectDomain }) => {
  return (
    <section id="services" className="py-20 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Specialized Legal Practice Areas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            High-accuracy transcription built for courtroom litigation & corporate counsel.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Scriptify Transcripts delivers certified verbatim transcripts calibrated for court reporters, litigation counsel, arbitration panels, corporate boards, and clinical research investigators.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Legal & Depositions (Marquee 7-Col) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-medium">01. Primary Practice</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Courtroom Depositions & Witness Testimony
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Accredited transcript preparation for pre-trial witness depositions, arbitration hearings, administrative tribunals, and attorney-client strategy conferences. Strictly formatted with lines 1–25 numbering and certified speaker identification.
                </p>
              </div>

              {/* Quiet sample tags */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-2">
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Federal Rule 30(b)(6)
                </span>
                <span aria-hidden="true">·</span>
                <span>Video-Synchronized Timecodes</span>
                <span aria-hidden="true">·</span>
                <span>Sworn Reporter Attestation</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Courtroom certified accuracy: <strong className="text-white font-mono">99.8%</strong>
              </span>
              <button
                onClick={() => onSelectDomain('legal')}
                className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Test Deposition Sample in Console</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Legal Transcripts Binder & Corporate Counsel (5-Col with Legal Desk Image) */}
          <div className="md:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col justify-between shadow-xl group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/src/assets/images/legal_trial_transcripts_1794485493654.jpg"
                alt="Legal trial transcripts binder with docket numbers, gavel, and attorney headphones"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2 bg-slate-950/80 rounded-lg text-cyan-400 border border-slate-800">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-cyan-400 font-medium">02. Corporate Counsel & SEC</div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  General Counsel & Board Disclosures
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Confidential board meetings, M&A transaction due diligence, shareholder disclosures, and internal compliance briefings under strict bilateral NDAs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">SEC & GAAP terminology verified</span>
                <button
                  onClick={() => onSelectDomain('finance')}
                  className="text-xs font-semibold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Test Corporate Sample</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Clinical Trials & Administrative Investigations (5-Col) */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-cyan-400 font-medium">03. Clinical & Medical Malpractice</div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Medical Malpractice & Clinical Trials
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Physician expert witness depositions, pharmacological clinical trials, and healthcare regulatory hearings with automated HIPAA Safe Harbor redaction.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">HIPAA BAA executed upon request</span>
              <button
                onClick={() => onSelectDomain('medical')}
                className="text-xs font-semibold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Select Medical Review</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Media, Forensics & Subtitling (7-Col) */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Radio className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-cyan-400 font-medium">04. Video Deposition & Forensics</div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Courtroom Video Deposition Sync & Subtitles
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Millisecond synchronized subtitle exports in SRT and VTT formats, multi-channel wiretap audio enhancement, body camera footage transcription, and forensic audio logs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span>SRT & WebVTT Subtitles</span>
                <span aria-hidden="true">·</span>
                <span>Video Timecode Concordance</span>
                <span aria-hidden="true">·</span>
                <span>Audio Noise Suppression</span>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Trial presentation ready (Sanction / TrialDirector)</span>
              <button
                onClick={() => onSelectDomain('general')}
                className="text-xs font-semibold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Select Forensic Audio</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
