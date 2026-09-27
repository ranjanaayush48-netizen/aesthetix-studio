import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/src/lib/supabase/client';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  useEffect(() => {
    async function checkSession() {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await (supabase
          .from('profiles') as any)
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate(from, { replace: true });
        }
      }
    }
    checkSession();
  }, [navigate, from]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError('Admin system is currently unavailable. Please check your configuration.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Authentication succeeded but no user data was returned.');
      }

      // Verify admin role using the user ID from the successful login
      const { data: profile, error: profileError } = await (supabase
        .from('profiles') as any)
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        await supabase.auth.signOut();
        throw new Error(`Profile check failed: ${profileError.message}`);
      }

      if (!profile) {
        await supabase.auth.signOut();
        throw new Error('User profile not found.');
      }

      if (profile.role !== 'admin') {
        // Sign out if not admin
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin privileges required.');
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login flow error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-offwhite px-6">
      <div className="w-full max-w-md bg-brand-beige/20 p-12 rounded-3xl border border-brand-grey shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-display font-bold text-brand-olive mb-2">STUDIO ADMIN</h1>
          <p className="text-sm text-neutral-500 uppercase tracking-widest">Aesthetix Studio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-brand-offwhite border border-brand-grey rounded-xl focus:border-brand-olive outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-brand-offwhite border border-brand-grey rounded-xl focus:border-brand-olive outline-none transition-all"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-olive text-brand-offwhite text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <a href="/" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-olive transition-colors">
            ← Return to Studio
          </a>
        </div>
      </div>
    </div>
  );
}
