# 📋 מדריך התקנה מלא - רשימת כל השירותים

> **תאריך**: יולי 2026  
> **דרישה**: פתיחת חשבונות כל השירותים במייל האמיתי של הפרויקט

---

## 🔍 סטטוס שירותים לפי הפרויקט

### ✅ שירותים שכבר יש חשבונות (צריך להעביר למייל הפרויקט)

| שירות | סטטוס | פעולה דרושה | יעד |
|------|--------|-----------|------|
| **Supabase** | ✓ פעיל | 🔄 העברה למייל פרויקט | Database, Auth, Storage |
| **Figma** | ✓ פעיל | 🔄 העברה למייל פרויקט | Design files |

### ⏳ שירותים שעדיין לא פתוחים

| שירות | משימה | חשוב |
|------|--------|-------|
| **Vercel** | ✋ לפתוח | גבוה - פרסום האתר |
| **Resend** | ✋ לפתוח | גבוה - שליחת מיילים |
| **Cloudflare** (Turnstile) | ✋ לפתוח | בינוני - הגנה מ-spam |

---

## 📝 שלבים התקנה לפי סדר עדיפויות

### 1️⃣ **SUPABASE** - מסד הנתונים (עדיפות גבוהה)

#### א. יצירת חשבון חדש במייל הפרויקט

```
1. כנס ל- https://supabase.com
2. לחץ "Sign Up" (או "Login" אם יש חשבון)
3. בחר "Sign up with email"
4. הזן את מייל הפרויקט: [מייל אמיתי שלך]
5. אשר את הקוד שנשלח למייל
6. הגדר סיסמה חזקה
7. השלם את פרטי הפרוטיל (שם, חברה וכו')
```

#### ב. יצירת Project חדש

```
1. בדף Supabase - לחץ "New Project"
2. בחר Organization (או צור חדשה עם שם "Merkazot Online")
3. שם הפרויקט: "Merkazot-Online"
4. בחר Region קרוב למשתמשים שלך (Europe - Frankfurt)
5. הגדר סיסמה Database חזקה
6. לחץ "Create new project" וחכה עד שהיא תוקם (~2 דקות)
```

#### ג. קבלת ה-Keys הדרושים

```
1. פתח את הפרויקט החדש
2. לחץ על "Settings" -> "API"
3. תחת "Project API keys" תמצא:
   - "URL" → העתקה ל- NEXT_PUBLIC_SUPABASE_URL
   - "anon public" → העתקה ל- NEXT_PUBLIC_SUPABASE_ANON_KEY
   - "service_role secret" → העתקה ל- SUPABASE_SERVICE_ROLE_KEY ⚠️ סודי!
```

#### ד. הרצת ה-Migrations (בנייה של הטבלאות)

**חשוב מאוד: עשי את זה בסדר הזה!**

```sql
-- שלב 1: הרץ את קובץ ה-init
supabase/migrations/20260426_init.sql

-- שלב 2: אם יש שגיאה "permission denied" - הרץ גם:
supabase/migrations/20260524_api_grants.sql

-- שלב 3: הוסף שדות מלאים לתוכניות:
supabase/migrations/20260525_program_fields.sql

-- שלב 4: הגדר Storage לקבצים:
supabase/migrations/20260526_storage_bucket.sql
```

**איך להריץ את ה-SQL files:**

**אפשרות A - דרך ממשק Supabase (קל):**
```
1. בכרטיסיה Supabase - לחץ על "SQL Editor"
2. לחץ "+ New query"
3. תעתיק את כל תוכן הקובץ הראשון (20260426_init.sql)
4. לחץ "Run"
5. חזור על התהליך לכל קובץ לפי הסדר
```

**אפשרות B - דרך Supabase CLI (מתקדם):**
```bash
# 1. התקנה (רק פעם אחת):
npm install -g supabase

# 2. התחברות:
supabase link --project-ref [your-project-id]

# 3. הרצת migrations:
supabase db push
```

---

### 2️⃣ **VERCEL** - פרסום האתר (עדיוהה)

#### א. יצירת חשבון

```
1. כנס ל- https://vercel.com
2. לחץ "Sign Up"
3. בחר "Continue with GitHub"
4. אם אין לך GitHub - צור חשבון GitHub חדש במייל הפרויקט
5. אשר את ההרשאות
```

#### ב. חיבור ה-Repository

```
1. בדף Vercel - לחץ "Add New..." -> "Project"
2. בחר "Import Git Repository"
3. חברוך את GitHub (אם עוד לא)
4. בחר את ה-Repository של "Malky_Bloom"
5. לחץ "Import"
```

#### ג. הגדרת Environment Variables

```
1. בעמוד ההגדרות של הפרויקט בVercel
2. לחץ "Environment Variables"
3. הוסף כל אחד מהמשתנים מתוך .env.local שלך:

   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY ⚠️
   - RESEND_API_KEY (כשתפתחי Resend)
   - RESEND_FROM_EMAIL
   - SITE_OWNER_EMAIL
   - NEXT_PUBLIC_TURNSTILE_SITE_KEY (כשתפתחי Turnstile)
   - CLOUDFLARE_TURNSTILE_SECRET_KEY (כשתפתחי Turnstile) ⚠️
   - ADMIN_PANEL_PASSWORD
   - NEXT_PUBLIC_SITE_URL

4. לחץ "Save"
```

#### ד. סיום ה-Deploy

```
1. Vercel תתחיל להריץ build אוטומטית
2. חכה עד שהיא תסתיים (~3-5 דקות)
3. לחץ "Visit" וראה את האתר בשידור חי!
```

---

### 3️⃣ **RESEND** - שירות מיילים (עדיפות גבוהה)

#### א. יצירת חשבון

```
1. כנס ל- https://resend.com
2. לחץ "Sign Up"
3. בחר "Sign up with email"
4. הזן את מייל הפרויקט
5. הגדר סיסמה
6. אשר את המייל
```

#### ב. קבלת API Key

```
1. בתפריט - לחץ "API Keys"
2. לחץ "Create API Key"
3. שם: "Merkazot Online Production"
4. סוג: "Production" (בחר)
5. לחץ "Create"
6. העתקה את ה-Key → RESEND_API_KEY
```

#### ג. הגדרת Domain (קריטי!)

```
1. בתפריט - לחץ "Domains"
2. לחץ "Add New Domain"
3. הוסף: merkazotOnline.com (או הדומיין שלך)
4. Resend תתן ל-3 DNS Records להוסיף
5. הוסף אותם לדומיין שלך (אצל ה-provider)
6. חכה עד שResend יאמת (~5-15 דקות)
```

#### ד. התחברה אל הפרויקט

```
.env.local:
RESEND_API_KEY=re_XXXXXXXXXX
RESEND_FROM_EMAIL=noreply@merkazotOnline.com
SITE_OWNER_EMAIL=[מייל אמיתי שלך - לקבלת התראות]
```

---

### 4️⃣ **CLOUDFLARE TURNSTILE** - הגנה מ-Spam (עדינונית)

#### א. יצירת חשבון

```
1. כנס ל- https://dash.cloudflare.com
2. לחץ "Sign Up"
3. בחר "Create account"
4. הוסף אימייל ופסוק חזק
5. אשר את המייל
```

#### ב. יצירת Site Key

```
1. בעמוד Cloudflare - בתפריט לחץ "Turnstile"
2. לחץ "Create Site"
3. שם האתר: "Merkazot Online"
4. דומיין: merkazotOnline.com (או ה-localhost שלך לבדיקה)
5. בחר Mode: "Managed" (מומלץ)
6. לחץ "Create"
7. ה-Keys יופיעו:
   - Site Key → NEXT_PUBLIC_TURNSTILE_SITE_KEY
   - Secret Key → CLOUDFLARE_TURNSTILE_SECRET_KEY ⚠️
```

#### ג. התחברה אל הפרויקט

```
.env.local:
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

---

### 5️⃣ **FIGMA** - העברת Ownership (אם קיימת)

#### אם כבר יש פרויקט Figma:

```
1. כנס ל- https://figma.com
2. עשי login עם החשבון הישן (שלך)
3. בחר את ה-File של "Merkazot Online"
4. לחץ "Menu" (⋯) -> "Sharing settings"
5. שנה את הבעלות:
   - לחץ "Transfer Ownership"
   - בחר את המייל החדש של הפרויקט
6. אשר ב-Email שנשלח למייל החדש
```

---

## 🚀 איך להתקין ה-Environment Variables בפרויקט

### שלב 1: הגדרת קבצי מקומיים (.env.local)

```bash
# בשורת הפקודה (Terminal):
cd c:\Users\משתמש\פרויקט מלכי בלום - מרכזות אונליין\Malky_Bloom
cp .env.example .env.local
```

### שלב 2: מילוי של כל המשתנים

פתח את `.env.local` וملא כל משתנה:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend
RESEND_API_KEY=re_xxxxxx
RESEND_FROM_EMAIL=noreply@merkazotOnline.com
SITE_OWNER_EMAIL=yourrealemail@example.com

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x0000...
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000...

# Admin
ADMIN_PANEL_PASSWORD=MySecurePassword123!

# Website
NEXT_PUBLIC_SITE_URL=https://merkazotOnline.com
```

### שלב 3: הרצת הפרויקט מקומית

```bash
# בטרמינל:
npm install          # התקנת תלויות (רק פעם ראשונה)
npm run dev          # הרצת השרת המקומי
```

**פתח**: `http://localhost:3000`

---

## 🗺️ Checklist סופי - בדקו שהכל מוכן

### לפני שליחה ל-Production:

- [ ] **Supabase**
  - [ ] יצור חשבון חדש במייל הפרויקט
  - [ ] Project נוצר
  - [ ] כל ה-Keys מועתקים ל-.env.local
  - [ ] כל ה-Migrations הורצו בסדר

- [ ] **Vercel**
  - [ ] חשבון יצור
  - [ ] Repository מחובר
  - [ ] כל Environment Variables הוספו
  - [ ] Deploy הצליח

- [ ] **Resend**
  - [ ] חשבון יצור
  - [ ] API Key קיבלנו
  - [ ] Domain מאומת
  - [ ] Keys הוספו ל-Vercel

- [ ] **Turnstile (Cloudflare)**
  - [ ] חשבון יצור
  - [ ] Site Keys קיבלנו
  - [ ] Keys הוספו ל-Vercel

- [ ] **הפרויקט עובד**
  - [ ] `npm run dev` עובד ללא שגיאות
  - [ ] האתר פותח ב-localhost:3000
  - [ ] Vercel Deploy הצליח

---

## ⚠️ טיפים חשובים

1. **שמור את כל ה-Keys במקום בטוח** (נייר, מנהל סיסמאות)
2. **Never commit .env.local** ל-Git! (הוא ב-.gitignore כבר)
3. **Service Role Key סודי** - שמור לעצמך, לא לשיתוף!
4. **תחילת עבודה**: התחל ב-Supabase, ואז Vercel, אחר כך Resend ו-Turnstile
5. **בבדיקה מקומית**: השתמש ב-.env.local עם המשתנים
6. **ב-Production (Vercel)**: הוסף את המשתנים ב-"Environment Variables" של Vercel

---

## 📞 שגיאות נפוצות וכיצד לתקן

### שגיאה: "Missing Supabase public environment variables"
**פתרון**: בדוק שבקובץ .env.local יש את:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### שגיאה: "permission denied" ב-Supabase
**פתרון**: הרץ את `20260524_api_grants.sql`

### שגיאה: Mails לא נשלחים
**פתרון**: בדוק ש:
- RESEND_API_KEY נכון
- Domain מאומת ב-Resend
- RESEND_FROM_EMAIL התחתון ב-Domain המאומת

### שגיאה: Turnstile לא עובד
**פתרון**: בדוק ש-Site Key עבור localhost/דומיין נוסף (אם זה בדיקה מקומית)

---

## 🎯 הצעדים הבאים (אחרי התקנה בסיסית)

1. **בדיקה של כל תוכניות** - ודא שנתונים בעמוד /admin
2. **בדיקה של טפסים** - שלח פנייה בעמוד Contact
3. **בדיקה של מיילים** - בדוק אם קיבלת התראה
4. **Setup Domain** - צור CNAME ב-DNS ל-Vercel
5. **SSL Certificate** - Vercel מוסיף אוטומטית

---

**עדכון אחרון**: יולי 2026
