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
  title:
    "RITAVE - IT & BPO Solutions | Your Partner in Global Business Solutions",
  description:
    "Professional IT & BPO services including medical claims processing, web development, data processing, and remote staffing for healthcare, technology, and e-commerce industries.",
  generator: "v0.app",
  keywords:
    "IT services, BPO solutions, medical claims processing, web development, data processing, remote staffing, healthcare BPO, HIPAA compliant",
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
