import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that whenever the route pathname changes,
 * the window is immediately scrolled to the top (top: 0, left: 0, behavior: 'instant').
 * 
 * It intentionally does not interfere with:
 * - Internal anchor hash links on the same page (#work, #services, #process, #pricing, #reviews)
 * - Modal scrolling or questionnaire step navigation
 * - Normal user scrolling
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only trigger when navigating to a different route pathname
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // If the destination route contains an anchor hash (e.g. /#pricing), scroll to that element
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }

      // Immediately reset scroll position to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return null;
}
