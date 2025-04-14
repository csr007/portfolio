// Author: //sathwikreddychelemela
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { poppins } from './fonts';

import Chatbot from "@/components/main/chatbot";
import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = {
  title: "Sathwik Reddy",
  description: "Portfolio website of Sathwik Reddy",
  authors: [{ name: "//sathwikreddychelemela" }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <StarsCanvas />
        <Navbar />
        <Chatbot />
        {children}
        <Footer />
      </body>
    </html>
  );
}
