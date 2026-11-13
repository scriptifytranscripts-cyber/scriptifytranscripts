import React from 'react';
import { ShieldCheck, Lock, Server, KeyRound, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import securityVaultImg from '../assets/images/security_vault_datacenter_1794310482794.jpg';

interface SecurityComplianceProps {
  onOpenLegal?: (type: 'privacy' | 'terms' | 'confidentiality' | 'invoicing') => void;
}

export const SecurityCompliance: React.FC<SecurityComplianceProps> = ({ onOpenLegal }) => {
  const securityPillars = [
    {
      icon: KeyRound,
      title: 'Client-Side AES-256 Encryption',
      desc: 'Audio files can be encrypted locally in your browser before packets leave your machine. Only ephemeral worker processes with single-use session tokens hold decryption keys.',
    },
    {
      icon: EyeOff,
      title: 'Guaranteed Zero Data Retention',
      desc: 'We never store your raw audio, transcripts, or diarized segments on persistent disks. Audio buffers are flushed from volatile memory the millisecond transcription finishes.',
    },
    {
      icon: ShieldCheck,
      title: 'HIPAA BAA Ready for Healthcare',
      desc: 'Executed Business Associate Agreements (BAA) with automated redaction of 18 HIPAA Safe Harbor identifiers (patient names, dates, MRNs, phone numbers).',
    },
    {
      icon: Server,
      title: 'SOC 2 Type II Audited Infrastructure',
      desc: 'Hosted in dedicated isolated tenant VPCs with TLS 1.3 transport, strict least-privilege IAM roles, continuous pen-testing, and real-time SIEM audit logging.',
    },
  ];

  return (
    <section id="security" className="py-20 bg-[#F2EFE9]/60 border-t border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-[#0F2A4A]" />
            <span>Cryptographic Security & Legal Privilege</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1E36] tracking-tight leading-tight">
            Built from the ground up for legal, medical, and corporate secrecy.
          </h2>
          <p className="text-slate-700 text-base leading-relaxed">
            Most transcription providers retain customer audio recordings for model training. At Scriptify Transcripts, enterprise contracts guarantee your proprietary voice data is never stored, indexed, or reused.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Architecture Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A]/50 transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm font-bold text-[#0F1E36] tracking-tight">{pillar.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Vault Datacenter Showcase */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#D4CFC4] bg-white shadow-sm flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={securityVaultImg}
                alt="Enterprise cryptographic datacenter corridor and security architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A4A]/70 via-transparent to-transparent" />
            </div>

            <div className="p-6 bg-white flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-serif text-base font-bold text-[#0F1E36] mb-1.5">
                  Zero-Retention Ephemeral Pipeline Flow
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every transaction passes through an isolated cryptographic cycle with immediate RAM scrubbing:
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0F2A4A] shrink-0" />
                  <span>1. In-browser AES-GCM 256-bit hash verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0F2A4A] shrink-0" />
                  <span>2. Mutual TLS 1.3 encrypted transit directly to isolated compute</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0F2A4A] shrink-0" />
                  <span>3. In-memory phoneme alignment with zero persistent disk writes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>4. Certified transcript delivery followed by automated memory wipe</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2DED5] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="font-medium">SOC 2 Type II Certified</span>
                  <span>·</span>
                  <span className="font-mono text-[#0F2A4A] font-semibold">ISO 27001 Compliant</span>
                </div>

                {onOpenLegal && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenLegal('privacy')}
                      className="text-xs font-semibold text-[#0F2A4A] hover:text-[#9A6B2F] cursor-pointer flex items-center gap-1"
                    >
                      <span>Read Privacy Charter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenLegal('confidentiality')}
                      className="text-xs font-semibold text-slate-600 hover:text-[#0F2A4A] cursor-pointer"
                    >
                      Bilateral NDA
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
