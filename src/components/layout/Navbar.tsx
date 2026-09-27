import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { NAVIGATION_LINKS, CONTACT_LINK } from '@/src/lib/constants/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHome
          ? "bg-brand-offwhite/80 backdrop-blur-md border-b border-brand-grey/50 py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-display font-bold tracking-tight text-brand-olive"
          aria-label="Aesthetix Studio Home"
        >
          AESTHETIX STUDIO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {NAVIGATION_LINKS.map((link) => (
            <a 
              key={link.href}
              href={isHome ? link.href : `/${link.href}`} 
              className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-brand-olive transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link 
            to="/start-project"
            className="px-8 py-3 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity"
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-neutral-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 top-[72px] bg-brand-offwhite z-40 transition-transform duration-500 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 p-6">
          {NAVIGATION_LINKS.map((link) => (
            <a 
              key={link.href}
              href={isHome ? link.href : `/${link.href}`} 
              onClick={handleLinkClick}
              className="text-2xl font-display font-bold text-neutral-800"
            >
              {link.label}
            </a>
          ))}
          <Link 
            to="/start-project"
            onClick={handleLinkClick}
            className="mt-4 px-10 py-4 bg-brand-olive text-brand-offwhite text-sm font-bold uppercase tracking-widest rounded-full"
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
