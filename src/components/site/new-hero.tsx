// DEPRECATED: עובר ל-Tailwind בלבד. אין להשתמש בקומפוננטה זו יותר.
"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Image from "next/image";

export function NewHeroSection() {
  return (
    <Box
      component="section"
      sx={{
        background: "#0a0a0d",
        color: "#fff",
        py: { xs: 6, md: 12 },
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      {/* רקע דקורטיבי */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      >
        {/* <Image
          src="/figma/elements-decoration-1.svg"
          alt=""
          width={300}
          height={300}
        /> */}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        {/* <Image
          src="/figma/elements-decoration-2.svg"
          alt=""
          width={350}
          height={350}
        /> */}
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ alignItems: "center", position: "relative", zIndex: 2 }}>
          {/* כותרת ראשית */}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 900,
              lineHeight: 1.2,
              background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 50%, #2ce5b0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            מאפס מאמץ ותקציב נמוך
            <br />
            עד לתוכנית{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #FF7A59 0%, #ff6b3d 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              מוצלחת
            </Box>
          </Typography>

          {/* כותרת משנית */}
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}
          >
            זה אף פעם לא היה פשוט יותר!
          </Typography>

          {/* תיאור */}
          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              color: "#b5b8c5",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            פלטפורמה חדשנית ומיוחדת לרכזות תיכון שרוצות הצלחה, עם מגוון ענק של תוכניות מקצועיות
            ויצירתיות מוכנות להפעלה
          </Typography>

          {/* כפתורים */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #2ce5b0 0%, #50efc1 100%)",
                color: "#0a0a0d",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "30px",
                "&:hover": {
                  background: "linear-gradient(135deg, #1dd99a 0%, #3ed9aa 100%)",
                },
              }}
              endIcon={<ArrowForward />}
            >
              בואו נתחיל
            </Button>

            <Button
              sx={{
                color: "#e52c2c",
                border: "2px solid #e52c2c",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "30px",
                transition: "all 0.3s",
                "&:hover": {
                  background: "rgba(229, 44, 44, 0.82)",
                  borderColor: "#ff0000",
                },
              }}
            >
              למידע נוסף
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* אלמנטים דקורטיביים נוספים */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(79, 218, 179, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(255, 122, 89, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />
    </Box>
  );
}
