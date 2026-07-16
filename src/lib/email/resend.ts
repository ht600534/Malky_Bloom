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
  <body style="margin:0;padding:0;background:#08080b;color:#ffffff;direction:rtl;text-align:right;font-family:Arial,'Noto Sans Hebrew',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#08080b;padding:40px 12px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;">

            <!-- Top accent bar -->
            <tr>
              <td style="padding:0;">
                <div style="height:3px;background:linear-gradient(to left,transparent,#4be6b5 40%,#7df0ca 70%,transparent);border-radius:2px 2px 0 0;"></div>
              </td>
            </tr>

            <!-- Main card -->
            <tr>
              <td style="background:#0f0f14;border:1px solid rgba(255,255,255,0.08);border-top:none;border-radius:0 0 6px 6px;padding:0;overflow:hidden;">

                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding:32px 36px 24px;border-bottom:1px solid rgba(255,255,255,0.07);">
                      <!-- Eyebrow badge -->
                      <div style="display:inline-block;background:rgba(75,230,181,0.1);border:1px solid rgba(75,230,181,0.25);color:#7df0ca;border-radius:3px;padding:5px 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;margin-bottom:18px;">
                        ${options.eyebrow}
                      </div>
                      <h1 style="margin:0 0 10px;font-size:30px;line-height:1.15;font-weight:700;color:#ffffff;">${options.title}</h1>
                      <p style="margin:0;font-size:15px;line-height:1.8;color:rgba(255,255,255,0.55);">${options.intro}</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:28px 36px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#17171e;border:1px solid rgba(255,255,255,0.07);border-radius:4px;">
                        <tr>
                          <td style="padding:24px 24px 8px;">
                            ${options.content}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:0 36px 28px;">
                      <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:18px;font-size:12px;line-height:1.9;color:rgba(255,255,255,0.3);">
                        ${options.footer}
                      </div>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Bottom brand strip -->
            <tr>
              <td style="padding:18px 0 0;text-align:center;">
                <div style="font-size:11px;color:rgba(255,255,255,0.2);letter-spacing:0.12em;">MALKY BLOOM &nbsp;&middot;&nbsp; מרכזות אונליין</div>
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
      <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.07);vertical-align:top;">
        <div style="font-size:11px;font-weight:700;color:#4be6b5;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">${label}</div>
        <div style="font-size:17px;line-height:1.7;color:#ffffff;font-weight:500;word-break:break-word;">${value}</div>
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
