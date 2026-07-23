import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Zap,
  Shield,
  BarChart3,
  Brain,
  Plug,
  Users,
  Star,
  Check,
  ChevronDown,
  Sparkles,
  Workflow,
  Globe,
  Layers,
  Bot,
  Target,
  TrendingUp,
  Activity,
  Code2,
  Send,
  Play,
  MessageCircle,
  Headphones,
  ArrowUpRight,
  Layers3,
  Blocks,
  Settings,
  Calendar,
} from 'lucide-react';

// Social icons (SVG components)
function Github({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

function Twitter({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

function Linkedin({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
   ========================================================= */

// Animation Observer Hook
function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

// Number Counter Component
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Button Components
function PrimaryButton({ 
  children, 
  className = '',
  icon: Icon,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ElementType }) {
  return (
    <button
      {...props}
      className={`group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-purple hover:bg-purple-light text-white font-semibold text-sm rounded-[18px] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(124,58,237,0.35)] active:scale-[0.98] ${className}`}
    >
      {children}
      {Icon && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

function SecondaryButton({ 
  children, 
  className = '',
  icon: Icon,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ElementType }) {
  return (
    <button
      {...props}
      className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white-primary font-semibold text-sm rounded-[18px] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm ${className}`}
    >
      {children}
      {Icon && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

// Section Wrapper
function Section({ 
  children, 
  className = '',
  id 
}: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 lg:py-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// Section Header
function SectionHeader({
  badge,
  title,
  description,
  centered = true
}: {
  badge?: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-16 md:mb-20`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light text-xs font-medium tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 gradient-text">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Product', href: '#product' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#integrations' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-charcoal/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center shadow-lg shadow-purple/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white-primary">Nexus</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-white-primary transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-muted hover:text-white-primary px-4 py-2 transition-colors">
              Sign in
            </button>
            <PrimaryButton className="!px-5 !py-2.5">
              Get Started Free
            </PrimaryButton>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-white-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 pt-2 space-y-1 bg-charcoal/95 backdrop-blur-xl border-t border-white/5">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-base font-medium text-muted hover:text-white-primary rounded-xl hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-2">
            <SecondaryButton className="w-full">Sign in</SecondaryButton>
            <PrimaryButton className="w-full">Get Started Free</PrimaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =========================================================
   HERO SECTION
   ========================================================= */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-18 overflow-hidden noise-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 aurora-bg animate-aurora" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan/[0.02] rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse-soft" />
            Now in Public Beta — Join 10,000+ teams shipping faster
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
            Ship products at the{' '}
            <span className="gradient-text-purple">speed of thought</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up delay-200 text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Nexus is the intelligent platform that unifies your workflows, automates complexity, 
            and empowers your team to build extraordinary things—faster than ever before.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <PrimaryButton icon={ArrowRight} className="!px-8 !py-4 !text-base">
              Start Building Free
            </PrimaryButton>
            <SecondaryButton icon={Play} className="!px-8 !py-4 !text-base">
              Watch Demo
            </SecondaryButton>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-up delay-400 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-dark">Trusted by engineering teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
              {['Vercel', 'Linear', 'Stripe', 'Figma', 'Notion', 'Raycast'].map(brand => (
                <span key={brand} className="text-lg font-semibold text-white-secondary tracking-tight">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-white/40 animate-pulse-soft" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT PREVIEW / DASHBOARD
   ========================================================= */

function ProductPreview() {
  return (
    <section id="product" className="relative pt-8 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Browser Mockup Container */}
        <div className="relative animate-fade-up" style={{ animationDelay: '400ms' }}>
          {/* Glow Effect Behind */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] bg-gradient-to-b from-purple/10 via-transparent to-cyan/5 blur-[100px] pointer-events-none" />
          
          {/* Browser Chrome */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-graphite border border-white/10 shadow-2xl shadow-black/50 glow-border">
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-6 py-4 bg-graphite-light border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1.5 rounded-md bg-white/5 text-xs text-muted font-mono max-w-md w-full text-center truncate">
                  app.nexus.dev/dashboard
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="bg-charcoal p-4 md:p-8">
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                
                {/* Sidebar */}
                <aside className="col-span-12 md:col-span-3 space-y-2 hidden md:block">
                  <div className="p-4 rounded-2xl bg-graphite/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold">Nexus</span>
                    </div>
                    <nav className="space-y-1">
                      {[
                        { icon: BarChart3, label: 'Dashboard', active: true },
                        { icon: Workflow, label: 'Workflows', active: false },
                        { icon: Bot, label: 'AI Assistant', active: false },
                        { icon: Layers, label: 'Projects', active: false },
                        { icon: Users, label: 'Team', active: false },
                        { icon: Settings, label: 'Settings', active: false },
                      ].map(item => (
                        <a key={item.label} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          item.active ? 'bg-purple/15 text-purple-light' : 'text-muted hover:bg-white/5 hover:text-white-primary'
                        }`}>
                          <item.icon className="w-4.5 h-4.5" />
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>

                {/* Main Content */}
                <main className="col-span-12 md:col-span-9 space-y-4 md:space-y-6">
                  
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white-primary">Overview</h3>
                      <p className="text-sm text-muted mt-0.5">Welcome back! Here's what's happening.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-muted hover:text-white-primary hover:bg-white/8 transition-colors">
                        <Calendar className="w-4 h-4" />
                        Last 30 days
                      </button>
                      <PrimaryButton className="!py-2.5 !px-4">
                        + New Project
                      </PrimaryButton>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {[
                      { label: 'Active Projects', value: '24', change: '+12%', up: true, icon: Layers3, color: 'purple' },
                      { label: 'Tasks Completed', value: '1,847', change: '+23%', up: true, icon: Check, color: 'cyan' },
                      { label: 'Team Members', value: '156', change: '+8', up: true, icon: Users, color: 'green' },
                      { label: 'AI Automations', value: '892', change: '+45%', up: true, icon: Sparkles, color: 'amber' },
                    ].map(stat => (
                      <div key={stat.label} className="group p-4 md:p-5 rounded-2xl bg-graphite/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2.5 rounded-xl bg-${stat.color}/10`}>
                            <stat.icon className={`w-4.5 h-4.5 text-${stat.color === 'green' ? 'green-400' : stat.color === 'amber' ? 'amber-400' : stat.color}`} />
                          </div>
                          <span className={`text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white-primary">{stat.value}</div>
                        <div className="text-xs text-muted mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    
                    {/* Main Chart */}
                    <div className="lg:col-span-2 p-5 md:p-6 rounded-2xl bg-graphite/50 border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-semibold text-white-primary">Performance Metrics</h4>
                        <div className="flex gap-4 text-xs">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple"></span>Revenue</span>
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan"></span>Growth</span>
                        </div>
                      </div>
                      
                      {/* Simulated Chart */}
                      <div className="h-48 md:h-56 flex items-end gap-1.5 md:gap-2 px-2">
                        {[35, 55, 42, 65, 58, 78, 62, 85, 72, 92, 84, 98, 88, 95].map((height, i) => (
                          <div key={i} className="flex-1 flex flex-col gap-1">
                            <div className="flex gap-0.5 h-full items-end">
                              <div 
                                className="flex-1 bg-gradient-to-t from-purple to-purple/60 rounded-t-sm transition-all duration-500 hover:opacity-80"
                                style={{ height: `${height}%`, animationDelay: `${i * 50}ms` }}
                              />
                              <div 
                                className="flex-1 bg-gradient-to-t from-cyan/60 to-cyan/30 rounded-t-sm transition-all duration-500 hover:opacity-80"
                                style={{ height: `${height * 0.7}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* X-axis labels */}
                      <div className="flex justify-between mt-3 px-2 text-[10px] text-muted-dark">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                      </div>
                    </div>

                    {/* AI Insights Card */}
                    <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-purple/10 to-cyan/5 border border-purple/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="w-5 h-5 text-purple-light" />
                          <h4 className="font-semibold text-white-primary">AI Insight</h4>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mb-4">
                          Your team's velocity increased by <span className="text-green-400 font-medium">34%</span> this week. The AI identified 3 workflow optimizations that could save ~8 hours weekly.
                        </p>
                        <button className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-light hover:text-purple transition-colors">
                          View Suggestions
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Table */}
                  <div className="p-5 md:p-6 rounded-2xl bg-graphite/50 border border-white/5">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="font-semibold text-white-primary">Recent Activity</h4>
                      <button className="text-sm text-purple-light hover:text-purple transition-colors">View all</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-xs text-muted-dark border-b border-white/5">
                            <th className="pb-3 font-medium">Project</th>
                            <th className="pb-3 font-medium hidden sm:table-cell">Status</th>
                            <th className="pb-3 font-medium hidden md:table-cell">Progress</th>
                            <th className="pb-3 font-medium text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { name: 'Website Redesign', status: 'In Progress', progress: 75, color: 'purple' },
                            { name: 'API Integration', status: 'Review', progress: 90, color: 'cyan' },
                            { name: 'Mobile App v2', status: 'Planning', progress: 25, color: 'amber' },
                          ].map(row => (
                            <tr key={row.name} className="group">
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full bg-${row.color}`}></div>
                                  <span className="font-medium text-sm text-white-primary group-hover:text-white transition-colors">{row.name}</span>
                                </div>
                              </td>
                              <td className="py-4 hidden sm:table-cell">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-muted">
                                  {row.status}
                                </span>
                              </td>
                              <td className="py-4 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                                    <div 
                                      className={`h-full bg-gradient-to-r from-${row.color} to-${row.color}-light rounded-full`}
                                      style={{ width: `${row.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-muted">{row.progress}%</span>
                                </div>
                              </td>
                              <td className="py-4 text-right">
                                <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted hover:text-white-primary transition-colors">
                                  <ArrowUpRight className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="hidden lg:block absolute -right-4 top-1/4 animate-float" style={{ animationDelay: '1s' }}>
            <div className="p-4 rounded-2xl bg-graphite border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white-primary">Workflow completed</p>
                  <p className="text-xs text-muted">2 seconds ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block absolute -left-4 bottom-1/4 animate-float" style={{ animationDelay: '2s' }}>
            <div className="p-4 rounded-2xl bg-graphite border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white-primary">AI Task Generated</p>
                  <p className="text-xs text-muted">Auto-prioritized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURES SECTION
   ========================================================= */

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Performance',
    description: 'Built on a distributed edge network with sub-50ms response times. Your team moves fast—we keep up.',
    gradient: 'from-yellow-500/20 to-orange-500/10',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Native AI that learns your workflows. Smart suggestions, automated tasks, and predictive insights.',
    gradient: 'from-purple-500/20 to-indigo-500/10',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-light',
    bgColor: 'bg-purple/10',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified. End-to-end encryption, SSO, advanced permissions, and audit logs.',
    gradient: 'from-green-500/20 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Visual workflow builder with triggers, conditions, and actions. No code required.',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Globe,
    title: 'Real-Time Collaboration',
    description: 'Presence indicators, live cursors, instant sync, and seamless handoffs across timezones.',
    gradient: 'from-pink-500/20 to-rose-500/10',
    borderColor: 'border-pink-500/20',
    iconColor: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Custom dashboards, funnel analysis, cohort tracking, and exportable reports.',
    gradient: 'from-cyan-500/20 to-teal-500/10',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
];

function FeaturesSection() {
  const { ref, isInView } = useInView();

  return (
    <Section id="features" className="noise-bg">
      <SectionHeader
        badge="Features"
        title="Everything you need to ship with confidence"
        description="A comprehensive toolkit designed by engineers who understand what it takes to build world-class products."
      />
      
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`group relative p-7 md:p-8 rounded-[20px] bg-graphite/50 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 ${
              isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative">
              <div className={`inline-flex p-3 rounded-2xl ${feature.bgColor} mb-5`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-white-primary mb-3 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================
   BENEFITS SECTION
   ========================================================= */

function BenefitsSection() {
  const benefits = [
    {
      stat: '10x',
      label: 'Faster Shipping',
      description: 'Teams report shipping products 10× faster after switching to Nexus.'
    },
    {
      stat: '89%',
      label: 'Time Saved',
      description: 'Average reduction in manual work through intelligent automation.'
    },
    {
      stat: '99.99%',
      label: 'Uptime SLA',
      description: 'Enterprise-grade reliability with redundant infrastructure globally.'
    },
    {
      stat: '<50ms',
      label: 'Response Time',
      description: 'Blazing-fast performance across all regions and devices.'
    },
  ];

  return (
    <Section className="aurora-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-medium tracking-wide uppercase mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            Impact & Results
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 gradient-text">
            Measurable impact from day one
          </h2>
          
          <p className="text-lg text-muted leading-relaxed mb-10">
            Don't just take our word for it. Our customers see transformative results 
            within weeks of adopting Nexus into their workflows.
          </p>
          
          <div className="space-y-6">
            {benefits.slice(0, 2).map(benefit => (
              <div key={benefit.label} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple to-cyan">
                  <AnimatedCounter value={parseInt(benefit.stat.replace(/[^0-9]/g, ''))} suffix={benefit.stat.replace(/[0-9]/g, '')} />
                </div>
                <div>
                  <h4 className="font-semibold text-white-primary">{benefit.label}</h4>
                  <p className="text-sm text-muted mt-0.5">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Grid */}
        <div className="grid grid-cols-2 gap-4">
          {benefits.slice(2).map(benefit => (
            <div key={benefit.label} className="p-6 rounded-[20px] bg-graphite/50 border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple to-cyan mb-2">
                <AnimatedCounter value={parseInt(benefit.stat.replace(/[^0-9]/g, ''))} suffix={benefit.stat.replace(/[0-9]/g, '')} />
              </div>
              <h4 className="font-semibold text-white-primary mb-1">{benefit.label}</h4>
              <p className="text-sm text-muted">{benefit.description}</p>
            </div>
          ))}
          
          {/* Large Feature Card */}
          <div className="col-span-2 p-6 rounded-[20px] bg-gradient-to-br from-purple/10 to-cyan/5 border border-purple/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-purple/10">
                <Activity className="w-6 h-6 text-purple-light" />
              </div>
              <div>
                <h4 className="font-semibold text-white-primary mb-1">Real-time Monitoring</h4>
                <p className="text-sm text-muted">Full observability into every workflow execution with detailed logs and metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* =========================================================
   AI CAPABILITIES SECTION
   ========================================================= */

function AICapabilitiesSection() {
  const capabilities = [
    {
      icon: Bot,
      title: 'Smart Task Generation',
      description: 'Automatically creates, prioritizes, and assigns tasks based on project context.',
    },
    {
      icon: Code2,
      title: 'Code Understanding',
      description: 'Analyzes codebases to suggest improvements and identify potential issues.',
    },
    {
      icon: MessageCircle,
      title: 'Natural Language Commands',
      description: 'Describe what you need in plain English. Nexus handles the rest.',
    },
    {
      icon: Target,
      title: 'Predictive Analytics',
      description: 'Forecast bottlenecks before they happen with ML-powered insights.',
    },
  ];

  return (
    <Section className="grid-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left - Visual */}
        <div className="relative order-2 lg:order-1">
          <div className="relative rounded-3xl bg-graphite/50 border border-white/10 p-8 glow-border">
            <div className="space-y-4">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white-primary">Nexus AI Assistant</h4>
                  <p className="text-xs text-green-400">Online • Ready to help</p>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4 min-h-[280px]">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center text-xs font-medium">
                    You
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-md bg-white/5 text-sm text-white-primary max-w-sm">
                    Create a sprint for the new auth feature and assign it to the backend team.
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple/20 flex-shrink-0 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-light" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-md bg-gradient-to-r from-purple/10 to-cyan/5 border border-purple/20 text-sm space-y-3">
                    <p className="text-white-primary">
                      ✨ I've created <strong>Sprint #24 — Auth System Overhaul</strong> with:
                    </p>
                    <ul className="space-y-1.5 text-muted text-sm pl-4">
                      <li>• 8 auto-generated tasks based on requirements</li>
                      <li>• Assigned to Backend Team (5 members)</li>
                      <li>• Estimated timeline: 2 sprints</li>
                      <li>• Dependencies mapped automatically</li>
                    </ul>
                    <div className="pt-2 flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-purple text-xs font-medium text-white">Confirm</button>
                      <button className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-medium text-muted">Modify</button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white-primary placeholder:text-muted focus:outline-none focus:border-purple/50 transition-colors"
                  readOnly
                />
                <button className="p-3 rounded-xl bg-purple hover:bg-purple-light transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple/20 to-cyan/20 rounded-3xl blur-xl -z-10 opacity-30" />
          </div>
        </div>
        
        {/* Right - Content */}
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light text-xs font-medium tracking-wide uppercase mb-6">
            <Brain className="w-3.5 h-3.5" />
            Built-In AI
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 gradient-text">
            AI that works alongside your team
          </h2>
          
          <p className="text-lg text-muted leading-relaxed mb-10">
            Not just another chatbot. Nexus AI deeply integrates with your workflows, 
            understanding context and taking action—not just answering questions.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map(capability => (
              <div key={capability.title} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300">
                <capability.icon className="w-5 h-5 text-purple-light mb-3" />
                <h4 className="font-semibold text-white-primary mb-1">{capability.title}</h4>
                <p className="text-sm text-muted">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* =========================================================
   INTEGRATIONS SECTION
   ========================================================= */

const integrations = [
  { name: 'GitHub', category: 'Development' },
  { name: 'Slack', category: 'Communication' },
  { name: 'Jira', category: 'Project Management' },
  { name: 'Figma', category: 'Design' },
  { name: 'Notion', category: 'Documentation' },
  { name: 'Linear', category: 'Issue Tracking' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Datadog', category: 'Monitoring' },
  { name: 'Segment', category: 'Analytics' },
  { name: 'SendGrid', category: 'Email' },
  { name: 'Twilio', category: 'Communication' },
];

function IntegrationsSection() {
  return (
    <Section id="integrations" className="noise-bg">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-medium tracking-wide uppercase mb-6">
          <Plug className="w-3.5 h-3.5" />
          Integrations
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 gradient-text">
          Connects with tools you already love
        </h2>
        <p className="text-lg text-muted leading-relaxed">
          200+ integrations available. Set up connections in minutes, not days. 
          Sync data bi-directionally across your entire stack.
        </p>
      </div>
      
      {/* Integration Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {integrations.map((integration, index) => (
          <div
            key={integration.name}
            className="group flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl bg-graphite/50 border border-white/5 hover:border-white/15 hover:bg-graphite/80 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Blocks className="w-5 h-5 text-muted group-hover:text-white-primary transition-colors" />
            </div>
            <span className="text-sm font-medium text-white-primary">{integration.name}</span>
            <span className="text-[11px] text-muted-dark mt-0.5">{integration.category}</span>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center gap-2 text-sm font-medium text-purple-light hover:text-purple transition-colors">
          Explore all 200+ integrations
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Section>
  );
}

/* =========================================================
   TESTIMONIALS SECTION
   ========================================================= */

const testimonials = [
  {
    quote: "Nexus transformed how our team ships software. We went from monthly releases to weekly—all while maintaining quality.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "RapidScale",
    avatar: "SC",
  },
  {
    quote: "The AI capabilities alone are worth the investment. It's like having an extra senior engineer who never sleeps.",
    author: "Marcus Johnson",
    role: "CTO",
    company: "FlowState",
    avatar: "MJ",
  },
  {
    quote: "We evaluated 12 platforms. Nexus won because it actually understood modern workflows instead of forcing us to adapt.",
    author: "Emily Rodriguez",
    role: "Head of Product",
    company: "Luminary",
    avatar: "ER",
  },
];

function TestimonialsSection() {
  return (
    <Section className="aurora-bg">
      <SectionHeader
        badge="Testimonials"
        title="Loved by teams worldwide"
        description="Join thousands of high-performing teams who've made Nexus their command center."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.author}
            className="group relative p-8 rounded-[20px] bg-graphite/50 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Star Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <p className="text-white-primary text-[15px] leading-relaxed mb-8">
              "{testimonial.quote}"
            </p>
            
            <footer className="flex items-center gap-4 pt-6 border-t border-white/5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple to-cyan flex items-center justify-center text-sm font-bold text-white">
                {testimonial.avatar}
              </div>
              <div>
                <cite className="not-italic font-semibold text-white-primary block">
                  {testimonial.author}
                </cite>
                <span className="text-sm text-muted">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================
   PRICING SECTION
   ========================================================= */

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for individuals and small projects getting started.',
    features: [
      'Up to 5 team members',
      '10 active projects',
      'Basic automations',
      'Community support',
      '7-day history retention',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams that need more power and flexibility.',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Advanced AI features',
      'Priority support',
      'Unlimited history',
      'Custom integrations',
      'SSO authentication',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring security, compliance, and dedicated support.',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'SLA guarantees',
      'Custom contracts',
      'On-premise deployment option',
      'Advanced security controls',
      'Audit logs & compliance',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

function PricingSection() {
  return (
    <Section id="pricing" className="noise-bg">
      <SectionHeader
        badge="Pricing"
        title="Simple, transparent pricing"
        description="Start free. Scale as you grow. No hidden fees, no surprises."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-[20px] border transition-all duration-500 hover:-translate-y-1 ${
              plan.popular
                ? 'bg-gradient-to-b from-purple/10 to-charcoal border-purple/30 shadow-xl shadow-purple/10'
                : 'bg-graphite/50 border-white/5 hover:border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            
            <header className="mb-8">
              <h3 className="text-lg font-semibold text-white-primary mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white-primary">{plan.price}</span>
                {plan.period && <span className="text-muted">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted mt-3">{plan.description}</p>
            </header>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full py-3.5 px-6 rounded-[18px] font-semibold text-sm transition-all duration-300 ${
                plan.popular
                  ? 'bg-purple hover:bg-purple-light text-white hover:shadow-lg hover:shadow-purple/25'
                  : 'bg-white/5 hover:bg-white/10 text-white-primary border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =========================================================
   FAQ SECTION
   ========================================================= */

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'Start with a 14-day free trial on Pro. No credit card required. After your trial ends, choose the plan that fits—or continue with our generous free tier.',
  },
  {
    question: 'What happens when my trial ends?',
    answer: 'Your workspace remains intact. You can upgrade to Pro to keep all features, or switch to Starter which includes core functionality for free.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely. Upgrade or downgrade anytime. Changes take effect immediately and billing is prorated accordingly.',
  },
  {
    question: 'How secure is my data?',
    answer: 'Security is foundational. We\'re SOC 2 Type II certified, GDPR compliant, use AES-256 encryption at rest and TLS 1.3 in transit. Enterprise plans offer additional controls.',
  },
  {
    question: 'Do you offer discounts?',
    answer: 'Yes! We offer 20% off for annual billing, and additional discounts for startups, nonprofits, and educational institutions.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'All plans include documentation and community forums. Pro adds email support with 24-hour response times. Enterprise gets a dedicated success manager and phone support.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="grid-bg">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          badge="FAQ"
          title="Common questions"
          description="Everything you need to know about Nexus. Can't find what you're looking for? Reach out to our team."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-graphite/50 border border-white/5 overflow-hidden transition-colors hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-white-primary pr-8">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <p className="px-6 pb-6 text-muted leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* =========================================================
   CTA BANNER
   ========================================================= */

function CTABanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/[0.08] rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted mb-8">
          <Rocket className="w-4 h-4" />
          Start building in minutes
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 gradient-text">
          Ready to transform how your team works?
        </h2>
        
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of forward-thinking teams already using Nexus to ship 
          faster, collaborate better, and build remarkable products.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton icon={ArrowRight} className="!px-8 !py-4 !text-base !text-lg">
            Start Free Today
          </PrimaryButton>
          <SecondaryButton icon={Headphones} className="!px-8 !py-4 !text-base">
            Talk to Sales
          </SecondaryButton>
        </div>
        
        <p className="mt-6 text-sm text-muted-dark">
          No credit card required • Free forever plan • Cancel anytime
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
    Resources: ['Documentation', 'API Reference', 'Guides', 'Blog', 'Community'],
    Company: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security', 'Compliance', 'Cookies'],
  };

  return (
    <footer className="relative pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white-primary">Nexus</span>
            </a>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-[200px]">
              The intelligent platform for modern teams who ship great products.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-white-primary transition-colors"
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white-primary mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-white-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-sm text-muted-dark">
            © {new Date().getFullYear()} Nexus Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="inline-flex items-center gap-2 text-sm text-muted hover:text-white-primary transition-colors">
              <Globe className="w-4 h-4" />
              English (US)
            </button>
            <button className="flex items-center gap-2 text-sm text-muted hover:text-white-primary transition-colors">
              <Settings className="w-4 h-4" />
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   ROCKET ICON FOR CTA
   ========================================================= */
function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

/* =========================================================
   MAIN APP COMPONENT
   ========================================================= */

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal text-white-primary antialiased overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ProductPreview />
        <FeaturesSection />
        <BenefitsSection />
        <AICapabilitiesSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
