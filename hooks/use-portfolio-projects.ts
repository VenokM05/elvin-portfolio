"use client"

import { useEffect, useState } from "react"
import { projects, type Project } from "@/lib/portfolio-data"

const categories = new Set(["web", "systems", "mobile", "games"])
const imageUrl = (value: unknown) => typeof value === "string" && (/^\/(?!\/)/.test(value) || /^https?:\/\//i.test(value) || /^data:image\//i.test(value))

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false
  const item = value as Record<string, unknown>
  return typeof item.id === "string" && typeof item.title === "string" &&
    typeof item.description === "string" && typeof item.label === "string" &&
    typeof item.category === "string" && categories.has(item.category) && imageUrl(item.image) &&
    (item.banner === undefined || imageUrl(item.banner)) &&
    Array.isArray(item.tags) && item.tags.every((tag) => typeof tag === "string") &&
    Array.isArray(item.aliases) && item.aliases.every((alias) => typeof alias === "string") &&
    typeof item.link === "string" && (item.link === "" || /^https?:\/\//i.test(item.link))
}

export function usePortfolioProjects() {
  const [items, setItems] = useState<Project[]>(projects)
  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem("portfolio_projects")
        if (!stored) { setItems(projects); return }
        const parsed: unknown = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.every(isProject)) setItems(parsed)
        else setItems(projects)
      } catch {
        setItems(projects)
      }
    }
    const storage = (event: StorageEvent) => {
      if (event.key === "portfolio_projects" || event.key === null) sync()
    }
    const visible = () => { if (document.visibilityState === "visible") sync() }
    sync()
    window.addEventListener("storage", storage)
    window.addEventListener("pageshow", sync)
    document.addEventListener("visibilitychange", visible)
    return () => {
      window.removeEventListener("storage", storage)
      window.removeEventListener("pageshow", sync)
      document.removeEventListener("visibilitychange", visible)
    }
  }, [])
  return items
}
