import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, Shield, Zap, BarChart3, SquareActivity, HeartPulse, Bone, Brain } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {


  // Stagger parent — children animate one after another
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
  };

  // Each child fades up
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  // Cards stagger separately (triggered by scroll)
  const cardStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const cardItem = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const features = [
    { Icon: Shield, BgIcon: HeartPulse, title: 'Medical Privacy', desc: 'HIPAA-compliant on-device processing. Your health data never leaves your machine.', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', hoverBorder: 'hover:border-blue-200' },
    { Icon: Zap, BgIcon: Activity, title: 'Real-time AI', desc: 'Instant corrections on posture and form to ensure safe and effective recovery.', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', hoverBorder: 'hover:border-emerald-200' },
    { Icon: BarChart3, BgIcon: Brain, title: 'Clinical Metrics', desc: 'Advanced ROM, Stability, and Symmetry scores formatted for clinician review.', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', hoverBorder: 'hover:border-purple-200' },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-[#fafafa] text-[#1a1a1a] overflow-x-hidden relative">

      {/* ── Background Blurs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.04] bg-brand-primary" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.04] bg-brand-accent" />
      </div>

      {/* ── Animated Background Icon ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0.05, 0.07, 0.05],
          scale: [0.8, 1, 1.03, 1],
          rotate: [0, 0, 2, 0],
          y: [0, -12, 0, 12, 0],
        }}
        transition={{
          opacity: { duration: 2, ease: 'easeOut' },
          scale: { duration: 2, ease: 'easeOut' },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="fixed top-32 -left-16 pointer-events-none z-0"
      >
        <Activity size={450} strokeWidth={0.5} className="text-brand-primary" />
      </motion.div>

      {/* ════════════════════════════════════════════════ */}
      {/* ── Navigation ── */}
      {/* ════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 w-full max-w-[1400px] mx-auto flex justify-between items-center px-8 md:px-12 py-7"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-brand-primary shadow-xl shadow-brand-primary/20">
            <Activity size={22} />
          </div>
          <span className="text-xl font-black tracking-tighter lowercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            rehabilitation<span className="text-brand-primary">.ai</span>
          </span>
        </div>

        {/* <div className="flex items-center gap-6">
          <button
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Launch App
          </button>
        </div> */}
      </motion.nav>



      {/* ════════════════════════════════════════════════ */}
      {/* ── Hero Section ── */}
      {/* ════════════════════════════════════════════════ */}
      <main className="relative z-10 flex-1 flex flex-col items-center text-center px-6 pt-8 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[1000px] w-full flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="px-6 py-2.5 mb-10 rounded-full text-[10px] font-black uppercase tracking-[0.35em] border border-brand-primary/20 text-brand-primary bg-brand-primary/8"
          >
            Clinical-Grade Recovery Engine
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-[80px] font-black tracking-tight leading-[1.05] mb-8"
          >
            Professional
            <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-br from-brand-primary to-brand-accent">
              Physiotherapy
            </span> <br />
            at home.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl opacity-40 max-w-[680px] mb-12 font-medium leading-relaxed"
          >
            Clinical-grade motion analysis designed for surgical recovery.
            Get accurate ROM data and diagnostic feedback instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-5 w-1/2 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -6, 0],
              }}
              transition={{ 
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              onClick={onGetStarted}
              className="flex-1 px-10 py-5 bg-[#1a1a1a] text-white rounded-[28px] text-lg font-black shadow-2xl shadow-black/20 cursor-pointer flex items-center justify-center gap-3 border-none"
            >
              Get Started <ChevronRight size={22} strokeWidth={3} />
            </motion.button>

            {/* <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 px-10 py-5 bg-white text-[#1a1a1a] border-2 border-black/5 rounded-[28px] text-lg font-black hover:bg-black/3 cursor-pointer transition-colors"
            >
              View Sample
            </motion.button> */}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════ */}
        {/* ── Feature Cards ── */}
        {/* ════════════════════════════════════════════════ */}
        {/* <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-36 w-full max-w-[1100px]"
        >
          {features.map(({ Icon, BgIcon, title, desc, iconBg, iconColor, hoverBorder }, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative overflow-hidden p-10 rounded-[32px] bg-white border border-black/[0.04] shadow-sm hover:shadow-2xl ${hoverBorder} transition-all cursor-default text-left group`}
            >
              <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.12] group-hover:scale-125 transition-all duration-500 ease-out pointer-events-none">
                <BgIcon size={140} strokeWidth={0.8} className={`text-gray-400 group-hover:${iconColor} transition-colors duration-500`} />
              </div>

              <div className={`relative z-10 w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} mb-7 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={26} />
              </div>

              <h3 className="relative z-10 text-xl font-black mb-3 tracking-tight">{title}</h3>
              <p className="relative z-10 text-sm opacity-35 font-semibold leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div> */}
      </main>
    </div>
  );
}
