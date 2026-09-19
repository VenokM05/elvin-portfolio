"use client"

import { ArrowRight, ArrowUpRight, Braces, Search } from "lucide-react"
import { filterProjects, projectFilters, type Project, type ProjectFilter } from "@/lib/portfolio-data"
import { SectionHeading } from "@/components/specialty-shell"

interface SpecialtyProjectsProps {
  items: Project[]
  category: ProjectFilter
  query: string
  onFilter: (category: ProjectFilter, query: string) => void
}

export function SpecialtyProjects({ items, category, query, onFilter }: SpecialtyProjectsProps) {
  const visible = filterProjects(items, category, query)
  return (
    <section id="work" className="sp-container sp-section" aria-labelledby="work-title">
      <SectionHeading id="work-title" number="02 / Selected work" title="Not just code. Things people use." description="Web applications, interactive experiences, and AI tools. Open a card to explore what sits behind the interface." />
      <div className="sp-toolbar">
        <div className="sp-filter-group" role="group" aria-label="Filter projects by category">
          {projectFilters.filter((filter) => filter.value !== "demo").map((filter) => <button type="button" key={filter.value} aria-pressed={category === filter.value} onClick={() => onFilter(filter.value, query)}>{filter.label}</button>)}
        </div>
        <label className="sp-search"><Search size={14} aria-hidden="true" /><span className="sr-only">Search projects or technologies</span><input type="search" placeholder="Find a project or technology…" value={query} onChange={(event) => onFilter(category, event.target.value)} /></label>
      </div>
      <div className="sp-project-grid">
        {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
      {!visible.length && <div className="sp-empty"><Braces size={30} className="mx-auto" aria-hidden="true" /><h3>No matching projects</h3><p>Try another technology, or return to the complete collection.</p><button type="button" className="sp-btn" onClick={() => onFilter("all", "")}>Reset filters</button></div>}
      <p className="sp-results" role="status">{visible.length} of {items.length} projects · sourced from the portfolio collection</p>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const aiProject = project.id === "loki" || project.id === "odin"
  return (
    <article id={`project-${project.id}`} tabIndex={-1} className="sp-panel sp-project-card">
      <div className="sp-panel-bar"><span>{project.label}</span><span>{aiProject ? "IN DEVELOPMENT" : "PROJECT"}</span></div>
      {!project.image.includes("placeholder") ? <img className="sp-project-image" src={project.image} alt={`${project.title} interface`} width={600} height={375} loading="lazy" /> : <div className="sp-project-art"><Braces size={44} aria-hidden="true" /><strong>{project.title}</strong><span>{aiProject ? "LOCAL-FIRST / AI EXPLORATION" : project.label}</span></div>}
      <div className="sp-project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="sp-tags">{project.tags.slice(0, 4).map((tag) => <span className="sp-tag" key={tag}>{tag}</span>)}</div>
        <details>
          <summary>Behind the build<span className="sr-only">: {project.title}</span></summary>
          <p>The stack listed for this project:</p>
          <div className="sp-tags">{project.tags.map((tag) => <span className="sp-tag" key={tag}>{tag}</span>)}</div>
          <p>Conceptual flow · illustrative, not a production architecture diagram</p>
          <div className="sp-architecture"><span className="sp-tag">{aiProject ? "Task" : "User input"}</span><ArrowRight size={12} aria-hidden="true" /><span className="sp-tag">{aiProject ? "Agent + tools" : "Application logic"}</span><ArrowRight size={12} aria-hidden="true" /><span className="sp-tag">{aiProject ? "Review" : "Output"}</span></div>
          {project.link ? <a className="sp-link" href={project.link} target="_blank" rel="noopener noreferrer">{aiProject ? "View project presentation" : "Visit project"}<ArrowUpRight size={14} aria-hidden="true" /></a> : <p>A public project link is not available.</p>}
        </details>
      </div>
    </article>
  )
}
