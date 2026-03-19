import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ModeProvider } from "@/components/ui/ModeProvider";
import { ModalProvider } from "@/components/ui/ModalProvider";
import ProjectModal from "@/components/ui/ProjectModal";
import LazyChat from "@/components/ui/LazyChat";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ModeProvider>
          <ModalProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ProjectModal />
            <LazyChat />
          </ModalProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
