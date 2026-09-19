"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { pixlintServices, pixlintStats, pixlintUrl } from "@/lib/portfolio-data"

export function PixlintSection() {
  const prefersReducedMotion = useReducedMotion()
  const transition = { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" as const }

  return (
    <section className="pf-container pf-section pf-pixlint" id="business" aria-labelledby="pixlint-title">
      <motion.div
        className="pf-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div>
          <div className="pf-eyebrow">Also my business</div>
          <h2 id="pixlint-title" tabIndex={-1}>Pixel Interactive</h2>
        </div>
        <p>Interactive event technology &mdash; photobooths, mini games, AI experiences, and custom activations for brands across the Philippines.</p>
      </motion.div>

      <motion.div
        className="pf-pixlint-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.1 }}
      >
        {pixlintStats.map((stat) => (
          <div key={stat.label} className="pf-pixlint-stat">
            <span className="pf-pixlint-stat-value">{stat.value}</span>
            <span className="pf-pixlint-stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <div className="pf-pixlint-services">
        {pixlintServices.map((service, index) => (
          <motion.article
            key={service.id}
            className="pf-pixlint-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 + index * 0.08 }}
          >
            <span className="pf-pixlint-card-icon" aria-hidden="true">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul className="pf-pixlint-features">
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="pf-pixlint-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.3 }}
      >
        <a
          className="pf-btn pf-btn-primary"
          href={`${pixlintUrl}/contact`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a project <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a
          className="pf-link"
          href={`${pixlintUrl}/portfolio`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Pixlint portfolio &rarr;
        </a>
      </motion.div>
    </section>
  )
}
