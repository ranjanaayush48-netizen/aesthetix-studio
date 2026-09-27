import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/src/lib/supabase/client';
import { Star, X, Loader2, Check, ArrowRight } from 'lucide-react';
import { reviewSchema, type ReviewInput } from '@/src/lib/validation/schemas';
import { cn } from '@/src/lib/utils';
import type { Review } from '@/src/types/database';

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<ReviewInput>>({ rating: 5, project: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (data) setReviews(data);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  const updateForm = (updates: Partial<ReviewInput>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      Object.keys(updates).forEach((key) => delete next[key]);
      return next;
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      alert('Studio enquiry system is currently unavailable. Please contact us directly.');
      return;
    }
    setSubmitting(true);
    setFieldErrors({});

    try {
      if (!privacyAccepted) {
        setFieldErrors((prev) => ({
          ...prev,
          privacy: 'Please acknowledge and accept the Privacy Policy to submit your review.',
        }));
        return;
      }

      const result = reviewSchema.safeParse(formData);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          errors[issue.path[0] as string] = issue.message;
        });
        setFieldErrors(errors);
        return;
      }

      const { error } = await (supabase.from('reviews') as any).insert([
        { ...result.data, status: 'pending' },
      ]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setFormData({ rating: 5, project: '' });
    setFieldErrors({});
    setPrivacyAccepted(false);
  };

  const featuredReview = reviews[0];
  const supportingReviews = reviews.slice(1);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-brand-offwhite border-t border-brand-beige">
      <div className="container-wide">
        {/* Compact Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 pb-8 border-b border-brand-beige">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive">
                CLIENT NOTES
              </span>
              <div className="h-[1px] w-8 bg-brand-beige" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight text-neutral-800">
              GOOD WORK <br />
              SHOULD SPEAK <br />
              <span className="text-brand-olive italic">FOR ITSELF.</span>
            </h2>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md pt-1">
              Thoughts from people we've worked with.
            </p>
          </motion.div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            {reviews.length > 0 && (
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                {reviews.length < 10 ? `0${reviews.length}` : reviews.length} CLIENT STORIES
              </span>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-800 hover:text-brand-olive transition-colors pb-1 border-b border-neutral-800 hover:border-brand-olive"
            >
              <span>WRITE A REVIEW</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 p-10 md:p-12 rounded-3xl border border-brand-beige/60 bg-brand-beige/10 animate-pulse h-96" />
            <div className="lg:col-span-5 space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 rounded-2xl bg-brand-beige/10 animate-pulse border border-brand-beige/60" />
              ))}
            </div>
          </div>
        ) : reviews.length === 0 ? (
          /* Empty State: Polished Editorial Placeholder */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-24 md:py-32 flex flex-col items-center text-center max-w-xl mx-auto border border-brand-beige rounded-3xl p-8 sm:p-12 bg-brand-offwhite shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-brand-olive/10 flex items-center justify-center mb-6 text-brand-olive">
              <Star size={20} className="stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive mb-3">
              CLIENT STORIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-800 tracking-tight mb-3">
              CLIENT FEEDBACK COMING SOON.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-8 max-w-sm">
              We're building great projects. Client stories will appear here as they come in.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-all shadow-lg shadow-brand-olive/20"
            >
              <span>SHARE YOUR EXPERIENCE</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        ) : (
          /* Editorial Wall: Asymmetric Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT: Featured Review */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={cn(
                'p-8 sm:p-12 rounded-3xl border border-brand-beige bg-brand-offwhite flex flex-col justify-between shadow-sm relative',
                supportingReviews.length > 0 ? 'lg:col-span-7' : 'lg:col-span-10 lg:col-start-2'
              )}
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-brand-beige">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-olive">
                    FEATURED NOTE
                  </span>
                  <RatingStars rating={featuredReview.rating} />
                </div>

                <div className="font-display text-5xl md:text-6xl text-brand-olive/30 select-none leading-none -mb-4 font-serif">
                  “
                </div>

                <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-neutral-800 leading-[1.3] tracking-tight mb-8">
                  {featuredReview.message}
                </blockquote>
              </div>

              <div className="pt-6 border-t border-brand-beige flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-neutral-800 tracking-tight">
                    {featuredReview.name}
                  </h4>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono pt-0.5">
                    {featuredReview.business_name}
                  </div>
                </div>

                {featuredReview.project && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-beige/40 text-neutral-700 self-start sm:self-auto border border-brand-beige">
                    {featuredReview.project}
                  </span>
                )}
              </div>
            </motion.div>

            {/* RIGHT: Supporting Reviews Stack */}
            {supportingReviews.length > 0 && (
              <div className="lg:col-span-5 flex flex-col divide-y divide-brand-beige">
                {supportingReviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                    className={cn(
                      'group py-7 first:pt-0 last:pb-0 transition-all select-none'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 group-hover:text-brand-olive transition-colors">
                        0{idx + 2} / {reviews.length < 10 ? `0${reviews.length}` : reviews.length}
                      </span>
                      <RatingStars rating={review.rating} />
                    </div>

                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-4 italic">
                      "{review.message}"
                    </p>

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <div>
                        <div className="text-sm font-bold text-neutral-800 group-hover:text-brand-olive transition-colors">
                          {review.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-mono">
                          {review.business_name}
                        </div>
                      </div>

                      {review.project && (
                        <span className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-beige/40 text-neutral-600 border border-brand-beige shrink-0">
                          {review.project}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom Section CTA: Worked with us? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 md:mt-24 pt-10 border-t border-brand-beige flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive block">
              WORKED WITH US?
            </span>
            <p className="text-sm md:text-base text-neutral-600">
              Tell us about your experience.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-all shadow-lg shadow-brand-olive/15 shrink-0"
          >
            <span>LEAVE A REVIEW</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Review Submission Modal (Preserved existing flow & moderation) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-brand-offwhite rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden p-8 sm:p-10 md:p-12 border border-brand-beige"
            >
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 hover:bg-brand-beige/50 rounded-full transition-colors text-neutral-600"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-brand-olive rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-olive/20 text-brand-offwhite">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-neutral-800">
                    THANK YOU <br /> FOR YOUR <span className="text-brand-olive">FEEDBACK.</span>
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8 max-w-sm mx-auto">
                    Your review has been submitted and is awaiting approval. We appreciate you sharing your experience with us.
                  </p>
                  <button
                    onClick={handleClose}
                    className="inline-block px-8 py-3.5 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-all shadow-xl shadow-brand-olive/20"
                  >
                    Back to Home
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-800">
                      SHARE YOUR <br />
                      <span className="text-brand-olive">EXPERIENCE.</span>
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mt-2">
                      Help others understand our work
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Full Name" error={fieldErrors.name}>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          className={cn('input-review', fieldErrors.name && 'border-red-500')}
                          value={formData.name || ''}
                          onChange={(e) => updateForm({ name: e.target.value })}
                        />
                      </Field>
                      <Field label="Business / Brand" error={fieldErrors.business_name}>
                        <input
                          type="text"
                          placeholder="e.g. Acme Studio"
                          className={cn('input-review', fieldErrors.business_name && 'border-red-500')}
                          value={formData.business_name || ''}
                          onChange={(e) => updateForm({ business_name: e.target.value })}
                        />
                      </Field>
                    </div>

                    <Field label="Email Address" error={fieldErrors.email}>
                      <input
                        type="email"
                        placeholder="e.g. hello@business.com"
                        className={cn('input-review', fieldErrors.email && 'border-red-500')}
                        value={formData.email || ''}
                        onChange={(e) => updateForm({ email: e.target.value })}
                      />
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Project" error={fieldErrors.project}>
                        <input
                          type="text"
                          placeholder="Project name or service"
                          className={cn('input-review', fieldErrors.project && 'border-red-500')}
                          value={formData.project || ''}
                          onChange={(e) => updateForm({ project: e.target.value })}
                        />
                      </Field>
                      <Field label="Overall Rating" error={fieldErrors.rating}>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => updateForm({ rating: r })}
                              className={cn(
                                'flex-1 aspect-square rounded-xl border transition-all font-bold text-xs',
                                formData.rating === r
                                  ? 'bg-brand-olive text-brand-offwhite border-brand-olive shadow-md shadow-brand-olive/20'
                                  : 'bg-brand-offwhite border-brand-beige text-neutral-400 hover:border-brand-olive/40'
                              )}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>

                    <Field label="Review Message" error={fieldErrors.message}>
                      <textarea
                        rows={3}
                        placeholder="Tell us what you liked about working with us..."
                        className={cn('input-review resize-none', fieldErrors.message && 'border-red-500')}
                        value={formData.message || ''}
                        onChange={(e) => updateForm({ message: e.target.value })}
                      />
                    </Field>
                  </div>

                  {/* Privacy & Compliance Consent */}
                  <div className="p-4 rounded-xl bg-brand-beige/20 border border-brand-beige space-y-2">
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      By submitting this review, you acknowledge that Aesthetix Studio may process the information provided to moderate and manage the review and, if approved, display the review publicly in accordance with our{' '}
                      <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-olive font-bold underline hover:opacity-80">
                        Privacy Policy
                      </Link>.
                    </p>

                    <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => {
                          setPrivacyAccepted(e.target.checked);
                          if (fieldErrors.privacy) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.privacy;
                              return next;
                            });
                          }
                        }}
                        className="mt-0.5 w-3.5 h-3.5 rounded border-brand-beige text-brand-olive focus:ring-brand-olive accent-brand-olive cursor-pointer"
                      />
                      <span className="text-[11px] font-semibold text-neutral-800 group-hover:text-brand-olive transition-colors">
                        I have read and understood the Privacy Policy.
                      </span>
                    </label>
                    {fieldErrors.privacy && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest pt-1">
                        {fieldErrors.privacy}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:opacity-90 flex items-center justify-center gap-3 shadow-xl shadow-brand-olive/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : 'SUBMIT REVIEW'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .input-review { 
          width: 100%; 
          padding: 1rem 1.25rem; 
          background: #F7F2EB; 
          border: 1px solid #EAE2D6; 
          border-radius: 1rem; 
          font-size: 0.875rem; 
          color: #171717;
          outline: none; 
          transition: all 0.2s ease; 
        }
        .input-review:hover {
          border-color: #8B9A6E;
        }
        .input-review:focus { 
          border-color: #8B9A6E; 
          box-shadow: 0 0 0 2px rgba(139, 154, 110, 0.2);
        }
      `}</style>
    </section>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={cn(
            'stroke-[1.5]',
            i <= rating ? 'fill-brand-olive text-brand-olive' : 'text-neutral-300'
          )}
        />
      ))}
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {label}
        </label>
        {error && (
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
