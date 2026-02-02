# Premium Motors - נתנאל חנוף

אתר מכירת מכוניות יוקרתי עם Showroom ללקוחות ו-Admin Panel להנהלה.

**⚠️ שונה מ-Next.js ל-Vite + React Router**

## 🚗 מה הפרויקט?

אתר SPA (Single Page Application) לניהול ומכירת מכוניות יוקרתיות. הפרויקט כולל:

- **Showroom יוקרתי** - חוויית לקוח מקצועית עם קטלוג רכבים, חיפוש ופילטרים
- **Admin Panel** - מערכת ניהול מלאה לרכבים, מחירים ותוספות
- **CEO Dashboard** - סטטיסטיקות ומכירות עבור מנהלים
- **סל קניות** - מערכת מתקדמת עם תוספות והנחות
- **מערכת הנחות** - עם אימות סיסמה והגבלות לפי תפקיד

## 🛠️ טכנולוגיות

- **Vite 5** - Build tool מהיר
- **React 18** - עם TypeScript
- **React Router 6** - ניתוב SPA
- **Tailwind CSS** - לעיצוב יוקרתי
- **Framer Motion** - לאנימציות עדינות
- **Lucide React** - לאייקונים
- **LocalStorage** - לאחסון נתונים (מצב דמו)

## 📦 התקנה והרצה

### דרישות מקדימות
- Node.js 18+ 
- npm או yarn

### שלבים

1. **התקנת חבילות:**
```bash
npm install
```

2. **הרצה מקומית (Development):**
```bash
npm run dev
```

האתר יהיה זמין ב: `http://localhost:5173`

3. **Build לייצור:**
```bash
npm run build
```

4. **Preview של Build:**
```bash
npm run preview
```

## 👥 משתמשים

### משתמש עסקי (CEO)
- **שם משתמש:** `נתנאל`
- **סיסמה:** `123456`
- **הרשאות:** גישה מלאה לאתר + CEO Dashboard, הנחה עד 10%

### מנהל גלובלי
- **שם משתמש:** `MP`
- **סיסמה:** `2001`
- **הרשאות:** גישה מלאה לכל המערכת, הנחה עד 25%, איפוס דמו

## 🌐 פריסה ל-Vercel

הפרויקט מוכן לפריסה ב-Vercel עם Vite:

1. **Push ל-GitHub:**
```bash
git push
```

2. **חיבור ל-Vercel:**
   - לך ל-[vercel.com](https://vercel.com)
   - חבר את ה-repository שלך
   - Vercel יזהה אוטומטית Vite

3. **הגדרות Build ב-Vercel:**
   - **Framework Preset:** `Other` או השאר ריק
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## 📁 מבנה הפרויקט

```
├── src/
│   ├── pages/              # דפי האפליקציה
│   │   ├── Home.tsx
│   │   ├── Catalog.tsx
│   │   ├── Cart.tsx
│   │   └── admin/          # Admin Panel
│   ├── components/         # רכיבי UI
│   │   ├── ui/            # רכיבי UI בסיסיים
│   │   └── Navbar.tsx
│   ├── contexts/          # React Contexts
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── types/             # TypeScript Types
│   ├── utils/             # פונקציות עזר
│   │   ├── storage.ts
│   │   └── data.ts
│   ├── router.tsx         # React Router configuration
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # קבצים סטטיים
├── index.html            # HTML entry
├── vite.config.ts        # Vite configuration
├── package.json
└── tailwind.config.js
```

## 🎨 עיצוב

- **עיצוב יוקרתי** - נקי, מודרני, תחושת פרימיום
- **רספונסיבי מלא** - מותאם למובייל (במיוחד iPhone)
- **אנימציות עדינות** - לא כבדות, חוויה חלקה
- **צבעוניות מותאמת:**
  - זהב (Premium Gold) - לפרימיום
  - כחול כהה (Admin Blue) - ל-Admin Panel
  - סגול (CEO Purple) - ל-CEO Dashboard

## ⚙️ משתני סביבה

הפרויקט לא דורש משתני סביבה כרגע (הכל ב-LocalStorage).

אם תרצה להוסיף API בעתיד, צור `.env.local`:
```env
VITE_API_URL=your_api_url
```

בקוד השתמש ב: `import.meta.env.VITE_API_URL`

## 🐛 פתרון בעיות

### Build נכשל ב-Vercel?
1. וודא ש-**Output Directory** ב-Vercel מוגדר ל-`dist`
2. וודא ש-**Build Command** הוא `npm run build`
3. בדוק את ה-logs ב-Vercel Dashboard

### Vite לא נמצא?
```bash
npm install
```

## 📝 רישיון

פרויקט פרטי - נתנאל חנוף

## 👨‍💻 מפתח

נתנאל חנוף

---

**יוקרה, ביצועים, חוויה** ✨