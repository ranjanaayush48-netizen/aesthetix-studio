import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/src/lib/supabase/client';
import type { UserRole } from '@/src/types/database';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        // Check profile for admin role
        const { data: profile, error: profileError } = await (supabase
          .from('profiles') as any)
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('ProtectedRoute: Profile fetch error:', profileError);
          setAuthorized(false);
        } else if (!profile || profile.role !== 'admin') {
          console.warn('ProtectedRoute: Unauthorized access attempt - role is not admin');
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        console.error('ProtectedRoute: Auth check failed:', err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-olive animate-pulse">
          Authenticating...
        </div>
      </div>
    );
  }

  if (!authorized) {
    // Redirect to login but save the current location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
