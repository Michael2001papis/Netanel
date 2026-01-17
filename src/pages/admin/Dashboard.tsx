import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { loadCars, loadDiscountsLog, loadSettings } from '../../utils/storage';
import { SalesStats } from '../../types';
import { TrendingUp, DollarSign, ShoppingCart, Percent, BarChart3, Settings, Car } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isCEO, isAdmin } = useAuth();
  const { cart } = useCart();
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [showDiscountsManagement, setShowDiscountsManagement] = useState(true);
  useDocumentTitle();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const settings = loadSettings();
    setShowDiscountsManagement(settings.showDiscountsManagement !== false); // ברירת מחדל: true
    calculateStats();
  }, [isAuthenticated, cart, navigate]);

  const calculateStats = () => {
    const cars = loadCars();
    const discountsLog = loadDiscountsLog();
    const today = new Date().toISOString().split('T')[0];

    const totalCarsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPotentialRevenue = cart.reduce((sum, item) => {
      const basePrice = item.car.price;
      const addonsPrice = item.selectedAddons.reduce((s, id) => {
        const addon = item.car.addons?.find(a => a.id === id);
        return s + (addon?.price || 0);
      }, 0);
      const subtotal = (basePrice + addonsPrice) * item.quantity;
      if (item.discount) {
        return sum + (subtotal * (1 - item.discount.percentage / 100));
      }
      return sum + subtotal;
    }, 0);

    const averagePricePerCar = totalCarsInCart > 0 ? totalPotentialRevenue / totalCarsInCart : 0;
    const discountsToday = discountsLog.filter(
      log => log.approvedAt.split('T')[0] === today
    ).length;

    // Top selling cars (דמו - לפי כמות בסל)
    const carCounts: Record<string, { name: string; count: number }> = {};
    cart.forEach(item => {
      if (!carCounts[item.car.id]) {
        carCounts[item.car.id] = { name: item.car.name, count: 0 };
      }
      carCounts[item.car.id].count += item.quantity;
    });

    const topSellingCars = Object.entries(carCounts)
      .map(([carId, data]) => ({ 
        carId, 
        carName: data.name, 
        count: data.count 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setStats({
      totalCarsInCart,
      totalPotentialRevenue,
      averagePricePerCar,
      discountsToday,
      topSellingCars,
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-light">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isCEO ? 'CEO Dashboard' : 'Admin Dashboard'}
          </h1>
          <p className="text-gray-600">
            {isCEO ? 'ברוך הבא, נתנאל חנוף' : 'פאנל ניהול מערכת'}
          </p>
        </div>

        {/* סטטיסטיקות */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">רכבים בסל</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCarsInCart}</p>
                </div>
                <ShoppingCart className="w-12 h-12 text-admin-blue opacity-20" />
              </div>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">הכנסות פוטנציאליות</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₪{stats.totalPotentialRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ממוצע מחיר</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₪{Math.round(stats.averagePricePerCar).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-premium-gold opacity-20" />
              </div>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">הנחות היום</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.discountsToday}</p>
                </div>
                <Percent className="w-12 h-12 text-purple-500 opacity-20" />
              </div>
            </Card>
            </motion.div>
          </div>
        )}

        {/* Top Selling Cars */}
        {stats && stats.topSellingCars.length > 0 && (
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                רכבים מובילים
              </h2>
            </div>
            <div className="space-y-3">
              {stats.topSellingCars.map((car, idx) => (
                <div key={car.carId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                    <div>
                      <p className="font-semibold">{car.carName}</p>
                      <p className="text-sm text-gray-600">{car.count} פריטים בסל</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/cars">
            <Card hover className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-admin-blue/10 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-admin-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ניהול רכבים</h3>
                  <p className="text-sm text-gray-600">הוסף, ערוך או מחק רכבים</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/pricing">
            <Card hover className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-premium-gold/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-premium-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ניהול מחירים</h3>
                  <p className="text-sm text-gray-600">ערוך מחירים ותוספות</p>
                </div>
              </div>
            </Card>
          </Link>

          {/* כרטיס "ניהול הנחות" - מוצג רק אם ההגדרה מאפשרת */}
          {showDiscountsManagement && (
            <Link to="/admin/discounts">
              <Card hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Percent className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">ניהול הנחות</h3>
                    <p className="text-sm text-gray-600">צפה בהיסטוריית הנחות</p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin/settings">
              <Card hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">הגדרות מערכת</h3>
                    <p className="text-sm text-gray-600">ערוך הגדרות אתר</p>
                  </div>
                </div>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
