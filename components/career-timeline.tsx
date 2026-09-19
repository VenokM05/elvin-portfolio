"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { careerTimeline } from "@/lib/portfolio-data"

export function CareerTimeline() {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="pf-timeline-scroll" ref={scrollRef}>
      <div className="pf-timeline" role="list" aria-label="Career timeline">
        <div className="pf-timeline-line" aria-hidden="true" />
        {careerTimeline.map((entry, index) => (
          <TimelineItem key={entry.year} entry={entry} index={index} reduced={prefersReducedMotion ?? false} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ entry, index, reduced }: { entry: typeof careerTimeline[number]; index: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }

  return (
    <motion.div
      ref={ref}
      className="pf-timeline-item"
      role="listitem"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={transition}
    >
      <div className="pf-timeline-dot" aria-hidden="true">
        <span className="pf-timeline-icon">{entry.icon}</span>
      </div>
      <div className="pf-timeline-content">
        <span className="pf-timeline-year">{entry.year}</span>
        <h4 className="pf-timeline-title">{entry.title}</h4>
        <p className="pf-timeline-desc">{entry.description}</p>
      </div>
    </motion.div>
  )
}
