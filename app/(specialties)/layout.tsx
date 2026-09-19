import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./specialties.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://elvin-portfolio-murex.vercel.app"),
}

export default function SpecialtyLayout({ children }: { children: ReactNode }) {
  return children
}
