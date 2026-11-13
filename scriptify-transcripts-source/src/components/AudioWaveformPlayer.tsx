import React, { useRef } from 'react';
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

  const barCount = 64;
  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
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
    <div className="bg-white border border-[#D4CFC4] rounded-xl p-5 space-y-4 shadow-xs">
      {/* Top track meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="font-bold text-[#0F1E36] truncate">{audioName}</span>
        </div>
        <div className="font-mono tabular-nums text-slate-600 shrink-0">
          <span className="text-[#0F2A4A] font-bold">{formatTime(currentTime)}</span>
          <span className="text-slate-400"> / </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Interactive Bidirectional Waveform Visualizer */}
      <div
        ref={waveformRef}
        onClick={handleWaveformClick}
        className="relative h-20 w-full flex items-center gap-[3px] px-2.5 py-1 bg-[#FAF8F4] rounded-lg cursor-pointer border border-[#E2DED5] group hover:border-[#0F2A4A]/40 transition-colors select-none"
      >
        {/* Zero baseline */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#D4CFC4] pointer-events-none" />
        {/* Progress overlay tint */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-[#0F2A4A]/6 rounded-l-lg pointer-events-none transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#0F1E36] pointer-events-none transition-all duration-75"
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
                  ? 'bg-[#0F2A4A]'
                  : 'bg-[#CBD5E1] group-hover:bg-slate-400'
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            title="Rewind 5 seconds"
            className="p-2 text-slate-600 hover:text-[#0F2A4A] hover:bg-[#FAF8F4] rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onPlayPause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0F2A4A] text-white hover:bg-[#173B66] transition-transform active:scale-95 shadow-xs cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => onSeek(Math.min(duration, currentTime + 5))}
            title="Forward 5 seconds"
            className="p-2 text-slate-600 hover:text-[#0F2A4A] hover:bg-[#FAF8F4] rounded-lg transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex flex-wrap items-center gap-1 bg-[#FAF8F4] p-1 rounded-lg border border-[#E2DED5]">
          {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
            <button
              key={rate}
              onClick={() => onRateChange(rate)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                playbackRate === rate
                  ? 'bg-[#0F2A4A] text-white font-semibold'
                  : 'text-slate-600 hover:text-[#0F2A4A]'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)}
            className="text-slate-600 hover:text-[#0F2A4A] transition-colors cursor-pointer"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-700" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-[#0F2A4A] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
