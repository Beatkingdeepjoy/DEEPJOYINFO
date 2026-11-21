import "@/lib/react19-polyfill";
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { ClientWidgets } from "@/components/motion/ClientWidgets";

export const viewport: Viewport = {
  themeColor: "#05050A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Deepjoy Bhowmik | 3D Portfolio & YouTube Platform",
  description:
    "Official portfolio and YouTube brand platform of Deepjoy Bhowmik. Full-Stack Developer, Google Student Ambassador (Gemini AI), and student vlogger from Agartala, Tripura, India.",
  keywords: [
    "Deepjoy Bhowmik",
    "Full-Stack Developer",
    "Agartala",
    "Tripura",
    "ICFAI University Tripura",
    "Google Student Ambassador",
    "Gemini AI",
    "YouTuber",
    "SHUDH DESI",
    "AroWeather",
    "Code Charcha",
    "Beatkingdeepjoy",
  ],
  authors: [{ name: "Deepjoy Bhowmik", url: "https://github.com/Beatkingdeepjoy" }],
  creator: "Deepjoy Bhowmik",
  metadataBase: new URL("https://deepjoy.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deepjoy.dev",
    title: "Deepjoy Bhowmik | 3D Portfolio & YouTube Platform",
    description: "I build the web by night and film the journey by day. Coding is my hobby, vlogging is my passion.",
    siteName: "Deepjoy Bhowmik Brand Platform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deepjoy Bhowmik 3D Portfolio Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepjoy Bhowmik | 3D Portfolio & YouTube Platform",
    description: "I build the web by night and film the journey by day.",
    creator: "@deepjoybhowmik",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deepjoy Bhowmik",
    url: "https://deepjoy.dev",
    jobTitle: "Full-Stack Developer & Google Student Ambassador",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agartala",
      addressRegion: "Tripura",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "ICFAI University Tripura",
    },
    sameAs: [
      "https://github.com/Beatkingdeepjoy",
      "https://www.linkedin.com/in/deepjoy-bhowmik-692451320/",
      "https://www.youtube.com/@deepjoybhowmikofficial",
      "https://leetcode.com/u/beatking_deepjoy/",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-night-950 text-foreground font-sans antialiased selection:bg-accent-violet selection:text-white" suppressHydrationWarning>
        <ClientWidgets>
          {children}
        </ClientWidgets>
      </body>
    </html>
  );
}
