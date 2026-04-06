import { motion } from 'framer-motion';

const stats = [
  { value: '15+', label: 'År i branschen', sub: 'Grundat 2009' },
  { value: '50 000+', label: 'Behandlingar', sub: 'Nöjda kunder' },
  { value: '4.9 / 5', label: 'Snittbetyg', sub: 'Google Reviews' },
];

export default function TrustBar() {
  return (
    <section className="bg-charcoal py-14 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 md:gap-12">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-serif text-3xl md:text-5xl text-cream mb-1.5">{s.value}</div>
            <div className="text-[10px] md:text-xs text-taupe tracking-[0.15em] uppercase mb-0.5">
              {s.label}
            </div>
            <div className="text-[10px] text-muted hidden md:block">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
