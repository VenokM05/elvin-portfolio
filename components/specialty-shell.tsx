"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Braces, Download, Mail, Network, PhoneCall } from "lucide-react"
import { profile } from "@/lib/portfolio-data"

export type Specialty = "developer" | "it"

export function SpecialtyShell({ kind, children }: { kind: Specialty; children: ReactNode }) {
  const developer = kind === "developer"
  return (
    <div className={`sp sp-${kind}`}>
      <a className="sp-skip" href="#specialty-main">Skip to content</a>
      <header className="sp-header">
        <div className="sp-container sp-header-inner">
          <Link href="/" className="sp-brand" aria-label="Elvin Manuel, portfolio home">
            <span className="sp-brand-icon">{developer ? <Braces size={21} /> : <Network size={21} />}</span>
            <span>{profile.name}<small>{developer ? "The development workspace" : "The infrastructure workspace"}</small></span>
          </Link>
          <nav className="sp-switch" aria-label="Choose a portfolio">
            <Link href="/full-stack-developer" aria-current={developer ? "page" : undefined}><Braces size={14} aria-hidden="true" />Full Stack Developer</Link>
            <Link href="/it-specialist" aria-current={!developer ? "page" : undefined}><Network size={14} aria-hidden="true" />IT Specialist</Link>
          </nav>
          <div className="sp-header-actions">
            <Link href="/" className="sp-btn sp-btn-quiet sp-header-back" aria-label="Back to Main Portfolio" title="Back to Main Portfolio">
              <ArrowLeft size={15} aria-hidden="true" /><span className="sp-header-back-label">Back to Main Portfolio</span>
            </Link>
            <a className="sp-link sp-resume" href={profile.resume} target="_blank" rel="noopener noreferrer"><Download size={14} aria-hidden="true" />Resume</a>
            <a className="sp-btn sp-btn-primary" href="#specialty-contact"><span className="sp-contact-label">Let&apos;s talk</span><ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">Contact Elvin</span></a>
          </div>
        </div>
      </header>
      <main id="specialty-main" tabIndex={-1}>{children}</main>
      <section id="specialty-contact" className="sp-container sp-contact" aria-labelledby="specialty-contact-title">
        <div>
          <div className="sp-eyebrow"><span className="sp-dot" />Next, let&apos;s work together</div>
          <h2 id="specialty-contact-title">{developer ? "Have an idea? Let’s build it." : "Good technology. Fewer headaches."}</h2>
          <p>{developer ? "From the first line of logic to the final experience. Tell me what you have in mind." : "Hardware, networks, or the software between them. Let’s talk about what your team needs."}</p>
        </div>
        <div className="sp-actions">
          <a className="sp-btn sp-btn-primary" href={`mailto:${profile.email}?subject=${encodeURIComponent(developer ? "Full Stack Development Inquiry" : "IT Specialist Inquiry")}`}><Mail size={16} aria-hidden="true" />Start a conversation</a>
          <a className="sp-btn sp-btn-quiet" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </section>
      <footer className="sp-container sp-footer">
        <span>© {new Date().getFullYear()} {profile.name} · {developer ? "Built with logic. Made for people." : "People first. Systems second."}</span>
        <nav aria-label="Footer navigation">
          <Link href="/"><ArrowLeft size={12} className="inline" aria-hidden="true" /> Main portfolio</Link>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
        </nav>
      </footer>
    </div>
  )
}

export function SpecialtyBreadcrumb({ label }: { label: string }) {
  return <nav className="sp-breadcrumb" aria-label="Breadcrumb"><Link href="/">Portfolio</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span></nav>
}

export function SectionHeading({ number, title, description, id }: { number: string; title: string; description?: string; id: string }) {
  return <div className="sp-section-head"><div><div className="sp-eyebrow">{number}</div><h2 id={id}>{title}</h2></div>{description && <p>{description}</p>}</div>
}

export function SpecialtyQuickContact() {
  return (
    <div className="sp-quick-contact">
      <a className="sp-quick-contact-link" href={`viber://chat?number=${encodeURIComponent(profile.viber.number)}`} title="Open a chat in Viber (Viber app required)" aria-label={`Viber: ${profile.viber.display} (opens Viber)`}>
        <PhoneCall size={18} aria-hidden="true" />
        <span><small>Viber</small>{profile.viber.display}</span>
      </a>
      <a className="sp-quick-contact-link" href={`mailto:${profile.email}`} aria-label={`Email: ${profile.email} (opens your mail app)`}>
        <Mail size={18} aria-hidden="true" />
        <span><small>Email</small>{profile.email}</span>
      </a>
    </div>
  )
}
