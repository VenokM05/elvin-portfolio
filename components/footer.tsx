"use client"

import { profile, type SectionId } from "@/lib/portfolio-data"

export function Footer({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  return (
    <footer className="pf-container pf-footer">
      <div>© {new Date().getFullYear()} {profile.name}. Made with intention.<br />Thoughtful interfaces. Practical solutions.</div>
      <div className="pf-footer-links">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub ↗</a>
        <a href="https://facebook.com/VenokM" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)">Facebook ↗</a>
        <a href="#home" onClick={(event) => { event.preventDefault(); onNavigate("home") }}>Back to top ↑</a>
      </div>
    </footer>
  )
}
