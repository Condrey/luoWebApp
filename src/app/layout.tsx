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
  twitter: {
    card: "summary_large_image",
    title: `${webPageName}`,
    description: "Our Culture, our pride",
    siteId: "prj_d4PDRB6i4wuGVk09avCeQ2k4K8MX",
    creator: "@ogwaangcoondrey",
    // creatorId: "1467726470533754880",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/stadium_construction.jfif?alt=media&token=906cf9da-9f6f-468f-ad44-a69af32b76d3",
    ], // Must be an absolute URL
  },
  appleWebApp: {
    title: webPageName,
    statusBarStyle: "black-translucent",
    startupImage: [
      "/opengraph-image.png",
      {
        url: "/opengraph-image.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
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
