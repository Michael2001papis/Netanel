// סוגי משתמשים
export type UserRole = 'business' | 'admin';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

// הנחה על רכב
export interface CarDiscount {
  percentage: number;
  createdAt: string;
  createdBy: string; // username של מי שיצר את ההנחה
}

// רכב
export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  description: string;
  specifications: {
    engine: string;
    horsepower: number;
    fuel: string;
    transmission: string;
  };
  status: 'in_stock' | 'out_of_stock';
  tags: ('new' | 'used' | 'first_hand' | 'premium')[];
  level: 'basic' | 'intermediate' | 'premium';
  addons?: Addon[];
  discount?: CarDiscount; // הנחה על רכב ספציפי
}

// תוספות
export interface Addon {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'sport' | 'safety' | 'luxury' | 'special';
  requiresNote?: boolean;
}

// פריט בסל
export interface CartItem {
  car: Car;
  quantity: number;
  selectedAddons: string[]; // IDs של תוספות
  customNotes: Record<string, string>; // הערות לתוספות מיוחדות
  discount?: Discount;
}

// הנחה
export interface Discount {
  percentage: number;
  approvedBy: string;
  approvedAt: string;
}

// לוג הנחות
export interface DiscountLog {
  id: string;
  carId: string;
  carName: string;
  percentage: number;
  approvedBy: string;
  approvedAt: string;
}

// הגדרות אתר
export interface SiteSettings {
  siteTitle: string;
  marketingText: string;
  showPrices: boolean;
  showStockStatus: boolean;
  showDiscountsManagement?: boolean; // הצגת "ניהול הנחות" ב-Dashboard (ברירת מחדל: true)
}

// סטטיסטיקות
export interface SalesStats {
  totalCarsInCart: number;
  totalPotentialRevenue: number;
  averagePricePerCar: number;
  discountsToday: number;
  topSellingCars: Array<{
    carId: string;
    carName: string;
    count: number;
  }>;
}