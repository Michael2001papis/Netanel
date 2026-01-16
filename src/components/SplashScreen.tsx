import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Shield } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { user, isCEO, isAdmin } = useAuth();
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setShow(false);
      return;
    }

    // בודק אם זה המשתמש הראשון (אחרי טעינה)
    const hasShownSplash = sessionStorage.getItem('splash_shown');
    if (hasShownSplash) {
      setShow(false);
      return;
    }

    // מגדיר הודעה לפי תפקיד
    if (isCEO) {
      setMessage('ברוך הבא, נתנאל חנוף');
    } else if (isAdmin) {
      setMessage('גישה מנהלתית ניתנה');
    } else {
      setMessage(`ברוך הבא, ${user.name || user.username}`);
    }

    // מציג את ה-Splash למשך 2.5 שניות
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('splash_shown', 'true');
    }, 2500);

    return () => clearTimeout(timer);
  }, [user, isCEO, isAdmin]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-premium-gold/20 via-admin-dark to-ceo-purple/20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              className="mb-6 flex justify-center"
            >
              {isCEO ? (
                <Crown className="w-20 h-20 text-premium-gold" />
              ) : isAdmin ? (
                <Shield className="w-20 h-20 text-admin-blue" />
              ) : null}
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
            >
              {isCEO ? 'Premium Motors' : 'Welcome'}
            </motion.h1>
            
            {message && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-700"
              >
                {message}
              </motion.p>
            )}

            {isCEO && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-4"
              >
                <span className="inline-block px-4 py-2 bg-premium-gold/20 text-premium-gold rounded-full text-sm font-semibold">
                  CEO MODE
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
