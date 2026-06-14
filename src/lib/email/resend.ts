const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim();
const SITE_OWNER_EMAIL = process.env.SITE_OWNER_EMAIL?.trim() || "henny600534@gmail.com";

const DEFAULT_FROM_EMAIL = RESEND_FROM_EMAIL || SITE_OWNER_EMAIL;

type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};

async function sendResendEmail(payload: ResendEmailPayload): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("Resend API key is not configured. Skipping email send.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Resend email failed: ${response.status} ${response.statusText} ${body}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Resend email request failed:", error);
    return false;
  }
}

export async function sendNewsletterNotification(email: string): Promise<boolean> {
  const subject = "מנוי חדש לעדכונים";
  const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>מנוי חדש לעדכונים</title>
  </head>
  <body style="margin:0;padding:0;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f3f4f6; color:#111827; direction:rtl; text-align:right;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:22px;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.08);">
      <tr>
        <td style="padding:30px 30px 22px; background:#0f172a;">
          <h1 style="margin:0;font-size:24px;line-height:1.2;color:#f8fafc;">נרשם מנוי לעדכונים</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 30px;">
          <p style="margin:0 0 18px;color:#334155;line-height:1.7;font-size:15px;">קיבלת בקשה להצטרפות לרשימת העדכונים.</p>
          <div style="background:#f8fafc;border:1px solid #d1d5db;border-radius:16px;padding:18px;">
            <p style="margin:0 0 8px;font-size:13px;color:#64748b;letter-spacing:0.04em;text-transform:uppercase;">אימייל מנוי</p>
            <p style="margin:0;font-size:17px;font-weight:600;color:#0f172a;">${email}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 30px 28px;">
          <p style="margin:0;color:#64748b;font-size:13px;">שלח זיהוי נוסף אם תרצה לבדוק את המנוי או לבטל את ההרשמה.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return await sendResendEmail({
    from: DEFAULT_FROM_EMAIL,
    to: [SITE_OWNER_EMAIL],
    subject,
    html,
  });
}

export async function sendContactRequestNotification(payload: {
  name: string;
  phone: string;
  email: string;
}): Promise<boolean> {
  const subject = "בקשת קשר חדשה";
  const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>בקשת קשר חדשה</title>
  </head>
  <body style="margin:0;padding:0;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f3f4f6; color:#111827; direction:rtl; text-align:right;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:22px;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.08);">
      <tr>
        <td style="padding:30px 30px 22px; background:#0f172a;">
          <h1 style="margin:0;font-size:24px;line-height:1.2;color:#f8fafc;">בקשת קשר חדשה</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 30px;">
          <p style="margin:0 0 18px;color:#334155;line-height:1.7;font-size:15px;">התקבלה בקשת קשר חדשה עם הפרטים הבאים.</p>
          <div style="background:#f8fafc;border:1px solid #d1d5db;border-radius:16px;padding:18px;">
            <p style="margin:0 0 10px;font-size:13px;color:#64748b;letter-spacing:0.04em;">שם</p>
            <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#0f172a;">${payload.name}</p>
            <p style="margin:0 0 10px;font-size:13px;color:#64748b;letter-spacing:0.04em;">טלפון</p>
            <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#0f172a;">${payload.phone}</p>
            <p style="margin:0 0 10px;font-size:13px;color:#64748b;letter-spacing:0.04em;">אימייל</p>
            <p style="margin:0;font-size:16px;font-weight:600;color:#0f172a;">${payload.email}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 30px 28px;">
          <p style="margin:0;color:#64748b;font-size:13px;">בתגובה על הודעת זהות זו, ניתן לפתוח קשר עם הלקוח מהר יותר.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return await sendResendEmail({
    from: DEFAULT_FROM_EMAIL,
    to: [SITE_OWNER_EMAIL],
    subject,
    html,
  });
}
