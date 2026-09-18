"use client"

import { ArrowUpRight, ArrowRight } from "lucide-react"
import { projects, type SectionId } from "@/lib/portfolio-data"

interface HeroProps {
  onNavigate: (section: SectionId) => void
  onStartTour: () => void
  highlighted: boolean
}

export function Hero({ onNavigate, onStartTour, highlighted }: HeroProps) {
  return (
    <section className="pf-container pf-hero" id="home" aria-labelledby="hero-title">
      <div id="hero-copy" className={`pf-hero-copy${highlighted ? " pf-tour-target" : ""}`}>
        <div className="pf-eyebrow">Code meets creativity</div>
        <h1 id="hero-title" tabIndex={-1}>
          Designing<br />experiences.<br />Building <span>futures.</span>
        </h1>
        <p>Hi, I&apos;m Elvin. A full-stack developer turning ideas into thoughtful websites, useful applications, and interactive experiences.</p>
        <div className="pf-hero-actions">
          <a className="pf-btn pf-btn-primary" href="#projects" onClick={(event) => { event.preventDefault(); onNavigate("projects") }}>
            Explore my work <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <button type="button" className="pf-btn pf-btn-quiet" onClick={onStartTour}>
            Take a quick tour <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="pf-hero-shortcuts">
          <a className="pf-link" href="#skills" onClick={(event) => { event.preventDefault(); onNavigate("skills") }}>Explore skills →</a>
          <a className="pf-link" href="#contact" onClick={(event) => { event.preventDefault(); onNavigate("contact") }}>Let&apos;s talk ↗</a>
        </div>
        <div className="pf-hero-note">{projects.length} projects to explore · From registration to augmented reality</div>
      </div>
      <figure className="pf-hero-art">
        <img src="/mockups/hero-showcase.png" alt="Dark developer workspace with a laptop displaying the red-accented portfolio design concept" width={1376} height={768} fetchPriority="high" />
        <figcaption><span>Behind the build</span><span>Portfolio concept / 01</span></figcaption>
      </figure>
    </section>
  )
}
