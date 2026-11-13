import { ShieldCheck, Lock, Server, KeyRound, EyeOff, CheckCircle, FileText, ArrowRight } from 'lucide-react';
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
    <section id="security" className="py-24 bg-slate-950/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Military-Grade Cryptography & Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Built from the ground up for medical, legal, and financial secrecy.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Most transcription providers retain customer audio recordings for model training. At Scriptify Transcripts, enterprise contracts guarantee your proprietary voice data is never stored, indexed, or viewed by human annotators.
          </p>
        </div>

        {/* 2-Column Split: Interactive Cryptographic Architecture & Datacenter Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Architecture Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm font-bold text-white tracking-tight">{pillar.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Vault Datacenter Showcase */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={securityVaultImg}
                alt="Enterprise cryptographic datacenter corridor and security architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="p-6 bg-slate-950 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  Zero-Retention Ephemeral Pipeline Flow
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every transaction passes through a cryptographic cycle with instant post-execution RAM scrubbing:
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>1. In-browser AES-GCM 256-bit hash verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>2. Mutual TLS 1.3 encrypted transit directly to isolated compute</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>3. In-memory phoneme alignment with no disk writes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4. Cryptographic output delivery followed by automated memory wipe</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span>SOC 2 Type II Certified</span>
                  <span>·</span>
                  <span className="font-mono text-cyan-400">ISO 27001 Compliant</span>
                </div>

                {onOpenLegal && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenLegal('privacy')}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1"
                    >
                      <span>Read Privacy Charter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenLegal('confidentiality')}
                      className="text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
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
