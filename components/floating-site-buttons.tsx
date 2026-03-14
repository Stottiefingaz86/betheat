"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Headset } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function FloatingSiteButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 260)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const floatingButtonClassName =
    "pointer-events-auto h-10 w-10 rounded-full border border-white/12 text-white/90 transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

  return (
    <div className="hidden md:flex fixed bottom-5 right-5 z-[180] flex-col items-center gap-2.5 pointer-events-none">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={floatingButtonClassName}
            style={{
              backgroundColor: "var(--ds-sidebar-bg, #121417)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            whileHover={{ scale: 0.93 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="mx-auto h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Live support"
        aria-disabled="true"
        className={`${floatingButtonClassName} cursor-default`}
        style={{
          backgroundColor: "var(--ds-sidebar-bg, #121417)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
        }}
        whileHover={{ scale: 0.93 }}
        whileTap={{ scale: 0.9 }}
      >
        <Headset className="mx-auto h-4 w-4" />
      </motion.button>
    </div>
  )
}

