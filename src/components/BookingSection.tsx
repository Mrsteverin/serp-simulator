import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Välj behandling',
    desc: 'Bläddra bland våra behandlingar och välj den som passar dina behov och mål.',
  },
  {
    step: '02',
    title: 'Välj tid',
    desc: 'Se lediga tider i realtid och välj det som passar din kalender bäst.',
  },
  {
    step: '03',
    title: 'Bekräftelse',
    desc: 'Få bokning bekräftad direkt – med påminnelse dagen innan och eftervård via appen.',
  },
];

export default function BookingSection() {
  return (
    <section id="boka" className="py-20 px-6 bg-warm">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-taupe" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted">Tidbokning</span>
            <div className="h-px w-10 bg-taupe" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">Boka din tid</h2>
          <p className="text-charcoal-soft text-lg leading-relaxed max-w-sm mx-auto">
            Enkelt och smidigt – direkt online. Tre steg till din behandling.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-taupe-light"
            >
              <div className="font-serif text-4xl text-rose/30 mb-3">{s.step}</div>
              <h3 className="font-medium text-charcoal mb-2">{s.title}</h3>
              <p className="text-sm text-charcoal-soft leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://www.bokadirekt.se"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-charcoal text-cream px-10 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal-soft transition-all duration-200 text-center"
          >
            Boka via BokaDirekt
          </a>
          <a
            href="tel:0812345678"
            className="w-full sm:w-auto border border-taupe text-charcoal px-10 py-4 rounded-full text-sm tracking-wide hover:border-charcoal transition-all duration-200 text-center"
          >
            Ring oss: 08-123 456 78
          </a>
        </motion.div>

        {/* Small print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-muted mt-6"
        >
          Fri avbokning upp till 24 timmar innan din bokade tid.
        </motion.p>
      </div>
    </section>
  );
}
