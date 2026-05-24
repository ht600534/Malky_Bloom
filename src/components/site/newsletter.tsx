"use client";

import { Box, Container, Typography } from "@mui/material";
import { NewsletterSubscribeMUI } from "@/components/site/newsletter-subscribe-mui";

export function Newsletter() {
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
        <Box
          sx={{
            background: "#111116",
            border: "1px solid #2a2b35",
            borderRadius: "25px",
            p: { xs: 4, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 900,
              color: "#FF7A59",
              mb: 3,
            }}
          >
            רוצה להתעדכן כשתוכנית חדשה עולה לאתר?
          </Typography>

          <Box sx={{ maxWidth: "600px", mx: "auto" }}>
            <NewsletterSubscribeMUI variant="section" />
          </Box>

          <Typography sx={{ color: "#b5b8c5", mt: 3, fontSize: "0.9rem" }}>
            אנחנו לא שולחים ספאם. יוצאים מטעויות של הריסוק בלבד.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
