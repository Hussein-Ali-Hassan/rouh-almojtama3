import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "روح المجتمع",
  description: "أرشيف جلسات مناقشة كتاب روح المجتمع",
  openGraph: {
    type: "website",
    locale: "ar",
    url: "https://rouh-almojtama3.com",
    title: "روح المجتمع",
    description: "جلسات مناقشة كتاب روح المجتمع",
    siteName: "روح المجتمع",
    images: [
      {
        url: "https://rouh-almojtama3.com/hero.jpg",
        width: 1200,
        height: 630,
        alt: "روح المجتمع",
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
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
