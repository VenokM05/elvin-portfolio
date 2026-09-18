"use client"

import { useEffect, useRef } from "react"
import { tourSteps } from "@/lib/portfolio-guide"

interface PortfolioTourProps {
  index: number
  onChange: (index: number) => void
  onEnd: () => void
}

export function PortfolioTour({ index, onChange, onEnd }: PortfolioTourProps) {
  const next = useRef<HTMLButtonElement>(null)
  const step = tourSteps[index]
  useEffect(() => { next.current?.focus({ preventScroll: true }) }, [])
  useEffect(() => {
    const target = document.getElementById(step.target)
    target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })
  }, [step])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onEnd() }
    }
    document.addEventListener("keydown", escape)
    return () => document.removeEventListener("keydown", escape)
  }, [onEnd])

  return (
    <aside className="pf-tour-panel" aria-label="Portfolio tour">
      <div aria-live="polite" aria-atomic="true">
        <span className="pf-tour-step">Quick tour · {index + 1} of {tourSteps.length}</span>
        <h2>{step.title}</h2><p>{step.text}</p>
      </div>
      <div className="pf-tour-controls">
        <button className="pf-btn pf-btn-quiet" type="button" onClick={onEnd}>End tour</button>
        <div>
          <button className="pf-btn pf-btn-quiet" type="button" disabled={index === 0} onClick={() => {
            // Move focus before disabling the focused Back button on the first step.
            if (index === 1) next.current?.focus({ preventScroll: true })
            onChange(index - 1)
          }}>Back</button>
          <button ref={next} className="pf-btn pf-btn-primary" type="button" onClick={() => {
            if (index === tourSteps.length - 1) onEnd()
            else onChange(index + 1)
          }}>{index === tourSteps.length - 1 ? "Finish" : "Next →"}</button>
        </div>
      </div>
    </aside>
  )
}
