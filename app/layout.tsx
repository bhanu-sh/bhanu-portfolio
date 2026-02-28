import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhanu | Premium Portfolio",
  description: "A professional portfolio showcasing my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} font-sans antialiased bg-black text-white`}
      >
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
