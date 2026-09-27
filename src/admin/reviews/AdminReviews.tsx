import { useEffect, useState } from 'react';
import { AdminLayout } from '@/src/components/layout/AdminLayout';
import { supabase } from '@/src/lib/supabase/client';
import { Star, CheckCircle, XCircle, Trash2, Loader2, MessageSquare, X, Calendar, User, Briefcase, Mail, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import type { Review, ReviewStatus } from '@/src/types/database';

export function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReviewStatus | 'all'>('pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [actionModal, setActionModal] = useState<{ review: Review, type: 'publish' | 'remove' | 'restore' | 'delete_permanent' } | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  async function fetchReviews() {
    setLoading(true);
    let query = (supabase.from('reviews') as any).select('*').order('created_at', { ascending: false });
    
    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    if (data) setReviews(data);
    setLoading(false);
  }

  async function handleAction() {
    if (!actionModal) return;
    const { review, type } = actionModal;
    
    setUpdating(review.id);
    try {
      if (type === 'delete_permanent') {
        const { error } = await (supabase
          .from('reviews') as any)
          .delete()
          .eq('id', review.id);
        
        if (error) throw error;
        
        setReviews(prev => prev.filter(r => r.id !== review.id));
        if (selectedReview?.id === review.id) {
          setSelectedReview(null);
        }
        setActionModal(null);
        return;
      }

      const nextStatus: ReviewStatus = type === 'remove' ? 'removed' : 'published';
      const { error } = await (supabase
        .from('reviews') as any)
        .update({ status: nextStatus })
        .eq('id', review.id);
      
      if (error) throw error;
      
      setReviews(prev => {
        if (filter === 'all') {
          return prev.map(r => r.id === review.id ? { ...r, status: nextStatus } : r);
        }
        return prev.filter(r => r.id !== review.id);
      });
      
      if (selectedReview?.id === review.id) {
        setSelectedReview({ ...selectedReview, status: nextStatus });
      }
      
      setActionModal(null);
    } catch (err: any) {
      console.error('Action error:', err);
      alert('Operation failed. Please try again.');
    } finally {
      setUpdating(null);
    }
  }

  return (
    <AdminLayout title="Reviews">
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {(['pending', 'published', 'removed', 'all'] as const).map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2",
              filter === f 
                ? "bg-brand-olive text-brand-offwhite border-brand-olive shadow-lg shadow-brand-olive/20" 
                : "bg-brand-offwhite border-brand-grey text-neutral-400 hover:border-brand-olive/30 hover:text-brand-olive"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-brand-beige/10 rounded-[32px] animate-pulse border border-brand-grey/50" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-24 bg-brand-beige/5 rounded-[40px] border border-dashed border-brand-grey">
          <MessageSquare className="mx-auto text-brand-grey mb-4" size={32} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">No reviews found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <motion.div 
              layout
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-offwhite border border-brand-grey p-8 md:p-10 rounded-[32px] shadow-sm hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => setSelectedReview(review)}
            >
              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={cn(i < review.rating ? "text-amber-500 fill-amber-500" : "text-neutral-200")} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {new Date(review.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                      review.status === 'published' ? "bg-green-50 text-green-600 border-green-100" : 
                      review.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-neutral-50 text-neutral-400 border-neutral-100"
                    )}>
                      {review.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-neutral-800 mb-2">{review.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-olive mb-6">
                    {review.business_name} {review.project && `• ${review.project}`}
                  </p>
                  
                  <p className="text-neutral-600 leading-relaxed italic line-clamp-3">
                    "{review.message}"
                  </p>
                </div>

                <div className="flex md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-brand-grey pt-8 md:pt-0 md:pl-10 min-w-[160px]">
                  {review.status === 'pending' && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActionModal({ review, type: 'publish' }); }}
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActionModal({ review, type: 'remove' }); }}
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-100 text-neutral-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <X size={14} /> Remove
                      </button>
                    </>
                  )}
                  {review.status === 'published' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActionModal({ review, type: 'remove' }); }}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-100 text-neutral-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                  {review.status === 'removed' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActionModal({ review, type: 'restore' }); }}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <CheckCircle size={14} /> Restore
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Review Detail Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReview(null)} className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-brand-offwhite rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-brand-grey flex justify-between items-center bg-brand-beige/10">
                <div>
                  <h2 className="text-2xl font-display font-bold text-neutral-800 mb-1">{selectedReview.name}</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{selectedReview.business_name}</p>
                </div>
                <button onClick={() => setSelectedReview(null)} className="p-2 hover:bg-brand-grey/50 rounded-full transition-colors"><X size={20} /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <DetailItem icon={Mail} label="Email Address" value={selectedReview.email} />
                    <DetailItem icon={Briefcase} label="Project" value={selectedReview.project || 'Not specified'} />
                    <DetailItem icon={Calendar} label="Submitted On" value={new Date(selectedReview.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })} />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Rating</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className={cn(i < selectedReview.rating ? "text-amber-500 fill-amber-500" : "text-neutral-200")} />
                        ))}
                      </div>
                    </div>
                    <DetailItem 
                      icon={CheckCircle} 
                      label="Current Status" 
                      value={selectedReview.status.toUpperCase()} 
                      valueClassName={cn(
                        selectedReview.status === 'published' ? "text-green-600" : 
                        selectedReview.status === 'pending' ? "text-amber-600" : "text-red-500"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Review Message</span>
                  <div className="bg-brand-beige/5 border border-brand-grey p-10 rounded-[32px]">
                    <p className="text-lg text-neutral-600 leading-relaxed italic font-serif">
                      "{selectedReview.message}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-brand-grey bg-brand-beige/10 flex flex-col md:flex-row justify-between gap-4">
                <button 
                  onClick={() => setActionModal({ review: selectedReview, type: 'delete_permanent' })}
                  className="px-6 py-4 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all order-2 md:order-1"
                >
                  Delete Permanently
                </button>
                <div className="flex gap-4 order-1 md:order-2">
                  {selectedReview.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => setActionModal({ review: selectedReview, type: 'publish' })}
                        className="flex-1 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90"
                      >
                        Approve Review
                      </button>
                      <button 
                        onClick={() => setActionModal({ review: selectedReview, type: 'remove' })}
                        className="flex-1 px-8 py-4 bg-neutral-100 text-neutral-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </>
                  )}
                  {selectedReview.status === 'published' && (
                    <button 
                      onClick={() => setActionModal({ review: selectedReview, type: 'remove' })}
                      className="flex-1 px-8 py-4 bg-neutral-100 text-neutral-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600"
                    >
                      Remove Review
                    </button>
                  )}
                  {selectedReview.status === 'removed' && (
                    <button 
                      onClick={() => setActionModal({ review: selectedReview, type: 'restore' })}
                      className="flex-1 px-8 py-4 bg-brand-olive text-brand-offwhite text-[10px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90"
                    >
                      Restore Review
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Confirmation Modal */}
      <AnimatePresence>
        {actionModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !updating && setActionModal(null)} className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-brand-offwhite p-10 rounded-[40px] shadow-2xl text-center border border-brand-grey">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8",
                actionModal.type === 'publish' || actionModal.type === 'restore' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
              )}>
                {actionModal.type === 'publish' || actionModal.type === 'restore' ? <Check size={24} /> : <Trash2 size={24} />}
              </div>
              
              <h2 className="text-2xl font-display font-bold text-neutral-800 mb-2">
                {actionModal.type === 'publish' ? 'Publish this review?' : 
                 actionModal.type === 'restore' ? 'Restore this review?' : 
                 actionModal.type === 'delete_permanent' ? 'Delete this review permanently?' : 'Remove this review?'}
              </h2>
              <div className="mb-8 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 leading-relaxed">
                  {actionModal.type === 'publish' ? 'Once published, this review will appear in the public Reviews section.' : 
                   actionModal.type === 'restore' ? 'This review will become visible on the public website again.' : 
                   actionModal.type === 'delete_permanent' ? 'This will permanently remove this review from your database. This action cannot be undone.' : 'The review will no longer appear publicly.'}
                </p>
                {actionModal.type === 'delete_permanent' && (
                  <div className="bg-neutral-50 p-4 rounded-xl text-left border border-neutral-100">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Reviewer</p>
                    <p className="text-[10px] font-bold text-neutral-800 mb-2">{actionModal.review.name}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Business</p>
                    <p className="text-[10px] font-bold text-neutral-800">{actionModal.review.business_name || 'N/A'}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAction}
                  disabled={!!updating}
                  className={cn(
                    "w-full py-4 text-brand-offwhite text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
                    actionModal.type === 'publish' || actionModal.type === 'restore' 
                      ? "bg-brand-olive shadow-brand-olive/20 hover:opacity-90" 
                      : "bg-red-500 shadow-red-500/20 hover:bg-red-600"
                  )}
                >
                  {updating === actionModal.review.id ? <Loader2 size={14} className="animate-spin" /> : null}
                  {actionModal.type === 'publish' ? 'PUBLISH REVIEW' : 
                   actionModal.type === 'restore' ? 'RESTORE REVIEW' : 
                   actionModal.type === 'delete_permanent' ? 'DELETE PERMANENTLY' : 'REMOVE REVIEW'}
                </button>
                <button 
                  onClick={() => setActionModal(null)}
                  disabled={!!updating}
                  className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

function DetailItem({ icon: Icon, label, value, valueClassName }: { icon: any, label: string, value: string, valueClassName?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-brand-olive" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{label}</span>
      </div>
      <p className={cn("text-sm font-bold text-neutral-800", valueClassName)}>{value}</p>
    </div>
  );
}
