"use client";

import { Box, Container, Typography, Stack, Card, CardContent, Rating, Avatar, Grid } from "@mui/material";

const testimonials = [
  {
    name: "שרה כהן",
    school: "סמינר בית יעקב",
    role: "מנהלת תוכניות",
    text: "תוכנית אש בוערת בברסלב היתה ההיגיון! התלמידות היו שקועות בפעילות ויצאו מהיום עם מעמקים אמיתיים.",
    rating: 5,
    color: "#2ce5b0",
  },
  {
    name: "רחל לבנון",
    school: "תיכון הלל",
    role: "רכזת חברתית",
    text: "המשך היה פשוט מדהים! קיבלנו את כל הקבצים מסודרים ויכולנו להתאים בדיוק לצרכי בתי הספר שלנו.",
    rating: 5,
    color: "#FF7A59",
  },
  {
    name: "מיכל גרוס",
    school: "סמינר נשים",
    role: "מנהלת הוראה",
    text: "יוקדש של הרכזת היתה טלטלה. בדיוק מה שחיפשתי ועדיין יותר מזה!",
    rating: 5,
    color: "#4fdab3",
  },
];

export function Testimonials() {
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
          bottom: "-20%",
          right: "-20%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255, 122, 89, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <Container maxWidth="lg">
        <Stack spacing={8} sx={{ position: "relative", zIndex: 2 }}>
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
              מה אומרות הרכזות
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                fontWeight: 900,
                background: "linear-gradient(135deg, #FF7A59 0%, #FF6B3D 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.3,
              }}
            >
              המלצות מהשטח
            </Typography>
          </Box>

          {/* קארטים */}
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    background: `linear-gradient(135deg, rgba(10, 10, 13, 0.9), rgba(10, 10, 13, 0.95))`,
                    border: `1px solid ${testimonial.color}30`,
                    borderRadius: "20px",
                    height: "100%",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      borderColor: `${testimonial.color}60`,
                      boxShadow: `0 20px 50px ${testimonial.color}25, inset 0 1px 0 ${testimonial.color}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3} sx={{ height: "100%" }}>
                      {/* Stars */}
                      <Box sx={{ display: "flex", direction: "ltr" }}>
                        <Rating value={testimonial.rating} readOnly sx={{ color: testimonial.color }} />
                      </Box>

                      {/* Text */}
                      <Typography
                        sx={{
                          color: "#b5b8c5",
                          lineHeight: 1.8,
                          fontSize: "0.95rem",
                          flex: 1,
                          fontStyle: "italic",
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>

                      {/* Author */}
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          alignItems: "center",
                          pt: 2,
                          borderTop: `1px solid ${testimonial.color}20`,
                        }}
                      >
                        <Avatar
                          sx={{
                            background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}dd)`,
                            color: "#fff",
                            fontWeight: 700,
                            width: 44,
                            height: 44,
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Stack spacing={0}>
                          <Typography sx={{ fontWeight: 700, color: "#fff" }}>
                            {testimonial.name}
                          </Typography>
                          <Typography sx={{ fontSize: "0.85rem", color: testimonial.color }}>
                            {testimonial.role}
                          </Typography>
                          <Typography sx={{ fontSize: "0.8rem", color: "#7a7d85" }}>
                            {testimonial.school}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
