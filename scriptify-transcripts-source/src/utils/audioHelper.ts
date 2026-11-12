import { Segment, TranscriptionResult } from '../types';

/**
 * Format seconds into MM:SS or HH:MM:SS
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format seconds to SRT timestamp format: 00:00:00,000
 */
function toSrtTimestamp(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

/**
 * Generate SRT subtitle content
 */
export function generateSRT(segments: Segment[]): string {
  return segments
    .map((seg, idx) => {
      const num = idx + 1;
      const start = toSrtTimestamp(seg.start);
      const end = toSrtTimestamp(seg.end);
      return `${num}\n${start} --> ${end}\n${seg.speaker}: ${seg.text}\n`;
    })
    .join('\n');
}

/**
 * Generate WebVTT content
 */
export function generateVTT(segments: Segment[]): string {
  const body = segments
    .map((seg) => {
      const start = toSrtTimestamp(seg.start).replace(',', '.');
      const end = toSrtTimestamp(seg.end).replace(',', '.');
      return `${start} --> ${end}\n<v ${seg.speaker}>${seg.text}`;
    })
    .join('\n\n');
  return `WEBVTT\n\n${body}`;
}

/**
 * Generate plain text transcript with timestamps
 */
export function generatePlainText(result: TranscriptionResult): string {
  const header = `SCRIPTIFY TRANSCRIPTS - CERTIFIED TRANSCRIPT
File Name: ${result.audioName}
Domain: ${result.domain.toUpperCase()}
Total Duration: ${formatTime(result.durationSec)}
Word Count: ${result.wordCount}
Overall Accuracy / Confidence: ${(result.confidence * 100).toFixed(1)}%
Certified By: Scriptify Transcripts (30 N Gould St, STE R, Sheridan, WY 82801)
Website: scriptifytranscripts.com
Generated: ${new Date().toUTCString()}
--------------------------------------------------------------------------------

EXECUTIVE SUMMARY:
${result.summary}

ACTION ITEMS:
${result.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

--------------------------------------------------------------------------------
VERBATIM TRANSCRIPT:
`;

  const body = result.segments
    .map(
      (seg) =>
        `[${formatTime(seg.start)} - ${formatTime(seg.end)}] ${seg.speaker.toUpperCase()}:\n${seg.text}\n`
    )
    .join('\n');

  return `${header}\n${body}`;
}

/**
 * Download a string payload as a client file
 */
export function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Synthetic Tone/Speech Player for demo audio when user chooses pre-loaded sample
 */
export class SyntheticAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private currentTime = 0;
  private duration = 60;
  private timer: number | null = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor(duration: number) {
    this.duration = duration;
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  onTimeUpdate(cb: (time: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  onEnd(cb: () => void) {
    this.onEndCallback = cb;
  }

  play(fromTime?: number) {
    if (fromTime !== undefined) {
      this.currentTime = fromTime;
    }
    this.isPlaying = true;

    // Use browser speech or smooth timer
    const interval = 100; // 100ms
    if (this.timer) clearInterval(this.timer);

    this.timer = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += interval / 1000;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime);
      }
      if (this.currentTime >= this.duration) {
        this.pause();
        this.currentTime = this.duration;
        if (this.onEndCallback) this.onEndCallback();
      }
    }, interval);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime);
    }
  }

  destroy() {
    this.pause();
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}
