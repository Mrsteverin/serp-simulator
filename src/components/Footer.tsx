import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-16 pb-24 md:pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-4 h-4 rounded-full bg-rose" />
              <span className="font-serif text-2xl tracking-wide">Citylaser</span>
            </div>
            <p className="text-taupe text-sm leading-relaxed max-w-xs">
              Medicinsk estetik med klinisk precision och personlig omsorg. Vi hjälper dig att
              se och känna dig bäst möjligt – sedan 2009.
            </p>
            <div className="flex items-center gap-5 mt-6">
              <a href="#" className="text-muted hover:text-taupe transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-muted hover:text-taupe transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-muted hover:text-taupe transition-colors text-sm">
                TikTok
              </a>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <div className="text-[11px] tracking-[0.15em] uppercase text-muted mb-4">
              Behandlingar
            </div>
            <ul className="space-y-2.5 text-sm text-taupe">
              {['Laserbehandling', 'Botox', 'Fillers', 'IPL', 'Kemisk peeling', 'Microneedling'].map(
                (item) => (
                  <li key={item}>
                    <a href="#behandlingar" className="hover:text-cream transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <div className="text-[11px] tracking-[0.15em] uppercase text-muted mb-4">
              Kliniken
            </div>
            <ul className="space-y-2.5 text-sm text-taupe">
              {[
                { label: 'Om oss', href: '#' },
                { label: 'Vårt team', href: '#' },
                { label: 'Guider & artiklar', href: '#innehall' },
                { label: 'Boka tid', href: '#boka' },
                { label: 'Kontakt', href: '#kontakt' },
                { label: 'Integritetspolicy', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-cream transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted">
            © 2026 Citylaser Stockholm AB. Alla rättigheter förbehållna.
          </div>
          <div className="text-xs text-muted">
            Drottninggatan 65, 111 21 Stockholm
          </div>
        </div>
      </div>
    </footer>
  );
}
