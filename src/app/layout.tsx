import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CONTENT } from "@/data/content";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Rendezvényárnyékolás",
  description: "Lycra dekor ponyvák bérbeadása rendezvényekre",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer
          brandTagline={CONTENT.footer.brandTagline}
          brandSubline={CONTENT.footer.brandSubline}
          catalogLinks={[...CONTENT.footer.catalogLinks]}
          aboutLinks={[...CONTENT.footer.aboutLinks]}
        />
      </body>
    </html>
  );
}
