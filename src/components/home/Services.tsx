import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  number: string;
  title: string;
  description: string;
  accent: string;
  accentBg: string;
  accentLight: string;
  visualType: 'business' | 'ecommerce' | 'saas' | 'landing' | 'redesign';
}

const SERVICES: ServiceData[] = [
  {
    id: 'business-websites',
    number: '01',
    title: 'BUSINESS WEBSITES',
    description: 'Professional, responsive websites designed to establish your brand, communicate your value, and turn visitors into customers.',
    accent: '#8B9A6E',
    accentBg: 'rgba(139, 154, 110, 0.12)',
    accentLight: 'rgba(139, 154, 110, 0.25)',
    visualType: 'business',
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'E-COMMERCE',
    description: 'Conversion-focused online stores with polished product experiences, payments, inventory, and everything needed to sell online.',
    accent: '#B56F5A',
    accentBg: 'rgba(181, 111, 90, 0.12)',
    accentLight: 'rgba(181, 111, 90, 0.25)',
    visualType: 'ecommerce',
  },
  {
    id: 'saas-web-apps',
    number: '03',
    title: 'SAAS & WEB APPS',
    description: 'Custom web applications, dashboards, and SaaS experiences built around the way your business actually works.',
    accent: '#657A73',
    accentBg: 'rgba(101, 122, 115, 0.12)',
    accentLight: 'rgba(101, 122, 115, 0.25)',
    visualType: 'saas',
  },
  {
    id: 'landing-pages',
    number: '04',
    title: 'LANDING PAGES',
    description: 'Focused, high-impact landing pages designed for products, campaigns, launches, and lead generation.',
    accent: '#B69A68',
    accentBg: 'rgba(182, 154, 104, 0.12)',
    accentLight: 'rgba(182, 154, 104, 0.25)',
    visualType: 'landing',
  },
  {
    id: 'website-redesign',
    number: '05',
    title: 'WEBSITE REDESIGN',
    description: 'Modernize an outdated website with a cleaner interface, better usability, stronger performance, and a more professional digital presence.',
    accent: '#7C7880',
    accentBg: 'rgba(124, 120, 128, 0.12)',
    accentLight: 'rgba(124, 120, 128, 0.25)',
    visualType: 'redesign',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const isWide = window.innerWidth >= 1024;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(isWide && !isReduced);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const gallery = galleryRef.current;
    const track = trackRef.current;
    if (!gallery || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!trackRef.current || !galleryRef.current) return 0;
        return Math.max(0, trackRef.current.scrollWidth - galleryRef.current.clientWidth);
      };

      // Reset track position before initializing
      gsap.set(track, { x: 0 });

      // Pin ONLY the gallery container when it reaches the top of the viewport
      const tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            pin: true,
            start: 'top top',
            end: () => `+=${Math.max(getScrollDistance() * 1.15, 900)}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setProgress(p);
              const idx = Math.min(4, Math.max(0, Math.round(p * 4)));
              setActiveIdx(idx);
            },
          },
        }
      );

      // Refresh to ensure accurate calculations after initial DOM layout
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(timer);
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-brand-offwhite border-t border-brand-beige"
    >
      {/* 1. Services Header (in normal document flow, NOT pinned) */}
      <div className="container-wide pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-brand-beige">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive">
                WHAT WE BUILD
              </span>
              <div className="h-[1px] w-8 bg-brand-beige" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight text-neutral-800">
              WE BUILD DIGITAL <br className="hidden sm:inline" />
              EXPERIENCES THAT <br className="hidden sm:inline" />
              <span className="text-brand-olive italic">MOVE BUSINESS FORWARD.</span>
            </h2>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl pt-1">
              From focused landing pages to complete web applications, we design and build experiences around what your business actually needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-6 shrink-0">
            <div className="text-left md:text-right space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-800">
                05 SERVICES
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                01 GOAL — YOUR BUSINESS
              </div>
            </div>

            <Link
              to="/start-project"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-all shadow-lg shadow-brand-olive/15"
            >
              START A PROJECT
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Desktop Horizontal Gallery (PINNED when it reaches top of viewport) */}
      <div
        ref={galleryRef}
        className="hidden lg:flex flex-col justify-between w-full h-screen min-h-[660px] pt-20 pb-8 overflow-hidden bg-brand-offwhite"
      >
        {/* Top Active Indicator & Progress Bar */}
        <div className="container-wide flex items-center justify-between pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-xs transition-colors duration-300"
              style={{ color: SERVICES[activeIdx].accent }}
            >
              {SERVICES[activeIdx].number}
            </span>
            <span>/</span>
            <span>05</span>
            <span className="mx-2 text-neutral-300">•</span>
            <span className="text-neutral-800 font-display tracking-wider text-xs">
              {SERVICES[activeIdx].title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[9px] text-neutral-400">SCROLL TO EXPLORE</span>
            <div className="w-48 h-1 bg-brand-beige rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.max(20, (progress * 80) + 20)}%`,
                  backgroundColor: SERVICES[activeIdx].accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Track of Cards */}
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex gap-8 pl-8 md:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] pr-16 md:pr-[max(2rem,calc((100vw-1400px)/2+2rem))] items-center will-change-transform"
          >
            {SERVICES.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeIdx === idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mobile Vertical Stack (No pinning, natural vertical scroll) */}
      <div className="lg:hidden container-wide py-12 space-y-8">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={true}
            isMobile
          />
        ))}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: ServiceData;
  isActive: boolean;
  isMobile?: boolean;
}

function ServiceCard({ service, isActive, isMobile = false }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered || isActive ? service.accent : '#EAE2D6',
      }}
      className={cn(
        'group flex flex-col justify-between bg-brand-offwhite rounded-[28px] border transition-all duration-400 select-none',
        isMobile
          ? 'w-full p-6 sm:p-8 min-h-[520px]'
          : 'w-[390px] min-w-[390px] h-[530px] p-7 shrink-0 hover:-translate-y-2',
        !isMobile && (isActive ? 'scale-100 shadow-xl shadow-black/[0.03]' : 'scale-[0.96] opacity-90')
      )}
    >
      {/* TOP: Number / Category */}
      <div className="flex items-center justify-between">
        <span
          style={{ color: isHovered || isActive ? service.accent : '#A3A3A3' }}
          className="text-xs font-bold tracking-[0.25em] transition-colors duration-300"
        >
          {service.number} / 05
        </span>

        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full transition-transform duration-300"
            style={{
              backgroundColor: service.accent,
              transform: isHovered ? 'scale(1.3)' : 'scale(1)',
            }}
          />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            SERVICE
          </span>
        </div>
      </div>

      {/* CENTER: Miniature Interface Visual */}
      <div
        className="w-full h-[215px] my-3 rounded-2xl border border-brand-beige overflow-hidden relative transition-transform duration-500 bg-[#EEEEEE]/40"
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {service.visualType === 'business' && <BusinessWebsiteVisual accent={service.accent} isHovered={isHovered} />}
        {service.visualType === 'ecommerce' && <EcommerceVisual accent={service.accent} isHovered={isHovered} />}
        {service.visualType === 'saas' && <SaasVisual accent={service.accent} isHovered={isHovered} />}
        {service.visualType === 'landing' && <LandingVisual accent={service.accent} isHovered={isHovered} />}
        {service.visualType === 'redesign' && <RedesignVisual accent={service.accent} isHovered={isHovered} />}
      </div>

      {/* BOTTOM: Title, Description, and CTA */}
      <div className="space-y-3 pt-1">
        <div>
          <h3
            className="text-lg sm:text-xl font-display font-bold text-neutral-800 tracking-tight transition-colors duration-300 leading-snug"
            style={{ color: isHovered ? service.accent : '#262626' }}
          >
            {service.title}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed pt-1.5 line-clamp-3">
            {service.description}
          </p>
        </div>

        <div className="pt-2 border-t border-brand-beige">
          <Link
            to="/start-project"
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 group/link"
            style={{ color: isHovered ? service.accent : '#525252' }}
          >
            <span>START A PROJECT</span>
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover/link:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 01: Business Website Visual (Accent: #8B9A6E)
// ----------------------------------------------------------------------
function BusinessWebsiteVisual({ accent, isHovered }: { accent: string; isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col bg-[#F7F2EB] p-3 select-none text-[10px]">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-brand-beige shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-300" />
          <span className="w-2 h-2 rounded-full bg-neutral-300" />
          <span className="w-2 h-2 rounded-full bg-neutral-300" />
        </div>
        <div className="px-3 py-0.5 bg-brand-beige/50 rounded-full text-[8px] font-mono text-neutral-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          aesthetix.studio/work
        </div>
        <div className="w-8" />
      </div>

      {/* Mini Website Body */}
      <div className="flex-1 flex flex-col justify-between pt-2 overflow-hidden">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-brand-beige/50">
          <span className="font-display font-bold text-xs tracking-wider text-neutral-800">ATELIER</span>
          <div className="flex gap-2 text-[8px] font-bold uppercase tracking-wider text-neutral-400">
            <span>Work</span>
            <span>About</span>
            <span style={{ color: accent }}>Contact</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-12 gap-2.5 items-center py-1.5">
          <div className="col-span-7 space-y-1">
            <span
              className="inline-block px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-widest text-neutral-800"
              style={{ backgroundColor: `${accent}22`, color: accent }}
            >
              CRAFTED FOR AUTHORITY
            </span>
            <div className="font-display font-bold text-xs leading-tight text-neutral-800">
              Digital Flagship Built To Convert.
            </div>
            <div className="flex items-center gap-1 pt-1">
              <span
                className="px-2 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider text-brand-offwhite transition-transform"
                style={{
                  backgroundColor: accent,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                Explore Work →
              </span>
            </div>
          </div>

          <div className="col-span-5">
            <div className="aspect-[4/3] rounded-lg border border-brand-beige bg-[#EEEEEE] p-1.5 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-center text-[7px] font-bold text-neutral-500">
                <span>CONVERSION</span>
                <span style={{ color: accent }}>+140%</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-brand-beige rounded" />
                <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: accent }} />
              </div>
              <div className="text-[6px] text-neutral-400 font-mono">LIVE PREVIEW</div>
            </div>
          </div>
        </div>

        {/* Bottom Ticker Feature Bar */}
        <div className="pt-1 border-t border-brand-beige/60 flex items-center justify-between text-[7px] font-bold uppercase tracking-widest text-neutral-400">
          <span>SEO Optimized</span>
          <span>•</span>
          <span style={{ color: accent }}>High Performance</span>
          <span>•</span>
          <span>Brand First</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 02: E-Commerce Visual (Accent: #B56F5A Terracotta)
// ----------------------------------------------------------------------
function EcommerceVisual({ accent, isHovered }: { accent: string; isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col bg-[#F7F2EB] p-3 select-none text-[10px]">
      {/* Store Top Bar */}
      <div className="flex items-center justify-between pb-1.5 border-b border-brand-beige shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-xs tracking-wider text-neutral-800">STORE</span>
          <span className="text-[7px] font-mono uppercase px-1.5 py-0.5 rounded bg-brand-beige/50 text-neutral-500">
            NEW / '26
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider text-brand-offwhite"
            style={{ backgroundColor: accent }}
          >
            <ShoppingBag size={10} />
            <span>BAG (3)</span>
          </div>
        </div>
      </div>

      {/* Product Grid View */}
      <div className="flex-1 flex flex-col justify-between pt-2">
        <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-neutral-400">
          <span>CURATED COLLECTION</span>
          <span style={{ color: accent }}>3 ITEMS IN STOCK</span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-1">
          {/* Product 01 */}
          <div className="rounded-lg border border-brand-beige bg-brand-offwhite p-1.5 flex flex-col justify-between">
            <div className="aspect-square rounded bg-[#EEEEEE] flex items-center justify-center relative overflow-hidden">
              <div className="w-5 h-6 rounded border border-neutral-300 bg-neutral-200" />
            </div>
            <div className="pt-1 space-y-0.5">
              <div className="text-[7px] font-bold text-neutral-800 truncate">Wool Coat</div>
              <div className="text-[8px] font-mono font-bold text-neutral-500">$320</div>
            </div>
          </div>

          {/* Product 02 - Highlighted */}
          <div
            className="rounded-lg border bg-brand-offwhite p-1.5 flex flex-col justify-between shadow-sm transition-transform duration-300"
            style={{
              borderColor: accent,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <div className="aspect-square rounded bg-[#EEEEEE] flex items-center justify-center relative overflow-hidden">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span
                className="absolute top-1 right-1 text-[6px] font-bold uppercase tracking-wider text-brand-offwhite px-1 py-0.2 rounded"
                style={{ backgroundColor: accent }}
              >
                HOT
              </span>
            </div>
            <div className="pt-1 space-y-0.5">
              <div className="text-[7px] font-bold text-neutral-800 truncate">Studio Knit</div>
              <div className="text-[8px] font-mono font-bold" style={{ color: accent }}>
                $185
              </div>
            </div>
          </div>

          {/* Product 03 */}
          <div className="rounded-lg border border-brand-beige bg-brand-offwhite p-1.5 flex flex-col justify-between">
            <div className="aspect-square rounded bg-[#EEEEEE] flex items-center justify-center relative overflow-hidden">
              <div className="w-5 h-6 rounded border border-neutral-300 bg-neutral-200" />
            </div>
            <div className="pt-1 space-y-0.5">
              <div className="text-[7px] font-bold text-neutral-800 truncate">Tote Bag</div>
              <div className="text-[8px] font-mono font-bold text-neutral-500">$240</div>
            </div>
          </div>
        </div>

        {/* Checkout strip */}
        <div className="pt-1 border-t border-brand-beige/60 flex items-center justify-between text-[7px] font-bold uppercase tracking-wider text-neutral-500">
          <span>Stripe & Apple Pay Ready</span>
          <span className="flex items-center gap-1 font-mono" style={{ color: accent }}>
            <Check size={8} /> Fast Checkout
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 03: SaaS & Web Apps Visual (Accent: #657A73 Muted Teal)
// ----------------------------------------------------------------------
function SaasVisual({ accent, isHovered }: { accent: string; isHovered: boolean }) {
  return (
    <div className="w-full h-full flex bg-[#F7F2EB] select-none text-[10px] overflow-hidden">
      {/* Mini Sidebar */}
      <div className="w-10 border-r border-brand-beige bg-brand-offwhite/80 p-2 flex flex-col justify-between shrink-0">
        <div className="space-y-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center text-brand-offwhite font-bold text-[8px]" style={{ backgroundColor: accent }}>
            S
          </div>
          <div className="w-5 h-1.5 rounded" style={{ backgroundColor: accent }} />
          <div className="w-5 h-1.5 rounded bg-brand-beige" />
          <div className="w-5 h-1.5 rounded bg-brand-beige" />
        </div>
        <div className="w-5 h-5 rounded-full bg-brand-beige/50" />
      </div>

      {/* Main Dashboard Area */}
      <div className="flex-1 p-2 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-brand-beige">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-[9px] text-neutral-800 tracking-wider">PLATFORM METRICS</span>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          </div>
          <span className="text-[7px] font-mono px-1 py-0.5 rounded bg-brand-beige/50 text-neutral-600">
            LIVE SYNC
          </span>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-1 py-1">
          <div className="p-1 rounded-md border border-brand-beige bg-brand-offwhite">
            <div className="text-[6px] font-bold text-neutral-400 uppercase">ARR</div>
            <div className="text-[8px] font-mono font-bold text-neutral-800">$142.8k</div>
          </div>
          <div className="p-1 rounded-md border bg-brand-offwhite" style={{ borderColor: accent }}>
            <div className="text-[6px] font-bold uppercase" style={{ color: accent }}>ACTIVE</div>
            <div className="text-[8px] font-mono font-bold" style={{ color: accent }}>3,420</div>
          </div>
          <div className="p-1 rounded-md border border-brand-beige bg-brand-offwhite">
            <div className="text-[6px] font-bold text-neutral-400 uppercase">UPTIME</div>
            <div className="text-[8px] font-mono font-bold text-neutral-800">99.98%</div>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="h-14 rounded-md border border-brand-beige bg-brand-offwhite p-1.5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center text-[6px] font-mono text-neutral-400">
            <span>TRAFFIC VELOCITY</span>
            <span style={{ color: accent }} className="font-bold">+34.8%</span>
          </div>

          <svg viewBox="0 0 100 28" className="w-full h-7 overflow-visible">
            <path
              d="M0,24 Q15,10 30,18 T60,8 T80,14 T100,4"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0,24 Q15,10 30,18 T60,8 T80,14 T100,4 L100,28 L0,28 Z"
              fill={`${accent}18`}
            />
            <circle cx="100" cy="4" r="2.5" fill={accent} />
          </svg>
        </div>

        {/* Status Activity Row */}
        <div className="pt-1 flex items-center justify-between text-[7px] font-mono text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            PostgreSQL • Supabase • React
          </span>
          <span className="font-bold" style={{ color: accent }}>HEALTHY</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 04: Landing Pages Visual (Accent: #B69A68 Muted Ochre)
// ----------------------------------------------------------------------
function LandingVisual({ accent, isHovered }: { accent: string; isHovered: boolean }) {
  return (
    <div className="w-full h-full flex flex-col bg-[#F7F2EB] p-3 select-none text-[10px]">
      {/* Top Badge */}
      <div className="flex items-center justify-between pb-1.5 border-b border-brand-beige shrink-0">
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-widest text-brand-offwhite"
          style={{ backgroundColor: accent }}
        >
          <Sparkles size={8} />
          CAMPAIGN LAUNCH
        </div>
        <span className="text-[7px] font-mono text-neutral-500">LIFT +42%</span>
      </div>

      {/* Conversion Focused Layout */}
      <div className="flex-1 flex flex-col justify-between pt-2">
        {/* Hero Section */}
        <div className="space-y-1 text-center px-1">
          <h4 className="font-display font-bold text-xs leading-tight text-neutral-800 tracking-tight">
            CONVERT VISITORS INTO <br />
            LOYAL CUSTOMERS.
          </h4>
          <p className="text-[8px] text-neutral-500 max-w-[200px] mx-auto leading-normal">
            Laser-focused messaging engineered for maximum return on ad spend.
          </p>

          <div className="pt-0.5">
            <span
              className="inline-block px-2.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider text-brand-offwhite shadow-sm transition-transform"
              style={{
                backgroundColor: accent,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              Claim Your Spot →
            </span>
          </div>
        </div>

        {/* 3 Feature Pills */}
        <div className="grid grid-cols-3 gap-1.5 py-1">
          <div className="p-1 rounded border border-brand-beige bg-brand-offwhite text-center">
            <div className="text-[8px] font-bold" style={{ color: accent }}>0.4s</div>
            <div className="text-[6px] text-neutral-400 font-bold uppercase">Load Time</div>
          </div>
          <div className="p-1 rounded border border-brand-beige bg-brand-offwhite text-center">
            <div className="text-[8px] font-bold" style={{ color: accent }}>A/B</div>
            <div className="text-[6px] text-neutral-400 font-bold uppercase">Testing</div>
          </div>
          <div className="p-1 rounded border border-brand-beige bg-brand-offwhite text-center">
            <div className="text-[8px] font-bold" style={{ color: accent }}>4.8x</div>
            <div className="text-[6px] text-neutral-400 font-bold uppercase">ROI Avg</div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="pt-1 border-t border-brand-beige/60 flex items-center justify-between text-[7px] font-bold text-neutral-500">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 border border-brand-offwhite" />
              <span className="w-3.5 h-3.5 rounded-full bg-neutral-400 border border-brand-offwhite" />
              <span className="w-3.5 h-3.5 rounded-full bg-neutral-500 border border-brand-offwhite" />
            </div>
            <span className="pl-1">450+ Teams Trust Us</span>
          </div>
          <span style={{ color: accent }} className="font-mono">★★★★★ 4.9</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL 05: Website Redesign Visual (Accent: #7C7880 Muted Mauve)
// ----------------------------------------------------------------------
function RedesignVisual({ accent, isHovered }: { accent: string; isHovered: boolean }) {
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    let frame: number;
    let time = 0;
    const animate = () => {
      time += 0.02;
      // Oscillate smoothly between 35% and 65%
      setSliderPos(50 + Math.sin(time) * 16);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full h-full relative bg-[#F7F2EB] select-none text-[10px] overflow-hidden">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 h-6 px-3 border-b border-brand-beige flex items-center justify-between z-20 bg-[#F7F2EB]">
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-bold uppercase tracking-wider text-neutral-400">BEFORE</span>
          <span className="text-[7px] text-neutral-300">vs</span>
          <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: accent }}>AFTER</span>
        </div>
        <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-brand-beige/50 text-neutral-600">
          TRANSFORMATION
        </span>
      </div>

      {/* Main split area */}
      <div className="absolute inset-0 top-6 p-2.5 flex">
        {/* Left Side: BEFORE (Clunky, outdated representation) */}
        <div className="w-full h-full bg-[#EEEEEE] p-2 flex flex-col justify-between opacity-50 grayscale border-r border-neutral-300">
          <div className="border border-neutral-300 p-1 bg-white">
            <div className="text-[6px] font-serif text-blue-900 font-bold">Old Company Site v1 (2014)</div>
            <div className="h-1 bg-neutral-300 w-full my-0.5" />
            <div className="h-1 bg-neutral-200 w-3/4" />
          </div>
          <div className="grid grid-cols-2 gap-1 my-1">
            <div className="h-7 bg-neutral-300 border border-neutral-400" />
            <div className="h-7 bg-neutral-300 border border-neutral-400" />
          </div>
          <div className="text-[6px] font-mono text-neutral-500">SLOW LOAD • 68% BOUNCE</div>
        </div>

        {/* Right Side: AFTER (Clean, spacious modern layout) */}
        <div
          className="absolute inset-y-0 right-0 top-6 bg-brand-offwhite p-2.5 flex flex-col justify-between transition-all"
          style={{ width: `${100 - sliderPos}%` }}
        >
          <div className="space-y-0.5">
            <span
              className="inline-block px-1.5 py-0.5 rounded text-[6px] font-bold uppercase tracking-wider text-brand-offwhite"
              style={{ backgroundColor: accent }}
            >
              MODERNIZED
            </span>
            <div className="font-display font-bold text-[11px] text-neutral-800 leading-tight">
              Aesthetix High-Performance Architecture
            </div>
          </div>

          <div className="space-y-1 py-1">
            <div className="p-1 rounded border border-brand-beige bg-brand-beige/20 flex justify-between items-center">
              <span className="text-[7px] font-bold text-neutral-700">Page Speed Index</span>
              <span className="text-[8px] font-mono font-bold" style={{ color: accent }}>99/100</span>
            </div>
            <div className="p-1 rounded border border-brand-beige bg-brand-beige/20 flex justify-between items-center">
              <span className="text-[7px] font-bold text-neutral-700">Conversion Rate</span>
              <span className="text-[8px] font-mono font-bold" style={{ color: accent }}>+220%</span>
            </div>
          </div>

          <div className="text-[6px] font-bold uppercase tracking-wider text-neutral-400">
            RESPONSIVE • ACCESSIBLE
          </div>
        </div>

        {/* Interactive / Animated Divider Line */}
        <div
          className="absolute top-6 bottom-0 w-[2px] z-30 pointer-events-none"
          style={{
            left: `${sliderPos}%`,
            backgroundColor: accent,
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-brand-offwhite flex items-center justify-center text-brand-offwhite text-[6px] font-bold shadow-md"
            style={{ backgroundColor: accent }}
          >
            ⇄
          </div>
        </div>
      </div>
    </div>
  );
}
