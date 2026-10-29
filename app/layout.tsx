import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEQVAULT | Tech mentorship  bootcamp",
  description: "Build your future in eight focused weeks with TEQVAULT.",
  metadataBase: new URL("https://learn.teqvault.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TEQVAULT |  Learn a tech skill",
    description: "Build your future  with TEQVAULT.",
    url: "https://learn.teqvault.app/",
    siteName: "TEQVAULT Academy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TEQVAULT | Build your tech career",
    description: "Build your future  with TEQVAULT .",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
