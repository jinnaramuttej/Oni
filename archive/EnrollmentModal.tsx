import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseId?: string;
  preselectedInstructorName?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseId,
  preselectedInstructorName
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeLevel: 'Senior Prep (Grades 11-12)',
    targetGoal: preselectedCourseId ? `Specific Track (${preselectedCourseId})` : 'Digital SAT 1550+ Boost',
    mode: 'Hybrid Flex',
    preferredTimeSlot: 'Weekday Evening (5:30 PM - 7:30 PM)',
    instructorPreference: preselectedInstructorName || 'Any Master Faculty',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Top Ribbon */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Priority Fall Enrollment & Consultation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Reserve Student Spot & Diagnostic
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm pt-1">
                Step {step} of 2 &bull; Instant confirmation & complimentary 45-min academic diagnostic orientation.
              </p>

              {/* Progress Line */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-amber-300 h-1.5 rounded-full transition-all duration-300" 
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Alex Johnson"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent / Guardian Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Sarah Johnson"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number (For SMS Digest) *</label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 019-2831"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grade Level</label>
                    <select
                      value={formData.gradeLevel}
                      onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium bg-white"
                    >
                      <option>Middle School (Grades 6-8)</option>
                      <option>High School (Grades 9-10)</option>
                      <option>Senior Prep (Grades 11-12)</option>
                      <option>Gap Year / University Entrance</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!formData.studentName || !formData.email || !formData.phone}
                      className="inline-flex items-center gap-2 bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <span>Continue to Step 2</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Target Goal *</label>
                    <select
                      value={formData.targetGoal}
                      onChange={(e) => setFormData({ ...formData, targetGoal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium bg-white"
                    >
                      <option>Digital SAT 1550+ Accelerator Track</option>
                      <option>AP Physics & Multivariable Calculus 5s</option>
                      <option>AP Biology & Pre-Med Admissions</option>
                      <option>USACO Competitive Coding & AP CS</option>
                      <option>IB Diploma 42+ Prediction Boost</option>
                      <option>Young Innovators AMC 8 / Science Honors</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Learning Format</label>
                      <select
                        value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium bg-white"
                      >
                        <option>Hybrid Flex (Campus + Virtual)</option>
                        <option>In-Person Campus Masterclass</option>
                        <option>Live Interactive Online Studio</option>
                        <option>1-on-1 Private Ivy Tutoring</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Time Slot</label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium bg-white"
                      >
                        <option>Weekday Evening (5:30 PM - 7:30 PM EST)</option>
                        <option>Weekend Morning (10:00 AM - 12:30 PM EST)</option>
                        <option>Weekend Afternoon (2:00 PM - 4:30 PM EST)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-700 shrink-0" />
                    <div className="text-xs text-indigo-900">
                      <strong>Zero Risk:</strong> After registration, an advisor will schedule your 45-min diagnostic orientation call to verify goals before tuition billing.
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      &larr; Back to Student Info
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer"
                    >
                      <span>Complete Seat Reservation</span>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        ) : (
          /* Submission Confirmation Card */
          <div className="p-8 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Reservation Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-1">
                Welcome to Aura Academy, {formData.studentName}!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                We have emailed a calendar invitation for your <strong>Diagnostic Orientation Call</strong> to <span className="font-bold text-slate-800">{formData.email}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Enrollment Summary:</div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Goal:</span>
                <span className="font-bold text-slate-800">{formData.targetGoal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Learning Mode:</span>
                <span className="font-bold text-slate-800">{formData.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ref Code:</span>
                <span className="font-mono font-bold text-blue-600">AU-2025-RESERVED</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs px-8 py-3 rounded-xl transition-colors cursor-pointer shadow"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
