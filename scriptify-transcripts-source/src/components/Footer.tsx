import React, { useState } from 'react';
import { Lock, Mail, MapPin, ShieldCheck, UserCheck } from 'lucide-react';
import { LegalModalType } from './LegalModals';
import { ViewType } from './Navbar';
import scriptifyLogo from '../assets/images/scriptify_polished_logo_1794312499371.jpg';

interface FooterProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onOpenQuote: (topic?: string) => void;
  onOpenLegal: (type: LegalModalType) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onViewChange,
  onOpenQuote,
  onOpenLegal,
  onOpenAuth,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText('30 N Gould St, STE R, Sheridan, WY 82801, United States');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onViewChange('overview')}
              className="flex items-center gap-3 cursor-pointer text-left group"
            >
              <img
                src={scriptifyLogo}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.jpg';
                }}
                alt="Scriptify Transcripts Logo"
                className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 border border-cyan-400/40 group-hover:border-cyan-400 transition-colors"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                SCRIPTIFY<span className="text-cyan-400 text-xs font-semibold ml-1.5 uppercase">Transcripts</span>
              </span>
            </button>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Professional legal, corporate, and research audio transcription. Accurate verbatim records, fast turnaround delivery, and encrypted zero-retention client privacy.
            </p>

            {/* US Headquarters Address */}
            <div className="space-y-2 text-slate-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                  <button
                    onClick={() => onOpenLegal('invoicing')}
                    className="text-left text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer underline decoration-slate-700 underline-offset-4 hover:decoration-cyan-400"
                    title="View US Corporate Registration & Invoicing Details"
                  >
                    30 N Gould St, STE R, Sheridan, WY 82801, United States
                  </button>
                  <button
                    onClick={handleCopyAddress}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    {copiedAddress ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-cyan-400">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:contact@scriptifytranscripts.com"
                  className="hover:underline font-mono"
                  title="Direct Email to Customer Support"
                >
                  contact@scriptifytranscripts.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-slate-400 pt-1">
              <button
                onClick={() => onOpenLegal('privacy')}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
                title="Review Zero Persistence Storage Charter"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="underline decoration-emerald-800/60 group-hover:decoration-emerald-400 underline-offset-2">
                  Zero Persistence Storage
                </span>
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenLegal('confidentiality')}
                className="hover:text-cyan-400 transition-colors cursor-pointer underline decoration-slate-800 hover:decoration-cyan-400 underline-offset-2"
                title="Review Federal Rule 30(b)(6) Compliance"
              >
                Rule 30(b)(6) Formatting
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Practice Areas */}
            <div className="space-y-3">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Practice Areas
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Legal & Depositions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Corporate & Executive
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Academic & Research
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Media & Subtitles
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Platform & Tools */}
            <div className="space-y-3">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Platform & Tools
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button
                    onClick={() => onViewChange('portal')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Upload Audio Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('pricing')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Pricing Estimator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('clients')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Client Case Studies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('security')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Security & Encryption
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Contact */}
            <div className="space-y-3">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Company & Client Access
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button
                    onClick={() => onOpenQuote('Custom Project Quote Request')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Request a Project Quote
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('confidentiality')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full"
                  >
                    Bilateral NDA Request
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('invoicing')}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left block w-full text-slate-300 font-medium"
                  >
                    US Invoicing (Wyoming)
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAuth}
                    className="hover:text-cyan-400 text-cyan-400/90 font-semibold transition-colors cursor-pointer text-left block w-full"
                  >
                    Client Portal Sign In
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal notices */}
        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Scriptify Transcripts (scriptifytranscripts.com). All rights reserved. 30 N Gould St, STE R, Sheridan, WY 82801.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-cyan-400 transition-colors cursor-pointer text-slate-300"
            >
              Privacy Charter
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-cyan-400 transition-colors cursor-pointer text-slate-300"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('confidentiality')}
              className="hover:text-cyan-400 transition-colors cursor-pointer text-slate-300"
            >
              Confidentiality Guarantee
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
