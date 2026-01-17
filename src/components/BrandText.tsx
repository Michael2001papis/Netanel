import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseEnter = (index: number, event: React.MouseEvent<HTMLSpanElement>) => {
    setHoveredIndex(index);
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = 320; // max-w-xs = 320px
    
    // מיקום X - מרכז המילה בדיוק
    let x = rect.left + rect.width / 2;
    
    // וידוא שהטולטיפ לא יוצא מחוץ למסך (עם מרווחי ביטחון)
    const padding = 16;
    const minX = tooltipWidth / 2 + padding;
    const maxX = window.innerWidth - tooltipWidth / 2 - padding;
    
    if (x < minX) {
      x = minX;
    } else if (x > maxX) {
      x = maxX;
    }
    
    // מיקום Y - מעל המילה, עם חץ ומרווח
    const y = rect.top;
    
    setTooltipPosition({
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPosition(null);
  };

  return (
    <div className={`relative ${className}`}>
      <p className="text-premium-gold text-lg font-medium text-center">
        {brandTerms.map((term, index) => (
          <React.Fragment key={term.word}>
            <motion.span
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-help inline-block px-1 transition-colors duration-200 hover:text-premium-gold/80"
              whileHover={{ scale: 1.05 }}
            >
              {term.word}
            </motion.span>
            {index < brandTerms.length - 1 && (
              <span className="mx-2 text-premium-gold/60">•</span>
            )}
          </React.Fragment>
        ))}
      </p>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredIndex !== null && tooltipPosition && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-50%, calc(-100% - 10px))', // מעל המילה עם מרווח של 10px
            }}
          >
            {/* Tooltip Content */}
            <div className="bg-premium-gold text-white rounded-lg shadow-2xl p-4 max-w-xs text-sm leading-relaxed relative">
              <p className="font-semibold mb-1.5 text-base">{brandTerms[hoveredIndex].word}</p>
              <p className="text-white/90 text-sm">{brandTerms[hoveredIndex].description}</p>
              
              {/* Tooltip Arrow - מצביע למטה */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-premium-gold"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
