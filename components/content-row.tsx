"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { RowCard } from "./row-card"
import { filterProjects, projectFilters, type Project, type ProjectFilter } from "@/lib/portfolio-data"

const PER_PAGE = 6

interface ContentRowProps {
  items: Project[]
  category: ProjectFilter
  query: string
  onFilter: (category: ProjectFilter, query: string) => void
  onSelect: (project: Project, trigger: HTMLElement) => void
  onViewScreenshot: (project: Project) => void
  highlighted: boolean
}

export function ContentRow({ items, category, query, onFilter, onSelect, onViewScreenshot, highlighted }: ContentRowProps) {
  const visible = filterProjects(items, category, query)
  const search = useRef<HTMLInputElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = visible.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  // Reset to page 1 when filters or search change
  useEffect(() => { setPage(1) }, [category, query])

  const goToPage = useCallback((p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)))
    document.getElementById("project-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [totalPages])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <section className="pf-container pf-section" id="projects" aria-labelledby="projects-title">
      <motion.div
        id="projects-heading"
        className={`pf-heading${highlighted ? " pf-tour-target" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <div className="pf-eyebrow">A collection of things I&apos;ve built</div>
          <div className="pf-title-line">
            <h2 id="projects-title" tabIndex={-1}>Selected work</h2>
            <span className="pf-count">{items.length} projects</span>
          </div>
        </div>
        <p>Real projects, different challenges. Browse by type, explore the details, or visit a live site.</p>
      </motion.div>
      <motion.div
        className="pf-tools"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
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
      </motion.div>
      <motion.p
        className="pf-results"
        role="status"
        aria-atomic="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
      >
        Showing {visible.length} of {items.length} projects{query.trim() ? ` matching "${query.trim()}"` : ""}.
        {totalPages > 1 && ` — Page ${safePage} of ${totalPages}`}
      </motion.p>
      <AnimatePresence mode="popLayout">
        <div className="pf-grid" id="project-grid">
          {paginated.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.05 }}
            >
              <RowCard project={project} index={items.indexOf(project)} onSelect={onSelect} onViewScreenshot={onViewScreenshot} />
            </motion.article>
          ))}
        </div>
      </AnimatePresence>
      {visible.length === 0 && (
        <motion.div
          className="pf-empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
        >
          <h3>No projects found</h3><p>Try another name, technology, or category.</p>
          <button type="button" className="pf-btn" onClick={() => { onFilter("all", ""); search.current?.focus() }}>Reset filters</button>
        </motion.div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pf-pagination" aria-label="Project pages">
          <button
            type="button"
            className="pf-pagination-btn"
            disabled={safePage <= 1}
            onClick={() => goToPage(safePage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <div className="pf-pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={`pf-pagination-num${p === safePage ? " active" : ""}`}
                onClick={() => goToPage(p)}
                aria-label={`Page ${p}`}
                aria-current={p === safePage ? "page" : undefined}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pf-pagination-btn"
            disabled={safePage >= totalPages}
            onClick={() => goToPage(safePage + 1)}
            aria-label="Next page"
          >
            Next <ChevronRight size={16} />
          </button>
        </nav>
      )}
      <noscript><p>Enable JavaScript to filter projects and use the guide. All live project links remain available above.</p></noscript>
    </section>
  )
}
