import type { Metadata } from "next"
import "./globals.css"
import { Footer } from "./components/footer"
import { NavigationWrapper } from "./components/client-wrappers/navigation-wrapper"

export const metadata: Metadata = {
  title: "Destination Malgas",
  description: "Your comprehensive service provider in Malgas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NavigationWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}