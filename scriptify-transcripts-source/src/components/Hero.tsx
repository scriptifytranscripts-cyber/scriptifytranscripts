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

interface HeroProps {
  onOpenPortal: () => void;
  onSelectSample: (sampleId: string) => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPortal, onSelectSample }) => {
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

  // 56 Amplitude bars mirroring the bidirectional waveform shape
  const waveformAmplitudes = [
    22, 38, 55, 68, 50, 32, 24, 42, 60, 72, 85, 65, 48, 38, 52, 70, 88, 96, 78, 62,
    45, 68, 82, 94, 98, 76, 58, 42, 60, 74, 86, 92, 84, 68, 54, 76, 92, 100, 88, 70,
    52, 72, 86, 94, 80, 64, 46, 34, 48, 62, 50, 36, 28, 20, 16, 12
  ];

  // Editorial multi-hue spectrum calibrated cleanly for archival light canvas
  const getBarColor = (index: number, total: number) => {
    const ratio = index / total;
    if (ratio < 0.22) {
      return '#9333ea'; // Royal Plum / Magenta
    } else if (ratio < 0.48) {
      return '#1d4ed8'; // Judicial Cobalt Blue
    } else if (ratio < 0.76) {
      return '#dc2626'; // Docket Crimson
    } else {
      return '#64748b'; // Archival Slate
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
          text: 'Operating margins expanded 240 basis points year-over-year, driven primarily by enterprise recurring revenues and streamlined vendor procurement.',
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
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-[#FAF8F4] border-b border-[#E2DED5]">
      {/* Authentic Legal Courtroom Background with Calibrated Parchment Scrim */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={legalCourtroomBg}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/legal-bg.jpg';
          }}
          alt="Legal courtroom deposition and transcription proceedings"
          className="w-full h-full object-cover object-center opacity-45 filter saturate-85 contrast-105"
        />
        {/* Calibrated Warm Parchment Directional Scrim: keeps left copy crisp while revealing courtroom scene on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/88 to-[#FAF8F4]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4] via-transparent to-[#FAF8F4]/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Authoritative Legal Positioning & Clean Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9A6B2F] tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#0F2A4A] shrink-0" />
              <span>Court-Certified Legal, Corporate & Clinical Audio Transcription</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0F1E36] tracking-tight leading-[1.12] [text-wrap:balance]">
              Accurate. Certified. Verbatim.{' '}
              <span className="text-[#0F2A4A] italic">
                Courtroom, corporate & clinical records
              </span>{' '}
              at competitive rates.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl">
              <strong className="text-[#0F1E36] font-semibold">Scriptify Transcripts</strong> prepares court-certified litigation depositions, boardroom executive briefings, and medical research audio transcripts with 99.8% verbatim fidelity, zero-retention confidentiality, and predictable billing starting at{' '}
              <span className="text-[#0F2A4A] font-bold tabular-nums">$1.45/minute</span>.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0F2A4A] rounded-lg hover:bg-[#173B66] transition-colors shadow-sm cursor-pointer w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Start Transcript Order</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => {
                  onSelectSample('legal');
                  onOpenPortal();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0F2A4A] bg-white border border-[#D4CFC4] rounded-lg hover:border-[#0F2A4A] hover:bg-[#FAF8F4] transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
              >
                <Scale className="w-4 h-4 text-[#9A6B2F] shrink-0" />
                <span>Open Courtroom Editor</span>
              </button>
            </div>

            {/* Quiet Unboxed Compliance Metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Bilateral NDA & In-Memory Purging</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>Rule 30(b)(6) Formatting</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#9A6B2F]" />
                <span>30 N Gould St, Sheridan, WY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bidirectional Gradient Audio Exhibit Console on Crisp Paper Sheet */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#D4CFC4] bg-white shadow-xl">
              {/* Domain Sample Switcher */}
              <div className="px-4 py-3 bg-[#F2EFE9] border-b border-[#E2DED5] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#0F1E36] text-xs font-semibold">
                  Certified Audio Exhibit
                </span>
                <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-[#D4CFC4] text-[11px]">
                  <button
                    onClick={() => setActiveSampleType('legal')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 font-medium ${
                      activeSampleType === 'legal'
                        ? 'bg-[#0F2A4A] text-white'
                        : 'text-slate-600 hover:text-[#0F2A4A]'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>Legal</span>
                  </button>
                  <button
                    onClick={() => setActiveSampleType('corporate')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 font-medium ${
                      activeSampleType === 'corporate'
                        ? 'bg-[#0F2A4A] text-white'
                        : 'text-slate-600 hover:text-[#0F2A4A]'
                    }`}
                  >
                    <Briefcase className="w-3 h-3" />
                    <span>Corporate</span>
                  </button>
                  <button
                    onClick={() => setActiveSampleType('clinical')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 font-medium ${
                      activeSampleType === 'clinical'
                        ? 'bg-[#0F2A4A] text-white'
                        : 'text-slate-600 hover:text-[#0F2A4A]'
                    }`}
                  >
                    <GraduationCap className="w-3 h-3" />
                    <span>Clinical</span>
                  </button>
                </div>
              </div>

              {/* Exhibit Header Info */}
              <div className="px-4 py-3 bg-white border-b border-[#E2DED5] flex items-center justify-between text-xs gap-2">
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-[#0F1E36] font-bold truncate text-xs">
                    {currentSample.title}
                  </div>
                  <div className="text-[11px] text-[#9A6B2F] font-medium truncate">
                    {currentSample.badge}
                  </div>
                </div>
                <span className="text-emerald-800 font-mono text-[11px] font-semibold shrink-0 tabular-nums">
                  99.8% Verbatim
                </span>
              </div>

              {/* Bidirectional Gradient Audio Waveform Display */}
              <div className="p-4 sm:p-5 space-y-4 bg-white">
                <div
                  onClick={handleWaveformClick}
                  className="relative h-28 sm:h-32 flex items-center justify-between gap-[2px] sm:gap-[3px] px-3.5 rounded-lg border border-[#E2DED5] bg-[#FAF8F4] cursor-pointer overflow-hidden group transition-colors hover:border-[#0F2A4A]/40"
                  title="Click anywhere on the waveform to seek"
                >
                  {/* Horizontal zero-crossing baseline */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#D4CFC4] pointer-events-none" />

                  {/* Symmetrical Dual-Sided Vertical Amplitude Bars */}
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
                          opacity: isPlayed ? 0.95 : 0.35,
                          transform: isPlaying && isPlayed ? 'scaleY(1.06)' : 'scaleY(1)',
                        }}
                      />
                    );
                  })}

                  {/* Playhead Scrubber Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#0F1E36] pointer-events-none transition-all duration-75"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0F2A4A] -ml-1 -mt-0.5 ring-2 ring-white shadow-sm" />
                  </div>
                </div>

                {/* Audio Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-lg bg-[#0F2A4A] hover:bg-[#173B66] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
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
                      className="p-1.5 text-slate-500 hover:text-[#0F2A4A] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer"
                      title="Rewind to beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-xs font-mono text-slate-600 tabular-nums">
                      <span className="text-[#0F2A4A] font-semibold">{formatTime(currentTime)}</span>
                      <span className="text-slate-400 mx-1">/</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Playback Speed selector */}
                    <div className="flex bg-[#F2EFE9] rounded-lg p-0.5 border border-[#E2DED5] text-[10px] font-mono">
                      {([1, 1.5, 2] as const).map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                            playbackSpeed === spd
                              ? 'bg-[#0F2A4A] text-white font-bold'
                              : 'text-slate-600 hover:text-[#0F2A4A]'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 text-slate-500 hover:text-[#0F2A4A] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-700" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Synchronized Dialogue Transcript Box */}
                <div className="p-3.5 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#0F2A4A] font-bold">
                      {activeSegment.speaker}
                    </span>
                    <span className="text-slate-500 font-mono tabular-nums">
                      {formatTime(activeSegment.start)} - {formatTime(activeSegment.end)}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs italic font-serif">
                    "{activeSegment.text}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#E2DED5] mt-14">
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2A4A] tabular-nums">99.8%</div>
            <div className="text-xs text-[#0F1E36] font-semibold">Court-Grade & Enterprise Accuracy</div>
            <div className="text-[11px] text-slate-600">Rule 30(b)(6) line-number certified</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36] tabular-nums">$1.45/min</div>
            <div className="text-xs text-[#0F1E36] font-semibold">Competitive Market Pricing</div>
            <div className="text-[11px] text-slate-600">Predictable per-minute billing</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36] tabular-nums">12h Rush</div>
            <div className="text-xs text-[#0F1E36] font-semibold">Expedited Turnaround Options</div>
            <div className="text-[11px] text-slate-600">Standard 48h, Next-Day 24h & Same-Day</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800 tabular-nums">AES-256</div>
            <div className="text-xs text-[#0F1E36] font-semibold">Zero-Retention Privacy Charter</div>
            <div className="text-[11px] text-slate-600">RAM-only buffer & Bilateral NDA</div>
          </div>
        </div>
      </div>
    </section>
  );
};
