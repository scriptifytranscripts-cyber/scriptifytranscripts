import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Play,
  Pause,
  ArrowRight,
  Lock,
  MapPin,
  Scale,
  Volume2,
  VolumeX,
  FileText,
  Briefcase,
  GraduationCap,
  RotateCcw
} from 'lucide-react';
import { formatTime } from '../utils/audioHelper';
import legalCourtroomBg from '../assets/images/legal_courtroom_deposition_1794485479232.jpg';
import legalDocketSample from '../assets/images/legal_trial_transcripts_1794485493654.jpg';

interface HeroProps {
  onOpenPortal: () => void;
  onSelectSample: (sampleId: string) => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPortal, onSelectSample, onOpenQuote }) => {
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(8.5);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSampleType, setActiveSampleType] = useState<'legal' | 'corporate' | 'clinical'>('legal');
  const duration = 135; // 2 minutes 15 seconds

  // Web Audio Context for authentic audible feedback when playing
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // 56 Amplitude bars accurately shaped to mirror the bidirectional waveform in image_ab8ea65a.png:
  // Starts modest, swells into first peak, dips in the middle, surges into high red crest, and tapers on the right.
  const waveformAmplitudes = [
    22, 38, 55, 68, 50, 32, 24, 42, 60, 72, 85, 65, 48, 38, 52, 70, 88, 96, 78, 62,
    45, 68, 82, 94, 98, 76, 58, 42, 60, 74, 86, 92, 84, 68, 54, 76, 92, 100, 88, 70,
    52, 72, 86, 94, 80, 64, 46, 34, 48, 62, 50, 36, 28, 20, 16, 12
  ];

  // Colors accurately mapping to image_ab8ea65a.png:
  // Left: Magenta / Purple (#d946ef) -> Center-left: Royal Blue (#3b82f6) -> Center-right: Vivid Red (#ef4444) -> Right: Dusky Slate (#64748b)
  const getBarColor = (index: number, total: number) => {
    const ratio = index / total;
    if (ratio < 0.22) {
      // Magenta / Violet spectrum
      return '#d946ef';
    } else if (ratio < 0.48) {
      // Royal Azure Blue spectrum
      return '#3b82f6';
    } else if (ratio < 0.76) {
      // Vivid Crimson Red spectrum
      return '#ef4444';
    } else {
      // Dusky Slate / Charcoal spectrum
      return '#64748b';
    }
  };

  // Sample dialogue options demonstrating multi-domain breadth (Legal, Corporate, Clinical)
  const samplesData = {
    legal: {
      title: 'State v. Apex Corp — Witness Deposition Exhibit 14-B',
      badge: 'Federal Rule 30(b)(6) Certified Format',
      dialogue: [
        {
          start: 0,
          end: 14,
          speaker: 'Counselor Harrison (Litigation Counsel)',
          text: 'Dr. Chen, referring to Exhibit 14-B in the trial record, please confirm whether you performed the diagnostic review personally on October 12th.',
        },
        {
          start: 14,
          end: 36,
          speaker: 'Witness (Dr. Elizabeth Chen)',
          text: 'Yes, Counselor. The pharmacological telemetry and patient vitals were examined under standard hospital protocol prior to the trial deposition.',
        },
        {
          start: 36,
          end: 55,
          speaker: 'Counselor Harrison (Litigation Counsel)',
          text: 'And to your professional recollection, did the telemetry logs show any secondary anomalies before the surgical intervention?',
        },
        {
          start: 55,
          end: 135,
          speaker: 'Witness (Dr. Elizabeth Chen)',
          text: 'None whatsoever. The baseline rhythms were verified and counter-signed by chief nursing staff.',
        },
      ]
    },
    corporate: {
      title: 'Vanguard Capital Advisory — Q3 Board Executive Briefing',
      badge: 'Bilateral NDA · SEC & GAAP Terminology',
      dialogue: [
        {
          start: 0,
          end: 18,
          speaker: 'Chief Financial Officer (Marcus Lind)',
          text: 'Operating margins expanded 240 basis points year-over-year, driven primarily by enterprise SaaS recurring revenues and streamlined vendor procurement.',
        },
        {
          start: 18,
          end: 42,
          speaker: 'Audit Committee Chair (Sarah Vance)',
          text: 'Let us confirm the debt covenants for the tranche closing next Tuesday. Are all credit facility conditions fully satisfied?',
        },
        {
          start: 42,
          end: 135,
          speaker: 'Chief Financial Officer (Marcus Lind)',
          text: 'Yes, Sarah. Wire verification and compliance attestations are scheduled for distribution tomorrow morning.',
        },
      ]
    },
    clinical: {
      title: 'Cardiology Pharmacology Trial — Multi-Physician Review',
      badge: 'HIPAA Safe Harbor · IRB Human-Subject Protocol',
      dialogue: [
        {
          start: 0,
          end: 20,
          speaker: 'Principal Investigator (Dr. Rebecca Aris)',
          text: 'In Cohort B, the antiarrhythmic compound demonstrated sustained therapeutic plasma concentration with zero adverse cardiac events observed in 90 days.',
        },
        {
          start: 20,
          end: 45,
          speaker: 'Clinical Pharmacologist (Dr. Miller)',
          text: 'The bioavailability profile aligns with Phase II modeling. We have forwarded the masked patient dockets for independent statistical audit.',
        },
        {
          start: 45,
          end: 135,
          speaker: 'Principal Investigator (Dr. Rebecca Aris)',
          text: 'Excellent. All 18 HIPAA Safe Harbor identifiers remain redacted under our active institutional Business Associate Agreement.',
        },
      ]
    }
  };

  const currentSample = samplesData[activeSampleType];
  const activeSegment =
    currentSample.dialogue.find((seg) => currentTime >= seg.start && currentTime < seg.end) ||
    currentSample.dialogue[0];

  // Play audio loop
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    setIsPlaying(true);

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (!isMuted && audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.012, audioCtxRef.current.currentTime);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
      }
    } catch {
      // AudioContext fallback
    }

    if (timerRef.current) clearInterval(timerRef.current);
    const stepMs = 100;
    timerRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + (stepMs / 1000) * playbackSpeed;
        if (next >= duration) {
          pauseAudio();
          return 0;
        }
        return next;
      });
    }, stepMs);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {}
      oscRef.current = null;
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.max(0, Math.min(newTime, duration)));
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    handleSeek(ratio * duration);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Authentic Legal Transcription Background - Clearly visible courtroom proceedings */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={legalCourtroomBg}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/legal-bg.jpg';
          }}
          alt="Legal courtroom deposition and transcription proceedings"
          className="w-full h-full object-cover object-center opacity-55 filter contrast-115 saturate-90"
        />
        {/* Directional scrim: darker on left for text legibility, transparent on center/right for courtroom visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* Ambient background glow matching the waveform gradient tones */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[320px] bg-rose-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Comprehensive Transcription Positioning & Distinct CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Accredited Legal, Corporate & Healthcare Audio Transcription</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.12] [text-wrap:balance]">
              Accurate. Certified. Verbatim.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Courtroom, corporate & clinical audio
              </span>{' '}
              at competitive rates.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-white font-semibold">Scriptify Transcripts</strong> delivers court-certified litigation depositions, corporate executive briefings, and medical research audio transcription with 99.8% verbatim accuracy, zero-retention security, and predictable per-minute rates starting at <span className="text-cyan-400 font-bold">$1.45/minute</span>.
            </p>

            {/* Distinctly Labeled Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-500/25 transition-all whitespace-nowrap cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Start Transcript Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSelectSample('legal');
                  onOpenPortal();
                }}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>Open Full Courtroom Editor</span>
              </button>
            </div>

            {/* Quiet Compliance & Location Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Bilateral NDA & In-Memory Purging</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Rule 30(b)(6) Formatting</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>30 N Gould St, Sheridan, WY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real Bidirectional Gradient Audio Waveform matching user's image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/95 shadow-2xl shadow-cyan-950/40">
              {/* Domain Sample Switcher (Legal / Corporate / Clinical) */}
              <div className="p-3.5 bg-slate-950 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-cyan-400 text-[11px] font-semibold uppercase tracking-wider">
                  Live Waveform Sample:
                </span>
                <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px]">
                  <button
                    onClick={() => setActiveSampleType('legal')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                      activeSampleType === 'legal'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>Legal</span>
                  </button>
                  <button
                    onClick={() => setActiveSampleType('corporate')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                      activeSampleType === 'corporate'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-3 h-3" />
                    <span>Corporate</span>
                  </button>
                  <button
                    onClick={() => setActiveSampleType('clinical')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                      activeSampleType === 'clinical'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-3 h-3" />
                    <span>Clinical</span>
                  </button>
                </div>
              </div>

              {/* Sample Header Info */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800/60 flex items-center justify-between text-xs">
                <div className="space-y-0.5 max-w-[260px] truncate">
                  <div className="text-white font-bold truncate text-[11px] sm:text-xs">
                    {currentSample.title}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono">
                    {currentSample.badge}
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold shrink-0">
                  99.8% Verbatim
                </div>
              </div>

              {/* The Real Bidirectional Gradient Audio Waveform Display matching user's image */}
              <div className="p-4 sm:p-5 space-y-4 bg-slate-950">
                {/* Waveform Canvas Container with soft ambient glow */}
                <div
                  onClick={handleWaveformClick}
                  className="relative h-28 sm:h-32 flex items-center justify-between gap-[2px] sm:gap-[3px] px-3.5 rounded-xl border border-slate-800 cursor-pointer overflow-hidden group transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(239, 68, 68, 0.08) 100%)',
                  }}
                  title="Click anywhere on the waveform to seek"
                >
                  {/* Subtle horizontal center line / zero baseline */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-800/50 pointer-events-none" />

                  {/* Symmetrical Dual-Sided Vertical Amplitude Bars with Exact Gradient Spectrum */}
                  {waveformAmplitudes.map((amp, idx) => {
                    const barTime = (idx / waveformAmplitudes.length) * duration;
                    const isPlayed = barTime <= currentTime;
                    const color = getBarColor(idx, waveformAmplitudes.length);

                    return (
                      <div
                        key={idx}
                        className="flex-1 rounded-full transition-all duration-100 flex items-center justify-center relative"
                        style={{
                          height: `${amp}%`,
                          backgroundColor: color,
                          opacity: isPlayed ? 1 : 0.45,
                          boxShadow: isPlayed ? `0 0 8px ${color}80` : 'none',
                          transform: isPlaying && isPlayed ? 'scaleY(1.08)' : 'scaleY(1)',
                        }}
                      />
                    );
                  })}

                  {/* Playhead Scrubber Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none transition-all duration-75"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 -ml-1 -mt-1 shadow-md ring-2 ring-white/50" />
                  </div>
                </div>

                {/* Audio Controls Bar */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                      title={isPlaying ? 'Pause audio' : 'Play audio waveform'}
                      aria-label="Play or pause audio playback"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleSeek(0)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                      title="Rewind to beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-xs font-mono text-slate-300 tabular-nums">
                      <span className="text-cyan-400 font-semibold">{formatTime(currentTime)}</span>
                      <span className="text-slate-600 mx-1">/</span>
                      <span className="text-slate-400">{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Playback Speed selector */}
                    <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[10px] font-mono">
                      {([1, 1.5, 2] as const).map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-cyan-400 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Synchronized Dialogue Snippet matching active timecode */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 transition-all">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-300 font-bold font-sans flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      {activeSegment.speaker}
                    </span>
                    <span className="text-slate-400 tabular-nums">
                      {formatTime(activeSegment.start)} - {formatTime(activeSegment.end)}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans text-xs italic">
                    "{activeSegment.text}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Metric Strip with Realistic Competitive Pricing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-800/80 mt-12">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">99.8%</div>
            <div className="text-xs text-slate-300 font-medium">Court-Grade & Enterprise Accuracy</div>
            <div className="text-[11px] text-slate-400">Rule 30(b)(6) line-number certified</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">$1.45/min</div>
            <div className="text-xs text-slate-300 font-medium">Competitive US Market Pricing</div>
            <div className="text-[11px] text-slate-400">Predictable per-minute billing</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">12h Rush</div>
            <div className="text-xs text-slate-300 font-medium">Expedited Turnaround Options</div>
            <div className="text-[11px] text-slate-400">Standard 48h, Next-Day 24h & Same-Day</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">AES-256</div>
            <div className="text-xs text-slate-300 font-medium">Zero-Retention Privacy Charter</div>
            <div className="text-[11px] text-slate-400">RAM-only buffer & Bilateral NDA</div>
          </div>
        </div>
      </div>
    </section>
  );
};
