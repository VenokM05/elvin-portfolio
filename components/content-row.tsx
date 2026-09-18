"use client"

import { useRef } from "react"
import { Search } from "lucide-react"
import { RowCard } from "./row-card"
import { filterProjects, projectFilters, type Project, type ProjectFilter } from "@/lib/portfolio-data"

interface ContentRowProps {
  items: Project[]
  category: ProjectFilter
  query: string
  onFilter: (category: ProjectFilter, query: string) => void
  onSelect: (project: Project, trigger: HTMLElement) => void
  highlighted: boolean
}

export function ContentRow({ items, category, query, onFilter, onSelect, highlighted }: ContentRowProps) {
  const visible = filterProjects(items, category, query)
  const search = useRef<HTMLInputElement>(null)
  return (
    <section className="pf-container pf-section" id="projects" aria-labelledby="projects-title">
      <div id="projects-heading" className={`pf-heading${highlighted ? " pf-tour-target" : ""}`}>
        <div>
          <div className="pf-eyebrow">A collection of things I&apos;ve built</div>
          <div className="pf-title-line">
            <h2 id="projects-title" tabIndex={-1}>Selected work</h2>
            <span className="pf-count">{items.length} projects</span>
          </div>
        </div>
        <p>Real projects, different challenges. Browse by type, explore the details, or visit a live site.</p>
      </div>
      <div className="pf-tools">
        <div className="pf-filters" role="group" aria-label="Filter projects by type">
          {projectFilters.map((filter) => (
            <button type="button" className="pf-filter" key={filter.value} aria-pressed={category === filter.value}
              aria-controls="project-grid" onClick={() => onFilter(filter.value, query)}>{filter.label}</button>
          ))}
        </div>
        <label className="pf-search">
          <Search size={17} aria-hidden="true" /><span className="sr-only">Search projects or technologies</span>
          <input ref={search} id="project-search" type="search" placeholder="Search projects or tech…" autoComplete="off"
            maxLength={100} value={query} onChange={(event) => onFilter(category, event.target.value)} aria-controls="project-grid" />
        </label>
      </div>
      <p className="pf-results" role="status" aria-atomic="true">Showing {visible.length} of {items.length} projects{query.trim() ? ` matching “${query.trim()}”` : ""}.</p>
      <div className="pf-grid" id="project-grid">
        {visible.map((project) => <RowCard key={project.id} project={project} index={items.indexOf(project)} onSelect={onSelect} />)}
      </div>
      {visible.length === 0 && (
        <div className="pf-empty">
          <h3>No projects found</h3><p>Try another name, technology, or category.</p>
          <button type="button" className="pf-btn" onClick={() => { onFilter("all", ""); search.current?.focus() }}>Reset filters</button>
        </div>
      )}
      <noscript><p>Enable JavaScript to filter projects and use the guide. All live project links remain available above.</p></noscript>
    </section>
  )
}
