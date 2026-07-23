import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  { icon: <MapPin size={18} />, label: 'Visit Us', value: '247 Serenity Lane, Portland, OR 97201' },
  { icon: <Phone size={18} />, label: 'Call Us', value: '(503) 555-0142' },
  { icon: <Mail size={18} />, label: 'Email Us', value: 'hello@stillness.studio' },
  { icon: <Clock size={18} />, label: 'Studio Hours', value: 'Mon–Fri: 6am–9pm | Sat–Sun: 7am–7pm' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            We'd love to hear from you.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            {contactInfo.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-2xl bg-sage/10 flex items-center justify-center shrink-0 text-eucalyptus">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[0.6875rem] tracking-[0.08em] uppercase text-charcoal/45 font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="text-charcoal/70 font-light text-sm lg:text-base">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social links placeholder */}
            <div className="flex gap-4 pt-4">
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[0.6875rem] tracking-[0.06em] uppercase text-charcoal/40 hover:text-eucalyptus transition-colors duration-300 font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="bg-ivory rounded-[1.75rem] p-7 lg:p-9 border border-stone/20 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-[14px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-[14px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-[14px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us what's on your mind..."
                className="w-full px-4 py-3 rounded-[14px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30 resize-none"
              />
            </div>

            <button className="w-full py-3.5 text-sm font-medium tracking-[0.03em] text-ivory bg-eucalyptus hover:bg-sage-dark rounded-[20px] transition-all duration-300 shadow-[0_4px_16px_rgba(127,145,114,0.2)] hover:shadow-[0_6px_24px_rgba(127,145,114,0.3)]">
              Send Message
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
