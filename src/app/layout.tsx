import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import React from "react";

const noto = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MC Donald's Order System",
  description: "Manage orders with bots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
