import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Compass, Layers, Code2, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: [string, string, string];
  icon: typeof Compass;
}

const STAGES: ProcessStage[] = [
  {
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Discovery & Strategy',
    description: 'Understand your business, goals, audience, and what the website needs to achieve.',
    details: ['Business goals', 'Audience', 'Project requirements'],
    icon: Compass,
  },
  {
    id: 'plan',
    number: '02',
    title: 'PLAN',
    subtitle: 'Structure & Direction',
    description: 'Turn the requirements into a clear structure, visual direction, and technical plan.',
    details: ['Site structure', 'Content direction', 'Technical planning'],
    icon: Layers,
  },
  {
    id: 'build',
    number: '03',
    title: 'BUILD',
    subtitle: 'Design & Development',
    description: 'Design and develop the experience with responsive layouts, thoughtful interactions, and production-ready code.',
    details: ['Design', 'Development', 'Testing'],
    icon: Code2,
  },
  {
    id: 'launch',
    number: '04',
    title: 'LAUNCH',
    subtitle: 'QA & Deployment',
    description: 'Final testing, deployment, handover, and everything needed to take your new digital experience live.',
    details: ['QA', 'Deployment', 'Handover'],
    icon: Rocket,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopTimelineRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initial state MUST be 0 (Stage 01 — DISCOVER), never 3
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReduced);

    const section = sectionRef.current;
    if (!section) return;

    // Reset to stage 0 initially
    setActiveStage(0);

    const ctx = gsap.context(() => {
      // 1. Header reveal animation
      if (headerRef.current && !prefersReduced) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Desktop Timeline & Cards scroll-based activation (NO PINNING)
      if (desktopTimelineRef.current) {
        // Initial entrance reveal: cards stagger in once
        if (!prefersReduced) {
          desktopCardsRef.current.forEach((card, idx) => {
            if (!card) return;
            gsap.fromTo(
              card,
              { opacity: 0, y: 30, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                delay: idx * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: desktopTimelineRef.current,
                  start: 'top 80%',
                  once: true,
                },
              }
            );
          });
        }

        // Scroll-driven active stage tracking across the timeline
        // Natural document scroll: 01 -> 02 -> 03 -> 04 moving down, and 04 -> 03 -> 02 -> 01 moving up
        ScrollTrigger.create({
          trigger: desktopTimelineRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          onUpdate: (self) => {
            const idx = Math.min(3, Math.max(0, Math.floor(self.progress * 4)));
            setActiveStage(idx);
          },
          onLeaveBack: () => {
            setActiveStage(0);
          },
          onLeave: () => {
            setActiveStage(3);
          },
        });
      }

      // 3. Mobile Vertical Timeline: Individual scroll triggers per card
      mobileCardsRef.current.forEach((card, idx) => {
        if (!card) return;

        if (!prefersReduced) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }

        // Activates card when entering viewport (downward: 01 -> 04, upward: 04 -> 01)
        ScrollTrigger.create({
          trigger: card,
          start: 'top 70%',
          end: 'bottom 40%',
          onEnter: () => setActiveStage(idx),
          onEnterBack: () => setActiveStage(idx),
        });
      });
    }, sectionRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-offwhite border-t border-brand-beige overflow-hidden"
    >
      <div className="container-wide">
        {/* Compact Editorial Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive">
              HOW WE WORK
            </span>
            <div className="h-[1px] w-8 bg-brand-beige" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight text-neutral-800 mb-5">
            FROM FIRST IDEA <br />
            TO FINAL <span className="text-brand-olive italic">LAUNCH.</span>
          </h2>

          <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl">
            A clear process keeps every project focused, collaborative, and moving forward.
          </p>
        </div>

        {/* Desktop: Continuous Horizontal Timeline (Controlled exclusively by scroll position) */}
        <div className="hidden lg:block relative mb-20" ref={desktopTimelineRef}>
          {/* Continuous Connecting Line */}
          <div className="relative mb-10">
            {/* Background Track */}
            <div className="h-[2px] w-full bg-brand-beige" />

            {/* Filled Progress Line based on active stage */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-brand-olive transition-all duration-500 ease-out"
              style={{
                width: isReducedMotion
                  ? '100%'
                  : `${((activeStage + 1) / STAGES.length) * 100}%`,
              }}
            />

            {/* Stage Markers positioned along the line (No click dependency) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-8 pointer-events-none">
              {STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isPassed = activeStage > idx;

                return (
                  <div
                    key={stage.id}
                    className="relative flex flex-col items-center"
                    aria-label={`Stage ${stage.number}: ${stage.title}`}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-400 ease-out bg-brand-offwhite',
                        isActive
                          ? 'border-brand-olive bg-brand-olive text-brand-offwhite scale-110 shadow-lg shadow-brand-olive/20'
                          : isPassed
                          ? 'border-brand-olive text-brand-olive scale-100'
                          : 'border-brand-beige text-neutral-400 scale-95'
                      )}
                    >
                      {isPassed ? (
                        <Check size={14} className="stroke-[3]" />
                      ) : (
                        <span className="text-[10px] font-bold tracking-tight">
                          {stage.number}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Stages Grid: Each occupies 25% of width */}
          <div className="grid grid-cols-4 gap-6 xl:gap-8">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    desktopCardsRef.current[idx] = el;
                  }}
                  className={cn(
                    'flex flex-col justify-between p-6 rounded-2xl border transition-all duration-400 ease-out select-none',
                    isActive
                      ? 'bg-brand-offwhite border-brand-olive shadow-lg shadow-brand-olive/10 -translate-y-2 opacity-100 scale-100'
                      : 'bg-brand-offwhite/60 border-brand-beige opacity-75 scale-[0.98]'
                  )}
                >
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="flex items-center justify-between pb-2 border-b border-brand-beige/60">
                      <span
                        className={cn(
                          'text-xs font-bold tracking-[0.25em] transition-colors duration-400',
                          isActive ? 'text-brand-olive' : 'text-neutral-400'
                        )}
                      >
                        {stage.number}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        STAGE
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-xl xl:text-2xl font-display font-bold text-neutral-800 tracking-tight mb-1">
                        {stage.title}
                      </h3>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-olive">
                        {stage.subtitle}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 leading-relaxed min-h-[50px]">
                      {stage.description}
                    </p>

                    {/* Detail labels */}
                    <div className="pt-2 border-t border-brand-beige/60 space-y-1.5">
                      {stage.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-700"
                        >
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full transition-colors duration-400',
                              isActive ? 'bg-brand-olive' : 'bg-neutral-300'
                            )}
                          />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Animated Visual */}
                  <div className="mt-5 pt-3 border-t border-brand-beige/60">
                    <div className="w-full h-24 rounded-xl border border-brand-beige bg-[#EEEEEE]/30 p-2 overflow-hidden flex items-center justify-center">
                      {stage.id === 'discover' && <DiscoverVisual isActive={isActive} />}
                      {stage.id === 'plan' && <PlanVisual isActive={isActive} />}
                      {stage.id === 'build' && <BuildVisual isActive={isActive} />}
                      {stage.id === 'launch' && <LaunchVisual isActive={isActive} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline (In natural document flow, scroll-activated) */}
        <div className="lg:hidden relative pl-8 space-y-8 mb-16">
          {/* Vertical Connecting Line */}
          <div className="absolute left-3 top-4 bottom-4 w-[2px] bg-brand-beige">
            <div
              className="w-full bg-brand-olive transition-all duration-500 ease-out"
              style={{
                height: isReducedMotion
                  ? '100%'
                  : `${((activeStage + 1) / STAGES.length) * 100}%`,
              }}
            />
          </div>

          {STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            const isPassed = activeStage > idx;

            return (
              <div
                key={stage.id}
                ref={(el) => {
                  mobileCardsRef.current[idx] = el;
                }}
                className="relative group"
              >
                {/* Vertical Marker */}
                <div
                  className={cn(
                    'absolute -left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-400 ease-out bg-brand-offwhite text-[9px] font-bold',
                    isActive
                      ? 'border-brand-olive bg-brand-olive text-brand-offwhite scale-110 shadow-md shadow-brand-olive/20'
                      : isPassed
                      ? 'border-brand-olive text-brand-olive scale-100'
                      : 'border-brand-beige text-neutral-400 scale-95'
                  )}
                >
                  {isPassed ? <Check size={10} className="stroke-[3]" /> : stage.number}
                </div>

                {/* Content Card */}
                <div
                  className={cn(
                    'p-5 sm:p-6 rounded-2xl border transition-all duration-400 ease-out bg-brand-offwhite',
                    isActive
                      ? 'border-brand-olive shadow-lg shadow-brand-olive/10 -translate-y-1 opacity-100 scale-100'
                      : 'border-brand-beige opacity-80 scale-[0.98]'
                  )}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-olive">
                      {stage.subtitle}
                    </span>
                    <span className="text-xs font-bold text-neutral-300">STAGE {stage.number}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-800 mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {stage.details.map((detail, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded bg-[#EEEEEE] text-[9px] font-bold uppercase tracking-wider text-neutral-700"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>

                  <div className="w-full h-24 rounded-xl border border-brand-beige bg-[#EEEEEE]/30 p-2 overflow-hidden flex items-center justify-center">
                    {stage.id === 'discover' && <DiscoverVisual isActive={isActive} />}
                    {stage.id === 'plan' && <PlanVisual isActive={isActive} />}
                    {stage.id === 'build' && <BuildVisual isActive={isActive} />}
                    {stage.id === 'launch' && <LaunchVisual isActive={isActive} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section CTA */}
        <div className="p-8 sm:p-12 md:p-14 rounded-3xl border border-brand-beige bg-brand-offwhite text-center max-w-3xl mx-auto shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive block mb-2">
            READY TO BUILD SOMETHING?
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-800 tracking-tight mb-3">
            TELL US WHAT YOU'RE WORKING ON.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto mb-6">
            Tell us what you're working on and we'll take it from there.
          </p>
          <Link
            to="/start-project"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-all shadow-xl shadow-brand-olive/20"
          >
            START A PROJECT
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// VISUAL 01: Discover Visual (Document & Strategy Composition)
// ----------------------------------------------------------------------
function DiscoverVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none">
      <div className="flex items-center justify-between pb-1 border-b border-brand-beige">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
          <span className="text-[7px] font-bold uppercase tracking-wider text-neutral-600">
            BRIEF & STRATEGY
          </span>
        </div>
        <span className="text-[6px] font-mono text-neutral-400">STAGE 01</span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              'w-3.5 h-3.5 rounded flex items-center justify-center transition-colors',
              isActive ? 'bg-brand-olive text-brand-offwhite' : 'bg-brand-beige text-neutral-500'
            )}
          >
            <Check size={9} />
          </div>
          <div className="h-1.5 w-24 bg-neutral-300 rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              'w-3.5 h-3.5 rounded flex items-center justify-center transition-colors',
              isActive ? 'bg-brand-olive text-brand-offwhite' : 'bg-brand-beige text-neutral-500'
            )}
          >
            <Check size={9} />
          </div>
          <div className="h-1.5 w-20 bg-neutral-300 rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              'w-3.5 h-3.5 rounded flex items-center justify-center transition-colors',
              isActive ? 'bg-brand-olive text-brand-offwhite' : 'bg-brand-beige text-neutral-500'
            )}
          >
            <Check size={9} />
          </div>
          <div className="h-1.5 w-28 bg-neutral-300 rounded" />
        </div>
      </div>

      <div className="flex justify-between items-center text-[6px] font-mono text-neutral-400 border-t border-brand-beige/50 pt-1">
        <span>ALIGNMENT: 100%</span>
        <span className="text-brand-olive font-bold">READY TO PLAN</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 02: Plan Visual (Wireframe & Information Architecture)
// ----------------------------------------------------------------------
function PlanVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none">
      <div className="flex items-center justify-between pb-1 border-b border-brand-beige">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
          <span className="text-[7px] font-bold uppercase tracking-wider text-neutral-600">
            SITEMAP & WIREFRAME
          </span>
        </div>
        <span className="text-[6px] font-mono text-neutral-400">STAGE 02</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 py-1">
        <div
          className={cn(
            'p-1 rounded border flex flex-col gap-1 transition-all',
            isActive ? 'border-brand-olive bg-brand-offwhite' : 'border-brand-beige bg-neutral-100/50'
          )}
        >
          <div className="h-1 w-full bg-brand-olive/40 rounded" />
          <div className="h-4 rounded bg-brand-beige/40 flex items-center justify-center text-[6px] font-mono text-neutral-500">
            HERO
          </div>
        </div>

        <div className="p-1 rounded border border-brand-beige bg-neutral-100/50 flex flex-col gap-1">
          <div className="h-1 w-3/4 bg-neutral-300 rounded" />
          <div className="h-4 rounded bg-brand-beige/40 flex items-center justify-center text-[6px] font-mono text-neutral-500">
            GRID
          </div>
        </div>

        <div className="p-1 rounded border border-brand-beige bg-neutral-100/50 flex flex-col gap-1">
          <div className="h-1 w-1/2 bg-neutral-300 rounded" />
          <div className="h-4 rounded bg-brand-beige/40 flex items-center justify-center text-[6px] font-mono text-neutral-500">
            FORM
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[6px] font-mono text-neutral-400 border-t border-brand-beige/50 pt-1">
        <span>COLUMNS: 12-GRID</span>
        <span className="text-brand-olive font-bold">APPROVED</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 03: Build Visual (Design & Code Synthesis)
// ----------------------------------------------------------------------
function BuildVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none">
      <div className="flex items-center justify-between pb-1 border-b border-brand-beige">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
          <span className="text-[7px] font-bold uppercase tracking-wider text-neutral-600">
            CODE & INTERACTIONS
          </span>
        </div>
        <span className="text-[6px] font-mono text-neutral-400">STAGE 03</span>
      </div>

      <div className="font-mono text-[6.5px] leading-relaxed p-1.5 rounded bg-brand-offwhite border border-brand-beige space-y-0.5">
        <div className="text-neutral-500">
          <span className="text-brand-olive font-bold">const</span> studio = <span className="text-neutral-800 font-bold">Aesthetix</span>();
        </div>
        <div className="text-neutral-500">
          studio.<span className="text-brand-olive font-bold">build</span>({'{'} responsive: <span className="text-neutral-800">true</span> {'}'});
        </div>
        <div className="text-neutral-400">
          // 0 TypeScript errors • 100% test pass
        </div>
      </div>

      <div className="flex justify-between items-center text-[6px] font-mono text-neutral-400 border-t border-brand-beige/50 pt-1">
        <span>REACT • TAILWIND • GSAP</span>
        <span
          className={cn(
            'font-bold transition-colors',
            isActive ? 'text-brand-olive' : 'text-neutral-400'
          )}
        >
          COMPILED
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 04: Launch Visual (QA & Production Deployment)
// ----------------------------------------------------------------------
function LaunchVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-2 select-none">
      <div className="flex items-center justify-between pb-1 border-b border-brand-beige">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-olive animate-pulse" />
          <span className="text-[7px] font-bold uppercase tracking-wider text-neutral-600">
            PRODUCTION DEPLOY
          </span>
        </div>
        <span className="text-[6px] font-mono text-neutral-400">STAGE 04</span>
      </div>

      <div className="flex items-center justify-between px-2 py-1 bg-brand-offwhite rounded border border-brand-beige">
        <div className="space-y-0.5">
          <div className="text-[7px] font-bold text-neutral-800">DOMAIN LIVE</div>
          <div className="text-[6px] font-mono text-neutral-500">SSL 256-BIT ENCRYPTED</div>
        </div>

        <div
          className={cn(
            'px-2 py-1 rounded text-[7px] font-bold font-mono uppercase tracking-wider transition-all',
            isActive
              ? 'bg-brand-olive text-brand-offwhite shadow-sm'
              : 'bg-brand-beige text-neutral-600'
          )}
        >
          100% LIVE
        </div>
      </div>

      <div className="flex justify-between items-center text-[6px] font-mono text-neutral-400 border-t border-brand-beige/50 pt-1">
        <span>LIGHTHOUSE: 99+</span>
        <span className="text-brand-olive font-bold">READY TO SCALE</span>
      </div>
    </div>
  );
}
