import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md border-b border-taupe-light/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-rose" />
          <span className="font-serif text-xl text-charcoal tracking-wide">Citylaser</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-charcoal-soft">
          <a href="#behandlingar" className="hover:text-charcoal transition-colors duration-150">
            Behandlingar
          </a>
          <a href="#priser" className="hover:text-charcoal transition-colors duration-150">
            Priser
          </a>
          <a href="#innehall" className="hover:text-charcoal transition-colors duration-150">
            Artiklar
          </a>
          <a href="#kontakt" className="hover:text-charcoal transition-colors duration-150">
            Kontakt
          </a>
        </div>

        {/* CTA */}
        <a
          href="#boka"
          className="bg-charcoal text-cream text-sm px-5 py-2.5 rounded-full hover:bg-charcoal-soft transition-colors duration-200 tracking-wide"
        >
          Boka nu
        </a>
      </div>
    </motion.nav>
  );
}
