# Merkazot Online

אתר תדמית + מערכת ניהול לתוכניות, בנוי עם `Next.js`, `TypeScript`, `Tailwind` ו-`Supabase`.

## מה כולל הפרויקט

- אתר ציבורי RTL עם דף בית, תוכניות, פרטי תוכנית, אודות וצור קשר.
- סינון תוכניות לפי קטגוריות.
- טופס פנייה וטופס הרשמה לרשימת תפוצה.
- מסך ניהול (`/admin`) להוספה/מחיקה של תוכניות וקטגוריות.
- API פנימי לניהול + סכמת Supabase עם RLS.

## התקנה מקומית

1. התקנת תלויות:
   - `npm install`
2. יצירת קובץ סביבה:
   - העתקת `.env.example` ל-`.env.local`
3. מילוי משתנים:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PANEL_PASSWORD`
4. הרצה:
   - `npm run dev`

## מסד נתונים Supabase

- יש להריץ את הקובץ: `supabase/migrations/20260426_init.sql`
- הקובץ יוצר טבלאות:
  - `programs`
  - `program_categories`
  - `program_category_links`
  - `program_images`
  - `newsletter_subscribers`
  - `contact_leads`

## דיפלוימנט מומלץ

- Frontend: [Vercel](https://vercel.com)
- Database/Auth/Storage: [Supabase](https://supabase.com)

תהליך:
- לחבר את הריפו ל-Vercel
- להגדיר Environment Variables לפי `.env.example`
- לבצע Deploy
