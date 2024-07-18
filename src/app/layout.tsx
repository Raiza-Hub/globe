import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import  SiteFooter  from "@/components/site-footer";
import { siteConfig } from "@/components/site-config";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@/components/analytics";


const source_san_3 = Source_Sans_3({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Globe",
    "Country",
    "World Map",
    "Continent",
    "Climate",
    "Currencies",
  ],
  authors: [
    {
      name: "Raiza-Hub",
      url: "http://localhost:3000",
    },
  ],
  creator: "Raiza-Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Raiza-Hub",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        'min-h-screen antialiased',
        source_san_3.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
            <div className="relative flex min-h-screen flex-col pt-12 mx-auto">
              {children}
            </div>
          </Providers>
          <SiteFooter />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
