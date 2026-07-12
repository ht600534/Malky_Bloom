# ✅ רשימת בדיקה - פתיחת חשבונות לפרויקט

## 📊 סטטוס כולל

**מייל הפרויקט**: `[הוזן כאן את המייל הנכון שלך]`

---

## 🔹 שירותים עדיפות **גבוהה** (דרוש מיד)

### 1. SUPABASE - מסד נתונים
- [ ] יצור חשבון חדש: https://supabase.com
- [ ] יצור Project חדש בשם "Merkazot-Online"
- [ ] העתקת NEXT_PUBLIC_SUPABASE_URL
- [ ] העתקת NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] העתקת SUPABASE_SERVICE_ROLE_KEY
- [ ] הרץ migration: `20260426_init.sql`
- [ ] הרץ migration: `20260524_api_grants.sql` (אם יש שגיאה)
- [ ] הרץ migration: `20260525_program_fields.sql`
- [ ] הרץ migration: `20260526_storage_bucket.sql`

### 2. VERCEL - פרסום האתר
- [ ] יצור חשבון: https://vercel.com
- [ ] התחבר עם GitHub (במייל הפרויקט)
- [ ] חבר את ה-Repository: Malky_Bloom
- [ ] הוסף את כל Environment Variables
- [ ] בדוק שה-Deploy הצליח
- [ ] בדוק שהאתר פותח ב-Vercel URL

### 3. RESEND - שירות מיילים
- [ ] יצור חשבון: https://resend.com
- [ ] קבל API Key
- [ ] הוסף Domain: merkazotOnline.com
- [ ] אמת את DNS Records
- [ ] העתקת RESEND_API_KEY
- [ ] בדוק ש-RESEND_FROM_EMAIL נכון
- [ ] בדוק ש-SITE_OWNER_EMAIL הוא הפרטי שלך

---

## 🟡 שירותים עדיפות **בינונית**

### 4. CLOUDFLARE - CAPTCHA (Turnstile)
- [ ] יצור חשבון: https://dash.cloudflare.com
- [ ] צור "Turnstile Site"
- [ ] העתקת NEXT_PUBLIC_TURNSTILE_SITE_KEY
- [ ] העתקת CLOUDFLARE_TURNSTILE_SECRET_KEY
- [ ] בדוק ש-Turnstile עובד בטוקס

---

## 🟢 שירותים עדיפות **נמוכה** (אם קיים)

### 5. FIGMA - עיצוב (הוא זה שקיים)
- [ ] התחברות למייל הישן שלך
- [ ] העברת Ownership ל-Figma file
- [ ] אשר את ההעברה במייל החדש

---

## 🔧 התקנה בפרויקט

### בקובץ .env.local
```
1. [ ] NEXT_PUBLIC_SUPABASE_URL
2. [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
3. [ ] SUPABASE_SERVICE_ROLE_KEY
4. [ ] RESEND_API_KEY
5. [ ] RESEND_FROM_EMAIL
6. [ ] SITE_OWNER_EMAIL
7. [ ] NEXT_PUBLIC_TURNSTILE_SITE_KEY
8. [ ] CLOUDFLARE_TURNSTILE_SECRET_KEY
9. [ ] ADMIN_PANEL_PASSWORD
10. [ ] NEXT_PUBLIC_SITE_URL
```

### בVercel Environment Variables
```
1. [ ] NEXT_PUBLIC_SUPABASE_URL
2. [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
3. [ ] SUPABASE_SERVICE_ROLE_KEY
4. [ ] RESEND_API_KEY
5. [ ] RESEND_FROM_EMAIL
6. [ ] SITE_OWNER_EMAIL
7. [ ] NEXT_PUBLIC_TURNSTILE_SITE_KEY
8. [ ] CLOUDFLARE_TURNSTILE_SECRET_KEY
9. [ ] ADMIN_PANEL_PASSWORD
10. [ ] NEXT_PUBLIC_SITE_URL
```

---

## ✨ בדיקות סיום

### באתר מקומי (localhost:3000)
- [ ] `npm install` עובד
- [ ] `npm run dev` עובד ללא שגיאות
- [ ] דף הבית נפתח
- [ ] תוכניות נטענות מ-Supabase
- [ ] טופס "צור קשר" עובד
- [ ] Turnstile מופיע בטופס
- [ ] המייל נשלח (בדוק ב-SITE_OWNER_EMAIL)

### באתר ה-Vercel
- [ ] URL של הפרויקט פתוח
- [ ] דף הבית נפתח
- [ ] תוכניות נטענות
- [ ] טופסים שולחים מיילים

---

## 📝 הערות וקישורים

### דרך שלב אחר שלב - ראה:
📌 **[SETUP_SERVICES_GUIDE.md](SETUP_SERVICES_GUIDE.md)** - מדריך מלא עם הוראות מפורטות

### חשבונות (שמור לעצמך!)
```
Supabase:    [URL] [Username] [Password]
Vercel:      [URL] [Email] [Password]
Resend:      [URL] [API Key]
Cloudflare:  [URL] [Email] [Password]
GitHub:      [URL] [Email] [Password]
```

---

## 🚀 סיום התקנה

כשסיימת כל הבדיקות - **האתר מוכן ל-Production!** 🎉

**טבעות תרמוזים**: התחל בסדר העדיפויות (גבוה → בינוני)
