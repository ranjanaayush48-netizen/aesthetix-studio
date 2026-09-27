import { useEffect, useState } from 'react';
import { AdminLayout } from '@/src/components/layout/AdminLayout';
import { supabase } from '@/src/lib/supabase/client';
import { Mail, Phone, Calendar, Briefcase, DollarSign, Clock, ChevronRight, X, Loader2, ExternalLink, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import type { Lead, LeadStatus } from '@/src/types/database';

const STATUS_COLORS: Record<LeadStatus, string> = {
  'NEW': 'bg-blue-500',
  'CONTACTED': 'bg-amber-500',
  'DISCUSSION': 'bg-purple-500',
  'QUOTED': 'bg-indigo-500',
  'WON': 'bg-brand-olive',
  'LOST': 'bg-red-400'
};

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await (supabase
      .from('leads') as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setLeads(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdating(true);
    try {
      const { error } = await (supabase
        .from('leads') as any)
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status });
      }
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  }

  async function deleteLead() {
    if (!leadToDelete) return;
    setIsDeleting(true);

    try {
      const { error } = await (supabase
        .from('leads') as any)
        .delete()
        .eq('id', leadToDelete.id);

      if (error) throw error;

      setLeads(prev => prev.filter(l => l.id !== leadToDelete.id));
      if (selectedLead?.id === leadToDelete.id) {
        setSelectedLead(null);
      }
      setLeadToDelete(null);
      // Optional success feedback
      console.log('Enquiry deleted successfully.');
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('Unable to delete this enquiry. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AdminLayout title="Enquiries">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-brand-beige/20 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 bg-brand-beige/10 rounded-3xl border border-dashed border-brand-grey">
          <p className="text-neutral-400 italic">No enquiries received yet.</p>
        </div>
      ) : (
        <div className="bg-brand-offwhite border border-brand-grey rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-beige/20 border-b border-brand-grey">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Client</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Service</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Budget/Timeline</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Date</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="border-b border-brand-grey/50 hover:bg-brand-beige/5 transition-colors cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-8 py-6">
                    <div className="font-bold text-neutral-800">{lead.name}</div>
                    <div className="text-xs text-neutral-400">{lead.business_name || 'Individual'}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-olive">{lead.service}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <DollarSign size={12} /> {lead.budget || 'N/A'}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <Clock size={12} /> {lead.timeline || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white",
                      STATUS_COLORS[lead.status]
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs text-neutral-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setLeadToDelete(lead);
                        }}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                      <ChevronRight size={18} className="text-neutral-300 group-hover:text-brand-olive transition-colors" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-brand-offwhite rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-8 border-b border-brand-grey flex justify-between items-center bg-brand-beige/10">
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-1">{selectedLead.name}</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{selectedLead.business_name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setLeadToDelete(selectedLead)}
                      className="p-3 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-brand-grey/50 rounded-full">
                      <X size={20} />
                    </button>
                  </div>
                </div>

              <div className="flex-grow overflow-y-auto p-12 space-y-12">
                {/* Status Update */}
                <div className="flex flex-wrap gap-3 p-6 bg-brand-beige/20 rounded-2xl border border-brand-grey">
                  <span className="w-full text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Update Status</span>
                  {(Object.keys(STATUS_COLORS) as LeadStatus[]).map(s => (
                    <button 
                      key={s}
                      onClick={() => updateStatus(selectedLead.id, s)}
                      disabled={updating}
                      className={cn(
                        "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                        selectedLead.status === s 
                          ? STATUS_COLORS[s] + " text-white" 
                          : "bg-white border border-brand-grey text-neutral-400 hover:border-brand-olive/50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <DetailItem icon={Mail} label="Email" value={selectedLead.email} />
                    <DetailItem icon={Phone} label="WhatsApp" value={selectedLead.whatsapp} />
                    <DetailItem icon={Briefcase} label="Service" value={selectedLead.service} />
                  </div>
                  <div className="space-y-8">
                    <DetailItem icon={DollarSign} label="Budget" value={selectedLead.budget} />
                    <DetailItem icon={Clock} label="Timeline" value={selectedLead.timeline} />
                    <DetailItem icon={Calendar} label="Received" value={new Date(selectedLead.created_at).toLocaleString()} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Business Description</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed bg-brand-offwhite p-6 rounded-2xl border border-brand-grey">
                    {selectedLead.business_description || 'No description provided.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Project Description</h4>
                  <p className="text-sm text-neutral-800 leading-relaxed bg-brand-beige/10 p-8 rounded-2xl border border-brand-olive/10">
                    {selectedLead.project_description}
                  </p>
                </div>

                {selectedLead.existing_website && (
                  <DetailItem icon={ExternalLink} label="Existing Website" value={selectedLead.website_url} isLink />
                )}

                {selectedLead.reference_websites && (
                  <DetailItem icon={ExternalLink} label="Reference Websites" value={selectedLead.reference_websites} />
                )}

                {selectedLead.notes && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Additional Notes</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed bg-brand-offwhite p-6 rounded-2xl border border-brand-grey italic">
                      "{selectedLead.notes}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {leadToDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setLeadToDelete(null)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-brand-offwhite p-10 rounded-[32px] shadow-2xl border border-brand-grey text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={24} />
              </div>
              
              <h2 className="text-xl font-display font-bold text-neutral-800 mb-2">Delete this enquiry?</h2>
              <p className="text-sm font-bold text-brand-olive mb-4">{leadToDelete.name} — {leadToDelete.business_name || 'Individual'}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8 leading-relaxed">
                Are you sure you want to permanently remove this project enquiry? This action cannot be undone.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={deleteLead}
                  disabled={isDeleting}
                  className="w-full py-4 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting && <Loader2 size={14} className="animate-spin" />}
                  {isDeleting ? 'DELETING...' : 'DELETE ENQUIRY'}
                </button>
                <button 
                  onClick={() => setLeadToDelete(null)}
                  disabled={isDeleting}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors disabled:opacity-50"
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

function DetailItem({ icon: Icon, label, value, isLink }: { icon: any, label: string, value?: string, isLink?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-brand-olive/10 flex items-center justify-center flex-shrink-0 text-brand-olive">
        <Icon size={18} />
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">{label}</span>
        {isLink ? (
          <a href={value} target="_blank" className="text-sm font-bold text-brand-olive hover:underline">{value}</a>
        ) : (
          <span className="text-sm font-bold text-neutral-800 break-all">{value}</span>
        )}
      </div>
    </div>
  );
}
