# 📊 מפת שירותים - כל ההשלכות של הפרויקט

## 🎯 כל השירותים שהפרויקט דורש

```
Merkazot Online (Malky Bloom Programs)
│
├── 🌐 FRONTEND (אתר)
│   └─ Vercel (Hosting)
│      ├─ Auto-deploy מGitHub
│      └─ URL: https://merkazotOnline.com
│
├── 💾 DATABASE (מסד נתונים)
│   └─ Supabase (PostgreSQL)
│      ├─ Users & Auth
│      ├─ Programs (תוכניות)
│      ├─ Categories (קטגוריות)
│      ├─ Contact Leads (פנייות)
│      ├─ Newsletter (מנויים)
│      └─ Storage (קבצים)
│
├── 📨 EMAIL (מיילים)
│   └─ Resend
│      ├─ Contact Form Notifications
│      └─ Newsletter Distribution
│
├── 🤖 SECURITY (הגנה)
│   └─ Cloudflare Turnstile (CAPTCHA)
│      └─ Spam Protection
│
├── 🎨 DESIGN (עיצוב)
│   └─ Figma
│      └─ UI/UX Files
│
└── 📝 VERSION CONTROL (ניהול קוד)
    └─ GitHub
       └─ Repo: Malky_Bloom
```

---

## 📋 טבלה מעשית

| שירות | סוג | פונקציה | מידע נדרש | עלות |
|------|------|---------|---------|------|
| **Supabase** | Database | אחסון נתונים, Auth | URL, Keys × 3 | 🆓 Free 5GB |
| **Vercel** | Hosting | פרסום האתר | GitHub Connect | 🆓 Free 100GB BW |
| **Resend** | Email | שליחת מיילים | API Key, Domain | 🆓 Free 100/day |
| **Cloudflare** | Security | הגנה מ-spam | Site Key, Secret | 🆓 Free |
| **Figma** | Design | עיצוב ו-mockups | Account | 🆓 Free Free |
| **GitHub** | VCS | ניהול קוד | Repository | 🆓 Free Public |

---

## 🔐 ה-Keys והסודות שצריכים

### ✅ בטוח להשתמש בציבור (NEXT_PUBLIC_*)
```
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_TURNSTILE_SITE_KEY
- NEXT_PUBLIC_SITE_URL
```

### ⚠️ סודיים - לעולם לא לשתף!
```
- SUPABASE_SERVICE_ROLE_KEY (Database Admin)
- RESEND_API_KEY (Email API)
- CLOUDFLARE_TURNSTILE_SECRET_KEY (CAPTCHA Secret)
- ADMIN_PANEL_PASSWORD (Admin Access)
```

---

## 🗺️ זרימת הנתונים

```
1. משתמש מגיע לאתר
   ↓
2. Vercel משרת את הקוד (HTML/JS/CSS)
   ↓
3. JavaScript טוען את התוכניות מ-Supabase
   ↓
4. ממשק רשת (React) מציג את התוכניות
   ↓
5. משתמש ממלא טוקס פנייה
   ↓
6. Turnstile מאמת שזה לא בוט
   ↓
7. הנתונים נשלחים ל-Supabase (contact_leads)
   ↓
8. Resend שולח מייל להודעה ללבעל האתר
   ↓
9. סיים ✅
```

---

## 🚀 סדר פתיחת החשבונות

### ⚡ סדר מומלץ:

```
STAGE 1: CRITICAL (לא אפשר לעבוד בלעדיהם)
├─ 1️⃣ Supabase (Database)
├─ 2️⃣ GitHub (Version Control)
└─ 3️⃣ Vercel (Hosting)

STAGE 2: IMPORTANT (לפעולות כמו email)
├─ 4️⃣ Resend (Email Service)
└─ 5️⃣ Cloudflare (Security)

STAGE 3: ADDITIONAL (וקט מוקדם)
└─ 6️⃣ Figma (Design Storage)
```

---

## 📱 תיאום בסטטוסים

### ✅ Supabase Setup

```
בדוק שיש:
- [ ] Project נוצר
- [ ] Database יצור
- [ ] כל ה-Migrations הורצו:
      ├─ 20260426_init.sql ✅
      ├─ 20260524_api_grants.sql ✅
      ├─ 20260525_program_fields.sql ✅
      └─ 20260526_storage_bucket.sql ✅
- [ ] טבלאות קיימות (Table Editor)
- [ ] כל Keys בקובץ .env.local
- [ ] בדיקה מקומית עובדת (npm run dev)
```

### ✅ Vercel Setup

```
בדוק שיש:
- [ ] Account נוצר
- [ ] GitHub מחובר
- [ ] Repository מחובר
- [ ] Environment Variables הוספו
- [ ] First Deploy הצליח
- [ ] אתר פתוח בVercel URL
- [ ] תוכניות נטענות
```

### ✅ Resend Setup

```
בדוק שיש:
- [ ] Account נוצר
- [ ] API Key קיבלנו
- [ ] Domain הוסף ו-verified
- [ ] DNS Records הוספו
- [ ] Email נשלח בהצלחה (בדיקה)
- [ ] Key בVercel Environment Variables
```

### ✅ Cloudflare Turnstile

```
בדוק שיש:
- [ ] Account נוצר
- [ ] Site נוצר
- [ ] Site Key קיבלנו
- [ ] Secret Key קיבלנו
- [ ] CAPTCHA מופיע בטוקסים
- [ ] Keys בVercel Environment Variables
```

---

## 🎓 הוראות הפעלה מהירות

### **פעם ראשונה - Setup מלא**
```bash
# 1. Supabase - יצור וhow database
Follow: SUPABASE_DETAILED_GUIDE.md

# 2. Local testing
cd c:\Users\משתמש\פרויקט מלכי בלום - מרכזות אונליין\Malky_Bloom
npm install
npm run dev
# פתח: http://localhost:3000

# 3. Vercel - Deploy
Follow: VERCEL_DETAILED_GUIDE.md

# 4. Production - בדוקות
Visit: https://merkazot-bloom.vercel.app
```

### **כל פעם שרוצה לעדכן**
```bash
# בLocal:
npm run build  # בדוקה לשגיאות
npm run lint   # בדוקה סגנון

# Push ל-GitHub:
git add .
git commit -m "תיאור השינוי"
git push

# Vercel יעדכן אוטומטית ✅
```

---

## 💰 עלויות מלוות

| שירות | Plan | עלות חודשית |
|------|------|-----------|
| Supabase | Free | $0 (עד 500MB DB) |
| Vercel | Pro | $0 (עד 100GB/חודש) |
| Resend | Free | $0 (עד 100/day) |
| Cloudflare | Free | $0 |
| Figma | Community | $0 (עד 2 files) |
| **סה"כ** | | **$0** 🆓 |

> אם נרשם התרפה - עדכן במעקב

---

## 🔄 תשנוק משימות שוטפות

### **כל יום:**
```
□ בדוק שהאתר פתוח (Vercel)
□ בדוק Supabase Dashboard
□ תשמר על API Keys בטוח
```

### **כל שבוע:**
```
□ עדכן תוכניות בפנל Admin
□ בדוק מיילים מפנייות
□ גיבוי נתונים (Supabase Backup)
```

### **חודשית:**
```
□ ביקורת אבטחה - עדכן סיסמאות
□ Check בacking logs בVercel
□ ניטור טרפיק ו-Performance
□ עדכן תוכניות מכנסות
```

---

## 📞 קישורי שרות

```
🌐 Dashboards:
   Supabase:  https://app.supabase.com
   Vercel:    https://vercel.com/dashboard
   Resend:    https://resend.com
   Cloudflare: https://dash.cloudflare.com
   Figma:     https://figma.com/files
   GitHub:    https://github.com

📚 Documentation:
   Supabase:  https://supabase.com/docs
   Vercel:    https://vercel.com/docs
   Resend:    https://resend.com/docs
   Figma:     https://help.figma.com

🆘 Support:
   Supabase:  https://supabase.com/support
   Vercel:    https://vercel.com/support
```

---

## 🎯 Checklist סופי

לפני שיציאה ל-Production:

- [ ] כל השירותים יצורים
- [ ] כל ה-Keys במקום
- [ ] אתר עובד בlocal
- [ ] אתר עובד בVercel
- [ ] מיילים נשלחים
- [ ] CAPTCHA עובד
- [ ] Admin panel accessible
- [ ] Backup של Supabase מחוצב
- [ ] HTTPS/SSL מופעל
- [ ] Domain מחובר (אם יש)

**אם סמנת את כולם ✅ - האתר מוכן!**

---

**סה"כ**: שירות המטב פרויקט מלא בטוח וחינם!
