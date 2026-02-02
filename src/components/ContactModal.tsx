import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useContactModal } from '../contexts/ContactModalContext';
import { useToast } from '../contexts/ToastContext';

export const ContactModal: React.FC = () => {
  const { isOpen, closeModal } = useContactModal();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNote, setContactNote] = useState('');
  const toast = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('תודה! נחזור אליך תוך 24 שעות');
    closeModal();
    setContactName('');
    setContactPhone('');
    setContactNote('');
  };

  const handleClose = () => {
    closeModal();
    setContactName('');
    setContactPhone('');
    setContactNote('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
      >
        <button
          onClick={handleClose}
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
              onClick={handleClose}
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
  );
};
