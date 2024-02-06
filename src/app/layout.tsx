import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { OrderContextProvider } from "@/context/OrderContext";
import React from "react";
import { BotContextProvider } from "@/context/BotContext";

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
    <OrderContextProvider>
      <BotContextProvider>
        <html lang="en">
          <body className={noto.className}>{children}</body>
        </html>
      </BotContextProvider>
    </OrderContextProvider>
  );
}
