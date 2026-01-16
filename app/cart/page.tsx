'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal, getCartItemTotal, applyDiscount } = useCart();
  const { isBusiness, isAdmin } = useAuth();
  const [discountInputs, setDiscountInputs] = useState<Record<string, { percentage: number; password: string }>>({});

  const handleDiscount = async (carId: string) => {
    const input = discountInputs[carId];
    if (!input) return;

    const success = await applyDiscount(carId, input.percentage, input.password);
    if (success) {
      setDiscountInputs({ ...discountInputs, [carId]: { percentage: 0, password: '' } });
      alert('הנחה הוחלה בהצלחה!');
    } else {
      alert('שגיאה בהחלת הנחה. בדוק את הסיסמה או את הגבלת ההנחה.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">הסל שלך ריק</h2>
            <p className="text-gray-600 mb-6">התחל להוסיף רכבים לסל שלך</p>
            <Button variant="primary" onClick={() => router.push('/catalog')}>
              <ArrowLeft className="w-5 h-5 ml-2" />
              עבר לקטלוג
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">סל קניות</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* רשימת פריטים */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.car.id} className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.car.images[0] || '/placeholder-car.jpg'}
                      alt={item.car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{item.car.name}</h3>
                        <p className="text-gray-600 text-sm">₪{item.car.price.toLocaleString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-sm"
                        onClick={() => removeFromCart(item.car.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {item.selectedAddons.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-semibold mb-1">תוספות:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {item.selectedAddons.map((addonId) => {
                            const addon = item.car.addons?.find(a => a.id === addonId);
                            return addon ? (
                              <li key={addonId}>
                                • {addon.name} - ₪{addon.price.toLocaleString()}
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}

                    {/* הנחה */}
                    {(isBusiness || isAdmin) && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        {!item.discount ? (
                          <div className="space-y-2">
                            <Input
                              type="number"
                              placeholder="אחוז הנחה"
                              min="0"
                              max={isAdmin ? 25 : 10}
                              value={discountInputs[item.car.id]?.percentage || ''}
                              onChange={(e) => setDiscountInputs({
                                ...discountInputs,
                                [item.car.id]: {
                                  percentage: parseInt(e.target.value) || 0,
                                  password: discountInputs[item.car.id]?.password || '',
                                },
                              })}
                              className="text-sm"
                            />
                            <Input
                              type="password"
                              placeholder="סיסמת מנהל"
                              value={discountInputs[item.car.id]?.password || ''}
                              onChange={(e) => setDiscountInputs({
                                ...discountInputs,
                                [item.car.id]: {
                                  percentage: discountInputs[item.car.id]?.percentage || 0,
                                  password: e.target.value,
                                },
                              })}
                              className="text-sm"
                            />
                            <Button
                              variant="outline"
                              className="text-sm"
                              onClick={() => handleDiscount(item.car.id)}
                            >
                              החל הנחה
                            </Button>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <p className="font-semibold text-green-600">
                              הנחה {item.discount.percentage}% מוחלת
                            </p>
                            <p className="text-gray-500 text-xs">
                              אושר על ידי: {item.discount.approvedBy}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <label className="text-sm">כמות:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateCartItem(item.car.id, {
                            quantity: parseInt(e.target.value) || 1,
                          })}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </div>
                      <span className="text-xl font-bold text-premium-gold">
                        ₪{getCartItemTotal(item).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* סיכום */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">סיכום הזמנה</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>מספר פריטים</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>סה"כ</span>
                    <span className="text-premium-gold">₪{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mb-3"
                onClick={() => {
                  alert('הזמנה בוצעה בהצלחה! (דמו)');
                  clearCart();
                  router.push('/');
                }}
              >
                המשך לתשלום
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/catalog')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                המשך קניות
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}