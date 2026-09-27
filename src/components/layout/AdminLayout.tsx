import { ReactNode, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Star, 
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase/client';
import { cn } from '@/src/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: Briefcase },
    { label: 'Leads', href: '/admin/leads', icon: Users },
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-6 bg-brand-beige/20 border-b border-brand-grey sticky top-0 z-50">
        <span className="text-sm font-display font-bold text-brand-olive tracking-tight">AESTHETIX ADMIN</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-neutral-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-brand-offwhite z-40 p-6 flex flex-col space-y-4 border-b border-brand-grey shadow-xl">
          <nav className="space-y-2 flex-grow">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/admin'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  isActive 
                    ? "bg-brand-olive text-brand-offwhite shadow-lg shadow-brand-olive/20" 
                    : "text-neutral-500 hover:bg-brand-grey/50 hover:text-brand-olive"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-4 border-t border-brand-grey space-y-2">
            <Link 
              to="/" 
              target="_blank" 
              className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-olive transition-colors"
            >
              <ExternalLink size={14} />
              View Studio
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-brand-beige/20 border-r border-brand-grey flex-col fixed inset-y-0">
        <div className="p-8 border-b border-brand-grey">
          <span className="text-sm font-display font-bold text-brand-olive tracking-tight">AESTHETIX ADMIN</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {navItems.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                isActive 
                  ? "bg-brand-olive text-brand-offwhite shadow-lg shadow-brand-olive/20" 
                  : "text-neutral-500 hover:bg-brand-grey/50 hover:text-brand-olive"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-grey">
          <Link 
            to="/" 
            target="_blank" 
            className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-olive transition-colors mb-2"
          >
            <ExternalLink size={14} />
            View Studio
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 p-6 sm:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-display font-bold">{title}</h1>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
