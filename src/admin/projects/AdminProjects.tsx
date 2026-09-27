import { useEffect, useState } from 'react';
import { AdminLayout } from '@/src/components/layout/AdminLayout';
import { supabase } from '@/src/lib/supabase/client';
import { Plus, Edit2, Trash2, ExternalLink, Star, GripVertical, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageUpload } from './ImageUpload';
import { cn } from '@/src/lib/utils';
import type { Project } from '@/src/types/database';

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const { data, error } = await (supabase
        .from('projects') as any)
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      if (data) setProjects(data);
    } catch (err: any) {
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);

    try {
      if (editingProject.id) {
        // Update
        const { error } = await (supabase
          .from('projects') as any)
          .update(editingProject)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await (supabase
          .from('projects') as any)
          .insert([editingProject]);
        if (error) throw error;
      }
      setEditingProject(null);
      await fetchProjects();
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function performDelete() {
    if (!projectToDelete) return;
    
    const project = projectToDelete;
    setProjectToDelete(null);
    setDeletingId(project.id);
    
    try {
      // 1. Optional Storage Cleanup
      if (project.image_url) {
        try {
          const url = new URL(project.image_url);
          if (url.pathname.includes('/project-images/')) {
            const pathParts = url.pathname.split('/project-images/');
            const storagePath = pathParts[1];
            if (storagePath) {
              await supabase.storage.from('project-images').remove([storagePath]);
            }
          }
        } catch (storageErr) {
          console.warn('Storage cleanup skipped or failed:', storageErr);
        }
      }

      // 2. Database Deletion
      const { error } = await (supabase
        .from('projects') as any)
        .delete()
        .eq('id', project.id);

      if (error) {
        if (error.code === '42501') {
          throw new Error('Permission denied. You do not have admin rights to delete projects.');
        }
        throw error;
      }

      // 3. UI Update
      setProjects(prev => prev.filter(p => p.id !== project.id));
      // Success message could be a toast, for now using console/feedback is sufficient as project disappears
    } catch (err: any) {
      console.error('Delete operation failed:', err);
      alert(`Delete failed: ${err.message || 'Unknown database error'}`);
      await fetchProjects();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminLayout title="Projects">
      <div className="flex justify-end mb-8">
        <button 
          onClick={() => setEditingProject({ 
            title: '', slug: '', category: '', description: '', 
            technologies: [], featured: false, display_order: projects.length 
          })}
          className="flex items-center gap-3 px-6 py-3 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-brand-beige/20 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-brand-beige/10 rounded-3xl border border-dashed border-brand-grey">
          <p className="text-neutral-400 italic">No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="flex items-center gap-6 p-6 bg-brand-offwhite border border-brand-grey rounded-2xl hover:shadow-lg hover:border-brand-olive/20 transition-all group"
            >
              <div className="text-neutral-300">
                <GripVertical size={20} />
              </div>
              
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-grey flex-shrink-0">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    <Plus size={20} />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  {project.featured && <Star size={14} className="text-amber-500 fill-amber-500" />}
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
                  <span>{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-grey" />
                  <span>/{project.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingProject(project)}
                  disabled={!!deletingId}
                  className="p-3 text-neutral-500 hover:text-brand-olive hover:bg-brand-olive/5 rounded-full transition-all disabled:opacity-30"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => setProjectToDelete(project)}
                  disabled={!!deletingId}
                  className="p-3 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-30"
                >
                  {deletingId === project.id ? <Loader2 size={18} className="animate-spin text-red-500" /> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Editor Modal */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProject(null)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-brand-offwhite rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-brand-grey flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">
                  {editingProject.id ? 'Edit Project' : 'New Project'}
                </h2>
                <button onClick={() => setEditingProject(null)} className="p-2 hover:bg-brand-grey/50 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-12 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <Field label="Project Title">
                      <input 
                        type="text" 
                        required
                        value={editingProject.title || ''} 
                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="input-admin"
                      />
                    </Field>
                    <Field label="Slug (URL path)">
                      <input 
                        type="text" 
                        required
                        value={editingProject.slug || ''} 
                        onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                        className="input-admin"
                      />
                    </Field>
                    <Field label="Category">
                      <select 
                        required
                        value={editingProject.category || ''} 
                        onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="input-admin"
                      >
                        <option value="">Select Category</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Platform">Platform</option>
                      </select>
                    </Field>
                    <Field label="Technologies (comma separated)">
                      <input 
                        type="text" 
                        value={editingProject.technologies?.join(', ') || ''} 
                        onChange={e => setEditingProject({ 
                          ...editingProject, 
                          technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                        className="input-admin"
                        placeholder="React, Supabase, Tailwind..."
                      />
                    </Field>
                  </div>

                  <div className="space-y-8">
                    <Field label="Project Image">
                      <ImageUpload 
                        currentUrl={editingProject.image_url} 
                        onUpload={url => setEditingProject({ ...editingProject, image_url: url })}
                      />
                    </Field>
                    <div className="flex items-center gap-4">
                      <button 
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, featured: !editingProject.featured })}
                        className={cn(
                          "w-12 h-6 rounded-full transition-all relative border",
                          editingProject.featured ? "bg-brand-olive border-brand-olive" : "bg-brand-grey border-brand-beige"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all",
                          editingProject.featured ? "translate-x-6" : "translate-x-0"
                        )} />
                      </button>
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Feature this project</span>
                    </div>
                  </div>
                </div>

                <Field label="Description">
                  <textarea 
                    rows={4}
                    required
                    value={editingProject.description || ''} 
                    onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="input-admin resize-none"
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Live URL">
                    <input 
                      type="url" 
                      value={editingProject.live_url || ''} 
                      onChange={e => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      className="input-admin"
                      placeholder="https://..."
                    />
                  </Field>
                  <Field label="GitHub URL">
                    <input 
                      type="url" 
                      value={editingProject.github_url || ''} 
                      onChange={e => setEditingProject({ ...editingProject, github_url: e.target.value })}
                      className="input-admin"
                      placeholder="https://github.com/..."
                    />
                  </Field>
                </div>
              </form>

              <div className="p-8 border-t border-brand-grey flex justify-end gap-4 bg-brand-beige/10">
                <button 
                  onClick={() => setEditingProject(null)}
                  className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-12 py-4 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectToDelete(null)}
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
              
              <h2 className="text-xl font-display font-bold text-neutral-800 mb-2">Delete project?</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">This action cannot be undone.</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={performDelete}
                  className="w-full py-4 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  DELETE PROJECT
                </button>
                <button 
                  onClick={() => setProjectToDelete(null)}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .input-admin {
          width: 100%;
          padding: 1rem 1.25rem;
          background-color: #F7F2EB;
          border: 1.5px solid #EAE2D6;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #171717;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-admin:hover {
          border-color: #8B9A6E;
        }
        .input-admin:focus {
          border-color: #8B9A6E;
          box-shadow: 0 0 0 2px rgba(139, 154, 110, 0.2);
        }
        select.input-admin {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B9A6E' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
      `}</style>
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </label>
      {children}
    </div>
  );
}
