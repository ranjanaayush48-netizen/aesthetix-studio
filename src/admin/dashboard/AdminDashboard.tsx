import { useEffect, useState } from 'react';
import { AdminLayout } from '@/src/components/layout/AdminLayout';
import { supabase } from '@/src/lib/supabase/client';
import { Briefcase, Users, Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    featured: 0,
    newLeads: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: projectsCount },
          { count: featuredCount },
          { count: leadsCount },
          { count: reviewsCount }
        ] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('projects').select('*', { count: 'exact', head: true }).eq('featured', true),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'NEW'),
          supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending')
        ]);

        setStats({
          projects: projectsCount || 0,
          featured: featuredCount || 0,
          newLeads: leadsCount || 0,
          pendingReviews: reviewsCount || 0,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'text-blue-500' },
    { label: 'Featured', value: stats.featured, icon: Star, color: 'text-amber-500' },
    { label: 'New Enquiries', value: stats.newLeads, icon: Users, color: 'text-brand-olive' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: Clock, color: 'text-neutral-400' },
  ];

  return (
    <AdminLayout title="Overview">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-brand-beige/20 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-beige/20 p-8 rounded-3xl border border-brand-grey shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={stat.color}>
                  <stat.icon size={24} />
                </div>
                <span className="text-3xl font-display font-bold text-neutral-800">{stat.value}</span>
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      )}

      {/* Recent Activity / Welcome */}
      <div className="mt-12 p-12 bg-brand-olive text-brand-offwhite rounded-[40px] shadow-xl shadow-brand-olive/10">
        <h2 className="text-3xl font-display font-bold mb-4">Welcome back, Admin.</h2>
        <p className="text-brand-offwhite/70 leading-relaxed max-w-xl">
          The business engine is active. All leads and reviews are strictly moderated. 
          Portfolio updates will be immediately reflected on the public studio site.
        </p>
      </div>
    </AdminLayout>
  );
}
