// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MiniGame() {
  // --- STATE UNTUK MEKANIK GAME ---
  const [slimeHP, setSlimeHP] = useState(3);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(99);
  const [isHit, setIsHit] = useState(false);

  const fadeUp = { 
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" }, 
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } 
  };

  // --- FUNGSI SAAT SLIME DISERANG (DIKLIK) ---
  const handleAttack = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah klik tembus ke background
    if (slimeHP <= 0) return;

    // Efek visual kena hit
    setIsHit(true);
    setTimeout(() => setIsHit(false), 150);

    const newHP = slimeHP - 1;
    setSlimeHP(newHP);

    // Jika slime mati
    if (newHP <= 0) {
      const newExp = exp + 35; // Tambah 35 EXP setiap kill
      if (newExp >= 100) {
        setLevel((prev) => prev + 1); // Level Up!
        setExp(0); // Reset EXP
      } else {
        setExp(newExp);
      }
    }
  };

  // --- FUNGSI RESPAWN MONSTER ---
  useEffect(() => {
    if (slimeHP <= 0) {
      const timer = setTimeout(() => {
        setSlimeHP(3); // Slime hidup lagi dengan 3 HP setelah 2 detik
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [slimeHP]);

  return (
    <motion.div 
      variants={fadeUp} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: false }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[260px] bg-[#05050a]/90 backdrop-blur-md border-[2px] border-[#06b6d4]/40 hover:border-[#d946ef] rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] z-[90] overflow-hidden transition-all duration-300 scale-75 md:scale-100 origin-bottom-right opacity-50 hover:opacity-100 md:opacity-100"
    >
      <div className="flex justify-between items-center bg-[#06b6d4]/10 p-2 border-b border-[#06b6d4]/40 relative">
        <span className="text-[10px] font-mono text-[#06b6d4] font-bold tracking-widest">LVL: {level}</span>
        
        {/* Indikator Level Up Pop-up */}
        {exp === 0 && level > 99 && (
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} transition={{ duration: 1 }} className="absolute left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#f59e0b] font-bold">
            LEVEL UP!
          </motion.span>
        )}

        <span className="text-[10px] font-mono text-white animate-pulse tracking-widest">QUEST ACTIVE</span>
      </div>
      
      {/* Arena Petualangan */}
      <div className="relative h-24 w-full bg-[#0a0f1a] overflow-hidden flex flex-col justify-end border-b-2 border-[#3b82f6]/50">
        {/* Awan */}
        <motion.div animate={{ x: [0, -200] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-2 left-10 text-white/10 flex gap-12">
          <svg width="30" height="15" viewBox="0 0 30 15" fill="currentColor"><path d="M5,10 h5 v-5 h5 v-5 h5 v5 h5 v5 h5 v5 h-30 z"/></svg>
          <svg width="20" height="10" viewBox="0 0 30 15" fill="currentColor"><path d="M5,10 h5 v-5 h5 v-5 h5 v5 h5 v5 h5 v5 h-30 z"/></svg>
        </motion.div>
        
        {/* Tanah Bergerak */}
        <motion.div animate={{ x: [0, -30] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} className="w-[200%] h-2 bg-gradient-to-r from-[#10b981]/20 to-[#059669]/40 border-t border-[#10b981]/50 flex pattern-dots"></motion.div>
        
        {/* Ksatria Pixel */}
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }} className="absolute bottom-2 left-6 text-[#06b6d4]">
          <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" className="drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
            <path d="M17,4 h2 v10 h-2 z" className="text-[#f59e0b]" />
            <path d="M9,2 h4 v4 h-4 z M7,6 h8 v6 h-8 z M9,12 h2 v6 h-2 z M11,12 h2 v6 h-2 z M15,8 h4 v2 h-4 z" />
          </svg>
        </motion.div>

        {/* Monster Slime (Interactive) */}
        <motion.div 
          animate={{ x: [250, -50] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-2 right-0 z-50"
        >
          <motion.div
            onClick={handleAttack}
            animate={{ 
              y: [0, -2, 0], 
              scale: slimeHP > 0 ? (isHit ? 0.8 : 1) : 0, 
              opacity: slimeHP > 0 ? (isHit ? 0.5 : 1) : 0 
            }}
            transition={{ y: { duration: 0.4, repeat: Infinity, ease: "linear" }, duration: 0.1 }}
            className={`text-[#d946ef] cursor-crosshair drop-shadow-[0_0_5px_rgba(217,70,239,0.8)] ${slimeHP > 0 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M7,8 h10 v4 h-10 z M5,12 h14 v8 h-14 z M9,4 h6 v4 h-6 z" opacity="0.8" />
              {/* Mata Slime */}
              {slimeHP > 0 ? (
                <path d="M7,14 h2 v2 h-2 z M15,14 h2 v2 h-2 z" fill="#05050a" />
              ) : (
                <path d="M7,14 h2 v2 h-2 z M15,14 h2 v2 h-2 z M11,16 h2 v2 h-2 z" fill="#05050a" />
              )}
            </svg>
            
            {/* HP Bar Slime */}
            {slimeHP > 0 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-200" style={{ width: `${(slimeHP / 3) * 100}%` }}></div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Status Bar (Player) */}
      <div className="p-3 bg-[#05050a] flex justify-between items-center border-t border-white/5">
         <div className="w-[45%]">
           <div className="text-[8px] text-[#10b981] font-mono mb-1 tracking-wider">HP 999/999</div>
           <div className="w-full h-1.5 bg-[#0f0f15] border border-white/10 rounded-full overflow-hidden">
             <div className="w-full h-full bg-[#10b981] shadow-[0_0_5px_#10b981]"></div>
           </div>
         </div>
         <div className="w-[45%]">
           <div className="text-[8px] text-[#f59e0b] font-mono mb-1 tracking-wider flex justify-between">
             <span>EXP</span>
             <span>{exp}%</span>
           </div>
           <div className="w-full h-1.5 bg-[#0f0f15] border border-white/10 rounded-full overflow-hidden relative">
             <motion.div 
               animate={{ width: `${exp}%` }} 
               transition={{ duration: 0.3, type: "spring" }} 
               className="absolute top-0 left-0 h-full bg-[#f59e0b] shadow-[0_0_5px_#f59e0b]"
             ></motion.div>
           </div>
         </div>
      </div>
    </motion.div>
  );
}