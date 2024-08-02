'use client';

import { CURRENT_YEAR } from '@/constants/datetime';

type Link = {
  key: string;
  label: string;
  link: string;
};

const FOOTER_LINKS: Link[] = [
  {
    key: 'qiita',
    label: 'Qiita',
    link: 'https://qiita.com/Kang-Yuchan',
  },
  {
    key: 'linked_in',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/yuchan-kang-149a30178/',
  },
  {
    key: 'github',
    label: 'GitHub',
    link: 'https://github.com/Kang-Yuchan',
  },
];

export default function Footer() {
  return (
    <footer className="flex h-14 items-center justify-between px-4 text-black lg:px-6">
      <p className="text-xs text-muted-foreground">
        &copy; {CURRENT_YEAR} Yuchan Kang. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        {FOOTER_LINKS.map((v) => (
          <a
            key={v.key}
            href={v.link}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {v.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
