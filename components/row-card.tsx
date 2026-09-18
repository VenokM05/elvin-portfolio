"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"
import { ScreenshotButton } from "./screenshot-viewer"

interface RowCardProps {
  project: Project
  index: number
  onSelect: (project: Project, trigger: HTMLElement) => void
  onViewScreenshot: (project: Project) => void
}

export function RowCard({ project, index, onSelect, onViewScreenshot }: RowCardProps) {
  return (
    <motion.article
      className="pf-card"
      aria-labelledby={`project-${project.id}`}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="pf-preview">
        <motion.img
          src={project.image}
          alt={`${project.title} preview`}
          width={720}
          height={390}
          loading="lazy"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />
        <span className="pf-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="pf-card-body">
        <span className="pf-category">{project.label}</span>
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        <p className="pf-description">{project.description}</p>
        <ul className="pf-tags" aria-label="Technologies">
          {project.tags.slice(0, 3).map((tag, i) => (
            <motion.li
              className="pf-tag"
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.05, ease: "easeOut" as const }}
            >{tag}</motion.li>
          ))}
          {project.tags.length > 3 && (
            <motion.li
              className="pf-tag"
              aria-label={`${project.tags.length - 3} more technologies in project details`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.1 + 3 * 0.05, ease: "easeOut" as const }}
            >+{project.tags.length - 3}</motion.li>
          )}
        </ul>
        <div className="pf-card-actions">
          <button type="button" onClick={(event) => onSelect(project, event.currentTarget)} aria-label={`Explore ${project.title}`} aria-haspopup="dialog">Explore project →</button>
          <ScreenshotButton project={project} onViewScreenshot={onViewScreenshot} />
          {project.link && (
            <a className="pf-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}>
              Live site <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
