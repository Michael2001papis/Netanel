import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { loadCars, saveCars } from '../../utils/storage';
import { Car } from '../../types';
import { DollarSign, Edit } from 'lucide-react';

export default function AdminPricing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setCars(loadCars());
  }, [isAuthenticated, navigate]);

  const handleSavePrice = (carId: string) => {
    const updatedCars = cars.map(car => 
      car.id === carId ? { ...car, price: editPrice } : car
    );
    setCars(updatedCars);
    saveCars(updatedCars);
    setEditingCar(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-light">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ניהול מחירים</h1>
          <p className="text-gray-600">ערוך מחירים של רכבים ותוספות</p>
        </div>

        <div className="space-y-4">
          {cars.map((car) => (
            <Card key={car.id} className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{car.name}</h3>
                  <p className="text-gray-600">{car.brand} {car.model}</p>
                </div>
                <div className="flex items-center gap-4">
                  {editingCar === car.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                        className="w-32"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSavePrice(car.id)}
                      >
                        שמור
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCar(null)}
                      >
                        ביטול
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="text-2xl font-bold text-premium-gold">
                        ₪{car.price.toLocaleString()}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCar(car.id);
                          setEditPrice(car.price);
                        }}
                      >
                        <Edit className="w-4 h-4 ml-2" />
                        ערוך
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
