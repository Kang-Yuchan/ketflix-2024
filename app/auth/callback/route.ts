import { createServerSideClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const overrideUrl = process.env.NEXT_PUBLIC_HOME_URL;
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');
  const next = searchParams.get('next');
  console.log(code);
  if (code) {
    const supabase = createServerSideClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${overrideUrl}`);
    }
    return NextResponse.redirect(`${overrideUrl}${next}`);
  }

  return NextResponse.redirect(`${overrideUrl}`);
}
