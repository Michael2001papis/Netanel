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
  const { isAuthenticated, isAdmin, isCEO } = useAuth();
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: 'Premium Motors',
    marketingText: 'יוקרה, ביצועים, חוויה',
    showPrices: true,
    showStockStatus: true,
    showDiscountsManagement: true,
  });

  useEffect(() => {
    if (!isAuthenticated || (!isAdmin && !isCEO)) {
      navigate('/login');
      return;
    }
    setSettings(loadSettings());
  }, [isAuthenticated, isAdmin, isCEO, navigate]);

  const handleSave = () => {
    saveSettings(settings);
    toast.success('הגדרות נשמרו בהצלחה!');
  };

  if (!isAuthenticated || (!isAdmin && !isCEO)) {
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

            {/* הצגת "ניהול הנחות" - נתנאל יכול רק להפעיל, MP יכול גם להפעיל וגם לבטל */}
            {(isAdmin || isCEO) && (
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                <div>
                  <label className="text-sm font-medium">הצגת ניהול הנחות</label>
                  <p className="text-xs text-gray-500 mt-1">
                    {isCEO && !isAdmin 
                      ? 'הצג את הכרטיס "ניהול הנחות" בדף הבית (לא ניתן להסיר)' 
                      : 'הצג/הסתר את הכרטיס "ניהול הנחות" בדף הבית'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showDiscountsManagement !== false}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    // נתנאל יכול רק להפעיל (מ-false ל-true), לא לבטל (מ-true ל-false)
                    if (isCEO && !isAdmin && !newValue && settings.showDiscountsManagement !== false) {
                      toast.error('נתנאל יכול רק להפעיל את הכרטיס, לא להסיר אותו. רק MP יכול להסיר.');
                      return; // לא מאפשרים לבטל לנתנאל
                    }
                    setSettings({ ...settings, showDiscountsManagement: newValue });
                  }}
                  disabled={isCEO && !isAdmin && settings.showDiscountsManagement !== false}
                  className={`w-5 h-5 text-premium-gold rounded focus:ring-premium-gold ${
                    isCEO && !isAdmin && settings.showDiscountsManagement !== false 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                />
              </div>
            )}
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
