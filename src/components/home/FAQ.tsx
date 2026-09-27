import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    number: '01',
    question: 'HOW DOES THE PROCESS START?',
    answer:
      "It starts with a short project questionnaire. You'll tell us about your business, what you need, your timeline, and your budget. We review the details and get back to you with the next steps.",
  },
  {
    number: '02',
    question: 'HOW LONG DOES A WEBSITE TAKE?',
    answer:
      'Most projects take between 5 and 18 days depending on scope. Smaller websites can move quickly, while larger custom projects require more planning, development, and testing.',
  },
  {
    number: '03',
    question: 'WHAT DOES YOUR PRICING INCLUDE?',
    answer:
      'Our packages provide a clear starting scope covering design, development, responsive implementation, testing, and deployment. Larger or more complex requirements can be scoped as a custom project.',
  },
  {
    number: '04',
    question: 'DO YOU BUILD E-COMMERCE WEBSITES?',
    answer:
      'Yes. We build online stores with product management, responsive storefronts, payment integration, shipping configuration, and the functionality required to sell online.',
  },
  {
    number: '05',
    question: 'CAN YOU REDESIGN MY EXISTING WEBSITE?',
    answer:
      'Yes. We can redesign an existing website while improving its visual identity, usability, responsiveness, performance, and overall digital experience.',
  },
  {
    number: '06',
    question: 'CAN YOU BUILD CUSTOM WEB APPLICATIONS?',
    answer:
      'Yes. Custom web applications, SaaS products, dashboards, portals, and other complex web experiences can be scoped individually.',
  },
  {
    number: '07',
    question: 'HOW DO PAYMENTS WORK?',
    answer:
      'For standard projects, work begins after the agreed advance payment. The remaining amount is settled according to the project agreement before final handover.',
  },
  {
    number: '08',
    question: 'DO YOU PROVIDE SUPPORT AFTER LAUNCH?',
    answer:
      'Yes. Support depends on the selected package and project agreement. We also provide a defined period for fixing issues related to the delivered implementation.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-brand-offwhite border-t border-brand-beige">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: 35–40% width (sticky editorial column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive">
                  GOOD TO KNOW
                </span>
                <div className="h-[1px] w-8 bg-brand-beige" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight text-neutral-800">
                QUESTIONS, <br />
                <span className="text-brand-olive italic">ANSWERED.</span>
              </h2>

              <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-sm">
                Everything you need to know before starting your project.
              </p>

              <div className="pt-6 border-t border-brand-beige space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block">
                  STILL HAVE QUESTIONS?
                </span>
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-all shadow-md shadow-brand-olive/20 group"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: 60–65% width (Editorial FAQ Accordion List) */}
          <div className="lg:col-span-7">
            <div className="border-t border-brand-beige divide-y divide-brand-beige">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <motion.div
                    key={faq.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: prefersReducedMotion ? 0 : idx * 0.05,
                      ease: 'easeOut',
                    }}
                    className={cn(
                      'transition-colors duration-300',
                      isOpen ? 'bg-brand-beige/20' : 'hover:bg-brand-beige/10'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      id={`faq-question-${idx}`}
                      className="w-full py-6 sm:py-7 px-2 sm:px-4 flex items-start justify-between gap-4 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-olive"
                    >
                      {/* LEFT: Stage / Question Number */}
                      <span
                        className={cn(
                          'text-xs font-bold font-mono tracking-widest pt-0.5 transition-colors duration-300 shrink-0 w-8',
                          isOpen
                            ? 'text-brand-olive'
                            : 'text-neutral-400 group-hover:text-brand-olive'
                        )}
                      >
                        {faq.number}
                      </span>

                      {/* CENTER: Question Title */}
                      <span
                        className={cn(
                          'text-base sm:text-lg font-display font-bold tracking-tight flex-grow transition-all duration-300 group-hover:translate-x-1',
                          isOpen
                            ? 'text-brand-olive'
                            : 'text-neutral-800 group-hover:text-brand-olive'
                        )}
                      >
                        {faq.question}
                      </span>

                      {/* RIGHT: Pure SVG Plus / Minus Toggle */}
                      <div
                        className={cn(
                          'w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 mt-0.5',
                          isOpen
                            ? 'border-brand-olive bg-brand-olive text-brand-offwhite'
                            : 'border-brand-beige text-neutral-400 group-hover:border-brand-olive group-hover:text-brand-olive group-hover:rotate-45'
                        )}
                        aria-hidden="true"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300"
                        >
                          {/* Horizontal bar (always visible) */}
                          <line
                            x1="2"
                            y1="6"
                            x2="10"
                            y2="6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          {/* Vertical bar (rotates and collapses to 0 when open, forming a minus sign) */}
                          <line
                            x1="6"
                            y1="2"
                            x2="6"
                            y2="10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className={cn(
                              'transition-all duration-300 origin-center',
                              isOpen
                                ? 'opacity-0 scale-y-0 rotate-90'
                                : 'opacity-100 scale-y-100 rotate-0'
                            )}
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Smooth Height Expansion for Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${idx}`}
                          role="region"
                          aria-labelledby={`faq-question-${idx}`}
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                          }
                          animate={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { height: 'auto', opacity: 1 }
                          }
                          exit={
                            prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                          }
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-10 sm:pl-12 pr-4 sm:pr-8 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
