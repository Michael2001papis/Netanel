import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { loadCars, saveCars, saveDiscountsLog, loadDiscountsLog } from '../../utils/storage';
import { Car } from '../../types';
import { DollarSign, Edit, Percent, X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function AdminPricing() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editingDiscount, setEditingDiscount] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

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
    toast.success('מחיר עודכן בהצלחה!');
  };

  const handleSaveDiscount = (carId: string) => {
    if (discountPercentage <= 0 || discountPercentage > 100) {
      toast.error('אחוז הנחה חייב להיות בין 1 ל-100');
      return;
    }

    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const updatedCars = cars.map(c => 
      c.id === carId ? { 
        ...c, 
        discount: {
          percentage: discountPercentage,
          createdAt: new Date().toISOString(),
          createdBy: user?.username || 'Unknown'
        }
      } : c
    );
    setCars(updatedCars);
    saveCars(updatedCars);

    // שמירה בלוג הנחות
    const logs = loadDiscountsLog();
    logs.push({
      id: `discount-${Date.now()}`,
      carId: carId,
      carName: car.name,
      percentage: discountPercentage,
      approvedBy: user?.username || 'Unknown',
      approvedAt: new Date().toISOString(),
    });
    saveDiscountsLog(logs);

    setEditingDiscount(null);
    setDiscountPercentage(0);
    toast.success(`הנחה של ${discountPercentage}% הוגדרה בהצלחה!`);
  };

  const handleRemoveDiscount = (carId: string) => {
    const updatedCars = cars.map(c => 
      c.id === carId ? { ...c, discount: undefined } : c
    );
    setCars(updatedCars);
    saveCars(updatedCars);
    toast.success('הנחה הוסרה בהצלחה!');
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
              <div className="space-y-4">
                {/* שורת מחיר */}
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
                        <div className="text-right">
                          <span className="text-2xl font-bold text-premium-gold block">
                            ₪{car.price.toLocaleString()}
                          </span>
                          {car.discount && (
                            <span className="text-sm text-red-500 font-semibold">
                              עם הנחה: ₪{Math.round(car.price * (1 - car.discount.percentage / 100)).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingCar(car.id);
                            setEditPrice(car.price);
                          }}
                        >
                          <Edit className="w-4 h-4 ml-2" />
                          ערוך מחיר
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* שורת הנחה */}
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">הנחה על הרכב</p>
                    {car.discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-500">
                          {car.discount.percentage}% הנחה
                        </span>
                        <span className="text-xs text-gray-500">
                          נוצרה ב-{new Date(car.discount.createdAt).toLocaleDateString('he-IL')}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">אין הנחה פעילה</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editingDiscount === car.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          placeholder="אחוז"
                          value={discountPercentage}
                          onChange={(e) => setDiscountPercentage(parseInt(e.target.value) || 0)}
                          className="w-24"
                        />
                        <span className="text-gray-600">%</span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSaveDiscount(car.id)}
                        >
                          שמור
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingDiscount(null);
                            setDiscountPercentage(0);
                          }}
                        >
                          ביטול
                        </Button>
                      </div>
                    ) : (
                      <>
                        {car.discount && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDiscount(car.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4 ml-2" />
                            הסר הנחה
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingDiscount(car.id);
                            setDiscountPercentage(car.discount?.percentage || 0);
                          }}
                        >
                          <Percent className="w-4 h-4 ml-2" />
                          {car.discount ? 'ערוך הנחה' : 'הוסף הנחה'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
