import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { loadSettings, saveSettings } from '../../utils/storage';
import { SiteSettings } from '../../types';

export default function AdminSettings() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: 'Premium Motors',
    marketingText: 'יוקרה, ביצועים, חוויה',
    showPrices: true,
    showStockStatus: true,
  });

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }
    setSettings(loadSettings());
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSave = () => {
    saveSettings(settings);
    toast.success('הגדרות נשמרו בהצלחה!');
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-light">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">הגדרות מערכת</h1>
          <p className="text-gray-600">ערוך הגדרות כלליות של האתר</p>
        </div>

        <Card className="p-6 space-y-6">
          <div>
            <Input
              label="כותרת האתר"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            />
          </div>

          <div>
            <Input
              label="טקסט שיווקי"
              value={settings.marketingText}
              onChange={(e) => setSettings({ ...settings, marketingText: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">הצגת מחירים</label>
              <input
                type="checkbox"
                checked={settings.showPrices}
                onChange={(e) => setSettings({ ...settings, showPrices: e.target.checked })}
                className="w-5 h-5 text-premium-gold rounded focus:ring-premium-gold"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">הצגת סטטוס מלאי</label>
              <input
                type="checkbox"
                checked={settings.showStockStatus}
                onChange={(e) => setSettings({ ...settings, showStockStatus: e.target.checked })}
                className="w-5 h-5 text-premium-gold rounded focus:ring-premium-gold"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSave}>
              שמור הגדרות
            </Button>
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              ביטול
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
