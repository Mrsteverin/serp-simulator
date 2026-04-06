import { motion } from 'framer-motion';

const treatments = [
  {
    icon: '✦',
    name: 'Laserbehandling',
    tagline: 'Permanent hårborttagning',
    description:
      'Medicinsk laser för effektiv och permanent hårborttagning. Passar alla hudtyper och hudtoner.',
    price: 'Från 395 kr',
    popular: false,
    tags: ['Ansikte', 'Kropp', 'Intim'],
  },
  {
    icon: '◈',
    name: 'Botox',
    tagline: 'Naturliga, mjuka resultat',
    description:
      'Mjuka upp dynamiska rynkor och linjer med noggrant doserad botulinumtoxin. Naturligt utseende garanterat.',
    price: 'Från 1 895 kr',
    popular: true,
    tags: ['Panna', 'Runt ögon', 'Läppar'],
  },
  {
    icon: '◉',
    name: 'Fillers',
    tagline: 'Volym och kontur',
    description:
      'Återskapa volym och forma ansiktets konturer med hyaluronsyra för ett naturligt och ungdomligt resultat.',
    price: 'Från 2 495 kr',
    popular: false,
    tags: ['Läppar', 'Kinder', 'Haka'],
  },
  {
    icon: '☀',
    name: 'IPL / Ljusbehandling',
    tagline: 'Hudföryngring & jämnhet',
    description:
      'Behandla pigmentfläckar, ytliga blodkärl och rosacea effektivt med intensivt pulserat ljus.',
    price: 'Från 995 kr',
    popular: false,
    tags: ['Pigment', 'Rosacea', 'Blodkärl'],
  },
  {
    icon: '⟡',
    name: 'Kemisk peeling',
    tagline: 'Förnya och lysa upp',
    description:
      'Accelerera hudens naturliga förnyelse och reducera ojämnheter, acneärr och pigmentförändringar.',
    price: 'Från 795 kr',
    popular: false,
    tags: ['BHA', 'AHA', 'Djup peeling'],
  },
  {
    icon: '◎',
    name: 'Microneedling',
    tagline: 'Kollagenstimulering',
    description:
      'Stimulera hudens naturliga kollagenproduktion för fastare, jämnare och mer lysande hud.',
    price: 'Från 1 295 kr',
    popular: false,
    tags: ['Porer', 'Ärr', 'Fasthet'],
  },
  {
    icon: '❋',
    name: 'Hudvårdsbehandling',
    tagline: 'Skräddarsydd för din hud',
    description:
      'Individuellt anpassad behandling baserad på din hudanalys och dina specifika mål.',
    price: 'Från 695 kr',
    popular: false,
    tags: ['Torr hud', 'Akne', 'Känslig hud'],
  },
  {
    icon: '○',
    name: 'Konsultation',
    tagline: 'Gratis och utan förpliktelser',
    description:
      'Träffa en av våra hudexperter, gör en hudanalys och skapa en personlig behandlingsplan.',
    price: 'Gratis',
    popular: false,
    tags: [],
  },
];

export default function TreatmentsSection() {
  return (
    <section id="behandlingar" className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-taupe" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted">Behandlingar</span>
            <div className="h-px w-10 bg-taupe" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">Våra behandlingar</h2>
          <p className="text-charcoal-soft max-w-lg mx-auto text-lg leading-relaxed">
            Evidensbaserade behandlingar utförda av certifierade terapeuter och legitimerade läkare.
          </p>
        </motion.div>

        {/* Grid */}
        <div id="priser" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`relative group rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${
                t.popular
                  ? 'bg-charcoal border-charcoal hover:shadow-xl'
                  : 'bg-white border-taupe-light hover:border-taupe hover:shadow-md'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-6 bg-rose text-white text-[11px] px-3 py-1 rounded-full tracking-wide">
                  Populärast
                </div>
              )}

              <div
                className={`text-2xl mb-4 ${t.popular ? 'text-rose' : 'text-taupe'}`}
              >
                {t.icon}
              </div>

              <div
                className={`text-[11px] tracking-[0.15em] uppercase mb-1 ${
                  t.popular ? 'text-rose/80' : 'text-muted'
                }`}
              >
                {t.tagline}
              </div>
              <h3
                className={`font-serif text-2xl mb-2.5 ${
                  t.popular ? 'text-cream' : 'text-charcoal'
                }`}
              >
                {t.name}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-5 ${
                  t.popular ? 'text-taupe' : 'text-charcoal-soft'
                }`}
              >
                {t.description}
              </p>

              {t.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] px-2.5 py-1 rounded-full ${
                        t.popular
                          ? 'bg-white/10 text-taupe'
                          : 'bg-warm text-charcoal-soft'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto">
                <span
                  className={`font-medium text-sm ${
                    t.popular ? 'text-cream' : 'text-charcoal'
                  }`}
                >
                  {t.price}
                </span>
                <a
                  href="#boka"
                  className={`text-[12px] px-4 py-2 rounded-full transition-colors duration-200 ${
                    t.popular
                      ? 'bg-rose text-white hover:bg-rose-dark'
                      : 'border border-taupe-light text-charcoal hover:bg-warm hover:border-taupe'
                  }`}
                >
                  Boka →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
