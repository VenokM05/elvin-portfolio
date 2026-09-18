"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { profile, type SectionId } from "@/lib/portfolio-data"

const links: { section: SectionId; label: string }[] = [
  { section: "projects", label: "Selected work" },
  { section: "about", label: "About & skills" },
  { section: "upcoming", label: "What's next" },
  { section: "contact", label: "Contact" },
]

interface NavigationProps {
  onNavigate: (section: SectionId) => void
  onResume: (trigger: HTMLElement) => void
}

export function Navigation({ onNavigate, onResume }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const current = links.filter(({ section }) => {
        const element = document.getElementById(section)
        return element && element.getBoundingClientRect().top <= 160
      }).at(-1)
      setActive(current?.section ?? null)

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update) }
  }, [])

  useEffect(() => {
    if (!open) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); event.preventDefault() }
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 801px)")
    const resize = () => {
      if (desktop.matches) {
        if (document.activeElement === toggle.current || document.activeElement?.classList.contains("pf-mobile-resume")) {
          header.current?.querySelector<HTMLAnchorElement>(".pf-brand")?.focus()
        }
        setOpen(false)
      }
    }
    document.addEventListener("keydown", escape)
    document.addEventListener("pointerdown", outside)
    desktop.addEventListener("change", resize)
    return () => {
      document.removeEventListener("keydown", escape)
      document.removeEventListener("pointerdown", outside)
      desktop.removeEventListener("change", resize)
    }
  }, [open])

  const navigate = (section: SectionId) => { setOpen(false); onNavigate(section) }
  return (
    <header className="pf-header" ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <div className="pf-container pf-header-inner">
        <a className="pf-brand" href="#home" aria-label="Elvin Manuel, back to top" onClick={(event) => { event.preventDefault(); navigate("home") }}>
          <span className="pf-brand-mark" aria-hidden="true">E</span>
          <span>{profile.name}<small>Developer & creative builder</small></span>
        </a>
        <nav id="navigation" className="pf-nav" data-open={open} aria-label="Main navigation">
          {links.map(({ section, label }) => (
            <a key={section} href={`#${section}`} aria-current={active === section ? "location" : undefined}
              onClick={(event) => { event.preventDefault(); navigate(section) }}>{label}</a>
          ))}
          <button type="button" className="pf-btn pf-mobile-resume" onClick={() => {
            setOpen(false)
            if (toggle.current) onResume(toggle.current)
          }}>Resume & profile</button>
        </nav>
        {mounted && (
          <button
            type="button"
            className="pf-btn pf-btn-quiet"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        )}
        <button type="button" className="pf-btn pf-btn-quiet pf-header-cta" onClick={(event) => onResume(event.currentTarget)}>Resume ↗</button>
        <button ref={toggle} type="button" className="pf-btn pf-btn-quiet pf-menu-toggle" aria-controls="navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}{open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
      <motion.div
        className="pf-scroll-progress"
        style={{ scaleX: scrollProgress / 100 }}
        initial={false}
      />
    </header>
  )
}
