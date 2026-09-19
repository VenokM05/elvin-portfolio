import type { Metadata } from "next"
import { DeveloperPortfolio } from "@/components/developer-portfolio"

const title = "Full Stack Web Developer | Elvin Manuel"
const description = "Explore Elvin Manuel’s web applications, development process, full-stack skills, and local-first AI projects. From code and logic to finished experiences."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/full-stack-developer" },
  openGraph: { title, description, url: "/full-stack-developer", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
}

export default function FullStackDeveloperPage() {
  return <DeveloperPortfolio />
}
