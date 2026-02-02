import React from 'react';
import { motion } from 'framer-motion';

interface BrandTerm {
  word: string;
  description: string;
}

const brandTerms: BrandTerm[] = [
  {
    word: 'ייבוא',
    description: 'ייבוא רכבים בהתאמה אישית ובהתאם לדרישות הלקוח. בחירה מתוך קטלוג עולמי של רכבי יוקרה באיכות גבוהה.',
  },
  {
    word: 'מכירה',
    description: 'תהליך רכישה ברור, בטוח ומקצועי. מחירים שקופים, תנאי תשלום גמישים וליווי מלא עד למסירת הרכב.',
  },
  {
    word: 'ליווי אישי',
    description: 'יחס אישי וליווי מלא לאורך כל התהליך. יועץ מקצועי עומד לרשותך בכל שאלה, מהבחירה ועד המסירה.',
  },
  {
    word: 'שקיפות מלאה',
    description: 'כל הפרטים, העלויות והשלבים גלויים ללקוח מראש. אין הפתעות, רק פתרונות מותאמים אישית.',
  },
];

interface BrandTextProps {
  className?: string;
}

export const BrandText: React.FC<BrandTextProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* טקסט מותגי עם קישור לאלמנט */}
      <div className="text-center mb-8">
        <p className="text-premium-gold text-lg font-medium">
          {brandTerms.map((term, index) => (
            <React.Fragment key={term.word}>
              <span>{term.word}</span>
              {index < brandTerms.length - 1 && (
                <span className="mx-2 text-premium-gold/60">•</span>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* עיגול מעוצב עם הסברים */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-4xl mx-auto"
      >
        {/* עיגול חיצוני עם gradient */}
        <div className="relative bg-gradient-to-br from-premium-gold/10 via-premium-gold/5 to-transparent rounded-3xl p-8 md:p-12 border border-premium-gold/20 shadow-xl">
          {/* רשת של 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {brandTerms.map((term, index) => (
              <motion.div
                key={term.word}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center md:text-right space-y-2"
              >
                {/* כותרת */}
                <h3 className="text-xl md:text-2xl font-bold text-premium-gold mb-2">
                  {term.word}
                </h3>
                {/* תיאור */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {term.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* קווי הפרדה אלגנטיים */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-premium-gold/10 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-premium-gold/10 transform -translate-x-1/2"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
