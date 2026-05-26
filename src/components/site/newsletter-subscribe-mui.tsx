// DEPRECATED: עובר ל-Tailwind בלבד. אין להשתמש בקומפוננטה זו יותר.
"use client";

import { useActionState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { subscribeNewsletter } from "@/app/actions";

const initialState = { ok: false, message: "" };

type Props = {
  variant?: "section" | "footer";
};

export function NewsletterSubscribeMUI({ variant = "section" }: Props) {
  const [state, formAction, pending] = useActionState(
    async (_: typeof initialState, formData: FormData) => subscribeNewsletter(formData),
    initialState,
  );

  const isFooter = variant === "footer";

  return (
    <Box component="form" action={formAction}>
      <Stack direction="row" spacing={isFooter ? 1.5 : 2} sx={{ alignItems: "center" }}>
        <TextField
          type="email"
          name="email"
          required
          placeholder={isFooter ? "מייל..." : "הכנס את כתובת המייל שלך"}
          fullWidth={!isFooter}
          size={isFooter ? "small" : "medium"}
          sx={{
            flex: isFooter ? 1 : undefined,
            "& .MuiOutlinedInput-root": {
              color: "#f6f7fb",
              borderRadius: isFooter ? "6px" : "20px",
              "& fieldset": { borderColor: isFooter ? "rgba(255,255,255,0.3)" : "#2a2b35" },
              "&:hover fieldset": { borderColor: "#2ce5b0" },
            },
            "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
          }}
        />
        <Button
          type="submit"
          disabled={pending}
          sx={{
            background: isFooter
              ? "#2ce5b0"
              : "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
            color: "#0a0a0d",
            px: isFooter ? 2 : { xs: 3, md: 5 },
            py: isFooter ? 0.7 : undefined,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: isFooter ? "6px" : "20px",
            whiteSpace: "nowrap",
            fontSize: isFooter ? "0.8rem" : undefined,
            "&:hover": { opacity: 0.9 },
            "&.Mui-disabled": { opacity: 0.6 },
          }}
        >
          {pending ? "שולח..." : isFooter ? "שלח" : "הרשם"}
        </Button>
      </Stack>
      {state.message ? (
        <Typography
          sx={{
            mt: 1.5,
            fontSize: "0.9rem",
            color: state.ok ? "#2ce5b0" : "#FF7A59",
            textAlign: isFooter ? "right" : "center",
          }}
        >
          {state.message}
        </Typography>
      ) : null}
    </Box>
  );
}
