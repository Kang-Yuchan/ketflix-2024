'use client';

import { TerminalIcon } from '@/components/icons/terminal-icon';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { SunIcon } from '@/components/icons/sun-icon';
import { MoonIcon } from '@/components/icons/moon-icon';
import Link from 'next/link';

export default function Header() {
  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleClickThemeToggle = () => {
    return setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-4 text-[#121212] lg:px-6">
      <Link href="/" prefetch={false} className="flex items-center">
        <TerminalIcon className="ml-2 text-lg" />
        <span className="ml-2 text-lg font-bold">maku</span>
      </Link>
      <div className="flex gap-4">
        <Button
          type="button"
          onClick={handleClickThemeToggle}
          className="bg-white hover:bg-slate-200"
        >
          <SunIcon className="hidden h-5 w-5 fill-[#121212] dark:block" />
          <MoonIcon className="h-5 w-5 fill-[#121212] dark:hidden" />
        </Button>
        <Link
          href="/projects"
          className="inline-flex h-9 items-center justify-center rounded-md bg-[#121212] px-4 py-2 text-sm font-medium text-primary-foreground text-white shadow transition-colors hover:bg-white hover:text-[#121212] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          View Projects
        </Link>
      </div>
    </header>
  );
}
