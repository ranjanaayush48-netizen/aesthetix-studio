import { motion } from 'motion/react';
import { CONTACT_LINK } from '@/src/lib/constants/navigation';
import { HeroScene } from '../three/HeroScene';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-offwhite pt-20">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 md:left-1/2 z-0">
        <HeroScene />
      </div>

      <div className="container-wide relative z-10 min-h-[calc(100vh-80px)] flex items-center pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="inline-block text-xs font-bold uppercase tracking-[0.4em] text-brand-olive mb-8"
          >
            Digital Studio Based in India
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
            className="text-5xl md:text-[clamp(4rem,7vw,8rem)] font-display font-bold leading-[0.9] mb-10"
          >
            WE BUILD <br />
            DIGITAL <br />
            EXPERIENCES <span className="text-brand-olive italic text-[0.8em]">THAT MOVE.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
            className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg mb-12"
          >
            Websites, e-commerce stores and custom web applications 
            designed around your business. High-end design meets 
            uncompromising performance.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a 
              href={CONTACT_LINK.href}
              className="w-full sm:w-auto px-12 py-5 bg-brand-olive text-brand-offwhite text-sm font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform text-center shadow-xl shadow-brand-olive/20"
            >
              {CONTACT_LINK.label}
            </a>
            <a 
              href="#work" 
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-neutral-800 hover:text-brand-olive transition-colors"
            >
              View Our Work
              <span className="w-10 h-[1px] bg-neutral-800 group-hover:bg-brand-olive transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-10 flex flex-col items-center gap-4 hidden lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 rotate-90 origin-left translate-x-3 mb-10">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-brand-olive to-transparent" />
      </motion.div>
    </section>
  );
}
