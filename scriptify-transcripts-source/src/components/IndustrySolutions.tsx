import React from 'react';
import { Scale, GraduationCap, Radio, ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';
import legalTrialTranscriptsImg from '../assets/images/legal_trial_transcripts_1794485493654.jpg';

interface IndustrySolutionsProps {
  onSelectDomain: (domain: 'legal' | 'finance' | 'medical' | 'general') => void;
}

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ onSelectDomain }) => {
  return (
    <section id="services" className="py-20 bg-[#F2EFE9]/60 border-t border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#0F2A4A]" />
            <span>Specialized Legal Practice Areas</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1E36] tracking-tight">
            High-accuracy transcription built for courtroom litigation & corporate counsel.
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
            Scriptify Transcripts delivers certified verbatim transcripts calibrated for court reporters, litigation counsel, arbitration panels, corporate boards, and clinical research investigators.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Legal & Depositions (Marquee 7-Col) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all flex flex-col justify-between shadow-xs group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] flex items-center justify-center text-[#0F2A4A]">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-[#9A6B2F] font-semibold">01. Primary Practice</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                  Courtroom Depositions & Witness Testimony
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                  Accredited transcript preparation for pre-trial witness depositions, arbitration hearings, administrative tribunals, and attorney-client strategy conferences. Strictly formatted with lines 1–25 numbering and certified speaker identification.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 pt-2">
                <span className="flex items-center gap-1 text-[#0F1E36] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F2A4A]" />
                  Federal Rule 30(b)(6)
                </span>
                <span aria-hidden="true">·</span>
                <span>Video-Synchronized Timecodes</span>
                <span aria-hidden="true">·</span>
                <span>Sworn Reporter Attestation</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Courtroom certified accuracy: <strong className="text-[#0F1E36] font-mono">99.8%</strong>
              </span>
              <button
                onClick={() => onSelectDomain('legal')}
                className="text-xs font-bold text-[#0F2A4A] flex items-center gap-1 hover:text-[#9A6B2F] transition-colors cursor-pointer"
              >
                <span>Test Deposition Sample in Console</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Legal Transcripts Binder & Corporate Counsel */}
          <div className="md:col-span-5 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all overflow-hidden flex flex-col justify-between shadow-xs group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={legalTrialTranscriptsImg}
                alt="Legal trial transcripts binder with docket numbers, gavel, and attorney headphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2 bg-white/95 rounded-lg text-[#0F2A4A] border border-[#E2DED5] shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs text-[#9A6B2F] font-semibold">02. Corporate Counsel & SEC</div>
                <h3 className="font-serif text-lg font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                  General Counsel & Board Disclosures
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Confidential board meetings, M&A transaction due diligence, shareholder disclosures, and internal compliance briefings under strict bilateral NDAs.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DED5] flex items-center justify-between">
                <span className="text-[11px] text-slate-500">SEC & GAAP terminology verified</span>
                <button
                  onClick={() => onSelectDomain('finance')}
                  className="text-xs font-semibold text-[#0F2A4A] flex items-center gap-1 hover:text-[#9A6B2F] transition-colors cursor-pointer"
                >
                  <span>Test Corporate Sample</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Clinical Trials & Administrative Investigations */}
          <div className="md:col-span-5 p-6 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all flex flex-col justify-between shadow-xs group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] flex items-center justify-center text-[#0F2A4A]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs text-[#9A6B2F] font-semibold">03. Clinical & Medical Malpractice</div>
                <h3 className="font-serif text-lg font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                  Medical Malpractice & Clinical Trials
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Physician expert witness depositions, pharmacological clinical trials, and healthcare regulatory hearings with automated HIPAA Safe Harbor redaction.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E2DED5] flex items-center justify-between">
              <span className="text-[11px] text-slate-500">HIPAA BAA executed upon request</span>
              <button
                onClick={() => onSelectDomain('medical')}
                className="text-xs font-semibold text-[#0F2A4A] flex items-center gap-1 hover:text-[#9A6B2F] transition-colors cursor-pointer"
              >
                <span>Select Medical Review</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Media, Forensics & Subtitling */}
          <div className="md:col-span-7 p-6 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all flex flex-col justify-between shadow-xs group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] flex items-center justify-center text-[#0F2A4A]">
                <Radio className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs text-[#9A6B2F] font-semibold">04. Video Deposition & Forensics</div>
                <h3 className="font-serif text-lg font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                  Courtroom Video Deposition Sync & Subtitles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  Millisecond synchronized subtitle exports in SRT and VTT formats, multi-channel wiretap audio enhancement, body camera footage transcription, and forensic audio logs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span>SRT & WebVTT Subtitles</span>
                <span aria-hidden="true">·</span>
                <span>Video Timecode Concordance</span>
                <span aria-hidden="true">·</span>
                <span>Audio Noise Suppression</span>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E2DED5] flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Trial presentation ready (Sanction / TrialDirector)</span>
              <button
                onClick={() => onSelectDomain('general')}
                className="text-xs font-semibold text-[#0F2A4A] flex items-center gap-1 hover:text-[#9A6B2F] transition-colors cursor-pointer"
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
