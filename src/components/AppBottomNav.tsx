import type { Screen, NavigateFn } from './types';

interface Props {
  active: Screen;
  onNavigate: NavigateFn;
  onBook: () => void;
}

function TabButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 flex-1 py-2 min-w-0"
    >
      <div className="relative w-10 h-8 flex items-center justify-center">
        {active && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose" />
        )}
        {children}
      </div>
      <span className={`text-[10px] leading-none ${active ? 'text-charcoal font-medium' : 'text-muted'}`}>
        {label}
      </span>
    </button>
  );
}

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

function BookOpenIcon({ active }: { active: boolean }) {
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

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

export default function AppBottomNav({ active, onNavigate, onBook }: Props) {
  return (
    <div
      className="flex-shrink-0 bg-white border-t border-taupe-light"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-end justify-around px-2 pt-1 pb-1">
        <TabButton label="Hem" active={active === 'home'} onClick={() => onNavigate('home')}>
          <HomeIcon active={active === 'home'} />
        </TabButton>

        <TabButton label="Behandlingar" active={active === 'treatments'} onClick={() => onNavigate('treatments')}>
          <SparklesIcon active={active === 'treatments'} />
        </TabButton>

        {/* Center CTA */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <button
            onClick={onBook}
            className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-charcoal flex items-center justify-center shadow-lg -mt-6 border-[3px] border-white"
          >
            <CalendarIcon />
          </button>
          <span className="text-[10px] text-charcoal font-medium leading-none">Boka</span>
        </div>

        <TabButton label="Artiklar" active={active === 'content'} onClick={() => onNavigate('content')}>
          <BookOpenIcon active={active === 'content'} />
        </TabButton>

        <TabButton label="Kontakt" active={active === 'contact'} onClick={() => onNavigate('contact')}>
          <MapPinIcon active={active === 'contact'} />
        </TabButton>
      </div>
    </div>
  );
}
