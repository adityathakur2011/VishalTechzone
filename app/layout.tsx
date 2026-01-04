import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishal Techzone",
  description: "Official website and content platform for Vishal Techzone",
  keywords: [
    "vishaltechzone",
    "crypto",
    "stock picks",
    "investing",
    "trading",
    "analysis",
    "finance",
  ],
  authors: [{ name: "Vishal Tech" }],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#111827" }],
  openGraph: {
    title: "Vishal Techzone",
    description: "Official website and content platform for Vishal Techzone",
    url: "https://vishaltechzone.com",
    siteName: "Vishal Techzone",
    images: [
      {
        url: "https://vishaltechzone.com/asset/img/home_profile.webp",
        width: 1200,
        height: 630,
        alt: "Vishal Techzone",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Techzone",
    description: "Official website and content platform for Vishal Techzone",
    images: ["/asset/img/home_profile.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const resolvedTheme = theme === 'system' ? systemTheme : theme;
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* JSON-LD Organization schema for SEO & Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VishalTechZone",
              "url": "https://vishaltechzone.com",
              "logo": "https://vishaltechzone.com/logo.svg",
              "sameAs": [
                "https://twitter.com/vishaltechzone",
                "https://www.youtube.com/@vishaltechzone",
                "https://www.linkedin.com/company/vishaltechzone"
              ],
              "contactPoint": [{
                "@type": "ContactPoint",
                "email": "contact@vishaltechzone.com",
                "contactType": "customer support",
                "availableLanguage": ["English"]
              }]
            })
          }}
        />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

