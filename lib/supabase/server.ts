import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// - ServerActions, RouterHandler
export const createServerSideClient = () => {
  const cookieStore = cookies();
  console.log(cookieStore);
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
};
