import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { X, ShieldCheck, UserCheck, CreditCard, Eye, Phone } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNote, setContactNote] = useState('');
  const toast = useToast();

  useEffect(() => {
    // מאזין לאירוע לפתיחת modal יצירת קשר מה-Navbar
    const handleOpenContact = () => {
      setShowContactForm(true);
    };
    window.addEventListener('openContactModal', handleOpenContact);
    return () => {
      window.removeEventListener('openContactModal', handleOpenContact);
    };
  }, []);

  // פונקציה לשליחת פרטים
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('תודה! נחזור אליך תוך 24 שעות');
    setShowContactForm(false);
    setContactName('');
    setContactPhone('');
    setContactNote('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section - רקע יוקרתי עם תמונת רכב */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* רקע תמונה עם overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2070&auto=format&fit=crop')`,
          }}
        >
          {/* Overlay כהה למען קריאות */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
        </div>
        
        {/* תוכן מרכזי */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
          >
            Premium Motors
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-premium-gold mb-4">
              רכבי יוקרה בהתאמה אישית
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
          >
            ייבוא • מכירה • ליווי אישי • שקיפות מלאה
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/catalog">
              <Button 
                size="lg" 
                variant="primary"
                className="bg-premium-gold hover:bg-premium-gold/90 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
              >
                צפה ברכבים
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setShowContactForm(true)}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-semibold"
            >
              השאר פרטים
            </Button>
          </motion.div>
        </div>

        {/* אפקט scroll down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Section - אזור אמון */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* בדיקה לפני קנייה */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-gold/10 group-hover:bg-premium-gold transition-colors duration-300 mb-4">
                <ShieldCheck className="w-8 h-8 text-premium-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                בדיקה לפני קנייה
              </h3>
              <p className="text-gray-600 text-sm">
                כל רכב נבדק על ידי מומחים לפני המכירה
              </p>
            </motion.div>

            {/* ליווי אישי */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-gold/10 group-hover:bg-premium-gold transition-colors duration-300 mb-4">
                <UserCheck className="w-8 h-8 text-premium-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ליווי אישי
              </h3>
              <p className="text-gray-600 text-sm">
                יועץ מקצועי מלווה אותך בכל שלב
              </p>
            </motion.div>

            {/* מימון / טרייד-אין */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-gold/10 group-hover:bg-premium-gold transition-colors duration-300 mb-4">
                <CreditCard className="w-8 h-8 text-premium-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                מימון / טרייד-אין
              </h3>
              <p className="text-gray-600 text-sm">
                פתרונות מימון מותאמים אישית
              </p>
            </motion.div>

            {/* שקיפות מלאה */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-gold/10 group-hover:bg-premium-gold transition-colors duration-300 mb-4">
                <Eye className="w-8 h-8 text-premium-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                שקיפות מלאה
              </h3>
              <p className="text-gray-600 text-sm">
                כל הפרטים חשופים, ללא הפתעות
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal לטופס השארת פרטים */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => {
                setShowContactForm(false);
                setContactName('');
                setContactPhone('');
                setContactNote('');
              }}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              השאר פרטים
            </h3>
            <p className="text-gray-600 text-center mb-6">
              נחזור אליך תוך 24 שעות עם פרטים על הרכבים היוקרתיים שלנו
            </p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input
                label="שם מלא"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                autoFocus
              />
              
              <Input
                label="טלפון"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  הערה (אופציונלי)
                </label>
                <textarea
                  value={contactNote}
                  onChange={(e) => setContactNote(e.target.value)}
                  placeholder="כתוב כאן שאלות, בקשות מיוחדות או כל מידע נוסף..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-premium-gold focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
              
              {/* CTA ברור */}
              <div className="bg-premium-gold/10 border border-premium-gold/30 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-premium-gold">
                  ⏰ נחזור אליך תוך 24 שעות
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1"
                >
                  ביטול
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 bg-premium-gold hover:bg-premium-gold/90"
                >
                  שלח
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* שם העסק */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-premium-gold rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PM</span>
                </div>
                <span className="text-2xl font-bold text-white">Premium Motors</span>
              </div>
              <p className="text-gray-400 text-sm">
                רכבי יוקרה בהתאמה אישית
              </p>
            </div>

            {/* טלפון */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-premium-gold">יצירת קשר</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-premium-gold" />
                  <a href="tel:0501234567" className="hover:text-premium-gold transition-colors">
                    050-123-4567
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-premium-gold" />
                  <a href="tel:035468899" className="hover:text-premium-gold transition-colors">
                    03-546-8899
                  </a>
                </div>
              </div>
            </div>

            {/* שעות פעילות */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-premium-gold">שעות פעילות</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>ראשון - חמישי:</span>
                  <span className="font-medium">09:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>שישי:</span>
                  <span className="font-medium">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>שבת:</span>
                  <span className="font-medium text-gray-500">סגור</span>
                </div>
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
    </div>
  );
}
