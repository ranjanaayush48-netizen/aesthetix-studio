import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/src/lib/supabase/client';
import { leadSchema, type LeadInput } from '@/src/lib/validation/schemas';
import { cn } from '@/src/lib/utils';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

const STEPS = [
  'About You',
  'What do you need?',
  'Your Business',
  'Project Details',
  'Budget',
  'Final Details',
  'Review'
];

const SERVICES = [
  'Business Website',
  'E-commerce',
  'SaaS / Web Application',
  'Landing Page',
  'Website Redesign',
  'Other'
];

const BUDGETS = [
  '₹8,000 – ₹12,000',
  '₹12,000 – ₹20,000',
  '₹20,000 – ₹40,000',
  '₹40,000+',
  'Not sure yet'
];

const TIMELINES = [
  'ASAP',
  '1–2 weeks',
  '2–4 weeks',
  '1–2 months',
  'Flexible'
];

export function StartProject() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<LeadInput>>({
    existing_website: false,
    service: '',
    budget: '',
    timeline: '',
    project_description: '',
    business_description: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Ensure user immediately lands at the very top of the questionnaire on route entry
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(s => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateForm = (updates: Partial<LeadInput>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setError(null);
    setFieldErrors(prev => {
      const next = { ...prev };
      Object.keys(updates).forEach(key => delete next[key]);
      return next;
    });
  };

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    
    if (step === 0) {
      if (!formData.name) errors.name = 'Full name is required';
      if (!formData.business_name) errors.business_name = 'Business name is required';
      if (!formData.email) {
        errors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.whatsapp) errors.whatsapp = 'WhatsApp number is required';
    }
    
    if (step === 1 && !formData.service) {
      errors.service = 'Please select a service';
    }
    
    if (step === 2 && !formData.business_description) {
      errors.business_description = 'Please tell us about your business';
    }
    
    if (step === 3) {
      if (!formData.project_description) errors.project_description = 'Please describe what you\'d like us to build';
      if (!formData.timeline) errors.timeline = 'Please select a timeline';
    }
    
    if (step === 4 && !formData.budget) {
      errors.budget = 'Please select a budget range';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fill in all required fields.');
      return false;
    }

    setFieldErrors({});
    setError(null);
    return true;
  };

  async function handleSubmit() {
    if (!supabase) {
      setError('Enquiry system is currently unavailable. Please try again later.');
      return;
    }
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      if (!privacyAccepted) {
        setError('Please acknowledge and accept the Privacy Policy to submit your project enquiry.');
        return;
      }

      const result = leadSchema.safeParse(formData);
      
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach(issue => {
          const path = issue.path[0] as string;
          errors[path] = issue.message;
        });
        setFieldErrors(errors);
        setError('Please review the highlighted fields before submitting.');
        
        // Find the first step that has an error and jump to it if needed
        // But the user is on the review step, so just listing them is better
        return;
      }

      const { error: dbError } = await (supabase
        .from('leads') as any)
        .insert([{ ...result.data, status: 'NEW' }]);

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError('Something went wrong while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite px-6">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 bg-brand-olive rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-brand-olive/20">
            <Check className="text-brand-offwhite" size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">THANKS FOR <br /> REACHING OUT.</h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-12">
            Your project enquiry has been received. We'll review the details and get back to you shortly.
          </p>
          <a href="/" className="inline-block px-10 py-4 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-all">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-offwhite pt-32 pb-20 px-6">
      <div className="container-wide max-w-4xl">
        {/* Progress Header */}
        <div className="mb-12 md:mb-20">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive">
                {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold mt-2">{STEPS[step]}</h2>
            </div>
            <span className="text-xs font-bold text-neutral-400">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-brand-grey rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-olive"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-brand-beige/10 p-8 md:p-16 rounded-[40px] border border-brand-grey min-h-[500px] flex flex-col shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              {step === 0 && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">Tell us about <span className="text-brand-olive">your business</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field label="Full Name" required error={fieldErrors.name}>
                      <input 
                        type="text" 
                        placeholder="e.g. John Doe"
                        value={formData.name || ''} 
                        onChange={e => updateForm({ name: e.target.value })}
                        className={cn("input-premium", fieldErrors.name && "border-red-500")}
                      />
                    </Field>
                    <Field label="Business / Brand Name" required error={fieldErrors.business_name}>
                      <input 
                        type="text" 
                        placeholder="e.g. Acme Studio"
                        value={formData.business_name || ''} 
                        onChange={e => updateForm({ business_name: e.target.value })}
                        className={cn("input-premium", fieldErrors.business_name && "border-red-500")}
                      />
                    </Field>
                    <Field label="Email Address" required error={fieldErrors.email}>
                      <input 
                        type="email" 
                        placeholder="e.g. hello@business.com"
                        value={formData.email || ''} 
                        onChange={e => updateForm({ email: e.target.value })}
                        className={cn("input-premium", fieldErrors.email && "border-red-500")}
                      />
                    </Field>
                    <Field label="WhatsApp Number" required error={fieldErrors.whatsapp}>
                      <input 
                        type="text" 
                        placeholder="e.g. +91 00000 00000"
                        value={formData.whatsapp || ''} 
                        onChange={e => updateForm({ whatsapp: e.target.value })}
                        className={cn("input-premium", fieldErrors.whatsapp && "border-red-500")}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">What are you <span className="text-brand-olive">looking to build?</span></h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SERVICES.map(s => (
                      <button 
                        key={s}
                        onClick={() => updateForm({ service: s })}
                        className={cn(
                          "p-8 text-left rounded-2xl border-2 transition-all text-xs font-bold uppercase tracking-widest",
                          formData.service === s 
                            ? "bg-brand-olive text-brand-offwhite border-brand-olive shadow-lg shadow-brand-olive/20" 
                            : "bg-brand-offwhite border-brand-grey text-neutral-500 hover:border-brand-olive/50"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">Your <span className="text-brand-olive">Business</span></h3>
                  <Field label="Tell us briefly about your business" required error={fieldErrors.business_description}>
                    <textarea 
                      rows={4}
                      placeholder="What do you do? Who are your ideal customers?"
                      value={formData.business_description || ''} 
                      onChange={e => updateForm({ business_description: e.target.value })}
                      className={cn("input-premium resize-none", fieldErrors.business_description && "border-red-500")}
                    />
                  </Field>
                  
                  <div className="space-y-6">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Do you already have a website?
                    </label>
                    <div className="flex gap-4">
                      {[true, false].map(val => (
                        <button
                          key={String(val)}
                          onClick={() => updateForm({ existing_website: val })}
                          className={cn(
                            "px-8 py-4 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all",
                            formData.existing_website === val
                              ? "bg-brand-olive text-brand-offwhite border-brand-olive"
                              : "bg-brand-offwhite border-brand-grey text-neutral-500 hover:border-brand-olive/30"
                          )}
                        >
                          {val ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.existing_website && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <Field label="Existing Website URL">
                        <input 
                          type="url" 
                          placeholder="https://yourwebsite.com"
                          value={formData.website_url || ''} 
                          onChange={e => updateForm({ website_url: e.target.value })}
                          className="input-premium"
                        />
                      </Field>
                    </motion.div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">Project <span className="text-brand-olive">Details</span></h3>
                  <div className="space-y-10">
                    <Field label="What would you like us to build? / Key features" required error={fieldErrors.project_description}>
                      <textarea 
                        rows={6}
                        placeholder="Describe the project and any specific functionality you need..."
                        value={formData.project_description || ''} 
                        onChange={e => updateForm({ project_description: e.target.value })}
                        className={cn("input-premium resize-none", fieldErrors.project_description && "border-red-500")}
                      />
                    </Field>
                    
                    <div className="space-y-6">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        Preferred Timeline <span className="text-brand-olive">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {TIMELINES.map(t => (
                          <button
                            key={t}
                            onClick={() => updateForm({ timeline: t })}
                            className={cn(
                              "px-6 py-3 rounded-xl border-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                              formData.timeline === t
                                ? "bg-brand-olive text-brand-offwhite border-brand-olive shadow-lg shadow-brand-olive/20" 
                                : cn("bg-brand-offwhite border-brand-grey text-neutral-500 hover:border-brand-olive/30", fieldErrors.timeline && "border-red-200")
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {fieldErrors.timeline && (
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-2">{fieldErrors.timeline}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">What is your <span className="text-brand-olive">budget?</span></h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BUDGETS.map(b => (
                      <button 
                        key={b}
                        onClick={() => updateForm({ budget: b })}
                        className={cn(
                          "p-8 text-left rounded-2xl border-2 transition-all text-xs font-bold uppercase tracking-widest",
                          formData.budget === b 
                            ? "bg-brand-olive text-brand-offwhite border-brand-olive shadow-lg shadow-brand-olive/20" 
                            : cn("bg-brand-offwhite border-brand-grey text-neutral-500 hover:border-brand-olive/50", fieldErrors.budget && "border-red-200")
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.budget && (
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-4">{fieldErrors.budget}</p>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">Final <span className="text-brand-olive">Details</span></h3>
                  <Field label="Anything else we should know? (Optional)">
                    <textarea 
                      rows={8}
                      placeholder="Share any additional details, references, or questions..."
                      value={formData.notes || ''} 
                      onChange={e => updateForm({ notes: e.target.value })}
                      className="input-premium resize-none"
                    />
                  </Field>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-10">
                  <h3 className="text-3xl font-display font-bold text-neutral-800">Review your <span className="text-brand-olive">enquiry</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-brand-offwhite p-10 rounded-[32px] border border-brand-grey">
                    <SummaryItem label="Name" value={formData.name} error={fieldErrors.name} />
                    <SummaryItem label="Business" value={formData.business_name} error={fieldErrors.business_name} />
                    <SummaryItem label="Email" value={formData.email} error={fieldErrors.email} />
                    <SummaryItem label="WhatsApp" value={formData.whatsapp} error={fieldErrors.whatsapp} />
                    <SummaryItem label="Service" value={formData.service} error={fieldErrors.service} />
                    <SummaryItem label="Timeline" value={formData.timeline} error={fieldErrors.timeline} />
                    <SummaryItem label="Budget" value={formData.budget} error={fieldErrors.budget} />
                    <div className="md:col-span-2">
                      <SummaryItem label="Project Description" value={formData.project_description} error={fieldErrors.project_description} />
                    </div>
                  </div>

                  {/* Privacy & Compliance Notice */}
                  <div className="p-6 rounded-2xl bg-brand-offwhite border border-brand-beige space-y-4">
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      By submitting this enquiry, you acknowledge that Aesthetix Studio will process the information you provide to respond to your enquiry, evaluate your project requirements, communicate with you about the requested services, and manage the enquiry in accordance with our{' '}
                      <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-olive font-bold underline hover:opacity-80">
                        Privacy Policy
                      </Link>.
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-brand-beige text-brand-olive focus:ring-brand-olive accent-brand-olive cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-neutral-800 group-hover:text-brand-olive transition-colors">
                        I have read and understood the Privacy Policy.
                      </span>
                    </label>
                  </div>
                  {error && (
                    <div className="p-6 bg-red-50 text-red-500 rounded-2xl border border-red-100 animate-shake">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3">{error}</p>
                      <ul className="space-y-1">
                        {Object.entries(fieldErrors).map(([key, msg]) => (
                          <li key={key} className="text-[10px] font-bold uppercase tracking-widest opacity-80 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-500" />
                            {msg}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-brand-grey/50">
            <button 
              onClick={prevStep}
              className={cn(
                "flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-olive transition-colors",
                step === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ArrowLeft size={16} /> Previous Step
            </button>
            
            <div className="flex items-center gap-6">
              {error && step !== 6 && (
                <span className="hidden md:block text-[10px] font-bold text-red-500 uppercase tracking-widest">
                  {error}
                </span>
              )}
              {step === STEPS.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-12 py-5 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-brand-olive/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Submit Project Enquiry'}
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  className="px-12 py-5 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform flex items-center gap-3 shadow-xl shadow-brand-olive/20"
                >
                  Next Step <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input-premium {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background-color: #F7F2EB;
          border: 1.5px solid #EAE2D6;
          border-radius: 1.25rem;
          font-size: 0.875rem;
          color: #171717;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-premium:hover {
          border-color: #8B9A6E;
        }
        .input-premium:focus {
          border-color: #8B9A6E;
          box-shadow: 0 0 0 2px rgba(139, 154, 110, 0.2);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children, required, error }: { label: string, children: React.ReactNode, required?: boolean, error?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {label} {required && <span className="text-brand-olive">*</span>}
        </label>
        {error && (
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function SummaryItem({ label, value, error }: { label: string, value?: string | boolean, error?: string }) {
  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">{label}</span>
      <span className={cn(
        "text-sm font-bold block",
        error ? "text-red-500" : "text-neutral-800"
      )}>
        {value || 'Not provided'}
      </span>
      {error && (
        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1 block">{error}</span>
      )}
    </div>
  );
}
