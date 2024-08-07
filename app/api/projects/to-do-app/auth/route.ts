import { createServerSideClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServerSideClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json(data.user);
}
