import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json(data);
}
