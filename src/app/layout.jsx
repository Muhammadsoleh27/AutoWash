"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Side_bar from "@/widgets/side-bar/side-bar";
import ClientWrapper from "@/components/clientWrapper/clientWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [checkToken, setCheckToken] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access_token") == null) {
      setCheckToken(false);
    } else {
      setCheckToken(true);
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex gap-14 items-start relative`}
      >
        {checkToken ? (
          <>
            <Side_bar />
            {children}
            <Toaster richColors position="bottom-right" />
          </>
        ) : (
          <ClientWrapper>{children}</ClientWrapper>
        )}
      </body>
    </html>
  );
}
