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

function renderEmailShell(options: {
  eyebrow: string;
  title: string;
  intro: string;
  content: string;
  footer: string;
}) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${options.title}</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;color:#2d241d;direction:rtl;text-align:right;font-family:Arial,'Noto Sans Hebrew',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;padding:36px 12px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;background:#fcf8f2;border-radius:8px;overflow:hidden;border:1px solid #e4d3be;box-shadow:0 16px 40px rgba(84,56,33,0.08);">
            <tr>
              <td style="padding:0;background:#fcf8f2;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#fcf8f2;">
                  <tr>
                    <td style="padding:30px 32px 10px;">
                      <div style="display:inline-block;background:#fff7ec;border:1px solid #e8c9a0;color:#9a5b18;border-radius:999px;padding:7px 14px;font-size:12px;font-weight:700;letter-spacing:0.04em;">
                        ${options.eyebrow}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 32px 30px;">
                      <h1 style="margin:0 0 12px;font-size:32px;line-height:1.2;font-weight:700;color:#33241a;">${options.title}</h1>
                      <p style="margin:0;font-size:16px;line-height:1.9;color:#6f5a49;max-width:560px;">${options.intro}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f6e9d8;border:1px solid #e7dac8;border-radius:4px;overflow:hidden;box-shadow:none;">
                  <tr>
                    <td style="padding:24px 24px 18px;">
                      ${options.content}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <div style="border-top:1px solid #eee3d5;padding-top:18px;font-size:13px;line-height:1.9;color:#8a7767;">
                  ${options.footer}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderDataRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #eee5db;vertical-align:top;">
        <div style="font-size:12px;font-weight:700;color:#b0702f;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px;">${label}</div>
        <div style="font-size:18px;line-height:1.7;color:#111111;font-weight:500;word-break:break-word;">${value}</div>
      </td>
    </tr>`;
}

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
  const html = renderEmailShell({
    eyebrow: "רשימת תפוצה",
    title: "מנוי חדש לעדכונים",
    intro: "",
    content: `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${renderDataRow("אימייל", email)}
      </table>
    `,
    footer: "הודעה זו נשלחה אוטומטית מטופס ההרשמה באתר מרכזות אונליין.",
  });

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
  const html = renderEmailShell({
    eyebrow: "טופס יצירת קשר",
    title: "בקשת קשר חדשה",
    intro: "יש לך פנייה חדשה מטופס יצירת הקשר באתר מרכזות אונליין.",
    content: `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${renderDataRow("שם מלא", payload.name)}
        ${renderDataRow("טלפון", payload.phone)}
        ${renderDataRow("אימייל", payload.email)}
      </table>
      
    `,
    footer: "הודעה זו נשלחה אוטומטית מטופס יצירת הקשר באתר מרכזות אונליין.",
  });

  return await sendResendEmail({
    from: DEFAULT_FROM_EMAIL,
    to: [SITE_OWNER_EMAIL],
    subject,
    html,
  });
}
