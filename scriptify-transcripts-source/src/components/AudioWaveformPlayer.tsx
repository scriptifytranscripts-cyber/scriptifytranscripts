import React, { useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../utils/audioHelper';

interface AudioWaveformPlayerProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackRate: number;
  volume: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onRateChange: (rate: number) => void;
  onVolumeChange: (vol: number) => void;
  audioName: string;
}

export const AudioWaveformPlayer: React.FC<AudioWaveformPlayerProps> = ({
  currentTime,
  duration,
  isPlaying,
  playbackRate,
  volume,
  onPlayPause,
  onSeek,
  onRateChange,
  onVolumeChange,
  audioName,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  // Generate deterministic bar heights based on duration
  const barCount = 64;
  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      // Deterministic pseudo-random heights with natural speech cadence
      const wave = Math.sin(i * 0.28) * 35 + Math.cos(i * 0.7) * 25 + 40;
      return Math.max(15, Math.min(95, Math.round(wave)));
    });
  }, [barCount]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || duration <= 0) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(clickRatio * duration);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
      {/* Top track meta */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 truncate max-w-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-medium text-slate-200 truncate">{audioName}</span>
        </div>
        <div className="font-mono tabular-nums text-slate-300">
          <span className="text-cyan-400 font-semibold">{formatTime(currentTime)}</span>
          <span className="text-slate-600"> / </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Interactive Waveform Bar Visualizer */}
      <div
        ref={waveformRef}
        onClick={handleWaveformClick}
        className="relative h-16 w-full flex items-center gap-[3px] px-2 py-1 bg-slate-950/80 rounded-lg cursor-pointer border border-slate-800/80 group hover:border-slate-700 transition-colors select-none"
      >
        {/* Progress overlay line */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-cyan-500/10 rounded-l-lg pointer-events-none transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] pointer-events-none transition-all duration-75"
          style={{ left: `${progressPercent}%` }}
        />

        {bars.map((height, i) => {
          const barPos = (i / barCount) * 100;
          const isPassed = barPos <= progressPercent;
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors duration-75 ${
                isPassed
                  ? 'bg-gradient-to-t from-cyan-500 to-cyan-300'
                  : 'bg-slate-700/80 group-hover:bg-slate-600'
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Left: Playback controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            title="Rewind 5 seconds"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onPlayPause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-transform active:scale-95 shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-slate-950" />
            ) : (
              <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
            )}
          </button>

          <button
            onClick={() => onSeek(Math.min(duration, currentTime + 5))}
            title="Forward 5 seconds"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Speed Control */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
            <button
              key={rate}
              onClick={() => onRateChange(rate)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                playbackRate === rate
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Right: Volume slider */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
