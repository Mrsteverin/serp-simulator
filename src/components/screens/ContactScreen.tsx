import { motion } from 'framer-motion';

interface Props {
  onBook: () => void;
}

const hours = [
  { day: 'Måndag', time: '09:00–18:00', open: true },
  { day: 'Tisdag', time: '09:00–18:00', open: true },
  { day: 'Onsdag', time: '09:00–18:00', open: true },
  { day: 'Torsdag', time: '09:00–19:00', open: true },
  { day: 'Fredag', time: '09:00–17:00', open: true },
  { day: 'Lördag', time: '10:00–16:00', open: true },
  { day: 'Söndag', time: 'Stängt', open: false },
];

// Easter 2026 deviations
const easterDeviations = [
  { label: 'Skärtorsdag', date: '2 apr', time: '09:00–16:00', open: true },
  { label: 'Långfredagen', date: '3 apr', time: '10:00–14:00', open: true },
  { label: 'Påskafton', date: '4 apr', time: 'Stängt', open: false },
  { label: 'Påskdagen', date: '5 apr', time: 'Stängt', open: false },
  { label: 'Annandag påsk', date: '6 apr', time: 'Stängt', open: false },
];

// Show banner from 26 mar → 7 apr 2026
function showEasterBanner(): boolean {
  const now = new Date();
  const start = new Date('2026-03-26');
  const end = new Date('2026-04-07');
  return now >= start && now <= end;
}

const DAY_NAMES = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

function isToday(day: string) {
  return DAY_NAMES[new Date().getDay()] === day;
}

function isOpenNow(): boolean {
  const now = new Date();
  const dayIdx = now.getDay();
  const h = now.getHours();
  if (dayIdx === 0) return false;
  if (dayIdx === 6) return h >= 10 && h < 16;
  if (dayIdx === 4) return h >= 9 && h < 19;
  if (dayIdx === 5) return h >= 9 && h < 17;
  return h >= 9 && h < 18;
}

export default function ContactScreen({ onBook }: Props) {
  const openNow = isOpenNow();
  const showEaster = showEasterBanner();

  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5">
        <h1 className="font-serif text-3xl text-charcoal">Kontakt</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full ${openNow ? 'bg-green-500' : 'bg-muted'}`} />
          <span className="text-sm text-charcoal-soft">
            {openNow ? 'Öppet nu' : 'Stängt just nu'}
          </span>
        </div>
      </div>

      {/* Easter deviation banner */}
      {showEaster && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-5 mb-4"
        >
          <div className="rounded-2xl border border-champagne/40 bg-champagne/10 p-5">
            {/* Title row */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-lg">🐣</span>
              <div>
                <div className="font-medium text-charcoal text-sm">Öppet i Påsk</div>
                <div className="text-[11px] text-muted">Avvikande öppettider 2–6 april</div>
              </div>
            </div>

            {/* Deviation rows */}
            <div className="space-y-0">
              {easterDeviations.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-champagne/20 last:border-0"
                >
                  <div>
                    <span className="text-sm text-charcoal">{d.label}</span>
                    <span className="text-[11px] text-muted ml-2">{d.date}</span>
                  </div>
                  <span className={`text-sm font-medium ${d.open ? 'text-charcoal' : 'text-muted'}`}>
                    {d.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Regular opening hours */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: showEaster ? 0.05 : 0 }}
        className="mx-5 mb-4"
      >
        <div className="bg-white border border-taupe-light rounded-2xl p-5">
          <h3 className="font-serif text-xl text-charcoal mb-4">Öppettider</h3>
          <div className="space-y-1">
            {hours.map((h, i) => {
              const today = isToday(h.day);
              return (
                <div
                  key={i}
                  className={`flex justify-between items-center py-2 border-b border-taupe-light/40 last:border-0 ${
                    today ? 'bg-rose-light/40 -mx-2 px-2 rounded-lg' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {today && <div className="w-1.5 h-1.5 rounded-full bg-rose flex-shrink-0" />}
                    <span className={`text-sm ${today ? 'text-charcoal font-medium' : 'text-charcoal-soft'}`}>
                      {h.day}
                      {today && <span className="text-[11px] text-rose ml-1.5">idag</span>}
                    </span>
                  </div>
                  <span className={`text-sm ${today ? 'text-charcoal font-medium' : h.open ? 'text-charcoal-soft' : 'text-muted'}`}>
                    {h.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-5 mb-4"
      >
        <div className="bg-white border border-taupe-light rounded-2xl p-5">
          <div className="text-[11px] uppercase tracking-[0.13em] text-muted mb-2">Adress</div>
          <div className="font-serif text-xl text-charcoal">Norra Hamngatan 18</div>
          <div className="text-charcoal-soft text-sm mt-0.5">411 06 Göteborg</div>
          <a
            href="https://maps.google.com/?q=Norra+Hamngatan+18+Göteborg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-rose-dark mt-3"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Öppna i kartor
          </a>
        </div>
      </motion.div>

      {/* Phone + Email */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mx-5 mb-4 grid grid-cols-2 gap-3"
      >
        <a
          href="tel:031154455"
          className="bg-white border border-taupe-light rounded-2xl p-4 flex flex-col gap-1 active:bg-warm transition-colors"
        >
          <div className="text-[11px] uppercase tracking-[0.13em] text-muted">Telefon</div>
          <div className="text-sm font-medium text-charcoal">031-15 44 55</div>
          <div className="text-xs text-rose-dark mt-1">Ring oss →</div>
        </a>
        <a
          href="mailto:info@citylaser.se"
          className="bg-white border border-taupe-light rounded-2xl p-4 flex flex-col gap-1 active:bg-warm transition-colors"
        >
          <div className="text-[11px] uppercase tracking-[0.13em] text-muted">E-post</div>
          <div className="text-sm font-medium text-charcoal break-all">info@citylaser.se</div>
          <div className="text-xs text-rose-dark mt-1">Maila oss →</div>
        </a>
      </motion.div>

      {/* Social */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mx-5 mb-4"
      >
        <div className="bg-white border border-taupe-light rounded-2xl p-5">
          <div className="text-[11px] uppercase tracking-[0.13em] text-muted mb-3">Följ oss</div>
          <div className="flex gap-3">
            {['Instagram', 'Facebook', 'TikTok'].map((s) => (
              <a
                key={s}
                href="#"
                className="flex-1 border border-taupe-light rounded-xl py-2.5 text-center text-xs text-charcoal-soft hover:border-taupe transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Boka CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mx-5 mb-6"
      >
        <button
          onClick={onBook}
          className="w-full bg-charcoal text-cream py-4 rounded-2xl text-sm tracking-wide font-medium"
        >
          Boka din tid nu
        </button>
      </motion.div>
    </div>
  );
}
