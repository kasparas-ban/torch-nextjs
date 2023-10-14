import "@/styles/globals.css"

import type { Metadata } from "next"
import { Gabarito, Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import NavigationBar from "@/components/navigationBar/NavigationBar"
import { ThemeProvider } from "@/components/themeProvider"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontGabarito = Inter({ subsets: ["latin"], variable: "--font-title" })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Pomorodo",
    "Productivity",
    "Goal tracking",
    "Boost productivity",
    "Study",
  ],
  authors: [
    {
      name: "kasparas",
      url: "https://kasparas-ban.info",
    },
  ],
  creator: "kasparas",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  metadataBase: new URL(`${siteConfig.url}`),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <NavigationBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
