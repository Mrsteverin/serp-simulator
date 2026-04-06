import { motion } from 'framer-motion';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-champagne" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const testimonials = [
  {
    name: 'Anna L.',
    treatment: 'Laserbehandling',
    rating: 5,
    text: 'Fantastisk service och otroliga resultat! Har provat andra kliniker tidigare men Citylaser är i en helt annan klass. Personalen är kunnig, omtänksam och tar sig tid att lyssna.',
    date: 'Mars 2026',
  },
  {
    name: 'Maria S.',
    treatment: 'Botox',
    rating: 5,
    text: 'Professionellt team som verkligen lyssnar. Mina resultat med botox är helt naturliga – precis vad jag ville ha. Inga överdrifter, bara en mer utvilad version av mig.',
    date: 'Februari 2026',
  },
  {
    name: 'Sofia K.',
    treatment: 'Fillers',
    rating: 5,
    text: 'Rekommenderar varmt! Har gjort fillers här tre gånger nu. Resultaten är alltid subtila och vackra. Känslan av trygghet och professionalism är oslagbar.',
    date: 'Januari 2026',
  },
  {
    name: 'Emma H.',
    treatment: 'IPL',
    rating: 5,
    text: 'Mina pigmentfläckar är borta efter tre IPL-behandlingar. Jag är så glad att jag hittade Citylaser – de förklarade hela processen tydligt och jag visste alltid vad jag kunde förvänta mig.',
    date: 'April 2026',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-warm">
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
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted">
              Kundrecensioner
            </span>
            <div className="h-px w-10 bg-taupe" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-5">
            Det säger våra kunder
          </h2>
          <div className="flex items-center justify-center gap-3">
            <Stars count={5} />
            <span className="text-sm text-charcoal-soft">4.9 / 5 · Baserat på 800+ recensioner</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-taupe-light rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-medium text-charcoal">{t.name}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {t.treatment} · {t.date}
                  </div>
                </div>
                <Stars count={t.rating} />
              </div>
              <p className="text-[15px] text-charcoal-soft leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Platform badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <div className="flex items-center gap-4 bg-white border border-taupe-light rounded-2xl px-6 py-4">
            <span className="font-serif text-2xl text-charcoal">G</span>
            <div>
              <div className="flex items-center gap-2">
                <Stars count={5} />
                <span className="font-medium text-charcoal text-sm">4.9</span>
              </div>
              <div className="text-xs text-muted mt-0.5">Google Reviews · Citylaser Stockholm</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
