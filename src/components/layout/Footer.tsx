import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_LINKS } from '@/src/lib/constants/navigation';

export function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="bg-brand-beige/20 border-t border-brand-grey py-20 px-6">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <Link to="/" className="text-2xl font-display font-bold text-brand-olive mb-6 block">
              AESTHETIX STUDIO
            </Link>
            <p className="text-neutral-500 max-w-sm leading-relaxed mb-8">
              Creating high-end digital experiences that balance sophisticated design with 
              uncompromising performance. Built for forward-thinking brands.
            </p>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-neutral-400">Navigation</h4>
            <ul className="space-y-4">
              {NAVIGATION_LINKS.map(link => (
                <li key={link.href}>
                  <a 
                    href={isHome ? link.href : `/${link.href}`} 
                    className="text-sm text-neutral-600 hover:text-brand-olive transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-neutral-400">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy-policy" className="text-sm text-neutral-600 hover:text-brand-olive transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-neutral-600 hover:text-brand-olive transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-neutral-400">Admin</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/admin/login" className="text-sm text-neutral-600 hover:text-brand-olive transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-neutral-600 hover:text-brand-olive transition-colors">
                  Security Report
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-grey flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            © 2026 AESTHETIX STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Instagram</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">LinkedIn</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">X / Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
