"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { projects, type SectionId } from "@/lib/portfolio-data"

interface HeroProps {
  onNavigate: (section: SectionId) => void
  onStartTour: () => void
  highlighted: boolean
}

export function Hero({ onNavigate, onStartTour, highlighted }: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const words = ["Software", "engineer.", "IT", "specialist."]
  const transition = { duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" as const }

  return (
    <section className="pf-container pf-hero" id="home" aria-labelledby="hero-title">
      <motion.div
        id="hero-copy"
        className={`pf-hero-copy${highlighted ? " pf-tour-target" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
      >
        <div className="pf-eyebrow">Code meets creativity</div>
        <h1 id="hero-title" tabIndex={-1}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: index * 0.15 }}
              style={{ display: "inline-block" }}
            >
              {word}
              {index < words.length - 1 && <br />}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.6 }}
        >
          Hi, I&apos;m Elvin. A software engineer and IT specialist with 10+ years building web applications, AI-powered tools, and the infrastructure behind them.
        </motion.p>
        <motion.div
          className="pf-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.7 }}
        >
          <a className="pf-btn pf-btn-primary" href="#projects" onClick={(event) => { event.preventDefault(); onNavigate("projects") }}>
            Explore my work <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <button type="button" className="pf-btn pf-btn-quiet" onClick={onStartTour}>
            Take a quick tour <ArrowRight size={18} aria-hidden="true" />
          </button>
        </motion.div>
        <motion.div
          className="pf-hero-shortcuts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.8 }}
        >
          <a className="pf-link" href="#skills" onClick={(event) => { event.preventDefault(); onNavigate("skills") }}>Explore skills →</a>
          <a className="pf-link" href="#contact" onClick={(event) => { event.preventDefault(); onNavigate("contact") }}>Let&apos;s talk ↗</a>
        </motion.div>
        <motion.div
          className="pf-hero-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.9 }}
        >
          {projects.length} projects to explore · From registration to augmented reality
        </motion.div>
      </motion.div>
      <motion.figure
        className="pf-hero-art"
        initial={{ opacity: 0, x: 50, rotate: 1 }}
        animate={{ opacity: 1, x: 0, rotate: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <img src="/mockups/hero-showcase.png" alt="Dark developer workspace with a laptop displaying the red-accented portfolio design concept" width={1376} height={768} fetchPriority="high" />
        <figcaption><span>Behind the build</span><span>Portfolio concept / 01</span></figcaption>
      </motion.figure>
    </section>
  )
}
