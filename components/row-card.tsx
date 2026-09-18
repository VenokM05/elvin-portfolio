"use client"

import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"

interface RowCardProps {
  project: Project
  index: number
  onSelect: (project: Project, trigger: HTMLElement) => void
}

export function RowCard({ project, index, onSelect }: RowCardProps) {
  return (
    <article className="pf-card" aria-labelledby={`project-${project.id}`}>
      <div className="pf-preview">
        <img src={project.image} alt={`${project.title} preview`} width={720} height={390} loading="lazy" />
        <span className="pf-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="pf-card-body">
        <span className="pf-category">{project.label}</span>
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        <p className="pf-description">{project.description}</p>
        <ul className="pf-tags" aria-label="Technologies">
          {project.tags.slice(0, 3).map((tag) => <li className="pf-tag" key={tag}>{tag}</li>)}
          {project.tags.length > 3 && <li className="pf-tag" aria-label={`${project.tags.length - 3} more technologies in project details`}>+{project.tags.length - 3}</li>}
        </ul>
        <div className="pf-card-actions">
          <button type="button" onClick={(event) => onSelect(project, event.currentTarget)} aria-label={`Explore ${project.title}`} aria-haspopup="dialog">Explore project →</button>
          <a className="pf-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}>
            Live site <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
