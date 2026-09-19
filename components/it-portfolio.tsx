"use client"

import { Activity, ArrowDown, ArrowRight, ArrowUpRight, Cable, Cpu, Database, HardDrive, Monitor, Network, Server, ShieldCheck, Terminal, Wrench } from "lucide-react"
import { SpecialtyShell, SpecialtyBreadcrumb, SectionHeading, SpecialtyQuickContact } from "@/components/specialty-shell"
import { ITTopology } from "@/components/it-topology"
import { ITTroubleshooting } from "@/components/it-troubleshooting"
import { SpecialtyAI } from "@/components/specialty-ai"
import { usePortfolioProjects } from "@/hooks/use-portfolio-projects"

const domains = [
  { icon: Cpu, label: "01 / Physical layer", title: "Hardware & workstations", description: "The practical foundation: keeping equipment reliable, maintained, and ready for the people who use it.", skills: ["Hardware troubleshooting & maintenance", "Component and peripheral diagnostics", "Equipment lifecycle management"] },
  { icon: Network, label: "02 / Connected layer", title: "Networks & connectivity", description: "From a single connection to the wider infrastructure. Understand the path before changing the configuration.", skills: ["Network administration & configuration", "Connectivity and addressing diagnostics", "Infrastructure optimization"] },
  { icon: Server, label: "03 / System layer", title: "Software & systems", description: "Make the tools people depend on work together. Diagnose clearly, deploy carefully, and document the outcome.", skills: ["System deployment & management", "Software troubleshooting", "IT support & security protocols"] },
]

const tools = [
  { icon: Terminal, title: "System diagnostics", description: "Logs, processes, and configuration checks.", detail: "A diagnostic toolkit can include system event logs, process monitoring, and command-line checks. Choose evidence-gathering tools before corrective actions." },
  { icon: Cable, title: "Network inspection", description: "Follow the connection, layer by layer.", detail: "Use addressing checks, reachability tests, and DNS lookups to distinguish a device issue from an upstream connectivity problem." },
  { icon: HardDrive, title: "Equipment management", description: "Know what exists and how it is used.", detail: "Keep inventory records useful: ownership, condition, lifecycle, and service history. See the Equipment Inventory project below." },
  { icon: ShieldCheck, title: "Safe maintenance", description: "Protect data. Keep a rollback path.", detail: "Before a system change, consider backups, permissions, impact, and recovery. After a change, verify the original workflow and document the result." },
]

export function ITPortfolio() {
  const items = usePortfolioProjects()
  const inventory = items.find((project) => project.id === "inventory")
  return (
    <SpecialtyShell kind="it">
      <section className="sp-container sp-hero" aria-labelledby="it-title">
        <SpecialtyBreadcrumb label="IT Specialist" />
        <div className="sp-hero-grid sp-enter">
          <div className="sp-hero-copy">
            <div className="sp-eyebrow"><span className="sp-dot" />IT Specialist / Infrastructure & support</div>
            <h1 id="it-title">Behind every smooth day<br /><span>are systems that work.</span></h1>
            <p>I&apos;m Elvin. I work across hardware, networks, and software to keep technology useful — diagnosing the problem, connecting the pieces, and helping people get back to work.</p>
            <div className="sp-actions"><a className="sp-btn sp-btn-primary" href="#expertise">Explore my expertise<ArrowRight size={16} aria-hidden="true" /></a><a className="sp-btn sp-btn-quiet" href="#troubleshooting">Open the support desk<ArrowDown size={15} aria-hidden="true" /></a></div>
            <div className="sp-hero-note">Hardware. Network. Software. <strong>One connected view.</strong><br />IT specialist experience alongside software development</div>
            <SpecialtyQuickContact />
          </div>
          <ITTopology />
        </div>
        <div className="sp-it-stats" aria-label="IT areas of focus">
          {[{ icon: Monitor, title: "Hardware", label: "Maintain & troubleshoot" }, { icon: Network, title: "Network", label: "Connect & configure" }, { icon: Wrench, title: "Software", label: "Diagnose & restore" }, { icon: Activity, title: "AI exploration", label: "Learn & evaluate" }].map(({ icon: Icon, title, label }) => <div key={title}><Icon size={22} aria-hidden="true" /><span><strong>{title}</strong><small>{label}</small></span></div>)}
        </div>
      </section>
      <section id="expertise" className="sp-container sp-section" aria-labelledby="expertise-title">
        <SectionHeading id="expertise-title" number="01 / The hardware lab" title="Every layer matters." description="A hands-on view of the technology behind the screen. Open each panel to see the focus areas." />
        <div className="sp-hardware-grid">{domains.map(({ icon: Icon, label, title, description, skills }) => <article className="sp-panel sp-hardware-card" key={title}>
          <div className="sp-hardware-visual" aria-hidden="true"><Icon size={60} strokeWidth={1} /></div><div className="sp-eyebrow">{label}</div><h3>{title}</h3><p>{description}</p>
          <details><summary>Explore capabilities<span className="sr-only">: {title}</span></summary><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></details>
        </article>)}</div>
      </section>
      <ITTroubleshooting />
      <section id="toolkit" className="sp-container sp-section" aria-labelledby="toolkit-title">
        <SectionHeading id="toolkit-title" number="03 / The toolkit" title="The right check before the next change." description="A methodical approach to systems, support, and equipment management." />
        <div className="sp-tools">{tools.map(({ icon: Icon, title, description, detail }) => <article className="sp-panel sp-tool" key={title}><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p><details><summary>See the approach<span className="sr-only">: {title}</span></summary><p>{detail}</p></details></article>)}</div>
        {inventory && <article className="sp-panel sp-featured-system">
          <img src={inventory.banner || inventory.image} alt={`${inventory.title} interface`} width={600} height={375} loading="lazy" />
          <div><div className="sp-eyebrow"><Database size={14} aria-hidden="true" />Where IT meets development</div><h3>{inventory.title}</h3><p>{inventory.description}</p><div className="sp-tags">{inventory.tags.map((tag) => <span className="sp-tag" key={tag}>{tag}</span>)}</div>{inventory.link && <a className="sp-link mt-5" href={inventory.link} target="_blank" rel="noopener noreferrer">View inventory project<ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
        </article>}
      </section>
      <SpecialtyAI kind="it" items={items} />
    </SpecialtyShell>
  )
}
