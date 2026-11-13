import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Mic,
  Square,
  ShieldCheck,
  Lock,
  Sliders,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Play,
  Building2,
  UserCheck,
  FileText,
  Download,
  Scale,
  FolderLock,
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { TranscriptionResult, TranscriptionOptions, ClientUser, ClientMatterRecord } from '../types';
import { AudioWaveformPlayer } from './AudioWaveformPlayer';
import { TranscriptEditor } from './TranscriptEditor';
import { IntelligenceSummary } from './IntelligenceSummary';
import { SyntheticAudioPlayer } from '../utils/audioHelper';

interface DashboardProps {
  initialSampleId?: string | null;
  currentUser?: ClientUser | null;
  onRequireAuth?: (reason?: string) => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'confidentiality' | 'invoicing') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  initialSampleId,
  currentUser,
  onRequireAuth,
  onOpenLegal,
}) => {
  // Active sub-tab in dashboard: 'ingest' or 'archive'
  const [activeTab, setActiveTab] = useState<'ingest' | 'archive'>('ingest');

  // Processing & result state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Audio Playback state
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(0.8);
  const audioPlayerRef = useRef<SyntheticAudioPlayer | null>(null);

  // Ingestion settings
  const [options, setOptions] = useState<TranscriptionOptions>({
    diarization: true,
    summary: true,
    redactPii: false,
    domain: 'general',
    language: 'en',
    clientEncryption: true,
  });

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordIntervalRef = useRef<number | null>(null);

  // File drag & drop
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data quick options
  const sampleOptions = [
    {
      id: 'legal',
      title: 'Pre-Trial Deposition Witness',
      category: 'Legal & Courtroom',
      duration: '02:15',
      speakers: '2 Speakers',
      domain: 'legal' as const,
    },
    {
      id: 'earnings',
      title: 'Q3 Financial Earnings Briefing',
      category: 'Corporate Finance',
      duration: '02:22',
      speakers: '2 Speakers',
      domain: 'finance' as const,
    },
    {
      id: 'clinical',
      title: 'Clinical Cardiology Review',
      category: 'Healthcare & HIPAA',
      duration: '01:58',
      speakers: '2 Speakers',
      domain: 'medical' as const,
    },
  ];

  // Sample client matter records for authenticated firms
  const sampleClientMatters: ClientMatterRecord[] = [
    {
      id: 'mat-01',
      title: 'Deposition of Dr. Nathan Drake (Direct & Cross Examination)',
      matterNumber: currentUser?.matterRef || 'Matter #2026-CV-891',
      date: 'Nov 08, 2026',
      durationMins: 135,
      domain: 'legal',
      status: 'Certified Delivered',
      ratePerMin: 1.45,
      totalCost: 195.75,
      accuracy: '99.9% Verbatim',
    },
    {
      id: 'mat-02',
      title: 'Hearing on Motion for Summary Judgment (Audio Excerpt)',
      matterNumber: 'Matter #2026-CV-844',
      date: 'Nov 02, 2026',
      durationMins: 88,
      domain: 'legal',
      status: 'Certified Delivered',
      ratePerMin: 1.45,
      totalCost: 127.60,
      accuracy: '99.8% Verbatim',
    },
    {
      id: 'mat-03',
      title: 'Investigative Deposition Transcript (Rule 30(b)(6))',
      matterNumber: 'Matter #2026-CV-799',
      date: 'Oct 24, 2026',
      durationMins: 62,
      domain: 'legal',
      status: 'Certified Delivered',
      ratePerMin: 1.45,
      totalCost: 89.90,
      accuracy: '99.9% Verbatim',
    },
  ];

  // Auto trigger sample if passed
  useEffect(() => {
    if (initialSampleId) {
      handleTranscribeSample(initialSampleId);
    }
  }, [initialSampleId]);

  // Cleanup audio player on unmount
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.destroy();
      }
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
    };
  }, []);

  // Setup Audio Player instance when result changes
  useEffect(() => {
    if (result) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.destroy();
      }
      const player = new SyntheticAudioPlayer(result.durationSec);
      player.onTimeUpdate((time) => setCurrentTime(time));
      player.onEnd(() => setIsPlaying(false));
      audioPlayerRef.current = player;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [result]);

  const handlePlayPause = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play(currentTime);
      setIsPlaying(true);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seek(time);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
  };

  // Transcribe pre-loaded sample
  const handleTranscribeSample = async (sampleId: string) => {
    setIsProcessing(true);
    setError(null);
    setProcessingStep('Generating client cryptographic token...');

    try {
      setTimeout(() => setProcessingStep('Streaming to zero-retention transcription engine...'), 600);
      setTimeout(() => setProcessingStep('Detecting speakers & phoneme alignment...'), 1200);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sampleId,
          options,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to process audio');
      }

      setResult(data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during transcription');
    } finally {
      setIsProcessing(false);
    }
  };

  // Upload custom user file
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate size (max 50MB for in-memory browser upload)
    if (file.size > 50 * 1024 * 1024) {
      setError('File exceeds 50MB browser upload limit for live demo. Please test with a smaller file.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessingStep('Applying client-side AES-256 pre-encryption hash...');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Audio = reader.result as string;
          setProcessingStep('Streaming to secure backend API...');

          const response = await fetch('/api/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64Audio,
              mimeType: file.type || 'audio/mp3',
              audioName: file.name,
              options,
            }),
          });

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.error || 'Failed to transcribe file');
          }

          setResult(data.data);
        } catch (err: any) {
          setError(err.message || 'Error communicating with transcription service');
        } finally {
          setIsProcessing(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError('Failed to read file from local disk');
      setIsProcessing(false);
    }
  };

  // Check upload click: if not signed in, inform client or allow demo
  const handleInitiateUpload = () => {
    if (!currentUser && onRequireAuth) {
      onRequireAuth(
        'Client Account Recommended: Sign in or register your organization to bind uploads to your Case Docket Number and execute our Wyoming Bilateral NDA.'
      );
      // Still open the file picker so they are not blocked if testing
      fileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  // Start Voice Recording
  const startRecording = async () => {
    setError(null);
    if (!currentUser && onRequireAuth) {
      onRequireAuth(
        'Voice Recording Gate: Connect your client profile to record live depositions under certified attorney-client privilege.'
      );
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const file = new File([audioBlob], `courtroom_dictation_${Date.now()}.webm`, {
          type: 'audio/webm',
        });
        handleFileUpload(file);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setError('Microphone access was denied or is not supported in this browser.');
    }
  };

  // Stop Voice Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
    }
  };

  // Inline Segment Update
  const handleUpdateSegment = (segmentId: string, newText: string) => {
    if (!result) return;
    setResult({
      ...result,
      segments: result.segments.map((s) => (s.id === segmentId ? { ...s, text: newText } : s)),
    });
  };

  // Rename Speaker across transcript
  const handleRenameSpeaker = (oldName: string, newName: string) => {
    if (!result) return;
    setResult({
      ...result,
      segments: result.segments.map((s) =>
        s.speaker === oldName ? { ...s, speaker: newName } : s
      ),
    });
  };

  // Purge memory
  const handlePurge = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.destroy();
    }
    setResult(null);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Client Authentication & Organization Status Bar */}
      {currentUser ? (
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2DED5] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#FAF8F4] border border-[#E2DED5] text-[#0F2A4A] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#0F1E36] font-bold text-sm sm:text-base">
                  {currentUser.organization}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Authenticated Client
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                <span>Contact: <strong className="text-[#0F1E36]">{currentUser.name}</strong></span>
                <span className="text-[#D4CFC4]">·</span>
                <span className="font-mono text-[#0F2A4A] font-medium">{currentUser.matterRef || 'Matter #2026-CV-891'}</span>
                <span className="text-[#D4CFC4]">·</span>
                <span className="text-emerald-800 font-medium">{currentUser.ndaSignedDate || 'Active Bilateral NDA'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('ingest')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex-1 sm:flex-initial ${
                activeTab === 'ingest'
                  ? 'bg-[#0F2A4A] text-white shadow-sm'
                  : 'bg-[#FAF8F4] text-slate-700 hover:text-[#0F1E36] border border-[#D4CFC4]'
              }`}
            >
              Ingest Deposition
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-1.5 ${
                activeTab === 'archive'
                  ? 'bg-[#0F2A4A] text-white shadow-sm'
                  : 'bg-[#FAF8F4] text-slate-700 hover:text-[#0F1E36] border border-[#D4CFC4]'
              }`}
            >
              <FolderLock className="w-3.5 h-3.5" />
              <span>Case Dockets (3)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unauthenticated Security Gate Banner */
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2DED5] border-l-4 border-l-[#0F2A4A] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FDF8F0] border border-[#E6D7BE] text-[#9A6B2F] flex items-center justify-center shrink-0 mt-1 sm:mt-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#0F1E36] font-bold text-sm">
                  Enterprise Client Gate & Chain of Custody
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#F2EFE9] border border-[#D4CFC4] text-[#0F2A4A] font-mono font-semibold">
                  Sandbox Active
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                For proprietary legal depositions, HIPAA patient audio, and corporate board recordings, sign in to bind transcripts to your Case Docket Number, issue Net-30 corporate invoices, and execute our Wyoming Bilateral NDA.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            {onRequireAuth && (
              <button
                onClick={() =>
                  onRequireAuth('Sign in or register to access verified client dockets and bilateral NDA protection.')
                }
                className="px-4 py-2.5 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              >
                Sign In / Register Firm
              </button>
            )}
          </div>
        </div>
      )}

      {/* If Authenticated and viewing Matter Archives */}
      {activeTab === 'archive' && currentUser ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2DED5] pb-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1E36] tracking-tight">
                Active Case Matters & Certified Deliverables
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                All records formatted to Rule 30(b)(6) line-number standards with signed reporter attestations.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('ingest')}
              className="px-3.5 py-2 text-xs font-semibold text-[#0F2A4A] bg-white border border-[#D4CFC4] rounded-lg hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            >
              + Ingest New Audio
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sampleClientMatters.map((matter) => (
              <div
                key={matter.id}
                className="p-5 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A]/40 transition-all shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#0F2A4A] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D4CFC4]">
                      {matter.matterNumber}
                    </span>
                    <span className="text-[11px] text-slate-500">{matter.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      {matter.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0F1E36]">{matter.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span>Duration: <strong className="text-[#0F1E36]">{matter.durationMins} Mins</strong></span>
                    <span className="text-[#D4CFC4]">·</span>
                    <span>Rate: <strong className="text-[#0F2A4A] font-mono">${matter.ratePerMin.toFixed(2)}/min</strong></span>
                    <span className="text-[#D4CFC4]">·</span>
                    <span>Invoice Total: <strong className="text-[#0F1E36] font-mono">${matter.totalCost.toFixed(2)}</strong> (Net-30)</span>
                    <span className="text-[#D4CFC4]">·</span>
                    <span className="text-emerald-800 font-semibold">{matter.accuracy}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
                  <button
                    onClick={() => {
                      handleTranscribeSample('legal');
                      setActiveTab('ingest');
                    }}
                    className="px-3 py-2 text-xs font-semibold text-[#0F1E36] bg-[#FAF8F4] hover:bg-[#F2EFE9] rounded-lg border border-[#D4CFC4] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0F2A4A]" />
                    <span>View Transcript</span>
                  </button>

                  <a
                    href="/downloads/Scriptify_Transcripts_Official_Letterhead.docx"
                    download
                    className="px-3 py-2 text-xs font-semibold text-[#0F1E36] bg-[#FAF8F4] hover:bg-[#F2EFE9] rounded-lg border border-[#D4CFC4] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Certified .DOCX</span>
                  </a>

                  {onOpenLegal && (
                    <button
                      onClick={() => onOpenLegal('confidentiality')}
                      className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#0F1E36] bg-white hover:bg-[#FAF8F4] rounded-lg border border-[#E2DED5] transition-colors cursor-pointer"
                      title="View Certificate of Certified Destruction"
                    >
                      Certificate of Destruction
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Regular Audio Ingestion & Result Console */
        <>
          {/* Dashboard Ingestion Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DED5] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#9A6B2F] uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Scriptify Transcripts · Encrypted Client Ingestion</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36] tracking-tight">
                Upload & Ingestion Console
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                End-to-end encrypted audio processing with zero-retention ephemeral memory buffers.
              </p>
            </div>

            {result && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePurge}
                  className="px-3.5 py-2 text-xs font-semibold text-[#0F1E36] bg-white border border-[#D4CFC4] rounded-lg hover:bg-[#FAF8F4] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#0F2A4A]" />
                  <span>Process New Audio</span>
                </button>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-sm text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">Notice:</span> {error}
              </div>
            </div>
          )}

          {/* Main Viewport: If no transcript, show Upload & Samples. If transcript exists, show Player + Editor + Intelligence */}
          {!result ? (
            <div className="space-y-8">
              {/* Ingestion & Privacy Directives Bar */}
              <div className="bg-white border border-[#E2DED5] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2DED5] pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#0F2A4A]" />
                    <span className="text-xs font-semibold text-[#0F1E36] uppercase tracking-wider">
                      Ingestion & Privacy Directives
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Zero-Retention Enforced</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  {/* Diarization Toggle */}
                  <label className="flex items-center justify-between p-3 bg-[#FAF8F4] border border-[#E2DED5] rounded-lg cursor-pointer hover:border-[#0F2A4A]/40 transition-colors">
                    <div>
                      <span className="font-semibold text-[#0F1E36] block">Speaker Diarization</span>
                      <span className="text-slate-600 text-[11px]">Separate multiple voices</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.diarization}
                      onChange={(e) => setOptions({ ...options, diarization: e.target.checked })}
                      className="w-4 h-4 accent-[#0F2A4A] cursor-pointer"
                    />
                  </label>

                  {/* PII Redaction Toggle */}
                  <label className="flex items-center justify-between p-3 bg-[#FAF8F4] border border-[#E2DED5] rounded-lg cursor-pointer hover:border-[#0F2A4A]/40 transition-colors">
                    <div>
                      <span className="font-semibold text-[#0F1E36] block">PII & HIPAA Masking</span>
                      <span className="text-slate-600 text-[11px]">Redact names, SSN & cards</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.redactPii}
                      onChange={(e) => setOptions({ ...options, redactPii: e.target.checked })}
                      className="w-4 h-4 accent-[#0F2A4A] cursor-pointer"
                    />
                  </label>

                  {/* Domain Profile Selector */}
                  <div className="p-3 bg-[#FAF8F4] border border-[#E2DED5] rounded-lg">
                    <span className="font-semibold text-[#0F1E36] block mb-1">Domain Lexicon</span>
                    <select
                      value={options.domain}
                      onChange={(e) => setOptions({ ...options, domain: e.target.value as any })}
                      className="w-full bg-white border border-[#D4CFC4] rounded px-2 py-1 text-[#0F1E36] text-xs font-medium focus:outline-none focus:border-[#0F2A4A]"
                    >
                      <option value="general">Standard Business</option>
                      <option value="finance">Finance & Capital Markets</option>
                      <option value="medical">Medical & Clinical (EHR)</option>
                      <option value="legal">Legal & Courtroom</option>
                    </select>
                  </div>

                  {/* Client Pre-Encryption */}
                  <label className="flex items-center justify-between p-3 bg-[#FAF8F4] border border-[#E2DED5] rounded-lg cursor-pointer hover:border-[#0F2A4A]/40 transition-colors">
                    <div>
                      <span className="font-semibold text-[#0F1E36] block">Client AES-256 Hash</span>
                      <span className="text-slate-600 text-[11px]">Pre-transit file sealing</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.clientEncryption}
                      onChange={(e) => setOptions({ ...options, clientEncryption: e.target.checked })}
                      className="w-4 h-4 accent-[#0F2A4A] cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Upload Zone & Mic Recorder */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Drag-Drop Upload Card */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`lg:col-span-8 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all bg-white shadow-sm ${
                    isDragging
                      ? 'border-[#0F2A4A] bg-[#F2EFE9]/60'
                      : 'border-[#D4CFC4] hover:border-[#0F2A4A]/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,.mp3,.wav,.m4a,.flac,.webm,.ogg,.aac"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="w-16 h-16 rounded-xl bg-[#FAF8F4] border border-[#E2DED5] flex items-center justify-center mb-4 text-[#0F2A4A]">
                    <UploadCloud className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#0F1E36] mb-2">
                    Drop your audio file here or browse
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mb-6 leading-relaxed">
                    Accepts MP3, WAV, M4A, FLAC, WEBM, and OGG. Ingested under client-side encrypted tunnel with guaranteed zero persistence.
                  </p>

                  <button
                    disabled={isProcessing}
                    onClick={handleInitiateUpload}
                    className="px-6 py-3 text-xs font-semibold text-white bg-[#0F2A4A] rounded-lg hover:bg-[#173B66] transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    Select Deposition File (.mp3, .wav, .m4a)
                  </button>
                </div>

                {/* Live Microphone Recording Card */}
                <div className="lg:col-span-4 bg-white border border-[#E2DED5] rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0F1E36]">Courtroom Voice Dictation</span>
                      {isRecording && (
                        <span className="flex items-center gap-1.5 text-rose-700 font-mono font-semibold">
                          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                          REC
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Capture audio directly using your device microphone for instant verbatim transcription and intelligence extraction.
                    </p>
                  </div>

                  {/* Active record timer & action */}
                  <div className="my-6 text-center space-y-4">
                    <div className="text-3xl font-mono font-bold text-[#0F1E36] tabular-nums">
                      {Math.floor(recordingSeconds / 60)
                        .toString()
                        .padStart(2, '0')}
                      :
                      {(recordingSeconds % 60).toString().padStart(2, '0')}
                    </div>

                    {isRecording ? (
                      <button
                        onClick={stopRecording}
                        className="w-full py-3 px-4 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Square className="w-4 h-4 fill-white" />
                        <span>Stop Recording & Transcribe</span>
                      </button>
                    ) : (
                      <button
                        disabled={isProcessing}
                        onClick={startRecording}
                        className="w-full py-3 px-4 bg-[#FAF8F4] hover:bg-[#F2EFE9] border border-[#D4CFC4] text-[#0F1E36] font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Mic className="w-4 h-4 text-[#0F2A4A]" />
                        <span>Start Deposition Dictation</span>
                      </button>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 justify-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>In-memory recording only · Not stored</span>
                  </div>
                </div>
              </div>

              {/* Preloaded Sample Audio Demos */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-[#0F1E36] uppercase tracking-wider">
                    Or Test with Courtroom & Enterprise Presets:
                  </div>
                  <span className="text-xs font-medium text-[#9A6B2F]">Zero audio download needed</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleOptions.map((sample) => (
                    <button
                      key={sample.id}
                      disabled={isProcessing}
                      onClick={() => handleTranscribeSample(sample.id)}
                      className="p-5 rounded-xl bg-white border border-[#E2DED5] hover:border-[#0F2A4A] hover:shadow-md transition-all text-left space-y-3 cursor-pointer group disabled:opacity-50 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#9A6B2F] font-semibold uppercase">
                          {sample.category}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#FAF8F4] border border-[#E2DED5] group-hover:bg-[#0F2A4A] group-hover:text-white group-hover:border-[#0F2A4A] text-[#0F2A4A] flex items-center justify-center transition-colors">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>

                      <div className="font-bold text-[#0F1E36] text-sm group-hover:text-[#0F2A4A] transition-colors">
                        {sample.title}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-[#E2DED5]">
                        <span>{sample.duration}</span>
                        <span>·</span>
                        <span>{sample.speakers}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Processing Loader Indicator */}
              {isProcessing && (
                <div className="p-8 rounded-xl bg-white border border-[#0F2A4A]/30 text-center space-y-4 shadow-md">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0F2A4A] border-t-transparent animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-[#0F1E36]">
                      Processing Encrypted Audio File...
                    </h4>
                    <p className="text-xs text-[#0F2A4A] font-mono font-medium">{processingStep}</p>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    RAM-only memory buffers active. All data purged on session closure.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Transcript Result View: Waveform Player + Segment Editor + Intelligence */
            <div className="space-y-8">
              {/* Waveform Player */}
              <AudioWaveformPlayer
                duration={result.durationSec}
                currentTime={currentTime}
                isPlaying={isPlaying}
                playbackRate={playbackRate}
                volume={volume}
                onPlayPause={handlePlayPause}
                onSeek={handleSeek}
                onRateChange={handleRateChange}
                onVolumeChange={handleVolumeChange}
                audioName={result.audioName}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Cols: Transcript Editor */}
                <div className="lg:col-span-7">
                  <TranscriptEditor
                    segments={result.segments}
                    currentTime={currentTime}
                    onSeek={handleSeek}
                    onUpdateSegment={handleUpdateSegment}
                    onRenameSpeaker={handleRenameSpeaker}
                  />
                </div>

                {/* Right 5 Cols: Intelligence Summary */}
                <div className="lg:col-span-5">
                  <IntelligenceSummary result={result} onPurge={handlePurge} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
