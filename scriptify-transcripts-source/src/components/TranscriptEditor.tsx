import React, { useState, useMemo } from 'react';
import { Search, Edit3, Check, Copy, UserCheck, Play } from 'lucide-react';
import { Segment } from '../types';
import { formatTime } from '../utils/audioHelper';

interface TranscriptEditorProps {
  segments: Segment[];
  currentTime: number;
  onSeek: (time: number) => void;
  onUpdateSegment: (segmentId: string, newText: string) => void;
  onRenameSpeaker: (oldName: string, newName: string) => void;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  segments,
  currentTime,
  onSeek,
  onUpdateSegment,
  onRenameSpeaker,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingSpeaker, setEditingSpeaker] = useState<{ oldName: string; newName: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter or count search matches
  const matchCount = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const q = searchQuery.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q)).length;
  }, [segments, searchQuery]);

  const handleStartEdit = (seg: Segment) => {
    setEditingSegmentId(seg.id);
    setEditingText(seg.text);
  };

  const handleSaveEdit = (segId: string) => {
    onUpdateSegment(segId, editingText);
    setEditingSegmentId(null);
  };

  const handleSaveSpeakerRename = () => {
    if (editingSpeaker && editingSpeaker.newName.trim()) {
      onRenameSpeaker(editingSpeaker.oldName, editingSpeaker.newName.trim());
    }
    setEditingSpeaker(null);
  };

  const handleCopySegment = (seg: Segment) => {
    navigator.clipboard.writeText(`[${formatTime(seg.start)}] ${seg.speaker}: ${seg.text}`);
    setCopiedId(seg.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[580px] shadow-xl">
      {/* Editor Header & Search */}
      <div className="p-4 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-4 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Interactive Transcript</span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400 font-mono tabular-nums">{segments.length} Segments</span>
        </div>

        {/* Search bar */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-14 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-56 md:w-64"
          />
          {searchQuery && (
            <span className="absolute right-3 text-[10px] text-cyan-400 font-mono tabular-nums">
              {matchCount} hits
            </span>
          )}
        </div>
      </div>

      {/* Speaker rename modal inline bar if open */}
      {editingSpeaker && (
        <div className="px-4 py-2.5 bg-cyan-950/60 border-b border-cyan-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-medium">Rename all occurrences of:</span>
            <span className="font-semibold text-white">{editingSpeaker.oldName}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editingSpeaker.newName}
              onChange={(e) =>
                setEditingSpeaker({ ...editingSpeaker, newName: e.target.value })
              }
              className="px-2 py-1 bg-slate-900 border border-cyan-600 rounded text-slate-100 text-xs focus:outline-none"
              autoFocus
            />
            <button
              onClick={handleSaveSpeakerRename}
              className="px-2.5 py-1 bg-cyan-400 text-slate-950 font-semibold rounded hover:bg-cyan-300 transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setEditingSpeaker(null)}
              className="px-2.5 py-1 text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Segment Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-slate-800/40">
        {segments.map((seg) => {
          const isActive = currentTime >= seg.start && currentTime <= seg.end;
          const isMatch =
            searchQuery.trim().length > 0 &&
            (seg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
              seg.speaker.toLowerCase().includes(searchQuery.toLowerCase()));

          return (
            <div
              key={seg.id}
              className={`pt-3.5 first:pt-0 rounded-lg p-3 transition-all ${
                isActive
                  ? 'bg-cyan-950/25 border border-cyan-500/30'
                  : isMatch
                  ? 'bg-slate-800/40 border border-slate-700/60'
                  : 'hover:bg-slate-850/60'
              }`}
            >
              {/* Segment meta row */}
              <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  {/* Jump audio button with timestamp */}
                  <button
                    onClick={() => onSeek(seg.start)}
                    className="inline-flex items-center gap-1 font-mono text-cyan-400 hover:text-cyan-300 tabular-nums px-2 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer"
                    title="Jump audio to this timestamp"
                  >
                    <Play className="w-3 h-3 fill-cyan-400" />
                    <span>
                      {formatTime(seg.start)} - {formatTime(seg.end)}
                    </span>
                  </button>

                  {/* Speaker tag with rename trigger */}
                  <button
                    onClick={() =>
                      setEditingSpeaker({ oldName: seg.speaker, newName: seg.speaker })
                    }
                    className="font-medium text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer group flex items-center gap-1"
                    title="Click to rename speaker across transcript"
                  >
                    <UserCheck className="w-3 h-3 text-cyan-400" />
                    <span>{seg.speaker}</span>
                    <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  <span className="font-mono text-[11px] tabular-nums">
                    {(seg.confidence * 100).toFixed(1)}% match
                  </span>
                  <button
                    onClick={() => handleCopySegment(seg)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy segment"
                  >
                    {copiedId === seg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Segment text body or edit mode */}
              {editingSegmentId === seg.id ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-cyan-500 rounded-lg text-slate-100 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => handleSaveEdit(seg.id)}
                      className="px-3 py-1 text-xs font-semibold bg-cyan-400 text-slate-950 rounded hover:bg-cyan-300 transition-colors cursor-pointer"
                    >
                      Save Text
                    </button>
                    <button
                      onClick={() => setEditingSegmentId(null)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onClick={() => handleStartEdit(seg)}
                  className={`text-xs md:text-sm leading-relaxed text-slate-200 cursor-text hover:text-white transition-colors select-text ${
                    isActive ? 'text-cyan-100 font-medium' : ''
                  }`}
                  title="Click to edit words in place"
                >
                  {seg.text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
