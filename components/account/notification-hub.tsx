"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { IconBellRinging, IconDots, IconGift } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NotificationItem = {
  id: string
  title: string
  description: string
  timeLabel: string
  unread: boolean
}

const MESSAGES: NotificationItem[] = [
  {
    id: "m-1",
    title: "Welcome to the hottest online crypto casino",
    description: "Earn up to €1,000 on first 4 deposits.",
    timeLabel: "Today, 10:42 AM",
    unread: true,
  },
  {
    id: "m-2",
    title: "Risk Free bonus",
    description: "Claim your risk free bonus after your first deposit.",
    timeLabel: "Today, 9:18 AM",
    unread: true,
  },
]

export function NotificationHub() {
  const [messages, setMessages] = useState<NotificationItem[]>(MESSAGES)
  const [tab, setTab] = useState<"new" | "unread">("new")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [swipeOffsets, setSwipeOffsets] = useState<Record<string, number>>({})
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [swipingId, setSwipingId] = useState<string | null>(null)
  const touchStartRef = useRef<Record<string, { x: number; y: number }>>({})
  const horizontalSwipeRef = useRef<Record<string, boolean>>({})
  const unreadCount = useMemo(() => messages.filter((item) => item.unread).length, [messages])
  const filteredItems = useMemo(
    () => (tab === "unread" ? messages.filter((item) => item.unread) : messages),
    [messages, tab],
  )
  const SWIPE_DELETE_THRESHOLD = 88
  const MAX_SWIPE_OFFSET = 112

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(max-width: 768px)")
    const sync = () => setIsMobileViewport(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!isMobileViewport) {
      setSwipeOffsets({})
    }
  }, [isMobileViewport])

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((item) => item.id !== id))
    setOpenMenuId((prev) => (prev === id ? null : prev))
    setSwipeOffsets((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleMarkUnread = (id: string) => {
    setMessages((prev) => prev.map((item) => (item.id === id ? { ...item, unread: true } : item)))
    setOpenMenuId(null)
  }

  const handleTouchStart = (id: string, e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport) return
    const touch = e.touches[0]
    touchStartRef.current[id] = { x: touch.clientX, y: touch.clientY }
    horizontalSwipeRef.current[id] = false
    setSwipingId(id)
    setOpenMenuId(null)
  }

  const handleTouchMove = (id: string, e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport) return
    const start = touchStartRef.current[id]
    if (!start) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y

    if (!horizontalSwipeRef.current[id]) {
      if (Math.abs(deltaX) < 8) return
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return
      horizontalSwipeRef.current[id] = true
    }

    if (deltaX < 0) {
      e.preventDefault()
      const nextOffset = Math.max(-MAX_SWIPE_OFFSET, deltaX)
      setSwipeOffsets((prev) => ({ ...prev, [id]: nextOffset }))
    } else {
      setSwipeOffsets((prev) => ({ ...prev, [id]: 0 }))
    }
  }

  const handleTouchEnd = (id: string) => {
    if (!isMobileViewport) return
    const offset = swipeOffsets[id] ?? 0
    delete touchStartRef.current[id]
    delete horizontalSwipeRef.current[id]
    setSwipingId(null)

    if (offset <= -SWIPE_DELETE_THRESHOLD) {
      handleDelete(id)
      return
    }

    setSwipeOffsets((prev) => ({ ...prev, [id]: 0 }))
  }

  return (
    <div className="mb-2" data-no-brand-sanitize="true">
      <div className="mb-4 flex items-end gap-5 border-b border-white/10">
        <button
            type="button"
          onClick={() => setTab("new")}
            className={cn(
            "relative pb-2 text-xs font-medium transition-colors",
            tab === "new" ? "text-white" : "text-white/55 hover:text-white/80",
          )}
        >
          New
          <span
            className={cn(
              "pointer-events-none absolute inset-x-0 -bottom-px h-[2px] rounded-full transition-opacity",
              tab === "new" ? "bg-[var(--ds-primary,#ee3536)] opacity-100" : "opacity-0",
            )}
          />
          </button>

          <button
            type="button"
            onClick={() => setTab("unread")}
            className={cn(
            "relative inline-flex items-center gap-1.5 pb-2 text-xs font-medium transition-colors",
            tab === "unread" ? "text-white" : "text-white/55 hover:text-white/80",
            )}
          >
            <span>Unread</span>
          <span className={cn("text-[11px]", tab === "unread" ? "text-white/90" : "text-white/55")}>{unreadCount}</span>
                        <span
                          className={cn(
              "pointer-events-none absolute inset-x-0 -bottom-px h-[2px] rounded-full transition-opacity",
              tab === "unread" ? "bg-[var(--ds-primary,#ee3536)] opacity-100" : "opacity-0",
                          )}
                        />
                      </button>
                    </div>

      <section className="mb-4">
        {filteredItems.length > 0 ? (
          <>
            <h4 className="mb-2 text-[15px] font-semibold leading-6 text-white/55">Today</h4>
                <div className="space-y-2">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-small">
                      <button
                        type="button"
                    onClick={() => handleDelete(item.id)}
                    className="absolute inset-y-0 right-0 flex w-28 items-center justify-center bg-[#c0362c] text-sm font-semibold text-white md:hidden"
                  >
                    Delete
                      </button>

                  <div
                      className={cn(
                      "relative rounded-small border border-white/10 bg-[#15181d] p-4 hover:bg-[#181d24]",
                      swipingId === item.id ? "transition-none" : "transition-[transform,background-color] duration-200",
                    )}
                    style={{ transform: `translateX(${isMobileViewport ? (swipeOffsets[item.id] ?? 0) : 0}px)` }}
                    onTouchStart={isMobileViewport ? (e) => handleTouchStart(item.id, e) : undefined}
                    onTouchMove={isMobileViewport ? (e) => handleTouchMove(item.id, e) : undefined}
                    onTouchEnd={isMobileViewport ? () => handleTouchEnd(item.id) : undefined}
                    onTouchCancel={isMobileViewport ? () => handleTouchEnd(item.id) : undefined}
                  >
                      <button
                        type="button"
                      onClick={() => setOpenMenuId((prev) => (prev === item.id ? null : item.id))}
                      className="absolute right-2 top-3 h-8 w-8 rounded-full flex items-center justify-center text-white/35 hover:bg-white/10 hover:text-white/70"
                        aria-label="More actions"
                      >
                        <IconDots className="h-4 w-4" />
                      </button>
                    {openMenuId === item.id && (
                      <div className="absolute right-3 top-11 z-20 min-w-[140px] rounded-md border border-white/12 bg-[rgba(255,255,255,0.035)] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                          <button
                            type="button"
                          onClick={() => handleMarkUnread(item.id)}
                          className="flex w-full items-center rounded-sm px-2.5 py-1.5 text-left text-sm text-white/85 hover:bg-white/10"
                        >
                          Mark as unread
                          </button>
                          <button
                            type="button"
                          onClick={() => handleDelete(item.id)}
                          className="flex w-full items-center rounded-sm px-2.5 py-1.5 text-left text-sm text-red-300 hover:bg-white/10"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      <div className="flex items-start gap-3 pr-9">
                      <div className="h-10 w-10 rounded-full border border-white/15 bg-black/25 flex items-center justify-center">
                        {item.id === "m-1" ? (
                          <IconBellRinging className="h-5 w-5 text-white/75" />
                        ) : (
                          <IconGift className="h-5 w-5 text-white/75" />
                        )}
                      </div>

                        <div className="min-w-0 flex-1">
                        <p className="text-[17px] font-semibold text-white leading-snug">{item.title}</p>
                        <p className="mt-1 text-[14px] leading-[1.45] text-white/75">{item.description}</p>

                            <Button
                              variant="ghost"
                          className="mt-3 h-9 rounded-small border border-[#9a86d1]/75 px-4 text-xs font-semibold text-[#121417] hover:text-[#121417]"
                          style={{ backgroundColor: "#c9b4ff", boxShadow: "0 6px 18px rgba(122, 92, 196, 0.28)" }}
                            >
                          {"Depo\u200Bsit Now"}
                            </Button>

                        <p className="mt-2 text-xs text-white/45">{item.timeLabel}</p>
                      </div>
                    </div>

                    {item.unread && <div className="absolute right-3 top-12 h-2.5 w-2.5 rounded-full bg-[var(--ds-primary,#ff6a1a)]" />}
                      </div>
            </div>
        ))}
      </div>
          </>
        ) : (
          <div className="rounded-small border border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-xl">
              🔭
        </div>
            <p className="text-sm font-semibold text-white/90">
              {tab === "unread" ? "No unread messages at the moment" : "No messages at the moment"}
            </p>
            <p className="mt-1 text-xs text-white/55">You are all caught up.</p>
              </div>
        )}
      </section>
    </div>
  )
}

