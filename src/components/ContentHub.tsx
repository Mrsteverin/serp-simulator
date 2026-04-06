import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Tab = 'artiklar' | 'tips' | 'erbjudanden';

const articles = [
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Botox vs fillers – vad passar dig bäst?',
    excerpt:
      'Båda behandlingarna ger ett mer ungdomligt utseende men fungerar på helt olika sätt. Vi förklarar skillnaderna så att du kan välja rätt.',
    readTime: '4 min',
    date: '28 mar 2026',
  },
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Hur fungerar laserbehandling egentligen?',
    excerpt:
      'Medicinsk laser är en av de mest effektiva metoderna för permanent hårborttagning. Här är vetenskapen och tekniken bakom behandlingen.',
    readTime: '5 min',
    date: '14 mar 2026',
  },
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Vad händer under en konsultation?',
    excerpt:
      'En konsultation hos oss är gratis och utan förpliktelser. Här går vi igenom vad du kan förvänta dig under ditt första besök.',
    readTime: '3 min',
    date: '5 mar 2026',
  },
  {
    tag: 'Guide',
    tagStyle: 'bg-champagne/20 text-champagne',
    title: 'Bästa behandlingar mot pigmentering och ojämn hudton',
    excerpt:
      'IPL, kemisk peeling eller microneedling? Vi guidar dig genom alternativen för att hitta den behandling som passar din hudtyp.',
    readTime: '6 min',
    date: '20 feb 2026',
  },
];

const tips = [
  {
    icon: '☀',
    title: 'Undvik sol 2 veckor innan laserbehandling',
    desc: 'Solbränd hud ökar risken för irritation och biverkningar vid laser. Planera ditt sista solbad i god tid.',
  },
  {
    icon: '⟡',
    title: 'Solskydd varje dag – även på vintern',
    desc: 'SPF 30 eller högre skyddar mot prematur hudåldrande och bevarar dina behandlingsresultat längre.',
  },
  {
    icon: '◎',
    title: 'Kom ihåg att återboka',
    desc: 'De bästa resultaten nås med regelbundna behandlingar. Boka nästa tid redan när du lämnar kliniken.',
  },
  {
    icon: '❋',
    title: 'Håll huden väl återfuktad',
    desc: 'Välhydrerad hud svarar bättre på behandlingar och läker snabbare efter estetiska ingrepp.',
  },
  {
    icon: '○',
    title: 'Ingen makeup direkt efter behandling',
    desc: 'Vänta minst 12–24 timmar innan du applicerar makeup efter de flesta ansiktsbehandlingar.',
  },
  {
    icon: '✦',
    title: 'Raka, inte vaxea, innan laserbehandling',
    desc: 'Raka det område du ska behandla 24 timmar i förväg. Undvik vaxning och plockning.',
  },
];

const offers = [
  {
    tag: 'Erbjudande',
    tagStyle: 'bg-rose-light text-rose-dark',
    title: 'Vårens IPL-kampanj: 30% rabatt under april',
    excerpt:
      'Förbered huden inför sommaren med vår populäraste hudföryngringsbehandling. Perfekt mot pigmentfläckar, rosacea och ytliga blodkärl.',
    date: '1 apr 2026',
    expires: 'Gäller t.o.m. 30 april 2026',
  },
  {
    tag: 'Erbjudande',
    tagStyle: 'bg-rose-light text-rose-dark',
    title: 'Ny kund? Fri konsultation + 10% på första behandling',
    excerpt:
      'Välkommen till Citylaser. Boka en gratis konsultation och få 10% rabatt på din första behandling.',
    date: '15 mar 2026',
    expires: 'Löpande erbjudande',
  },
];

export default function ContentHub() {
  const [activeTab, setActiveTab] = useState<Tab>('artiklar');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'artiklar', label: 'Artiklar' },
    { id: 'tips', label: 'Tips' },
    { id: 'erbjudanden', label: 'Erbjudanden' },
  ];

  return (
    <section id="innehall" className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-taupe" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted">
              Kunskap & inspiration
            </span>
            <div className="h-px w-10 bg-taupe" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">Guider & tips</h2>
          <p className="text-charcoal-soft text-lg max-w-md mx-auto leading-relaxed">
            Lär dig mer om behandlingarna, förbered dig rätt och ta hand om resultaten.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-10 justify-center flex-wrap"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-charcoal text-cream'
                  : 'border border-taupe-light text-charcoal-soft hover:border-taupe hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'artiklar' && (
            <motion.div
              key="artiklar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {articles.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-taupe-light rounded-2xl p-6 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] px-3 py-1 rounded-full ${a.tagStyle}`}>
                      {a.tag}
                    </span>
                    <span className="text-xs text-muted">{a.readTime} läsning</span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2 leading-snug group-hover:text-charcoal-soft transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-charcoal-soft leading-relaxed mb-4">{a.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{a.date}</span>
                    <span className="text-xs text-rose-dark group-hover:underline">Läs mer →</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'tips' && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {tips.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-taupe-light rounded-2xl p-5 flex gap-4"
                >
                  <div className="text-2xl text-taupe flex-shrink-0 pt-0.5">{t.icon}</div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1.5">{t.title}</h3>
                    <p className="text-sm text-charcoal-soft leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'erbjudanden' && (
            <motion.div
              key="erbjudanden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {offers.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-rose-light border border-rose/20 rounded-2xl p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] px-3 py-1 rounded-full ${o.tagStyle}`}>
                      {o.tag}
                    </span>
                    <span className="text-xs text-muted">{o.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2 leading-snug">
                    {o.title}
                  </h3>
                  <p className="text-sm text-charcoal-soft leading-relaxed mb-4">{o.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{o.expires}</span>
                    <a
                      href="#boka"
                      className="text-[12px] bg-rose text-white px-4 py-2 rounded-full hover:bg-rose-dark transition-colors"
                    >
                      Boka nu →
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
