import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/src/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabasePublishableKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabasePublishableKey !== 'your-publishable-key' &&
  !supabaseUrl.includes('dummy.supabase.co')
);

// Use a dummy client if environment variables are missing to keep types happy
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabasePublishableKey)
  : createClient<Database>('https://dummy.supabase.co', 'dummy-key');

if (!isSupabaseConfigured) {
  if (import.meta.env.DEV) {
    console.warn(
      'Supabase environment variables are missing or placeholders. Some features may be unavailable. ' +
      'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set.'
    );
  }
}
