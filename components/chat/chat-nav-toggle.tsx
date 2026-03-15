"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useState } from "react"

type ExpandingSearchDockProps = {
  onSearch?: (query: string) => void
  placeholder?: string
  expandTo?: "left" | "right"
  pushSiblingsOnExpand?: boolean
}

export default function ChatNavToggle({
  onSearch,
  placeholder = "Search...",
  expandTo = "left",
  pushSiblingsOnExpand = false,
}: ExpandingSearchDockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState("")

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    setQuery("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && query) {
      onSearch(query)
    }
  }

  const handleQueryChange = (next: string) => {
    setQuery(next)
    if (!onSearch) return
    if (next.trim().length < 2) return
    onSearch(next)
    // Hand off to fullscreen search once user starts typing.
    setIsExpanded(false)
    setQuery("")
  }

  if (pushSiblingsOnExpand) {
    return (
      <motion.div
        className="relative h-9 flex-shrink-0 overflow-hidden"
        style={{ pointerEvents: "auto", zIndex: 101 }}
        initial={false}
        animate={{ width: isExpanded ? 300 : 36 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              key="icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleExpand}
              className="flex h-9 w-9 items-center justify-center rounded-[0.56rem] border border-white/10 bg-white/[0.04] text-white/75 transition-colors hover:bg-white/[0.06]"
              aria-label="Open global search"
            >
              <Search className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.form
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="w-full"
            >
              <motion.div
                initial={{ backdropFilter: "blur(0px)" }}
                animate={{ backdropFilter: "blur(12px)" }}
                className="relative flex items-center gap-2 overflow-hidden rounded-[0.56rem] border border-white/10"
                style={{ backgroundColor: "var(--ds-sidebar-bg, #121417)" }}
              >
                <div className="ml-3">
                  <Search className="h-4 w-4 text-white/55" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  className="h-9 flex-1 bg-transparent pr-3 text-sm text-white outline-none placeholder:text-white/45"
                />
                <motion.button
                  type="button"
                  onClick={handleCollapse}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mr-2 flex h-6 w-6 items-center justify-center rounded-[0.5rem] text-white/70 hover:bg-white/10"
                  aria-label="Close global search"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div
      className="relative h-8 w-8 flex-shrink-0"
      style={{ pointerEvents: "auto", zIndex: 101 }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleExpand}
            className="flex h-8 w-8 items-center justify-center rounded-[0.56rem] border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-white/10"
            aria-label="Open global search"
          >
            <Search className="h-4 w-4" />
          </motion.button>
        ) : (
          <motion.form
            key="input"
            initial={{ width: 48, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 48, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onSubmit={handleSubmit}
            className={`absolute top-1/2 z-[130] -translate-y-1/2 ${
              expandTo === "right" ? "left-0" : "right-0"
            }`}
          >
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              className="relative flex items-center gap-2 overflow-hidden rounded-[0.56rem] border border-white/10"
              style={{ backgroundColor: "var(--ds-sidebar-bg, #121417)" }}
            >
              <div className="ml-3">
                <Search className="h-4 w-4 text-white/55" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder={placeholder}
                autoFocus
                className="h-10 flex-1 bg-transparent pr-3 text-sm text-white outline-none placeholder:text-white/45"
              />
              <motion.button
                type="button"
                onClick={handleCollapse}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-[0.5rem] text-white/70 hover:bg-white/10"
                aria-label="Close global search"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
