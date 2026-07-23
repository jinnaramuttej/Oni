import { useState } from 'react';
import { User, Mail, Phone, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Enrollment() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    grade: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section id="enrollment" className="py-20 lg:py-28 bg-slate-bg" aria-label="Enrollment form">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[24px] bg-white shadow-premium p-12">
            <div className="w-20 h-20 rounded-full bg-emerald-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-success" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-deep mb-3">Thank You!</h3>
            <p className="text-slate-text text-lg leading-relaxed mb-6">
              Your enrollment request has been received. Our admissions team will contact you within 24 hours to discuss the next steps.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 rounded-[18px] bg-blue-royal px-8 py-3 text-base font-semibold text-white shadow-button hover:shadow-button-hover transition-all duration-300"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="enrollment" className="py-20 lg:py-28 bg-slate-bg" aria-label="Enrollment form">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Info */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block rounded-full bg-indigo-deep/5 px-4 py-1.5 text-sm font-semibold text-indigo-deep mb-4">
              Enroll Now
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-6">
              Start Your Journey to <span className="text-blue-royal">Excellence</span>
            </h2>
            <p className="text-slate-text text-lg leading-relaxed mb-8">
              Fill in your details and our admissions team will get in touch to help you find the right program. First consultation is completely free.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Free diagnostic assessment & learning roadmap',
                'Personalized consultation with subject experts',
                'Flexible payment plans available',
                '7-day money-back guarantee',
                'Access to recorded sessions from day one',
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-text font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="mt-10 rounded-2xl overflow-hidden hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
                alt="Students studying in a modern classroom"
                className="w-full h-52 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[24px] bg-white shadow-premium p-8 lg:p-10 space-y-5"
            noValidate
          >
            <h3 className="text-xl font-bold text-indigo-deep mb-2">Enrollment Details</h3>
            <p className="text-sm text-slate-text mb-6">All fields marked with * are required</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-deep mb-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-[14px] border border-gray-200 bg-slate-bg px-4 py-3 text-sm text-indigo-deep placeholder:text-gray-400 focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-deep mb-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-[14px] border border-gray-200 bg-slate-bg px-4 py-3 text-sm text-indigo-deep placeholder:text-gray-400 focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-deep mb-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full rounded-[14px] border border-gray-200 bg-slate-bg px-4 py-3 text-sm text-indigo-deep placeholder:text-gray-400 focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/20 focus:outline-none transition-all"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="course" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-deep mb-2">
                  <BookOpen className="h-4 w-4" />
                  Course *
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[14px] border border-gray-200 bg-slate-bg px-4 py-3 text-sm text-indigo-deep focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/20 focus:outline-none transition-all appearance-none"
                >
                  <option value="">Select a course</option>
                  <option value="jee">JEE Advanced</option>
                  <option value="neet">NEET Prep</option>
                  <option value="boards12">Class 12th Boards</option>
                  <option value="boards10">Class 10th Boards</option>
                  <option value="olympiad">Mathematics Olympiad</option>
                  <option value="sat">SAT/ACT Prep</option>
                  <option value="foundation">Foundation Program</option>
                </select>
              </div>
              <div>
                <label htmlFor="grade" className="text-sm font-semibold text-indigo-deep mb-2 block">
                  Current Grade *
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[14px] border border-gray-200 bg-slate-bg px-4 py-3 text-sm text-indigo-deep focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/20 focus:outline-none transition-all appearance-none"
                >
                  <option value="">Select grade</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="passed">Passed Class 12</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-semibold text-indigo-deep mb-2 block">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your goals or any questions..."
                className="w-full rounded-[14px] border border-gray-200 bg-slate-bg px-4 py-3 text-sm text-indigo-deep placeholder:text-gray-400 focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/20 focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 rounded-[18px] bg-blue-royal px-8 py-4 text-base font-semibold text-white shadow-button hover:shadow-button-hover hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              Submit Enrollment Request
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-center text-xs text-slate-text">
              By submitting, you agree to our privacy policy. We'll never share your data.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
