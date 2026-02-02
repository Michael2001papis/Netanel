import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* שם העסק */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-premium-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PM</span>
              </div>
              <span className="text-2xl font-bold text-white">Premium Motors</span>
            </Link>
            <p className="text-gray-400 text-sm mb-3">
              רכבי יוקרה בהתאמה אישית
            </p>
            {/* טקסט מותגי */}
            <p className="text-premium-gold text-sm font-medium">
              ייבוא • מכירה • ליווי אישי • שקיפות מלאה
            </p>
          </div>

          {/* יצירת קשר */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-premium-gold">יצירת קשר</h3>
            <div className="space-y-3">
              {/* נתנאל - טלפון ואימייל */}
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1">
                  <Phone className="w-4 h-4 text-premium-gold" />
                  <a href="tel:0533374401" className="hover:text-premium-gold transition-colors">
                    053-337-4401
                  </a>
                  <span className="text-xs text-gray-500">(נתנאל)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mr-6">
                  <Mail className="w-4 h-4 text-premium-gold" />
                  <a href="mailto:nh2001@gmail.com" className="hover:text-premium-gold transition-colors text-sm">
                    nh2001@gmail.com
                  </a>
                </div>
              </div>

              {/* עסק - טלפון ואימייל */}
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1">
                  <Phone className="w-4 h-4 text-premium-gold" />
                  <a href="tel:035948741" className="hover:text-premium-gold transition-colors">
                    03-594-8741
                  </a>
                  <span className="text-xs text-gray-500">(עסק)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mr-6">
                  <Mail className="w-4 h-4 text-premium-gold" />
                  <a href="mailto:PMotors@gmail.com" className="hover:text-premium-gold transition-colors text-sm">
                    PMotors@gmail.com
                  </a>
                </div>
              </div>

              {/* מפתח - זמני לבדיקות בלבד */}
              <div className="pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2">לצורכי בדיקות בלבד:</p>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Phone className="w-3.5 h-3.5 text-gray-600" />
                  <a href="tel:0508535941" className="hover:text-gray-300 transition-colors text-sm">
                    050-853-5941
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mr-6">
                  <Mail className="w-3.5 h-3.5 text-gray-600" />
                  <a href="mailto:dvnka2@gmail.com" className="hover:text-gray-300 transition-colors text-xs">
                    dvnka2@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* שעות פעילות */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-premium-gold">שעות פעילות</h3>
            <div className="text-gray-300 text-sm">
              <p className="font-medium text-gray-400 italic">
                סגור זמנית
              </p>
              <p className="text-xs text-gray-500 mt-2">
                עד לעדכון נוסף
              </p>
            </div>
          </div>
        </div>

        {/* כל הזכויות שמורות */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Premium Motors. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};
