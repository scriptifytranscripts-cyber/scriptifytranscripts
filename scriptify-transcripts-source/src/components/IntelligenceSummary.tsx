import React, { useState } from 'react';
import { Download, CheckSquare, Square, Trash2, FileText, Sparkles, ShieldAlert, Check } from 'lucide-react';
import { TranscriptionResult } from '../types';
import { generatePlainText, generateSRT, generateVTT, triggerDownload } from '../utils/audioHelper';

interface IntelligenceSummaryProps {
  result: TranscriptionResult;
  onPurge: () => void;
}

export const IntelligenceSummary: React.FC<IntelligenceSummaryProps> = ({
  result,
  onPurge,
}) => {
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const toggleAction = (idx: number) => {
    setCompletedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleExport = (format: 'txt' | 'srt' | 'vtt' | 'json' | 'md') => {
    const baseName = result.audioName.replace(/\.[^/.]+$/, '');
    if (format === 'txt') {
      const content = generatePlainText(result);
      triggerDownload(content, `${baseName}_transcript.txt`, 'text/plain');
    } else if (format === 'srt') {
      const content = generateSRT(result.segments);
      triggerDownload(content, `${baseName}_subtitles.srt`, 'text/plain');
    } else if (format === 'vtt') {
      const content = generateVTT(result.segments);
      triggerDownload(content, `${baseName}_subtitles.vtt`, 'text/vtt');
    } else if (format === 'json') {
      const content = JSON.stringify(result, null, 2);
      triggerDownload(content, `${baseName}_data.json`, 'application/json');
    } else if (format === 'md') {
      const content = `# Transcript: ${result.audioName}\n\n## Executive Summary\n${result.summary}\n\n## Action Items\n${result.actionItems.map((a) => `- [ ] ${a}`).join('\n')}\n\n## Transcript\n${result.segments.map((s) => `**${s.speaker}** (${s.start}s):\n${s.text}`).join('\n\n')}`;
      triggerDownload(content, `${baseName}_notes.md`, 'text/markdown');
    }

    setExportNotice(`Exported as .${format.toUpperCase()}`);
    setTimeout(() => setExportNotice(null), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6 shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Audio Intelligence & Export</h3>
        </div>
        {exportNotice && (
          <span className="text-xs text-cyan-400 font-mono animate-fade-in flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            {exportNotice}
          </span>
        )}
      </div>

      {/* Redacted Alert if PII was sanitized */}
      {result.redactedItemsCount !== undefined && result.redactedItemsCount > 0 && (
        <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg flex items-start gap-2.5 text-xs text-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Privacy Shield Active:</span> {result.redactedItemsCount} sensitive identifiers (names, account digits, or personal entities) were masked to protect compliance.
          </div>
        </div>
      )}

      {/* Executive Summary */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Executive Summary
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/70">
          {result.summary}
        </p>
      </div>

      {/* Action Items */}
      {result.actionItems && result.actionItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Key Decisions & Action Items
          </div>
          <div className="space-y-2">
            {result.actionItems.map((item, idx) => {
              const isDone = Boolean(completedActions[idx]);
              return (
                <button
                  key={idx}
                  onClick={() => toggleAction(idx)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs flex items-start gap-2.5 transition-colors cursor-pointer border ${
                    isDone
                      ? 'bg-slate-950/40 border-slate-800 text-slate-500 line-through'
                      : 'bg-slate-950/70 border-slate-800/90 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-normal">{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Topics unboxed metadata text */}
      {result.keyTopics && result.keyTopics.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Indexed Topics & Keywords
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 py-1">
            {result.keyTopics.map((topic, i) => (
              <React.Fragment key={topic}>
                <span className="text-slate-300 font-medium">{topic}</span>
                {i < result.keyTopics.length - 1 && <span className="text-slate-600">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-500 block">Total Words</span>
          <span className="font-mono text-white text-sm font-semibold tabular-nums">
            {result.wordCount}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Speakers</span>
          <span className="font-mono text-cyan-400 text-sm font-semibold tabular-nums">
            {result.speakerCount}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Sentiment</span>
          <span className="capitalize text-slate-200 text-sm font-semibold">
            {result.sentiment}
          </span>
        </div>
      </div>

      {/* Export Format Selector */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Export Certified Files</span>
          <Download className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleExport('txt')}
            className="p-2 text-xs font-medium text-slate-200 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>.TXT</span>
          </button>
          <button
            onClick={() => handleExport('srt')}
            className="p-2 text-xs font-medium text-slate-200 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>.SRT Sub</span>
          </button>
          <button
            onClick={() => handleExport('vtt')}
            className="p-2 text-xs font-medium text-slate-200 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>.VTT Web</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="p-2 text-xs font-medium text-slate-200 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>.JSON</span>
          </button>
          <button
            onClick={() => handleExport('md')}
            className="p-2 text-xs font-medium text-slate-200 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>.MD Notes</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatePlainText(result));
              setExportNotice('Full transcript copied to clipboard!');
              setTimeout(() => setExportNotice(null), 2500);
            }}
            className="p-2 text-xs font-medium text-cyan-400 bg-slate-950 border border-cyan-800/60 rounded-lg hover:bg-cyan-950/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Copy All</span>
          </button>
        </div>
      </div>

      {/* Zero Retention Purge Button */}
      <div className="pt-2">
        <button
          onClick={onPurge}
          className="w-full py-2.5 px-3 text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          title="Instantly purge audio recording and transcript from active memory"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Zero-Retention Wipe (Purge from Memory)</span>
        </button>
      </div>
    </div>
  );
};
