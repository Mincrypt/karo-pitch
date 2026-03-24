/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Briefcase, 
  Factory, 
  ShoppingBag, 
  Cpu,
  ChevronRight,
  Star,
  ExternalLink,
  ArrowUpRight,
  Target,
  BarChart3,
  Award,
  Layers,
  X,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          aria-hidden="true"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-[2.5rem] w-full max-w-lg p-8 md:p-12 shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors group focus:ring-2 focus:ring-brand-accent outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
          </button>
          <h3 id="modal-title" className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 tracking-tight">{title}</h3>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const PitchForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(onSuccess, 2500);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-brand-accent" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 mb-3">Application Received!</h4>
        <p className="text-slate-500 font-light leading-relaxed mb-8">
          Our investment committee will review your pitch and contact you within 48 hours.
        </p>
        <button 
          onClick={onSuccess}
          className="bg-brand-accent text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-brand-accent/20"
        >
          Close Window
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Startup Name</label>
        <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-brand-accent focus:bg-white outline-none transition-all font-light text-slate-900" placeholder="e.g. EcoBharat" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Founder Name</label>
        <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-brand-accent focus:bg-white outline-none transition-all font-light text-slate-900" placeholder="Your full name" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
        <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-brand-accent focus:bg-white outline-none transition-all font-light text-slate-900" placeholder="name@company.com" />
      </div>
      <button 
        disabled={status === 'submitting'}
        className="w-full bg-brand-accent text-white py-5 rounded-2xl font-bold shadow-lg shadow-brand-accent/20 hover:bg-emerald-700 transition-all disabled:opacity-50 mt-6 active:scale-[0.98]"
      >
        {status === 'submitting' ? 'Processing...' : 'Submit Pitch Deck'}
      </button>
    </form>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Sectors", href: "#sectors" },
    { name: "Investors", href: "#investors" },
    { name: "Startups", href: "#startups" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4 border-b border-slate-100' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/20 group-hover:scale-110 transition-transform">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">Karo Pitch</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm font-semibold text-slate-500 hover:text-brand-accent transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={onOpenModal}
              className="bg-brand-secondary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6 text-brand-accent" /> : <Layers className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-slate-100"
          >
            <div className="px-6 py-10 flex flex-col gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-bold text-slate-900 hover:text-brand-accent transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => { setIsOpen(false); onOpenModal(); }}
                className="w-full bg-brand-accent text-white py-5 rounded-2xl font-bold shadow-lg shadow-brand-accent/20"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-6 lg:px-12 overflow-hidden grid-pattern">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent -z-10"></div>
    <div className="max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 md:mb-8 text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-brand-accent uppercase bg-brand-accent/10 border border-brand-accent/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
          </span>
          Empowering Bharat's Founders
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-[1.05] text-gradient tracking-tight">
          Pitch to India’s <br className="hidden sm:block" />
          <span className="text-brand-accent">Elite Investors.</span>
        </h1>
        <p className="text-base md:text-xl text-slate-500 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          The most accessible startup discovery and funding platform for Bharat entrepreneurs. 
          Bridging the gap between Tier-2, Tier-3 cities and global capital.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <button 
            onClick={onOpenModal}
            className="btn-primary w-full sm:w-auto text-base md:text-lg group px-10 py-5" 
            aria-label="Apply to pitch your startup"
          >
            Apply to Pitch
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </button>
          <a 
            href="#startups"
            className="btn-secondary w-full sm:w-auto text-base md:text-lg px-10 py-5 text-center" 
            aria-label="Explore featured startups"
          >
            Explore Startups
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50"
      >
        {[
          { label: "Shortlisted", value: "500+" },
          { label: "Active Investors", value: "120+" },
          { label: "Capital Deployed", value: "₹75Cr+" },
          { label: "Cities Reached", value: "65+" },
        ].map((stat, i) => (
          <div key={i} className="p-6 md:p-8 bg-white group hover:bg-brand-accent/5 transition-colors">
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-brand-accent transition-colors">{stat.value}</div>
            <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-16 md:py-32 px-6 lg:px-12 bg-white relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] text-brand-accent uppercase bg-brand-accent/10 rounded-full">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            The Mission to <br />Support <span className="text-brand-accent italic">Bharat.</span>
          </h2>
          <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
            <p>
              Karo Pitch was born from a simple realization: talent is everywhere, but opportunity is concentrated. 
              Founders in Tier-2 and Tier-3 cities are building the backbone of India's future economy.
            </p>
            <p>
              We provide a structured, high-stakes platform where these founders can present their vision 
              directly to a curated room of investors who understand the Bharat market.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Structured Pitch Events",
              "Direct Investor Access",
              "Strategic Mentorship",
              "Bharat-First Focus"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-accent/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="text-brand-accent w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-900">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-brand-accent/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/pitch-deck/1200/1500" 
              alt="A founder confidently presenting their business pitch to a panel of attentive investors" 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
            <div className="absolute bottom-10 left-10 right-10 p-8 glass rounded-3xl">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex -space-x-3" aria-label="Investor avatars">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                      <img src={`https://i.pravatar.cc/100?u=${n+10}`} alt={`Investor profile ${n}`} />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Joined by 100+ Investors</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Process = () => (
  <section id="process" className="py-16 md:py-32 px-6 lg:px-12 bg-slate-50 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-24">
        <div className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase border border-slate-200 rounded-full">
          The Workflow
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Funding Lifecycle</h2>
        <p className="text-slate-500 max-w-xl mx-auto font-light text-sm md:text-base">A streamlined, professional process designed for efficiency and results.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 md:gap-8 relative">
        <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-slate-200 -z-10"></div>
        {[
          { icon: Zap, title: "Application", desc: "Submit your comprehensive pitch deck and business model for review." },
          { icon: ShieldCheck, title: "Shortlisting", desc: "Our analysts evaluate your startup based on market fit and scalability." },
          { icon: Users, title: "Live Pitch", desc: "Present to a closed-room panel of high-net-worth investors and VCs." },
          { icon: TrendingUp, title: "Deployment", desc: "Finalize terms, receive capital, and accelerate your growth trajectory." },
        ].map((step, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="mb-6 md:mb-8 relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white border border-slate-100 flex items-center justify-center group-hover:border-brand-accent/50 group-hover:shadow-xl group-hover:shadow-brand-accent/10 transition-all duration-500 shadow-sm">
                <step.icon className="text-slate-400 w-8 h-8 md:w-10 md:h-10 group-hover:text-brand-accent transition-colors" />
              </div>
              <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-accent text-white text-[10px] md:text-xs font-bold flex items-center justify-center shadow-lg">
                0{i + 1}
              </div>
            </div>
            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-slate-900">{step.title}</h3>
            <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed font-light">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Sectors = () => (
  <section id="sectors" className="py-16 md:py-32 px-6 lg:px-12 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-20">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold tracking-[0.2em] text-brand-accent uppercase bg-brand-accent/10 rounded-full">
            Who can apply
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Eligible Sectors</h2>
          <p className="text-slate-500 font-light text-base md:text-lg">We are sector-agnostic but have a strong preference for businesses solving real-world problems in Bharat.</p>
        </div>
      </div>
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 min-h-[500px] md:min-h-[600px]">
        <div className="md:col-span-2 md:row-span-1 p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-brand-accent/30 transition-all group hover:bg-white hover:shadow-2xl hover:shadow-brand-accent/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-7 h-7 text-brand-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">D2C & Consumer Brands</h3>
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-md">Direct-to-consumer lifestyle, essential brands, and platforms serving the next billion internet users in India.</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8 relative z-10">
            {["Fashion", "FMCG", "Wellness", "Home Decor"].map(t => (
              <span key={t} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:border-brand-accent/20 group-hover:text-brand-accent transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-brand-secondary text-white border border-slate-100 hover:border-brand-accent/30 transition-all group flex flex-col justify-between min-h-[250px] relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
              <Cpu className="w-7 h-7 text-brand-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">SaaS & DeepTech</h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">Software solutions built for global or local scale, leveraging AI and cloud infrastructure.</p>
          </div>
          <ArrowUpRight className="w-8 h-8 text-brand-accent self-end mt-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
 
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-brand-accent/30 transition-all group hover:bg-white hover:shadow-2xl hover:shadow-brand-accent/5 flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-accent/10 transition-colors">
              <Briefcase className="w-7 h-7 text-slate-400 group-hover:text-brand-accent transition-colors" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-900">MSME Modernization</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed">Modernizing traditional small and medium enterprises with tech-enabled solutions for Bharat.</p>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full mt-6 overflow-hidden">
            <div className="w-2/3 h-full bg-brand-accent group-hover:w-full transition-all duration-1000"></div>
          </div>
        </div>
 
        <div className="md:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-brand-accent/5 border border-brand-accent/10 hover:border-brand-accent/30 transition-all group hover:bg-white hover:shadow-2xl hover:shadow-brand-accent/5 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
          <div className="flex-1">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
              <Factory className="w-7 h-7 text-brand-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Manufacturing & Supply Chain</h3>
            <p className="text-slate-500 text-base font-light leading-relaxed">Innovative production, logistics, and supply chain ventures strengthening Bharat's infrastructure.</p>
            <button className="mt-8 text-brand-accent font-bold text-sm flex items-center gap-2 group/btn">
              Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg">
            <img src="https://picsum.photos/seed/factory/600/600" alt="Manufacturing" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Investors = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section id="investors" className="py-16 md:py-32 px-6 lg:px-12 bg-brand-secondary text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] rounded-full -z-0"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <div className="inline-block px-4 py-1.5 mb-8 text-[11px] font-bold tracking-[0.2em] text-brand-accent uppercase border border-brand-accent/20 rounded-full">
            Investor Network
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Meet the <br /><span className="text-brand-accent">Capital Partners.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 font-light leading-relaxed">
            Our network consists of seasoned venture capitalists, angel networks, and family offices 
            committed to the Bharat growth story.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onOpenModal}
              className="bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-brand-accent/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-secondary outline-none" 
              aria-label="Become a capital partner"
            >
              Become a Partner
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all focus:ring-2 focus:ring-white outline-none" aria-label="View our list of active investors">
              View Investor List
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Venture Capital", icon: BarChart3 },
            { label: "Angel Networks", icon: Users },
            { label: "Family Offices", icon: Briefcase },
            { label: "Strategic Partners", icon: Globe },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all"
            >
              <item.icon className="w-8 h-8 text-brand-accent mb-4" />
              <div className="text-sm font-bold text-white">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 md:mt-32 pt-16 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {[
            {
              name: "Rajesh Mehta",
              firm: "Bharat Ventures",
              role: "Managing Partner",
              quote: "Karo Pitch has become our primary source for discovering high-potential founders from Tier-2 cities. The quality of startups is exceptional.",
              image: "https://i.pravatar.cc/150?u=priya"
            },
            {
              name: "Priya Sharma",
              firm: "SeedScale Capital",
              role: "Investment Director",
              quote: "The structured format and curated selection process save us weeks of due diligence. It's the most efficient way to invest in Bharat's future.",
              image: "https://i.pravatar.cc/150?u=rajesh"
            }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 relative group hover:bg-white/[0.08] transition-all"
            >
              <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Star className="w-8 h-8 text-brand-accent" fill="currentColor" />
              </div>
              <blockquote className="text-lg md:text-xl font-light italic text-slate-300 mb-10 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">{t.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em]">{t.firm}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FeaturedStartups = () => (
  <section id="startups" className="py-16 md:py-32 px-6 lg:px-12 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 md:mb-20">
        <div>
          <div className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase border border-slate-200 rounded-full">
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Portfolio Spotlight</h2>
          <p className="text-slate-500 font-light">High-growth ventures from the Karo Pitch ecosystem.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:gap-4 transition-all group">
          View Full Directory <ArrowRight className="w-5 h-5 text-brand-accent" />
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { name: "EcoBharat", cat: "D2C", desc: "Sustainable lifestyle products sourced from rural artisans.", img: "nature", funding: "₹2.5Cr Raised" },
          { name: "TechMandi", cat: "AgriTech", desc: "Digitizing supply chains for small-scale manufacturing.", img: "tech", funding: "₹5Cr Raised" },
          { name: "BharatPay Lite", cat: "Fintech", desc: "Simplified payment solutions for Tier-3 city merchants.", img: "business", funding: "₹1.2Cr Raised" },
        ].map((startup, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer bg-slate-50/50 p-6 rounded-[2.5rem] border border-transparent hover:border-brand-accent/20 hover:bg-white hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500"
          >
            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 relative border border-slate-100 shadow-sm">
              <img 
                src={`https://picsum.photos/seed/${startup.img}/800/500`} 
                alt={startup.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                {startup.cat}
              </div>
            </div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-accent transition-colors">
                {startup.name}
              </h3>
              <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 px-3 py-1.5 rounded-full uppercase tracking-tighter">{startup.funding}</span>
            </div>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">{startup.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(j => (
                  <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${startup.name}${j}`} alt="Investor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AboutKaroStartup = () => (
  <section className="py-16 md:py-32 px-6 lg:px-12 bg-slate-50 border-y border-slate-200">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 md:p-10 rounded-[2.5rem] bg-white border border-slate-200 text-center shadow-sm"
            >
              <div className="text-3xl md:text-5xl font-bold text-brand-accent mb-2">10K+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder Stories</div>
            </motion.div>
            <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-slate-200">
              <img src="https://picsum.photos/seed/karo3/600/600" alt="Team" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="space-y-6 pt-12">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-slate-200">
              <img src="https://picsum.photos/seed/karo4/600/600" alt="Event" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 md:p-10 rounded-[2.5rem] bg-brand-accent text-white text-center shadow-lg shadow-brand-accent/20"
            >
              <div className="text-3xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Community</div>
            </motion.div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-block px-4 py-1.5 mb-8 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase border border-slate-200 rounded-full">
            The Legacy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-slate-900">
            Powered by India's Largest <br /><span className="text-brand-accent">Storytelling Platform.</span>
          </h2>
          <p className="text-lg text-slate-500 mb-8 font-light leading-relaxed">
            KaroStartup has spent half a decade documenting the grit and glory of the Indian startup ecosystem. 
            We've published thousands of stories, creating a massive repository of knowledge and a powerful community.
          </p>
          <p className="text-lg text-slate-500 mb-12 font-light leading-relaxed">
            Karo Pitch is the next logical step—moving from storytelling to capital facilitation, 
            ensuring the stories we share have the resources to become legends.
          </p>
          <a href="https://karostartup.com" className="group inline-flex items-center gap-4 text-slate-900 font-bold text-lg">
            Explore KaroStartup <ExternalLink className="w-5 h-5 text-brand-accent group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const CTA = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="py-16 md:py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 blur-[120px] rounded-full -z-10"></div>
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight text-slate-900">Ready to <span className="italic text-brand-accent">Scale?</span></h2>
      <p className="text-lg md:text-xl text-slate-500 mb-12 md:mb-16 font-light leading-relaxed">
        Join the ranks of Bharat's most ambitious founders. Your journey to the next level starts with a single pitch.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
        <button 
          onClick={onOpenModal}
          className="btn-primary w-full sm:w-auto text-lg md:text-xl px-12 py-5 md:py-6" 
          aria-label="Apply to pitch your startup now"
        >
          Apply to Pitch
        </button>
        <button 
          onClick={onOpenModal}
          className="btn-secondary w-full sm:w-auto text-lg md:text-xl px-12 py-5 md:py-6" 
          aria-label="Partner with Karo Pitch"
        >
          Partner With Us
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 lg:px-12 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
            <Rocket className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">Karo Pitch</span>
        </div>
        <div className="flex flex-wrap gap-10 text-sm font-medium text-slate-500">
          {["About", "Process", "Startups", "Privacy", "Terms"].map(item => (
            <a key={item} href="#" className="hover:text-brand-accent transition-colors">{item}</a>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <div>© 2026 KaroStartup. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-accent transition-colors focus:underline outline-none" aria-label="Visit our Twitter profile">Twitter</a>
          <a href="#" className="hover:text-brand-accent transition-colors focus:underline outline-none" aria-label="Visit our LinkedIn profile">LinkedIn</a>
          <a href="#" className="hover:text-brand-accent transition-colors focus:underline outline-none" aria-label="Visit our Instagram profile">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
);

const FAQ = () => {
  const faqs = [
    { q: "Who can apply for Karo Pitch?", a: "Early-stage founders from across India, specifically focusing on Tier-2, Tier-3 cities and Bharat, building real businesses in D2C, MSME, Tech, and Manufacturing sectors." },
    { q: "What is the selection process?", a: "Our team reviews all applications based on market potential, founder grit, and scalability. Shortlisted startups are invited for a deep-dive session before the live pitch." },
    { q: "Is there any fee to apply?", a: "No, applying to Karo Pitch is completely free. We are committed to making capital accessible to every deserving founder." },
    { q: "What kind of investors participate?", a: "We have a curated network of VCs, Angel Investors, and Family Offices who are specifically interested in the Bharat growth story." }
  ];

  return (
    <section className="py-16 md:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 font-light">Everything you need to know about the platform.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details 
              key={i}
              className="group border border-slate-100 rounded-3xl bg-slate-50 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-slate-900 group-open:text-brand-accent transition-colors">
                {faq.q}
                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-6 text-slate-500 font-light leading-relaxed">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-accent selection:text-white">
      <ScrollProgress />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <About />
        <Process />
        <Sectors />
        <Investors onOpenModal={() => setIsModalOpen(true)} />
        <FeaturedStartups />
        <AboutKaroStartup />
        <FAQ />
        <CTA onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Apply to Karo Pitch"
      >
        <PitchForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
