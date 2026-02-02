import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BrandText } from '../components/BrandText';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { loadCars } from '../utils/storage';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Car, Addon } from '../types';
import { ShoppingCart, ArrowRight, Check, Calendar, Phone, Mail, X, ChevronRight, ChevronLeft, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';

export default function CarDetails() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isBusiness, isAdmin } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountPassword, setDiscountPassword] = useState<string>('');
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactNote, setContactNote] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const toast = useToast();

  useEffect(() => {
    const cars = loadCars();
    const foundCar = cars.find(c => c.id === params.id);
    if (foundCar) {
      setCar(foundCar);
    }
  }, [params.id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p>רכב לא נמצא</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/catalog')}>
            חזור לקטלוג
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(car, selectedAddons, customNotes);
    navigate('/cart');
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const getTotalPrice = () => {
    const basePrice = car.price;
    const addonsPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = car.addons?.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return basePrice + addonsPrice;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate('/catalog')} className="mb-6">
          <ArrowRight className="w-4 h-4 ml-2" />
          חזור לקטלוג
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* גלריית תמונות */}
          <div>
            {/* תמונה ראשית */}
            <Card className="overflow-hidden mb-4 group cursor-pointer" onClick={() => setShowImageModal(true)}>
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src={car.images[selectedImageIndex] || car.images[0] || '/placeholder-car.jpg'}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : car.images.length - 1));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev < car.images.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </Card>

            {/* תמונות קטנות */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx 
                        ? 'border-premium-gold ring-2 ring-premium-gold/30' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${car.name} ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* פרטים */}
          <div>
            {/* כותרת ומחיר */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {car.tags.includes('premium') && (
                  <span className="bg-premium-gold/90 text-white px-3 py-1 rounded text-xs font-medium">
                    Premium
                  </span>
                )}
                <span className={`px-2.5 py-1 rounded text-xs font-medium backdrop-blur-sm ${
                  car.status === 'in_stock' 
                    ? 'bg-white/90 text-gray-700 border border-gray-200' 
                    : 'bg-gray-800/80 text-white'
                }`}>
                  {car.status === 'in_stock' ? 'במלאי' : 'אזל'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{car.name}</h1>
              
              {/* אזור מחיר ברור - עם overflow protection */}
              <div className="bg-gradient-to-r from-premium-gold/10 to-transparent border-r-4 border-premium-gold p-5 rounded-lg mb-6 min-w-0">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-4xl font-bold text-gray-900 truncate min-w-0 flex-shrink">
                    ₪{car.price.toLocaleString()}
                  </span>
                  <span className="text-lg font-medium text-premium-gold whitespace-nowrap flex-shrink-0">החל מ-</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">מחיר בסיס, לפני תוספות</p>
              </div>
            </div>

            {/* מפרט טכני - ברור ופשוט */}
            <Card className="p-6 mb-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-5 text-gray-900">מפרט טכני</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 mb-1">שנה</p>
                  <p className="text-lg font-semibold text-gray-900">{car.year}</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 mb-1">מנוע</p>
                  <p className="text-lg font-semibold text-gray-900">{car.specifications.engine}</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 mb-1">כוח סוס</p>
                  <p className="text-lg font-semibold text-gray-900">{car.specifications.horsepower} כ"ס</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 mb-1">דלק</p>
                  <p className="text-lg font-semibold text-gray-900">{car.specifications.fuel}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">תמסורת</p>
                  <p className="text-lg font-semibold text-gray-900">{car.specifications.transmission}</p>
                </div>
              </div>
            </Card>

            {/* תוספות */}
            {car.addons && car.addons.length > 0 && (
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">תוספות זמינות</h2>
                <div className="space-y-3">
                  {car.addons.map((addon) => (
                    <div
                      key={addon.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddons.includes(addon.id)
                          ? 'border-premium-gold bg-premium-gold/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="flex items-center justify-between gap-4 min-w-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {selectedAddons.includes(addon.id) && (
                              <Check className="w-5 h-5 text-premium-gold flex-shrink-0" />
                            )}
                            <h3 className="font-semibold truncate min-w-0">{addon.name}</h3>
                          </div>
                          {addon.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">{addon.description}</p>
                          )}
                          {addon.requiresNote && selectedAddons.includes(addon.id) && (
                            <Input
                              placeholder="הזן הערה"
                              value={customNotes[addon.id] || ''}
                              onChange={(e) => setCustomNotes({ ...customNotes, [addon.id]: e.target.value })}
                              className="mt-2"
                            />
                          )}
                        </div>
                        <span className="text-lg font-bold text-premium-gold whitespace-nowrap flex-shrink-0">
                          ₪{addon.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* כפתורי פעולה ראשיים */}
            <div className="space-y-3 mb-6">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-premium-gold hover:bg-premium-gold/90 text-white text-lg py-4"
                onClick={() => setShowContactModal(true)}
              >
                <Mail className="w-5 h-5 ml-2" />
                השאר פרטים
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-gray-300 hover:border-premium-gold text-lg py-4"
                onClick={() => setShowAppointmentModal(true)}
                disabled={car.status === 'out_of_stock'}
              >
                <Calendar className="w-5 h-5 ml-2" />
                קבע פגישה
              </Button>
            </div>

            {/* סיכום מחיר (אם יש תוספות) - עם overflow protection */}
            {selectedAddons.length > 0 && (
              <Card className="p-6 mb-6 bg-gray-50 border border-gray-200 min-w-0">
                <h3 className="text-lg font-bold mb-4 text-gray-900">סיכום מחיר</h3>
                <div className="space-y-2 min-w-0">
                  <div className="flex justify-between gap-4 text-gray-700 min-w-0">
                    <span className="flex-shrink-0">מחיר בסיס</span>
                    <span className="font-medium truncate min-w-0 text-left">₪{car.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-sm text-gray-600 min-w-0">
                    <span className="flex-shrink-0">תוספות ({selectedAddons.length})</span>
                    <span className="truncate min-w-0 text-left">
                      ₪{selectedAddons.reduce((sum, id) => {
                        const addon = car.addons?.find(a => a.id === id);
                        return sum + (addon?.price || 0);
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between gap-4 text-xl font-bold min-w-0">
                    <span className="text-gray-900 flex-shrink-0">סה"כ</span>
                    <span className="text-premium-gold truncate min-w-0 text-left">₪{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* הוסף לסל (מוצנע) */}
            <div className="border-t border-gray-200 pt-6">
              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-900"
                onClick={handleAddToCart}
                disabled={car.status === 'out_of_stock'}
              >
                <ShoppingCart className="w-4 h-4 ml-2" />
                הוסף לסל לקנייה מהירה
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal השאר פרטים */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => {
                setShowContactModal(false);
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
              נחזור אליך תוך 24 שעות עם פרטים נוספים על ה-{car.name}
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.success('תודה! נחזור אליך תוך 24 שעות');
              setShowContactModal(false);
              setContactName('');
              setContactPhone('');
              setContactNote('');
            }} className="space-y-4">
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
                  onClick={() => {
                    setShowContactModal(false);
                    setContactName('');
                    setContactPhone('');
                    setContactNote('');
                  }}
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

      {/* Modal קבע פגישה */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => {
                setShowAppointmentModal(false);
                setAppointmentDate('');
                setAppointmentTime('');
              }}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              קבע פגישה
            </h3>
            <p className="text-gray-600 text-center mb-6">
              נא בחר תאריך ושעה מתאימים לצפייה ב-{car.name}
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.success('פגישה נקבעה בהצלחה! נחזור אליך לאישור');
              setShowAppointmentModal(false);
              setAppointmentDate('');
              setAppointmentTime('');
            }} className="space-y-4">
              <Input
                label="תאריך"
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              
              <Input
                label="שעה"
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAppointmentModal(false);
                    setAppointmentDate('');
                    setAppointmentTime('');
                  }}
                  className="flex-1"
                >
                  ביטול
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 bg-premium-gold hover:bg-premium-gold/90"
                >
                  קבע פגישה
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal גלריית תמונות */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-5xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={car.images[selectedImageIndex] || car.images[0] || '/placeholder-car.jpg'}
              alt={car.name}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            
            {car.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : car.images.length - 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev < car.images.length - 1 ? prev + 1 : 0))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal הנחה */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">החלת הנחה</h2>
            <div className="space-y-4">
              <Input
                label="אחוז הנחה"
                type="number"
                min="0"
                max={isAdmin ? 25 : 10}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(parseInt(e.target.value) || 0)}
              />
              <Input
                label="סיסמת מנהל"
                type="password"
                value={discountPassword}
                onChange={(e) => setDiscountPassword(e.target.value)}
                placeholder="123456"
              />
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    // הנחה תיושם אחרי שהוספה לסל
                    setShowDiscountModal(false);
                  }}
                >
                  אישור
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => {
                    setShowDiscountModal(false);
                    setDiscountPercentage(0);
                    setDiscountPassword('');
                  }}
                >
                  ביטול
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* טקסט מותגי */}
      <div className="text-center py-8 border-t border-gray-200 mt-12">
        <BrandText />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
