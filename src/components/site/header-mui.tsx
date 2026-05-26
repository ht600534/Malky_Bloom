// DEPRECATED: עובר ל-Tailwind בלבד. אין להשתמש בקומפוננטה זו יותר.
"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";

export function SiteHeaderMUI() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const isMobile = mounted && isMobileQuery;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: "ראשי", href: "/" },
    { label: "אודות", href: "/about" },
    { label: "התוכניות", href: "/programs" },
    { label: "צרי קשר", href: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          direction: "rtl",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 80,
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo & Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #2ce5b0 0%, #4fdab3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              מרכזות
            </Box>
            <Box
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#FF7A59",
              }}
            >
              אונליין
            </Box>
          </Box>

          {/* Navigation - Desktop */}
          {!isMobile && (
            <Stack
              direction="row"
              spacing={4}
              sx={{ alignItems: "center" }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: "#0a0a0d",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    position: "relative",
                    transition: "all 0.3s",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      right: 0,
                      width: 0,
                      height: 2,
                      background: "linear-gradient(135deg, #2ce5b0 0%, #4fdab3 100%)",
                      transition: "width 0.3s",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={() => toggleDrawer(true)}
              sx={{ color: "#0a0a0d" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* CTA Button - Desktop */}
          {!isMobile && (
            <Button
              sx={{
                background: "linear-gradient(135deg, #2ce5b0 0%, #50efc1 100%)",
                color: "#0a0a0d",
                px: 3,
                py: 1,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "25px",
                transition: "all 0.3s",
                "&:hover": {
                  background: "linear-gradient(135deg, #1dd99a 0%, #3ed9aa 100%)",
                  boxShadow: "0 8px 16px rgba(44, 229, 176, 0.3)",
                },
              }}
            >
              התחל עכשיו
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            pt: 2,
            height: "100%",
            background: "#fff",
            direction: "rtl",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              תפריט
            </Typography>
            <IconButton
              onClick={() => toggleDrawer(false)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                href={item.href}
                onClick={() => toggleDrawer(false)}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    textAlign: "right",
                    "& .MuiTypography-root": {
                      fontWeight: 500,
                      color: "#0a0a0d",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ px: 2, mt: 2 }}>
            <Button
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #2ce5b0 0%, #50efc1 100%)",
                color: "#0a0a0d",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "20px",
              }}
            >
              התחל עכשיו
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
