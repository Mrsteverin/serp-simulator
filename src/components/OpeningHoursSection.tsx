import { motion } from 'framer-motion';

const hours = [
  { day: 'Måndag', time: '09:00–18:00', open: true },
  { day: 'Tisdag', time: '09:00–18:00', open: true },
  { day: 'Onsdag', time: '09:00–18:00', open: true },
  { day: 'Torsdag', time: '09:00–19:00', open: true },
  { day: 'Fredag', time: '09:00–17:00', open: true },
  { day: 'Lördag', time: '10:00–16:00', open: true },
  { day: 'Söndag', time: 'Stängt', open: false },
];

const dayIndex = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

function isToday(day: string): boolean {
  return dayIndex[new Date().getDay()] === day;
}

export default function OpeningHoursSection() {
  return (
    <section id="kontakt" className="py-20 px-6 bg-cream">
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
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted">Hitta oss</span>
            <div className="h-px w-10 bg-taupe" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal">
            Kontakt & öppettider
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Opening hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white border border-taupe-light rounded-2xl p-7"
          >
            <h3 className="font-serif text-2xl text-charcoal mb-6">Öppettider</h3>
            <div className="space-y-1">
              {hours.map((h, i) => {
                const today = isToday(h.day);
                return (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2.5 border-b border-taupe-light/40 last:border-0 ${
                      today ? 'bg-rose-light/50 -mx-2 px-2 rounded-lg' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {today && <div className="w-1.5 h-1.5 rounded-full bg-rose flex-shrink-0" />}
                      <span className={`text-sm ${today ? 'text-charcoal font-medium' : 'text-charcoal-soft'}`}>
                        {h.day}
                      </span>
                      {today && (
                        <span className="text-[10px] text-rose tracking-wide">idag</span>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        today ? 'text-charcoal font-medium' : h.open ? 'text-charcoal-soft' : 'text-muted'
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {/* Address */}
            <div className="bg-white border border-taupe-light rounded-2xl p-6">
              <div className="text-[11px] tracking-[0.15em] uppercase text-muted mb-2">Adress</div>
              <div className="font-serif text-xl text-charcoal">Drottninggatan 65</div>
              <div className="text-charcoal-soft text-sm mt-0.5">111 21 Stockholm</div>
              <a
                href="https://maps.google.com/?q=Drottninggatan+65,+Stockholm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-rose-dark mt-2.5 inline-block hover:underline"
              >
                Öppna i kartor →
              </a>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-taupe-light rounded-2xl p-5">
                <div className="text-[11px] tracking-[0.15em] uppercase text-muted mb-2">Telefon</div>
                <a
                  href="tel:0812345678"
                  className="font-medium text-charcoal text-sm hover:text-charcoal-soft transition-colors"
                >
                  08-123 456 78
                </a>
              </div>
              <div className="bg-white border border-taupe-light rounded-2xl p-5">
                <div className="text-[11px] tracking-[0.15em] uppercase text-muted mb-2">E-post</div>
                <a
                  href="mailto:info@citylaser.se"
                  className="font-medium text-charcoal text-[13px] hover:text-charcoal-soft transition-colors break-all"
                >
                  info@citylaser.se
                </a>
              </div>
            </div>

            {/* App download nudge */}
            <div className="bg-rose-light border border-rose/20 rounded-2xl p-6">
              <div className="font-serif text-xl text-charcoal mb-2">Ladda ner appen</div>
              <p className="text-sm text-charcoal-soft mb-4 leading-relaxed">
                Boka, hantera dina tider, ta del av erbjudanden och få påminnelser – direkt i fickan.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex-1 bg-charcoal text-cream text-xs py-3 rounded-xl text-center hover:bg-charcoal-soft transition-colors"
                >
                  App Store
                </a>
                <a
                  href="#"
                  className="flex-1 bg-charcoal text-cream text-xs py-3 rounded-xl text-center hover:bg-charcoal-soft transition-colors"
                >
                  Google Play
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
