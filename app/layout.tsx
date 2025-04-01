import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Use swap to prevent FOIT (Flash of Invisible Text)
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Andrew Mponin | Agrifood Systems Advocate",
  description: "Portfolio showcasing work in climate resilience and agrifood systems",
  viewport: "width=device-width, initial-scale: 1, maximum-scale=5",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andrewmponin.com",
    title: "Andrew Mponin | Agrifood Systems Advocate",
    description: "Portfolio showcasing work in climate resilience and agrifood systems",
    siteName: "Andrew Mponin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Andrew Mponin - Agrifood Systems Advocate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Mponin | Agrifood Systems Advocate",
    description: "Portfolio showcasing work in climate resilience and agrifood systems",
    images: ["/twitter-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1589793907316-f94025b46850?q=80&w=1920&auto=format&fit=crop"
          as="image"
          type="image/jpeg"
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Script to prevent theme flash and handle transitions */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            // Get stored theme or default to system
            const theme = localStorage.getItem('portfolio-theme') || 'system';
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const resolvedTheme = theme === 'system' ? systemTheme : theme;
            
            // Apply theme immediately to prevent flash
            document.documentElement.classList.add(resolvedTheme);
            
            // Handle theme transitions
            document.documentElement.classList.add('disable-transitions');
            window.setTimeout(function() {
              document.documentElement.classList.remove('disable-transitions');
            }, 0);
            
            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
              if (theme === 'system') {
                document.documentElement.classList.add('disable-transitions');
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(e.matches ? 'dark' : 'light');
                window.setTimeout(function() {
                  document.documentElement.classList.remove('disable-transitions');
                }, 0);
              }
            });
          })();
        `,
          }}
        />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'