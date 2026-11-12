import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Lock, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Legal & Depositions');
  const [projectNotes, setProjectNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledNotes) {
      setProjectNotes(prefilledNotes);
    }
  }, [prefilledNotes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !fullName.trim()) {
      setError('Please provide your full name and valid work email.');
      return;
    }
    setError(null);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setProjectNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Scriptify Transcripts · Quote Request</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Request a Project Quote
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tell us about your audio project. Our US team responds within 2 business hours with an exact price lock and NDA if requested.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-200 text-xs rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase tracking-wide block text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase tracking-wide block text-[11px]">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@lawfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase tracking-wide block text-[11px]">
                  Practice Area / Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Legal & Depositions">Legal & Depositions (Court Certified)</option>
                  <option value="Corporate & Executive">Corporate & Executive</option>
                  <option value="Academic & Research">Academic & Research</option>
                  <option value="Media & Podcasts">Media & Podcasts</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase tracking-wide block text-[11px]">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Audio length, turnaround deadline, special formatting requirements..."
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Quote Request</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>US Office: 30 N Gould St, STE R, Sheridan, WY 82801</span>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Quote Request Received!</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Thank you, {fullName}. Our team at <strong className="text-white">Scriptify Transcripts</strong> will email your quote shortly from <span className="font-semibold text-cyan-400">contact@scriptifytranscripts.com</span>.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-400 text-left space-y-1">
              <div>Reference: #ST-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>Estimated Response: Within 2 Hours</div>
              <div>Category: {projectType}</div>
              <div>US Office: 30 N Gould St, Sheridan, WY</div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
