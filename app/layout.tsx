import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cybersecurity Portfolio",
  description: "Professional cybersecurity student portfolio with projects and Medium writeup showcase.",
  keywords: ["cybersecurity", "portfolio", "ctf", "penetration testing", "student"],
  openGraph: {
    title: "Cybersecurity Portfolio",
    description: "Projects, certifications, and externally hosted Medium writeups.",
    url: siteUrl,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <head>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen">
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
