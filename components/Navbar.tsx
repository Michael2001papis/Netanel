'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { Button } from './ui/Button';
import { ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isCEO, isAdmin } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isAdminRoute = pathname?.startsWith('/admin');

  // במידה ואנחנו ב-Admin Panel, נציג נאב אחר
  if (isAdminRoute && isAuthenticated) {
    return (
      <nav className="bg-admin-dark text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-xl font-bold">
                Admin Panel
              </Link>
              {isCEO && (
                <span className="px-3 py-1 bg-ceo-purple rounded-full text-xs font-semibold">
                  CEO MODE
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <Settings className="w-4 h-4 ml-2" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-white hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 ml-2" />
                יציאה
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Showroom Navbar
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold text-premium-gold">
            Premium Motors
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-premium-gold' : 'text-gray-700 hover:text-premium-gold'
              }`}
            >
              בית
            </Link>
            <Link
              href="/catalog"
              className={`text-sm font-medium transition-colors ${
                pathname === '/catalog' ? 'text-premium-gold' : 'text-gray-700 hover:text-premium-gold'
              }`}
            >
              קטלוג
            </Link>
            <Link
              href="/cart"
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
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 ml-2" />
                    פאנל ניהול
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  יציאה
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  <User className="w-4 h-4 ml-2" />
                  התחברות
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};