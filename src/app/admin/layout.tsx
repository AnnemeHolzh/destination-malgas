import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Admin Dashboard - Destination Malgas",
  description: "Admin dashboard for managing Destination Malgas content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
} 