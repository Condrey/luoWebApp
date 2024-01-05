import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/app/ThemeProvider";
import { inter } from "@/app/ui/fonts";
import { Toaster } from "@/components/ui/toaster";
import { webPageName } from "@/lib/constants/Constants";
import React from "react";

export const metadata: Metadata = {
  title: { template: `%s | ${webPageName}`, default: webPageName },
  description: "Our Culture, our pride",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="google-adsense-account"
            content="ca-pub-4929810748741761"
          />
          <title></title>
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
