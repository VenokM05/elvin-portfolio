"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, Keyboard } from "lucide-react"

const shortcuts = [
  { keys: ["?"], description: "Show this help" },
  { keys: ["Esc"], description: "Close modals & end tour" },
  { keys: ["J"], description: "Scroll to next section" },
  { keys: ["K"], description: "Scroll to previous section" },
  { keys: ["T"], description: "Start the guided tour" },
  { keys: ["H"], description: "Go to home section" },
  { keys: ["D"], description: "Toggle dark/light mode" },
]

const sections = ["home", "projects", "about", "timeline", "upcoming", "contact"]

interface KeyboardShortcutsProps {
  onStartTour: () => void
  onNavigate: (section: string) => void
}

export function KeyboardShortcuts({ onStartTour, onNavigate }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      if (isOpen) {
        if (e.key === "Escape") { e.preventDefault(); setIsOpen(false) }
        return
      }

      if (e.key === "t" || e.key === "T") {
        e.preventDefault()
        onStartTour()
        return
      }

      if (e.key === "h" || e.key === "H") {
        e.preventDefault()
        onNavigate("home")
        return
      }

      if (e.key === "j" || e.key === "J") {
        e.preventDefault()
        setSectionIndex((prev) => {
          const next = Math.min(prev + 1, sections.length - 1)
          onNavigate(sections[next])
          return next
        })
        return
      }

      if (e.key === "k" || e.key === "K") {
        e.preventDefault()
        setSectionIndex((prev) => {
          const next = Math.max(prev - 1, 0)
          onNavigate(sections[next])
          return next
        })
        return
      }

      if (e.key === "d" || e.key === "D") {
        e.preventDefault()
        const html = document.documentElement
        const current = html.getAttribute("data-theme") ?? html.classList.contains("dark") ? "dark" : "light"
        html.setAttribute("data-theme", current === "dark" ? "light" : "dark")
        html.classList.toggle("dark")
        return
      }

      // Track current section based on scroll position
      const scrollHandler = () => {
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i])
          if (el && el.getBoundingClientRect().top <= 160) {
            setSectionIndex(i)
            break
          }
        }
      }
      window.addEventListener("scroll", scrollHandler, { passive: true })
      return () => window.removeEventListener("scroll", scrollHandler)
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onStartTour, onNavigate])

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" as const }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pf-shortcuts-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={() => setIsOpen(false)}
            role="presentation"
          >
            <motion.div
              className="pf-shortcuts-panel"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={transition}
              role="dialog"
              aria-modal="true"
              aria-label="Keyboard shortcuts"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pf-shortcuts-header">
                <Keyboard size={18} aria-hidden="true" />
                <h3>Keyboard shortcuts</h3>
                <button type="button" className="pf-shortcuts-close" onClick={() => setIsOpen(false)} aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <ul className="pf-shortcuts-list">
                {shortcuts.map(({ keys, description }) => (
                  <li key={keys[0]}>
                    <div className="pf-shortcuts-keys">
                      {keys.map((key) => <kbd key={key}>{key}</kbd>)}
                    </div>
                    <span>{description}</span>
                  </li>
                ))}
              </ul>
              <p className="pf-shortcuts-hint">Press <kbd>?</kbd> to toggle this panel</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
