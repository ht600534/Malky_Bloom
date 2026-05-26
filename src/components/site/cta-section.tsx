// DEPRECATED: עובר ל-Tailwind בלבד. אין להשתמש בקומפוננטה זו יותר.
"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #7B68EE 0%, #6A5AD7 100%)",
        color: "#fff",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
            }}
          >
            מוכנים להתחיל?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              opacity: 0.9,
              maxWidth: "500px",
            }}
          >
            הצטרף לעשרות עסקים שכבר מנצלים את המערכת שלנו
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#fff",
              color: "#7B68EE",
              px: 4,
              py: 2,
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              mt: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            endIcon={<ArrowForward />}
          >
            בואו נתחיל עכשיו
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
