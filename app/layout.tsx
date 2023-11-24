import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Gabarito, Inter } from "next/font/google"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import NavigationBar from "@/components/navigationBar/NavigationBar"
import { ThemeProvider } from "@/components/themeProvider"
import MobileTimerToast from "@/components/timerToast/MobileTimerToast"

import RootClerkProvider from "./(rootLayout)/ClerkProvider"
import QueryProvider from "./QueryProvider"

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
  creator: "kasban",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <RootClerkProvider>
            <QueryProvider>
              <NavigationBar />
              <MobileTimerToast />
              <div className="flex justify-center pt-4 max-[768px]:px-6 md:space-x-36">
                <div className="w-full max-w-[650px]">{children}</div>
              </div>
            </QueryProvider>
          </RootClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
