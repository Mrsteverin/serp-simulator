import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBook: () => void;
}

type Category = 'Alla' | 'Laser' | 'Injektioner' | 'Hudvård';

const CATEGORIES: Category[] = ['Alla', 'Laser', 'Injektioner', 'Hudvård'];

const treatments = [
  {
    cat: 'Laser' as Category,
    icon: '✦',
    name: 'Laserbehandling',
    tagline: 'Permanent hårborttagning',
    desc: 'Medicinsk laser för effektiv och permanent hårborttagning. Passar alla hudtyper.',
    price: 'Från 395 kr',
    popular: false,
    tags: ['Ansikte', 'Kropp', 'Intim'],
  },
  {
    cat: 'Injektioner' as Category,
    icon: '◈',
    name: 'Botox',
    tagline: 'Naturliga, mjuka resultat',
    desc: 'Mjuka upp dynamiska rynkor och linjer med noggrant doserad botulinumtoxin.',
    price: 'Från 1 895 kr',
    popular: true,
    tags: ['Panna', 'Runt ögon', 'Läppar'],
  },
  {
    cat: 'Injektioner' as Category,
    icon: '◉',
    name: 'Fillers',
    tagline: 'Volym och kontur',
    desc: 'Återskapa volym och forma ansiktets konturer med hyaluronsyra.',
    price: 'Från 2 495 kr',
    popular: false,
    tags: ['Läppar', 'Kinder', 'Haka'],
  },
  {
    cat: 'Hudvård' as Category,
    icon: '☀',
    name: 'IPL / Ljusbehandling',
    tagline: 'Hudföryngring & jämnhet',
    desc: 'Behandla pigmentfläckar, rosacea och ytliga blodkärl med intensivt pulserat ljus.',
    price: 'Från 995 kr',
    popular: false,
    tags: ['Pigment', 'Rosacea', 'Blodkärl'],
  },
  {
    cat: 'Hudvård' as Category,
    icon: '⟡',
    name: 'Kemisk peeling',
    tagline: 'Förnya och lysa upp',
    desc: 'Accelerera hudens naturliga förnyelse och reducera ojämnheter och acneärr.',
    price: 'Från 795 kr',
    popular: false,
    tags: ['BHA', 'AHA', 'Djup'],
  },
  {
    cat: 'Hudvård' as Category,
    icon: '◎',
    name: 'Microneedling',
    tagline: 'Kollagenstimulering',
    desc: 'Stimulera kollagenproduktionen för fastare, jämnare och mer lysande hud.',
    price: 'Från 1 295 kr',
    popular: false,
    tags: ['Porer', 'Ärr', 'Fasthet'],
  },
  {
    cat: 'Hudvård' as Category,
    icon: '❋',
    name: 'Hudvårdsbehandling',
    tagline: 'Skräddarsydd för din hud',
    desc: 'Individuellt anpassad behandling baserad på din hudanalys och dina mål.',
    price: 'Från 695 kr',
    popular: false,
    tags: ['Torr hud', 'Akne', 'Känslig'],
  },
  {
    cat: 'Alla' as Category,
    icon: '○',
    name: 'Konsultation',
    tagline: 'Gratis och utan förpliktelser',
    desc: 'Träffa en hudexpert, gör en hudanalys och skapa en personlig behandlingsplan.',
    price: 'Gratis',
    popular: false,
    tags: [],
  },
];

export default function TreatmentsScreen({ onBook }: Props) {
  const [category, setCategory] = useState<Category>('Alla');

  const filtered = treatments.filter(
    (t) => category === 'Alla' || t.cat === category || t.name === 'Konsultation'
  );

  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-serif text-3xl text-charcoal">Behandlingar</h1>
        <p className="text-sm text-muted mt-1">Välj behandling och boka din tid</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-5 mb-5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors duration-150 ${
              category === cat
                ? 'bg-charcoal text-cream'
                : 'border border-taupe-light text-charcoal-soft'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="px-5 space-y-3"
        >
          {filtered.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className={`relative rounded-2xl border p-5 ${
                t.popular
                  ? 'bg-charcoal border-charcoal'
                  : 'bg-white border-taupe-light'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-2.5 left-5 bg-rose text-white text-[11px] px-3 py-0.5 rounded-full tracking-wide">
                  Populärast
                </div>
              )}

              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`text-xl flex-shrink-0 mt-0.5 ${t.popular ? 'text-rose' : 'text-taupe'}`}>
                  {t.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`text-[11px] tracking-[0.12em] uppercase mb-0.5 ${t.popular ? 'text-rose/70' : 'text-muted'}`}>
                    {t.tagline}
                  </div>
                  <div className={`font-serif text-xl mb-1 ${t.popular ? 'text-cream' : 'text-charcoal'}`}>
                    {t.name}
                  </div>
                  <p className={`text-[13px] leading-relaxed mb-3 ${t.popular ? 'text-taupe' : 'text-charcoal-soft'}`}>
                    {t.desc}
                  </p>

                  {t.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] px-2.5 py-1 rounded-full ${
                            t.popular ? 'bg-white/10 text-taupe' : 'bg-warm text-charcoal-soft'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${t.popular ? 'text-cream' : 'text-charcoal'}`}>
                      {t.price}
                    </span>
                    <button
                      onClick={onBook}
                      className={`px-4 py-2 rounded-full text-[12px] transition-colors ${
                        t.popular
                          ? 'bg-rose text-white'
                          : 'border border-taupe-light text-charcoal hover:bg-warm'
                      }`}
                    >
                      Boka →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
