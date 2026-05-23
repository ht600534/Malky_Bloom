"use client";

import { Box, Container, Typography, TextField, Button, Stack } from "@mui/material";

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

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <TextField
              placeholder="הכנס את כתובת המייל שלך"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#f6f7fb",
                  borderRadius: "20px",
                  "& fieldset": { borderColor: "#2a2b35" },
                  "&:hover fieldset": { borderColor: "#2ce5b0" },
                },
                "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
              }}
            />

            <Button
              sx={{
                background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
                color: "#0a0a0d",
                px: { xs: 3, md: 5 },
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "20px",
                whiteSpace: "nowrap",
                transition: "all 0.3s",
                "&:hover": {
                  opacity: 0.9,
                  transform: "scale(1.02)",
                },
              }}
            >
              הרשם
            </Button>
          </Stack>

          <Typography sx={{ color: "#b5b8c5", mt: 3, fontSize: "0.9rem" }}>
            אנחנו לא שולחים ספאם. יוצאים מטעויות של הריסוק בלבד.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
