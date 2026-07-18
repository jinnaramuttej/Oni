import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  ShieldCheck, 
  Download, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Smartphone
} from 'lucide-react';

interface ParentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentPortalModal: React.FC<ParentPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'digest' | 'attendance' | 'message'>('digest');
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30 mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Parent Portal Preview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Parent Progress & Oversight Dashboard
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm pt-1">
            Student: <strong>Julian Thorne (Grade 12)</strong> &bull; SAT Honors Batch #204
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-bold text-slate-600 gap-4">
          <button
            onClick={() => setActiveTab('digest')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'digest' ? 'border-blue-600 text-blue-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Weekly Digest & Score Lift
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'attendance' ? 'border-blue-600 text-blue-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Attendance & Homework Logs
          </button>
          <button
            onClick={() => setActiveTab('message')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'message' ? 'border-blue-600 text-blue-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Message Lead Faculty
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {activeTab === 'digest' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Latest Weekly Diagnostic</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900">1570 / 1600 SAT Target</div>
                  <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+280 Pts total score lift over baseline</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading official PDF score transcript report...')}
                  className="inline-flex items-center gap-1.5 bg-indigo-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-indigo-950 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Report</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tutor Weekly Note:</div>
                <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                  "Julian demonstrated perfect accuracy on quadratic modeling and passage rhetoric during Thursday's micro-session. Next week we move into advanced multivariable vectors."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Recent Session Activity Logs:</div>
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Oct 18, 2025 - SAT Math Module 4</div>
                  <div className="text-slate-500">Instructor: Marcus Vance, M.Ed.</div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Present (100%)
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Oct 15, 2025 - 1-on-1 Office Hours Review</div>
                  <div className="text-slate-500">Instructor: Dr. Evelyn Chen</div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Present (100%)
                </span>
              </div>
            </div>
          )}

          {activeTab === 'message' && (
            <form onSubmit={handleSendMessage} className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Direct Note to Lead Faculty</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ask a question about homework, upcoming exam schedule, or college counseling guidance..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              {messageSent ? (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Note sent directly to faculty! Expect an answer within 2 hours.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message to Marcus Vance</span>
                </button>
              )}
            </form>
          )}

          {/* Bottom App Mobile Notification Note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Smartphone className="w-4 h-4 text-blue-600" />
              Get real-time push alerts on iOS & Android
            </span>
            <span className="flex items-center gap-1 font-mono text-emerald-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Active Subscription
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
