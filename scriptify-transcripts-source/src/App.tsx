import { useState, useEffect } from 'react';
import { Navbar, ViewType } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { SecurityCompliance } from './components/SecurityCompliance';
import { IndustrySolutions } from './components/IndustrySolutions';
import { CostCalculator } from './components/CostCalculator';
import { PastClients } from './components/PastClients';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { ContactModal } from './components/ContactModal';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ClientUser } from './types';
import {
  Scale,
  ArrowRight,
  Lock,
  Building2,
  Clock,
  ArrowLeft,
  CheckCircle2,
  FileText
} from 'lucide-react';
import legalStenographerDeskImg from './assets/images/legal_stenographer_desk_1794597870198.jpg';
import clinicalBoardReviewImg from './assets/images/clinical_board_review_1794597870554.jpg';
import legalTrialTranscriptsImg from './assets/images/legal_trial_transcripts_1794485493654.jpg';
import securityVaultImg from './assets/images/security_vault_datacenter_1794310482794.jpg';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [initialSampleId, setInitialSampleId] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [prefilledNotes, setPrefilledNotes] = useState<string | null>(null);

  // Legal modal state
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalType, setActiveLegalType] = useState<LegalModalType>('privacy');

  // Client authentication state with persistent storage
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(() => {
    try {
      const saved = localStorage.getItem('scriptify_client_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<string | null>(null);

  const handleLoginSuccess = (user: ClientUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('scriptify_client_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('scriptify_client_user');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequireAuth = (reason?: string) => {
    setAuthModalReason(reason || null);
    setAuthModalOpen(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleOpenPortalWithSample = (sampleId: string) => {
    setInitialSampleId(sampleId);
    setCurrentView('portal');
  };

  const handleOpenQuoteWithEstimate = (estimateStr: string) => {
    setPrefilledNotes(estimateStr);
    setIsQuoteOpen(true);
  };

  const handleOpenGeneralQuote = (planOrTopic?: string) => {
    if (planOrTopic) {
      setPrefilledNotes(`Inquiry regarding ${planOrTopic}`);
    } else {
      setPrefilledNotes(null);
    }
    setIsQuoteOpen(true);
  };

  const handleOpenLegal = (type: LegalModalType) => {
    setActiveLegalType(type);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#0F1E36] font-sans overflow-x-clip selection:bg-[#0F2A4A]/15 selection:text-[#0F2A4A]">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => {
          setInitialSampleId(null);
          setCurrentView(view);
        }}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthModalReason('Sign in to your client workspace or explore demo accounts.');
          setAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1">
        {/* VIEW 1: OVERVIEW (HOME) */}
        {currentView === 'overview' && (
          <div className="space-y-0">
            <Hero
              onOpenPortal={() => {
                setInitialSampleId(null);
                setCurrentView('portal');
              }}
              onSelectSample={handleOpenPortalWithSample}
              onOpenQuote={() => handleOpenGeneralQuote('Trial Deposition')}
            />

            {/* Quick Action Strip in Deep Judicial Navy */}
            <section className="py-10 bg-[#0F2A4A] text-white border-b border-[#0A1D36]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Have an upcoming trial deposition or arbitration hearing?
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Certified Rule 30(b)(6) line-numbered delivery in 12h, 24h, or 48h. Protected under executed Bilateral NDA.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setInitialSampleId(null);
                      setCurrentView('portal');
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-[#0F2A4A] bg-white rounded-lg hover:bg-[#FAF8F4] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Submit Case Audio
                  </button>
                  <button
                    onClick={() => setCurrentView('pricing')}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-transparent border border-white/30 rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Calculate Matter Cost
                  </button>
                </div>
              </div>
            </section>

            {/* Hub Practice Areas Cards */}
            <section className="py-16 bg-[#FAF8F4]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider block mb-1">
                      Practice Divisions & Standards
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36] tracking-tight">
                      Explore Scriptify Transcripts by Practice
                    </h2>
                  </div>
                  <span className="text-xs text-slate-600">
                    Select a section to inspect deliverables & evidentiary standards
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Services */}
                  <div
                    onClick={() => setCurrentView('services')}
                    className="rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EFE9]">
                        <img
                          src={legalStenographerDeskImg}
                          alt="Certified legal transcriptionist working on stenotype keyboard with deposition transcript monitor"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center shadow-xs">
                          <Scale className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-base font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                          Services & Practice Areas
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Rule 30(b)(6) court depositions, executive board briefings, clinical research trials, and media subtitling.
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 text-xs font-semibold text-[#0F2A4A] flex items-center gap-1">
                      <span>View Practice Areas</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Clients */}
                  <div
                    onClick={() => setCurrentView('clients')}
                    className="rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EFE9]">
                        <img
                          src={clinicalBoardReviewImg}
                          alt="Litigation counsel reviewing printed transcript binders alongside synchronized audio timeline"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center shadow-xs">
                          <Building2 className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-base font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                          Client Case Studies
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Track record with national trial litigation counsel, clinical research institutions, and advisory groups.
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 text-xs font-semibold text-[#0F2A4A] flex items-center gap-1">
                      <span>View Case Studies</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Pricing */}
                  <div
                    onClick={() => setCurrentView('pricing')}
                    className="rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EFE9]">
                        <img
                          src={legalTrialTranscriptsImg}
                          alt="Bound deposition transcript binder with line numbers, gavel, and legal transcription headphones"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center shadow-xs">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-base font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                          Pricing & Estimator
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Starting at a competitive $1.45/minute. Calculate your institutional savings against legacy agencies instantly.
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 text-xs font-semibold text-[#0F2A4A] flex items-center gap-1">
                      <span>Open Cost Estimator</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 4: Security */}
                  <div
                    onClick={() => setCurrentView('security')}
                    className="rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EFE9]">
                        <img
                          src={securityVaultImg}
                          alt="Enterprise cryptographic vault and zero-retention server architecture"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center shadow-xs">
                          <Lock className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-base font-bold text-[#0F1E36] group-hover:text-[#0F2A4A] transition-colors">
                          Security & HIPAA
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Client-side AES-256 pre-encryption, RAM buffer purge, zero data retention, and signed Bilateral NDAs.
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 text-xs font-semibold text-[#0F2A4A] flex items-center gap-1">
                      <span>Review Security Charter</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Editorial Legal Transcription Craftsmanship Showcase */}
            <section className="py-16 bg-[#F2EFE9]/70 border-y border-[#E2DED5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left: Documentary Legal Transcription Photograph */}
                  <div className="lg:col-span-6">
                    <div className="relative rounded-xl overflow-hidden border border-[#D4CFC4] bg-white shadow-md">
                      <img
                        src={legalStenographerDeskImg}
                        alt="Certified court reporter and legal transcriptionist reviewing deposition exhibit records"
                        className="w-full aspect-[16/10] object-cover"
                      />
                      <div className="p-4 bg-white border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-[#0F1E36] font-semibold">
                          <FileText className="w-4 h-4 text-[#9A6B2F] shrink-0" />
                          <span>Federal Rule 30(b)(6) Line-Numbered Preparation</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#0F2A4A] font-semibold shrink-0">99.8% Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Judicial Process & Verbatim Rigor */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
                      The Verbatim Standard
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36] tracking-tight leading-snug">
                      From courtroom audio to certified evidentiary record—without compromise.
                    </h2>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Every deposition, arbitration hearing, and regulatory interview passes through specialist legal editors trained in statutory citations, medical expert terminology, and multi-speaker courtroom colloquy.
                    </p>

                    <div className="space-y-3 pt-1">
                      <div className="flex items-start gap-3 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0F2A4A] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#0F1E36]">Lines 1–25 Page Formatting:</strong> Formatted for immediate bench citations, trial impeachment, and Word Index concordance.
                        </span>
                      </div>
                      <div className="flex items-start gap-3 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0F2A4A] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#0F1E36]">Dual-Pass Legal Proofing:</strong> Cross-checked against exhibit markers, proper nouns, and docket filings prior to sign-off.
                        </span>
                      </div>
                      <div className="flex items-start gap-3 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#0F1E36]">Zero-Retention Custody:</strong> Client-side AES-256 sealing ensures privileged testimony is never retained or reused.
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleOpenPortalWithSample('legal')}
                        className="px-5 py-3 bg-[#0F2A4A] hover:bg-[#173B66] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
                      >
                        <span>Inspect Live Deposition Exhibit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenGeneralQuote('Certified Legal Transcription')}
                        className="px-5 py-3 bg-white hover:bg-[#FAF8F4] text-[#0F2A4A] border border-[#D4CFC4] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Request Firm Rate Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Pricing Estimator Preview */}
            <CostCalculator onOpenQuoteWithEstimate={handleOpenQuoteWithEstimate} />

            {/* Testimonials */}
            <Testimonials />
          </div>
        )}

        {/* VIEW 2: SERVICES & DEPOSITIONS */}
        {currentView === 'services' && (
          <div className="py-12 space-y-12 bg-[#FAF8F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <button
                onClick={() => setCurrentView('overview')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0F2A4A] font-medium transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Overview</span>
              </button>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-[#0F2A4A]" />
                  <span>Specialized Practice Areas</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight">
                  Services & Courtroom Depositions
                </h1>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Calibrated for court reporters, litigation counsel, enterprise executives, academics, and media producers. Formatted strictly to Federal Rule of Civil Procedure 30(b)(6) standards.
                </p>
              </div>
            </div>

            <IndustrySolutions
              onSelectDomain={(domain) => {
                if (domain === 'legal') {
                  handleOpenPortalWithSample('legal');
                } else if (domain === 'finance') {
                  handleOpenPortalWithSample('earnings');
                } else {
                  handleOpenPortalWithSample('clinical');
                }
              }}
            />

            {/* Courtroom Deposition Technical Specifications */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="p-5 sm:p-8 rounded-xl bg-white border border-[#E2DED5] space-y-6 shadow-xs">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#0F1E36]">
                    Courtroom Deposition & Trial Deliverable Standards
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    Every legal assignment adheres to certified court transcription rules used across US District Courts and state jurisdictions:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] space-y-1.5">
                    <div className="font-bold text-[#0F1E36]">Rule 30(b)(6) Line Numbering</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Lines 1–25 numbered per page with standard left margins for prompt courtroom citing.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] space-y-1.5">
                    <div className="font-bold text-[#0F1E36]">Word Index Concordance</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Complete alphabetical index of terms, party names, and exhibit markers with page references.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] space-y-1.5">
                    <div className="font-bold text-[#0F1E36]">Timecode-Synchronized Video</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Millisecond timestamp alignment matching deposition videography feeds.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] space-y-1.5">
                    <div className="font-bold text-[#0F1E36]">Reporter Attestation Certificate</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Signed certificate verifying verbatim integrity and chain-of-custody preservation.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-600">
                    Deliverable formats: <strong className="text-[#0F1E36]">Word (.docx), PDF, ASCII, PTX, and SRT/VTT</strong>
                  </div>
                  <button
                    onClick={() => handleOpenPortalWithSample('legal')}
                    className="px-5 py-2.5 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Test Legal Deposition in Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CLIENT CASE STUDIES */}
        {currentView === 'clients' && (
          <div className="py-12 space-y-12 bg-[#FAF8F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <button
                onClick={() => setCurrentView('overview')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0F2A4A] font-medium transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Overview</span>
              </button>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#0F2A4A]" />
                  <span>Institutional Track Record</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight">
                  Client Case Studies & Verified Results
                </h1>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Learn how national trial law firms, clinical research networks, and corporate finance advisory groups streamline transcription with guaranteed 99.8% verbatim accuracy and predictable rates.
                </p>
              </div>
            </div>

            <PastClients onOpenPortalWithSample={handleOpenPortalWithSample} />
            <Testimonials />
          </div>
        )}

        {/* VIEW 4: PRICING & ESTIMATOR */}
        {currentView === 'pricing' && (
          <div className="py-12 space-y-12 bg-[#FAF8F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <button
                onClick={() => setCurrentView('overview')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0F2A4A] font-medium transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Overview</span>
              </button>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#0F2A4A]" />
                  <span>Transparent Per-Minute Rates</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight">
                  Pricing & Interactive Cost Estimator
                </h1>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  No monthly retainers, minimum billing quotas, or user seat charges. Predictable, competitive per-minute rates starting at $1.45/minute.
                </p>
              </div>
            </div>

            <CostCalculator onOpenQuoteWithEstimate={handleOpenQuoteWithEstimate} />
            <Pricing onSelectPlan={(plan) => handleOpenGeneralQuote(plan)} />
          </div>
        )}

        {/* VIEW 5: SECURITY & HIPAA */}
        {currentView === 'security' && (
          <div className="py-12 space-y-12 bg-[#FAF8F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <button
                onClick={() => setCurrentView('overview')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0F2A4A] font-medium transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Overview</span>
              </button>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-[#0F2A4A]" />
                  <span>Cryptographic Security & Zero-Retention</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight">
                  Security, Privacy Charter & HIPAA Compliance
                </h1>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  Engineered specifically for legal privilege and medical secrecy. In-browser AES-256 pre-encryption, RAM-only execution buffers, and guaranteed zero persistent data retention.
                </p>
              </div>
            </div>

            <SecurityCompliance onOpenLegal={handleOpenLegal} />

            {/* Quick Actions for Compliance Documentation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="p-5 sm:p-8 rounded-xl bg-white border border-[#E2DED5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-[#0F1E36]">
                    Need an Executed Bilateral NDA or HIPAA BAA?
                  </h3>
                  <p className="text-xs text-slate-600">
                    Our US corporate legal team executes mutual non-disclosure agreements within 2 business hours.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleOpenLegal('confidentiality')}
                    className="px-4 py-2.5 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Review Bilateral NDA
                  </button>
                  <button
                    onClick={() => handleOpenLegal('privacy')}
                    className="px-4 py-2.5 bg-[#FAF8F4] hover:bg-[#F2EFE9] text-[#0F1E36] border border-[#D4CFC4] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Read Privacy Charter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: CLIENT PORTAL & UPLOAD CONSOLE */}
        {currentView === 'portal' && (
          <Dashboard
            initialSampleId={initialSampleId}
            currentUser={currentUser}
            onRequireAuth={handleRequireAuth}
            onOpenLegal={handleOpenLegal}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentView={currentView}
        onViewChange={(view) => {
          setInitialSampleId(null);
          setCurrentView(view);
        }}
        onOpenQuote={(topic) => handleOpenGeneralQuote(topic || 'Website Footer Inquiry')}
        onOpenLegal={handleOpenLegal}
        onOpenAuth={() => {
          setAuthModalReason('Sign in to access your client portal or inspect demo profiles.');
          setAuthModalOpen(true);
        }}
      />

      {/* Quote Request Modal */}
      <ContactModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefilledNotes={prefilledNotes}
      />

      {/* Legal & Compliance Modals */}
      <LegalModals
        isOpen={legalModalOpen}
        activeType={activeLegalType}
        onClose={() => setLegalModalOpen(false)}
        onSelectType={(type) => setActiveLegalType(type)}
        onRequestQuoteOrNDA={(topic) => handleOpenGeneralQuote(topic)}
      />

      {/* Client Authentication & Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        defaultReason={authModalReason}
      />
    </div>
  );
}
