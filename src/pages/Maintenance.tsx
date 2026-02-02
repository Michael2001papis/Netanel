import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, ArrowLeft } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-premium-gold/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-24 h-24 bg-premium-gold/10 rounded-full flex items-center justify-center border-4 border-premium-gold/30">
              <Wrench className="w-12 h-12 text-premium-gold" />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            האתר נמצא בשיפוצים
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-6">
            האתר אינו זמין כרגע לקהל הרחב
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200 mb-8">
            <div className="flex items-center justify-center gap-3 text-gray-600 mb-4">
              <Clock className="w-5 h-5 text-premium-gold" />
              <p className="text-lg font-medium">
                אנו עובדים על שיפורים וחידושים
              </p>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              אנו עורכים שיפוצים כדי להביא לך חוויה טובה יותר.
              <br />
              האתר יחזור לפעילות מלאה בקרוב.
            </p>
          </div>

          {/* Brand Text */}
          <div className="mt-8">
            <p className="text-premium-gold text-lg font-medium">
              ייבוא • מכירה • ליווי אישי • שקיפות מלאה
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Premium Motors
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
