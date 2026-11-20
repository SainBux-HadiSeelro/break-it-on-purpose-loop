import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Break-It-On-Purpose | Loop Observability & Failure Diagnosis",
  description:
    "Interactive dashboard for Concept 13 (Token Cost Observability) and Concept 14 (Needs-A-Human Failure Diagnosis) applied to a Daily Digest autonomous loop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
