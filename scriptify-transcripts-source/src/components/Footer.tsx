import React, { useState } from 'react';
import { Lock, Mail, MapPin } from 'lucide-react';
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
    <footer className="bg-[#F2EFE9] border-t border-[#E2DED5] py-16 text-xs text-slate-600">
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
                className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-[#E2DED5] group-hover:border-[#0F2A4A]/40 transition-colors"
              />
              <span className="text-lg font-extrabold text-[#0F2A4A] tracking-tight">
                SCRIPTIFY <span className="text-[#9A6B2F] text-xs font-semibold ml-1 uppercase tracking-wider">Transcripts</span>
              </span>
            </button>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              Court-certified legal, corporate, and medical research audio transcription. Accurate verbatim records, predictable turnaround, and encrypted zero-retention privacy.
            </p>

            {/* US Headquarters Address */}
            <div className="space-y-2 text-slate-700 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F2A4A] shrink-0 mt-0.5" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                  <button
                    onClick={() => onOpenLegal('invoicing')}
                    className="text-left text-slate-700 hover:text-[#0F2A4A] transition-colors cursor-pointer underline decoration-[#D4CFC4] underline-offset-4 hover:decoration-[#0F2A4A]"
                    title="View US Corporate Registration & Invoicing Details"
                  >
                    30 N Gould St, STE R, Sheridan, WY 82801, United States
                  </button>
                  <button
                    onClick={handleCopyAddress}
                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#D4CFC4] text-slate-600 hover:text-[#0F2A4A] hover:border-[#0F2A4A] transition-colors cursor-pointer self-start sm:self-auto font-medium"
                  >
                    {copiedAddress ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#0F2A4A]">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:contact@scriptifytranscripts.com"
                  className="hover:underline font-mono font-medium"
                  title="Direct Email to Customer Support"
                >
                  contact@scriptifytranscripts.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-slate-600 pt-1">
              <button
                onClick={() => onOpenLegal('privacy')}
                className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer group font-medium"
                title="Review Zero Persistence Storage Charter"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="underline decoration-emerald-700/40 group-hover:decoration-emerald-800 underline-offset-2">
                  Zero Persistence Storage
                </span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => onOpenLegal('confidentiality')}
                className="hover:text-[#0F2A4A] transition-colors cursor-pointer underline decoration-[#D4CFC4] hover:decoration-[#0F2A4A] underline-offset-2 font-medium"
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
              <div className="font-bold text-[#0F1E36] uppercase tracking-wider text-[11px]">
                Practice Areas
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Legal & Depositions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Corporate & Executive
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Clinical & Medical Trials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('services')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Forensics & Video Sync
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Platform & Tools */}
            <div className="space-y-3">
              <div className="font-bold text-[#0F1E36] uppercase tracking-wider text-[11px]">
                Client Workspace
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => onViewChange('portal')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Deposition Upload Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('pricing')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Pricing Estimator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('clients')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Client Case Studies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onViewChange('security')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Security & Encryption
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Contact */}
            <div className="space-y-3">
              <div className="font-bold text-[#0F1E36] uppercase tracking-wider text-[11px]">
                Governance & Access
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => onOpenQuote('Custom Project Quote Request')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Request a Project Quote
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('confidentiality')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full"
                  >
                    Bilateral NDA Request
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('invoicing')}
                    className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-left block w-full font-medium"
                  >
                    US Invoicing (Wyoming)
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAuth}
                    className="hover:text-[#173B66] text-[#0F2A4A] font-semibold transition-colors cursor-pointer text-left block w-full"
                  >
                    Client Portal Sign In
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal notices */}
        <div className="pt-8 border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Scriptify Transcripts (scriptifytranscripts.com). All rights reserved. 30 N Gould St, STE R, Sheridan, WY 82801.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-slate-700 font-medium"
            >
              Privacy Charter
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-slate-700 font-medium"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('confidentiality')}
              className="hover:text-[#0F2A4A] transition-colors cursor-pointer text-slate-700 font-medium"
            >
              Confidentiality Guarantee
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
