"use client";

import { Box, Container, Typography, Stack } from "@mui/material";

export function WhyChooseUs() {
  return (
    <Box
      component="section"
      sx={{
        background: "#0a0a0d",
        py: { xs: 8, md: 10 },
        direction: "rtl",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* כותרת */}
          <Typography
            sx={{
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              color: "#b5b8c5",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
            }}
          >
            אחרי שנים של ניסיון בתחום הריכוז החברתי
          </Typography>

          {/* כותרת ראשית */}
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem", lg: "3rem" },
              fontWeight: 900,
              textAlign: "center",
              background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.4,
            }}
          >
            הגיע הזמן לאפשר לכל רכזת חברתית להביא את התוכניות המקצועיות ביותר גם עם תקציב נמוך או
            לו״ז קצר
          </Typography>

          {/* תיאור */}
          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              color: "#b5b8c5",
              textAlign: "center",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            בין אם זה ליום עיון תוכנית בת שעתיים או מחנה שלם, את לא צריכה לעבוד מסביב לשעון כדי
            להביא הצלחה והנאה לתלמידות
          </Typography>

          {/* שתי עמודות */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              mt: 4,
            }}
          >
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, rgba(44, 229, 176, 0.1), transparent)",
                border: "1px solid rgba(44, 229, 176, 0.2)",
                borderRadius: "15px",
                p: 4,
                textAlign: "right",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#2ce5b0",
                  mb: 2,
                }}
              >
                תוכניות ערכיות ומיוחדות
              </Typography>
              <Typography sx={{ color: "#b5b8c5", lineHeight: 1.6 }}>
                תוכניות מותאמות באופן מלא לערכים והאופי של התיכון שלך
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, rgba(255, 122, 89, 0.1), transparent)",
                border: "1px solid rgba(255, 122, 89, 0.2)",
                borderRadius: "15px",
                p: 4,
                textAlign: "right",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#FF7A59",
                  mb: 2,
                }}
              >
                תוכניות בהתאמה אישית
              </Typography>
              <Typography sx={{ color: "#b5b8c5", lineHeight: 1.6 }}>
                חבילות תוכן ייחודיות לכל שכבה ולכל צוות
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
