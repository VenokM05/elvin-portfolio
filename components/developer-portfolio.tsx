"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowRight, GitBranch } from "lucide-react"
import { SpecialtyShell, SpecialtyBreadcrumb, SpecialtyQuickContact } from "@/components/specialty-shell"
import { DeveloperEditor, DevelopmentPipeline, DeveloperStack, DeveloperOutput } from "@/components/developer-workspace"
import { SpecialtyProjects } from "@/components/specialty-projects"
import { SpecialtyAI } from "@/components/specialty-ai"
import { usePortfolioProjects } from "@/hooks/use-portfolio-projects"
import type { ProjectFilter } from "@/lib/portfolio-data"

export function DeveloperPortfolio() {
  const items = usePortfolioProjects()
  const [category, setCategory] = useState<ProjectFilter>("all")
  const [query, setQuery] = useState("")
  const [reveal, setReveal] = useState<{ id: string } | null>(null)
  const onFilter = (next: ProjectFilter, text: string) => { setCategory(next); setQuery(text) }
  const onReveal = (id: string) => { onFilter("all", ""); setReveal({ id }) }

  useEffect(() => {
    if (!reveal) return
    const card = document.getElementById(`project-${reveal.id}`)
    card?.focus({ preventScroll: true })
    card?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })
  }, [reveal])

  return (
    <SpecialtyShell kind="developer">
      <section className="sp-container sp-hero" aria-labelledby="developer-title">
        <SpecialtyBreadcrumb label="Full Stack Web Developer" />
        <div className="sp-hero-grid sp-enter">
          <div className="sp-hero-copy">
            <div className="sp-eyebrow"><span className="sp-dot" />Full Stack Web Developer</div>
            <h1 id="developer-title">From a line<br />of code to<br /><span>something real.</span></h1>
            <p>I&apos;m Elvin. I connect thoughtful interfaces, solid application logic, and the data behind them — turning ideas into web experiences people can use.</p>
            <div className="sp-actions"><a href="#work" className="sp-btn sp-btn-primary">Explore my work<ArrowRight size={16} aria-hidden="true" /></a><a href="#process" className="sp-btn sp-btn-quiet">See my process<ArrowDown size={15} aria-hidden="true" /></a></div>
            <div className="sp-hero-note"><GitBranch size={12} className="inline" aria-hidden="true" /> Freelancing since <strong>2014</strong> · Professional since <strong>2016</strong><br />Currently exploring local-first AI & agent-driven tools</div>
            <SpecialtyQuickContact />
          </div>
          <DeveloperEditor project={items.find((project) => project.id === "papp")} />
        </div>
        <div className="sp-tech-strip" aria-label="Core technologies"><span>Built across the stack</span>{["React", "Next.js", "TypeScript", "PHP", "Node.js", "MySQL"].map((name) => <span key={name}>{name}</span>)}</div>
      </section>
      <DevelopmentPipeline items={items} onReveal={onReveal} />
      <SpecialtyProjects items={items} category={category} query={query} onFilter={onFilter} />
      <DeveloperStack items={items} onReveal={onReveal} />
      <DeveloperOutput items={items} />
      <SpecialtyAI kind="developer" items={items} />
    </SpecialtyShell>
  )
}
