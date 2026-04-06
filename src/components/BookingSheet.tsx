import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CLINICBUDDY_URL = 'https://ww1.clinicbuddy.com/onlinebooking/-3735';

export default function BookingSheet({ open, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);

  const handleClose = () => {
    setLoaded(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 300 }}
          className="absolute inset-0 z-50 bg-cream flex flex-col"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-taupe-light flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-rose" />
              <span className="font-serif text-lg text-charcoal">Boka tid</span>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full border border-taupe-light flex items-center justify-center text-charcoal-soft hover:bg-warm transition-colors"
              aria-label="Stäng"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Loading indicator */}
          {!loaded && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-taupe border-t-rose animate-spin" />
              <p className="text-sm text-muted">Laddar bokningssystem…</p>
            </div>
          )}

          {/* ClinicBuddy iframe */}
          <iframe
            src={CLINICBUDDY_URL}
            title="Boka tid – Citylaser"
            onLoad={() => setLoaded(true)}
            className={`flex-1 w-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0 absolute'}`}
            allow="payment"
          />

          {/* Safe area bottom spacer */}
          <div style={{ height: 'env(safe-area-inset-bottom)' }} className="flex-shrink-0 bg-cream" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
