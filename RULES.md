# 📋 AI Development Rules - Weight Loss Course System

## 🎯 מטרת המערכת
מערכת קורסים לירידה במשקל מבוססת 100% AI - Mobile First, RTL, עם תמיכה בכל סוגי התוכן (וידאו, אודיו, PDF, טקסט).

---

## 🏗️ ארכיטקטורה - חובה לעקוב

### Stack טכנולוגי
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui + Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Storage**: Uploadthing (אודיו, PDF, מצגות)
- **Video**: URL מודולרי (Bunny/HeyGen/YouTube) - שדות מוכנים ב-DB
- **Auth**: Supabase Auth (JWT)

### עקרונות AI-Ready
1. **שמות ברורים באנגלית** - כל טבלה ועמודה חייבת להיות עם שם תיאורי
2. **טיפוסים TypeScript מלאים** - אין `any`!
3. **קומפוננטות מודולריות** - props ברורים ותיעוד
4. **Server Actions מופרדות** - לוגיקה ברורה ב-lib/actions
5. **קונפיגורציה מרוכזת** - כל השינויים במקום אחד

---

## 🎨 עיצוב - חוקים מחייבים

### Mobile First - אבסולוטי
- **קודם כל נייד**: כל קומפוננטה חייבת לעבוד מושלם בטלפון
- **רק אחרי זה desktop**: התאמה למחשב נמוכה בpriority
- **רגישות מלאה**: כל דף חייב להיראות כמו אפליקציה מקצועית

### עיצוב פרימיום צבעוני
```
ראשי: ורוד-סגול #d946ef (primary-500)
משני: כתום חמים #f97316 (secondary-500)
הצלחה: ירוק #22c55e (success)
רקע: אפור בהיר #fafafa
טקסט: אפור כהה #111827
```

### אלמנטים חובה
- **כרטיסיות**: `rounded-2xl`, `shadow-lg`, גרדיאנטים עדינים
- **כפתורים**: `rounded-full`, גרדיאנטים, אנימציית לחיצה
- **חוצצים**: `divide-y` עם צבעים עדינים
- **עיגול פינות**: בכל מקום אפשר
- **אייקונים**: Lucide React + אימוג'י טקסטואליים 🎯✨🎉

### אנימציות (Framer Motion)
- מעברי דף חלקים
- stagger animation לכרטיסיות
- micro-interactions על כפתורים
- hover effects

---

## 📱 RTL - תמיכה מלאה בעברית

### חובה בכל קובץ
```tsx
<html lang="he" dir="rtl">
```

### טיפוגרפיה עברית
```css
font-family: 'Varela Round', 'Rubik', sans-serif;
```

### כיווניות
- padding/margin: `pr-` (padding-right) לפני `pl-`
- flex: `items-start` עם `text-right`
- icons: אם יש אייקון בצד של טקסט, הוא צריך להיות בצד ימין ב-RTL

---

## 🗄️ בסיס נתונים - חוקים

### Storage Strategy
| סוג קובץ | שירות | הסיבה |
|----------|-------|-------|
| טקסט + לינקים | Supabase DB | Native, מהיר |
| אודיו | Uploadthing | CDN מהיר |
| PDF | Uploadthing | Viewer מובנה |
| מצגות | Uploadthing | PDF conversion |
| וידאו | URL ב-DB | מודולרי - Bunny/HeyGen/YouTube |

### טבלאות חובה
1. **profiles** - הרחבה של Supabase Auth
2. **courses** - קורסים
3. **lessons** - שיעורים
4. **media_files** - קבצי Uploadthing + URL וידאו
5. **enrollments** - רישום משתמשים
6. **lesson_progress** - מעקב התקדמות

### אבטחה - RLS Policies
- כל טבלה חייבת RLS policy
- משתמש רואה רק את הנתונים שלו
- admin רואה הכל
- מעדכן רק את הנתונים שלו

---

## 🔐 אבטחה - שכבות הגנה

### 1. Database Level
- RLS Policies על כל טבלה
- Foreign keys עם ON DELETE CASCADE
- Input validation ב-DB

### 2. Middleware Level
- Route protection ב-Next.js middleware
- JWT token validation
- Role checking ל-admin routes

### 3. Application Level
- Zod validation לכל input
- Rate limiting על API
- CSRF protection
- CSP headers

---

## 📡 API - מוכן לאפליקצייה עתידית

### API Routes שחייבים להיות
```
/api/v1/auth/login     # POST
/api/v1/auth/register  # POST
/api/v1/auth/refresh   # POST
/api/v1/auth/logout    # POST

/api/v1/courses              # GET (list)
/api/v1/courses/[id]         # GET (detail)
/api/v1/courses/[id]/lessons # GET

/api/v1/lessons/[id]              # GET
/api/v1/lessons/[id]/progress      # POST
/api/v1/lessons/[id]/complete      # POST

/api/v1/progress             # GET
/api/v1/user                 # GET, PATCH
```

### Authentication
- Bearer token: `Authorization: Bearer <jwt>`
- Refresh token rotation
- Token expiry handling

---

## 🔌 Video Modular System

### שדות בטבלה media_files
```sql
video_provider: 'bunny' | 'heygen' | 'youtube' | 'vimeo' | 'custom'
video_external_id: string  -- ID הסרטון בספק
video_external_url: string -- URL ישיר (ל-custom)
```

### פונקציית getVideoPlayerUrl
```typescript
function getVideoPlayerUrl(config: VideoConfig): string {
  switch (config.provider) {
    case 'bunny':
      return `https://iframe.mediadelivery.net/embed/${config.externalId}`;
    case 'heygen':
      return `https://app.heygen.com/share/${config.externalId}`;
    case 'youtube':
      return `https://www.youtube.com/embed/${config.externalId}`;
    // ...
  }
}
```

---

## 🎓 מערכת קורסים - דרישות

### דף קורס (Course Detail)
- תמונת רקע/Thumbnail
- רשימת שיעורים (TikTok-style vertical scroll או Grid)
- התקדמות כוללת
- כפתור "התחל/המשך"

### דף שיעור (Lesson Detail)
- **כל סוגי התוכן**:
  - וידאו: Player עם controls
  - אודיו: Waveform + controls
  - PDF: Viewer מובנה
  - טקסט: Typography נקי
  - תמונות: Gallery
- **משימות**: Checklist אינטראקטיבי
- **הרגלים**: Tracker יומי
- **ניווט**: קודם/הבא

### מעקב התקדמות
- Progress bar לכל קורס
- סטטיסטיקות אישיות
- סטריק יומי 🔥
- הישגים 🏅

---

## 🛡️ Admin Panel - נפרד!

### מבנה
- תיקייה נפרדת: `apps/admin`
- מוכן להיות שרת נפרד בעתיד
- API endpoints משלו

### יכולות
- ניהול קורסים (CRUD)
- ניהול שיעורים (CRUD)
- העלאת קבצים ל-Uploadthing
- צפייה בהתקדמות משתמשים
- ניהול הרשאות

---

## 🔍 SEO - חובה

### Metadata בכל עמוד
```tsx
export const metadata: Metadata = {
  title: 'כותרת בעברית | WeightLossAI',
  description: 'תיאור בעברית',
  keywords: ['מילה1', 'מילה2'],
  openGraph: {
    title: '...',
    description: '...',
    locale: 'he_IL',
  },
};
```

### Open Graph
- תמונה (1200x630)
- כותרת בעברית
- תיאור בעברית

### Technical SEO
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Structured data (JSON-LD)

---

## ⚡ ביצועים

### חובה
- Lighthouse 90+ בכל הקטגוריות
- Images: next/image עם optimization
- Fonts: next/font או preload
- Code splitting אוטומטי (Next.js)

### מומלץ
- Lazy loading לתמונות
- Virtual scrolling לרשימות ארוכות
- Caching ב-Supabase

---

## 🧪 בדיקות

### לפני push
- [ ] TypeScript strict - אין errors
- [ ] ESLint - אין warnings
- [ ] Build עובר בהצלחה
- [ ] Responsive בטלפון
- [ ] RTL תקין
- [ ] אנימציות חלקות (60fps)

---

## 📝 Naming Conventions

### קבצים
- Components: `PascalCase.tsx` (CourseCard.tsx)
- Utils: `camelCase.ts` (cn.ts, formatters.ts)
- Pages: `page.tsx`, `layout.tsx` (Next.js convention)
- API: `route.ts`

### Database
- Tables: snake_case, רבים (courses, lessons)
- Columns: snake_case (created_at, is_published)
- Primary key: `id` (UUID)
- Foreign keys: `{table}_id` (course_id)

### TypeScript
- Interfaces: PascalCase (CourseProps)
- Types: PascalCase (VideoProvider, LessonType)
- Enums: PascalCase
- Generics: T, K, V

### CSS/Tailwind
- Custom classes: `kebab-case` (btn-primary, card-premium)
- משתני צבע ב-tailwind.config: camelCase

---

## 🤝 איך לעבוד עם הקוד הזה

### כשמוסיפים feature חדש
1. בדוק את `AI_CONTEXT.md` - מבנה הפרויקט
2. בדוק את `RULES.md` - החוקים
3. השתמש בקומפוננטות הקיימות
4. עקוב אחרי ה-conventions
5. בדוק RTL
6. בדוק Mobile

### כשעורכים קוד קיים
- שמור על סגנון קיים
- אל תשנה naming conventions
- אל תוריד אנימציות
- אל תוריד RTL
- עדכן את `AI_CONTEXT.md` אם צריך

---

## 🚨 דברים שאסור לעשות

❌ **אסור**:
- להשתמש ב-`any` ב-TypeScript
- לוותר על RLS policies
- לוותר על RTL
- לעצב קודם למחשב ואז לנייד
- להשתמש בצבעים לא מהפלטה
- להוריד אנימציות למיטוב ביצועים
- ליצור קומפוננטות בלי props types

✅ **חובה**:
- Mobile First תמיד
- RTL תמיד
- אנימציות חלקות
- צבעים צבעוניים ושמחים
- שפה קלילה וחברית
- אימוג'ים בהתאם

---

## 🎨 רשימת צבעים מדויקת

```typescript
// tailwind.config.ts
primary: {
  50: '#fdf4ff',   // רקע בהיר
  100: '#fae8ff',  // hover states
  200: '#f5d0fe',  // borders
  300: '#f0abfc',  // accents
  400: '#e879f9',  // light buttons
  500: '#d946ef',  // MAIN COLOR
  600: '#c026d3',  // hover
  700: '#a21caf',  // dark
  800: '#86198f',
  900: '#701a75',
},
secondary: {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',  // MAIN SECONDARY
  600: '#ea580c',
},
success: {
  light: '#86efac',
  DEFAULT: '#22c55e',
  dark: '#15803d',
}
```

---

**נכתב עבור**: מערכת קורסים לירידה במשקל - AI Powered
**תאריך**: מאי 2026
**גרסה**: 1.0
