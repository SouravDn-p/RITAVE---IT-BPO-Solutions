import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import ReduxProvider from "@/components/ReduxProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: {
    default:
      "RITAVE - IT & BPO Solutions | Your Partner in Global Business Solutions",
    template: "%s | RITAVE",
  },
  description:
    "Professional IT & BPO services including medical claims processing, web development, data processing, and remote staffing for healthcare, technology, and e-commerce industries.",
  generator: "v0.app",
  keywords: [
    "IT services",
    "BPO solutions",
    "medical claims processing",
    "web development",
    "data processing",
    "remote staffing",
    "healthcare BPO",
    "HIPAA compliant",
  ],
  authors: [{ name: "RITAVE" }],
  creator: "RITAVE",
  publisher: "RITAVE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ritave.com",
    title:
      "RITAVE - IT & BPO Solutions | Your Partner in Global Business Solutions",
    description:
      "Professional IT & BPO services including medical claims processing, web development, data processing, and remote staffing for healthcare, technology, and e-commerce industries.",
    siteName: "RITAVE",
    images: [
      {
        url: "https://ritave.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "RITAVE - IT & BPO Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RITAVE - IT & BPO Solutions",
    description:
      "Professional IT & BPO services including medical claims processing, web development, data processing, and remote staffing for healthcare, technology, and e-commerce industries.",
    images: ["https://ritave.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SessionWrapper>
            <ReduxProvider>
              {children}
              <Toaster />
            </ReduxProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
