import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Car, Addon, Discount } from '../types';
import { loadCart, saveCart, loadDiscountsLog, saveDiscountsLog } from '../utils/storage';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  // הוספת רכב לסל עם תוספות אופציונליות
  addToCart: (car: Car, addons?: string[], notes?: Record<string, string>) => void;
  removeFromCart: (carId: string) => void;
  updateCartItem: (carId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemTotal: (item: CartItem) => number;
  applyDiscount: (carId: string, percentage: number, password: string) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isBusiness, isAdmin, user } = useAuth();

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (car: Car, addons: string[] = [], notes: Record<string, string> = {}) => {
    const existingItemIndex = cart.findIndex(item => item.car.id === car.id);
    
    // אם יש הנחה על הרכב, מעבירים אותה ל-CartItem
    const discount = car.discount ? {
      percentage: car.discount.percentage,
      approvedBy: car.discount.createdBy,
      approvedAt: car.discount.createdAt,
    } : undefined;
    
    if (existingItemIndex >= 0) {
      // עדכון פריט קיים
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
        selectedAddons: [...new Set([...updatedCart[existingItemIndex].selectedAddons, ...addons])],
        customNotes: { ...updatedCart[existingItemIndex].customNotes, ...notes },
        discount: discount, // עדכון הנחה אם יש
      };
      saveCartToStorage(updatedCart);
    } else {
      // הוספת פריט חדש
      const newItem: CartItem = {
        car,
        quantity: 1,
        selectedAddons: addons,
        customNotes: notes,
        discount: discount, // הוספת הנחה אם יש
      };
      saveCartToStorage([...cart, newItem]);
    }
  };

  // הסרת רכב מהסל
  const removeFromCart = (carId: string) => {
    saveCartToStorage(cart.filter(item => item.car.id !== carId));
  };

  // עדכון פריט בסל
  const updateCartItem = (carId: string, updates: Partial<CartItem>) => {
    saveCartToStorage(
      cart.map(item => 
        item.car.id === carId ? { ...item, ...updates } : item
      )
    );
  };

  // ניקוי הסל
  const clearCart = () => {
    saveCartToStorage([]);
  };

  // חישוב מחיר כולל של פריט בסל (כולל תוספות והנחות)
  const getCartItemTotal = (item: CartItem): number => {
    const carPrice = item.car.price;
    const addonsPrice = item.selectedAddons.reduce((sum, addonId) => {
      const addon = item.car.addons?.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    
    const subtotal = (carPrice + addonsPrice) * item.quantity;
    
    if (item.discount) {
      return subtotal * (1 - item.discount.percentage / 100);
    }
    
    return subtotal;
  };

  // חישוב מחיר כולל של כל הסל
  const getCartTotal = (): number => {
    return cart.reduce((sum, item) => sum + getCartItemTotal(item), 0);
  };

  // החלת הנחה על רכב בסל - דורש אימות סיסמה והרשאה
  const applyDiscount = async (carId: string, percentage: number, password: string): Promise<boolean> => {
    // בדיקת הרשאות והגבלות
    if (!isBusiness && !isAdmin) {
      return false;
    }

    // בדיקת סיסמה
    if (password !== '123456') {
      return false;
    }

    // הגבלות הנחה לפי תפקיד
    let maxDiscount = 0;
    if (isAdmin) {
      maxDiscount = 25;
    } else if (isBusiness) {
      maxDiscount = 10;
    }

    if (percentage > maxDiscount) {
      return false;
    }

    // החלת הנחה
    const updatedCart = cart.map(item => {
      if (item.car.id === carId) {
        const discount: Discount = {
          percentage,
          approvedBy: user?.name || 'Unknown',
          approvedAt: new Date().toISOString(),
        };

        // שמירה בלוג
        const logs = loadDiscountsLog();
        logs.push({
          id: `discount-${Date.now()}`,
          carId: item.car.id,
          carName: item.car.name,
          percentage,
          approvedBy: user?.name || 'Unknown',
          approvedAt: new Date().toISOString(),
        });
        saveDiscountsLog(logs);

        return { ...item, discount };
      }
      return item;
    });

    saveCartToStorage(updatedCart);
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getCartTotal,
        getCartItemTotal,
        applyDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};