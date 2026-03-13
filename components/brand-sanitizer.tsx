'use client'

import { useEffect } from 'react'

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
const BETHEAT_LOGO_PATH = '/logos/BHGL_logo-1773311608241-DDbBBO6v.png'

const TEXT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bBetOnline(?:\.ag)?\b/gi, 'Betheat'],
  [/\bWild\s*Casino\b/gi, 'Betheat'],
  [/\bwild\s*casnini\b/gi, 'Betheat'],
  [/\bJurnii\b/gi, 'External Report'],
  [/\bLive\s*Sports\b/gi, 'In-Play'],
  [/\bLive\s*Betting\b/gi, 'In-Play'],
  [/\bVIP\s*Rewards\b/gi, 'Loyalty'],
  [/\bvip\s*rewrds\b/gi, 'Loyalty'],
  [/\bLoyalty\b/gi, 'Promotions'],
  [/\bLOYALTY\b/g, 'PROMOTIONS'],
  [/\bDeposit\b/g, 'Wallet'],
  [/\bDEPOSIT\b/g, 'WALLET'],
]

function sanitizeText(value: string): string {
  let updated = value
  for (const [pattern, replacement] of TEXT_REPLACEMENTS) {
    updated = updated.replace(pattern, replacement)
  }
  return updated
}

function sanitizeAnchors(root: ParentNode) {
  const anchors = root.querySelectorAll('a[href]')
  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href) return
    const sanitized = href
      .replace(/betonline\.ag/gi, 'betheat.io')
      .replace(/t\.me\/betonline/gi, 't.me/betheat')
    if (sanitized !== href) {
      anchor.setAttribute('href', sanitized)
    }
  })
}

function sanitizeTextNodes(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    const textNode = node as Text
    const original = textNode.nodeValue ?? ''
    const sanitized = sanitizeText(original)
    if (sanitized !== original) {
      textNode.nodeValue = sanitized
    }
    node = walker.nextNode()
  }
}

function hideDisallowedNavItems(root: ParentNode) {
  const hiddenLabels = new Set(['poker', 'other'])

  const clickableElements = root.querySelectorAll('a, button, [role="button"]')
  clickableElements.forEach((element) => {
    const text = (element.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase()
    if (!hiddenLabels.has(text)) return
    const htmlEl = element as HTMLElement
    htmlEl.style.display = 'none'
    htmlEl.setAttribute('aria-hidden', 'true')
  })

  const textNodes = root.querySelectorAll('span, div')
  textNodes.forEach((element) => {
    const text = (element.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase()
    if (!hiddenLabels.has(text)) return
    const target = element.closest('a, button, [role="button"]') as HTMLElement | null
    if (!target) return
    target.style.display = 'none'
    target.setAttribute('aria-hidden', 'true')
  })
}

function replaceLegacyLogos(root: ParentNode) {
  const legacyWordmarks = root.querySelectorAll('svg[viewBox="0 0 640 86"]')
  legacyWordmarks.forEach((svg) => {
    const parent = svg.parentElement
    if (!parent || parent.querySelector('[data-betheat-logo="true"]')) return
    ;(svg as HTMLElement).style.display = 'none'

    const image = document.createElement('img')
    image.src = BETHEAT_LOGO_PATH
    image.alt = 'Betheat'
    image.setAttribute('data-betheat-logo', 'true')
    image.style.width = '100%'
    image.style.height = '125%'
    image.style.maxHeight = '125%'
    image.style.objectFit = 'contain'
    image.style.objectPosition = 'left center'
    image.style.transform = 'scale(1.2)'
    image.style.transformOrigin = 'left center'
    parent.appendChild(image)
  })

  const legacyLogoImages = root.querySelectorAll('img')
  legacyLogoImages.forEach((img) => {
    const src = img.getAttribute('src') || ''
    const alt = img.getAttribute('alt') || ''
    const isLegacy =
      /betonline|wildcasino|wild casino|sportsbetting|tigergaming/i.test(src) ||
      /betonline|wild casino/i.test(alt)
    if (!isLegacy) return
    img.setAttribute('src', BETHEAT_LOGO_PATH)
    img.setAttribute('alt', 'Betheat')
  })
}

function forceLegacyColorReplacement(root: ParentNode) {
  const replacements: Record<string, string> = {
    'rgb(3, 22, 121)': '#111214',
    'rgb(3, 13, 38)': '#0d0f12',
    'rgb(2, 14, 74)': '#181b20',
    'rgb(0, 150, 255)': '#ff6a1a',
    'rgb(0, 135, 246)': '#e65a12',
    'rgb(253, 193, 0)': '#8c9098',
    'rgb(238, 53, 54)': '#ff6a1a',
    'rgb(220, 42, 47)': '#e65a12',
    'rgb(218, 43, 44)': '#e65a12',
  }

  const styledElements = root.querySelectorAll('[style]')
  styledElements.forEach((element) => {
    const htmlEl = element as HTMLElement
    const bg = htmlEl.style.backgroundColor
    const border = htmlEl.style.borderColor
    const color = htmlEl.style.color

    if (bg && replacements[bg]) {
      htmlEl.style.backgroundColor = replacements[bg]
    }
    if (border && replacements[border]) {
      htmlEl.style.borderColor = replacements[border]
    }
    if (color && replacements[color]) {
      htmlEl.style.color = replacements[color]
    }
  })
}

export default function BrandSanitizer() {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--ds-primary', '#ff6a1a')
    root.style.setProperty('--ds-primary-hover', '#e65a12')
    root.style.setProperty('--brand-primary', '#ff6a1a')
    root.style.setProperty('--brand-primary-hover', '#e65a12')
    root.style.setProperty('--ds-primary-gradient', 'linear-gradient(112deg, rgba(255, 136, 52, 1) 0%, rgba(255, 109, 42, 0.98) 40%, rgba(236, 73, 46, 0.94) 72%, rgba(168, 44, 42, 0.92) 100%)')
    root.style.setProperty('--ds-nav-bg', '#121417')
    root.style.setProperty('--ds-page-bg', '#0b0c0f')
    root.style.setProperty('--ds-sidebar-bg', '#121417')
    root.style.setProperty('--ds-card-bg', '#16191d')
    root.style.setProperty('--ds-accent-green', '#7f848d')
    root.style.setProperty('--ds-primary-text', '#fff4ec')

    const applySanitization = (scope: ParentNode = document.body) => {
      sanitizeTextNodes(scope)
      sanitizeAnchors(scope)
      hideDisallowedNavItems(scope)
      replaceLegacyLogos(scope)
      forceLegacyColorReplacement(scope)
    }

    const handleImgError = (event: Event) => {
      const target = event.target
      if (!(target instanceof HTMLImageElement)) return
      target.classList.add('image-skeleton-fallback')
      target.style.width = '100%'
      target.style.height = '100%'
      target.style.display = 'block'
      target.style.opacity = '0'
      target.removeAttribute('srcset')
      const tileShell = target.closest('[data-content-item]') as HTMLElement | null
      tileShell?.classList.add('image-skeleton-surface')
      if (tileShell) {
        tileShell.setAttribute('data-img-error', 'true')
      }
      const bannerShell = target.closest(
        '[data-banner-card]'
      ) as HTMLElement | null
      if (bannerShell) {
        bannerShell.classList.add('image-skeleton-surface')
        bannerShell.setAttribute('data-banner-error', 'true')
      }
      if (target.src !== TRANSPARENT_PIXEL) {
        target.src = TRANSPARENT_PIXEL
      }
    }

    applySanitization()
    document.addEventListener('error', handleImgError, true)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          applySanitization(node)
        })
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      document.removeEventListener('error', handleImgError, true)
    }
  }, [])

  return null
}
