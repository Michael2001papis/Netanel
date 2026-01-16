import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { loadCars, saveCars, resetDemo } from '../../utils/storage';
import { Car } from '../../types';
import { Plus, Edit, Trash2, RotateCcw } from 'lucide-react';

export default function AdminCars() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const toast = useToast();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setCars(loadCars());
  }, [isAuthenticated, navigate]);

  const handleDelete = (carId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק רכב זה?')) {
      const updatedCars = cars.filter(car => car.id !== carId);
      setCars(updatedCars);
      saveCars(updatedCars);
      toast.success('רכב נמחק בהצלחה!');
    }
  };

  const handleResetDemo = () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל הנתונים? פעולה זו אינה ניתנת לביטול.')) {
      resetDemo();
      toast.info('הנתונים אופסו. הדף ירענן כעת...');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-light">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">ניהול רכבים</h1>
            <p className="text-gray-600">הוסף, ערוך או מחק רכבים מהקטלוג</p>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <Button variant="danger" onClick={handleResetDemo}>
                <RotateCcw className="w-4 h-4 ml-2" />
                איפוס דמו
              </Button>
            )}
            <Link to="/admin/cars/new">
              <Button variant="primary">
                <Plus className="w-4 h-4 ml-2" />
                הוסף רכב חדש
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {cars.map((car) => (
            <Card key={car.id} className="p-6">
              <div className="flex gap-6">
                <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={car.images[0] || '/placeholder-car.jpg'}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="text-gray-600">{car.brand} {car.model} - {car.year}</p>
                      <p className="text-lg font-semibold text-premium-gold mt-1">
                        ₪{car.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/admin/cars/${car.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 ml-2" />
                          ערוך
                        </Button>
                      </Link>
                      {isAdmin && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(car.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      car.status === 'in_stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {car.status === 'in_stock' ? 'במלאי' : 'אזל'}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                      {car.level === 'basic' ? 'בסיסי' : car.level === 'intermediate' ? 'ביניים' : 'פרימיום'}
                    </span>
                    {car.tags.includes('premium') && (
                      <span className="px-3 py-1 bg-premium-gold/20 text-premium-gold rounded-full text-xs font-semibold">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {cars.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500 mb-4">אין רכבים בקטלוג</p>
            <Link to="/admin/cars/new">
              <Button variant="primary">הוסף רכב ראשון</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
