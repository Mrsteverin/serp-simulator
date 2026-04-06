import { useState, useEffect } from 'react';

type NavItem = {
  id: string;
  label: string;
  href: string;
  isCTA?: boolean;
};

const navItems: NavItem[] = [
  { id: 'home', label: 'Hem', href: '#' },
  { id: 'treatments', label: 'Behandlingar', href: '#behandlingar' },
  { id: 'book', label: 'Boka', href: '#boka', isCTA: true },
  { id: 'content', label: 'Artiklar', href: '#innehall' },
  { id: 'contact', label: 'Kontakt', href: '#kontakt' },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-charcoal' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
    </svg>
  );
}

function SparklesIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-charcoal' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-charcoal' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function MapPinIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-charcoal' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

const icons: Record<string, (active: boolean) => React.ReactNode> = {
  home: (a) => <HomeIcon active={a} />,
  treatments: (a) => <SparklesIcon active={a} />,
  book: (_) => <CalendarIcon />,
  content: (a) => <BookIcon active={a} />,
  contact: (a) => <MapPinIcon active={a} />,
};

export default function BottomNav() {
  const [active, setActive] = useState('home');

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-taupe-light"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-end justify-around px-2 pt-2 pb-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActive(item.id)}
            className="flex flex-col items-center gap-1 min-w-0 flex-1"
          >
            {item.isCTA ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-charcoal flex items-center justify-center shadow-lg -mt-5 border-2 border-white">
                  {icons[item.id](active === item.id)}
                </div>
                <span className="text-[10px] text-charcoal font-medium">{item.label}</span>
              </>
            ) : (
              <>
                <div className="w-10 h-8 flex items-center justify-center">
                  {icons[item.id](active === item.id)}
                </div>
                <span
                  className={`text-[10px] ${
                    active === item.id ? 'text-charcoal' : 'text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
