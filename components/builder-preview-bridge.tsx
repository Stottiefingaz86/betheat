"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

const STYLE_ID = "__builder_preview_runtime"
const EDITOR_OVERLAY_ID = "__builder_editor_overlay"

function radiusToRem(radius: string | null): string {
  switch (radius) {
    case "none":
      return "0rem"
    case "small":
      return "0.375rem"
    case "medium":
      return "0.625rem"
    case "large":
      return "0.9rem"
    default:
      return "0.56rem"
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace("#", "")
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  const value = Number.parseInt(full, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  }
}

function getPrimaryTextColor(hex: string): "#000000" | "#ffffff" {
  const rgb = hexToRgb(hex)
  if (!rgb) return "#ffffff"
  // Relative luminance approximation for contrast choice.
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255
  return luminance > 0.62 ? "#000000" : "#ffffff"
}

function mixHex(base: string, accent: string, ratio: number): string {
  const a = hexToRgb(base)
  const b = hexToRgb(accent)
  if (!a || !b) return base
  const clamped = Math.max(0, Math.min(1, ratio))
  const r = Math.round(a.r + (b.r - a.r) * clamped)
  const g = Math.round(a.g + (b.g - a.g) * clamped)
  const bl = Math.round(a.b + (b.b - a.b) * clamped)
  return `#${[r, g, bl].map((part) => part.toString(16).padStart(2, "0")).join("")}`
}

type RuntimeSubNavItem = {
  label: string
  deeplink?: string
  icon?: string
}

type RuntimeSubNavConfig = {
  template?: string
  sticky?: boolean
  items?: RuntimeSubNavItem[]
}

function parseSubNavConfig(raw: string | null): RuntimeSubNavConfig | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as RuntimeSubNavConfig
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    return null
  }
}

function applySubNavConfig(config: RuntimeSubNavConfig | null): boolean {
  if (!config) return false
  const subNav = document.querySelector<HTMLElement>("[data-sub-nav]")
  if (!subNav) return false

  const template = config.template || "sub_tabs_v1"
  const sticky = config.sticky ? "on" : "off"
  subNav.setAttribute("data-builder-subnav-template", template)
  subNav.setAttribute("data-builder-subnav-sticky", sticky)
  subNav.style.setProperty("position", config.sticky ? "sticky" : "relative", "important")
  subNav.style.setProperty("top", config.sticky ? "64px" : "0px", "important")
  subNav.style.setProperty("left", "unset", "important")
  subNav.style.setProperty("right", "unset", "important")
  subNav.style.setProperty("z-index", config.sticky ? "90" : "40", "important")
  if (!config.sticky) {
    subNav.style.setProperty("transform", "none", "important")
  }

  const controls = Array.from(subNav.querySelectorAll<HTMLElement>("[data-tab-item]"))
  const items = Array.isArray(config.items) ? config.items : []
  controls.forEach((control, index) => {
    const item = items[index]
    if (!item) {
      control.style.display = "none"
      return
    }
    control.style.display = ""
    const label = item.label || `Item ${index + 1}`
    const textNode =
      control.querySelector<HTMLElement>("span.whitespace-nowrap") ||
      control.querySelector<HTMLElement>("span:last-child") ||
      control.querySelector<HTMLElement>("span") ||
      control
    textNode.textContent = label
    if (control instanceof HTMLAnchorElement && item.deeplink) {
      control.href = item.deeplink
    }
    control.setAttribute("data-builder-subnav-icon", item.icon || "none")
  })
  return true
}

function attachSubNavRuntime(config: RuntimeSubNavConfig | null): () => void {
  if (!config) return () => {}
  let disposed = false
  let retries = 0
  let retryTimer: number | null = null
  let observer: MutationObserver | null = null

  const applyAndWatch = () => {
    if (disposed) return
    const applied = applySubNavConfig(config)
    if (!applied) {
      if (retries < 18) {
        retries += 1
        retryTimer = window.setTimeout(applyAndWatch, 180)
      }
      return
    }
    const subNav = document.querySelector<HTMLElement>("[data-sub-nav]")
    if (!subNav || observer) return
    observer = new MutationObserver(() => applySubNavConfig(config))
    observer.observe(subNav, { childList: true, subtree: true, attributes: true })
  }

  applyAndWatch()

  return () => {
    disposed = true
    if (retryTimer) window.clearTimeout(retryTimer)
    if (observer) observer.disconnect()
  }
}

function clearInjectedStyle() {
  const style = document.getElementById(STYLE_ID)
  if (style) style.remove()
}

function restoreLogos() {
  document.querySelectorAll("[data-builder-logo]").forEach((node) => node.remove())
  document.querySelectorAll("[data-builder-logo-skeleton]").forEach((node) => node.remove())
  document.querySelectorAll("svg[data-builder-original-hidden='true']").forEach((node) => {
    const element = node as HTMLElement
    element.style.display = ""
    element.removeAttribute("data-builder-original-hidden")
  })
}

function swapLogos(logoSrc: string | null) {
  restoreLogos()
  document.querySelectorAll("svg[viewBox='0 0 640 86']").forEach((svg) => {
    const parent = svg.parentElement
    if (!parent) return

    ;(svg as HTMLElement).style.display = "none"
    svg.setAttribute("data-builder-original-hidden", "true")

    if (logoSrc) {
      const img = document.createElement("img")
      img.src = logoSrc
      img.alt = "Preview Brand Logo"
      img.setAttribute("data-builder-logo", "true")
      img.style.width = "100%"
      img.style.height = "100%"
      img.style.objectFit = "contain"
      img.style.objectPosition = "center"
      parent.appendChild(img)
      return
    }

    const skeleton = document.createElement("div")
    skeleton.setAttribute("data-builder-logo-skeleton", "true")
    skeleton.style.width = "140px"
    skeleton.style.height = "24px"
    skeleton.style.maxWidth = "80%"
    skeleton.style.borderRadius = "999px"
    skeleton.style.background = "linear-gradient(90deg, rgba(148,163,184,0.28) 0%, rgba(226,232,240,0.42) 50%, rgba(148,163,184,0.28) 100%)"
    skeleton.style.backgroundSize = "220% 100%"
    skeleton.style.animation = "builderPreviewShimmer 1.2s ease-in-out infinite"
    parent.appendChild(skeleton)
  })
}

function buildRuntimeCss(skeleton: boolean, themeMode: "light" | "dark") {
  return `
@keyframes builderPreviewShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
[data-customizer],
[data-customizer-fab] {
  display: none !important;
}
[data-toast-notification] {
  display: none !important;
}
/* Make embedded pages use full width in builder iframe */
[class*="max-w-7xl"],
[class*="max-w-6xl"],
[class*="max-w-5xl"],
[class*="max-w-4xl"],
[class*="max-w-3xl"] {
  max-width: none !important;
  width: 100% !important;
}
[data-builder-hover="true"] {
  outline: 2px dashed var(--ds-primary, #5C7CFA) !important;
  outline-offset: 2px !important;
}
[data-builder-draggable="true"] {
  cursor: grab !important;
}
[data-builder-draggable="true"]:active {
  cursor: grabbing !important;
}
[data-builder-drop-preview="true"] {
  pointer-events: none !important;
  border-radius: 10px !important;
  border: 1px dashed rgba(92, 124, 250, 0.9) !important;
  background-image:
    linear-gradient(rgba(92, 124, 250, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(92, 124, 250, 0.2) 1px, transparent 1px) !important;
  background-size: 12px 12px !important;
  background-color: rgba(92, 124, 250, 0.08) !important;
  box-shadow: inset 0 0 0 1px rgba(92, 124, 250, 0.35) !important;
}
${themeMode === "light" ? `
/* Builder light mode: force readable contrast on Betheat dark-first classes */
html.builder-preview-light [data-nav-header],
html.builder-preview-light [data-sub-nav],
html.builder-preview-light [data-page-bg],
html.builder-preview-light [data-sidebar="sidebar"] {
  color: #0f172a !important;
}
html.builder-preview-light .text-white,
html.builder-preview-light .text-white\\/90,
html.builder-preview-light .text-white\\/80,
html.builder-preview-light .text-white\\/70,
html.builder-preview-light .text-white\\/60,
html.builder-preview-light .text-white\\/50 {
  color: #1f2937 !important;
}
html.builder-preview-light [data-nav-header] button,
html.builder-preview-light [data-sub-nav] button,
html.builder-preview-light [data-nav-header] a[role="button"] {
  color: #1f2937 !important;
}
html.builder-preview-light [data-nav-header] button[data-active="true"],
html.builder-preview-light [data-sub-nav] button[data-active="true"],
html.builder-preview-light [data-sub-nav] button[data-state="active"] {
  color: var(--ds-primary-text, #ffffff) !important;
}
` : ""}
/* Force runtime theme to visibly affect real site preview */
html.builder-preview body,
html.builder-preview #__next,
html.builder-preview [data-page-bg] {
  background: var(--ds-page-bg, #0c131d) !important;
  color: var(--ds-text, #e2e8f0) !important;
}
html.builder-preview [data-nav-header],
html.builder-preview [data-sub-nav],
html.builder-preview [data-sidebar="sidebar"] {
  background: var(--ds-nav-bg, #101722) !important;
  border-color: var(--ds-border, rgba(255,255,255,0.12)) !important;
}
html.builder-preview [data-sub-nav] button,
html.builder-preview [data-nav-header] button,
html.builder-preview [data-nav-header] a[role="button"] {
  border-radius: var(--radius, 0.56rem) !important;
}
html.builder-preview [data-sub-nav] button[data-active="true"],
html.builder-preview [data-sub-nav] button[data-state="active"],
html.builder-preview [data-nav-header] button[data-active="true"] {
  background: var(--ds-primary, #5C7CFA) !important;
  color: var(--ds-primary-text, #ffffff) !important;
}
html.builder-preview [data-sub-nav][data-builder-subnav-sticky="off"] {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
}
html.builder-preview [data-sub-nav][data-builder-subnav-sticky="on"] {
  position: sticky !important;
  top: 0.5rem !important;
  z-index: 50 !important;
}
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_pills_v2"] button,
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_pills_v2"] a[role="button"] {
  border-radius: 999px !important;
  background: color-mix(in srgb, var(--ds-primary, #5C7CFA) 12%, transparent) !important;
  border: 1px solid color-mix(in srgb, var(--ds-primary, #5C7CFA) 35%, transparent) !important;
}
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_underline_v3"] {
  border-bottom: 1px solid var(--ds-border, rgba(148,163,184,0.35)) !important;
}
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_underline_v3"] button,
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_underline_v3"] a[role="button"] {
  border-radius: 0 !important;
  background: transparent !important;
  border: none !important;
  border-bottom: 2px solid transparent !important;
}
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_underline_v3"] button[data-active="true"],
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_underline_v3"] button[data-state="active"],
html.builder-preview [data-sub-nav][data-builder-subnav-template="sub_underline_v3"] a[role="button"][data-active="true"] {
  color: var(--ds-primary, #5C7CFA) !important;
  border-bottom-color: var(--ds-primary, #5C7CFA) !important;
}
html.builder-preview [class*="card"],
html.builder-preview [class*="tile"],
html.builder-preview [class*="panel"],
html.builder-preview [class*="surface"],
html.builder-preview [data-builder-surface] {
  border-color: var(--ds-border, rgba(255,255,255,0.12)) !important;
}
html.builder-preview input,
html.builder-preview [role="searchbox"],
html.builder-preview [data-search] {
  background: var(--ds-field-bg, rgba(255,255,255,0.08)) !important;
  border-color: var(--ds-border, rgba(255,255,255,0.12)) !important;
  color: var(--ds-text, #e2e8f0) !important;
}
${skeleton ? `
img:not([data-builder-logo]),
video {
  opacity: 0 !important;
  background: linear-gradient(90deg, #111821 0%, #1b2635 45%, #111821 100%) !important;
  background-size: 220% 100% !important;
  animation: builderPreviewShimmer 1.4s ease-in-out infinite !important;
}
` : ""}
`
}

function getCandidateContainer(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null
  const candidate = target.closest("div")
  if (!candidate || !(candidate instanceof HTMLElement)) return null
  if (
    candidate.id === EDITOR_OVERLAY_ID ||
    candidate.closest(`#${EDITOR_OVERLAY_ID}`) ||
    candidate.closest("[data-customizer]") ||
    candidate.closest("[data-customizer-fab]")
  ) {
    return null
  }
  const rect = candidate.getBoundingClientRect()
  if (rect.width < 80 || rect.height < 32) return null
  return candidate
}

function findFirstEditableTextNode(root: HTMLElement): HTMLElement | null {
  const candidate = root.querySelector("h1,h2,h3,h4,h5,h6,p,span,button,a,label,strong,small")
  if (candidate instanceof HTMLElement) return candidate
  return null
}

function detectComponentType(root: HTMLElement | null): "slot" | "mainNav" | "sideNav" | "subNav" {
  if (!root) return "slot"
  if (root.closest("[data-sub-nav]")) return "subNav"
  if (root.closest("[data-nav-header]")) return "mainNav"
  if (root.closest("[data-sidebar='sidebar']")) return "sideNav"
  return "slot"
}

function setupBuilderOverlay() {
  const overlay = document.createElement("div")
  overlay.id = EDITOR_OVERLAY_ID
  overlay.style.position = "fixed"
  overlay.style.zIndex = "2147483647"
  overlay.style.pointerEvents = "auto"
  overlay.style.display = "none"
  overlay.style.gap = "6px"
  overlay.style.alignItems = "center"
  overlay.style.padding = "4px"
  overlay.style.borderRadius = "999px"
  overlay.style.background = "rgba(15, 23, 42, 0.92)"
  overlay.style.border = "1px solid rgba(148, 163, 184, 0.5)"
  overlay.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.35)"

  const editBtn = document.createElement("button")
  editBtn.type = "button"
  editBtn.textContent = "Edit"
  editBtn.style.height = "24px"
  editBtn.style.padding = "0 10px"
  editBtn.style.fontSize = "12px"
  editBtn.style.borderRadius = "999px"
  editBtn.style.border = "1px solid rgba(148, 163, 184, 0.35)"
  editBtn.style.background = "rgba(30, 41, 59, 0.9)"
  editBtn.style.color = "#f8fafc"
  editBtn.style.cursor = "pointer"

  const moveBtn = document.createElement("button")
  moveBtn.type = "button"
  moveBtn.textContent = "Move"
  moveBtn.style.height = "24px"
  moveBtn.style.padding = "0 10px"
  moveBtn.style.fontSize = "12px"
  moveBtn.style.borderRadius = "999px"
  moveBtn.style.border = "1px solid rgba(148, 163, 184, 0.35)"
  moveBtn.style.background = "rgba(30, 41, 59, 0.9)"
  moveBtn.style.color = "#f8fafc"
  moveBtn.style.cursor = "pointer"

  overlay.appendChild(editBtn)
  overlay.appendChild(moveBtn)
  document.body.appendChild(overlay)

  let activeElement: HTMLElement | null = null
  let moveMode = false
  let dragSource: HTMLElement | null = null
  let dropPreview: HTMLDivElement | null = null
  const onWindowScroll = () => {
    if (activeElement) updateOverlay(activeElement)
  }

  const clearDropPreview = () => {
    if (dropPreview?.parentElement) dropPreview.parentElement.removeChild(dropPreview)
    dropPreview = null
  }

  const ensureDropPreview = () => {
    if (dropPreview) return dropPreview
    const preview = document.createElement("div")
    preview.setAttribute("data-builder-drop-preview", "true")
    preview.style.width = "100%"
    preview.style.minHeight = "36px"
    dropPreview = preview
    return preview
  }

  const clearHover = () => {
    if (activeElement) activeElement.removeAttribute("data-builder-hover")
    activeElement = null
    overlay.style.display = "none"
  }

  const updateOverlay = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const top = Math.max(8, rect.top + 8)
    const left = Math.max(8, rect.right - overlay.offsetWidth - 8)
    overlay.style.top = `${top}px`
    overlay.style.left = `${left}px`
    overlay.style.display = "flex"
  }

  const onPointerMove = (event: PointerEvent) => {
    if (overlay.contains(event.target as Node)) return
    const next = getCandidateContainer(event.target)
    if (!next) {
      clearHover()
      return
    }
    if (next === activeElement) {
      updateOverlay(next)
      return
    }
    if (activeElement) activeElement.removeAttribute("data-builder-hover")
    activeElement = next
    activeElement.setAttribute("data-builder-hover", "true")
    updateOverlay(activeElement)
  }

  const setMoveMode = (enabled: boolean) => {
    moveMode = enabled
    moveBtn.textContent = enabled ? "Moving…" : "Move"
    moveBtn.style.background = enabled ? "rgba(99, 102, 241, 0.9)" : "rgba(30, 41, 59, 0.9)"
    clearDropPreview()
    document.querySelectorAll<HTMLElement>("[data-builder-draggable='true']").forEach((el) => {
      el.removeAttribute("data-builder-draggable")
      el.draggable = false
    })
    if (!enabled || !activeElement?.parentElement) return
    const siblings = Array.from(activeElement.parentElement.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    )
    siblings.forEach((el) => {
      el.setAttribute("data-builder-draggable", "true")
      el.draggable = true
    })
  }

  const onEditClick = () => {
    const componentType = detectComponentType(activeElement)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "builder-edit", componentType }, "*")
    }
    if (!activeElement) return
    const textEl = findFirstEditableTextNode(activeElement)
    if (!textEl) return
    const current = textEl.textContent?.trim() || ""
    const next = window.prompt("Edit text", current)
    if (next !== null) {
      textEl.textContent = next
    }
  }

  const onMoveClick = () => {
    const nextMode = !moveMode
    setMoveMode(nextMode)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "builder-move", enabled: nextMode }, "*")
    }
  }

  const onDragStart = (event: DragEvent) => {
    if (!moveMode) return
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-builder-draggable='true']") : null
    if (!(target instanceof HTMLElement) || target.getAttribute("data-builder-draggable") !== "true") return
    dragSource = target
    target.style.opacity = "0.55"
    event.dataTransfer?.setData("text/plain", "builder-move")
    event.dataTransfer!.effectAllowed = "move"
  }

  const onDragOver = (event: DragEvent) => {
    if (!moveMode || !dragSource) return
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-builder-draggable='true']") : null
    if (!(target instanceof HTMLElement) || target === dragSource || !target.parentElement) return
    event.preventDefault()
    event.dataTransfer!.dropEffect = "move"
    const targetRect = target.getBoundingClientRect()
    const parentStyles = window.getComputedStyle(target.parentElement)
    const isHorizontal =
      parentStyles.display.includes("flex") && parentStyles.flexDirection.startsWith("row")
    const insertAfter = isHorizontal
      ? event.clientX > targetRect.left + targetRect.width / 2
      : event.clientY > targetRect.top + targetRect.height / 2
    const preview = ensureDropPreview()
    const sourceRect = dragSource.getBoundingClientRect()
    preview.style.minHeight = `${Math.max(28, Math.round(sourceRect.height))}px`
    preview.style.minWidth = `${Math.max(64, Math.round(sourceRect.width))}px`
    if (insertAfter) {
      target.parentElement.insertBefore(preview, target.nextSibling)
    } else {
      target.parentElement.insertBefore(preview, target)
    }
  }

  const onDrop = (event: DragEvent) => {
    if (!moveMode || !dragSource) return
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-builder-draggable='true']") : null
    if (!(target instanceof HTMLElement) || target === dragSource || !dragSource.parentElement) return
    event.preventDefault()
    const parent = dragSource.parentElement
    if (dropPreview?.parentElement === parent) {
      parent.insertBefore(dragSource, dropPreview)
    } else {
      parent.insertBefore(dragSource, target)
    }
    clearDropPreview()
  }

  const onDragEnd = () => {
    if (dragSource) dragSource.style.opacity = "1"
    dragSource = null
    clearDropPreview()
  }

  editBtn.addEventListener("click", onEditClick)
  moveBtn.addEventListener("click", onMoveClick)
  window.addEventListener("pointermove", onPointerMove, { passive: true })
  window.addEventListener("scroll", onWindowScroll, { passive: true })
  document.addEventListener("dragstart", onDragStart)
  document.addEventListener("dragover", onDragOver)
  document.addEventListener("drop", onDrop)
  document.addEventListener("dragend", onDragEnd)

  return () => {
    setMoveMode(false)
    clearHover()
    editBtn.removeEventListener("click", onEditClick)
    moveBtn.removeEventListener("click", onMoveClick)
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("scroll", onWindowScroll)
    document.removeEventListener("dragstart", onDragStart)
    document.removeEventListener("dragover", onDragOver)
    document.removeEventListener("drop", onDrop)
    document.removeEventListener("dragend", onDragEnd)
    clearDropPreview()
    overlay.remove()
  }
}

export function BuilderPreviewBridge() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const isBuilderPreview = searchParams.get("builderPreview") === "1"
    if (!isBuilderPreview) {
      clearInjectedStyle()
      restoreLogos()
      document.documentElement.classList.remove("builder-preview")
      return
    }

    const primary = searchParams.get("primary") || "#1EC8A5"
    const secondary = searchParams.get("secondary") || "#5C7CFA"
    const auxiliary = searchParams.get("auxiliary") || mixHex(secondary, "#ffffff", 0.35)
    const background = searchParams.get("background")
    const themeMode = searchParams.get("mode") === "light" ? "light" : "dark"
    const subNavConfig = parseSubNavConfig(searchParams.get("subNavConfig"))
    const radius = searchParams.get("radius")
    const font = searchParams.get("font") || "Figtree"
    const brand = searchParams.get("brand") || "Brand"
    const logo = searchParams.get("logo")
    const skeleton = searchParams.get("skeleton") === "1"
    let disposeOverlay: (() => void) | null = null
    let disposeSubNavRuntime: (() => void) | null = null

    const root = document.documentElement
    const applyRuntimeTheme = () => {
      root.classList.add("builder-preview")
      root.classList.toggle("builder-preview-light", themeMode === "light")
      root.classList.toggle("builder-preview-dark", themeMode === "dark")
      root.style.setProperty("--ds-primary", primary)
      root.style.setProperty("--ds-primary-hover", secondary)
      root.style.setProperty("--ds-primary-gradient", "none")
      root.style.setProperty("--brand-primary", primary)
      root.style.setProperty("--brand-primary-hover", secondary)
      root.style.setProperty("--ds-auxiliary", auxiliary)
      root.style.setProperty("--ui-button-radius", radiusToRem(radius))
      root.style.setProperty("--radius", radiusToRem(radius))
      root.style.setProperty("--ds-primary-text", getPrimaryTextColor(primary))

      if (themeMode === "light") {
        const lightPage = background || "#f8fafc"
        const lightNav = mixHex("#ffffff", primary, 0.04)
        const lightCard = mixHex("#ffffff", secondary, 0.06)
        root.style.setProperty("--ds-nav-bg", lightNav)
        root.style.setProperty("--ds-page-bg", lightPage)
        root.style.setProperty("--ds-sidebar-bg", lightNav)
        root.style.setProperty("--ds-card-bg", lightCard)
        root.style.setProperty("--ds-field-bg", mixHex("#ffffff", auxiliary, 0.14))
        root.style.setProperty("--ds-border", mixHex("#cbd5e1", primary, 0.22))
        root.style.setProperty("--ds-text", "#0f172a")
      } else {
        const darkPage = background || mixHex("#0b1220", primary, 0.24)
        const darkNav = mixHex("#0f172a", primary, 0.18)
        const darkCard = mixHex("#111827", secondary, 0.2)
        root.style.setProperty("--ds-nav-bg", darkNav)
        root.style.setProperty("--ds-page-bg", darkPage)
        root.style.setProperty("--ds-sidebar-bg", darkNav)
        root.style.setProperty("--ds-card-bg", darkCard)
        root.style.setProperty("--ds-field-bg", mixHex("#1e293b", primary, 0.18))
        root.style.setProperty("--ds-border", mixHex("#334155", primary, 0.36))
        root.style.setProperty("--ds-text", "#e2e8f0")
      }
    }
    applyRuntimeTheme()
    disposeSubNavRuntime = attachSubNavRuntime(subNavConfig)

    document.body.style.fontFamily = `"${font}", var(--font-figtree), sans-serif`
    document.title = `${brand} · Casino Preview`

    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (!style) {
      style = document.createElement("style")
      style.id = STYLE_ID
      document.head.appendChild(style)
    }
    style.textContent = buildRuntimeCss(skeleton, themeMode)

    requestAnimationFrame(() => swapLogos(logo))
    const reapplyTimer = window.setTimeout(() => {
      applyRuntimeTheme()
      applySubNavConfig(subNavConfig)
    }, 250)
    const overlayTimer = window.setTimeout(() => {
      disposeOverlay = setupBuilderOverlay()
    }, 300)

    return () => {
      window.clearTimeout(reapplyTimer)
      window.clearTimeout(overlayTimer)
      disposeOverlay?.()
      disposeSubNavRuntime?.()
      clearInjectedStyle()
      restoreLogos()
      document.documentElement.classList.remove("builder-preview")
      document.documentElement.classList.remove("builder-preview-light")
      document.documentElement.classList.remove("builder-preview-dark")
    }
  }, [searchParams])

  return null
}
