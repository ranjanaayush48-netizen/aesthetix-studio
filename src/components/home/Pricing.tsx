import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PricingPackage {
  id: string;
  number: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
  isPopular?: boolean;
}

const PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    number: '01',
    name: 'STARTER',
    price: '₹8,000',
    description: 'For businesses that need a professional online presence.',
    features: [
      'Responsive website',
      'Up to 5 pages',
      'Mobile optimization',
      'Contact / enquiry form',
      'Basic SEO setup',
      'Social media integration',
      'Deployment',
      '1 revision round',
    ],
    timeline: '5–7 days',
    isPopular: false,
  },
  {
    id: 'business',
    number: '02',
    name: 'BUSINESS',
    price: '₹12,000',
    description: 'For businesses that need a more complete and customized website.',
    features: [
      'Everything in Starter',
      'Up to 10 pages',
      'Custom UI design',
      'Advanced sections',
      'CMS / dynamic content where required',
      'Enhanced SEO',
      'Analytics setup',
      '2 revision rounds',
      'Deployment & handover',
    ],
    timeline: '7–12 days',
    isPopular: true,
  },
  {
    id: 'premium',
    number: '03',
    name: 'PREMIUM',
    price: '₹20,000',
    description: 'For businesses that need a highly customized digital experience.',
    features: [
      'Everything in Business',
      'Advanced interactions',
      'Custom animations',
      'Complex sections / functionality',
      'Performance optimization',
      'Advanced SEO',
      'Third-party integrations',
      'Priority support',
      '3 revision rounds',
    ],
    timeline: '12–18 days',
    isPopular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-brand-offwhite border-t border-brand-beige">
      <div className="container-wide">
        {/* Compact Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive">
              INVESTMENT
            </span>
            <div className="h-[1px] w-8 bg-brand-beige" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight text-neutral-800 mb-5">
            CLEAR SCOPE. <br />
            CLEAR PRICING. <br />
            <span className="text-brand-olive italic">NO SURPRISES.</span>
          </h2>

          <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl">
            Choose a starting point based on what you need. Every project is scoped around your business, goals, and requirements.
          </p>
        </motion.div>

        {/* 3 Pricing Packages Grid: All 3 start in the same neutral visual state */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
              className={cn(
                'group flex flex-col justify-between p-8 rounded-3xl border border-brand-beige bg-brand-offwhite transition-all duration-300 hover:border-brand-olive hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-olive/5 select-none relative'
              )}
            >
              {/* TOP: Number, Badge, Name, Price, Description */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-[0.25em] text-neutral-400 group-hover:text-brand-olive transition-colors">
                    {pkg.number} / 03
                  </span>

                  {pkg.isPopular ? (
                    <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brand-olive text-brand-offwhite shadow-sm">
                      MOST REQUESTED
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                      FIXED SCOPE
                    </span>
                  )}
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-800">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl sm:text-5xl font-display font-bold text-neutral-800 tracking-tight pt-1">
                    {pkg.price}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-3 min-h-[36px]">
                    {pkg.description}
                  </p>
                </div>
              </div>

              {/* MIDDLE: Feature List (Neutral check indicators for all packages) */}
              <div className="py-6 border-y border-brand-beige my-4 flex-grow">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                  WHAT'S INCLUDED
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-xs text-neutral-700 leading-relaxed group/item"
                    >
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors bg-brand-beige/60 text-brand-olive group-hover:bg-brand-olive group-hover:text-brand-offwhite">
                        <Check size={10} className="stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BOTTOM: Timeline & CTA (Neutral by default, highlighted on hover) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="uppercase tracking-wider text-[10px]">Estimated Timeline</span>
                  <span className="font-bold text-neutral-800">{pkg.timeline}</span>
                </div>

                <Link
                  to="/start-project"
                  className="w-full py-4 px-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-sm border border-brand-beige bg-brand-offwhite text-neutral-800 hover:border-brand-olive hover:bg-brand-olive hover:text-brand-offwhite hover:scale-[1.02]"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1.5"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Custom Project Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-12 md:mt-16 p-8 md:p-12 rounded-3xl border border-brand-beige bg-brand-offwhite flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm"
        >
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-olive" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-olive">
                BESPOKE SCOPE
              </h4>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 tracking-tight">
              NEED SOMETHING DIFFERENT?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
              Custom platforms, SaaS products, dashboards, e-commerce systems, and complex web applications are scoped individually.
            </p>
          </div>

          <Link
            to="/start-project"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-all shadow-lg shadow-brand-olive/20 shrink-0 group"
          >
            <span>GET A CUSTOM QUOTE</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
