import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ridamgrover.dev"),
  title: "Ridam Grover — Full-Stack Engineer & Freelance Developer",
  description:
    "Portfolio of Ridam Grover — Full-Stack Engineer & Freelance Developer building high-performance Next.js platforms, cross-platform mobile apps (iOS & Android with store approvals), and scalable cloud backends.",
  openGraph: {
    title: "Ridam Grover — Full-Stack Engineer & Freelance Developer",
    description:
      "Full-stack web & mobile apps engineer building production-grade software for founders and growing businesses.",
    url: "https://ridamgrover.dev",
    siteName: "Ridam Grover",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridam Grover — Full-Stack Engineer & Freelance Developer",
    description:
      "Full-stack web & mobile apps engineer building production-grade software for founders and growing businesses.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#060709] text-[#f4f4f6] selection:bg-orange-500/30 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
