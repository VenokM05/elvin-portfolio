import type { Metadata } from "next"
import { ITPortfolio } from "@/components/it-portfolio"

const title = "IT Specialist | Elvin Manuel"
const description = "Hardware, network administration, software troubleshooting, and AI exploration. Discover Elvin Manuel’s IT expertise in an interactive infrastructure workspace."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/it-specialist" },
  openGraph: { title, description, url: "/it-specialist", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
}

export default function ITSpecialistPage() {
  return <ITPortfolio />
}
