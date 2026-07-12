# 🚀 Vercel - מדריך פרסום

## שלב 1: יצירת חשבון GitHub (אם עדיין אין)

```
1. כנס ל- https://github.com/signup
2. הוסף מייל הפרויקט
3. בחר username (לדוגמה: merkazot-online)
4. הגדר סיסמה חזקה
5. בחר "Free" (תוכנית בחינם)
6. אשר את ה-Email
```

---

## שלב 2: יצירת חשבון Vercel

```
1. כנס ל- https://vercel.com/signup
2. בחר "Continue with GitHub"
3. סמכה את Vercel לגישה ל-GitHub
4. בחר את GitHub Account שלך
5. יהיה מעבר לדף ברוכה לVercel
```

---

## שלב 3: חיבור Repository

```
בדף Vercel:
1. לחץ "Add New..." (כפתור ירוק) > "Project"
2. בחר "Import Git Repository"
3. תחת "Your GitHub repositories" - תבחר את Malky_Bloom
4. אם Repository לא רואים:
   - לחץ "Configure Git Integration"
   - בחר את הגיטהוב שלך
   - אשר את ההרשאות
5. בחר את הRepository "Malky_Bloom"
6. לחץ "Import"
```

---

## שלב 4: הגדרת Environment Variables

```
בדף Vercel - בעמוד "Import Project":

1. לפני לחיצה "Deploy" - תראה חלק "Environment Variables"
2. הוסף כל משתנה בנפרד:
```

### דוגמה - הוסף משתנה:
```
Variable Name:  NEXT_PUBLIC_SUPABASE_URL
Value:          https://xxxxx.supabase.co
לחץ: "Add"
```

### כל המשתנים שצריך להוסיף:
```
1. NEXT_PUBLIC_SUPABASE_URL
   → Copy מתוך .env.local

2. NEXT_PUBLIC_SUPABASE_ANON_KEY
   → Copy מתוך .env.local

3. SUPABASE_SERVICE_ROLE_KEY ⚠️
   → Copy מתוך .env.local

4. RESEND_API_KEY (כשתפתחי)
   → מ- Resend Dashboard

5. RESEND_FROM_EMAIL
   → לדוגמה: noreply@merkazotOnline.com

6. SITE_OWNER_EMAIL
   → המייל האמיתי שלך

7. NEXT_PUBLIC_TURNSTILE_SITE_KEY (כשתפתחי)
   → מ- Cloudflare Turnstile

8. CLOUDFLARE_TURNSTILE_SECRET_KEY ⚠️ (כשתפתחי)
   → מ- Cloudflare Turnstile

9. ADMIN_PANEL_PASSWORD
   → סיסמה שהגדרת

10. NEXT_PUBLIC_SITE_URL
    → https://merkazotOnline.com (או ה-Vercel URL)
```

---

## שלב 5: הפעלת Deploy

```
בדף הגדרת Environment Variables:
1. בדוק שכל המשתנים הוספו ✅
2. לחץ "Deploy" (כפתור ירוק)
3. Vercel יתחיל בנייה של הפרויקט
   - Build ~2-3 דקות
   - Deploy ~1 דקה
4. כשסיים - יציג "Congratulations!"
5. לחץ "Visit" כדי לפתוח את האתר
```

---

## שלב 6: בדיקה שהאתר עובד

```
URL של Vercel: https://malky-bloom-xxxxx.vercel.app

בדוק:
1. [ ] דף הבית נפתח
2. [ ] תוכניות נטענות מ-Supabase ✅
3. [ ] טופס "צור קשר" עובד
4. [ ] כל הภתוג בעברית נראה נכון (RTL)
5. [ ] תמונות מופיעות
6. [ ] טוקן Cloudflare מופיע בטוקס (אם יש)
```

---

## שלב 7: בדיקה של תוכניות

```
בURL של Vercel:

1. לחץ על "התוכניות"
2. ודא שתוכניות נטענות מ-Supabase ✅
3. לחץ על תוכנית בודדת
4. תראה את כל הפרטים
5. בתחתיון - טופס "מעוניינת?"
```

---

## שלב 8: בדיקה של טוקסים

```
בטוק קשר או בטוקס בעמוד תוכנית:

1. השלם את הפרטים
2. Turnstile צריך להופיע
3. שלח הטוקס
4. בדוק את ה-Email (SITE_OWNER_EMAIL)
   - צריך קבלת הודעה מ-Resend ✅
```

---

## 🔄 עדכונים ל-Vercel

כל פעם שתדחוק code ל-GitHub:

```
1. GitHub מחובר ל-Vercel
2. Vercel יזהה את ה-Push אוטומטית
3. יתחיל build חדש
4. כשהוא יסתיים - האתר מתעדכן אוטומטית
```

---

## 🔐 ניהול Environment Variables בภายהלך

```
בדף Vercel - Settings > Environment Variables:

1. אפשר לערוך משתנים קיימים
2. אפשר להוסיף משתנים חדשים
3. כל שינוי יידרוש deploy חדש

דוגמה:
- בחרת להוסיף משתנה חדש RESEND_API_KEY
- לחץ "Add"
- לחץ "Redeploy" לעדכון האתר
```

---

## 🆘 שגיאות נפוצות

### ❌ Build נכשל
```
בדוק בDeploy Log (לחץ "View logs"):
1. חיפוש שגיאה בבנייה
2. אם זה Supabase - בדוק Environment Variables
3. אם זה לוגאים - נסה deploy שוב
```

### ❌ Environment Variable לא קריא
```
פתרון:
1. בדוק את שם המשתנה (כולל capitalization)
2. בדוק שהערך לא ריק
3. הוסף את המשתנה מחדש
4. לחץ "Redeploy"
```

### ❌ תוכניות לא נטענות
```
פתרון:
1. בדוק ש- NEXT_PUBLIC_SUPABASE_URL נכון
2. בדוק ש- NEXT_PUBLIC_SUPABASE_ANON_KEY תקין
3. בדוק בConsole (F12 > Console) לשגיאות
4. בדוק בבעיות ב-Supabase
```

---

## ✅ Vercel מוכן!

כשכל הבדיקות עברו בהצלחה:
- ✅ האתר פתוח ב-URL Vercel
- ✅ תוכניות נטענות
- ✅ טוקסים עובדים
- ✅ מיילים משודרים

**תצרוף**: קישור ה-Vercel URL
מ-https://merkazotOnline.com (כשתהיה Domain אמיתי)

---

## 🎯 צעדים הבאים

1. [ ] קשר Domain משלך (merkazotOnline.com) ל-Vercel
2. [ ] הגדר SSL Certificate (Vercel עשה אוטומטית)
3. [ ] צור Redirects מ-HTTP ל-HTTPS
4. [ ] בדוק Robots.txt ו-Sitemap
5. [ ] בדוק Google Search Console

---

תוך קשר: https://vercel.com/docs
