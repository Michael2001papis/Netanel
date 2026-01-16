// נתונים ראשוניים לדמו

import { Car, User, Addon } from '../types';
import { loadCars, saveCars, loadUsers, saveUsers } from './storage';

// תוספות דיפולטיביות
export const defaultAddons: Addon[] = [
  {
    id: 'addon-sport-1',
    name: 'חבילת ספורט',
    description: 'חבילת ספורט מלאה עם עיצוב אגרסיבי',
    price: 25000,
    category: 'sport',
  },
  {
    id: 'addon-sport-2',
    name: 'ג\'אנטים אלומיניום',
    description: 'ג\'אנטים אלומיניום 20 אינץ\'',
    price: 15000,
    category: 'sport',
  },
  {
    id: 'addon-safety-1',
    name: 'מערכת בטיחות מתקדמת',
    description: 'מערכת בטיחות כוללת עם מצלמות 360',
    price: 18000,
    category: 'safety',
  },
  {
    id: 'addon-luxury-1',
    name: 'מערכת שמע פרמיום',
    description: 'מערכת שמע בורמסטר 16 רמקולים',
    price: 30000,
    category: 'luxury',
  },
  {
    id: 'addon-luxury-2',
    name: 'צבע מיוחד',
    description: 'צבע קסטום מלוטש',
    price: 12000,
    category: 'luxury',
  },
  {
    id: 'addon-special-1',
    name: 'השחרת חלונות',
    description: 'השחרת חלונות 35%',
    price: 3500,
    category: 'special',
    requiresNote: true,
  },
];

// רכבים דיפולטיביים
export const defaultCars: Car[] = [
  {
    id: 'car-1',
    name: 'Mercedes-Benz S-Class 2024',
    brand: 'Mercedes',
    model: 'S-Class',
    year: 2024,
    price: 680000,
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://images.unsplash.com/photo-1617531653494-2adbb4ad5485?w=800',
    ],
    description: 'רכב יוקרה מהשורה הראשונה עם טכנולוגיה מתקדמת',
    specifications: {
      engine: 'V8 Biturbo',
      horsepower: 496,
      fuel: 'Hybrid',
      transmission: '9-Speed Automatic',
    },
    status: 'in_stock',
    tags: ['new', 'premium'],
    level: 'premium',
    addons: defaultAddons,
  },
  {
    id: 'car-2',
    name: 'BMW 7 Series 2024',
    brand: 'BMW',
    model: '7 Series',
    year: 2024,
    price: 620000,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    description: 'ביצועים מדהימים עם נוחות מקסימלית',
    specifications: {
      engine: 'V8 TwinPower Turbo',
      horsepower: 523,
      fuel: 'Petrol',
      transmission: '8-Speed Steptronic',
    },
    status: 'in_stock',
    tags: ['new', 'premium'],
    level: 'premium',
    addons: defaultAddons,
  },
  {
    id: 'car-3',
    name: 'Mercedes-Benz E-Class 2024',
    brand: 'Mercedes',
    model: 'E-Class',
    year: 2024,
    price: 380000,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    ],
    description: 'שילוב מושלם בין יוקרה לביצועים',
    specifications: {
      engine: 'I4 Turbo',
      horsepower: 255,
      fuel: 'Hybrid',
      transmission: '9-Speed Automatic',
    },
    status: 'in_stock',
    tags: ['new'],
    level: 'intermediate',
    addons: defaultAddons,
  },
  {
    id: 'car-4',
    name: 'BMW 5 Series 2024',
    brand: 'BMW',
    model: '5 Series',
    year: 2024,
    price: 340000,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    ],
    description: 'רכב מנהלים מוביל עם טכנולוגיה מתקדמת',
    specifications: {
      engine: 'I4 TwinPower Turbo',
      horsepower: 248,
      fuel: 'Petrol',
      transmission: '8-Speed Steptronic',
    },
    status: 'in_stock',
    tags: ['new'],
    level: 'intermediate',
    addons: defaultAddons,
  },
  {
    id: 'car-5',
    name: 'Mercedes-Benz C-Class 2024',
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2024,
    price: 280000,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    ],
    description: 'כניסה לעולם המרצדס עם עיצוב מודרני',
    specifications: {
      engine: 'I4 Turbo',
      horsepower: 204,
      fuel: 'Petrol',
      transmission: '9-Speed Automatic',
    },
    status: 'in_stock',
    tags: ['new'],
    level: 'basic',
    addons: defaultAddons,
  },
  {
    id: 'car-6',
    name: 'BMW 3 Series 2024',
    brand: 'BMW',
    model: '3 Series',
    year: 2024,
    price: 260000,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    ],
    description: 'ביצועים ספורטיביים עם נוחות יומיומית',
    specifications: {
      engine: 'I4 TwinPower Turbo',
      horsepower: 184,
      fuel: 'Petrol',
      transmission: '8-Speed Steptronic',
    },
    status: 'in_stock',
    tags: ['new'],
    level: 'basic',
    addons: defaultAddons,
  },
];

// משתמשים דיפולטיביים
export const defaultUsers: User[] = [
  {
    id: 'user-1',
    username: 'נתנאל',
    password: '123456',
    role: 'business',
    name: 'נתנאל חנוף',
  },
  {
    id: 'user-2',
    username: 'MP',
    password: '2001',
    role: 'admin',
    name: 'מנהל מערכת',
  },
];

// אתחול נתונים אם אין
export const initializeData = (): void => {
  if (typeof window === 'undefined') return;

  const cars = loadCars();
  const users = loadUsers();

  if (cars.length === 0) {
    saveCars(defaultCars);
  }

  if (users.length === 0) {
    saveUsers(defaultUsers);
  }
};