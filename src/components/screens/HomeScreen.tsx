import { motion } from 'framer-motion';
import type { NavigateFn } from '../types';

interface Props {
  onBook: () => void;
  onNavigate: NavigateFn;
}

const quickTreatments = [
  { icon: '✦', name: 'Laser', sub: 'Från 395 kr' },
  { icon: '◈', name: 'Botox', sub: 'Från 1 895 kr' },
  { icon: '◉', name: 'Fillers', sub: 'Från 2 495 kr' },
  { icon: '☀', name: 'IPL', sub: 'Från 995 kr' },
  { icon: '⟡', name: 'Peeling', sub: 'Från 795 kr' },
];

const news = [
  {
    tag: 'Nyhet',
    title: 'Profhilo – ny behandling på kliniken',
    desc: 'Vi erbjuder nu Profhilo, en injektionsbehandling för djup återfuktning och hudförtätning.',
    date: '3 apr',
  },
  {
    tag: 'Uppdatering',
    title: 'Fler tider på torsdagar från maj',
    desc: 'Vi förlänger till kl. 20:00 på torsdagar. Boka din kväll hos oss.',
    date: '28 mar',
  },
  {
    tag: 'Tips',
    title: 'Dags att boka inför sommaren',
    desc: 'För bästa resultat med laser bör du starta 3–4 månader innan du vill vara hårborttagningsfri.',
    date: '20 mar',
  },
];

function Star() {
  return (
    <svg className="w-3.5 h-3.5 text-champagne" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function HomeScreen({ onBook, onNavigate }: Props) {
  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-rose" />
          <span className="font-serif text-lg text-charcoal tracking-wide">Citylaser</span>
        </div>
        <button className="w-9 h-9 rounded-full border border-taupe-light flex items-center justify-center">
          <svg className="w-4 h-4 text-charcoal-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
      </div>

      {/* Greeting */}
      <div className="px-5 pb-5">
        <h1 className="font-serif text-3xl text-charcoal leading-tight">God dag</h1>
        <p className="text-sm text-muted mt-0.5">Välkommen till Citylaser</p>
      </div>

      {/* Featured offer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-5 mb-5"
      >
        <div className="relative overflow-hidden rounded-3xl bg-rose-light border border-rose/20 p-6">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-rose/10 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose" />
              <span className="text-[11px] text-rose uppercase tracking-[0.14em] font-medium">
                Aktuellt erbjudande
              </span>
            </div>
            <h2 className="font-serif text-2xl text-charcoal mb-1.5 leading-snug">
              Vårens IPL-kampanj
            </h2>
            <p className="text-[13px] text-charcoal-soft mb-4 leading-relaxed">
              30% rabatt på alla IPL-behandlingar under april.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onBook}
                className="bg-charcoal text-cream text-sm px-5 py-2.5 rounded-full"
              >
                Boka nu
              </button>
              <span className="text-xs text-muted">t.o.m. 30 apr</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick treatments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between px-5 mb-3">
          <span className="text-sm font-medium text-charcoal">Behandlingar</span>
          <button onClick={() => onNavigate('treatments')} className="text-xs text-rose-dark">
            Se alla →
          </button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
          {quickTreatments.map((t) => (
            <button
              key={t.name}
              onClick={() => onNavigate('treatments')}
              className="flex-shrink-0 w-[84px] bg-white border border-taupe-light rounded-2xl p-3 text-center hover:border-taupe transition-colors"
            >
              <div className="text-xl text-taupe mb-1.5">{t.icon}</div>
              <div className="text-xs font-medium text-charcoal">{t.name}</div>
              <div className="text-[10px] text-muted mt-0.5">{t.sub}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tips just nu — rose style matching hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="px-5 mb-5"
      >
        <div className="text-sm font-medium text-charcoal mb-2.5">Tips just nu</div>
        <div className="relative overflow-hidden rounded-2xl bg-rose-light border border-rose/20 p-4 flex gap-3.5">
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-rose/8 pointer-events-none" />
          <div className="text-xl text-rose flex-shrink-0 mt-0.5 relative z-10">☀</div>
          <div className="relative z-10">
            <div className="text-sm font-medium text-charcoal mb-1">
              Undvik sol 2 veckor innan laserbehandling
            </div>
            <div className="text-xs text-charcoal-soft leading-relaxed">
              Solbränd hud ökar risken för irritation. Planera ditt sista solbad i god tid.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nytt & på gång */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-5"
      >
        <div className="flex items-center justify-between px-5 mb-3">
          <span className="text-sm font-medium text-charcoal">Nytt & på gång</span>
          <button onClick={() => onNavigate('content')} className="text-xs text-rose-dark">
            Fler →
          </button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
          {news.map((n, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[200px] bg-white border border-taupe-light rounded-2xl p-4"
            >
              <div className="text-[10px] uppercase tracking-[0.12em] text-muted mb-2 flex items-center justify-between">
                <span>{n.tag}</span>
                <span>{n.date}</span>
              </div>
              <div className="text-sm font-medium text-charcoal mb-1.5 leading-snug">
                {n.title}
              </div>
              <p className="text-[12px] text-charcoal-soft leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Featured article */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.24 }}
        className="px-5 mb-5"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-sm font-medium text-charcoal">Senaste artikel</div>
          <button onClick={() => onNavigate('content')} className="text-xs text-rose-dark">
            Fler →
          </button>
        </div>
        <div className="bg-white border border-taupe-light rounded-2xl p-5">
          <div className="text-[11px] text-champagne uppercase tracking-[0.12em] mb-2">
            Guide · 4 min läsning
          </div>
          <h3 className="font-serif text-xl text-charcoal mb-2 leading-snug">
            Botox vs fillers – vad passar dig bäst?
          </h3>
          <p className="text-[13px] text-charcoal-soft leading-relaxed">
            Båda behandlingarna ger ett mer ungdomligt utseende men fungerar på helt olika sätt.
          </p>
        </div>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="mx-5 mb-5"
      >
        <div className="bg-charcoal rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <div className="font-serif text-cream text-base">1 000+ nöjda kunder</div>
            <div className="text-xs text-taupe mt-0.5">Rekommenderade på Reco & Google</div>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} />)}
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="px-5 mb-8"
      >
        <div className="text-[11px] uppercase tracking-[0.13em] text-muted mb-3">Certifieringar & utmärkelser</div>
        <div className="flex items-center gap-4">
          {[
            { src: '/badge-ten-years.svg', alt: '10 år på Reco' },
            { src: '/badge-reco-2025.png', alt: 'Rekommenderat företag 2026' },
            { src: '/badge-shr.png', alt: 'SHR-certifierad' },
            { src: '/badge-estetiska.png', alt: 'Certifierad för estetisk injicering' },
          ].map((b) => (
            <div key={b.src} className="w-[68px] h-[68px] flex items-center justify-center flex-shrink-0">
              <img src={b.src} alt={b.alt} className="w-full h-full object-contain rounded-full" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
