export default function Philosophy() {
  return (
    <section id="philosophy" className="relative bg-ivory overflow-hidden">
      {/* Subtle decorative texture */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-stone/30 -translate-y-1/3 translate-x-1/4 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-20 py-32 lg:py-48">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* Text column */}
          <div className="lg:col-span-5 lg:pt-16">
            <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-8">Our Philosophy</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] text-charcoal mb-10">
              <span className="italic">Where</span> Wellness <br />
              Becomes <span className="italic text-rose-wood">Art</span>
            </h2>
            <div className="w-16 h-[1px] bg-champagne/50 mb-10" />
            <p className="text-charcoal-soft text-[15px] lg:text-[17px] leading-[1.85] font-light mb-6 font-sans">
              At SÉRENITÉ, we believe true luxury is not excess, but the refined absence of noise. 
              Our philosophy draws from Japanese minimalism and Scandinavian sensibility — 
              creating spaces where the mind naturally softens and the body remembers how to heal.
            </p>
            <p className="text-charcoal-soft text-[15px] lg:text-[17px] leading-[1.85] font-light font-sans">
              Every treatment begins with a mindful consultation. Every ritual is guided by intuition 
              and expertise. We use only certified organic products, sustainably sourced essential oils, 
              and techniques passed through generations of master therapists.
            </p>
          </div>

          {/* Image column */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(59,59,59,0.15)]">
              <img
                src="/images/spa-pool.jpg"
                alt="Luxury spa pool with ambient lighting"
                className="w-full h-[520px] lg:h-[640px] object-cover hover:scale-[1.01] transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -left-4 lg:-left-8 bg-warm-white rounded-[24px] p-7 shadow-[0_20px_60px_-15px_rgba(59,59,59,0.12)] max-w-[260px] border border-stone/30">
              <div className="font-display text-[2.5rem] leading-none text-champagne mb-2">12+</div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-charcoal/70 font-medium mb-1">Years of Excellence</div>
              <div className="text-[13px] text-charcoal-soft font-light leading-relaxed">Award-winning wellness retreat in the heart of nature</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
