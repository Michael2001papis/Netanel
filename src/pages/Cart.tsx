import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BrandText } from '../components/BrandText';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Trash2, ShoppingCart, ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal, getCartItemTotal } = useCart();
  const { isBusiness, isAdmin } = useAuth();
  const toast = useToast();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">הסל שלך ריק</h2>
            <p className="text-gray-600 mb-6">התחל להוסיף רכבים לסל שלך</p>
            <Button variant="primary" onClick={() => navigate('/catalog')}>
              <ArrowLeft className="w-5 h-5 ml-2" />
              עבר לקטלוג
            </Button>
          </Card>
        </div>

        {/* טקסט מותגי */}
        <div className="text-center py-8 border-t border-gray-200 mt-12">
          <BrandText />
        </div>

        {/* Footer */}
        <Footer />
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
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-4 min-w-0">
                      <div className="min-w-0 flex-shrink">
                        <h3 className="text-xl font-bold truncate min-w-0">{item.car.name}</h3>
                        <p className="text-gray-600 text-sm truncate min-w-0">₪{item.car.price.toLocaleString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 flex-shrink-0"
                        onClick={() => removeFromCart(item.car.id)}
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

                    {/* הנחה - מוצגת רק אם יש הנחה על הרכב */}
                    {item.car.discount && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-red-600">
                            {item.car.discount.percentage}% הנחה
                          </span>
                          <span className="text-xs text-gray-500">
                            על הרכב
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          הוגדרה ב-{new Date(item.car.discount.createdAt).toLocaleDateString('he-IL')}
                          {item.car.discount.createdBy && ` על ידי ${item.car.discount.createdBy}`}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex justify-between items-center gap-4 min-w-0">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <label className="text-sm whitespace-nowrap">כמות:</label>
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
                      <span className="text-xl font-bold text-premium-gold truncate min-w-0 text-left whitespace-nowrap">
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
              
              <div className="space-y-3 mb-6 min-w-0">
                <div className="flex justify-between gap-4 min-w-0">
                  <span className="flex-shrink-0">מספר פריטים</span>
                  <span className="truncate min-w-0 text-left">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 min-w-0">
                  <div className="flex justify-between gap-4 text-xl font-bold min-w-0">
                    <span className="flex-shrink-0">סה"כ</span>
                    <span className="text-premium-gold truncate min-w-0 text-left whitespace-nowrap">₪{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mb-3 bg-premium-gold hover:bg-premium-gold/90 text-white relative overflow-hidden"
                onClick={async () => {
                  setIsProcessing(true);
                  // סימולציית תהליך תשלום
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  setIsProcessing(false);
                  setShowPaymentSuccess(true);
                }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>מעבד תשלום...</span>
                  </motion.div>
                ) : (
                  <>
                    <Lock className="w-5 h-5 ml-2" />
                    המשך לתשלום
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/catalog')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                המשך קניות
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* טקסט מותגי */}
      <div className="text-center py-8 border-t border-gray-200 mt-12">
        <BrandText />
      </div>

      {/* Footer */}
      <Footer />

      {/* Payment Success Modal */}
      <PaymentSuccess
        isOpen={showPaymentSuccess}
        onClose={() => {
          setShowPaymentSuccess(false);
          clearCart();
          setTimeout(() => navigate('/'), 300);
        }}
        totalAmount={getCartTotal()}
        itemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
    </div>
  );
}
