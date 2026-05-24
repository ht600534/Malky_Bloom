"use client";

import { Box, Button, Container, Grid, Typography, Link, Stack } from "@mui/material";
import Image from "next/image";
import { NewsletterSubscribeMUI } from "@/components/site/newsletter-subscribe-mui";

export function FooterMUI() {

  return (
    <Box
      component="footer"
      sx={{
        background: "#000000",
        color: "#fff",
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        direction: "rtl",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={6} sx={{ alignItems: "flex-start", direction: "ltr" }}>
          {/* צד שמאל - דף רישום לניוזלטר */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              {/* לוגו וטקסט הקדמי */}
              <Box>
                <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                  <Box sx={{ width: "100px", height: "100px" }}>
                    <Image
                      src="/figma/scribble-white.svg"
                      alt="לוגו"
                      width={100}
                      height={100}
                      priority
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "right",
                  }}
                >
                  רוצה להתעדכן
                  <br />
                  כשתוכניות חדשה
                  <br />
                  עולה לאתר?
                </Typography>
              </Box>

              <NewsletterSubscribeMUI variant="footer" />
              <Button
                component={Link}
                href="/about"
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  color: "#fff",
                  px: 2,
                  py: 0.7,
                  fontWeight: 600,
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  textTransform: "none",
                  alignSelf: "flex-start",
                  "&:hover": {
                    borderColor: "#2ce5b0",
                    color: "#2ce5b0",
                  },
                }}
              >
                מידע נוסף
              </Button>
            </Stack>
          </Grid>

          {/* עמודות אמצע - קטגוריות */}
          <Grid item xs={6} sm={2} md={1.5}>
            <Stack spacing={2.5}>
              <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#2ce5b0" }}>
                אודות
              </Typography>
              <Link
                href="/programs"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                מחנות קיץ וחורף
              </Link>
              <Link
                href="/programs"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                תוכניות נושא
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                אלול
              </Link>
            </Stack>
          </Grid>

          {/* עמודת תאריכים */}
          <Grid item xs={6} sm={2} md={1.5}>
            <Stack spacing={2.5}>
              <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#2ce5b0" }}>
                מעגל השנה
              </Typography>
              <Link
                href="#"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                סיום י"ב
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                טו בשבט
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                פסח
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                ערבי הורים
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#b5b8c5",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  display: "block",
                  "&:hover": { color: "#2ce5b0" },
                }}
              >
                ספירת העומר
              </Link>
            </Stack>
          </Grid>

          {/* מרווח */}
          <Grid item xs={12} md={1} />

          {/* צד ימין - לוגו ופרטי קשר */}
          <Grid item xs={12} sm={6} md={3.5}>
            <Stack spacing={4} sx={{ alignItems: "flex-end" }}>
              {/* לוגו */}
              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ fontSize: "1.8rem", fontWeight: 700 }}>
                  <Box component="span" sx={{ color: "#2ce5b0" }}>
                    מרכזות
                  </Box>
                  <Box component="span" sx={{ color: "#96FFA7", ml: 1 }}>
                    אונליין
                  </Box>
                </Box>
              </Box>

              {/* פרטי קשר */}
              <Stack spacing={1.5} sx={{ alignItems: "flex-end", width: "100%" }}>
                <Link
                  href="tel:0504185505"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#2ce5b0",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s",
                    "&:hover": { color: "#4fdab3" },
                  }}
                >
                  <Image
                    src="/figma/phone-icon.svg"
                    alt="טלפון"
                    width={18}
                    height={18}
                  />
                  050.418.5505
                </Link>

                <Link
                  href="mailto:malki2310@gmail.com"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#2ce5b0",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s",
                    "&:hover": { color: "#4fdab3" },
                  }}
                >
                  <Image
                    src="/figma/mail-icon.svg"
                    alt="אימייל"
                    width={18}
                    height={18}
                  />
                  malki2310@gmail.com
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
