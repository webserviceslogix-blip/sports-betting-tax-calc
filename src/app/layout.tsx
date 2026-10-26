import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
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
  metadataBase: new URL("https://bettaxcalc.com"),
  title: {
    default: "Sports Betting Tax Calculator 2026 | Federal & State Tax Estimator",
    template: "%s | BetTaxCalc",
  },
  description:
    "Free sports betting tax calculator for 2026. Calculate federal and state taxes on gambling winnings, including the new OBBBA 90% loss deduction cap and phantom income. All 50 states covered.",
  keywords: [
    "sports betting tax calculator",
    "gambling winnings tax calculator",
    "sports betting taxes 2026",
    "OBBBA gambling loss deduction",
    "phantom income gambling",
    "W-2G threshold 2026",
    "gambling tax by state",
    "parlay tax calculator",
  ],
  authors: [{ name: "BetTaxCalc" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BetTaxCalc",
    title: "Sports Betting Tax Calculator 2026 | Federal & State Tax Estimator",
    description:
      "Free sports betting tax calculator for 2026. Calculate federal and state taxes including the new OBBBA 90% loss deduction cap.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "BetTaxCalc — Sports Betting Tax Calculator 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Betting Tax Calculator 2026",
    description:
      "Calculate your sports betting taxes for all 50 states. Updated for 2026 OBBBA rules.",
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        {/* Google tag (gtag.js) - GA4 BetTaxCalc G-RBJ67L6QQT */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RBJ67L6QQT"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RBJ67L6QQT');
          `}
        </Script>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BetTaxCalc",
              url: "https://bettaxcalc.com",
              description:
                "Free sports betting tax calculators for all 50 US states. Updated for 2026 tax law changes.",
              foundingDate: "2026",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white antialiased">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
