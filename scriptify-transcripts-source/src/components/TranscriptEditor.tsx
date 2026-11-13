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
    <div className="bg-white border border-[#D4CFC4] rounded-xl overflow-hidden flex flex-col h-[580px] shadow-xs">
      {/* Editor Header & Search */}
      <div className="p-4 border-b border-[#E2DED5] flex flex-wrap items-center justify-between gap-4 bg-[#F2EFE9]/70">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#0F1E36]">Certified Transcript Record</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-600 font-mono tabular-nums">{segments.length} Segments</span>
        </div>

        {/* Search bar */}
        <div className="relative flex items-center w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-14 py-1.5 text-xs bg-white border border-[#D4CFC4] rounded-lg text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] w-full sm:w-56 md:w-64"
          />
          {searchQuery && (
            <span className="absolute right-3 text-[10px] text-[#0F2A4A] font-mono font-semibold tabular-nums">
              {matchCount} hits
            </span>
          )}
        </div>
      </div>

      {/* Speaker rename inline bar */}
      {editingSpeaker && (
        <div className="px-4 py-2.5 bg-[#FDF8F0] border-b border-[#E2DED5] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#9A6B2F] font-semibold">Rename all occurrences of:</span>
            <span className="font-bold text-[#0F1E36]">{editingSpeaker.oldName}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={editingSpeaker.newName}
              onChange={(e) =>
                setEditingSpeaker({ ...editingSpeaker, newName: e.target.value })
              }
              className="px-2 py-1 bg-white border border-[#0F2A4A] rounded text-[#0F1E36] text-xs focus:outline-none min-w-0"
              autoFocus
            />
            <button
              onClick={handleSaveSpeakerRename}
              className="px-2.5 py-1 bg-[#0F2A4A] text-white font-semibold rounded hover:bg-[#173B66] transition-colors cursor-pointer"
            >
              Apply
            </button>
            <button
              onClick={() => setEditingSpeaker(null)}
              className="px-2.5 py-1 text-slate-600 hover:text-[#0F1E36] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Segment Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#E2DED5]/70">
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
                  ? 'bg-[#FAF8F4] border border-[#0F2A4A]/40 shadow-2xs'
                  : isMatch
                  ? 'bg-amber-50/70 border border-amber-200'
                  : 'hover:bg-[#FAF8F4]/70'
              }`}
            >
              {/* Segment meta row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1.5">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <button
                    onClick={() => onSeek(seg.start)}
                    className="inline-flex items-center gap-1 font-mono text-[#0F2A4A] hover:text-[#173B66] font-semibold tabular-nums px-2 py-0.5 rounded bg-[#F2EFE9] border border-[#D4CFC4] hover:border-[#0F2A4A] transition-colors cursor-pointer"
                    title="Jump audio to this timestamp"
                  >
                    <Play className="w-3 h-3 fill-[#0F2A4A]" />
                    <span>
                      {formatTime(seg.start)} - {formatTime(seg.end)}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setEditingSpeaker({ oldName: seg.speaker, newName: seg.speaker })
                    }
                    className="font-semibold text-[#0F1E36] hover:text-[#9A6B2F] transition-colors cursor-pointer group flex items-center gap-1"
                    title="Click to rename speaker across transcript"
                  >
                    <UserCheck className="w-3 h-3 text-[#0F2A4A]" />
                    <span>{seg.speaker}</span>
                    <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-slate-500 transition-opacity" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-slate-500">
                  <span className="font-mono text-[11px] tabular-nums">
                    {(seg.confidence * 100).toFixed(1)}% match
                  </span>
                  <button
                    onClick={() => handleCopySegment(seg)}
                    className="text-slate-500 hover:text-[#0F2A4A] transition-colors cursor-pointer"
                    title="Copy segment"
                  >
                    {copiedId === seg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
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
                    className="w-full p-2.5 text-xs bg-white border border-[#0F2A4A] rounded-lg text-[#0F1E36] focus:outline-none"
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => handleSaveEdit(seg.id)}
                      className="px-3 py-1 text-xs font-semibold bg-[#0F2A4A] text-white rounded hover:bg-[#173B66] transition-colors cursor-pointer"
                    >
                      Save Text
                    </button>
                    <button
                      onClick={() => setEditingSegmentId(null)}
                      className="px-3 py-1 text-xs text-slate-600 hover:text-[#0F1E36] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onClick={() => handleStartEdit(seg)}
                  className={`text-xs md:text-sm leading-relaxed text-slate-800 cursor-text hover:text-[#0F1E36] transition-colors select-text ${
                    isActive ? 'text-[#0F1E36] font-medium' : ''
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
