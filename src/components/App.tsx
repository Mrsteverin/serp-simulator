import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Screen, NavigateFn } from './types';
import AppBottomNav from './AppBottomNav';
import BookingSheet from './BookingSheet';
import HomeScreen from './screens/HomeScreen';
import TreatmentsScreen from './screens/TreatmentsScreen';
import ContentScreen from './screens/ContentScreen';
import ContactScreen from './screens/ContactScreen';

const ORDER: Screen[] = ['home', 'treatments', 'content', 'contact'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [prev, setPrev] = useState<Screen>('home');
  const [bookingOpen, setBookingOpen] = useState(false);

  const navigate: NavigateFn = (next) => {
    setPrev(screen);
    setScreen(next);
  };

  const openBooking = () => setBookingOpen(true);
  const dir = ORDER.indexOf(screen) >= ORDER.indexOf(prev) ? 1 : -1;

  const screens: Record<Screen, React.ReactNode> = {
    home: <HomeScreen onBook={openBooking} onNavigate={navigate} />,
    treatments: <TreatmentsScreen onBook={openBooking} />,
    content: <ContentScreen />,
    contact: <ContactScreen onBook={openBooking} />,
  };

  return (
    /* Outer: fills browser, centers the app frame on desktop */
    <div className="fixed inset-0 flex items-center justify-center bg-warm">
      {/* Phone frame: full screen on mobile, constrained on desktop */}
      <div className="relative w-full h-full md:w-[390px] md:h-[844px] md:max-h-[90vh] bg-cream flex flex-col overflow-hidden md:rounded-[44px] md:shadow-2xl">

        {/* Screen area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={screen}
              initial={{ x: dir * 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -28, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 overflow-y-auto overscroll-contain no-scrollbar"
              style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom))' }}
            >
              {screens[screen]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <AppBottomNav active={screen} onNavigate={navigate} onBook={openBooking} />

        {/* Booking sheet */}
        <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </div>
  );
}
