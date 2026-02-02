import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { loadCars, saveCars } from '../../utils/storage';
import { Car } from '../../types';
import { ArrowRight, Save } from 'lucide-react';

export default function AdminEditCar() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<Partial<Car>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const cars = loadCars();
    const foundCar = cars.find(c => c.id === params.id);
    if (foundCar) {
      setCar(foundCar);
      setFormData(foundCar);
    }
  }, [params.id, isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    
    const cars = loadCars();
    const updatedCars = cars.map(c => 
      c.id === car.id ? { ...formData, id: car.id, addons: car.addons } as Car : c
    );
    saveCars(updatedCars);
    navigate('/admin/cars');
  };

  if (!car || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-light">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/cars')}>
            <ArrowRight className="w-4 h-4 ml-2" />
            חזור
          </Button>
          <h1 className="text-4xl font-bold">עריכת רכב</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="שם הרכב"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="מותג"
                value={formData.brand || ''}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />
              <Input
                label="דגם"
                value={formData.model || ''}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />
              <Input
                label="שנה"
                type="number"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
              />
              <Input
                label="מחיר"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">רמה</label>
                <select
                  value={formData.level || 'basic'}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                  required
                >
                  <option value="basic">בסיסי</option>
                  <option value="intermediate">ביניים</option>
                  <option value="premium">פרימיום</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">סטטוס</label>
                <select
                  value={formData.status || 'in_stock'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                  required
                >
                  <option value="in_stock">במלאי</option>
                  <option value="out_of_stock">אזל</option>
                </select>
              </div>
            </div>

            <Input
              label="תיאור"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">תמונות (URLs, אחד בכל שורה)</label>
              <textarea
                value={formData.images?.join('\n') || ''}
                onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n') })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                rows={3}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">מפרט טכני</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="מנוע"
                  value={formData.specifications?.engine || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications!, engine: e.target.value },
                  })}
                  required
                />
                <Input
                  label="כוח סוס"
                  type="number"
                  value={formData.specifications?.horsepower || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications!, horsepower: parseInt(e.target.value) },
                  })}
                  required
                />
                <Input
                  label="דלק"
                  value={formData.specifications?.fuel || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications!, fuel: e.target.value },
                  })}
                  required
                />
                <Input
                  label="תמסורת"
                  value={formData.specifications?.transmission || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications!, transmission: e.target.value },
                  })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary">
                <Save className="w-4 h-4 ml-2" />
                שמור שינויים
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/cars')}>
                ביטול
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
