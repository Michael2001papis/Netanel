import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { ShoppingCart, User, LogOut, Settings, Phone, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactModal } from '../contexts/ContactModalContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isCEO, isAdmin } = useAuth();
  const { cart } = useCart();
  const { openModal } = useContactModal();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // סגירת תפריט מובייל כשמשנים דף
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // סגירת תפריט מובייל ב-Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Navbar אחיד בכל מצב - תמיד Showroom Navbar
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* לוגו ברור */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-10 h-10 bg-premium-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PM</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:inline">Premium Motors</span>
          </Link>
          
          {/* ניווט קצר - דסקטופ */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-base font-medium transition-colors ${
                pathname === '/' ? 'text-premium-gold border-b-2 border-premium-gold pb-1' : 'text-gray-700 hover:text-premium-gold'
              }`}
            >
              בית
            </Link>
            <Link
              to="/catalog"
              className={`text-base font-medium transition-colors ${
                pathname?.startsWith('/catalog') ? 'text-premium-gold border-b-2 border-premium-gold pb-1' : 'text-gray-700 hover:text-premium-gold'
              }`}
            >
              רכבים
            </Link>
            
            {/* כפתור "צור קשר" בולט */}
            <Button 
              variant="primary" 
              className="bg-premium-gold hover:bg-premium-gold/90 text-white px-6"
              onClick={openModal}
            >
              <Phone className="w-4 h-4 ml-2" />
              צור קשר
            </Button>
            
            {/* סל קניות */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-premium-gold transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-premium-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isCEO && (
                  <span className="px-3 py-1 bg-ceo-purple text-white rounded-full text-xs font-semibold">
                    CEO MODE
                  </span>
                )}
                {/* כפתור "פאנל ניהול" - מוצג תמיד אם מחובר, בולט אם נמצא ב-admin */}
                <Link to="/admin/dashboard">
                  <Button 
                    variant={pathname?.startsWith('/admin') ? 'primary' : 'outline'} 
                    size="sm"
                    className={pathname?.startsWith('/admin') ? 'bg-premium-gold hover:bg-premium-gold/90 text-white' : ''}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    פאנל ניהול
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 ml-2" />
                  יציאה
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  <User className="w-4 h-4 ml-2" />
                  התחברות
                </Button>
              </Link>
            )}
          </div>

          {/* כפתור Hamburger - מובייל */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-premium-gold transition-colors"
            aria-label="תפריט"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-premium-gold rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">PM</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Premium Motors</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="סגירה"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-4">
                {/* Links */}
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    pathname === '/'
                      ? 'bg-premium-gold/10 text-premium-gold border-r-4 border-premium-gold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  בית
                </Link>

                <Link
                  to="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    pathname?.startsWith('/catalog')
                      ? 'bg-premium-gold/10 text-premium-gold border-r-4 border-premium-gold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  רכבים
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openModal();
                  }}
                  className="w-full text-right py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-premium-gold" />
                    צור קשר
                  </div>
                </button>

                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors relative ${
                    pathname === '/cart'
                      ? 'bg-premium-gold/10 text-premium-gold border-r-4 border-premium-gold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    סל קניות
                    {cartItemsCount > 0 && (
                      <span className="bg-premium-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      {isCEO && (
                        <div className="px-4 py-2">
                          <span className="px-3 py-1 bg-ceo-purple text-white rounded-full text-xs font-semibold">
                            CEO MODE
                          </span>
                        </div>
                      )}
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          פאנל ניהול
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-right py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="w-5 h-5" />
                          יציאה
                        </div>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        התחברות
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};