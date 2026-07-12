# 📊 מדריך Supabase - צעד אחר צעד

## שלב 1: יצירת חשבון Supabase

```
1. כנס ל- https://supabase.com
2. לחץ "Sign Up" (כחול)
3. בחר "Sign up with email"
4. הזן: [מייל אמיתי של הפרויקט]
5. הגדר סיסמה חזקה (לפחות 12 תווים)
6. לחץ "Sign up"
7. בדוק את ה-Email וקבל את קוד הבדיקה
8. הזן את הקוד ב-Supabase
```

---

## שלב 2: יצירת Project

```
בדף Supabase:
1. לחץ "New Project" (כפתור ירוק)
2. בחר Organization:
   - אם זה הראשון: "Create organization"
   - שם: "Merkazot Online"
3. שם הפרויקט: "Merkazot-Online" 
4. בחר Database Password (זכור אותו!)
5. בחר Region: "Europe - Frankfurt" (קרוב ביותר)
6. לחץ "Create new project"
7. חכה עד שהמדינה יוקם (~2 דקות)
```

---

## שלב 3: קבלת API Keys

```
בפרויקט Supabase שנוצר:

1. בתפריט משמאל - לחץ "Settings" ⚙️
2. לחץ על "API" (בתת-תפריט)
3. תחת "Project API keys" תראה:

   🔵 URL
   ├─ ערך: https://your-project-ref.supabase.co
   └─ ← העתוק לקובץ .env.local ב- NEXT_PUBLIC_SUPABASE_URL

   🟢 anon public
   ├─ ערך: eyJhbGciOiJIUzI1NiIsInR5c...
   └─ ← העתוק לקובץ .env.local ב- NEXT_PUBLIC_SUPABASE_ANON_KEY

   🔴 service_role secret ⚠️ סודי!
   ├─ ערך: eyJhbGciOiJIUzI1NiIsInR5c... (ארוך יותר)
   └─ ← העתוק לקובץ .env.local ב- SUPABASE_SERVICE_ROLE_KEY

4. בדוק: תחתון לתיקייה המקומית
   c:\Users\משתמש\פרויקט מלכי בלום - מרכזות אונליין\Malky_Bloom\.env.local
```

---

## שלב 4: הרצת SQL Migrations

### ⚠️ **חשוב: סדר כזה בדיוק!**

### **Option A: דרך ממשק Supabase (קל וביטוח)**

```
1. בפרויקט Supabase - תפריט משמאל
2. לחץ "SQL Editor" 
3. לחץ "+ New Query" (ירוק כחול)
```

#### **Migration 1: 20260426_init.sql** (הראשון - חובה!)
```
1. פתח קובץ: supabase/migrations/20260426_init.sql
2. תעתיק את כל התוכן
3. בדף Supabase - הדבק את הקוד בעורך
4. לחץ "Run" (או Ctrl+Enter)
5. חכה עד "Completed" ✅
```

#### **Migration 2: 20260524_api_grants.sql** (אם שגיאה!)
```
אם ראית שגיאה "permission denied" ב-Migration 1:
1. קוד חדש: "+ New Query"
2. פתח וקובץ: supabase/migrations/20260524_api_grants.sql
3. תעתיק > הדבק > Run
```

#### **Migration 3: 20260525_program_fields.sql** (שדות תוכנית)
```
1. "+ New Query"
2. פתח קובץ: supabase/migrations/20260525_program_fields.sql
3. תעתיק > הדבק > Run
4. תוצאה: הוסף שדות חדשים לטבלת programs
```

#### **Migration 4: 20260526_storage_bucket.sql** (אחסון קבצים)
```
1. "+ New Query"
2. פתח קובץ: supabase/migrations/20260526_storage_bucket.sql
3. תעתיק > הדבק > Run
4. תוצאה: Storage bucket למטובה
```

---

### **Option B: דרך Supabase CLI (מתקדם)**

```bash
# 1. התקנה (פעם ראשונה):
npm install -g supabase

# 2. התחברות לפרויקט:
supabase link --project-ref your-project-ref

# 3. בחר: Create a new database password
# 4. הוסף את ה-Database password שהגדרת בShift 2

# 5. הרץ את כל ה-Migrations:
supabase db push

# 6. יצא מהתחברות:
supabase unlink
```

---

## שלב 5: בדיקה שהכל עובד

```
בדף Supabase - בתפריט משמאל:

1. לחץ "Table Editor" 
2. תראה את הטבלאות שנוצרו:
   ✅ programs
   ✅ program_categories
   ✅ program_category_links
   ✅ program_images
   ✅ newsletter_subscribers
   ✅ contact_leads
3. אם כל הטבלאות שם - עבד! ✅
```

---

## שלב 6: הוסף תוכניות לראשונה (בדיקה)

```
בדף Supabase:
1. Table Editor > כפתור "programs"
2. לחץ "+Insert Row"
3. הוסף תוכנית:
   - title: "תוכנית בדיקה"
   - description: "תיאור קצר"
   - category_id: 1 (אם קטגוריה קיימת)
4. לחץ "Save"
5. בדוק שהתוכנית הופיעה ✅
```

---

## שלב 7: בדיקה בפרויקט המקומי

```bash
# בטרמינל, בתיקיית הפרויקט:
cd c:\Users\משתמש\פרויקט מלכי בלום - מרכזות אונליין\Malky_Bloom

# תחילה: תקן את.env.local עם ה-Keys מShift 3

# הרץ:
npm install
npm run dev

# פתח: http://localhost:3000
# ודא שהתוכניות מ-Supabase נטענות ✅
```

---

## 🚨 שגיאות נפוצות וכיצד לתקן

### ❌ שגיאה: "Missing Supabase public environment variables"
```
פתרון:
1. בדוק את .env.local בעורך הקוד
2. ודא שיש:
   - NEXT_PUBLIC_SUPABASE_URL=https://...
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
3. שמור את הקובץ
4. הרץ: npm run dev מחדש
```

### ❌ שגיאה: "permission denied" ב-Migration
```
פתרון:
1. עצור את npm run dev
2. הרץ את migration: 20260524_api_grants.sql
3. בדוק שהוא הצליח
4. הרץ מחדש את npm run dev
```

### ❌ שגיאה: "Connection refused"
```
פתרון:
1. בדוק שה-URL של Supabase נכון (https://xxxx.supabase.co)
2. בדוק שאין /rest/v1 בסוף ה-URL
3. בדוק ש-Keys לא מכילים רווחים בהתחלה/סוף
4. spoof את מנהל גרובי: npm install (מחדש)
```

### ❌ שגיאה: "Invalid API Key"
```
פתרון:
1. בדוק שה-Keys מ-Settings > API
2. ודא שהעתקת בדיוק (לא רווחים נוספים)
3. נסה להעתיק שוב את ה-Keys
4. שמור וצור.env.local מחדש
```

---

## ✅ סה"כ - Supabase מוכן!

כשסיימת את כל השלבים:
- ✅ חשבון Supabase יצור במייל הנכון
- ✅ Project "Merkazot-Online" קיים
- ✅ כל ה-API Keys בקובץ .env.local
- ✅ כל ה-Migrations הורצו בהצלחה
- ✅ תוכניות נטענות בפרויקט המקומי

**המשך ל: Vercel Deploy** ➡️

---

## 🆘 צריך עזרה?

אם משהו לא עובד:
1. בדוק את תיעוד Supabase: https://supabase.com/docs
2. בדוק שרת התמיכה: https://supabase.com/help
3. בקרא מחדש את מדריך זה לכל המפרט
