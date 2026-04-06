import { motion } from 'framer-motion';

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-champagne" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-cream overflow-hidden pt-16">
      {/* Ambient background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-rose-light/40 via-rose-light/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-warm/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-10 bg-rose/50" />
          <span className="text-xs tracking-[0.22em] uppercase text-rose font-medium">
            Medicinsk estetik · Stockholm
          </span>
          <div className="h-px w-10 bg-rose/50" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-[clamp(3.5rem,10vw,7rem)] text-charcoal leading-[1.02] mb-6"
        >
          Upplev
          <br />
          <em className="not-italic text-rose-dark">resultaten.</em>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-charcoal-soft text-lg md:text-xl leading-relaxed max-w-md mx-auto mb-10"
        >
          Din partner för laser, botox, fillers och avancerad hudvård med klinisk precision.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#boka"
            className="w-full sm:w-auto bg-charcoal text-cream px-8 py-4 rounded-full text-sm tracking-wide hover:bg-charcoal-soft transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Boka behandling
          </a>
          <a
            href="#behandlingar"
            className="w-full sm:w-auto border border-taupe text-charcoal px-8 py-4 rounded-full text-sm tracking-wide hover:border-charcoal transition-all duration-200"
          >
            Se behandlingar
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 flex items-center justify-center gap-2.5"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <span className="text-sm text-muted">4.9 / 5 · 800+ recensioner</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.18em] uppercase text-muted">Utforska</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-muted/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
