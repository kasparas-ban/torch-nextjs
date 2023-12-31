import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import NavigationBar from "@/components/navigationBar/NavigationBar"
import { ThemeProvider } from "@/components/themeProvider"
import MobileTimerToast from "@/components/timerToast/MobileTimerToast"
import MainBackgroundGradient from "@/public/images/background_gradient.svg"
import BackgroundGradient from "@/public/images/header_background.svg"

import AuthProvider from "./(rootLayout)/AuthProvider"
import BackgroundScaleWrapper from "./(rootLayout)/BackgroundScaleWrapper"
import QueryProvider from "./(rootLayout)/QueryProvider"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

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
          "min-h-screen overflow-x-hidden bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="pointer-events-none absolute right-1/2 top-0 z-[-1] w-[calc(100vw-30%)] min-w-[720px] max-w-[900px] translate-x-3/4 rotate-90 opacity-90 max-[600px]:hidden">
          <MainBackgroundGradient />
        </div>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <QueryProvider>
            <BackgroundScaleWrapper>
              <AuthProvider>
                <NavigationBar />
                <MobileTimerToast />
                <div className="flex justify-center pt-4 max-[768px]:px-6 md:space-x-36">
                  <div className="w-full max-w-[850px]">{children}</div>
                </div>
              </AuthProvider>
            </BackgroundScaleWrapper>
          </QueryProvider>
        </ThemeProvider>
        <Toaster />

        <footer className="relative mx-auto mb-4 max-w-[850px] text-center text-sm text-gray-800">
          <div className="pointer-events-none absolute bottom-[-16px] right-1/2 z-[-1] w-[calc(100vw-30%)] min-w-[720px] max-w-[900px] translate-x-1/2 rotate-180 opacity-90 max-[600px]:hidden">
            <BackgroundGradient />
          </div>
          Copyright: © 2023 Torch App. All Rights Reserved.
        </footer>
      </body>
    </html>
  )
}
