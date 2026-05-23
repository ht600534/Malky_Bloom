import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { MUIProvider } from "@/components/providers/mui-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "מרכזות אונליין",
  description: "אתר תוכניות תוכן וחוויות עם מסך ניהול מלא למנהלת.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph: {
    title: "מרכזות אונליין",
    description: "תוכניות תוכן מעוצבות, סינון חכם, וניהול תוכן מלא.",
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MUIProvider>{children}</MUIProvider>
      </body>
    </html>
  );
}
