import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, TrendingUp, Gift } from 'lucide-react';
import { Button } from './ui/Button';

interface PaymentSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  itemsCount: number;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  isOpen,
  onClose,
  totalAmount,
  itemsCount,
}) => {
  // Confetti effect on mount
  useEffect(() => {
    if (!isOpen) return;

    const createConfetti = () => {
      const colors = ['#D4AF37', '#FFD700', '#FFA500', '#FF6347', '#4CAF50'];
      const confettiCount = 50;

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '0.8';

        document.body.appendChild(confetti);

        const animation = confetti.animate(
          [
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            {
              transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.5, 0, 0.5, 1)',
          }
        );

        animation.onfinish = () => confetti.remove();
      }
    };

    const timer = setTimeout(createConfetti, 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-premium-gold rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* Success Icon with Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 300,
                    delay: 0.2,
                  }}
                  className="relative inline-block mb-6"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg">
                      <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                  
                  {/* Stars Animation */}
                  <motion.div
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star className="w-8 h-8 text-premium-gold fill-premium-gold" />
                  </motion.div>
                </motion.div>

                {/* Success Message */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                >
                  תשלום בוצע בהצלחה! 🎉
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-lg mb-6"
                >
                  תודה על הרכישה שלך!
                </motion.p>

                {/* Payment Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-premium-gold/10 to-green-50 rounded-2xl p-6 mb-6 border border-premium-gold/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Gift className="w-5 h-5 text-premium-gold" />
                        <span className="font-medium">מספר פריטים</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{itemsCount}</span>
                    </div>
                    
                    <div className="border-t border-premium-gold/20 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-700">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className="font-medium">סכום סופי</span>
                        </div>
                        <span className="text-3xl font-bold text-premium-gold">
                          ₪{totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Info Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
                >
                  <p className="text-sm text-blue-800">
                    📧 אישור הזמנה נשלח למייל שלך
                    <br />
                    🚗 נחזור אליך תוך 24 שעות לסידור משלוח
                  </p>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onClose}
                    className="w-full bg-premium-gold hover:bg-premium-gold/90 text-white text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    מעולה, תודה!
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
