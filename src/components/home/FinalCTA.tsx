import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function FinalCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const headlineLines = ["LET'S BUILD", 'SOMETHING', 'THAT MOVES.'];

  const microSteps = [
    { num: '01', text: 'TELL US' },
    { num: '02', text: 'WE PLAN' },
    { num: '03', text: 'WE BUILD' },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 bg-brand-offwhite border-t border-brand-beige overflow-hidden select-none"
    >
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end justify-between">
          {/* LEFT: Eyebrow, Headline, Supporting Text */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-brand-olive">
                READY WHEN YOU ARE
              </span>
              <div className="h-[1px] w-10 bg-brand-beige" />
            </motion.div>

            {/* Line-by-Line Headline */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.95] tracking-tight text-neutral-900">
              {headlineLines.map((line, idx) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: prefersReducedMotion ? 0 : 0.1 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      'block',
                      idx === 2 ? 'text-brand-olive italic font-semibold' : ''
                    )}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Supporting Text */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg pt-2"
            >
              Tell us what you're building, what you need, and where you want to go. We'll take it
              from there.
            </motion.p>
          </div>

          {/* RIGHT: Prominent CTA with Abstract Geometric Visual & Micro Process */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end space-y-8 relative">
            {/* Abstract Animated Geometric Rings / Visual (Behind / Around CTA) */}
            <div
              className={cn(
                'absolute -top-16 -right-12 sm:-top-24 sm:-right-20 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none transition-transform duration-700 ease-out',
                isHovered && !prefersReducedMotion ? 'scale-110' : 'scale-100'
              )}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 400 400"
                className={cn(
                  'w-full h-full text-brand-beige',
                  !prefersReducedMotion && 'animate-[spin_60s_linear_infinite]'
                )}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outermost expanding orbital ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  className="opacity-40"
                />
                {/* Mid concentric ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="135"
                  stroke="#8B9A6E"
                  strokeWidth="1"
                  className="opacity-30"
                />
                {/* Inner geometric progress path */}
                <circle
                  cx="200"
                  cy="200"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 6"
                  className="opacity-50"
                />
                {/* Crosshairs & tangent markers */}
                <line x1="200" y1="10" x2="200" y2="40" stroke="#8B9A6E" strokeWidth="1.5" className="opacity-40" />
                <line x1="200" y1="360" x2="200" y2="390" stroke="#8B9A6E" strokeWidth="1.5" className="opacity-40" />
                <line x1="10" y1="200" x2="40" y2="200" stroke="#8B9A6E" strokeWidth="1.5" className="opacity-40" />
                <line x1="360" y1="200" x2="390" y2="200" stroke="#8B9A6E" strokeWidth="1.5" className="opacity-40" />
              </svg>
            </div>

            {/* Substantial CTA Button */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="w-full sm:w-auto relative z-10"
            >
              <Link
                to="/start-project"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex sm:inline-flex items-center justify-between sm:justify-center gap-6 px-8 py-5 sm:px-11 sm:py-6 bg-brand-olive text-neutral-900 rounded-full font-display font-bold text-sm sm:text-base tracking-[0.2em] uppercase transition-all duration-400 ease-out hover:-translate-y-1.5 shadow-2xl shadow-brand-olive/25 hover:shadow-brand-olive/40 hover:bg-[#97A779] w-full sm:w-auto"
              >
                <span>START A PROJECT</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-400 ease-out group-hover:translate-x-2 shrink-0 text-neutral-900"
                />
              </Link>
            </motion.div>

            {/* Micro Process: Small editorial labels */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-2 z-10"
            >
              {microSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-neutral-500"
                >
                  <span className="text-brand-olive font-extrabold">{step.num}</span>
                  <span className="text-neutral-300">—</span>
                  <span className="text-neutral-700">{step.text}</span>
                  {idx < microSteps.length - 1 && (
                    <span className="hidden sm:inline text-neutral-300 ml-4 font-normal">/</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
