// DEPRECATED: עובר ל-Tailwind בלבד. אין להשתמש בקומפוננטה זו יותר.
"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import HeroGraphics from "@/components/site/hero-graphics";

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(135deg, #030407 0%, #1a1a2e 100%)",
        color: "#fff",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      {/* שכבת גרפיקה ברקע */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <HeroGraphics />
      </Box>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
              fontWeight: 900,
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            <span>מאפס מאמץ ותקציב נמוך</span>
            <br />
            <span>
              עד לתוכנית{" "}
              <Box component="span" sx={{ color: "#FF7A59" }}>
                מוצלחת
              </Box>
            </span>
            <br />
            <Box component="span" sx={{ color: "#54EFC0" }}>
              זה אף פעם לא היה פשוט יותר!
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              color: "#B0B0B0",
              maxWidth: "600px",
              mb: 3,
            }}
          >
            פתרון מלא לניהול תוכניות עם כלים חכמים ודעדוק פשוט
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7B68EE",
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#6A5AD7",
                },
              }}
              endIcon={<ArrowForward />}
            >
              בואו נתחיל
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: "#ff0000",
                borderColor: "#a11010",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#ef5454",
                  backgroundColor: "rgba(240, 10, 6, 0.91)",
                },
              }}
            >
              למידע נוסף
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
