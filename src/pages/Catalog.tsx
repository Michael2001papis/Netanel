import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BrandText } from '../components/BrandText';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { loadCars } from '../utils/storage';
import { Car } from '../types';
import { Search, Filter, X, Calendar, Gauge, Zap, ArrowUpDown, ArrowUp, ArrowDown, Percent } from 'lucide-react';

export default function Catalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  useEffect(() => {
    setCars(loadCars());
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];
    return uniqueBrands;
  }, [cars]);

  const maxPrice = useMemo(() => {
    return Math.max(...cars.map(car => car.price), 0);
  }, [cars]);

  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  const filteredAndSortedCars = useMemo(() => {
    // סינון רכבים
    let filtered = cars.filter(car => {
      // חיפוש
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          car.name.toLowerCase().includes(term) ||
          car.brand.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term) ||
          car.description.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      // מותג
      if (selectedBrand && car.brand !== selectedBrand) return false;

      // מחיר
      if (car.price < priceRange[0] || car.price > priceRange[1]) return false;

      // רמה
      if (selectedLevel && car.level !== selectedLevel) return false;

      // סטטוס
      if (selectedStatus) {
        if (selectedStatus === 'in_stock' && car.status !== 'in_stock') return false;
        if (selectedStatus === 'out_of_stock' && car.status !== 'out_of_stock') return false;
      }

      // הנחה
      if (selectedDiscount) {
        if (selectedDiscount === 'with_discount' && !car.discount) return false;
        if (selectedDiscount === 'without_discount' && car.discount) return false;
      }

      return true;
    });

    // מיון לפי מחיר
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [cars, searchTerm, selectedBrand, priceRange, selectedLevel, selectedStatus, selectedDiscount, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setPriceRange([0, maxPrice]);
    setSelectedLevel('');
    setSelectedStatus('');
    setSelectedDiscount('');
    setSortBy('default');
  };

  const hasActiveFilters = searchTerm || selectedBrand || priceRange[0] > 0 || priceRange[1] < maxPrice || selectedLevel || selectedStatus || selectedDiscount || sortBy !== 'default';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">קטלוג רכבים</h1>
          <p className="text-gray-600">גלה את אוסף הרכבים היוקרתיים שלנו</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="חפש לפי שם, מותג, דגם..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {/* סדר לפי מחיר */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-premium-gold min-w-[180px]"
              >
                <option value="default">סדר לפי: ברירת מחדל</option>
                <option value="price-asc">מחיר: נמוך לגבוה</option>
                <option value="price-desc">מחיר: גבוה לנמוך</option>
              </select>
            </div>

            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 ml-2" />
              פילטרים
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={resetFilters}>
                <X className="w-4 h-4 ml-2" />
                נקה פילטרים
              </Button>
            )}
          </div>

          {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">מותג</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-premium-gold"
                  >
                    <option value="">כל המותגים</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">רמה</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-premium-gold"
                  >
                    <option value="">כל הרמות</option>
                    <option value="basic">בסיסי</option>
                    <option value="intermediate">ביניים</option>
                    <option value="premium">פרימיום</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">סטטוס</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-premium-gold"
                  >
                    <option value="">הכל</option>
                    <option value="in_stock">במלאי</option>
                    <option value="out_of_stock">אזל</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">הנחה</label>
                  <select
                    value={selectedDiscount}
                    onChange={(e) => setSelectedDiscount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-premium-gold"
                  >
                    <option value="">הכל</option>
                    <option value="with_discount">עם הנחה</option>
                    <option value="without_discount">ללא הנחה</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    טווח מחיר
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>₪{priceRange[0].toLocaleString()}</span>
                      <span>₪{priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-premium-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            נמצאו <span className="font-semibold text-gray-900">{filteredAndSortedCars.length}</span> רכבים
          </p>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4 ml-1" />
              נקה הכל
            </Button>
          )}
        </div>

        {/* Cars Grid */}
        {filteredAndSortedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/catalog/${car.id}`}>
                  <Card className="overflow-hidden h-full bg-white border border-gray-200 hover:border-premium-gold/30 hover:shadow-xl transition-all duration-300">
                    {/* תמונה - אחידות מלאה */}
                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                      <img
                        src={car.images[0] || '/placeholder-car.jpg'}
                        alt={car.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Overlay עם "לפרטים" על hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white text-lg font-semibold tracking-wide">
                          לפרטים
                        </span>
                      </div>

                      {/* תג Premium עדין (רק אם יש) */}
                      {car.tags.includes('premium') && (
                        <span className="absolute top-3 right-3 bg-premium-gold/90 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-medium">
                          Premium
                        </span>
                      )}

                      {/* הנחה - בולט על הכרטיס */}
                      {car.discount && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1">
                          <Percent className="w-4 h-4" />
                          {car.discount.percentage}% הנחה
                        </span>
                      )}

                      {/* סטטוס עדין */}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-medium backdrop-blur-sm ${
                        car.status === 'in_stock' 
                          ? 'bg-white/90 text-gray-700' 
                          : 'bg-gray-800/80 text-white'
                      }`}>
                        {car.status === 'in_stock' ? 'במלאי' : 'אזל'}
                      </span>
                    </div>

                    {/* תוכן כרטיס */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-1">
                        {car.name}
                      </h3>

                      {/* מידע שימושי: שנה, מנוע, כ"ס */}
                      <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Gauge className="w-4 h-4 text-gray-400" />
                          <span>{car.specifications.engine}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-gray-400" />
                          <span>{car.specifications.horsepower} כ"ס</span>
                        </div>
                      </div>

                      {/* מחיר - זהב עדין ובולט - עם overflow protection */}
                      <div className="pt-4 border-t border-gray-100 min-w-0">
                        {car.discount ? (
                          <div className="space-y-1">
                            <div className="flex items-baseline justify-between gap-2 min-w-0">
                              <span className="text-2xl font-bold text-red-500 truncate min-w-0 flex-shrink">
                                ₪{Math.round(car.price * (1 - car.discount.percentage / 100)).toLocaleString()}
                              </span>
                              <span className="text-base font-medium text-red-500 whitespace-nowrap flex-shrink-0">
                                עם הנחה
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2 min-w-0">
                              <span className="text-sm text-gray-500 line-through truncate min-w-0 flex-shrink">
                                ₪{car.price.toLocaleString()}
                              </span>
                              <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                                חסכון של {car.discount.percentage}%
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-baseline justify-between gap-2 min-w-0">
                            <span className="text-2xl font-bold text-gray-900 truncate min-w-0 flex-shrink">
                              ₪{car.price.toLocaleString()}
                            </span>
                            <span className="text-base font-medium text-premium-gold whitespace-nowrap flex-shrink-0">
                              החל מ-
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">לא נמצאו רכבים תואמים</p>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              נקה פילטרים
            </Button>
          </Card>
        )}
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
