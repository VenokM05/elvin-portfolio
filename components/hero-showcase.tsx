"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"

const ROTATE_INTERVAL = 4000
const VISIBLE_CARDS = 3

interface HeroShowcaseProps {
  projects: Project[]
  onSelectProject: (project: Project, trigger: HTMLElement) => void
}

// Hotspot data for the desk scene (#7)
const deskHotspots = [
  { id: "hs-coffee", x: 18, y: 62, label: "Fuel for late-night builds", icon: "\u2615" },
  { id: "hs-notebook", x: 78, y: 35, label: "Where ideas start", icon: "\u{1F4D3}" },
  { id: "hs-phone", x: 82, y: 72, label: "Mobile-first always", icon: "\u{1F4F1}" },
]

export function HeroShowcase({ projects, onSelectProject }: HeroShowcaseProps) {
  const prefersReducedMotion = useReducedMotion()
  const [topIndex, setTopIndex] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const showcaseProjects = projects.slice(0, 6)
  const total = showcaseProjects.length

  const rotate = useCallback(() => {
    if (total <= 1) return
    setTopIndex((prev) => (prev + 1) % total)
  }, [total])

  useEffect(() => {
    if (prefersReducedMotion || total <= 1) return
    timerRef.current = setInterval(rotate, ROTATE_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [rotate, prefersReducedMotion, total])

  const handleCardClick = (index: number, event: React.MouseEvent<HTMLElement>) => {
    if (timerRef.current) clearInterval(timerRef.current)
    const project = showcaseProjects[index]
    if (project) onSelectProject(project, event.currentTarget)
    timerRef.current = setInterval(rotate, ROTATE_INTERVAL)
  }

  // Build the card order: top card first, then fanning out behind
  const cardOrder = Array.from({ length: Math.min(VISIBLE_CARDS, total) }, (_, i) =>
    (topIndex + i) % total
  )

  if (total === 0) return null

  return (
    <div className="pf-hero-showcase">
      {/* Desk scene background (#7) */}
      <div className="pf-hero-desk">
        <img
          src="/developer-desk.png"
          alt="Developer workspace with laptop, coffee, and notebooks"
          className="pf-hero-desk-img"
          loading="eager"
        />
        {/* Interactive hotspots */}
        {deskHotspots.map((hs) => (
          <button
            key={hs.id}
            className={`pf-hero-hotspot${activeHotspot === hs.id ? " active" : ""}`}
            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            onMouseEnter={() => setActiveHotspot(hs.id)}
            onMouseLeave={() => setActiveHotspot(null)}
            onFocus={() => setActiveHotspot(hs.id)}
            onBlur={() => setActiveHotspot(null)}
            aria-label={hs.label}
          >
            <span className="pf-hero-hotspot-dot" />
            <span className="pf-hero-hotspot-tooltip">{hs.icon} {hs.label}</span>
          </button>
        ))}
      </div>

      {/* Stacked card carousel (#3 + #4) */}
      <div className="pf-hero-cards">
        {cardOrder.map((projectIndex, stackPos) => {
          const project = showcaseProjects[projectIndex]
          const isTop = stackPos === 0
          return (
            <motion.button
              key={project.id}
              className={`pf-hero-card${isTop ? " pf-hero-card-top" : ""}`}
              style={{
                zIndex: VISIBLE_CARDS - stackPos,
                "--stack-offset": stackPos,
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isTop ? 1 : 0.5 - stackPos * 0.12,
                y: stackPos * 12,
                x: stackPos * 8,
                rotate: stackPos * -2,
                scale: 1 - stackPos * 0.04,
              }}
              transition={prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: "easeOut" }}
              onClick={(e) => isTop && handleCardClick(projectIndex, e)}
              tabIndex={isTop ? 0 : -1}
              aria-label={isTop ? `View ${project.title}` : undefined}
            >
              <div className="pf-hero-card-chrome">
                <div className="pf-hero-card-dots">
                  <span /><span /><span />
                </div>
                <span className="pf-hero-card-url">{project.tags[0] ?? "project"}</span>
              </div>
              <div className="pf-hero-card-body">
                <img
                  src={project.image}
                  alt={project.title}
                  className="pf-hero-card-img"
                  loading={isTop ? "eager" : "lazy"}
                />
                {isTop && (
                  <div className="pf-hero-card-label">
                    <span className="pf-hero-card-title">{project.title}</span>
                    <span className="pf-hero-card-tag">{project.label}</span>
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}

        {/* Carousel indicator dots */}
        <div className="pf-hero-dots">
          {showcaseProjects.map((_, i) => (
            <span
              key={i}
              className={`pf-hero-dot${i === topIndex ? " active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
