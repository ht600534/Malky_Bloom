"use client";

import { Box, Container, Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const faqs = [
  {
    question: "כמה עולה הצטרפות לפלטפורמה?",
    answer: "המחירים משתנים בהתאם לתוכנית שבחרת ולדרישות שלך. אנחנו מציעים התייעצות חינמית כדי לבחור את התוכנית המתאימה ביותר.",
  },
  {
    question: "האם אוכל להתאים את התוכנית לתיכון שלי?",
    answer: "כן! כל התוכניות שלנו ניתנות להתאמה אישית בהתאם לתרבות וערכים של התיכון שלך.",
  },
  {
    question: "כמה זמן לוקח להשלים תוכנית?",
    answer: "זה תלוי בתוכנית שבחרת. יש לנו תוכניות מ-90 דקות ועד למחנות שלמים.",
  },
  {
    question: "מה קורה אם אצטרך עזרה במהלך התוכנית?",
    answer: "יש לנו זמינות מלאה! תוכלי ליצור קשר בכל שעה ואנחנו נעזור לך.",
  },
  {
    question: "האם יש מטבחון או תוספת למטבח?",
    answer: "בתוכניות מסוימות כן. יש פעילויות שכוללות תוספים וחומרים שאתה צריך להשיג.",
  },
];

export function FAQ() {
  const [expanded, setExpanded] = useState<number | false>(0);

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
          top: "50%",
          right: "-20%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(44, 229, 176, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(50px)",
          transform: "translateY(-50%)",
        }}
      />

      <Container maxWidth="md">
        <Stack spacing={8} sx={{ position: "relative", zIndex: 2 }}>
          {/* כותרת */}
          <Stack sx={{ spacing: 2, textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: "#b5b8c5",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 600,
              }}
            >
              השאלות שלנו
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
              שאלות נפוצות
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: "#b5b8c5",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.7,
                mt: 2,
              }}
            >
              יש לך שאלות? בואי נענה לך! כאן תמצאי את התשובות לשאלות שלנו שמעלות רכזות בכל יום
            </Typography>
          </Stack>

          {/* FAQ */}
          <Stack spacing={2}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={() => setExpanded(expanded === index ? false : index)}
                sx={{
                  background: `linear-gradient(135deg, rgba(10, 10, 13, 0.9), rgba(10, 10, 13, 0.95))`,
                  border: `1px solid ${expanded === index ? "#2ce5b0" : "#2a2b35"}`,
                  borderRadius: "15px",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "#2ce5b0",
                  },
                  "& .MuiAccordionSummary-root": {
                    padding: "20px",
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(44, 229, 176, 0.05)",
                    },
                  },
                  "& .MuiAccordionDetails-root": {
                    padding: "20px",
                    borderTop: `1px solid ${expanded === index ? "#2ce5b0" : "#2a2b35"}`,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: expanded === index ? "#2ce5b0" : "#b5b8c5" }} />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      textAlign: "right",
                    },
                  }}
                >
                  <Typography sx={{ color: "#f6f7fb", fontWeight: 700, fontSize: "1.05rem" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography sx={{ color: "#b5b8c5", lineHeight: 1.8, fontSize: "0.95rem" }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
