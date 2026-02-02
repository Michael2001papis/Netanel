import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Shield } from 'lucide-react';
import { Button } from './ui/Button';

interface ConsentModalProps {
  onAccept: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      const timestamp = Date.now();
      localStorage.setItem('site_consent', JSON.stringify({ accepted: true, timestamp }));
      onAccept();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-10 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-premium-gold/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-premium-gold" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                הסכמה לשימוש באתר
              </h2>
              <p className="text-gray-600 text-sm">
                נדרש אישור לפני המשך הגלישה
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 mb-8">
            <div className="bg-amber-50 border-r-4 border-amber-400 p-4 rounded-lg">
              <p className="text-amber-900 text-sm font-medium">
                ⚠️ גישה לאתר זה מותנית באישור קריאה והבנה של ההצהרה המשפטית הבאה
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                זכויות יוצרים וקניין רוחני
              </h3>
              
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  <strong className="text-gray-900">הצהרה משפטית חשובה:</strong>
                </p>
                
                <p>
                  כל הזכויות באתר זה, כולל אך לא רק: העיצוב, הקוד המקור, הפונקציונליות, המבנה, הארכיטקטורה הטכנית, 
                  האלמנטים הויזואליים, הלוגיקה העסקית, והתוכן היצירתי — <strong className="text-gray-900">שייכים באופן בלעדי למפתח האתר, מיכאל פפיסמדוב</strong>.
                </p>

                <p>
                  <strong className="text-gray-900">© {new Date().getFullYear()} מיכאל פפיסמדוב. כל הזכויות שמורות.</strong>
                </p>

                <div className="border-t border-gray-300 pt-3 mt-3">
                  <p className="font-semibold text-gray-900 mb-2">שימוש אסור ללא אישור:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>העתקה, שכפול או שימוש בקוד המקור</li>
                    <li>שינוי, עריכה או התאמה אישית של הקוד או העיצוב</li>
                    <li>הפצה, מכירה או העברת הקוד לצדדים שלישיים</li>
                    <li>שימוש בעיצוב או באלמנטים ויזואליים לפרויקטים אחרים</li>
                    <li>הסרת או שינוי הודעות זכויות יוצרים</li>
                  </ul>
                </div>

                <p className="pt-2 border-t border-gray-300">
                  כל שימוש, העתקה, הפצה, שינוי או הסתמכות על תוכן האתר או על המערכת <strong className="text-gray-900">מחייב אישור מפורש בכתב ממיכאל פפיסמדוב</strong>.
                </p>

                <p className="text-xs text-gray-600 italic pt-2">
                  הגנת זכויות היוצרים היא טכנית/יצירתית בלבד ואינה קשורה לפעילות המסחרית של Premium Motors.
                </p>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-premium-gold focus:ring-premium-gold focus:ring-2 cursor-pointer"
                />
              </div>
              <span className={`text-sm leading-relaxed ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                אני מאשר כי <strong>קראתי והבנתי</strong> את ההצהרה המשפטית לעיל, ומתחייב/ת לכבד את זכויות היוצרים והקניין הרוחני של מפתח האתר מיכאל פפיסמדוב.
              </span>
            </label>
          </div>

          {/* Action Button */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAccept}
              disabled={!isChecked}
              className={`flex-1 bg-premium-gold hover:bg-premium-gold/90 text-white text-lg py-4 ${
                !isChecked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <CheckCircle className="w-5 h-5 ml-2" />
              אישור והמשך
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-6 pt-6 border-t border-gray-200">
            אישור זה תקף למשך שעה. לאחר מכן תתבקש/י לאשר שוב.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
