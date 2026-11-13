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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0F1E36]/45 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#D4CFC4] rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl space-y-6 text-[#0F1E36]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-500 hover:text-[#0F1E36] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#9A6B2F] uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Scriptify Transcripts · Quote Request</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F1E36] tracking-tight">
                Request a Project Quote
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tell us about your audio project. Our team responds within 2 business hours with an exact price lock and NDA if requested.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#0F1E36] font-bold uppercase tracking-wide block text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe, Esq."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#D4CFC4] rounded-xl text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#0F1E36] font-bold uppercase tracking-wide block text-[11px]">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@lawfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#D4CFC4] rounded-xl text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#0F1E36] font-bold uppercase tracking-wide block text-[11px]">
                  Practice Area / Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#D4CFC4] rounded-xl text-[#0F1E36] text-sm focus:outline-none focus:border-[#0F2A4A]"
                >
                  <option value="Legal & Depositions">Legal & Depositions (Court Certified)</option>
                  <option value="Corporate & Executive">Corporate & Executive</option>
                  <option value="Academic & Research">Academic & Research</option>
                  <option value="Media & Podcasts">Media & Podcasts</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#0F1E36] font-bold uppercase tracking-wide block text-[11px]">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Audio length, turnaround deadline, special formatting requirements..."
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#D4CFC4] rounded-xl text-[#0F1E36] placeholder-slate-400 focus:outline-none focus:border-[#0F2A4A] text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 bg-[#0F2A4A] hover:bg-[#173B66] text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Quote Request</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#9A6B2F]" />
              <span>US Office: 30 N Gould St, STE R, Sheridan, WY 82801</span>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#0F1E36]">Quote Request Received</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thank you, {fullName}. Our team at <strong className="text-[#0F1E36]">Scriptify Transcripts</strong> will email your quote shortly from <span className="font-semibold text-[#0F2A4A]">contact@scriptifytranscripts.com</span>.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF8F4] rounded-xl border border-[#E2DED5] text-xs font-mono text-[#0F2A4A] text-left space-y-1">
              <div>Reference: #ST-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>Estimated Response: Within 2 Hours</div>
              <div>Category: {projectType}</div>
              <div>US Office: 30 N Gould St, Sheridan, WY</div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#0F2A4A] hover:bg-[#173B66] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
