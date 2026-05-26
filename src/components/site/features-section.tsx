// DEPRECATED: עובר ל-Tailwind בלבד. אין להשתמש בקומפוננטה זו יותר.
"use client";

import { Box, Container, Grid, Card, CardContent, Typography, Stack } from "@mui/material";
import {
  Speed,
  Security,
  BarChart,
  Settings,
} from "@mui/icons-material";

const features = [
  {
    icon: <Speed sx={{ fontSize: 40, color: "#7B68EE" }} />,
    title: "מהיר וקל",
    description: "התחל עם דקות, לא שעות. הממשק שלנו פשוט וקל לשימוש.",
  },
  {
    icon: <Security sx={{ fontSize: 40, color: "#FF7A59" }} />,
    title: "בטוח",
    description: "כל הנתונים שלך מוצפנים ומאובטחים בסטנדרט הגבוה ביותר.",
  },
  {
    icon: <BarChart sx={{ fontSize: 40, color: "#54EFC0" }} />,
    title: "ניתוח מתקדם",
    description: "קבל תובנות בזמן אמת לקבלת החלטות טובות יותר.",
  },
  {
    icon: <Settings sx={{ fontSize: 40, color: "#54EFC0" }} />,
    title: "התאמה אישית",
    description: "התאם את המערכת בדיוק לצרכים שלך ולעסק שלך.",
  },
];

export function FeaturesSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "#F5F5F7",
        direction: "rtl",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
          }}
        >
          למה לבחור בנו?
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  transition: "transform 0.3s, boxShadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
