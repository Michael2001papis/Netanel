import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowRight, Shield, Code, FileText, Copyright } from 'lucide-react';

export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-premium-gold/10 rounded-full mb-4">
            <Copyright className="w-8 h-8 text-premium-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            זכויות יוצרים
          </h1>
          <p className="text-gray-600 text-lg">
            הגנה משפטית על הקוד והעיצוב
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Owner Information */}
          <Card className="p-8 border-2 border-premium-gold/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-premium-gold/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-premium-gold" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  בעל זכויות היוצרים
                </h2>
                <p className="text-xl font-semibold text-premium-gold mb-1">
                  מיכאל פפיסמדוב
                </p>
                <p className="text-gray-600 text-sm">
                  מפתח ומעצב האתר
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-gray-700 leading-relaxed">
                © {currentYear} מיכאל פפיסמדוב. כל הזכויות שמורות.
              </p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                האתר, העיצוב, הקוד המקור, הפונקציונליות, והאלמנטים היצירתיים כולם מוגנים על פי חוק זכויות יוצרים.
              </p>
            </div>
          </Card>

          {/* Scope of Protection */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Code className="w-6 h-6 text-premium-gold" />
              היקף ההגנה
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-premium-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900">קוד המקור (Source Code)</p>
                  <p className="text-gray-600 text-sm mt-1">
                    כל קבצי הקוד, הרכיבים, הפונקציות והלוגיקה הטכנית
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-premium-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900">עיצוב ואסתטיקה</p>
                  <p className="text-gray-600 text-sm mt-1">
                    עיצוב ממשק המשתמש, פריסה, צבעים, טיפוגרפיה ואנימציות
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-premium-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900">פונקציונליות ייחודית</p>
                  <p className="text-gray-600 text-sm mt-1">
                    תכונות מותאמות אישית, לוגיקת עסקים ומנגנונים ייחודיים
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-premium-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900">מבנה וארכיטקטורה</p>
                  <p className="text-gray-600 text-sm mt-1">
                    ארגון הקבצים, מבנה הנתונים והתכנון הטכני הכולל
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Important Notice */}
          <Card className="p-8 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  הבהרה חשובה
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">הגנת זכויות יוצרים זו היא טכנית/יצירתית בלבד</strong> ומתייחסת אך ורק לקוד, לעיצוב ולפיתוח של האתר.
                  </p>
                  <p>
                    זכויות היוצרים <strong className="text-gray-900">אינן קשורות לפעילות המסחרית</strong> של Premium Motors, למותג, למוצרים או לשירותים הניתנים על ידי החברה.
                  </p>
                  <p>
                    בעלות על זכויות היוצרים הטכניות/יצירתיות <strong className="text-gray-900">אינה מייצגת בעלות עסקית</strong> או זכויות על הפעילות המסחרית של החברה.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Prohibited Actions */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              פעולות אסורות
            </h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span>העתקה, שכפול או שימוש בקוד המקור ללא אישור מפורש</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span>שינוי, עריכה או התאמה אישית של הקוד ללא רשות</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span>שימוש בעיצוב או באלמנטים ויזואליים לפרויקטים אחרים</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span>הסרת או שינוי הודעות זכויות יוצרים</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span>הפצה, מכירה או העברת הקוד לצדדים שלישיים</span>
              </p>
            </div>
          </Card>

          {/* Contact for Licensing */}
          <Card className="p-8 bg-gradient-to-r from-premium-gold/10 to-transparent border-premium-gold/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              רישיון לשימוש
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              לשימוש בקוד, בעיצוב או באלמנטים אחרים מהאתר, נדרש אישור מפורש בכתב ממיכאל פפיסמדוב.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong className="text-gray-900">אימייל:</strong> dvnka2@gmail.com
              </p>
              <p>
                <strong className="text-gray-900">טלפון:</strong> 050-853-5941
              </p>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" size="lg" className="bg-white">
              <ArrowRight className="w-5 h-5 ml-2" />
              חזור לעמוד הבית
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
