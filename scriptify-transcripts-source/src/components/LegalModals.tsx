import React from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  FileText,
  Building2,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Scale
} from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'confidentiality' | 'invoicing';

interface LegalModalsProps {
  isOpen: boolean;
  activeType: LegalModalType;
  onClose: () => void;
  onSelectType: (type: LegalModalType) => void;
  onRequestQuoteOrNDA: (topic: string) => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  isOpen,
  activeType,
  onClose,
  onSelectType,
  onRequestQuoteOrNDA,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0F1E36]/45 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto overflow-x-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#D4CFC4] rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col min-w-0 shadow-2xl relative my-auto overflow-hidden text-[#0F1E36]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Tab Navigation */}
        <div className="border-b border-[#E2DED5] bg-[#FAF8F4] p-4 sm:p-6 pb-3 sm:pb-0 flex flex-col gap-3 sm:gap-4 shrink-0">
          <div className="flex items-start sm:items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-[#E2DED5] flex items-center justify-center text-[#0F2A4A] shrink-0">
                {activeType === 'privacy' && <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
                {activeType === 'terms' && <FileText className="w-4 h-4 sm:w-5 sm:h-5" />}
                {activeType === 'confidentiality' && <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
                {activeType === 'invoicing' && <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#9A6B2F] font-semibold block break-words">
                  Scriptify Transcripts · Compliance & Governance
                </span>
                <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#0F1E36] tracking-tight leading-snug break-words">
                  {activeType === 'privacy' && 'Privacy Charter & Zero-Data Retention'}
                  {activeType === 'terms' && 'Terms of Service & Turnaround SLA'}
                  {activeType === 'confidentiality' && 'Confidentiality Guarantee & Bilateral NDA'}
                  {activeType === 'invoicing' && 'US Corporate Invoicing & Entity Verification'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-[#0F1E36] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector: Clean 2x2 grid on mobile (no horizontal scroll), inline editorial tabs on sm+ */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch gap-1.5 sm:gap-2 pt-1 sm:pt-2">
            <button
              onClick={() => onSelectType('privacy')}
              className={`px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-lg sm:rounded-none border sm:border-0 sm:border-b-2 transition-all text-center cursor-pointer ${
                activeType === 'privacy'
                  ? 'bg-[#0F2A4A] text-white border-[#0F2A4A] sm:bg-transparent sm:border-[#0F2A4A] sm:text-[#0F2A4A]'
                  : 'bg-white text-slate-600 border-[#E2DED5] hover:text-[#0F1E36] sm:bg-transparent sm:border-transparent'
              }`}
            >
              Privacy Charter
            </button>
            <button
              onClick={() => onSelectType('terms')}
              className={`px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-lg sm:rounded-none border sm:border-0 sm:border-b-2 transition-all text-center cursor-pointer ${
                activeType === 'terms'
                  ? 'bg-[#0F2A4A] text-white border-[#0F2A4A] sm:bg-transparent sm:border-[#0F2A4A] sm:text-[#0F2A4A]'
                  : 'bg-white text-slate-600 border-[#E2DED5] hover:text-[#0F1E36] sm:bg-transparent sm:border-transparent'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => onSelectType('confidentiality')}
              className={`px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-lg sm:rounded-none border sm:border-0 sm:border-b-2 transition-all text-center cursor-pointer ${
                activeType === 'confidentiality'
                  ? 'bg-[#0F2A4A] text-white border-[#0F2A4A] sm:bg-transparent sm:border-[#0F2A4A] sm:text-[#0F2A4A]'
                  : 'bg-white text-slate-600 border-[#E2DED5] hover:text-[#0F1E36] sm:bg-transparent sm:border-transparent'
              }`}
            >
              Confidentiality & NDA
            </button>
            <button
              onClick={() => onSelectType('invoicing')}
              className={`px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-lg sm:rounded-none border sm:border-0 sm:border-b-2 transition-all text-center cursor-pointer ${
                activeType === 'invoicing'
                  ? 'bg-[#0F2A4A] text-white border-[#0F2A4A] sm:bg-transparent sm:border-[#0F2A4A] sm:text-[#0F2A4A]'
                  : 'bg-white text-slate-600 border-[#E2DED5] hover:text-[#0F1E36] sm:bg-transparent sm:border-transparent'
              }`}
            >
              US Invoicing (WY)
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-8 flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
          {/* TAB 1: PRIVACY CHARTER */}
          {activeType === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FDF8F0] border border-[#E6D7BE] text-slate-700 text-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#9A6B2F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F1E36] block font-semibold mb-0.5">
                    Executive Summary: Absolute Zero Persistent Data Retention
                  </strong>
                  Unlike consumer speech platforms, Scriptify Transcripts never uses client audio recordings or transcripts for training artificial intelligence, speech recognition models, or analytics corpuses. All media buffers are purged from RAM immediately upon job completion.
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">01.</span>
                  Client-Side AES-256 Pre-Encryption Architecture
                </h3>
                <p>
                  Audio files uploaded through the Scriptify Transcripts portal are chunked and encrypted in your local browser using AES-256-GCM prior to transmission. Decryption keys are transferred over TLS 1.3 channels directly to volatile execution sandboxes and are immediately invalidated once transcript verification finishes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">02.</span>
                  Ephemeral In-Memory Processing & Disk Isolation
                </h3>
                <p>
                  Raw audio and video files are loaded strictly into RAM memory buffers. No intermediate WAV, MP3, or MP4 files are written to non-volatile block storage or shared network volumes. Upon transcript delivery or expiration of the download session, all memory registers are zero-wiped in compliance with DoD 5220.22-M sanitization guidelines.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">03.</span>
                  HIPAA Safe Harbor Compliance & PHI De-Identification
                </h3>
                <p>
                  For clinical research and healthcare recordings, Scriptify Transcripts executes formal Business Associate Agreements (BAAs). Our pipeline supports automated masking or complete redaction of all 18 HIPAA Safe Harbor identifiers (patient names, medical record numbers, dates of service, geographic subdivisions, phone numbers, and SSNs).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">04.</span>
                  GDPR, CCPA & FERPA Compliance
                </h3>
                <p>
                  All clients possess unequivocal rights to immediate erasure, data portability, and audit logs. Our US corporate operations in Sheridan, Wyoming adhere strictly to the California Consumer Privacy Act (CCPA), the Family Educational Rights and Privacy Act (FERPA) for academic recordings, and European GDPR data protection standards.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">05.</span>
                  Contractual Non-Training Clause
                </h3>
                <p>
                  We legally warrant that audio recordings, diarized speaker labels, industry vocabulary files, and finished transcripts will never be inputted into third-party AI training pipelines, foundation models, or public datasets.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeType === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] text-xs flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-[#0F1E36] font-medium">
                  <Calendar className="w-4 h-4 text-[#0F2A4A]" />
                  <span>Effective Date: Updated for Calendar Year {new Date().getFullYear()}</span>
                </div>
                <div className="text-[#9A6B2F] font-mono text-[11px] font-semibold">Governing Law: Wyoming, USA</div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">01.</span>
                  Scope of Transcription Services & Deliverables
                </h3>
                <p>
                  Scriptify Transcripts delivers legal depositions, corporate meetings, investigative interviews, clinical trials, and multimedia recordings in verbatim, intelligent verbatim, and line-numbered legal formats (Federal Rule 30(b)(6)). Standard deliverables include Microsoft Word (.docx), searchable Adobe PDF (.pdf), plain text (.txt), and timecoded subtitle files (.srt, .vtt).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">02.</span>
                  Turnaround Service Level Agreements (SLAs)
                </h3>
                <ul className="space-y-2 list-disc list-inside text-slate-700 pl-2">
                  <li><strong className="text-[#0F1E36]">Instant AI (Sub-Minute):</strong> Automated transcription at $0.20/audio minute.</li>
                  <li><strong className="text-[#0F1E36]">Standard 48-Hour Turnaround:</strong> Human-verified transcription at $1.45/audio minute (competitive rate vs. $1.99–$2.25 traditional bureaus).</li>
                  <li><strong className="text-[#0F1E36]">Rush 24-Hour Delivery:</strong> Prioritized human-verified transcription at $1.95/audio minute.</li>
                  <li><strong className="text-[#0F1E36]">Same-Day 12-Hour Priority:</strong> Expedited court-deadline transcription at $2.50/audio minute.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">03.</span>
                  99.8% Verbatim Accuracy & 14-Day Free Re-Review Guarantee
                </h3>
                <p>
                  We guarantee 99.8% verbatim accuracy on all human-verified transcription orders for recordings with clear audio quality. If any transcript fails to satisfy this benchmark, clients may request a complimentary re-audit within 14 calendar days of delivery, and our senior quality control team will re-listen and revise without charge.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">04.</span>
                  Transparent Per-Minute Billing
                </h3>
                <p>
                  Billing is calculated strictly per audio minute rounded to the nearest second—never rounded up to arbitrary 15-minute or full-hour increments. There are zero account maintenance fees, setup surcharges, or hidden hosting costs.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">05.</span>
                  Intellectual Property Ownership
                </h3>
                <p>
                  The client retains 100% exclusive intellectual property ownership and copyright in all uploaded audio files, synchronized timecodes, speaker logs, and generated transcripts. Scriptify Transcripts claims zero ownership or licensing rights over client work product.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CONFIDENTIALITY & BILATERAL NDA */}
          {activeType === 'confidentiality' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] text-xs flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Bilateral Non-Disclosure Agreement (NDA) Enforced</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuoteOrNDA('Bilateral NDA Execution Request - Scriptify Transcripts');
                  }}
                  className="px-3.5 py-1.5 bg-[#0F2A4A] hover:bg-[#173B66] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Request Executed NDA
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">01.</span>
                  Bilateral Confidentiality Obligations
                </h3>
                <p>
                  Scriptify Transcripts operates under strict bilateral confidentiality covenants. All audio recordings, legal depositions, boardroom proceedings, witness testimony, trade secrets, financial models, and research datasets entrusted to us are classified as strictly confidential proprietary information.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">02.</span>
                  Personnel Screening & Individual NDAs
                </h3>
                <p>
                  Every professional transcriber, editor, and quality assurance analyst undergoes rigorous background verification and signs an enforceable, individual Non-Disclosure Agreement with severe legal penalties for unauthorized disclosure. Access to audio segments is strictly restricted on a least-privilege, need-to-know basis.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">03.</span>
                  Attorney-Client Privilege & Work-Product Preservation
                </h3>
                <p>
                  We understand that litigation materials must maintain attorney-client privilege and attorney work-product protection. In the event of an external subpoena or legal inquiry, Scriptify Transcripts will notify the client immediately (where permitted by law) to enable the filing of appropriate protective orders.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">04.</span>
                  Federal Rule 30(b)(6) Deposition Attestation
                </h3>
                <p>
                  For litigators and court reporters, our certified transcripts can include signed affidavits of accuracy and certified reporter attestations compliant with Federal Rules of Civil Procedure 30(b)(6) and state evidentiary codes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">05.</span>
                  Cryptographic Certificate of Destruction
                </h3>
                <p>
                  Upon request, Scriptify Transcripts issues a formal Certificate of Certified Destruction affirming that all audio snippets, cache instances, and transcript copies have been permanently purged from volatile storage infrastructure.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: US INVOICING & WYOMING ENTITY */}
          {activeType === 'invoicing' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-[#0F1E36] font-bold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#9A6B2F] shrink-0" />
                    <span>Official US Business Headquarters</span>
                  </div>
                  <div className="text-slate-600 font-mono break-words">
                    30 N Gould St, STE R, Sheridan, WY 82801, United States
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuoteOrNDA('Form W-9 & Vendor Onboarding Packet Request');
                  }}
                  className="px-3.5 py-2 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-lg cursor-pointer self-start sm:self-auto transition-colors shrink-0"
                >
                  Request Form W-9
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">01.</span>
                  US Domestic Entity & Vendor Onboarding
                </h3>
                <p>
                  Scriptify Transcripts is an authorized corporate entity registered in the State of Wyoming, USA. We readily integrate into corporate and legal procurement systems with standard IRS Form W-9, certificate of insurance, and vendor compliance packets.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">02.</span>
                  Supported Enterprise Payment Rails
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] space-y-1">
                    <div className="font-semibold text-[#0F1E36] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#0F2A4A]" />
                      <span>Corporate Cards & P-Cards</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Visa, MasterCard, American Express, Discover. Instant automated digital receipt with itemized line items.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] space-y-1">
                    <div className="font-semibold text-[#0F1E36] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#0F2A4A]" />
                      <span>ACH Direct Deposit / Fedwire</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Direct US bank-to-bank electronic transfers. Detailed wiring instructions provided on verified invoices.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] space-y-1">
                    <div className="font-semibold text-[#0F1E36] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0F2A4A]" />
                      <span>Procurement Portals</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Direct invoicing via Bill.com, Coupa, SAP Ariba, Tipalti, and AvidXchange.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] space-y-1">
                    <div className="font-semibold text-[#0F1E36] flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#0F2A4A]" />
                      <span>Law Firm Trust Accounting (IOLTA)</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Separate case docket reference billing compliant with state bar trust accounting rules.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">03.</span>
                  Net-30 & Net-60 Corporate Invoicing Terms
                </h3>
                <p>
                  Litigation law firms, universities, hospitals, and Fortune 500 corporate legal departments qualify for Net-30 credit terms upon submitting standard credit references or corporate purchase orders (POs).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0F1E36] flex items-center gap-2">
                  <span className="text-[#9A6B2F] font-mono text-xs">04.</span>
                  Corporate Remittance Address
                </h3>
                <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] font-mono text-xs space-y-1 text-slate-700 break-words">
                  <div className="text-[#0F1E36] font-bold">Scriptify Transcripts</div>
                  <div>Accounts Receivable / Vendor Relations</div>
                  <div>30 N Gould St, STE R</div>
                  <div>Sheridan, WY 82801, United States</div>
                  <div className="text-[#0F2A4A] font-semibold pt-1 break-all sm:break-normal">Email: contact@scriptifytranscripts.com</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#E2DED5] bg-[#FAF8F4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-600">
            <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Official US Corporate Governance · Scriptify Transcripts</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestQuoteOrNDA(`Inquiry regarding ${activeType.toUpperCase()}`);
              }}
              className="px-4 py-2 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Contact Legal & Billing
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-[#F2EFE9] border border-[#D4CFC4] text-[#0F1E36] rounded-lg transition-colors cursor-pointer font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
