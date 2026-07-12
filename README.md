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
   - `CRON_SECRET`
4. הרצה:
   - `npm run dev`

## מסד נתונים Supabase

- `NEXT_PUBLIC_SUPABASE_URL` = רק `https://XXXX.supabase.co` **בלי** `/rest/v1`
- יש להריץ את הקובץ: `supabase/migrations/20260426_init.sql`
- אם יש שגיאת `permission denied` — להריץ גם: `supabase/migrations/20260524_api_grants.sql`
- שדות תוכנית מלאים (נושא, קהל יעד, חומרים, תמונות…): `supabase/migrations/20260525_program_fields.sql`
- העלאת קבצים מהמחשב (Storage): `supabase/migrations/20260526_storage_bucket.sql`
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

## Keep-Alive ל-Supabase

- נוסף endpoint מאובטח: `/api/keep-alive`
- נוסף קובץ [vercel.json](vercel.json) שמריץ Vercel Cron כל 3 ימים
- יש להגדיר ב-Vercel משתנה סביבה `CRON_SECRET` עם מחרוזת אקראית ארוכה
- ה-cron קורא ל-Supabase דרך `SUPABASE_SERVICE_ROLE_KEY` ומבצע שאילתה קלה על טבלת `programs`

מטרת המנגנון:
- לשמור על פעילות תקופתית בפרויקט Supabase כדי לצמצם סיכוי להשעיה עקב חוסר פעילות
