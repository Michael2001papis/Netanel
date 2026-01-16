import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { loadCars } from '../utils/storage';
import { Car } from '../types';
import { Search, Filter, X } from 'lucide-react';

export default function Catalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

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

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
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

      return true;
    });
  }, [cars, searchTerm, selectedBrand, priceRange, selectedLevel, selectedStatus]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setPriceRange([0, maxPrice]);
    setSelectedLevel('');
    setSelectedStatus('');
  };

  const hasActiveFilters = searchTerm || selectedBrand || priceRange[0] > 0 || priceRange[1] < maxPrice || selectedLevel || selectedStatus;

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
          <div className="flex gap-4 flex-wrap">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    טווח מחיר: ₪{priceRange[0].toLocaleString()} - ₪{priceRange[1].toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            נמצאו <span className="font-semibold text-gray-900">{filteredCars.length}</span> רכבים
          </p>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/catalog/${car.id}`}>
                  <Card hover className="overflow-hidden h-full">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img
                      src={car.images[0] || '/placeholder-car.jpg'}
                      alt={car.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {car.tags.includes('premium') && (
                      <span className="absolute top-4 right-4 bg-premium-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Premium
                      </span>
                    )}
                    {car.tags.includes('new') && (
                      <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        חדש
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{car.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{car.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-premium-gold">
                        ₪{car.price.toLocaleString()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        car.status === 'in_stock' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {car.status === 'in_stock' ? 'במלאי' : 'אזל'}
                      </span>
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
    </div>
  );
}
