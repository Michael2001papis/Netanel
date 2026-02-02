import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BrandText } from '../components/BrandText';
import { Button } from '../components/ui/Button';
import { ShieldCheck, UserCheck, CreditCard, Eye, Phone, ArrowLeft } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

export default function Home() {
  const { openModal } = useContactModal();

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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-10 max-w-3xl mx-auto"
          >
            <div className="text-gray-200">
              <BrandText className="text-lg md:text-xl lg:text-2xl" />
            </div>
          </motion.div>
          
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
              onClick={openModal}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
