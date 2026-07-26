import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Keylhan Paumard--André — tinkering with AI from a Linux box in Paris",
  description:
    "Keylhan (keypaa) — engineering student at EFREI Paris. Reverse-engineering AI tools, building local-first tinkering, reading widely. Notes, reading log, and experiments.",
  keywords: [
    "Keylhan",
    "keypaa",
    "AI",
    "reverse engineering",
    "llama.cpp",
    "Claude Code",
    "EFREI Paris",
    "experiments",
    "reading log",
  ],
  authors: [{ name: "Keylhan Paumard--André" }],
  creator: "Keylhan Paumard--André",
  openGraph: {
    title: "Keylhan — tinkering with AI from Paris",
    description:
      "Reading log, experiments, and notes from a Linux-box AI tinkerer at EFREI Paris.",
    siteName: "keypaa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Keylhan — tinkering with AI from Paris",
    description:
      "Reading log, experiments, and notes from a Linux-box AI tinkerer at EFREI Paris.",
    creator: "@keylhan_p",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jbMono.variable} ${fraunces.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
