import { motion } from 'framer-motion';

export default function OfferBanner() {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-rose-light border border-rose/20 p-8 md:p-12"
      >
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-rose/12 pointer-events-none" />
        <div className="absolute -bottom-10 right-32 w-32 h-32 rounded-full bg-rose/8 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rose" />
              <span className="text-xs tracking-[0.18em] uppercase text-rose font-medium">
                Aktuellt erbjudande
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3 leading-tight">
              Vårens IPL-kampanj
            </h2>
            <p className="text-charcoal-soft leading-relaxed max-w-md text-[15px]">
              Under april erbjuder vi 30% rabatt på alla IPL-behandlingar. Perfekt för att
              förbereda huden inför sommaren och behandla pigmentfläckar, rosacea och ytliga
              blodkärl.
            </p>
            <div className="mt-3 text-xs text-muted">Gäller t.o.m. 30 april 2026 · Begränsat antal tider</div>
          </div>

          <div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-5 md:gap-3">
            <div className="text-center">
              <div className="font-serif text-6xl text-charcoal leading-none">30%</div>
              <div className="text-sm text-charcoal-soft mt-1">rabatt</div>
            </div>
            <a
              href="#boka"
              className="bg-charcoal text-cream px-6 py-3 rounded-full text-sm tracking-wide hover:bg-charcoal-soft transition-colors whitespace-nowrap"
            >
              Utnyttja erbjudandet
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
