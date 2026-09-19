"use client"

import { useState } from "react"
import { ArrowRight, Braces, Check, Code2, GitBranch, Lightbulb, Monitor, Palette, Rocket, ShieldCheck, Smartphone, Tablet } from "lucide-react"
import { developmentStages, stackNodes } from "@/lib/specialty-data"
import type { Project } from "@/lib/portfolio-data"
import { SectionHeading } from "@/components/specialty-shell"

const stageIcons = [Lightbulb, Palette, Code2, ShieldCheck, Rocket]

export function DeveloperEditor({ project }: { project?: Project }) {
  return (
    <div className="sp-panel sp-code-window">
      <div className="sp-panel-bar"><span className="sp-window-dots" aria-hidden="true"><i /><i /><i /></span><span>elvin / workspace</span><GitBranch size={13} aria-hidden="true" /></div>
      <div className="sp-code-tabs"><span>experience.tsx</span><span>preview</span></div>
      <pre className="sp-code" aria-label="Illustrative development code"><code><b>const</b>{" experience = {\n"}{"  interface: "}<em>&quot;thoughtful&quot;</em>{",\n"}{"  logic:     "}<em>&quot;intentional&quot;</em>{",\n"}{"  output:    "}<em>&quot;something useful&quot;</em>{"\n};\n\n"}<b>export default</b>{" build(experience);"}</code></pre>
      <div className="sp-code-output">
        <div className="sp-panel-bar"><span><span className="sp-dot" />{project ? project.title : "The builder’s workspace"}</span><span>OUTPUT ↗</span></div>
        <img src={project?.image && !project.image.includes("placeholder") ? project.image : "/developer-desk.png"} alt={project ? `${project.title} interface preview` : "A development workspace with a code editor and design sketches"} width={600} height={375} fetchPriority="high" />
      </div>
      <div className="sp-terminal-line">$ ideas → logic → experience <span className="sp-caret" aria-hidden="true" /></div>
    </div>
  )
}

export function DevelopmentPipeline({ items, onReveal }: { items: Project[]; onReveal: (id: string) => void }) {
  const [selected, setSelected] = useState(0)
  const stage = developmentStages[selected]
  return (
    <section id="process" className="sp-container sp-section" aria-labelledby="process-title">
      <SectionHeading id="process-title" number="01 / The process" title="Good output starts with good logic." description="An interactive look at the journey from a problem to a working product. Choose a stage to explore." />
      <div className="sp-pipeline" role="group" aria-label="Development stages">
        {developmentStages.map((item, index) => {
          const Icon = stageIcons[index]
          return <button type="button" key={item.title} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls="stage-detail"><small>0{index + 1}<Icon size={16} aria-hidden="true" /></small><strong>{item.title}</strong></button>
        })}
      </div>
      <div id="stage-detail" className="sp-panel sp-stage-detail" aria-live="polite">
        <div><span className="sp-tag sp-tag-accent">{stage.title}</span><h3 className="mt-4">{stage.subtitle}</h3><p>{stage.description}</p>
          <div className="sp-tags">{items.filter((project) => stage.projectIds.includes(project.id)).map((project) => <a key={project.id} className="sp-tag" href={`#project-${project.id}`} onClick={(event) => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onReveal(project.id) } }}>{project.title}<ArrowRight size={10} aria-hidden="true" /></a>)}</div>
        </div>
        <div><div className="sp-panel-bar"><span>{stage.artifact}</span><span>ILLUSTRATIVE</span></div><pre className="sp-code"><code>{stage.snippet}</code></pre></div>
      </div>
    </section>
  )
}

export function DeveloperStack({ items, onReveal }: { items: Project[]; onReveal: (id: string) => void }) {
  const [selected, setSelected] = useState(0)
  const node = stackNodes[selected]
  const matches = items.filter((project) => node.tags.some((tag) => project.tags.includes(tag)))
  return (
    <section id="stack" className="sp-container sp-section" aria-labelledby="stack-title">
      <SectionHeading id="stack-title" number="03 / The connected stack" title="Different tools. One complete experience." description="Explore the technologies and the actual projects that connect them." />
      <div className="sp-stack-layout">
        <div className="sp-orbit" role="group" aria-label="Explore technologies">
          <div className="sp-orbit-ring" aria-hidden="true" /><div className="sp-orbit-core" aria-hidden="true"><Braces size={32} />Full stack</div>
          {stackNodes.map((item, index) => <button type="button" key={item.name} className="sp-orbit-node" aria-pressed={selected === index} aria-controls="stack-detail" onClick={() => setSelected(index)}>{item.name}</button>)}
        </div>
        <div id="stack-detail" className="sp-panel sp-stack-detail" aria-live="polite">
          <div className="sp-eyebrow">{node.group}</div><h3>{node.name}</h3><p>{node.description}</p>
          <ul>{matches.slice(0, 4).map((project) => <li key={project.id}><a className="sp-link" href={`#project-${project.id}`} onClick={(event) => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onReveal(project.id) } }}><ArrowRight size={13} aria-hidden="true" />{project.title}</a></li>)}</ul>
          {!matches.length && <p>No published project currently lists this technology.</p>}
        </div>
      </div>
    </section>
  )
}

export function DeveloperOutput({ items }: { items: Project[] }) {
  const [device, setDevice] = useState("desktop")
  const candidates = items.filter((project) => !project.image.includes("placeholder"))
  const project = candidates.find((item) => item.id === "papp") ?? candidates[0]
  if (!project) return null
  return (
    <section id="output" className="sp-container sp-section" aria-labelledby="output-title">
      <SectionHeading id="output-title" number="04 / The final output" title="Out of the editor. Into the real world." description="A closer look at a finished interface, presented in different device frames." />
      <figure className="sp-panel sp-showcase">
        <div className="sp-showcase-controls"><span className="sp-tag sp-tag-accent"><Check size={12} aria-hidden="true" />{project.title}</span><div className="sp-filter-group" role="group" aria-label="Preview device frame">
          {([{ name: "desktop", icon: Monitor }, { name: "tablet", icon: Tablet }, { name: "phone", icon: Smartphone }]).map(({ name, icon: Icon }) => <button type="button" key={name} onClick={() => setDevice(name)} aria-pressed={device === name} aria-label={`${name} frame`}><Icon size={17} aria-hidden="true" /></button>)}
        </div></div>
        <div className="sp-device" data-device={device}><div className="sp-device-top">{project.title} / {device} frame</div><img src={project.banner || project.image} alt={`${project.title} screenshot in a ${device} frame`} width={780} height={480} loading="lazy" /></div>
        <figcaption>Screenshot presentation, not a live responsive preview. {project.link && <a className="sp-link" href={project.link} target="_blank" rel="noopener noreferrer">Explore the actual project ↗</a>}</figcaption>
      </figure>
    </section>
  )
}
