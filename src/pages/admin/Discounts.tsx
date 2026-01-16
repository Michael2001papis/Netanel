import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { loadDiscountsLog } from '../../utils/storage';
import { DiscountLog } from '../../types';
import { Percent } from 'lucide-react';

export default function AdminDiscounts() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [logs, setLogs] = useState<DiscountLog[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLogs(loadDiscountsLog());
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-light">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ניהול הנחות</h1>
          <p className="text-gray-600">צפה בהיסטוריית כל ההנחות שבוצעו</p>
        </div>

        <Card className="p-6">
          {logs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4 font-semibold">תאריך</th>
                    <th className="text-right py-3 px-4 font-semibold">רכב</th>
                    <th className="text-right py-3 px-4 font-semibold">אחוז הנחה</th>
                    <th className="text-right py-3 px-4 font-semibold">אושר על ידי</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {new Date(log.approvedAt).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-3 px-4 font-semibold">{log.carName}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                          <Percent className="w-4 h-4" />
                          {log.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4">{log.approvedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Percent className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">אין הנחות שנרשמו עדיין</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
