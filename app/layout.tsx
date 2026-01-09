import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "OwningDubai - Find Your Dream Property in Dubai",
  description: "Discover luxury properties, off-plan developments, and real estate opportunities in Dubai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
