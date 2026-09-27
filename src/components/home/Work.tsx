import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '@/src/lib/supabase/client';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { Project } from '@/src/types/database';

export function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="work" className="section-padding bg-brand-offwhite overflow-hidden">
      <div className="container-wide">
        {/* Section Intro */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-olive">
              Selected Work
            </h2>
            <h3 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              A selection of digital products, <br className="hidden md:block" /> 
              websites and web <span className="text-brand-olive italic">experiences</span> <br className="hidden md:block" /> 
              we've designed and built.
            </h3>
          </motion.div>
        </div>

        {loading ? (
          <div className="space-y-32">
            {[1, 2].map(i => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7 aspect-[16/10] bg-brand-beige/20 rounded-[40px] animate-pulse" />
                <div className="md:col-span-5 space-y-6">
                  <div className="h-4 w-24 bg-brand-beige/20 rounded animate-pulse" />
                  <div className="h-12 w-full bg-brand-beige/20 rounded animate-pulse" />
                  <div className="h-24 w-full bg-brand-beige/20 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-32 flex flex-col items-center text-center">
            <div className="max-w-sm space-y-6">
              <div className="w-16 h-1 w-brand-olive mx-auto opacity-20" />
              <h4 className="text-2xl font-display font-bold text-neutral-400">Curating Our Best Work</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We're currently documenting our latest high-end projects. Stay tuned for a detailed look into our results.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-32 md:space-y-48">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const isFeatured = project.featured;
              
              return (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center",
                    isFeatured && "lg:scale-[1.02]"
                  )}
                >
                  {/* Project Image Container */}
                  <div className={cn(
                    "lg:col-span-7 group",
                    !isEven && "lg:order-2"
                  )}>
                    <a 
                      href={project.live_url || '#'} 
                      target={project.live_url ? "_blank" : undefined}
                      className={cn(
                        "block relative aspect-[16/10] rounded-[24px] md:rounded-[40px] overflow-hidden bg-[#EAE2D6] border border-brand-grey/30 shadow-sm transition-transform duration-[450ms] ease-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-neutral-800/5",
                        !project.live_url && "cursor-default"
                      )}
                    >
                      {project.image_url ? (
                        <div className="w-full h-full p-6 md:p-12 flex items-center justify-center">
                          <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-[450ms] ease-out group-hover:scale-[1.04]" 
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-olive/10">
                          <span className="text-[12rem] font-display font-bold">{index + 1}</span>
                        </div>
                      )}
                    </a>
                  </div>

                  {/* Project Info */}
                  <div className={cn(
                    "lg:col-span-5 flex flex-col justify-center space-y-8 transition-transform duration-[450ms] ease-out group-hover:translate-x-2",
                    !isEven && "lg:order-1 lg:text-right lg:group-hover:-translate-x-2"
                  )}>
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive block">
                        {project.category}
                      </span>
                      <h4 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-neutral-800">
                        {project.title}
                      </h4>
                    </div>

                    <p className={cn(
                      "text-neutral-500 leading-relaxed text-base md:text-lg max-w-md",
                      !isEven && "lg:ml-auto"
                    )}>
                      {project.description || "Digital experience designed and developed for a focused product experience."}
                    </p>

                    <div className={cn(
                      "flex flex-wrap gap-x-4 gap-y-2",
                      !isEven && "lg:justify-end"
                    )}>
                      {project.technologies.map((tech, i) => (
                        <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center">
                          {tech}
                          {i < project.technologies.length - 1 && (
                            <span className="mx-2 opacity-30">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className={cn(
                      "pt-4 flex flex-wrap gap-8",
                      !isEven && "lg:justify-end"
                    )}>
                      {project.live_url && (
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-800 group/btn border-b border-transparent hover:border-brand-olive pb-1 transition-all"
                        >
                          View Project 
                          <ArrowRight 
                            size={14} 
                            strokeWidth={3}
                            className="transition-transform duration-300 group-hover/btn:translate-x-2" 
                          />
                        </a>
                      )}
                      
                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 group/btn border-b border-transparent hover:border-neutral-800 pb-1 transition-all"
                        >
                          Github
                          <ArrowRight 
                            size={14} 
                            strokeWidth={3}
                            className="transition-transform duration-300 group-hover/btn:translate-x-2" 
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
