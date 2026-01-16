# Premium Motors - נתנאל חנוף

אתר מכירת מכוניות יוקרתי עם Showroom ללקוחות ו-Admin Panel להנהלה.

## 🚗 מה הפרויקט?

אתר SPA (Single Page Application) לניהול ומכירת מכוניות יוקרתיות. הפרויקט כולל:

- **Showroom יוקרתי** - חוויית לקוח מקצועית עם קטלוג רכבים, חיפוש ופילטרים
- **Admin Panel** - מערכת ניהול מלאה לרכבים, מחירים ותוספות
- **CEO Dashboard** - סטטיסטיקות ומכירות עבור מנהלים
- **סל קניות** - מערכת מתקדמת עם תוספות והנחות
- **מערכת הנחות** - עם אימות סיסמה והגבלות לפי תפקיד

## 🛠️ טכנולוגיות

- **Next.js 14** - עם App Router
- **React 18** - עם TypeScript
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

האתר יהיה זמין ב: `http://localhost:3000`

3. **Build לייצור:**
```bash
npm run build
```

4. **הרצה של Build:**
```bash
npm run start
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

## 🎯 תכונות עיקריות

### Showroom (עולם הלקוח)
- ✅ דף בית עם רכבים מומלצים
- ✅ קטלוג מלא עם חיפוש ופילטרים (מותג, מחיר, רמה, סטטוס)
- ✅ דף פרטי רכב עם תמונות, מפרט טכני ותוספות
- ✅ סל קניות עם ניהול תוספות והנחות

### Admin Panel (עולם ההנהלה)
- ✅ **Dashboard** - סטטיסטיקות מלאות (רכבים בסל, הכנסות, ממוצע מחיר, הנחות היום, רכבים מובילים)
- ✅ **ניהול רכבים** - הוספה, עריכה, מחיקה של רכבים
- ✅ **ניהול מחירים** - עריכת מחירי רכבים ותוספות
- ✅ **ניהול הנחות** - צפייה בהיסטוריית כל ההנחות
- ✅ **הגדרות מערכת** - עריכת כותרת האתר, טקסטים שיווקיים (למנהל גלובלי בלבד)

### מערכת הנחות
- ✅ אימות סיסמה (123456)
- ✅ הגבלות לפי תפקיד:
  - משתמש עסקי: עד 10%
  - מנהל גלובלי: עד 25%
- ✅ לוג הנחות מלא עם תאריך, רכב, אחוז ואישור

### LocalStorage Persistence
- ✅ כל הנתונים נשמרים ב-LocalStorage
- ✅ מצב דמו מתקדם
- ✅ כפתור "איפוס דמו" למנהל גלובלי

## 🌐 פריסה ל-Vercel

הפרויקט מוכן לפריסה ב-Vercel:

1. **Push ל-GitHub:**
```bash
git push
```

2. **חיבור ל-Vercel:**
   - לך ל-[vercel.com](https://vercel.com)
   - חבר את ה-repository שלך
   - Vercel יזהה אוטומטית Next.js

3. **הגדרות Build:**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `Next.js default`
   - Install Command: `npm install`

## 📁 מבנה הפרויקט

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Panel
│   ├── catalog/           # קטלוג רכבים
│   ├── cart/              # סל קניות
│   ├── login/             # התחברות
│   └── layout.tsx         # Layout ראשי
├── components/            # רכיבי UI
│   ├── ui/               # רכיבי UI בסיסיים
│   └── Navbar.tsx        # Navigation Bar
├── contexts/             # React Contexts
│   ├── AuthContext.tsx   # אימות משתמשים
│   └── CartContext.tsx   # ניהול סל
├── types/                # TypeScript Types
├── utils/                # פונקציות עזר
│   ├── storage.ts        # LocalStorage
│   └── data.ts           # נתונים ראשוניים
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
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
# דוגמה לעתיד
# NEXT_PUBLIC_API_URL=your_api_url
```

## 🐛 פתרון בעיות

### Build נכשל?
1. וודא שכל החבילות מותקנות: `npm install`
2. נקה את ה-cache: `rm -rf .next` (Windows: `Remove-Item -Recurse -Force .next`)
3. הריץ build מחדש: `npm run build`

### בעיות עם Fonts?
- הפונט Inter לא תומך ב-subset `hebrew`, משתמשים ב-`latin` ו-`latin-ext`

## 📝 רישיון

פרויקט פרטי - נתנאל חנוף

## 👨‍💻 מפתח

נתנאל חנוף

---

**יוקרה, ביצועים, חוויה** ✨