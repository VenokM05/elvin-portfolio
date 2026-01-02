"use client"

import type React from "react"

import { useState } from "react"
import { NetflixLoader } from "./netflix-loader"

/**
 * LayoutWrapper handles the initial loading state for the portfolio,
 * showing the Netflix-style intro animation before revealing the content.
 */
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <NetflixLoader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? "hidden" : "block"}>{children}</div>
    </>
  )
}

export default LayoutWrapper
