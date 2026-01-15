'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { loadCars } from '@/utils/storage';
import { Car } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  useEffect(() => {
    const cars = loadCars();
    setFeaturedCars(cars.filter(car => car.level === 'premium').slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-premium-gold/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6">
            Premium Motors
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            יוקרה, ביצועים, חוויה
          </p>
          <Link href="/catalog">
            <Button size="lg" variant="primary">
              גלה את הקטלוג
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            רכבים מומלצים
          </h2>
          
          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <Link key={car.id} href={`/catalog/${car.id}`}>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">אין רכבים זמינים כרגע</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button variant="outline" size="lg">
                צפה בכל הקטלוג
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-premium-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-premium-gold font-bold text-xl mb-2">Premium Motors</p>
          <p className="text-gray-400">יוקרה, ביצועים, חוויה</p>
        </div>
      </footer>
    </div>
  );
}