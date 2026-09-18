"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { defaultBrands, type BrandEntry } from "@/lib/portfolio-data"

function useBrands(): BrandEntry[] {
  const [brands, setBrands] = useState<BrandEntry[]>(defaultBrands)

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem("portfolio_brands")
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as BrandEntry[]
          if (parsed.length > 0) setBrands(parsed)
        } catch { /* ignore */ }
      }
    }
    load()

    const onVisibility = () => { if (document.visibilityState === "visible") load() }
    const onPageShow = () => load()
    const onStorage = (e: StorageEvent) => { if (e.key === "portfolio_brands") load() }

    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("pageshow", onPageShow)
    window.addEventListener("storage", onStorage)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pageshow", onPageShow)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  return brands
}

function MarqueeRow({ brands, direction, label }: {
  brands: BrandEntry[]
  direction: "left" | "right"
  label: string
}) {
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Duplicate items for seamless infinite loop
  const items = brands.length > 0 ? [...brands, ...brands, ...brands] : []
  const animDuration = Math.max(brands.length * 4, 20)

  if (brands.length === 0) return null

  return (
    <div
      className="pf-marquee-row"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={label}
    >
      <div
        className="pf-marquee-track"
        style={{
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationDuration: prefersReducedMotion ? "0s" : `${animDuration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((brand, i) => (
          <MarqueeItem key={`${brand.id}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  )
}

function MarqueeItem({ brand }: { brand: BrandEntry }) {
  const content = brand.logo ? (
    <img src={brand.logo} alt={brand.name} className="pf-marquee-logo" />
  ) : (
    <span className="pf-marquee-text">{brand.name}</span>
  )

  if (brand.url) {
    return (
      <a
        href={brand.url}
        target="_blank"
        rel="noopener noreferrer"
        className="pf-marquee-item"
        aria-label={brand.name}
      >
        {content}
      </a>
    )
  }

  return <span className="pf-marquee-item">{content}</span>
}

export function BrandMarquee() {
  const brands = useBrands()
  const clients = brands.filter((b) => b.category === "client")
  const techs = brands.filter((b) => b.category === "tech")

  if (brands.length === 0) return null

  return (
    <motion.div
      className="pf-marquee-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Brand showcase"
    >
      <div className="pf-marquee-header">
        <span className="pf-marquee-label">Built for</span>
        <span className="pf-marquee-divider">&middot;</span>
        <span className="pf-marquee-label">Powered by</span>
      </div>
      <div className="pf-marquee-viewport">
        <div className="pf-marquee-fade pf-marquee-fade-left" aria-hidden="true" />
        <div className="pf-marquee-content">
          {clients.length > 0 && (
            <MarqueeRow brands={clients} direction="left" label="Client brands" />
          )}
          {techs.length > 0 && (
            <MarqueeRow brands={techs} direction="right" label="Technology stack" />
          )}
        </div>
        <div className="pf-marquee-fade pf-marquee-fade-right" aria-hidden="true" />
      </div>
    </motion.div>
  )
}
