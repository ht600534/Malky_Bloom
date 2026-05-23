"use client";

import { Box, Container, Typography, Grid, Card, CardContent, Stack } from "@mui/material";

const categories = [
  {
    title: "סביב\nמעגל השנה",
    icon: "◎",
    gradient: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
    color: "#2ce5b0",
  },
  {
    title: "תוכניות\nנושא",
    icon: "✶",
    gradient: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
    color: "#fff",
  },
  {
    title: "מחנות\nקיץ וחורף",
    icon: "◌",
    color: "#FF7A59",
  },
];

export function ProgramCategories() {
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
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: "#111116",
                  border: "1px solid #2a2b35",
                  borderRadius: "20px",
                  textAlign: "center",
                  py: 6,
                  px: 3,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#2ce5b0",
                    boxShadow: "0 10px 30px rgba(44, 229, 176, 0.2)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "3rem",
                    color: category.color,
                    mb: 2,
                  }}
                >
                  {category.icon}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#f6f7fb",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {category.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
