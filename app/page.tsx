"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, ChevronRight, Sparkles, MessageSquare, User, Trophy, Award, Video, Heart } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; top: number; duration: number; delay: number; color: string }[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  useEffect(() => {
    setIsMounted(true);
    
    const colors = ['bg-[#d946ef]', 'bg-[#06b6d4]', 'bg-[#3b82f6]', 'bg-[#8b5cf6]'];
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Global Click Sound (Retro 8-bit Coin/Beep)
    const handleGlobalClick = () => {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleGlobalClick);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleGlobalClick);
    };
  }, []);

  // ANIMASI SCROLL (Berulang / once: false)
  const fadeUp = { hidden: { opacity: 0, y: 40, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } };
  const popBlur = { hidden: { opacity: 0, scale: 0.8, filter: "blur(15px)", y: 40 }, visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 } } };
  const slideBlurLeft = { hidden: { opacity: 0, x: -60, filter: "blur(10px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } };
  const slideBlurRight = { hidden: { opacity: 0, x: 60, filter: "blur(10px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  const technicalProficiency = [
    { name: "Python / Data Science & ML", percentage: 95, color: "bg-[#3b82f6]" },
    { name: "Laravel / PHP", percentage: 92, color: "bg-[#8b5cf6]" },
    { name: "Next.js / React", percentage: 88, color: "bg-[#06b6d4]" },
    { name: "Trading Automation (MQL5)", percentage: 85, color: "bg-[#10b981]" },
    { name: "Video Editing & Production", percentage: 90, color: "bg-[#f59e0b]" },
    { name: "Live Streaming Config", percentage: 85, color: "bg-[#d946ef]" },
  ];

  const techCategories = [
    { title: "Frontend & Web", skills: ["Next.js", "React", "Tailwind CSS", "JavaScript", "HTML/CSS"] },
    { title: "Backend & Database", skills: ["Laravel", "PHP", "MySQL", "PostgreSQL", "Node.js"] },
    { title: "Data & AI", skills: ["Python", "TensorFlow", "Scikit-Learn", "Pandas", "Jupyter"] },
    { title: "Media, Editor & Streaming", skills: ["Premiere Pro", "After Effects", "OBS Studio", "CapCut", "Figma"] }
  ];

  const workExperience = [
    { year: "2025 - Present", title: "Operator SIKS-NG", company: "Pemerintah Pekon Gadingrejo", description: "Mengelola dan memvalidasi basis data kesejahteraan sosial masyarakat secara real-time. Bertanggung jawab atas integrasi data untuk memastikan distribusi program pemerintah yang akurat dan transparan, serta menginisiasi pengembangan sistem layanan digital mandiri (SIPADES) untuk efisiensi birokrasi desa." },
    { year: "2024 - 2025", title: "IT Support & Operator SID", company: "Pemerintah Pekon Gadingrejo", description: "Memastikan keandalan infrastruktur IT desa dan mengelola operasional Sistem Informasi Desa (SID). Mengarahkan strategi komunikasi digital melalui manajemen media sosial resmi, serta merancang dokumen administratif esensial untuk memfasilitasi kolaborasi dengan perangkat desa, kelompok masyarakat (Pokmas), dan program mahasiswa (KKN)." },
    { year: "2023 - 2024", title: "Freelance Developer", company: "Multiple Projects", description: "Merancang dan mengembangkan berbagai aplikasi web responsif serta sistem manajemen basis data menggunakan tumpukan teknologi modern seperti PHP, Laravel, dan MySQL. Selain pengembangan web, secara aktif membangun dan menguji algoritma otomatisasi trading (Expert Advisor) berbasis MQL5." }
  ];

  const awards = [
    { title: "Juara 2 Lomba LKS", desc: "Bidang IT Software Solution for Business", icon: Trophy, color: "text-[#d946ef]", bg: "bg-[#d946ef]/10" },
    { title: "Juara 3 Lomba NLFRC", desc: "National Level Competition", icon: Trophy, color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10" },
    { title: "Bootcamp Coding Certificate", desc: "Diselenggarakan oleh ID Network", icon: Award, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
    { title: "Workshop IoT Certificate", desc: "Diselenggarakan oleh ID Network", icon: Award, color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
    { title: "Juara 2 FLS2N", desc: "Bidang Film Dokumenter", icon: Video, color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
  ];

  return (
    <div className="bg-[#05050a] min-h-screen text-white font-sans selection:bg-[#d946ef] selection:text-white scroll-smooth relative overflow-hidden cursor-default">
      
      {/* GLOBAL FIXED HUD: PIXEL ADVENTURE RPG GAME */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 w-[260px] bg-[#05050a]/90 backdrop-blur-md border-[2px] border-[#06b6d4]/40 hover:border-[#d946ef] rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] z-[90] hidden lg:block overflow-hidden transition-all duration-300"
      >
        <div className="flex justify-between items-center bg-[#06b6d4]/10 p-2 border-b border-[#06b6d4]/40">
          <span className="text-[10px] font-mono text-[#06b6d4] font-bold tracking-widest">LVL: 99</span>
          <span className="text-[10px] font-mono text-white animate-pulse tracking-widest">QUEST ACTIVE</span>
        </div>
        
        {/* Arena Petualangan */}
        <div className="relative h-24 w-full bg-[#0a0f1a] overflow-hidden flex flex-col justify-end border-b-2 border-[#3b82f6]/50">
          {/* Awan Berjalan */}
          <motion.div animate={{ x: [0, -200] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-2 left-10 text-white/10 flex gap-12">
            <svg width="30" height="15" viewBox="0 0 30 15" fill="currentColor"><path d="M5,10 h5 v-5 h5 v-5 h5 v5 h5 v5 h5 v5 h-30 z"/></svg>
            <svg width="20" height="10" viewBox="0 0 30 15" fill="currentColor"><path d="M5,10 h5 v-5 h5 v-5 h5 v5 h5 v5 h5 v5 h-30 z"/></svg>
          </motion.div>
          
          {/* Tanah/Rumput Bergerak (Efek berjalan) */}
          <motion.div animate={{ x: [0, -30] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} className="w-[200%] h-2 bg-gradient-to-r from-[#10b981]/20 to-[#059669]/40 border-t border-[#10b981]/50 flex pattern-dots"></motion.div>
          
          {/* Ksatria Pixel (Hero Walking) */}
          <motion.div 
            animate={{ y: [0, -4, 0] }} 
            transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-2 left-6 text-[#06b6d4]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" className="drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
              {/* Pedang */}
              <path d="M17,4 h2 v10 h-2 z" className="text-[#f59e0b]" />
              {/* Badan Ksatria */}
              <path d="M9,2 h4 v4 h-4 z M7,6 h8 v6 h-8 z M9,12 h2 v6 h-2 z M11,12 h2 v6 h-2 z M15,8 h4 v2 h-4 z" />
            </svg>
          </motion.div>

          {/* Monster Slime (Enemy Approaching) */}
          <motion.div 
            animate={{ x: [250, -50], y: [0, -2, 0] }} 
            transition={{ x: { duration: 3.5, repeat: Infinity, ease: "linear" }, y: { duration: 0.4, repeat: Infinity, ease: "linear" } }}
            className="absolute bottom-2 right-0 text-[#d946ef]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" className="drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
              <path d="M7,8 h10 v4 h-10 z M5,12 h14 v8 h-14 z M9,4 h6 v4 h-6 z" opacity="0.8" />
              {/* Mata Slime */}
              <path d="M7,14 h2 v2 h-2 z M15,14 h2 v2 h-2 z" fill="#05050a" />
            </svg>
          </motion.div>
        </div>

        {/* Status Bar (HP & EXP) */}
        <div className="p-3 bg-[#05050a] flex justify-between items-center border-t border-white/5">
           <div className="w-[45%]">
             <div className="text-[8px] text-[#10b981] font-mono mb-1 tracking-wider">HP 999/999</div>
             <div className="w-full h-1.5 bg-[#0f0f15] border border-white/10 rounded-full overflow-hidden">
               <div className="w-full h-full bg-[#10b981] shadow-[0_0_5px_#10b981]"></div>
             </div>
           </div>
           <div className="w-[45%]">
             <div className="text-[8px] text-[#f59e0b] font-mono mb-1 tracking-wider">EXP</div>
             <div className="w-full h-1.5 bg-[#0f0f15] border border-white/10 rounded-full overflow-hidden">
               <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="h-full bg-[#f59e0b] shadow-[0_0_5px_#f59e0b]"></motion.div>
             </div>
           </div>
        </div>
      </motion.div>

      {/* ANIMATED CUSTOM CURSOR */}
      {isMounted && (
        <>
          <motion.div className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#06b6d4] rounded-full pointer-events-none z-[100] shadow-[0_0_10px_#06b6d4] hidden md:block" animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }} />
          <motion.div className="fixed top-0 left-0 w-2 h-2 bg-[#d946ef] rounded-full pointer-events-none z-[100] shadow-[0_0_10px_#d946ef] hidden md:block" animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }} transition={{ type: "spring", stiffness: 500, damping: 20, mass: 0.1 }} />
        </>
      )}

      <motion.div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center" animate={{ x: isMounted ? (mousePosition.x - window.innerWidth / 2) * -0.02 : 0, y: isMounted ? (mousePosition.y - window.innerHeight / 2) * -0.02 : 0 }} transition={{ type: "spring", stiffness: 100, damping: 30 }}>
        <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full blur-[1px] opacity-50 scale-150"></div>
        <div className="absolute w-[1200px] h-[1200px] border border-white/5 rounded-full blur-[2px] opacity-30"></div>
        {particles.map((p) => (
          <motion.div key={p.id} className={`absolute ${p.color} opacity-40 shadow-[0_0_10px_currentColor]`} style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }} animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], opacity: [0.1, 0.6, 0.1], rotate: [0, 180, 360] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
        ))}
      </motion.div>

      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 w-full z-50 bg-[#05050a]/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="#home" className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4] cursor-none">Portfolio</Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link href="#home" className="hover:text-white transition-colors cursor-none">Home</Link>
            <Link href="#about" className="hover:text-white transition-colors cursor-none">About</Link>
            <Link href="#skills" className="hover:text-white transition-colors cursor-none">Skills</Link>
            <Link href="#experience" className="hover:text-white transition-colors cursor-none">Experience</Link>
            <Link href="#certifications" className="hover:text-white transition-colors cursor-none">Certifications</Link>
            <Link href="#contact" className="hover:text-white transition-colors cursor-none">Contact</Link>
          </div>
        </div>
      </motion.nav>

      <main id="home" className="relative min-h-screen flex flex-col items-center justify-center p-6 pt-20 z-10">
        <motion.div animate={{ x: isMounted ? (mousePosition.x - window.innerWidth / 2) * -0.05 : 0, y: isMounted ? (mousePosition.y - window.innerHeight / 2) * -0.05 : 0 }} transition={{ type: "spring", stiffness: 100, damping: 30 }} className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[400px] bg-[#d946ef]/15 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[400px] h-[200px] bg-[#06b6d4]/10 rounded-full blur-[120px]"></div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center w-full max-w-4xl mt-10 relative flex flex-col items-center">
          <motion.div variants={popBlur} className="mb-6">
            <div className="px-5 py-2 rounded-full border border-[#d946ef]/40 bg-[#d946ef]/5 shadow-[0_0_20px_rgba(217,70,239,0.2)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-[#06b6d4] text-xs md:text-sm font-medium tracking-wide">Available for Work & Freelance</span>
            </div>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[#d946ef] font-medium text-lg md:text-xl mb-4 tracking-wide">Hello, I&apos;m</motion.p>
          <motion.h1 variants={popBlur} className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_0_40px_rgba(217,70,239,0.5)]">Dias Bayu</motion.h1>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#3b82f6]">Full Stack & Data Specialist</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-300 text-sm md:text-base mx-auto mb-10 max-w-2xl leading-relaxed font-light">Building large-scale <span className="text-[#d946ef]">web applications</span>, <span className="text-[#d946ef]">AI integrations</span>, and automated <span className="text-[#d946ef]">trading solutions</span>. Skilled in Next.js, Laravel, Python, and Content Production.</motion.p>
          
          <motion.div variants={fadeUp} className="flex gap-4 mb-10">
            <a href="https://github.com/Diasbayu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-[#0f0f15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#d946ef] hover:border-[#d946ef]/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all cursor-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://instagram.com/diassbayu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-[#0f0f15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#d946ef] hover:border-[#d946ef]/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all cursor-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/62895327022005" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-[#0f0f15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#d946ef] hover:border-[#d946ef]/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all cursor-none">
              <MessageSquare className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#about" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d946ef] to-[#06b6d4] text-white font-semibold transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] cursor-none">
              More About Me <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="px-8 py-3.5 rounded-full border border-white/20 hover:border-[#d946ef]/60 text-white font-medium transition-colors bg-[#05050a]/50 cursor-none">
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        </motion.div>
      </main>

      <section id="about" className="relative py-32 px-6 max-w-7xl mx-auto z-10 border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={popBlur} className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4]">Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d946ef] to-[#06b6d4] mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={popBlur} className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-64 h-80">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#d946ef] rounded-full shadow-[0_0_20px_#d946ef] z-20"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-[#06b6d4] rounded-full shadow-[0_0_20px_#06b6d4] z-20"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden p-[3px]">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-[#d946ef] to-[#06b6d4] opacity-80" />
                <div className="w-full h-full bg-[#05050a] rounded-[13px] overflow-hidden relative flex items-center justify-center group z-10">
                  <div className="absolute inset-0 bg-[#0f0f15] flex flex-col items-center justify-center text-gray-500 z-0">
                    <User className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-[11px]">Memuat foto profil...</span>
                  </div>
                  <img src="/profil dias jawa.jpeg" alt="Dias Bayu" className="w-full h-full object-cover relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={staggerContainer} className="lg:col-span-8 text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
            <motion.p variants={slideBlurRight}>Hi! I&apos;m <span className="text-white font-bold">Dias Bayu Danuarta</span>, seorang Tech Enthusiast dari Lampung, Indonesia. Saya menggabungkan logika pemrograman dengan kreativitas visual untuk membangun ekosistem digital yang utuh.</motion.p>
            <motion.p variants={slideBlurRight}>Saya memiliki keahlian mendalam sebagai <span className="text-[#d946ef] font-medium">Full Stack Developer</span> dan <span className="text-[#06b6d4] font-medium">Data Scientist / ML Engineer</span>. Mulai dari merancang arsitektur website yang tangguh, melatih model kecerdasan buatan (AI), hingga meracik algoritma Trading Automation.</motion.p>
            <motion.p variants={slideBlurRight}>Di luar pengkodean murni, saya juga seorang <span className="text-[#f59e0b] font-medium">Video Editor</span> dan <span className="text-[#10b981] font-medium">Game Streamer</span>. Saat ini, semua keterampilan ini saya dedikasikan juga untuk mendorong digitalisasi pelayanan di Pemerintah Desa Gadingrejo.</motion.p>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="relative py-32 px-6 max-w-7xl mx-auto z-10 border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={popBlur} className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4]">Skills</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d946ef] to-[#06b6d4] mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer} className="space-y-8">
            <h3 className="text-2xl font-semibold mb-8 text-white">Technical Proficiency</h3>
            {technicalProficiency.map((skill, index) => (
              <motion.div key={index} variants={slideBlurLeft} className="w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-[#0f0f15] rounded-full h-2.5 border border-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${skill.percentage}%` }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    className={`h-full rounded-full ${skill.color} shadow-[0_0_10px_currentColor] relative`}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 rounded-full blur-[2px]"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer} className="space-y-6">
            <h3 className="text-2xl font-semibold mb-8 text-white">Technologies I Work With</h3>
            {techCategories.map((category, index) => (
              <motion.div key={index} variants={popBlur} className="bg-[#0f0f15]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#d946ef]/30 transition-colors">
                <h4 className="text-[#06b6d4] font-medium mb-4">{category.title}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-[#05050a] border border-white/5 rounded-full text-sm text-gray-300 shadow-inner cursor-default transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="experience" className="relative py-32 px-6 max-w-5xl mx-auto border-t border-white/5 z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={popBlur} className="mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4]">Experience</span></h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d946ef] via-[#3b82f6] to-transparent transform md:-translate-x-1/2"></div>
          <div className="flex flex-col space-y-16">
            {workExperience.map((item, index) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={index % 2 === 0 ? slideBlurLeft : slideBlurRight} className={`flex flex-col md:flex-row items-start relative w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-[15px] md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#05050a] border-2 border-[#d946ef] shadow-[0_0_15px_#d946ef] mt-6 z-10"></div>
                <div className={`w-full pl-12 md:pl-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className="bg-[#0f0f15]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 hover:border-[#d946ef]/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all">
                    <p className="text-[#d946ef] font-mono text-sm mb-2">{item.year}</p>
                    <h4 className="text-2xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[#f59e0b] text-sm md:text-base font-medium mb-4">{item.company}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="relative py-32 px-6 max-w-6xl mx-auto border-t border-white/5 z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={popBlur} className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4]">Awards</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d946ef] to-[#06b6d4] mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div key={index} variants={popBlur} whileHover={{ y: -10 }} className="bg-[#0f0f15]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-[#d946ef]/30 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] transition-all group">
              <div className={`w-14 h-14 rounded-xl ${award.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <award.icon className={`w-7 h-7 ${award.color}`} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{award.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{award.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer id="contact" className="relative border-t border-white/5 bg-[#05050a] pt-24 pb-8 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={slideBlurLeft}>
              <h3 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#06b6d4] mb-6">Portfolio</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Building digital experiences with passion and precision. Let&apos;s create something amazing together.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={popBlur}>
              <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                <Link href="#home" className="text-gray-400 hover:text-white text-sm transition-colors cursor-none">Home</Link>
                <Link href="#about" className="text-gray-400 hover:text-white text-sm transition-colors cursor-none">About</Link>
                <Link href="#skills" className="text-gray-400 hover:text-white text-sm transition-colors cursor-none">Skills</Link>
                <Link href="#experience" className="text-gray-400 hover:text-white text-sm transition-colors cursor-none">Experience</Link>
                <Link href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors cursor-none">Contact</Link>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={slideBlurRight}>
              <h4 className="text-white font-semibold mb-6 text-lg">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/Diasbayu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#0f0f15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#d946ef] hover:border-[#d946ef]/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all cursor-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://instagram.com/diassbayu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#0f0f15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#d946ef] hover:border-[#d946ef]/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all cursor-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://wa.me/62895327022005" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#0f0f15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#d946ef] hover:border-[#d946ef]/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all cursor-none">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={popBlur} className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              © {new Date().getFullYear()} Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Dias Bayu Danuarta
            </p>
          </motion.div>
        </div>
      </footer>

    </div>
  );
}