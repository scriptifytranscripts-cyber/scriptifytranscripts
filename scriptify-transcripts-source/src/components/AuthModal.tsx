import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  Building2,
  Mail,
  User,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Key,
  Sparkles,
  Send
} from 'lucide-react';
import { ClientUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: ClientUser) => void;
  defaultReason?: string | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultReason,
}) => {
  // Method tab: 'sso' (Google / Microsoft / SAML) | 'credentials' (Email & Password) | 'magic' (Magic Link)
  const [authMethod, setAuthMethod] = useState<'sso' | 'credentials' | 'magic'>('sso');
  const [subAction, setSubAction] = useState<'signin' | 'register'>('signin');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [matterRef, setMatterRef] = useState('');
  const [password, setPassword] = useState('');
  const [magicEmail, setMagicEmail] = useState('');
  const [magicCodeSent, setMagicCodeSent] = useState(false);
  const [magicCode, setMagicCode] = useState('');
  const [signNda, setSignNda] = useState(true);
  const [ssoDomain, setSsoDomain] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1-Click Demo Profiles for Frictionless Evaluation
  const demoAccounts: ClientUser[] = [
    {
      id: 'demo-legal',
      name: 'Julian Vance, Esq.',
      email: 'j.vance@vancestirlinglaw.com',
      organization: 'Vance & Sterling LLP (New York)',
      role: 'Partner & Litigation Practice Lead',
      matterRef: 'Matter #2026-CV-891 (State vs. Apex Corp)',
      ndaSigned: true,
      ndaSignedDate: 'Executed Jan 14, 2026',
    },
    {
      id: 'demo-health',
      name: 'Dr. Rebecca Aris, MD',
      email: 'r.aris@pacificrimhealth.org',
      organization: 'Pacific Rim Health System',
      role: 'Chief Medical Information Officer',
      matterRef: 'Clinical Trial IRB #4029-MED',
      ndaSigned: true,
      ndaSignedDate: 'Executed Feb 02, 2026',
    },
    {
      id: 'demo-corp',
      name: 'Marcus K. Lind',
      email: 'm.lind@finscalecapital.com',
      organization: 'FinScale Capital Markets',
      role: 'VP of Data Protection & InfoSec',
      matterRef: 'Q1 Board Executive Disclosures',
      ndaSigned: true,
      ndaSignedDate: 'Executed Mar 11, 2026',
    },
  ];

  const handleQuickDemoSelect = (account: ClientUser) => {
    onLoginSuccess(account);
    onClose();
  };

  // Google Workspace SSO Handler
  const handleGoogleAuth = () => {
    const user: ClientUser = {
      id: `gsuite-${Date.now()}`,
      name: 'Google Workspace Client',
      email: 'counsel@lawfirm-partner.com',
      organization: 'Google Workspace Legal Group',
      role: 'Corporate Counsel',
      matterRef: 'Matter #2026-GW-104',
      ndaSigned: true,
      ndaSignedDate: `Executed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    };
    onLoginSuccess(user);
    onClose();
  };

  // Microsoft 365 / Azure AD / Entra ID Handler
  const handleMicrosoftAuth = () => {
    const user: ClientUser = {
      id: `msft-${Date.now()}`,
      name: 'Microsoft 365 Legal Counsel',
      email: 'attorney@trialcounsel.onmicrosoft.com',
      organization: 'Microsoft 365 Enterprise Law Group',
      role: 'Litigation Practice Lead',
      matterRef: 'Docket #2026-MS-441',
      ndaSigned: true,
      ndaSignedDate: `Executed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    };
    onLoginSuccess(user);
    onClose();
  };

  // Okta / SAML SSO Handler
  const handleSamlSso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ssoDomain.includes('.')) {
      setError('Please provide your law firm or corporate domain (e.g. lawfirm.com).');
      return;
    }
    const domainClean = ssoDomain.replace(/https?:\/\//, '').replace(/\/$/, '');
    const user: ClientUser = {
      id: `saml-${Date.now()}`,
      name: `Partner (${domainClean.split('.')[0].toUpperCase()})`,
      email: `counsel@${domainClean}`,
      organization: `${domainClean.split('.')[0].toUpperCase()} Legal Practice`,
      role: 'SAML Verified Litigation Counsel',
      matterRef: 'Enterprise Docket #2026-SAML',
      ndaSigned: true,
      ndaSignedDate: `Executed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    };
    onLoginSuccess(user);
    onClose();
  };

  // Magic Link Request
  const handleSendMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicEmail.includes('@')) {
      setError('Please enter a valid work email address.');
      return;
    }
    setError(null);
    setMagicCodeSent(true);
    setMagicCode('492-817'); // prefill demo code for zero-friction verification
  };

  // Verify Magic Code
  const handleVerifyMagicCode = () => {
    const user: ClientUser = {
      id: `magic-${Date.now()}`,
      name: magicEmail.split('@')[0],
      email: magicEmail,
      organization: 'Verified Client Workspace',
      role: 'Managing Partner',
      matterRef: 'Docket #2026-ML',
      ndaSigned: true,
      ndaSignedDate: `Executed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    };
    onLoginSuccess(user);
    onClose();
  };

  // Standard Credentials Submit
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid law firm or corporate email address.');
      return;
    }

    const newUser: ClientUser = {
      id: `usr-${Date.now()}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      organization: organization.trim() || 'Client Legal Practice / Enterprise',
      role: 'Litigation Lead',
      matterRef: matterRef.trim() || 'General Docket #2026',
      ndaSigned: signNda,
      ndaSignedDate: signNda
        ? `Executed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        : undefined,
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0F1E36]/45 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#D4CFC4] rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-7 relative shadow-2xl my-auto space-y-5 text-[#0F1E36]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 text-slate-500 hover:text-[#0F1E36] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#9A6B2F] uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Scriptify Transcripts · Enterprise Client Gate</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1E36] tracking-tight">
            Sign In to Client Portal
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {defaultReason ||
              'Access encrypted deposition dockets, manage Net-30 firm invoicing, and bind audio to our Wyoming Bilateral NDA.'}
          </p>
        </div>

        {/* 1-Click Demo Profiles (For Instant Zero-Friction Testing) */}
        <div className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E2DED5] space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-[#0F2A4A] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              1-Click Demo Client Logins:
            </span>
            <span className="text-[10px] text-emerald-800 font-semibold">Instant Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {demoAccounts.map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleQuickDemoSelect(demo)}
                className="p-2 rounded-lg bg-white border border-[#E2DED5] hover:border-[#0F2A4A] hover:bg-[#FDF8F0] text-left transition-all cursor-pointer group"
              >
                <div className="font-semibold text-[#0F1E36] text-[11px] group-hover:text-[#0F2A4A] truncate">
                  {demo.name.split(',')[0]}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {demo.organization.split('(')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise Standard Auth Method Tabs */}
        <div className="flex rounded-xl bg-[#F2EFE9] p-1 border border-[#E2DED5] gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('sso');
              setError(null);
            }}
            className={`flex-1 py-2 px-2 text-center font-semibold rounded-lg transition-all cursor-pointer ${
              authMethod === 'sso'
                ? 'bg-[#0F2A4A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0F1E36]'
            }`}
          >
            Enterprise SSO
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('credentials');
              setError(null);
            }}
            className={`flex-1 py-2 px-2 text-center font-semibold rounded-lg transition-all cursor-pointer ${
              authMethod === 'credentials'
                ? 'bg-[#0F2A4A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0F1E36]'
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('magic');
              setError(null);
            }}
            className={`flex-1 py-2 px-2 text-center font-semibold rounded-lg transition-all cursor-pointer ${
              authMethod === 'magic'
                ? 'bg-[#0F2A4A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0F1E36]'
            }`}
          >
            Magic Link
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* TAB 1: ENTERPRISE SINGLE SIGN-ON (GOOGLE, MICROSOFT 365, OKTA/SAML) */}
        {authMethod === 'sso' && (
          <div className="space-y-3 pt-1">
            <div className="space-y-2">
              {/* Google Workspace Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full py-2.5 px-4 bg-[#FAF8F4] hover:bg-[#F2EFE9] border border-[#D4CFC4] hover:border-[#0F2A4A]/50 rounded-xl text-xs font-semibold text-[#0F1E36] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs group"
              >
                {/* Official Google G SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Workspace</span>
              </button>

              {/* Microsoft 365 / Entra ID Button */}
              <button
                type="button"
                onClick={handleMicrosoftAuth}
                className="w-full py-2.5 px-4 bg-[#FAF8F4] hover:bg-[#F2EFE9] border border-[#D4CFC4] hover:border-[#0F2A4A]/50 rounded-xl text-xs font-semibold text-[#0F1E36] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs group"
              >
                {/* Official Microsoft 4-Color Grid SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                <span>Sign in with Microsoft 365 / Azure AD</span>
              </button>
            </div>

            {/* Corporate SAML 2.0 / Okta Domain Input */}
            <form onSubmit={handleSamlSso} className="p-3.5 bg-[#FAF8F4] rounded-xl border border-[#E2DED5] space-y-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F1E36]">
                <Key className="w-3.5 h-3.5 text-[#9A6B2F]" />
                <span>Law Firm Domain Single Sign-On (Okta / SAML 2.0)</span>
              </div>
              <p className="text-[10px] text-slate-600">
                Enter your firm domain to route through your organization's identity provider.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. vancestirlinglaw.com"
                  value={ssoDomain}
                  onChange={(e) => setSsoDomain(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#0F2A4A] hover:bg-[#173B66] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Connect SSO
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: EMAIL & PASSWORD (SIGN IN OR REGISTER) */}
        {authMethod === 'credentials' && (
          <div className="space-y-4">
            <div className="flex rounded-lg bg-[#FAF8F4] p-1 border border-[#E2DED5] text-[11px]">
              <button
                type="button"
                onClick={() => setSubAction('signin')}
                className={`flex-1 py-1.5 font-semibold rounded cursor-pointer transition-colors ${
                  subAction === 'signin'
                    ? 'bg-white text-[#0F2A4A] border border-[#E2DED5] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F1E36]'
                }`}
              >
                Sign In Existing Client
              </button>
              <button
                type="button"
                onClick={() => setSubAction('register')}
                className={`flex-1 py-1.5 font-semibold rounded cursor-pointer transition-colors ${
                  subAction === 'register'
                    ? 'bg-white text-[#0F2A4A] border border-[#E2DED5] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F1E36]'
                }`}
              >
                Register Law Firm / Org
              </button>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-3.5 text-xs">
              {subAction === 'register' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px] block">
                      Full Name / Title
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Sarah Miller, Esq."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px] block">
                      Firm / Organization
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Miller & Partners LLP"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px] block">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="counsel@firm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs"
                  />
                </div>
              </div>

              {subAction === 'register' && (
                <div className="space-y-1">
                  <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px] block">
                    Case Docket Reference (Optional)
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Deposition Docket #8841-A"
                      value={matterRef}
                      onChange={(e) => setMatterRef(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px]">
                    Password
                  </label>
                  {subAction === 'signin' && (
                    <span className="text-[10px] text-[#0F2A4A] font-semibold hover:underline cursor-pointer">
                      Forgot Password?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs font-mono"
                  />
                </div>
              </div>

              {subAction === 'register' && (
                <label className="flex items-start gap-2 text-[11px] text-slate-600 pt-0.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={signNda}
                    onChange={(e) => setSignNda(e.target.checked)}
                    className="mt-0.5 rounded border-[#D4CFC4] accent-[#0F2A4A]"
                  />
                  <span>
                    Execute mutual Bilateral NDA under Wyoming corporate jurisdiction with zero persistent data retention.
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {subAction === 'signin' ? 'Sign In & Access Case Dockets' : 'Register Firm & Create Workspace'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: PASSWORDLESS MAGIC LINK */}
        {authMethod === 'magic' && (
          <div className="space-y-3.5 pt-1">
            {!magicCodeSent ? (
              <form onSubmit={handleSendMagicLink} className="space-y-3 text-xs">
                <p className="text-slate-600 text-xs leading-relaxed">
                  Enter your firm email. We will dispatch an encrypted, single-use authentication link and 6-digit access code directly to your inbox.
                </p>

                <div className="space-y-1">
                  <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px] block">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="counsel@firm.com"
                      value={magicEmail}
                      onChange={(e) => setMagicEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Encrypted Magic Link</span>
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FDF8F0] border border-[#E6D7BE] rounded-xl space-y-1">
                  <div className="font-semibold text-[#0F2A4A]">Magic Code Dispatched!</div>
                  <p className="text-[11px] text-slate-700">
                    A single-use verification code was transmitted to <strong className="text-[#0F1E36]">{magicEmail}</strong>.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[#0F1E36] font-semibold uppercase tracking-wider text-[10px] block">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    value={magicCode}
                    onChange={(e) => setMagicCode(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D4CFC4] rounded-lg text-[#0F1E36] text-center font-mono text-base tracking-widest focus:outline-none focus:border-[#0F2A4A]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyMagicCode}
                  className="w-full py-2.5 px-4 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Code & Open Workspace</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Security & Address Footer */}
        <div className="pt-3 border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
            <span>FIDO2 / AES-256 Encrypted Session</span>
          </div>
          <div>Sheridan, Wyoming · Scriptify Transcripts</div>
        </div>
      </div>
    </div>
  );
};
