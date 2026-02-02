// ניהול LocalStorage עבור מצב דמו
// פונקציות לשמירה וטעינה של נתונים ב-LocalStorage

import { Car, CartItem, User, DiscountLog, SiteSettings } from '../types';

const STORAGE_KEYS = {
  CARS: 'premium_cars_cars',
  CART: 'premium_cars_cart',
  USERS: 'premium_cars_users',
  DISCOUNTS_LOG: 'premium_cars_discounts_log',
  SETTINGS: 'premium_cars_settings',
  CURRENT_USER: 'premium_cars_current_user',
} as const;

// שמירת נתונים ב-LocalStorage
const save = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// טעינת נתונים מ-LocalStorage
const load = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch {
        return defaultValue;
      }
    }
  }
  return defaultValue;
};

// רכבים
export const saveCars = (cars: Car[]): void => {
  save(STORAGE_KEYS.CARS, cars);
};

export const loadCars = (): Car[] => {
  return load<Car[]>(STORAGE_KEYS.CARS, []);
};

// סל קניות
export const saveCart = (cart: CartItem[]): void => {
  save(STORAGE_KEYS.CART, cart);
};

export const loadCart = (): CartItem[] => {
  return load<CartItem[]>(STORAGE_KEYS.CART, []);
};

// משתמשים
export const saveUsers = (users: User[]): void => {
  save(STORAGE_KEYS.USERS, users);
};

export const loadUsers = (): User[] => {
  return load<User[]>(STORAGE_KEYS.USERS, []);
};

// לוג הנחות
export const saveDiscountsLog = (logs: DiscountLog[]): void => {
  save(STORAGE_KEYS.DISCOUNTS_LOG, logs);
};

export const loadDiscountsLog = (): DiscountLog[] => {
  return load<DiscountLog[]>(STORAGE_KEYS.DISCOUNTS_LOG, []);
};

// הגדרות
export const saveSettings = (settings: SiteSettings): void => {
  save(STORAGE_KEYS.SETTINGS, settings);
};

export const loadSettings = (): SiteSettings => {
  return load<SiteSettings>(STORAGE_KEYS.SETTINGS, {
    siteTitle: 'Premium Motors',
    marketingText: 'יוקרה, ביצועים, חוויה',
    showPrices: true,
    showStockStatus: true,
    showDiscountsManagement: true, // ברירת מחדל: מוצג
  });
};

// משתמש נוכחי
export const saveCurrentUser = (user: User | null): void => {
  save(STORAGE_KEYS.CURRENT_USER, user);
};

export const loadCurrentUser = (): User | null => {
  return load<User | null>(STORAGE_KEYS.CURRENT_USER, null);
};

// איפוס מצב דמו
export const resetDemo = (): void => {
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    window.location.reload();
  }
};