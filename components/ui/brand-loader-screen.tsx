"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function BrandLoaderScreen() {
  const [progress, setProgress] = useState(8)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev >= 96 ? 8 : prev + 6))
    }, 70)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[var(--ds-sidebar-bg,#121417)] text-white font-figtree">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,106,26,0.025),transparent_58%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <Image
          src="/logos/BHGL_logo-1773311608241-DDbBBO6v.png"
          alt="Betheat"
          width={100}
          height={26}
          priority
          className="h-auto w-[82px] object-contain sm:w-[100px]"
        />

        <div className="relative h-1 w-28 overflow-hidden rounded-full bg-white/[0.08] sm:w-32">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[var(--ds-primary,#ee3536)] transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
