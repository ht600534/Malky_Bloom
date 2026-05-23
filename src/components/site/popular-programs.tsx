"use client";

import { Box, Container, Typography, Grid, Card, CardContent, Button, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Image from "next/image";

const programs = [
  {
    title: "אש בוערת בברסלב",
    description: "תוכנית מלהיבה שמקשרת בין רוח הברסלבית לחיים מודרניים",
    color: "#96ffa7",
    bg: "linear-gradient(135deg, rgba(44, 229, 176, 0.1), transparent)",
    border: "rgba(44, 229, 176, 0.2)",
  },
  {
    title: "ספירת העומר",
    description: "מסע רוחני דרך ספירת העומר עם מעמקות ופעילויות משמעותיות",
    color: "#FF7A59",
    bg: "linear-gradient(135deg, rgba(255, 122, 89, 0.1), transparent)",
    border: "rgba(255, 122, 89, 0.2)",
  },
  {
    title: "סיפור המצווה",
    description: "חוויה דינמית המלמדת על המצווות דרך סיפורים וחוויות",
    color: "#4fdab3",
    bg: "linear-gradient(135deg, rgba(79, 218, 179, 0.1), transparent)",
    border: "rgba(79, 218, 179, 0.2)",
  },
];

export function PopularPrograms() {
  return (
    <Box
      component="section"
      sx={{
        background: "#0a0a0d",
        py: { xs: 8, md: 12 },
        direction: "rtl",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* רקע דקורטיבי */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(79, 218, 179, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      <Container maxWidth="lg">
        <Stack spacing={8}>
          {/* כותרת */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: "#b5b8c5",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 600,
                mb: 2,
              }}
            >
              תוכניות בתאום
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                fontWeight: 900,
                background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.3,
              }}
            >
              התוכניות
              <br />
              הפופולאריות שלנו
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: "#b5b8c5",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.7,
                mt: 3,
              }}
            >
              בחרו מאוסף התוכניות המותאמות שלנו שנוצרו בעבור רכזות ובתיכונים בכל רחבי הארץ
            </Typography>
          </Box>

          {/* תוכניות */}
          <Grid container spacing={4}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    background: `linear-gradient(135deg, rgba(10, 10, 13, 0.9), rgba(10, 10, 13, 0.95))`,
                    border: `1px solid ${program.border}`,
                    borderRadius: "20px",
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: `linear-gradient(90deg, transparent, ${program.color}, transparent)`,
                      opacity: 0,
                      transition: "opacity 0.4s",
                    },
                    "&:hover": {
                      transform: "translateY(-12px)",
                      borderColor: program.color,
                      boxShadow: `0 20px 50px ${program.color}40, inset 0 1px 0 ${program.color}20`,
                      "&::before": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {/* Icon Container */}
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      background: `linear-gradient(135deg, ${program.color}30, ${program.color}10)`,
                      borderRadius: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      border: `1px solid ${program.color}40`,
                      fontSize: "2rem",
                    }}
                  >
                    ✨
                  </Box>

                  <Stack spacing={3} sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.5rem", md: "1.8rem" },
                        fontWeight: 900,
                        color: "#fff",
                        lineHeight: 1.2,
                      }}
                    >
                      {program.title}
                    </Typography>

                    <Typography sx={{ color: "#b5b8c5", lineHeight: 1.7, flex: 1 }}>
                      {program.description}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "auto", pt: 2 }}>
                      <Button
                        endIcon={<ArrowForward />}
                        sx={{
                          background: `linear-gradient(135deg, ${program.color}dd, ${program.color}99)`,
                          color: "#0a0a0d",
                          px: 3,
                          py: 1,
                          fontWeight: 700,
                          textTransform: "none",
                          borderRadius: "20px",
                          transition: "all 0.3s",
                          "&:hover": {
                            background: `linear-gradient(135deg, ${program.color}, ${program.color}cc)`,
                            transform: "translateX(-4px)",
                            boxShadow: `0 10px 25px ${program.color}40`,
                          },
                        }}
                      >
                        לפרטים נוספים
                      </Button>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
