"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Mail, PhoneCall } from "lucide-react"
import { learningTopics, profile, skillGroups, type SectionId } from "@/lib/portfolio-data"
import { CareerTimeline } from "@/components/career-timeline"

function AnimatedEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  return (
    <div ref={ref} className={`pf-eyebrow${isInView ? " pf-eyebrow-visible" : ""} ${className}`}>
      {children}
    </div>
  )
}

function AnimatedSkillItem({ skill, index }: { skill: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const prefersReducedMotion = useReducedMotion()
  return (
    <li ref={ref} className="pf-skill-item">
      <span>{skill}</span>
      <div className="pf-skill-bar">
        <motion.div
          className="pf-skill-bar-fill"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
        />
      </div>
    </li>
  )
}

interface PortfolioSectionsProps {
  target?: string
  onNavigate: (section: SectionId) => void
  onContact: (trigger: HTMLElement) => void
}

export function PortfolioIntro() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <motion.div
      className="pf-container pf-intro"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
    >
      <p><strong>Software engineer & IT specialist.</strong><br />Web apps, interactive games, and infrastructure &mdash; 10+ years of building.</p>
      <div className="pf-strip-links">
        <a className="pf-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub ↗</a>
        <a className="pf-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn ↗</a>
      </div>
      <nav className="pf-intro-contact" aria-label="Reach out directly">
        <span className="pf-intro-contact-heading">Reach out directly</span>
        <a className="pf-intro-contact-link" href={`viber://chat?number=${encodeURIComponent(profile.viber.number)}`} title="Open a chat in Viber (Viber app required)" aria-label={`Viber: ${profile.viber.display} (opens Viber)`}>
          <PhoneCall size={20} aria-hidden="true" />
          <span><small>Viber</small>{profile.viber.display}</span>
        </a>
        <a className="pf-intro-contact-link" href={`mailto:${profile.email}`} aria-label={`Email: ${profile.email} (opens your mail app)`}>
          <Mail size={20} aria-hidden="true" />
          <span><small>Email</small>{profile.email}</span>
        </a>
      </nav>
    </motion.div>
  )
}

export function PortfolioSections({ target, onNavigate, onContact }: PortfolioSectionsProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const highlight = (id: string) => target === id ? " pf-tour-target" : ""
  const transition = { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" as const }

  return (
    <>
      <section className="pf-container pf-section" id="about" aria-labelledby="about-title">
        <motion.div
          className="pf-about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
        >
          <div className="pf-about-copy">
            <AnimatedEyebrow>The person behind the pixels</AnimatedEyebrow>
            <h2 id="about-title" tabIndex={-1}>A decade of building.<br />Rooted in curiosity.</h2>
            <p>I&apos;m <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="pf-link" aria-label="Elvin Manuel on LinkedIn (opens in a new tab)">Elvin Manuel</a>, a software engineer and IT specialist with over 10 years in software development. I started freelancing on small projects back in 2014, sharpening my skills along the way before going professional in 2016.</p>
            <p>My background spans three worlds &mdash; hardware, networking, and software &mdash; which gives me a full-stack perspective on how systems actually work. From event registration platforms to interactive games and AR experiences, and now AI-powered development tools, I enjoy turning complex problems into clean, usable solutions.</p>
            <p>I also run <a href="https://pixlint.com" target="_blank" rel="noopener noreferrer" className="pf-link" aria-label="Pixel Interactive (opens in a new tab)">Pixel Interactive</a>, an event technology company building interactive photobooths, mini games, and AI experiences for brands across the Philippines.</p>
            <a className="pf-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="More about my background on LinkedIn (opens in a new tab)">More about my background ↗</a>
          </div>
          <div className={`pf-skill-columns${highlight("skills")}`} id="skills" tabIndex={-1} role="region" aria-label="Development skills">
            {skillGroups.map((group, index) => (
              <motion.article
                className="pf-skill-group"
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: index * 0.1 }}
              >
                <span className="pf-skill-icon" aria-hidden="true">{group.icon}</span>
                <h3>{group.title}</h3>
                <ul>{group.skills.map((skill, si) => (
                  <AnimatedSkillItem key={skill} skill={skill} index={si} />
                ))}</ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
      <section className="pf-container pf-section" id="timeline" aria-labelledby="timeline-title">
        <motion.div
          className="pf-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
        >
          <div><AnimatedEyebrow>The journey so far</AnimatedEyebrow><h2 id="timeline-title" tabIndex={-1}>Career timeline</h2></div>
          <p>From freelancing on small projects to building enterprise systems and interactive experiences.</p>
        </motion.div>
        <CareerTimeline />
      </section>
      <section className="pf-container pf-section" id="upcoming" aria-labelledby="upcoming-title">
        <motion.div
          className={`pf-heading${highlight("upcoming-heading")}`}
          id="upcoming-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
        >
          <div><AnimatedEyebrow>Always exploring</AnimatedEyebrow><h2 id="upcoming-title" tabIndex={-1}>What&apos;s next</h2></div>
          <p>Where I&apos;m headed and the technologies I&apos;m investing in to get there.</p>
        </motion.div>
        <motion.div
          className="pf-upcoming-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
        >
          <article className="pf-upcoming-card">
            <span className="pf-tag">In progress</span><h3>AI-powered development tools.</h3>
            <p>Learning AI and integrating it into my personal projects &mdash; building <strong>Loki IDE</strong>, an AI-native local-first editor, and <strong>Odin Desktop</strong>, an autonomous development platform where code never leaves your machine.</p>
            <a className="pf-link" href="https://pixlint.com/projects/norse/presentation-deck.html" target="_blank" rel="noopener noreferrer">See the presentation deck ↗</a>
          </article>
          <article className="pf-upcoming-card pf-learning" id="learning">
            <h3>Currently exploring</h3><p>Technologies and topics I&apos;m actively learning to expand my skill set.</p>
            <ul className="pf-learning-list">{learningTopics.map((topic) => <li key={topic.title}>{topic.title}<span>{topic.category}</span></li>)}</ul>
          </article>
        </motion.div>
      </section>
      <motion.section
        className={`pf-container pf-contact${highlight("contact")}`}
        id="contact"
        aria-labelledby="contact-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div>
          <AnimatedEyebrow>Your next idea starts with a hello</AnimatedEyebrow>
          <h2 id="contact-title" tabIndex={-1}>Let&apos;s build something<br />worth exploring.</h2>
          <p>Have a project in mind or want to talk about my work?<br />I&apos;d love to hear from you.</p>
        </div>
        <div className="pf-contact-actions">
          <button className="pf-btn pf-btn-light" type="button" onClick={(event) => onContact(event.currentTarget)} aria-haspopup="dialog">Send a message ↗</button>
          <a className="pf-btn pf-btn-primary pf-btn-business" href="https://pixlint.com/contact" target="_blank" rel="noopener noreferrer">Event tech inquiry ↗</a>
          <a className="pf-link" href={`mailto:${profile.email}`}>Email me directly ↗</a>
          <a className="pf-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="View professional profile on LinkedIn (opens in a new tab)">View professional profile ↗</a>
          <small>Email opens your mail app. Event inquiries go to Pixel Interactive.</small>
        </div>
      </motion.section>
    </>
  )
}
