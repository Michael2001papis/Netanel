import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { loadCars } from '../utils/storage';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Car, Addon } from '../types';
import { ShoppingCart, ArrowRight, Check } from 'lucide-react';

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
          {/* תמונות */}
          <div>
            <Card className="overflow-hidden mb-4">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={car.images[selectedImageIndex] || car.images[0] || '/placeholder-car.jpg'}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === idx ? 'border-premium-gold' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`${car.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* פרטים */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {car.tags.includes('premium') && (
                  <span className="bg-premium-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </span>
                )}
                {car.tags.includes('new') && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    חדש
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  car.status === 'in_stock' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {car.status === 'in_stock' ? 'במלאי' : 'אזל'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{car.description}</p>
              <div className="text-4xl font-bold text-premium-gold mb-6">
                ₪{car.price.toLocaleString()}
              </div>
            </div>

            {/* מפרט טכני */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">מפרט טכני</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">מנוע</p>
                  <p className="font-semibold">{car.specifications.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">כוח סוס</p>
                  <p className="font-semibold">{car.specifications.horsepower}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">דלק</p>
                  <p className="font-semibold">{car.specifications.fuel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">תמסורת</p>
                  <p className="font-semibold">{car.specifications.transmission}</p>
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
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {selectedAddons.includes(addon.id) && (
                              <Check className="w-5 h-5 text-premium-gold" />
                            )}
                            <h3 className="font-semibold">{addon.name}</h3>
                          </div>
                          {addon.description && (
                            <p className="text-sm text-gray-600">{addon.description}</p>
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
                        <span className="text-lg font-bold text-premium-gold">
                          ₪{addon.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* סיכום מחיר */}
            <Card className="p-6 mb-6 bg-premium-gold/5">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>מחיר בסיס</span>
                  <span>₪{car.price.toLocaleString()}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>תוספות ({selectedAddons.length})</span>
                    <span>
                      ₪{selectedAddons.reduce((sum, id) => {
                        const addon = car.addons?.find(a => a.id === id);
                        return sum + (addon?.price || 0);
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between text-xl font-bold">
                  <span>סה"כ</span>
                  <span className="text-premium-gold">₪{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              {/* הנחה - רק למשתמשים מורשים */}
              {(isBusiness || isAdmin) && (
                <div className="mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowDiscountModal(true)}
                  >
                    החלת הנחה
                  </Button>
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={car.status === 'out_of_stock'}
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                הוסף לסל
              </Button>
            </Card>
          </div>
        </div>
      </div>

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
    </div>
  );
}
