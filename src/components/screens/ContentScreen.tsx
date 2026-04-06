import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'artiklar' | 'tips' | 'erbjudanden';

const articles = [
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Botox vs fillers – vad passar dig bäst?',
    excerpt: 'Båda behandlingarna ger ett mer ungdomligt utseende men fungerar på helt olika sätt.',
    readTime: '4 min',
    date: '28 mar',
  },
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Hur fungerar laserbehandling egentligen?',
    excerpt: 'Medicinsk laser är en av de mest effektiva metoderna för permanent hårborttagning.',
    readTime: '5 min',
    date: '14 mar',
  },
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Vad händer under en konsultation?',
    excerpt: 'En konsultation hos oss är gratis och utan förpliktelser. Så här ser ett typiskt besök ut.',
    readTime: '3 min',
    date: '5 mar',
  },
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Bästa behandlingar mot pigmentering',
    excerpt: 'IPL, kemisk peeling eller microneedling? Vi guidar dig till rätt behandling.',
    readTime: '6 min',
    date: '20 feb',
  },
];

const tips = [
  { icon: '☀', title: 'Undvik sol 2 veckor innan laserbehandling', desc: 'Solbränd hud ökar risken för irritation vid laser. Planera ditt sista solbad i god tid.' },
  { icon: '⟡', title: 'Solskydd varje dag – även på vintern', desc: 'SPF 30 eller högre skyddar mot prematur hudåldrande och bevarar behandlingsresultaten.' },
  { icon: '◎', title: 'Kom ihåg att återboka', desc: 'Bäst resultat nås med regelbundna behandlingar. Boka nästa tid redan när du lämnar.' },
  { icon: '❋', title: 'Håll huden väl återfuktad', desc: 'Välhydrerad hud svarar bättre på behandlingar och läker snabbare efteråt.' },
  { icon: '○', title: 'Ingen makeup direkt efter ansiktsbehandling', desc: 'Vänta minst 12–24 timmar innan du applicerar makeup efter de flesta behandlingar.' },
  { icon: '✦', title: 'Raka, inte vaxea, innan laser', desc: 'Raka det område du ska behandla 24 timmar i förväg. Undvik vaxning och plockning.' },
];

const offers = [
  {
    title: 'Vårens IPL-kampanj: 30% rabatt under april',
    desc: 'Förbered huden inför sommaren. Behandla pigmentfläckar, rosacea och ytliga blodkärl.',
    expires: 'Gäller t.o.m. 30 april 2026',
    date: '1 apr',
  },
  {
    title: 'Ny kund? Fri konsultation + 10% på första behandling',
    desc: 'Välkommen till Citylaser. Boka en gratis konsultation och få 10% rabatt på din första behandling.',
    expires: 'Löpande erbjudande',
    date: '15 mar',
  },
];

export default function ContentScreen() {
  const [tab, setTab] = useState<Tab>('artiklar');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'artiklar', label: 'Artiklar' },
    { id: 'tips', label: 'Tips' },
    { id: 'erbjudanden', label: 'Erbjudanden' },
  ];

  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-serif text-3xl text-charcoal">Guider & tips</h1>
        <p className="text-sm text-muted mt-1">Kunskap för bättre resultat</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 px-5 mb-5 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors duration-150 ${
              tab === t.id
                ? 'bg-charcoal text-cream'
                : 'border border-taupe-light text-charcoal-soft'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === 'artiklar' && (
          <motion.div
            key="artiklar"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 space-y-3"
          >
            {articles.map((a, i) => (
              <div
                key={i}
                className="bg-white border border-taupe-light rounded-2xl p-5 active:bg-warm transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] px-3 py-1 rounded-full ${a.tagStyle}`}>{a.tag}</span>
                  <span className="text-xs text-muted">{a.readTime} läsning</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-1.5 leading-snug">{a.title}</h3>
                <p className="text-[13px] text-charcoal-soft leading-relaxed mb-3">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{a.date}</span>
                  <span className="text-xs text-rose-dark">Läs mer →</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 space-y-2.5"
          >
            {tips.map((t, i) => (
              <div key={i} className="bg-white border border-taupe-light rounded-2xl p-4 flex gap-4">
                <div className="text-xl text-taupe flex-shrink-0 mt-0.5">{t.icon}</div>
                <div>
                  <div className="text-sm font-medium text-charcoal mb-1">{t.title}</div>
                  <div className="text-[13px] text-charcoal-soft leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'erbjudanden' && (
          <motion.div
            key="erbjudanden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 space-y-3"
          >
            {offers.map((o, i) => (
              <div key={i} className="bg-rose-light border border-rose/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] bg-rose/15 text-rose-dark px-3 py-1 rounded-full">
                    Erbjudande
                  </span>
                  <span className="text-xs text-muted">{o.date}</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2 leading-snug">{o.title}</h3>
                <p className="text-[13px] text-charcoal-soft leading-relaxed mb-4">{o.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{o.expires}</span>
                  <button className="text-[12px] bg-rose text-white px-4 py-2 rounded-full">
                    Boka nu →
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
