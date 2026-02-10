import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeedForge - Data Feeding Portal",
  description: "Data feeding and management portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


