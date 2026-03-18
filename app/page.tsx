'use client'
import { useRainBalance } from '@/hooks/use-rain-balance'
import { StreakCounter } from '@/components/vip/streak-counter'
import { ReloadClaim } from '@/components/vip/reload-claim'
import { CashDropCode } from '@/components/vip/cash-drop-code'
import { BetAndGet } from '@/components/vip/bet-and-get'

// Home page - uses global header, Top Events carousel, hero banner, no sidebar
import { useState, useEffect, useRef, useCallback } from 'react'
import { useChatStore } from '@/lib/store/chatStore'
import { useBetslipStore } from '@/lib/store/betslipStore'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTracking } from '@/hooks/use-tracking'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Globe as IconWorldNav } from 'lucide-react'
import { 
  IconShield,
  IconChevronLeft,
  IconChevronRight,
  IconMenu2,
  IconX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconBrandTiktok,
  IconInfoCircle,
  IconWallet,
  IconUser,
  IconCrown,
  IconChevronDown,
  IconHeart,
  IconLoader2,
  IconClock,
  IconSearch,
  IconCoins,
  IconBolt,
  IconStar,
  IconStarFilled,
  IconBell,
  IconCreditCard,
  IconArrowRight,
  IconFileText,
  IconGift,
  IconCurrencyDollar,
  IconUserPlus,
  IconTicket,
  IconCheck,
  IconDeviceGamepad2,
  IconBallFootball,
  IconTrophy,
  IconLock,
  IconFlame,
  IconSparkles,
  IconStopwatch,
  IconDice,
  IconLifebuoy,
  IconEye,
  IconEyeOff,
  IconFingerprint,
  IconRosetteFilled,
} from '@tabler/icons-react'
import { colorTokenMap } from '@/lib/agent/designSystem'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import NumberFlow from "@number-flow/react"
import {
  Tabs as AnimateTabs,
  TabsList as AnimateTabsList,
  TabsTab,
} from '@/components/animate-ui/components/base/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerHandle,
} from '@/components/ui/drawer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { UsageBasedPricing } from '@/components/billingsdk/usage-based-pricing'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import ChatNavToggle from '@/components/chat/chat-nav-toggle'
import { NotificationHub } from '@/components/account/notification-hub'

// Helper function to get vendor icon path
const getVendorIconPath = (vendorName: string): string => {
  const vendorFileMap: Record<string, string> = {
    '7Mojos': 'provider_id_1_7mojos_20251223_1920.svg',
    'Smartsoft': 'provider_id_44_Smartsoft_20251224_1042.svg',
    'Aviator': 'provider_id_48_Aviator_20251224_1043.svg',
    'BF Games': 'provider_id_13_BF games_20251224_1036.svg',
    'Hacksaw': 'provider_id_30_hacksaw_20260226_1349.svg',
    'NetEnt': 'provider_id_5_Netent_20251224_1033.svg',
    'Yggdrasil': 'provider_id_68_Ygg Drasil_20251224_1044.svg',
    'Habanero': 'provider_id_26_Habanero_20251224_1040.svg',
    'ELK': 'provider_id_16_ELK_20251224_1037.svg',
    'GameArt': 'provider_id_24_Gameart_20251224_1039.svg',
    'Big Time Gaming': 'provider_id_2_BigTimeGaming_20251223_2136.svg',
    'BGaming': 'provider_id_45_BGaming_20251224_1042.svg',
    'Kalamba': 'provider_id_36_Kalamba_20251224_1040.svg',
    'Red Tiger': 'provider_id_7_Red Tiger_20251224_1034.svg',
    'Reevo': 'provider_id_41_Reevo_20251224_1041.svg',
    'Synot': 'provider_id_49_Synot_20251224_1043.svg',
    'GamingCorps': 'provider_id_25_Gamingcorps_20251224_1039.svg',
    'Spnmnl': 'provider_id_47_spnmnl_20260227_1642.svg',
    'No Limit City': 'provider_id_6_No Limit City_20251224_1034.svg',
    'Wazdan': 'provider_id_51_Wazdan_20251224_1044.svg',
    'Playson': 'provider_id_38_Playson_20251224_1041.svg',
    'Endorphina': 'provider_id_17_Endorphina_20251224_1037.svg',
    'Amatic': 'provider_id_11_Amatic_20251224_1036.svg',
    'CT Interactive': 'provider_id_50_CT Interactive_20251224_1044.svg',
    'Pragmatic Play': 'provider_id_10_pragmatic-play_20260221_1147.svg',
    'EGT': 'provider_id_70_EGT_20251224_1045.svg',
    'Amusnet': 'provider_id_69_Amusnet_20251224_1045.svg',
    'Pateplay': 'provider_id_8_Pateplay_20251224_1034.svg',
    'BetSoft': 'betsoft.svg',
    'Onlyplay': 'onlyplay.svg',
    'Nucleus': 'nucleus.svg',
    'Dragon Gaming': 'Dragon gaming.svg',
    'Betheat': 'provider_id_10_pragmatic-play_20260221_1147.svg',
  }
  
  if (vendorFileMap[vendorName]) {
    return `/vendot_logos/${vendorFileMap[vendorName]}`
  }
  
  const normalizedName = vendorName.toLowerCase().replace(/\s+/g, ' ').trim()
  return `/vendot_logos/${normalizedName}.svg`
}

// Available square tile images
const squareTileImages = [
  '/games/31d384b25e3d6c8704f84b3db84e31bceacf2ff16279fbcc25ad9e1bf55a7564.avif',
  '/games/eaf11ccc50dea10b36385a20d03bb066989b69b03eb0a2260fb9f94b58111908.avif',
  '/games/85df80b16ad5fc92a2a7a7e9e12f78c75dd1a33eddff36daa8a02dbc7f2eab54.avif',
  '/games/fad562df401ccfd1dde3707308efab027eea94a6cd11c35d64cc814efbb3a44f.avif',
  '/games/6cc2e6228b274e48ff6045944b153810db7131ad61d90cabce5aa35176c639e9.avif',
  '/games/ba877175859e53e10049fb0d90a236e52290b30a74449d386863873e068f05f6.avif',
  '/games/d0da486c2ef84196c52198fce55b4566303ef3d73d94c675179a8f6c4c5a3781.avif',
  '/games/41ef135e01539f2cad0971dcc7b49bbf741eccbba3cb25daaa139c8d49dc168d.avif',
  '/games/282a2fae2d94b39108e30fc0c1a448fcc666f7c804347d51ed4568cd849121b4.avif',
  '/games/c0be957b99d1a534b8fa221a225e87445766948f0b861b42700ad370fb84e22d.avif',
  '/games/7cea92185c7ace705297172c7c2d61591a1d51c6ec0e67545493598989e44b22.avif',
  '/games/d319fe86677108d19df21e0ca027be9c240c347bfd90a9038d16ab76fe9e1b56.avif',
  '/games/be2e59b9310ae467a892068b7e4afc38458ec87b2cababad70243af2c17f8f9b.avif',
  '/games/e57824a3bba6f67381074acbdc293efe50bf38966365549a92f454c3a3ffb5ff.avif',
  '/games/80cef3c2101ccc6abeb74df85fe242c1ba7cb741f4d1c16c8791818721495943.avif',
  '/games/f21318673c065243f6fcecd14babc84e0e2c3a682fc79d7f5be9334fe5834e4e.avif',
  '/games/cb8c8e48781137b94c5dea7326d5c4d15b045ee1e8282b8ca674a0ac231914a8.avif',
  '/games/14d5410c6cf4c303d291262a10e949dc14b0ac2eca2a7a730b0401919c01358e.avif',
  '/games/c5996d604ffd3f6e1e34d94425948d29f78bbd0a96c9611a78b12de8b4ff7677.avif',
  '/games/2cb39e9486a6cd37f49767537241fc8b9f5fd302f17a79c06f5220afcea27ea3.avif',
  '/games/73754d4bf421b78fbd3895bbc7890d379797588cb699d6cbe47f3656aa93613b.avif',
  '/games/ceb29aff91c7ba3033e44ee289d2eeb4e85088cdb56daac04d2e82a886542b05.avif',
  '/games/84513d6373e86453b6a8c1a1764787f1a888de7bee155b861f90289513864938.avif',
  '/games/7a77b3910795bdd5f00f045fc5bab2aca5787542c07d39def8cc8b343aaa2d71.avif',
  '/games/9407302fecd33613bc716d3b0d4f1e724334321ec910404f6b417284db593d37.avif',
]

// Originals tile images (tall rectangles)
const originalsTileImages = [
  '/games/originals/plink.png',
  '/games/originals/blackjack.png',
  '/games/originals/dice.png',
  '/games/originals/diamonds.png',
  '/games/originals/mines.png',
  '/games/originals/keno.png',
  '/games/originals/limbo.png',
  '/games/originals/wheel.png',
  '/games/originals/hilo.png',
  '/games/originals/video_poker.png',
]

// Real vendor names from the carousel (used for random assignment on tiles)
const tileVendors = [
  'Dragon Gaming', 'BetSoft', '5 Clover', '777Jacks', 'Arrow\'s Edge',
  'Blaze', 'DeckFresh', 'Emerald Gate', 'Felix', 'KA Gaming',
  'Lucky', 'Mascot Gaming', 'Nucleus', 'Onlyplay', 'Popiplay',
  'Qora', 'Red Sparrow', 'Revolver Gaming', 'Rival', 'Twain',
  'VIG', 'Wingo',
]

const priorityVendors = ['Hacksaw', 'NetEnt', 'Yggdrasil', 'Habanero', 'ELK'] as const
const casinoVendorList = [
  ...priorityVendors,
  ...[
    'Pragmatic Play',
    'Big Time Gaming',
    'Red Tiger',
    'No Limit City',
    'GameArt',
    'BGaming',
    'GamingCorps',
    'Reevo',
    'Smartsoft',
    'Synot',
    'Aviator',
    'Wazdan',
    'Kalamba',
    'Playson',
    'Endorphina',
    'Amatic',
    'CT Interactive',
    'EGT',
    'Amusnet',
    'Pateplay',
    'BF Games',
    '7Mojos',
    'Spnmnl',
    'BetSoft',
    'Onlyplay',
    'Nucleus',
    'Dragon Gaming',
  ].filter((vendor) => !priorityVendors.includes(vendor as (typeof priorityVendors)[number])),
]

const homepageLeagueTiles = [
  { label: 'NFL', icon: '/sports%20league/NFL.svg' },
  { label: 'NBA', icon: '/sports%20league/nba.svg' },
  { label: 'Premier League', icon: '/sports%20league/prem.svg' },
  { label: 'Champions', icon: '/sports%20league/champions.svg' },
  { label: 'F1', icon: '/sports%20league/f1.svg' },
  { label: 'MLB', icon: '/sports%20league/MLB.svg' },
  { label: 'NHL', icon: '/sports%20league/NHL.svg' },
  { label: 'MLS', icon: '/sports%20league/mls.svg' },
  { label: 'Copa', icon: '/sports%20league/copa.svg' },
  { label: 'UFC', icon: '/sports%20league/UFC.svg' },
  { label: 'Boxing WBA', icon: '/sports%20league/Boxing%20WBA.svg' },
  { label: 'Golf PGA', icon: '/sports%20league/Golf%20pga.svg' },
  { label: 'ATP', icon: '/sports%20league/ATP.svg' },
  { label: 'Roland Garros', icon: '/sports%20league/roland%20garros%20tennis.svg' },
] as const

// Get a vendor deterministically by index
function getTileVendor(index: number): string {
  return tileVendors[((index * 7 + 5) % tileVendors.length)]
}

// Meta tags for casino tiles
const metaTags = ['Early', 'Hot', 'Exclusive', 'New'] as const
type MetaTag = typeof metaTags[number] | 'Original'

// Deterministic tag assignment based on index
function getMetaTag(index: number, isOriginals: boolean = false): MetaTag {
  if (isOriginals) return 'Original'
  const tagIndex = ((index * 7 + 3) % 4)
  return metaTags[tagIndex]
}

// Tag icon for each meta tag
function TagIcon({ tag, className }: { tag: MetaTag; className?: string }) {
  switch (tag) {
    case 'Early': return <IconStopwatch className={cn("w-3 h-3", className)} strokeWidth={2.5} />
    case 'Hot': return <IconFlame className={cn("w-3 h-3", className)} strokeWidth={2.5} />
    case 'Exclusive': return <IconRosetteFilled className={cn("w-3 h-3", className)} />
    case 'New': return <IconSparkles className={cn("w-3 h-3", className)} strokeWidth={2.5} />
    case 'Original': return <span className={cn("text-[9px] font-black leading-none", className)}>B</span>
    default: return null
  }
}

// Tag style config
function getTagConfig(tag: MetaTag): { bg: string; border: string; text: string; iconColor: string } {
  switch (tag) {
    case 'Early': return { bg: 'bg-emerald-900/80', border: 'border-emerald-500/60', text: 'text-white', iconColor: 'text-emerald-400' }
    case 'Hot': return { bg: 'bg-red-950/80', border: 'border-red-500/60', text: 'text-white', iconColor: 'text-red-400' }
    case 'Exclusive': return { bg: 'bg-indigo-950/80', border: 'border-indigo-400/60', text: 'text-white', iconColor: 'text-indigo-300' }
    case 'New': return { bg: 'bg-yellow-900/80', border: 'border-yellow-500/60', text: 'text-white', iconColor: 'text-yellow-400' }
    case 'Original': return { bg: 'bg-white/15', border: 'border-white/25', text: 'text-white/90', iconColor: 'text-white/80' }
    default: return { bg: 'bg-white/10', border: 'border-white/20', text: 'text-white', iconColor: 'text-white' }
  }
}

// Vendor badge small icon
function VendorBadge({ vendor }: { vendor: string }) {
  const [imageError, setImageError] = useState(false)
  const iconPath = getVendorIconPath(vendor)
  
  return (
    <div className="w-4 h-4 rounded-[3px] bg-black/50 backdrop-blur-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
      {!imageError ? (
        <Image
          src={iconPath}
          alt={vendor}
          width={12}
          height={12}
          className="object-contain"
          onError={() => setImageError(true)}
          unoptimized
        />
      ) : (
        <span className="text-[8px] font-bold text-white/80 leading-none">
          {vendor.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  )
}

// Game Tag Badge - matches the design reference
function GameTagBadge({ tag, vendor }: { tag: MetaTag; vendor: string }) {
  const config = getTagConfig(tag)
  
  return (
    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
      <VendorBadge vendor={vendor} />
      <div className={cn(
        "flex items-center gap-0.5 px-1.5 py-[3px] rounded-full border backdrop-blur-sm",
        config.bg,
        config.border
      )}>
        <TagIcon tag={tag} className={config.iconColor} />
        <span className={cn("text-[9px] font-semibold leading-none", config.text)}>
          {tag}
        </span>
      </div>
    </div>
  )
}

// Payment Logo Component
function PaymentLogo({ method, className }: { method: string; className?: string }) {
  const [imageError, setImageError] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const normalizedMethod = method.toLowerCase().replace(/\s+/g, '')
  const imagePath = useFallback 
    ? `/logos/payment/${normalizedMethod}.png`
    : `/logos/payment/${normalizedMethod}.svg`
  
  return (
    <div className={`flex items-center justify-center h-8 px-2 ${className || ''}`}>
      {!imageError ? (
        <Image
          src={imagePath}
          alt={method}
          width={60}
          height={20}
          className="object-contain opacity-80 hover:opacity-100 transition-opacity"
          onError={() => {
            if (!useFallback) {
              setUseFallback(true)
            } else {
              setImageError(true)
            }
          }}
        />
      ) : (
        <span className="text-xs font-semibold text-white/70">{method}</span>
      )}
    </div>
  )
}

// Security Badge Component
function SecurityBadge({ name, iconPath, className }: { name: string; iconPath: string; className?: string }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      {!imageError ? (
        <Image
          src={iconPath}
          alt={name}
          width={52}
          height={20}
          className="object-contain opacity-80 hover:opacity-100 transition-opacity"
          onError={() => setImageError(true)}
        />
      ) : (
        <IconShield className="w-6 h-6 text-green-500" />
      )}
    </div>
  )
}

// Vendor Icon Component
function VendorIcon({ vendor }: { vendor: string }) {
  const [imageError, setImageError] = useState(false)
  const iconPath = getVendorIconPath(vendor)
  
  if (imageError) {
    return <div className="w-[74px] h-8 rounded-md bg-white/10 flex-shrink-0" />
  }
  
  return (
    <div className="w-[74px] h-8 flex-shrink-0 relative flex items-center justify-center overflow-hidden">
      <Image
        src={iconPath}
        alt={`${vendor} logo`}
        width={74}
        height={32}
        className="object-contain"
        style={{ 
          width: '74px',
          height: '32px',
          maxWidth: '74px',
          maxHeight: '32px',
          objectPosition: 'center'
        }}
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  )
}

// VIP Progress Bar Component
function VIPProgressBar({ value = 45 }: { value?: number }) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            const duration = 1500
            const startTime = Date.now()
            const startValue = 0
            const endValue = value

            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const currentValue = startValue + (endValue - startValue) * eased
              setAnimatedValue(currentValue)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setAnimatedValue(endValue)
              }
            }

            requestAnimationFrame(animate)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      observer.disconnect()
    }
  }, [value, isVisible])

  return (
    <div ref={containerRef} className="flex items-center gap-2">
      <div className="relative flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden" style={{ maxWidth: '75%' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
            boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)'
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <motion.div
        className="text-xs text-white/70 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <NumberFlow value={Math.round(animatedValue)} />%
      </motion.div>
    </div>
  )
}

// VIP Drawer Content Component
function VipDrawerContent({
  vipActiveTab,
  setVipActiveTab,
  canScrollVipLeft,
  setCanScrollVipLeft,
  canScrollVipRight,
  setCanScrollVipRight,
  vipTabsContainerRef,
  vipDrawerOpen,
  brandPrimary,
  claimedBoosts,
  setClaimedBoosts,
  boostProcessing,
  setBoostProcessing,
  boostClaimMessage,
  setBoostClaimMessage,
  onBoostClaimed,
  profitBoostOptedIn,
  setProfitBoostOptedIn
}: {
  vipActiveTab: string
  setVipActiveTab: (tab: string) => void
  canScrollVipLeft: boolean
  setCanScrollVipLeft: (can: boolean) => void
  canScrollVipRight: boolean
  setCanScrollVipRight: (can: boolean) => void
  vipTabsContainerRef: React.RefObject<HTMLDivElement>
  vipDrawerOpen: boolean
  brandPrimary: string
  claimedBoosts: Set<string>
  setClaimedBoosts: (boosts: Set<string> | ((prev: Set<string>) => Set<string>)) => void
  boostProcessing: string | null
  setBoostProcessing: (id: string | null) => void
  boostClaimMessage: { amount: number } | null
  setBoostClaimMessage: (message: { amount: number } | null) => void
  onBoostClaimed: (amount: number) => void
  profitBoostOptedIn: boolean
  setProfitBoostOptedIn: (updater: boolean | ((prev: boolean) => boolean)) => void
}) {
  const isMobile = useIsMobile()
  const checkScroll = useCallback(() => {
    const container = vipTabsContainerRef.current
    if (!container) {
      setCanScrollVipLeft(false)
      setCanScrollVipRight(false)
      return
    }
    const { scrollLeft, scrollWidth, clientWidth } = container
    const canScroll = scrollWidth > clientWidth
    setCanScrollVipLeft(canScroll && scrollLeft > 5)
    setCanScrollVipRight(canScroll && scrollLeft < scrollWidth - clientWidth - 5)
  }, [vipTabsContainerRef, setCanScrollVipLeft, setCanScrollVipRight])

  useEffect(() => {
    if (!vipDrawerOpen) {
      setCanScrollVipLeft(false)
      setCanScrollVipRight(false)
      return
    }
    
    const container = vipTabsContainerRef.current
    if (!container) {
      setCanScrollVipLeft(false)
      setCanScrollVipRight(false)
      return
    }
    
    const timeoutId = setTimeout(() => {
      checkScroll()
    }, 100)
    
    const handleScroll = () => {
      checkScroll()
    }
    
    const handleResize = () => {
      checkScroll()
    }
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timeoutId)
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [vipDrawerOpen, checkScroll, vipTabsContainerRef])

  useEffect(() => {
    if (!vipDrawerOpen) return
    
    const container = vipTabsContainerRef.current
    if (!container) return

    const tabs = ['VIP Hub', 'Cash Boost', 'Profit Boost', 'Bet & Get', 'Reloads', 'Cash Drop']
    const activeIndex = tabs.indexOf(vipActiveTab)
    
    if (activeIndex === -1) return

    const tabButtons = container.querySelectorAll('button')
    const activeButton = tabButtons[activeIndex]
    
    if (activeButton) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      const scrollLeft = container.scrollLeft
      const buttonLeft = buttonRect.left - containerRect.left + scrollLeft
      const buttonWidth = buttonRect.width
      const containerWidth = containerRect.width
      
      const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2)
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
      
      setTimeout(() => {
        checkScroll()
      }, 500)
    }
  }, [vipActiveTab, vipDrawerOpen, checkScroll, vipTabsContainerRef])

  const scrollVipLeft = () => {
    if (vipTabsContainerRef.current) {
      vipTabsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      setTimeout(() => checkScroll(), 300)
    }
  }

  const scrollVipRight = () => {
    if (vipTabsContainerRef.current) {
      vipTabsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      setTimeout(() => checkScroll(), 300)
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className={cn("pt-2 pb-3 relative z-10 flex-shrink-0 overflow-visible", isMobile ? "pl-3 pr-0" : "pl-4 pr-0")}>
        {!isMobile && canScrollVipLeft && (
          <button
            onClick={scrollVipLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg"
            style={{ pointerEvents: 'auto', marginLeft: '12px' }}
          >
            <IconChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
        
        <div 
          ref={vipTabsContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            overscrollBehaviorX: 'auto',
            scrollSnapType: 'x mandatory',
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            position: 'relative',
            left: 0,
            transform: 'translateX(0)',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
          onScroll={checkScroll}
        >
          <div 
            className="bg-white/5 dark:bg-white/5 bg-gray-100/80 dark:bg-white/5 p-0.5 h-auto gap-1 rounded-3xl border-0 relative transition-colors duration-300 backdrop-blur-xl flex items-center"
            style={{
              minWidth: 'max-content',
              width: 'max-content',
              flexShrink: 0,
              marginLeft: isMobile ? '0px' : '0px',
              marginRight: '16px',
              paddingLeft: 0,
              paddingRight: 0,
              touchAction: 'pan-x',
              pointerEvents: 'auto'
            }}
          >
            {['VIP Hub', 'Cash Boost', 'Profit Boost', 'Bet & Get', 'Reloads', 'Cash Drop'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setVipActiveTab(tab)}
                className={cn(
                  "relative px-4 py-1 h-9 text-xs font-medium rounded-2xl transition-all duration-300 whitespace-nowrap flex-shrink-0",
                  vipActiveTab === tab
                    ? "text-black bg-[#fef3c7]"
                    : "text-white/70 hover:text-white hover:bg-white/5 dark:hover:bg-white/5 bg-transparent"
                )}
                style={{
                  scrollSnapAlign: 'start',
                  touchAction: 'manipulation'
                }}
              >
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
        
        {!isMobile && canScrollVipRight && (
          <button
            onClick={scrollVipRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg"
            style={{ pointerEvents: 'auto', marginRight: '8px' }}
          >
            <IconChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </div>
      
      <div className={cn("px-4 pt-4 overflow-y-auto flex-1 min-h-0", isMobile ? "pb-6" : "pb-2")} style={{ WebkitOverflowScrolling: 'touch', overflowY: 'auto', flex: '1 1 auto', minHeight: 0, paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 24px)' : undefined }}>
        {vipActiveTab === 'VIP Hub' && (
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <CardTitle className="text-sm text-white/70 mb-2">Diamond I to Diamond II</CardTitle>
                <VIPProgressBar value={45} />
                <div className="text-xs text-white/50 mt-2">Updated 24/25/2024, 8:00 PM ET</div>
              </CardContent>
            </Card>
            
            <StreakCounter />


            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">My Benefits</h3>
              <Accordion type="single" defaultValue="Gold" collapsible className="w-full">
                <AccordionItem value="Bronze" className={cn("border-white/10", "opacity-50")}>
                  <AccordionTrigger value="Bronze" className="text-white/50 hover:text-white/70">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-amber-600" />
                      <span className="line-through">Bronze</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Bronze">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white/50">$0</div>
                      <div className="text-sm text-white/50">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <div className="h-4 w-4 rounded-full bg-white/10 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Daily Cash Race</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="text-xs text-white/50 font-medium">Complete</div>
                        <Button variant="ghost" className="mt-2 text-white/70 hover:text-white hover:bg-white/5">
                          VIP Rewards
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Silver" className={cn("border-white/10", "opacity-50")}>
                  <AccordionTrigger value="Silver" className="text-white/50 hover:text-white/70">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-gray-400" />
                      <span className="line-through">Silver</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Silver">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white/50">$10K</div>
                      <div className="text-sm text-white/50">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <div className="h-4 w-4 rounded-full bg-white/10 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Daily Cash Race</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <div className="h-4 w-4 rounded-full bg-white/10 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Birthday Rewards</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="text-xs text-white/50 font-medium">Complete</div>
                        <Button variant="ghost" className="mt-2 text-white/70 hover:text-white hover:bg-white/5">
                          VIP Rewards
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Gold" className="border-white/10 relative">
                  <motion.div
                    className="absolute inset-0 bg-white/5 pointer-events-none"
                    animate={{
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <AccordionTrigger value="Gold" className="text-white hover:text-white relative z-10">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-yellow-400" />
                      <span>Gold</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Gold">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white">$50K</div>
                      <div className="text-sm text-white/70">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Daily Cash Race</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Birthday Rewards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Weekly Cash Boost</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Monthly Cash Boost</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Level Up Bonuses</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Platinum" className="border-white/10">
                  <AccordionTrigger value="Platinum" className="text-white hover:text-white">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-cyan-400" />
                      <span>Platinum I - III</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Platinum">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white">$100K - 500K</div>
                      <div className="text-sm text-white/70">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Daily Cash Race</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Birthday Rewards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Weekly Cash Boost</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Monthly Cash Boost</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Level Up Bonuses</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Diamond" className="border-white/10">
                  <AccordionTrigger value="Diamond" className="text-white hover:text-white">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-emerald-400" />
                      <span>Diamond I - III</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Diamond">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white">$1M - 5M</div>
                      <div className="text-sm text-white/70">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>All Platinum I - III Benefits</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Monthly Cash Boost</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Level Up Bonuses</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Prioritized Withdrawals</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Dedicated VIP Team</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Elite" className="border-white/10">
                  <AccordionTrigger value="Elite" className="text-white hover:text-white">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-purple-400" />
                      <span>Elite I - III</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Elite">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white">$100M - 500M</div>
                      <div className="text-sm text-white/70">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>All Diamond I - III Benefits</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Free Crypto Withdrawals</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Reduced Deposit Fees</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Exclusive Refer-A-Friend</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Dedicated VIP Team</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Black" className="border-white/10">
                  <AccordionTrigger value="Black" className="text-white hover:text-white">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-gray-800" />
                      <span>Black I - III</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Black">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white">$100M+</div>
                      <div className="text-sm text-white/70">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>All Elite I - III Benefits</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Reduced Deposit Fees</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Exclusive Refer-A-Friend</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Tailored Gifts & Rewards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Dedicated VIP Team</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="Obsidian" className="border-white/10">
                  <AccordionTrigger value="Obsidian" className="text-white hover:text-white">
                    <div className="flex items-center gap-3">
                      <IconCrown className="w-5 h-5 text-purple-900" />
                      <span>Obsidian I - III</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value="Obsidian">
                    <div className="space-y-3 pt-2">
                      <div className="text-lg font-semibold text-white">$1B+</div>
                      <div className="text-sm text-white/70">Wager Amount</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>All Black I - III Benefits</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Reduced Deposit Fees</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Exclusive Refer-A-Friend</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Tailored Gifts & Rewards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                            <IconCheck className="h-3 w-3" />
                          </div>
                          <span>Dedicated VIP Team</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
        
        {vipActiveTab === 'Cash Boost' && (
          <div className="space-y-3">
            {boostClaimMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <IconCheck className="w-5 h-5 text-green-400" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">
                    ${boostClaimMessage.amount.toFixed(2)} have been claimed and added to your balance
                  </div>
                </div>
              </motion.div>
            )}
            {claimedBoosts.has('weekly') && claimedBoosts.has('monthly') ? (
              <Card className="bg-white/3 border-white/5">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center mb-6">
                      <IconCrown className="w-10 h-10 text-white/40" strokeWidth={1.5} />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-white/70 text-sm leading-relaxed">
                        Keep on playing and check back for any cash<br />
                        boost rewards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {!claimedBoosts.has('weekly') && (
                  <div className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#fbbf24]/5 border border-[#fbbf24]/20 p-4 transition-all">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/20 flex items-center justify-center">
                        <IconCoins className="w-6 h-6 text-[#fbbf24]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-bold text-white">$15.00</div>
                      <div className="text-xs text-white/40">Weekly Cash Boost</div>
                    </div>
                    <Button 
                      variant="ghost"
                      className="text-white hover:bg-[#ee3536]/90 bg-[#ee3536] text-xs px-4 py-1.5 h-8 rounded-lg font-semibold border-0"
                      onClick={() => {
                        setBoostProcessing('weekly')
                        setTimeout(() => {
                          setClaimedBoosts(prev => new Set([...prev, 'weekly']))
                          setBoostProcessing(null)
                          setBoostClaimMessage({ amount: 15 })
                          onBoostClaimed(15)
                          setTimeout(() => {
                            setBoostClaimMessage(null)
                          }, 3000)
                        }, 1500)
                      }}
                      disabled={boostProcessing !== null}
                    >
                      {boostProcessing === 'weekly' ? (
                        <div className="flex items-center gap-2">
                          <IconLoader2 className="w-3 h-3 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'CLAIM'
                      )}
                    </Button>
                  </div>
                )}
                {!claimedBoosts.has('monthly') && (
                  <div className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#fbbf24]/5 border border-[#fbbf24]/20 p-4 transition-all">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/20 flex items-center justify-center">
                        <IconCoins className="w-6 h-6 text-[#fbbf24]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-bold text-white">$20.00</div>
                      <div className="text-xs text-white/40">Monthly Cash Boost</div>
                    </div>
                    <Button 
                      variant="ghost"
                      className="text-white hover:bg-[#ee3536]/90 bg-[#ee3536] text-xs px-4 py-1.5 h-8 rounded-lg font-semibold border-0"
                      onClick={() => {
                        setBoostProcessing('monthly')
                        setTimeout(() => {
                          setClaimedBoosts(prev => new Set([...prev, 'monthly']))
                          setBoostProcessing(null)
                          setBoostClaimMessage({ amount: 20 })
                          onBoostClaimed(20)
                          setTimeout(() => {
                            setBoostClaimMessage(null)
                          }, 3000)
                        }, 1500)
                      }}
                      disabled={boostProcessing !== null}
                    >
                      {boostProcessing === 'monthly' ? (
                        <div className="flex items-center gap-2">
                          <IconLoader2 className="w-3 h-3 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'CLAIM'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        

        {vipActiveTab === 'Profit Boost' && (
          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-[#232323] overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-amber-300 flex-shrink-0 mt-1">
                      <IconBolt className="h-3 w-3 text-black fill-black" strokeWidth={2.6} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Profit Boost</div>
                      <div className="text-xs text-white/70 mt-0.5">Opt in to activate this offer.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const next = !profitBoostOptedIn
                      setProfitBoostOptedIn(next)
                      try {
                        localStorage.setItem('profitBoostOptedIn', next ? 'true' : 'false')
                      } catch {}
                      window.dispatchEvent(new Event('profit-boost-updated'))
                      window.dispatchEvent(new CustomEvent('profit-boost-optin-toggled', { detail: { optedIn: next } }))
                    }}
                    className={`relative w-12 h-7 rounded-full border transition-colors flex-shrink-0 ${
                      profitBoostOptedIn
                        ? 'bg-emerald-500/25 border-emerald-400/40'
                        : 'bg-white/10 border-white/20'
                    }`}
                    aria-label="Toggle Profit Boost opt in"
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        profitBoostOptedIn ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wide text-white/55">League</div>
                    <div className="text-sm font-semibold text-white mt-0.5">Premier League</div>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wide text-white/55">Required Bet</div>
                    <div className="text-sm font-semibold text-white mt-0.5">$50</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {vipActiveTab === 'Bet & Get' && (
          <BetAndGet />
        )}
        
        {vipActiveTab === 'Reloads' && (
          <ReloadClaim />
        )}
        
        {vipActiveTab === 'Cash Drop' && (
          <CashDropCode />
        )}
      </div>
    </div>
  )
}

function HomePageContent() {
  const isMobile = useIsMobile()
  const HEADER_COMPACT_BREAKPOINT = 1180
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { trackNav, trackClick, trackAction, trackSidebar } = useTracking('home')
  
  // Global betslip store for adding bets from homepage Top Sports
  const globalBets = useBetslipStore((s) => s.bets)
  const globalAddBet = useBetslipStore((s) => s.addBet)
  const globalRemoveBet = useBetslipStore((s) => s.removeBet)
  const setGlobalBetslipOpen = useBetslipStore((s) => s.setOpen)
  const setGlobalBetslipMinimized = useBetslipStore((s) => s.setMinimized)
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const [loadingQuickLink, setLoadingQuickLink] = useState<string | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [balance, setBalance] = useState(10)
  const [displayBalance, setDisplayBalance] = useState(10)
  useRainBalance(setBalance, setDisplayBalance)
  const pendingBalanceRef = useRef(0)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false)
  const [authPopupView, setAuthPopupView] = useState<'register' | 'login'>('register')
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    mobile: '',
    username: '',
  })
  const [registerCountryCode, setRegisterCountryCode] = useState('+1')
  const [registerDob, setRegisterDob] = useState({ day: '', month: '', year: '' })
  const [registerFormTouched, setRegisterFormTouched] = useState(false)
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false)
  const [loginPopupTouched, setLoginPopupTouched] = useState(false)
  const [isTabletHeader, setIsTabletHeader] = useState(false)
  const [headerLanguage, setHeaderLanguage] = useState<'EN' | 'ES' | 'DE' | 'FR' | 'PT'>('EN')
  const [vipDrawerOpen, setVipDrawerOpen] = useState(false)
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false)
  const [accountDrawerView, setAccountDrawerView] = useState<'account' | 'notifications' | 'transactions' | 'security' | 'createAccount' | 'createAccountConfirmation' | 'login'>('account')
  const accountTransactionRows = [
    { id: 't1', date: '18/02/2026', type: 'DEPOSIT', method: 'Bitcoin', amount: '+$500.00', status: 'COMPLETED' },
    { id: 't2', date: '15/02/2026', type: 'WITHDRAWAL', method: 'Bitcoin', amount: '-$200.00', status: 'COMPLETED' },
    { id: 't3', date: '12/02/2026', type: 'DEPOSIT', method: 'Credit Card', amount: '+$100.00', status: 'COMPLETED' },
    { id: 't4', date: '10/02/2026', type: 'BONUS', method: 'System', amount: '+$25.00', status: 'CREDITED' },
    { id: 't5', date: '08/02/2026', type: 'WITHDRAWAL', method: 'Bitcoin', amount: '-$1000.00', status: 'PENDING' },
    { id: 't6', date: '05/02/2026', type: 'DEPOSIT', method: 'Ethereum', amount: '+$250.00', status: 'COMPLETED' },
  ] as const
  const webInboxUnreadCount = 2
  const [createAccountForm, setCreateAccountForm] = useState({
    fullName: '',
    email: '',
    password: '',
    countryCode: '+1',
    phone: '',
    dob: '',
  })
  const [createAccountAlias, setCreateAccountAlias] = useState('')
  const [createAccountTouched, setCreateAccountTouched] = useState(false)
  const [createAccountPasswordVisible, setCreateAccountPasswordVisible] = useState(false)
  const isCompactHeader = isMobile || isTabletHeader

  useEffect(() => {
    const syncTabletHeader = () => {
      setIsTabletHeader(window.innerWidth < HEADER_COMPACT_BREAKPOINT)
    }

    syncTabletHeader()
    window.addEventListener('resize', syncTabletHeader)
    return () => window.removeEventListener('resize', syncTabletHeader)
  }, [HEADER_COMPACT_BREAKPOINT])
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '', keepLoggedIn: false })
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false)
  const [createAccountDob, setCreateAccountDob] = useState({ day: '', month: '', year: '' })
  const dobDayRef = useRef<HTMLInputElement>(null)
  const dobMonthRef = useRef<HTMLInputElement>(null)
  const dobYearRef = useRef<HTMLInputElement>(null)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const stored = localStorage.getItem('bol-auth-logged-in')
      return stored === null ? true : stored === 'true'
    } catch {
      return true
    }
  })
  const [depositDrawerOpen, setDepositDrawerOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState(25)
  const [useManualAmount, setUseManualAmount] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bitcoin')
  const [showDepositConfirmation, setShowDepositConfirmation] = useState(false)
  const [depositStep, setDepositStep] = useState<'started' | 'processing' | 'almost' | 'complete'>('started')
  const [transactionId, setTransactionId] = useState<string>('')
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [stepLoading, setStepLoading] = useState<{started: boolean, processing: boolean, almost: boolean, complete: boolean}>({
    started: false,
    processing: false,
    almost: false,
    complete: false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('bol-auth-logged-in', isUserLoggedIn ? 'true' : 'false')
    } catch {
      // ignore storage failures
    }
  }, [isUserLoggedIn])

  const createAccountErrors = {
    fullName: createAccountForm.fullName.trim().length >= 2 ? '' : 'Please enter your full name',
    email: /\S+@\S+\.\S+/.test(createAccountForm.email.trim()) ? '' : 'Please enter a valid email',
    password: createAccountForm.password.trim().length >= 6 ? '' : 'Use at least 6 characters',
    phone: createAccountForm.phone.trim().length >= 7 ? '' : 'Please enter a valid phone number',
    dob: createAccountForm.dob.trim().length > 0 ? '' : 'Please add your date of birth',
  }
  const createAccountDobDayNum = Number(createAccountDob.day)
  const createAccountDobMonthNum = Number(createAccountDob.month)
  const createAccountDobYearNum = Number(createAccountDob.year)
  const currentYear = new Date().getFullYear()
  const isCreateAccountDobValid = createAccountDob.day.length === 2
    && createAccountDob.month.length === 2
    && createAccountDob.year.length === 4
    && createAccountDobDayNum >= 1
    && createAccountDobDayNum <= 31
    && createAccountDobMonthNum >= 1
    && createAccountDobMonthNum <= 12
    && createAccountDobYearNum >= 1900
    && createAccountDobYearNum <= currentYear
  createAccountErrors.dob = isCreateAccountDobValid ? '' : 'Please add a valid date of birth'
  const createAccountInputClass = "h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]"
  const createAccountSelectClass = "h-11 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]"
  const canSubmitLogin = loginForm.identifier.trim().length > 0 && loginForm.password.trim().length >= 6
  const isCreateAccountStepValid = Object.values(createAccountErrors).every((value) => value === '')
  const walletFieldClass = "auth-popup-field h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-sm text-white placeholder:text-white/40 focus:border-white/[0.14] focus:bg-white/[0.03] focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
  const walletSelectClass = "auth-popup-select h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 pr-8 text-sm text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-white/[0.14] focus:bg-white/[0.03] appearance-none shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
  const formatMobileInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 15)
    if (!digits) return ''
    if (digits.length <= 3) return `+${digits}`
    if (digits.length <= 6) return `+${digits.slice(0, 3)} ${digits.slice(3)}`
    if (digits.length <= 10) return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10)}`
  }
  const formatLocalMobileInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 12)
    if (!digits) return ''
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
    if (digits.length <= 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10)}`
  }
  const registerDobDayNum = Number(registerDob.day)
  const registerDobMonthNum = Number(registerDob.month)
  const registerDobYearNum = Number(registerDob.year)
  const isRegisterDobValid = registerDob.day.length > 0
    && registerDob.month.length > 0
    && registerDob.year.length === 4
    && registerDobDayNum >= 1
    && registerDobDayNum <= 31
    && registerDobMonthNum >= 1
    && registerDobMonthNum <= 12
    && registerDobYearNum >= 1900
    && registerDobYearNum <= currentYear
  const registerFormErrors = {
    email: /\S+@\S+\.\S+/.test(registerForm.email.trim()) ? '' : 'Please enter a valid email',
    password: registerForm.password.trim().length >= 6 ? '' : 'Use at least 6 characters',
    mobile: registerForm.mobile.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid mobile number',
    username: registerForm.username.trim().length >= 3 ? '' : 'Username must be at least 3 characters',
    dob: isRegisterDobValid ? '' : 'Please add a valid date of birth',
  }
  const canSubmitRegisterForm = Object.values(registerFormErrors).every((value) => value === '')

  // Mutual exclusion helpers — only one drawer open at a time
  const openAccountDrawer = useCallback(() => {
    trackClick('account-drawer', 'My Account')
    try {
      localStorage.setItem('bh-open-casino-account-drawer', '1')
    } catch {}
    router.push('/casino')
    useChatStore.getState().setIsOpen(false)
  }, [trackClick, router])
  const openVipDrawer = useCallback(() => {
    trackClick('vip-hub', 'VIP Hub')
    setAccountDrawerOpen(false)
    setDepositDrawerOpen(false)
    setVipDrawerOpen(true)
    useChatStore.getState().setIsOpen(false)
  }, [trackClick])
  const openDepositDrawer = useCallback(() => {
    trackClick('deposit', 'Deposit')
    try {
      localStorage.setItem('bh-open-casino-deposit-drawer', '1')
    } catch {}
    router.push('/casino')
    useChatStore.getState().setIsOpen(false)
  }, [trackClick, router])

  // Panel exclusivity: when chat opens, close all drawers + collapse sidebar
  useEffect(() => {
    const handleChatOpened = () => {
      setAccountDrawerOpen(false)
      setVipDrawerOpen(false)
      setDepositDrawerOpen(false)
      setOpen(false)
      setSidebarOpenMobile(false)
    }
    window.addEventListener('panel:chat-opened', handleChatOpened)
    return () => window.removeEventListener('panel:chat-opened', handleChatOpened)
  }, [])

  const [vipActiveTab, setVipActiveTab] = useState('VIP Hub')
  const [profitBoostOptedIn, setProfitBoostOptedIn] = useState(false)
  const profitBoostRequiredBetMarket = 'Premier League'
  const profitBoostRequiredBetStake = 50

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      setProfitBoostOptedIn(localStorage.getItem('profitBoostOptedIn') === 'true')
    } catch {}
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('profitBoostOptedIn', profitBoostOptedIn ? 'true' : 'false')
    } catch {}
  }, [profitBoostOptedIn])

  const vipTabsContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollVipLeft, setCanScrollVipLeft] = useState(false)
  const [canScrollVipRight, setCanScrollVipRight] = useState(false)
  const [claimedBoosts, setClaimedBoosts] = useState<Set<string>>(new Set())
  const [boostProcessing, setBoostProcessing] = useState<string | null>(null)
  const [boostClaimMessage, setBoostClaimMessage] = useState<{ amount: number } | null>(null)
  const { state: sidebarState, toggleSidebar, open: sidebarOpen, setOpen, openMobile: sidebarOpenMobile, setOpenMobile: setSidebarOpenMobile } = useSidebar()
  
  const handleBoostClaimed = useCallback((amount: number) => {
    setDisplayBalance(prev => prev + amount)
  }, [])
  
  const handleVipDrawerOpenChange = useCallback((open: boolean) => {
    setVipDrawerOpen(open)
    if (!open) {
      setVipActiveTab('VIP Hub')
    } else {
      setAccountDrawerOpen(false)
      setDepositDrawerOpen(false)
    }
  }, [])

  const handleDepositDrawerOpenChange = useCallback((open: boolean) => {
    setDepositDrawerOpen(open)
    if (!open) {
      setShowDepositConfirmation(false)
      setDepositStep('started')
      setTransactionId('')
      setIsDepositLoading(false)
      setStepLoading({started: false, processing: false, almost: false, complete: false})
    } else {
      setAccountDrawerOpen(false)
      setVipDrawerOpen(false)
    }
  }, [])
  
  // Game launcher states
  const [selectedGame, setSelectedGame] = useState<{ title: string; image: string; provider?: string; features?: string[] } | null>(null)
  const [gameLauncherMenuOpen, setGameLauncherMenuOpen] = useState(false)
  const [gameImageLoaded, setGameImageLoaded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [similarGamesDrawerOpen, setSimilarGamesDrawerOpen] = useState(false)
  const [favoritedGames, setFavoritedGames] = useState<Set<number>>(new Set())
  const gameLauncherMenuRef = useRef<HTMLDivElement>(null)
  const gameImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOpenVipBenefits = () => {
      openVipDrawer()
      setVipActiveTab('VIP Hub')
    }
    const onLaunchGameOfWeek = (evt: Event) => {
      const detail = (evt as CustomEvent<{ game?: { title: string; image: string; provider?: string; features?: string[] } }>).detail
      if (detail?.game) {
        setSelectedGame(detail.game)
        return
      }
      setSelectedGame({
        title: 'Game of the Week',
        image: '/banners/casino/casino_banner1.svg',
        provider: 'Dragon Gaming',
        features: ['Weekly featured title', 'Bonus rounds enabled'],
      })
    }
    const onClaimReward = (evt: Event) => {
      const amount = (evt as CustomEvent<{ amount?: number }>).detail?.amount ?? 250
      setBalance((prev) => prev + amount)
      setDisplayBalance((prev) => prev + amount)
    }

    window.addEventListener('notification:open-vip-benefits', onOpenVipBenefits)
    window.addEventListener('notification:launch-game-of-week', onLaunchGameOfWeek as EventListener)
    window.addEventListener('notification:claim-reward', onClaimReward as EventListener)
    return () => {
      window.removeEventListener('notification:open-vip-benefits', onOpenVipBenefits)
      window.removeEventListener('notification:launch-game-of-week', onLaunchGameOfWeek as EventListener)
      window.removeEventListener('notification:claim-reward', onClaimReward as EventListener)
    }
  }, [openVipDrawer])
  
  // Helper function to hash game title to a number for favoritedGames Set
  const hashGameTitle = (title: string): number => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  
  // Carousel API states
  const [topEventsCarouselApi, setTopEventsCarouselApi] = useState<CarouselApi>()
  const [topEventsCanScrollPrev, setTopEventsCanScrollPrev] = useState(false)
  const [topEventsCanScrollNext, setTopEventsCanScrollNext] = useState(false)
  const [slotsCarouselApi, setSlotsCarouselApi] = useState<CarouselApi>()
  const [slotsCanScrollPrev, setSlotsCanScrollPrev] = useState(false)
  const [slotsCanScrollNext, setSlotsCanScrollNext] = useState(false)
  const [originalsCarouselApi, setOriginalsCarouselApi] = useState<CarouselApi>()
  const [originalsCanScrollPrev, setOriginalsCanScrollPrev] = useState(false)
  const [originalsCanScrollNext, setOriginalsCanScrollNext] = useState(false)
  const [vendorsCarouselApi, setVendorsCarouselApi] = useState<CarouselApi>()
  
  // Top Events scores state
  const [topEventsScores, setTopEventsScores] = useState<Record<number, { team1: number; team2: number; animating?: { team: number; from: number; to: number } }>>({})
  
  // Activity Leaderboard state
  const [activityTab, setActivityTab] = useState<'All Bets' | 'Jackpot Winners' | 'High Rollers'>('All Bets')
  const [activityFeed, setActivityFeed] = useState<Array<{
    id: string
    type: 'casino'
    event: string
    user: string
    time: string
    multiplier: string
    winAmount?: string
    gameImage?: string
  }>>([])
  
  // Jackpot Winners data
  const jackpotWinnersData = [
    { id: 'jp1', user: 'LuckyBet', game: 'Mega Moolah', amount: '$250,000.00', time: '2 hrs ago', gameImage: squareTileImages[3] },
    { id: 'jp2', user: 'Hidden', game: 'Sweet Bonanza', amount: '$87,432.50', time: '5 hrs ago', gameImage: squareTileImages[7] },
    { id: 'jp3', user: 'CasinoKing', game: 'Gates of Olympus', amount: '$45,120.00', time: '8 hrs ago', gameImage: squareTileImages[1] },
    { id: 'jp4', user: 'Hidden', game: 'Book of Dead', amount: '$32,750.00', time: '12 hrs ago', gameImage: squareTileImages[1] },
    { id: 'jp5', user: 'GamerX', game: 'Starburst', amount: '$28,900.75', time: '1 day ago', gameImage: squareTileImages[0] },
    { id: 'jp6', user: 'Hidden', game: "Gonzo's Quest", amount: '$19,450.00', time: '1 day ago', gameImage: squareTileImages[2] },
    { id: 'jp7', user: 'HighRoller', game: 'Razor Shark', amount: '$15,230.00', time: '2 days ago', gameImage: squareTileImages[5] },
    { id: 'jp8', user: 'Hidden', game: 'Big Bass Bonanza', amount: '$12,800.50', time: '2 days ago', gameImage: squareTileImages[6] },
    { id: 'jp9', user: 'Player1', game: 'Dead or Alive', amount: '$9,500.00', time: '3 days ago', gameImage: squareTileImages[4] },
    { id: 'jp10', user: 'Hidden', game: 'Mega Moolah', amount: '$8,120.25', time: '3 days ago', gameImage: squareTileImages[3] },
  ]

  // Generate mock activity data - casino only
  const generateActivity = useCallback(() => {
    const users = ['Gurvinderdeo', 'Eruyarr4545', 'JadrankaB', 'VUDEMMADHU', 'Dzikiti123', 'Player1', 'GamerX', 'LuckyBet', 'HighRoller', 'CasinoKing']
    const casinoGames = [
      { name: 'Starburst', image: squareTileImages[0] },
      { name: 'Book of Dead', image: squareTileImages[1] },
      { name: 'Gonzo\'s Quest', image: squareTileImages[2] },
      { name: 'Mega Moolah', image: squareTileImages[3] },
      { name: 'Dead or Alive', image: squareTileImages[4] },
      { name: 'Razor Shark', image: squareTileImages[5] },
      { name: 'Big Bass Bonanza', image: squareTileImages[6] },
      { name: 'Sweet Bonanza', image: squareTileImages[7] },
    ]
    
    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    
    const eventData = casinoGames[Math.floor(Math.random() * casinoGames.length)]
    
    const user = users[Math.floor(Math.random() * users.length)]
    const isHidden = Math.random() < 0.6 // 60% chance of being hidden
    const displayUser = isHidden ? 'Hidden' : user
    
    const betAmount = activityTab === 'High Rollers'
      ? (Math.random() * 15000 + 1000).toFixed(2)
      : (Math.random() * 5000 + 10).toFixed(2)

    const multiplier = (Math.random() * 19.5 + 0.1).toFixed(2)
    const payoutRaw = parseFloat(betAmount) * (parseFloat(multiplier) - 1)
    const payoutAbs = Math.abs(payoutRaw).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      id: `casino-${Date.now()}-${Math.random()}`,
      type: 'casino' as const,
      event: eventData.name,
      user: displayUser,
      time: timeStr,
      multiplier: `${multiplier}×`,
      winAmount: `${payoutRaw < 0 ? '-' : ''}$${payoutAbs}`,
      gameImage: eventData.image
    }
  }, [activityTab])
  
  // Initialize and update activity feed
  useEffect(() => {
    // Initialize with 6 items
    const initialFeed = Array.from({ length: 6 }, () => generateActivity())
    setActivityFeed(initialFeed)
    
    // Add new activity every 3-5 seconds, keep only 6 visible
    const interval = setInterval(() => {
      setActivityFeed(prev => {
        const newActivity = generateActivity()
        return [newActivity, ...prev.slice(0, 5)] // Keep max 6 items
      })
    }, Math.random() * 2000 + 3000) // 3-5 seconds
    
    return () => clearInterval(interval)
  }, [activityTab, generateActivity])
  
  // Set up carousel scroll state watchers
  useEffect(() => {
    if (!topEventsCarouselApi) return
    setTopEventsCanScrollPrev(topEventsCarouselApi.canScrollPrev())
    setTopEventsCanScrollNext(topEventsCarouselApi.canScrollNext())
    topEventsCarouselApi.on('select', () => {
      setTopEventsCanScrollPrev(topEventsCarouselApi.canScrollPrev())
      setTopEventsCanScrollNext(topEventsCarouselApi.canScrollNext())
    })
  }, [topEventsCarouselApi])
  
  useEffect(() => {
    if (!slotsCarouselApi) return
    setSlotsCanScrollPrev(slotsCarouselApi.canScrollPrev())
    setSlotsCanScrollNext(slotsCarouselApi.canScrollNext())
    slotsCarouselApi.on('select', () => {
      setSlotsCanScrollPrev(slotsCarouselApi.canScrollPrev())
      setSlotsCanScrollNext(slotsCarouselApi.canScrollNext())
    })
  }, [slotsCarouselApi])
  
  useEffect(() => {
    if (!originalsCarouselApi) return
    setOriginalsCanScrollPrev(originalsCarouselApi.canScrollPrev())
    setOriginalsCanScrollNext(originalsCarouselApi.canScrollNext())
    originalsCarouselApi.on('select', () => {
      setOriginalsCanScrollPrev(originalsCarouselApi.canScrollPrev())
      setOriginalsCanScrollNext(originalsCarouselApi.canScrollNext())
    })
  }, [originalsCarouselApi])

  // Mobile: Quick links scroll handler
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        setQuickLinksOpen(true)
      } else if (currentScrollY < lastScrollY) {
        setQuickLinksOpen(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setQuickLinksOpen(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile, lastScrollY])

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date().toLocaleString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }))
  }, [])

  // Detect landscape orientation on mobile
  useEffect(() => {
    if (!isMobile) return
    
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [isMobile])

  // Close menu when game launcher closes and reset image loaded state
  useEffect(() => {
    if (!selectedGame) {
      setGameLauncherMenuOpen(false)
      setGameImageLoaded(false)
      setIsFullscreen(false)
      // Animate any pending balance (e.g. jackpot winnings) now that launcher is closed
      const pendingAmount = pendingBalanceRef.current
      if (pendingAmount > 0) {
        pendingBalanceRef.current = 0
        setTimeout(() => {
          setBalance(prev => {
            const newBal = +(prev + pendingAmount).toFixed(2)
            setDisplayBalance(currentDisplay => {
              const start = currentDisplay
              const end = newBal
              const duration = 2000
              const startTime = performance.now()
              const animate = (now: number) => {
                const elapsed = now - startTime
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setDisplayBalance(+(start + (end - start) * eased).toFixed(2))
                if (progress < 1) requestAnimationFrame(animate)
              }
              requestAnimationFrame(animate)
              return currentDisplay
            })
            return newBal
          })
        }, 400)
      }
    } else {
      // Reset image loaded state when new game is selected
      setGameImageLoaded(false)
      setIsFullscreen(false)
    }
  }, [selectedGame])

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement))
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gameLauncherMenuRef.current && !gameLauncherMenuRef.current.contains(event.target as Node)) {
        setGameLauncherMenuOpen(false)
      }
    }
    
    if (gameLauncherMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [gameLauncherMenuOpen])

  // Helper to add/remove bets from global betslip (toggle behavior)
  const handleTopSportsBet = useCallback((eventId: number, eventName: string, selection: string, odds: string) => {
    const existingBet = globalBets.find(bet => bet.eventId === eventId && bet.marketTitle === 'Moneyline' && bet.selection === selection)

    if (existingBet) {
      // Remove the bet (store handles closing betslip if empty)
      globalRemoveBet(existingBet.id)
    } else {
      // Add new bet
      globalAddBet({
        id: `${eventId}-Moneyline-${selection}-${Date.now()}`,
        eventId,
        eventName,
        marketTitle: 'Moneyline',
        selection,
        odds,
        stake: 0,
      })
      setGlobalBetslipOpen(true)
      setGlobalBetslipMinimized(false)
    }
  }, [globalBets, globalAddBet, globalRemoveBet, setGlobalBetslipOpen, setGlobalBetslipMinimized])

  // Check if a specific bet is selected in the global betslip
  const isTopSportsBetSelected = useCallback((eventId: number, selection: string) => {
    return globalBets.some(bet => bet.eventId === eventId && bet.marketTitle === 'Moneyline' && bet.selection === selection)
  }, [globalBets])

  if (!mounted) {
    return null
  }

  // Brand configuration
  const brandPrimary = colorTokenMap['betRed/500']?.hex || '#ee3536'
  const brandPrimaryHover = colorTokenMap['betRed/700']?.hex || '#dc2a2f'
  
  const currentBrand = {
    symbol: '$',
  }

  const topEventsData: any[] = []

  return (
    <div 
      className="w-full bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white font-figtree overflow-x-hidden min-h-screen transition-colors duration-300" 
      style={{ 
        width: '100%', 
        maxWidth: '100vw', 
        boxSizing: 'border-box',
        '--brand-primary': brandPrimary,
        '--brand-primary-hover': brandPrimaryHover,
      } as React.CSSProperties}
    >
      {/* Mobile: Quick Links - Above main menu */}
      {isMobile && (
        <motion.div
          initial={false}
          animate={{
            height: quickLinksOpen ? 40 : 0
          }}
          transition={{
            type: "tween",
            ease: "linear",
            duration: 0.3
          }}
          className="fixed left-0 right-0 overflow-hidden z-[100]"
          style={{ 
            top: 0, 
            pointerEvents: quickLinksOpen ? 'auto' : 'none',
            opacity: 1,
            visibility: 'visible',
            backgroundColor: 'var(--ds-nav-bg, #2D2E2C)',
            boxShadow: '0 -200px 0 0 var(--ds-nav-bg, #2D2E2C)',
          }}
        >
          <div className="px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide border-b border-white/10">
            {[
              { label: 'Home', onClick: () => { setQuickLinksOpen(false); } },
              { label: 'Casino', onClick: () => { trackNav('casino', 'Casino'); router.push('/casino'); setQuickLinksOpen(false); } },
              { label: 'Live Casino', onClick: () => { trackNav('casino', 'Live Casino'); router.push('/casino?tab=live'); setQuickLinksOpen(false); } },
              { label: 'Sports', onClick: () => { trackNav('sports', 'Sports'); router.push('/sports'); setQuickLinksOpen(false); } },
              { label: 'In-Play', locked: true, onClick: () => {} },
              { label: 'Promotions', onClick: () => { trackNav('promotions', 'Promotions'); router.push('/casino?vip=true'); setQuickLinksOpen(false); } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={(e) => {
                  e.stopPropagation()
                  if (item.locked) return
                  setLoadingQuickLink(item.label)
                  item.onClick()
                  setTimeout(() => setLoadingQuickLink(null), 1200)
                }}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-small text-xs font-medium transition-colors relative",
                  item.locked
                    ? "text-white/35 cursor-not-allowed"
                    : item.label === 'Home'
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                <span className={cn("transition-opacity duration-150 inline-flex items-center gap-1.5", loadingQuickLink === item.label ? "opacity-0" : "opacity-100")}>
                  {item.locked && <IconLock className="w-3 h-3" />}
                  {item.label}
                </span>
                {loadingQuickLink === item.label && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <IconLoader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Global Header - Same as casino page */}
      <motion.header 
        data-nav-header
        className={cn(
          "border-b border-white/10 h-16 flex items-center justify-between z-[101] fixed left-0 right-0 transition-[background-color] duration-200 ease-linear",
          isMobile ? "px-3" : "px-6",
          isMobile && quickLinksOpen && "border-t-0"
        )}
        initial={false}
        animate={{
          top: isMobile ? (quickLinksOpen ? 40 : 0) : 0
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.3
        }}
        style={{ 
          pointerEvents: 'auto',
          top: isMobile ? (quickLinksOpen ? 40 : 0) : 0,
          zIndex: 101,
          position: 'fixed',
          backgroundColor: 'rgba(18, 20, 23, 0.96)',
          boxShadow: '0 -200px 0 0 rgba(18, 20, 23, 0.97)',
          backdropFilter: 'blur(22px) saturate(112%)',
          WebkitBackdropFilter: 'blur(22px) saturate(112%)',
        }}
      >
        <div className="flex items-center gap-6">
          <div 
            className="relative h-8 w-[120px] flex items-center cursor-pointer"
            onClick={() => {
              router.push('/')
            }}
          >
            <Image
              src="/logos/BHGL_logo-1773311608241-DDbBBO6v.png"
              alt="Betheat"
              width={120}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </div>
          
          {/* Navigation Menu - Desktop only */}
          {!isCompactHeader && (
            <nav className="flex-1 flex items-center z-[110] ml-2" style={{ pointerEvents: 'auto' }}>
              <SidebarMenu className="flex flex-row items-center gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 min-w-[80px] px-4 py-2 rounded-small text-sm font-medium justify-center hover:bg-white/5 hover:text-white transition-colors text-white/70 cursor-pointer"
                    onClick={() => { trackNav('sports', 'Sports'); router.push('/sports') }}
                  >
                    Sports
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 min-w-[100px] px-4 py-2 rounded-small text-sm font-medium justify-center transition-colors text-white/35 cursor-not-allowed"
                    onClick={() => {}}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <IconLock className="w-3.5 h-3.5" />
                      In-Play
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 min-w-[80px] px-4 py-2 rounded-small text-sm font-medium justify-center hover:bg-white/5 hover:text-white transition-colors text-white/70 cursor-pointer"
                    onClick={() => { trackNav('casino', 'Casino'); router.push('/casino') }}
                  >
                    Casino
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 min-w-[100px] px-4 py-2 rounded-small text-sm font-medium justify-center hover:bg-white/5 hover:text-white transition-colors text-white/70 cursor-pointer"
                    onClick={() => { trackNav('casino', 'Live Casino'); router.push('/casino?tab=live') }}
                  >
                    Live Casino
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-10 min-w-[100px] px-4 py-2 rounded-small text-sm font-medium justify-center hover:bg-white/5 hover:text-white transition-colors text-white/70 cursor-pointer"
                    onClick={() => { trackNav('promotions', 'Promotions'); router.push('/casino?vip=true') }}
                  >
                    Promotions
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </nav>
          )}
        </div>
        
        <div className={cn("flex items-center", isCompactHeader ? "gap-2" : "gap-3")} style={{ pointerEvents: 'auto', zIndex: 101, position: 'relative' }}>
          {/* Balance and Avatar Button */}
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openAccountDrawer()
            }}
            className={cn(
              "grid items-center rounded-small transition-colors group relative",
              "bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.12] hover:bg-white/[0.03]",
              "active:bg-transparent",
              accountDrawerOpen && "text-white",
              isCompactHeader
                ? "grid-cols-[20px_minmax(0,1fr)] gap-1.5 px-2 py-1.5 h-9"
                : "grid-cols-[24px_minmax(0,1fr)] gap-2 px-2.5 py-1.5 h-10"
            )}
            style={{ pointerEvents: 'auto', zIndex: 101, position: 'relative', cursor: 'pointer' }}
          >
            <div className="relative shrink-0">
              <Avatar className={cn(
                "border border-white/20 group-hover:border-white/40 transition-colors",
                isCompactHeader ? "h-5 w-5" : "h-6 w-6"
              )}>
                <AvatarFallback className="bg-transparent text-white flex items-center justify-center font-semibold tracking-tight" style={{ fontSize: isCompactHeader ? '9px' : '10px' }}>
                  <IconUser className={cn(isCompactHeader ? "h-2.5 w-2.5" : "h-3 w-3")} />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--ds-primary,#ff6a1a)]" />
            </div>
            <div className={cn(
              "font-bold text-white tabular-nums transition-all duration-300 flex items-center justify-center text-center whitespace-nowrap min-w-0",
              isCompactHeader ? "text-[10px] pl-0.5" : "text-xs pl-1.5"
            )}>
              <span>€</span>
              <NumberFlow value={displayBalance} format={{ notation: 'standard', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
            </div>
          </Button>

          {isCompactHeader && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push('/casino?openSearch=1&from=%2F')
              }}
              className="h-9 w-9 rounded-[0.56rem] border border-white/[0.08] bg-white/[0.02] text-white/75 hover:border-white/[0.12] hover:bg-white/[0.03]"
              style={{ pointerEvents: 'auto', zIndex: 101, position: 'relative', cursor: 'pointer' }}
            >
              <IconSearch className="h-4 w-4" />
            </Button>
          )}

          {!isCompactHeader && (
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                openDepositDrawer()
              }}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 h-10 rounded-small transition-colors group",
                "border border-[#9a86d1]/75",
                "bg-[#c9b4ff] hover:bg-[#cfbcff]",
                "active:bg-[#bfa7fb]",
                "text-xs font-semibold text-[#121417] cursor-pointer"
              )}
              style={{
                pointerEvents: 'auto',
                zIndex: 101,
                position: 'relative',
                cursor: 'pointer',
                borderRadius: '0.56rem',
                boxShadow: '0 6px 18px rgba(122, 92, 196, 0.28)',
              }}
            >
              <IconWallet className="w-3.5 h-3.5 text-[#121417]" />
              <span className="text-[#121417]">Wallet</span>
            </Button>
          )}

          {!isCompactHeader && (
            <ChatNavToggle
              placeholder="Search games, teams, promotions..."
            />
          )}

          {!isCompactHeader && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 rounded-[0.56rem] border border-white/[0.08] bg-white/[0.02] px-2.5 text-white/75 hover:border-white/[0.12] hover:bg-white/[0.03] inline-flex items-center gap-1.5"
                  style={{ pointerEvents: 'auto', zIndex: 101, position: 'relative', cursor: 'pointer' }}
                >
                  <IconWorldNav className="h-4 w-4" />
                  <span className="text-[11px] font-medium text-white/70">{headerLanguage}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[140px] bg-[#121416] border-white/10 text-white">
                {[
                  { code: 'EN', label: 'English' },
                  { code: 'ES', label: 'Spanish' },
                  { code: 'DE', label: 'German' },
                  { code: 'FR', label: 'French' },
                  { code: 'PT', label: 'Portuguese' },
                ].map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setHeaderLanguage(lang.code as 'EN' | 'ES' | 'DE' | 'FR' | 'PT')}
                    className="text-white/75 hover:text-white hover:bg-white/5 cursor-pointer flex items-center justify-between"
                  >
                    <span>{lang.label}</span>
                    {headerLanguage === lang.code && <IconCheck className="h-3.5 w-3.5 text-white/90" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </motion.header>

      {/* Main Content - No Sidebar */}
      <div className="bg-[#1a1a1a] text-white" style={{ width: '100%', minWidth: 0, maxWidth: 'none' }}>
        {/* Spacer for fixed header */}
        <motion.div 
          initial={false}
          animate={{
            height: isMobile ? (quickLinksOpen ? '104px' : '64px') : '64px'
          }}
          transition={{
            type: "tween",
            ease: "linear",
            duration: 0.3
          }}
          style={{ overflow: 'hidden' }}
        />
        
        {/* Hero Section - Static CTA layout */}
        <div className={cn("py-4 md:py-6", isMobile ? "px-3" : "px-6")}>
          <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-12")}>
            <div className={cn("rounded-2xl border border-white/10 bg-[#121417] p-4 md:p-5 order-2 md:order-1", isMobile ? "" : "col-span-4 h-[240px]")}>
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">Get Started</h3>
              <p className="text-white/70 text-sm mt-1">Join the hottest online cypto casino today!</p>

              <Button
                className="w-full mt-4 h-11 rounded-small border border-[#ff7a2f]/45 bg-gradient-to-r from-[#ff7a2f] via-[#ff5a14] to-[#9a3f1f] text-white font-bold hover:brightness-110"
                onClick={() => {
                  setAuthPopupView('register')
                  setRegisterForm({ email: '', password: '', mobile: '', username: '' })
                  setRegisterCountryCode('+1')
                  setRegisterDob({ day: '', month: '', year: '' })
                  setRegisterFormTouched(false)
                  setRegisterPasswordVisible(false)
                  setLoginForm({ identifier: '', password: '', keepLoggedIn: false })
                  setLoginPopupTouched(false)
                  setRegisterPopupOpen(true)
                }}
              >
                Register Now
              </Button>

              <div className="my-3 h-px bg-white/10" />
              <p className="text-white/55 text-xs mb-2">Or continue with</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" className="h-10 rounded-small bg-[#1a1d22] border border-white/10 text-white/85 hover:bg-[#22262c] justify-center gap-2">
                  <Image
                    src="/games/google-icon-logo.svg"
                    alt="Google"
                    width={14}
                    height={14}
                    className="w-[14px] h-[14px] object-contain"
                    unoptimized
                  />
                  <span>Google</span>
                </Button>
                <Button variant="ghost" className="h-10 rounded-small bg-[#1a1d22] border border-white/10 text-white/85 hover:bg-[#22262c] justify-center gap-2">
                  <Image
                    src="/games/MetaMask_Fox.svg.png"
                    alt="MetaMask"
                    width={14}
                    height={14}
                    className="w-[14px] h-[14px] object-contain"
                    unoptimized
                  />
                  <span>MetaMask</span>
                </Button>
              </div>
            </div>

            <div className={cn("relative rounded-2xl border border-white/10 order-1 md:order-2 isolate", isMobile ? "h-[164px] overflow-hidden" : "col-span-8 h-[240px] overflow-hidden")}>
              <Carousel className="w-full relative overflow-hidden" opts={{ dragFree: true, containScroll: 'trimSnaps', duration: 15 }}>
                {!isMobile && (
                  <>
                    <CarouselPrevious className="!left-2 !-translate-x-0 h-8 w-8 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white z-20" />
                    <CarouselNext className="!right-2 !-translate-x-0 h-8 w-8 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white z-20" />
                  </>
                )}
                <CarouselContent className="ml-0 mr-0">
                  {[
                    { src: '/banners/Welcome%20Bonus%20Casinofinale_2cbbd48c-15e7-406d-a2d7-e9cd9b201699_20260121_0703.png', alt: 'Welcome Bonus' },
                    { src: '/banners/AccaBoostfinale_b1661794-7726-4b87-852f-17eccfc9d7ce_20260121_0703.png', alt: 'Acca Boost' },
                    { src: '/banners/cashbackfinale_07a0a8f0-480f-42e8-b2a3-322bd1b4156c_20260121_0703.png', alt: 'Weekly Cashback' },
                    { src: '/banners/cryptofinale_7831bcf7-7a0c-493d-bb7e-7fea7c188d98_20260121_0703.png', alt: 'Crypto Promo' },
                  ].map((banner, index) => (
                    <CarouselItem key={index} className={cn("basis-auto flex-shrink-0", index === 0 ? "pl-0" : "pl-2 md:pl-4")}>
                      <Card data-banner-card className="border-0 relative overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity rounded-small w-auto h-auto">
                        <img
                          src={banner.src}
                          alt={banner.alt}
                          className={cn("block h-auto max-w-none", isMobile ? "w-[300px]" : "w-auto")}
                        />
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>

        {/* Top Sports Carousel */}
        {false && (<div className="mb-6">
          <div className={cn("flex items-center justify-between mb-4", isMobile ? "px-3" : "px-6")}>
            <h2 
              className="text-lg font-semibold text-white cursor-pointer hover:text-white/80 transition-colors"
              onClick={() => router.push('/sports/football')}
            >
              Top Sports
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/5 text-xs px-3 py-1.5 h-auto border border-white/20 rounded-small"
                onClick={() => router.push('/sports/football')}
              >
                View All
              </Button>
              {!isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-small bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (topEventsCarouselApi) {
                        const currentIndex = topEventsCarouselApi.selectedScrollSnap()
                        topEventsCarouselApi.scrollTo(Math.max(0, currentIndex - 1))
                      }
                    }}
                    disabled={!topEventsCarouselApi || !topEventsCanScrollPrev}
                  >
                    <IconChevronLeft className="h-4 w-4" strokeWidth={2} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-small bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (topEventsCarouselApi) {
                        const currentIndex = topEventsCarouselApi.selectedScrollSnap()
                        const slideCount = topEventsCarouselApi.scrollSnapList().length
                        topEventsCarouselApi.scrollTo(Math.min(slideCount - 1, currentIndex + 1))
                      }
                    }}
                    disabled={!topEventsCarouselApi || !topEventsCanScrollNext}
                  >
                    <IconChevronRight className="h-4 w-4" strokeWidth={2} />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={cn("relative", isMobile ? "-mx-3" : "-mx-6")}>
            <Carousel setApi={setTopEventsCarouselApi} className="w-full relative" opts={{ dragFree: true, containScroll: 'trimSnaps', duration: 15 }}>
              <CarouselContent className={cn(isMobile ? "ml-0 -mr-2" : "ml-0 -mr-4")} style={{ overflow: 'visible' }}>
                {topEventsData.map((event, index) => {
                  const parseScore = (scoreStr: string) => {
                    const parts = scoreStr.split(' - ')
                    return {
                      team1: parseInt(parts[0]) || 0,
                      team2: parseInt(parts[1]) || 0
                    }
                  }
                  const initialScore = parseScore(event.score)
                  const currentScore = topEventsScores[event.id] || initialScore

  return (
                    <CarouselItem key={event.id} className={cn("pr-0 basis-auto flex-shrink-0", index === 0 ? (isMobile ? "pl-3" : "pl-6") : "pl-2 md:pl-4")}>
                      <div className="w-[320px] bg-white/5 border border-white/10 rounded-small p-3 relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(to bottom, rgba(238, 53, 54, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)' }}>
                        {/* Header: League info and Live status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <Image 
                              src={event.leagueIcon} 
                              alt={event.league}
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                            <span className="text-[10px] text-white">{event.league} | {event.country}</span>
    </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5 bg-[#ee3536]/20 border border-[#ee3536]/50 rounded px-1 py-0.5 whitespace-nowrap">
                              <div className="w-1.5 h-1.5 bg-[#ee3536] rounded-full animate-pulse"></div>
                              <span className="text-[9px] font-semibold text-[#ee3536]">LIVE</span>
                            </div>
                            <span className="text-[10px] text-[#ee3536]">{event.time}</span>
                          </div>
                        </div>
                        
                        {/* Teams and Score */}
                        <div className="flex items-center mb-3">
                          {/* Team 1 */}
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Image 
                              src={event.team1Logo}
                              alt={event.team1}
                              width={20}
                              height={20}
                              className="object-contain flex-shrink-0"
                              quality={100}
                              unoptimized
                            />
                            <span className="text-xs font-semibold text-white truncate">{event.team1}</span>
                          </div>
                          
                          {/* Score */}
                          <div className="flex items-center justify-center mx-3 flex-shrink-0 gap-1">
                            <div className="border rounded-small px-1.5 py-1.5 w-[28px] h-[28px] flex items-center justify-center bg-white/5 border-white/10">
                              <span className="text-[10px] font-bold text-white leading-none">{currentScore.team1}</span>
                            </div>
                            <span className="text-base font-bold text-white leading-none">-</span>
                            <div className="border rounded-small px-1.5 py-1.5 w-[28px] h-[28px] flex items-center justify-center bg-white/5 border-white/10">
                              <span className="text-[10px] font-bold text-white leading-none">{currentScore.team2}</span>
                            </div>
                          </div>
                          
                          {/* Team 2 */}
                          <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                            <span className="text-xs font-semibold text-white truncate">{event.team2}</span>
                            <Image 
                              src={event.team2Logo}
                              alt={event.team2}
                              width={20}
                              height={20}
                              className="object-contain flex-shrink-0"
                              quality={100}
                              unoptimized
                            />
                          </div>
                        </div>
                        
                        {/* Moneyline Betting Buttons */}
                        <div className="flex items-center gap-1.5 mb-3">
                          {[
                            { label: event.team1Code, selection: event.team1, odds: event.odds.team1 },
                            { label: 'Tie', selection: 'Tie', odds: event.odds.tie },
                            { label: event.team2Code, selection: event.team2, odds: event.odds.team2 },
                          ].map((btn) => {
                            const selected = isTopSportsBetSelected(event.id, btn.selection)
                            return (
                              <button
                                key={btn.label}
                                onClick={() => handleTopSportsBet(event.id, `${event.team1} vs ${event.team2}`, btn.selection, btn.odds)}
                                className={cn(
                                  "rounded-small flex-1 h-[38px] flex flex-col items-center justify-center transition-colors cursor-pointer px-2",
                                  selected
                                    ? "bg-[#ee3536] text-white"
                                    : "bg-white/10 text-white hover:bg-[#ee3536]"
                                )}
                              >
                                <div className={cn("text-[10px] leading-none mb-0.5", selected ? "text-white/90" : "text-white/70")}>{btn.label}</div>
                                <div className="text-xs font-bold leading-none">{btn.odds}</div>
                              </button>
                            )
                          })}
                        </div>
                        
                        {/* Popularity Bar */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#ee3536] rounded-full" style={{ width: `${event.team1Percent}%` }} />
                          </div>
                          <span className="text-[9px] text-white/70">{event.team1Percent}% {event.team1Code}</span>
                          <span className="text-[9px] text-white/70">{event.team2Percent}% {event.team2Code}</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-white/30 rounded-full ml-auto" style={{ width: `${event.team2Percent}%` }} />
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>)}

        {/* Sports League Squares */}
        <div className={cn("mb-6", isMobile ? "px-3" : "px-6")}>
          <h2 className="text-lg font-semibold text-white mb-4">Sportsbook</h2>
          <div className="overflow-x-auto scrollbar-hide pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="inline-flex gap-2 w-max">
              {homepageLeagueTiles.map((league) => (
                <button
                  key={league.label}
                  onClick={() => {
                    trackNav('sports', `Sportsbook ${league.label}`)
                    router.push('/sports')
                  }}
                  className="w-[84px] h-[76px] rounded-small border border-white/10 bg-white/[0.03] transition-colors p-1.5 flex flex-col items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer hover:bg-white/[0.06] active:bg-white/[0.08]"
                >
                  <Image
                    src={league.icon}
                    alt={league.label}
                    width={30}
                    height={30}
                    className={cn(
                      "w-[30px] h-[30px] object-contain opacity-95",
                      league.label === 'Champions' && "brightness-0 invert"
                    )}
                    unoptimized
                  />
                  <span className="text-[10px] leading-tight text-white/90 text-center">
                    {league.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slots Carousel Section */}
        <div className="mb-6">
          <div className={cn("flex items-center justify-between mb-4", isMobile ? "px-3" : "px-6")}>
            <h2 className="text-lg font-semibold text-white">Hot Games</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/5 text-xs px-3 py-1.5 h-auto border border-white/20 rounded-small"
                onClick={() => router.push('/casino')}
              >
                All Games
              </Button>
              {!isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-small bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (slotsCarouselApi) {
                        const currentIndex = slotsCarouselApi.selectedScrollSnap()
                        slotsCarouselApi.scrollTo(Math.max(0, currentIndex - 2))
                      }
                    }}
                    disabled={!slotsCarouselApi || !slotsCanScrollPrev}
                  >
                    <IconChevronLeft className="h-4 w-4" strokeWidth={2} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-small bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (slotsCarouselApi) {
                        const currentIndex = slotsCarouselApi.selectedScrollSnap()
                        const slideCount = slotsCarouselApi.scrollSnapList().length
                        slotsCarouselApi.scrollTo(Math.min(slideCount - 1, currentIndex + 2))
                      }
                    }}
                    disabled={!slotsCarouselApi || !slotsCanScrollNext}
                  >
                    <IconChevronRight className="h-4 w-4" strokeWidth={2} />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={cn("relative", isMobile ? "-mx-3" : "-mx-6")}>
            <Carousel setApi={setSlotsCarouselApi} className="w-full relative" opts={{ dragFree: true, containScroll: 'trimSnaps', duration: 15 }}>
              <CarouselContent className={cn(isMobile ? "ml-3 mr-0" : "ml-6 mr-0")}>
                {Array.from({ length: 10 }).map((_, index) => {
                  const imageSrc = squareTileImages[index % squareTileImages.length]
                  const slotNames = ['Starburst', 'Book of Dead', 'Gonzo\'s Quest', 'Dead or Alive', 'Immortal Romance', 'Thunderstruck', 'Avalon', 'Blood Suckers', 'Mega Moolah', 'Bonanza']
                  const slotVendor = getTileVendor(index + 20)
                  return (
                    <CarouselItem key={index} className={cn("pr-0 basis-auto flex-shrink-0", index === 0 ? (isMobile ? "pl-3" : "pl-6") : "pl-2 md:pl-4")}>
                      <div 
                        className="w-[132px] h-[174px] rounded-small bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 relative overflow-hidden group flex-shrink-0"
                        onClick={() => {
                          setSelectedGame({
                            title: slotNames[index % slotNames.length],
                            image: imageSrc,
                            provider: slotVendor,
                            features: ['High RTP', 'Free Spins Feature', 'Bonus Rounds Available']
                          })
                        }}
                      >
                        {imageSrc && (
                          <Image
                            src={imageSrc}
                            alt={`Slot Game ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="132px"
                          />
                        )}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tile-shimmer" />
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Originals Carousel Section */}
        <div className="mb-6">
          <div className={cn("flex items-center justify-between mb-4", isMobile ? "px-3" : "px-6")}>
            <h2 className="text-lg font-semibold text-white">Exclusives</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/5 text-xs px-3 py-1.5 h-auto border border-white/20 rounded-small"
                onClick={() => router.push('/casino')}
              >
                All Games
              </Button>
              {!isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-small bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (originalsCarouselApi) {
                        const currentIndex = originalsCarouselApi.selectedScrollSnap()
                        originalsCarouselApi.scrollTo(Math.max(0, currentIndex - 2))
                      }
                    }}
                    disabled={!originalsCarouselApi || !originalsCanScrollPrev}
                  >
                    <IconChevronLeft className="h-4 w-4" strokeWidth={2} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-small bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (originalsCarouselApi) {
                        const currentIndex = originalsCarouselApi.selectedScrollSnap()
                        const slideCount = originalsCarouselApi.scrollSnapList().length
                        originalsCarouselApi.scrollTo(Math.min(slideCount - 1, currentIndex + 2))
                      }
                    }}
                    disabled={!originalsCarouselApi || !originalsCanScrollNext}
                  >
                    <IconChevronRight className="h-4 w-4" strokeWidth={2} />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={cn("relative", isMobile ? "-mx-3" : "-mx-6")}>
            <Carousel setApi={setOriginalsCarouselApi} className="w-full relative" opts={{ dragFree: true, containScroll: 'trimSnaps', duration: 15 }}>
              <CarouselContent className={cn(isMobile ? "ml-3 mr-0" : "ml-6 mr-0")}>
                {Array.from({ length: 10 }).map((_, index) => {
                  const imageSrc = squareTileImages[(index + 8) % squareTileImages.length]
                  const gameNames = ['Diamond Blitz', 'Roulette Royale', 'Crypto Keno', 'Mega Dice', 'Turbo Blackjack', 'Golden Mines', 'Lightning Plinko', 'Betheat Crash', 'High Roller Wheel', 'Vault Poker']
                  return (
                    <CarouselItem key={index} className={cn("pr-0 basis-auto flex-shrink-0", index === 0 ? (isMobile ? "pl-3" : "pl-6") : "pl-2 md:pl-4")}>
                      <div 
                        className="w-[132px] h-[174px] rounded-small bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 relative overflow-hidden group flex-shrink-0"
                        onClick={() => {
                          setSelectedGame({
                            title: gameNames[index] || `Exclusive Game ${index + 1}`,
                            image: imageSrc,
                            provider: 'Betheat',
                            features: ['Exclusive Game', 'Unique Gameplay', 'Exclusive to Betheat']
                          })
                        }}
                      >
                        <Image
                          src={imageSrc}
                          alt={gameNames[index] || `Exclusive Game ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="132px"
                        />
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <IconInfoCircle className="w-4 h-4 text-white drop-shadow-lg" strokeWidth={2} />
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tile-shimmer" />
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Vendors Carousel Section */}
        <div className="mb-6">
          <div className={cn("relative", isMobile ? "px-3" : "px-6")}>
            <Carousel setApi={setVendorsCarouselApi} className="w-full relative" opts={{ dragFree: true, containScroll: 'trimSnaps', duration: 15 }}>
              {!isMobile && (
                <>
                  <CarouselPrevious className="!left-2 !-translate-x-0 h-8 w-8 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white z-20" />
                  <CarouselNext className="!right-2 !-translate-x-0 h-8 w-8 rounded-full bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/20 hover:bg-[#1a1a1a] hover:border-white/30 text-white z-20" />
                </>
              )}
              <CarouselContent className="ml-0 -mr-2 md:-mr-4" style={{ overflow: 'visible' }}>
                {casinoVendorList.map((vendor, index) => (
                  <CarouselItem key={vendor} className={cn("pr-0 basis-auto flex-shrink-0", "pl-2 md:pl-4")}>
                    <button
                      aria-label={vendor}
                      title={vendor}
                      className="group relative bg-white/[0.03] rounded-small h-[52px] w-[96px] p-0 text-xs font-medium text-white/78 hover:bg-white/[0.06] hover:text-white transition-all duration-300 overflow-hidden flex items-center justify-center"
                      onClick={() => router.push('/casino')}
                    >
                      <VendorIcon vendor={vendor} />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Why BetOnline Section - Updated with left-aligned text and trust image */}
        {false && (<div className={cn("mb-6", isMobile ? "px-3" : "px-6")}>
          <h2 className="text-lg font-semibold text-white mb-4">Why BetOnline?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Compare Our Competitors Card */}
            <Card className="group relative bg-gradient-to-br from-[#3a2a1f]/30 to-[#2d1f16]/30 backdrop-blur-sm border-white/10 rounded-small overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a2a1f]/20 to-transparent pointer-events-none" />
              <CardContent className="p-4 relative z-10">
                <div className="mb-4">
                  <div className="text-white font-semibold text-sm mb-0.5 leading-tight">COMPARE OUR</div>
                  <div className="text-white font-semibold text-sm leading-tight">COMPETITORS</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-transparent hover:border-white/30 text-xs h-7 px-3"
                  onClick={() => router.push('/casino')}
                >
                  SEE THE DIFFERENCE
                </Button>
              </CardContent>
              {/* Competitors Image */}
              <div className="absolute right-0 bottom-0 opacity-40 pointer-events-none">
                <Image
                  src="/banners/partners/cometitors.png"
                  alt="Competitors"
                  width={120}
                  height={80}
                  className="object-contain"
                  quality={100}
                  unoptimized
                />
              </div>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0" />
            </Card>
            
            {/* Trusted By Millions Card */}
            <Card className="group relative bg-gradient-to-br from-[#1f2a1f]/30 to-[#162116]/30 backdrop-blur-sm border-white/10 rounded-small overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f2a1f]/20 to-transparent pointer-events-none" />
              <CardContent className="p-4 relative z-10">
                <div className="mb-4">
                  <div className="text-white font-semibold text-sm mb-0.5 leading-tight">TRUSTED BY</div>
                  <div className="text-white font-semibold text-sm leading-tight">MILLIONS</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-transparent hover:border-white/30 text-xs h-7 px-3"
                  onClick={() => router.push('/casino')}
                >
                  FIND OUT MORE
                </Button>
              </CardContent>
              {/* Trust Image */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
                <Image
                  src="/banners/partners/trust.png"
                  alt="Trust"
                  width={140}
                  height={90}
                  className="object-contain"
                  quality={100}
                  unoptimized
                />
              </div>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0" />
            </Card>
            
            {/* VIP Rewards Program Card */}
            <Card className="group relative bg-gradient-to-br from-[#2a241f]/30 to-[#1f1a16]/30 backdrop-blur-sm border-white/10 rounded-small overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a241f]/20 to-transparent pointer-events-none" />
              <CardContent className="p-4 relative z-10">
                <div className="mb-4">
                  <div className="text-white font-semibold text-sm mb-0.5 leading-tight">VIP REWARDS</div>
                  <div className="text-white font-semibold text-sm leading-tight">PROGRAM</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-transparent hover:border-white/30 text-xs h-7 px-3"
                  onClick={() => router.push('/casino?vip=true')}
                >
                  BECOME A VIP
                </Button>
              </CardContent>
              {/* VIP Why Image */}
              <div className="absolute right-0 bottom-0 opacity-50 pointer-events-none">
                <Image
                  src="/banners/partners/vip_why.png"
                  alt="VIP Crowns"
                  width={280}
                  height={180}
                  className="object-contain"
                  quality={100}
                  unoptimized
                />
              </div>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0" />
            </Card>
          </div>
          
          {/* USP Section - Single Block with Separators */}
          <div className="mt-6 flex justify-center">
            {isMobile ? (
              /* Mobile Carousel */
              <Carousel className="w-full relative" opts={{ dragFree: true, containScroll: 'trimSnaps', duration: 15 }}>
                <CarouselContent className="ml-0 mr-0">
                  {[
                    { icon: '/banners/partners/crypto.svg', title: 'DEPOSIT WITH CRYPTO', subtitle: 'FAST, EASY & RELIABLE' },
                    { icon: '/banners/partners/vip-rewards.svg', title: 'VIP REWARDS', subtitle: 'LEVEL UP BONUSES, BOOSTS & MORE' },
                    { icon: '/banners/partners/bettingicons-coloured.svg', title: 'BET BIG', subtitle: 'HIGH LIMITS AND RE-BET FUNCTIONALITY' },
                    { icon: '/banners/partners/live-betting.svg', title: 'FASTEST PAYOUTS', subtitle: 'PAYOUTS WITHIN MINUTES' },
                    { icon: 'lock', title: 'SAFE & SECURE', subtitle: 'TRUSTED & PROTECTED' },
                  ].map((item, index) => (
                    <CarouselItem key={index} className={cn("pr-2 basis-auto flex-shrink-0", index === 0 ? "pl-0" : "pl-2")}>
                      <div className="p-3 min-w-[280px] group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {item.icon === 'lock' ? (
                              <IconLock size={32} className="text-white/60 group-hover:text-[#dc2626] transition-all duration-300" />
                            ) : (
                              <Image
                                src={item.icon}
                                alt={item.title}
                                width={32}
                                height={32}
                                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-xs mb-0.5 uppercase leading-tight">{item.title}</h3>
                            <p className="text-white/60 text-[10px] uppercase leading-tight">{item.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              /* Desktop - Single Block with Small Separators */
              <div className="inline-flex">
                <div className="grid grid-cols-5">
                  {/* Deposit With Crypto */}
                  <div className="p-3 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src="/banners/partners/crypto.svg"
                          alt="Crypto"
                          width={32}
                          height={32}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-xs mb-0.5 uppercase leading-tight">DEPOSIT WITH CRYPTO</h3>
                        <p className="text-white/60 text-[10px] uppercase leading-tight">FAST, EASY & RELIABLE</p>
                      </div>
                    </div>
                  </div>

                  {/* VIP Rewards */}
                  <div className="p-3 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src="/banners/partners/vip-rewards.svg"
                          alt="VIP Rewards"
                          width={32}
                          height={32}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-xs mb-0.5 uppercase leading-tight">VIP REWARDS</h3>
                        <p className="text-white/60 text-[10px] uppercase leading-tight">LEVEL UP BONUSES, BOOSTS & MORE</p>
                      </div>
                    </div>
                  </div>

                  {/* Bet Big */}
                  <div className="p-3 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src="/banners/partners/bettingicons-coloured.svg"
                          alt="Bet Big"
                          width={32}
                          height={32}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-xs mb-0.5 uppercase leading-tight">BET BIG</h3>
                        <p className="text-white/60 text-[10px] uppercase leading-tight">HIGH LIMITS AND RE-BET FUNCTIONALITY</p>
                      </div>
                    </div>
                  </div>

                  {/* Fastest Payouts */}
                  <div className="p-3 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src="/banners/partners/live-betting.svg"
                          alt="Fast Payouts"
                          width={32}
                          height={32}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-xs mb-0.5 uppercase leading-tight">FASTEST PAYOUTS</h3>
                        <p className="text-white/60 text-[10px] uppercase leading-tight">PAYOUTS WITHIN MINUTES</p>
                      </div>
                    </div>
                  </div>

                  {/* Safe & Secure */}
                  <div className="p-3 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <IconLock size={32} className="text-white/60 group-hover:text-[#dc2626] transition-all duration-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-xs mb-0.5 uppercase leading-tight">SAFE & SECURE</h3>
                        <p className="text-white/60 text-[10px] uppercase leading-tight">TRUSTED & PROTECTED</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>)}

        {/* Activity Section */}
        <div className={cn("mb-6", isMobile ? "px-3" : "px-6")}>
          <Separator className="mb-6 bg-white/10" />
          
          {/* Tabs - Casino style */}
          <div className="mb-4 overflow-x-auto scrollbar-hide pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="h-auto gap-1 inline-flex w-max">
              {[
                { value: 'All Bets', label: 'Activity' },
                { value: 'Jackpot Winners', label: 'Jackpot Winners' },
                { value: 'High Rollers', label: 'High Rollers' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActivityTab(tab.value as 'All Bets' | 'Jackpot Winners' | 'High Rollers')}
                  className={cn(
                    "relative px-4 py-1 h-9 text-xs font-medium rounded-none transition-colors duration-300 whitespace-nowrap flex-shrink-0",
                    activityTab === tab.value
                      ? "text-white"
                      : "text-white/65 hover:text-white bg-transparent"
                  )}
                >
                  {activityTab === tab.value && (
                    <motion.div
                      layoutId="homeActivityUnderline"
                      className="absolute left-3 right-3 bottom-0 h-[2px] rounded-full"
                      style={{
                        backgroundImage: 'var(--ds-primary-gradient, linear-gradient(115deg, #ff7a2f 0%, #ff5a14 50%, #9a3f1f 100%))',
                      }}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 40
                      }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Feed Table or Race Leaderboard */}
          <Card className="bg-[var(--ds-sidebar-bg,#121417)]/92 backdrop-blur-sm border-white/10 rounded-small overflow-hidden">
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
                {activityTab === 'Jackpot Winners' ? (
                  // Jackpot Winners Table
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white/70 font-medium text-xs">Game</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">User</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">Time</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">Jackpot Won</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jackpotWinnersData.map((winner, index) => (
                        <TableRow
                          key={winner.id}
                          className={cn(
                            "border-b border-white/10 hover:bg-white/5 transition-colors",
                            index === 0 && "bg-white/5"
                          )}
                        >
                          <TableCell className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {winner.gameImage ? (
                                <div className="flex-shrink-0 w-10 h-10 rounded-small overflow-hidden">
                                  <Image
                                    src={winner.gameImage}
                                    alt={winner.game}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                    quality={75}
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <IconDeviceGamepad2 className="w-4 h-4 text-white/70" />
                              )}
                              <span
                                className="text-white text-sm truncate max-w-[200px] cursor-pointer hover:text-white/80 transition-colors"
                                onClick={() => {
                                  if (winner.gameImage) {
                                    setSelectedGame({
                                      title: winner.game,
                                      image: winner.gameImage
                                    })
                                  }
                                }}
                              >
                                {winner.game}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <span className={cn(
                              "text-sm",
                              winner.user === 'Hidden' ? "text-white/50" : "text-white"
                            )}>
                              {winner.user}
                            </span>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <span className="text-white/60 text-sm">{winner.time}</span>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <IconTrophy className="w-3.5 h-3.5 text-amber-400" />
                              <span className="text-amber-400 text-sm font-semibold">{winner.amount}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  // Activity Feed Table
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white/70 font-medium text-xs">Game</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">User</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">Time</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">Multiplier</TableHead>
                        <TableHead className="text-white/70 font-medium text-xs">Payout</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    <AnimatePresence mode="popLayout">
                      {activityFeed.map((activity, index) => {
                        return (
                          <motion.tr
                            key={activity.id}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                              "border-b border-white/10 hover:bg-white/5 transition-colors",
                              index === 0 && "bg-white/5"
                            )}
                          >
                            <TableCell className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {activity.gameImage ? (
                                  <div className="flex-shrink-0 w-10 h-10 rounded-small overflow-hidden">
                                    <Image
                                      src={activity.gameImage}
                                      alt={activity.event}
                                      width={40}
                                      height={40}
                                      className="w-full h-full object-cover"
                                      quality={75}
                                      unoptimized
                                    />
                                  </div>
                                ) : (
                                  <IconDeviceGamepad2 className="w-4 h-4 text-white/70" />
                                )}
                                <span 
                                  className="text-white text-sm truncate max-w-[200px] cursor-pointer hover:text-white/80 transition-colors"
                                  onClick={() => {
                                    if (activity.gameImage) {
                                      setSelectedGame({
                                        title: activity.event,
                                        image: activity.gameImage
                                      })
                                    }
                                  }}
                                >
                                  {activity.event}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="py-3 px-4">
                              <span className={cn(
                                "text-sm",
                                activity.user === 'Hidden' ? "text-white/50" : "text-white"
                              )}>
                                {activity.user}
                              </span>
                            </TableCell>
                            <TableCell className="py-3 px-4">
                              <span className="text-white/60 text-sm">{activity.time}</span>
                            </TableCell>
                            <TableCell className="py-3 px-4">
                              <span className="text-white/80 text-sm font-medium">{activity.multiplier}</span>
                            </TableCell>
                            <TableCell className="py-3 px-4">
                              <span className={cn(
                                "text-sm font-semibold",
                                activity.winAmount?.startsWith('-') ? "text-white/60" : "text-green-400"
                              )}>
                                {activity.winAmount}
                              </span>
                            </TableCell>
                          </motion.tr>
                        )
                      })}
                    </AnimatePresence>
                  </TableBody>
                </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Launcher - Full Screen Overlay */}
        <AnimatePresence>
          {selectedGame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-[var(--ds-page-bg,#0d0f12)]"
            >
              {/* Rounded Glass Top Bar - Hidden in mobile landscape */}
              {!(isMobile && isLandscape) && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "fixed top-4 left-4 right-4 z-50 rounded-2xl backdrop-blur-xl border border-white/10",
                    isMobile ? "h-10" : "h-12"
                  )}
                  style={{
                    backgroundColor: 'rgba(18, 20, 23, 0.66)',
                  }}
                >
                  <div className="flex items-center justify-between h-full px-3 relative">
                    {/* Wallet Button - Left (casino-style) */}
                    <button
                      onClick={() => openDepositDrawer()}
                      className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-small border border-[#9a86d1]/75 bg-[#c9b4ff] text-[#121417] transition-colors duration-200 hover:bg-[#cfbcff]"
                      style={{
                        boxShadow: '0 6px 18px rgba(122, 92, 196, 0.28)',
                      }}
                    >
                      <IconWallet className="w-3.5 h-3.5 text-[#121417]" />
                      {!isMobile && <span className="text-[11px] font-semibold tracking-wide">WALLET</span>}
                    </button>

                    {/* Game Name - Center */}
                    <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-white max-w-[50%] truncate px-2">
                      {selectedGame.title}
                    </h2>

                    {/* Right Icons - Favorite and Close */}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => {
                          const gameId = hashGameTitle(selectedGame.title)
                          const newFavorited = new Set(favoritedGames)
                          if (newFavorited.has(gameId)) {
                            newFavorited.delete(gameId)
                          } else {
                            newFavorited.add(gameId)
                          }
                          setFavoritedGames(newFavorited)
                        }}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <IconHeart 
                          className={cn(
                            "w-4 h-4 transition-colors",
                            favoritedGames.has(hashGameTitle(selectedGame.title))
                              ? "text-pink-500 fill-pink-500"
                              : "text-white/70"
                          )}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGame(null)
                          setGameLauncherMenuOpen(false)
                          setIsFullscreen(false)
                        }}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <IconX className="w-4 h-4 text-white/70 hover:text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Content Area - Loading then Game Image */}
              <div className={cn("h-full flex items-center justify-center", isMobile ? "pt-20" : "pt-24")} style={{ zIndex: 1 }}>
                <AnimatePresence mode="wait">
                  {!gameImageLoaded ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                      />
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/70 text-sm"
                      >
                        Loading game...
                      </motion.p>
                      {selectedGame.provider && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-white/50 text-xs"
                        >
                          {selectedGame.provider}
                        </motion.p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="game-image"
                      ref={gameImageRef}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "fixed rounded-2xl overflow-hidden",
                        isFullscreen || (isMobile && isLandscape) 
                          ? "inset-0 rounded-none" 
                          : "top-4 left-4 right-4"
                      )}
                      style={isFullscreen || (isMobile && isLandscape) ? {} : { 
                        top: isMobile ? '68px' : '80px',
                        height: isMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 100px)',
                        maxHeight: isMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 100px)'
                      }}
                    >
                      {selectedGame.image && (
                        <Image
                          src={selectedGame.image}
                          alt={selectedGame.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Preload image */}
                {selectedGame.image && !gameImageLoaded && (
                  <div className="absolute inset-0 opacity-0 pointer-events-none">
                    <img
                      src={selectedGame.image}
                      alt=""
                      onLoad={() => {
                        setTimeout(() => {
                          setGameImageLoaded(true)
                        }, 500)
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Jackpot Win Overlay */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Similar Games Drawer */}
        <Drawer open={similarGamesDrawerOpen} onOpenChange={setSimilarGamesDrawerOpen} direction={isMobile ? "bottom" : "right"} shouldScaleBackground={false}>
          <DrawerContent 
            showOverlay={isMobile}
            className={cn(
              "bg-[#1a1a1a] text-white flex flex-col relative",
              "w-full sm:max-w-2xl border-l border-white/10 overflow-hidden",
              isMobile && "rounded-t-[10px]"
            )}
            style={isMobile ? {
              height: '80vh',
              maxHeight: '80vh',
              top: 'auto',
              bottom: 0,
            } : undefined}
          >
            {isMobile && <DrawerHandle variant="light" />}
            <DrawerHeader className="pb-4 sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}>
              <div className="flex items-center justify-between">
                <div className="pt-2">
                  <DrawerTitle className="text-white text-xl font-bold">More Games Like This</DrawerTitle>
                  <DrawerDescription className="text-white/70 text-sm mt-1">
                    Similar games you might enjoy
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <button className="rounded-full bg-white/10 hover:bg-white/20 p-2 transition-colors">
                    <IconX className="h-4 w-4 text-white" />
                  </button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-6 -mt-4 pt-4">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {Array.from({ length: 30 }).map((_, index) => {
                  const gameNames = ['Gold Nugget Rush', 'Mega Fortune', 'Starburst', 'Book of Dead', 'Gonzo\'s Quest', 'Dead or Alive', 'Immortal Romance', 'Thunderstruck', 'Avalon', 'Blood Suckers', 'Mega Moolah', 'Bonanza', 'Razor Shark', 'Sweet Bonanza', 'Gates of Olympus', 'Big Bass Bonanza', 'The Dog House', 'Wolf Gold', 'Fire Strike', 'Chilli Heat', 'Gold Nugget Rush', 'Mega Fortune', 'Starburst', 'Book of Dead', 'Gonzo\'s Quest', 'Dead or Alive', 'Immortal Romance', 'Thunderstruck', 'Avalon', 'Blood Suckers']
                  const imageSrc = squareTileImages[index % squareTileImages.length]
                  const gameName = gameNames[index % gameNames.length]
                  const tileVendor = getTileVendor(index)
                  
                  return (
                    <div
                      key={index}
                      className="w-full aspect-square rounded-small bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 relative overflow-hidden group"
                      onClick={() => {
                        setSelectedGame({
                          title: gameName,
                          image: imageSrc,
                          provider: tileVendor,
                          features: ['High RTP', 'Free Spins Feature', 'Bonus Rounds Available']
                        })
                        setSimilarGamesDrawerOpen(false)
                      }}
                    >
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          alt={gameName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, 50vw"
                        />
                      )}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tile-shimmer" />
                    </div>
                  )
                })}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Footer - Same as casino page */}
        <footer className="bg-[#2d2d2d] border-t border-white/10 text-white mt-12 relative z-0">
          <div className="w-full px-6 py-6">
            <div className="md:hidden mb-6">
              <Accordion type="multiple" className="w-full border-y border-white/10">
                <AccordionItem value="casino" className="border-white/10">
                  <AccordionTrigger value="casino" className="text-sm font-semibold py-3">Casino</AccordionTrigger>
                  <AccordionContent value="casino">
                    <ul className="space-y-1.5 pb-2 text-xs text-white/70">
                      <li><a href="#" className="hover:text-white transition-colors">Casino Games</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Slots</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Live Casino</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Roulette</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Blackjack</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Poker</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Publishers</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Promos & Competitions</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sports" className="border-white/10">
                  <AccordionTrigger value="sports" className="text-sm font-semibold py-3">Sports</AccordionTrigger>
                  <AccordionContent value="sports">
                    <ul className="space-y-1.5 pb-2 text-xs text-white/70">
                      <li><a href="#" className="hover:text-white transition-colors">Sportsbook</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Live Sports</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Soccer</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Basketball</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Tennis</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">eSports</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Bet Bonuses</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Sports Rules</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Racing Rules</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support" className="border-white/10">
                  <AccordionTrigger value="support" className="text-sm font-semibold py-3">Support</AccordionTrigger>
                  <AccordionContent value="support">
                    <ul className="space-y-1.5 pb-2 text-xs text-white/70">
                      <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Fairness</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Responsible Gaming</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Gaming Help</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Live Support</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Self Exclusion</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Law Enforcement Request</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="about" className="border-white/10">
                  <AccordionTrigger value="about" className="text-sm font-semibold py-3">About Us</AccordionTrigger>
                  <AccordionContent value="about">
                    <ul className="space-y-1.5 pb-2 text-xs text-white/70">
                      <li><a href="#" className="hover:text-white transition-colors">VIP Club</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Affiliate</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">AML Policy</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment" className="border-white/10">
                  <AccordionTrigger value="payment" className="text-sm font-semibold py-3">Payment Info</AccordionTrigger>
                  <AccordionContent value="payment">
                    <ul className="space-y-1.5 pb-2 text-xs text-white/70">
                      <li><a href="#" className="hover:text-white transition-colors">Deposit & Withdrawals</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Currency Guide</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Crypto Guide</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Supported Crypto</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">How Much to Bet With</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq" className="border-white/10">
                  <AccordionTrigger value="faq" className="text-sm font-semibold py-3">FAQ</AccordionTrigger>
                  <AccordionContent value="faq">
                    <ul className="space-y-1.5 pb-2 text-xs text-white/70">
                      <li><a href="#" className="hover:text-white transition-colors">How-to Guides</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Online Casino Guide</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Sports Betting Guide</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">How to Live Stream Sports</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Bonus Guide</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">House Edge Guide</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3 text-sm">Casino</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Casino Games</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Slots</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Live Casino</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Roulette</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blackjack</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Poker</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Publishers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Promos & Competitions</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">Sports</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Sportsbook</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Live Sports</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Soccer</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Basketball</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tennis</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">eSports</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Bet Bonuses</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sports Rules</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Racing Rules</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">Support</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Fairness</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Responsible Gaming</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gaming Help</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Live Support</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Self Exclusion</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Law Enforcement Request</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">About Us</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">VIP Club</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Affiliate</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AML Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">Payment Info</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Deposit & Withdrawals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Currency Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Crypto Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Supported Crypto</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">How Much to Bet With</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">FAQ</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">How-to Guides</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Online Casino Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sports Betting Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">How to Live Stream Sports</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Bonus Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">House Edge Guide</a></li>
                </ul>
              </div>
            </div>

            <Separator className="bg-white/10 mb-6" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="w-full">
                <div className="mt-2 flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 pr-1">
                  {['btc', 'eth', 'ltc', 'doge', 'bch', 'xrp', 'trx', 'eos', 'usdt', 'bnb', 'usdc', 'dai', 'link', 'ada', 'xmr', 'xtz'].map((symbol) => (
                    <div key={`footer-crypto-home-${symbol}`} className="group h-10 min-w-[48px] rounded-small border border-white/10 bg-white/[0.03] px-2 inline-flex items-center justify-center text-white/45 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_8px_rgba(255,255,255,0.12)]">
                      <span className={`icon icon-${symbol} text-[20px] leading-[1] transition-all duration-200 group-hover:drop-shadow-[0_0_3px_rgba(255,255,255,0.35)]`} aria-label={symbol.toUpperCase()} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-white/60 pt-2 border-t border-white/5">
              <Image
                src="/logos/BHGL_logo-1773311608241-DDbBBO6v.png"
                alt="Betheat"
                width={180}
                height={48}
                className="h-8 w-auto opacity-95"
              />
              <p>© 2026 Betheat.net | All Rights Reserved.</p>
              <p>Website is operated by Entools LTD who will be processing payments for Betheat.net. All video streaming is provided by various third parties and we do not carry any responsibility for actual content, stream quality, or streaming rights.</p>
              <div className="flex items-center gap-1.5 pt-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/5 rounded-small"><IconBrandFacebook className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/5 rounded-small"><IconBrandInstagram className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/5 rounded-small"><IconBrandX className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/5 rounded-small"><IconBrandYoutube className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/5 rounded-small"><IconBrandTiktok className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </footer>

        <style jsx global>{`
          .auth-popup-field,
          .auth-popup-select {
            background-color: rgba(255, 255, 255, 0.025) !important;
          }
          .auth-popup-field:focus,
          .auth-popup-select:focus {
            background-color: rgba(255, 255, 255, 0.03) !important;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
          }
          .auth-popup-field:-webkit-autofill,
          .auth-popup-field:-webkit-autofill:hover,
          .auth-popup-field:-webkit-autofill:focus,
          .auth-popup-field:-webkit-autofill:active {
            -webkit-text-fill-color: #ffffff !important;
            caret-color: #ffffff !important;
            -webkit-box-shadow: 0 0 0 1000px #141920 inset !important;
            box-shadow: 0 0 0 1000px #141920 inset !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            transition: background-color 9999s ease-in-out 0s !important;
          }
        `}</style>

        {/* Register Popup */}
        <AnimatePresence>
          {registerPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed inset-0 z-[220]",
                isMobile ? "bg-black/55 backdrop-blur-sm" : "bg-black/60 backdrop-blur-sm"
              )}
              onClick={(e) => {
                if (e.target === e.currentTarget) setRegisterPopupOpen(false)
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mx-auto mt-[12vh] w-[min(92vw,560px)] rounded-2xl border border-white/10 bg-[#121416] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/logos/lockup.png"
                      alt="Betheat lockup"
                      className="h-6 w-6 object-contain opacity-95"
                      onError={(e) => {
                        e.currentTarget.src = '/logos/BHGL_logo-1773311608241-DDbBBO6v.png'
                      }}
                    />
                    <h3 className="text-white text-xl font-bold">{authPopupView === 'register' ? 'Create account' : 'Login'}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRegisterPopupOpen(false)}
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors"
                    aria-label="Close register popup"
                  >
                    <IconX className="h-4 w-4 text-white/75" />
                  </button>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  {authPopupView === 'register'
                    ? 'Join Betheat in seconds and unlock welcome bonuses.'
                    : 'Welcome back, sign in to continue.'}
                </p>
                <div className="mt-5 inline-flex rounded-small border border-white/[0.08] bg-white/[0.025] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthPopupView('register')
                      setRegisterFormTouched(false)
                    }}
                    className={cn(
                      "h-8 px-3 rounded-small text-xs font-medium transition-colors outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none",
                      authPopupView === 'register'
                        ? "bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        : "text-white/65 hover:bg-white/[0.03] hover:text-white/90"
                    )}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-pressed={authPopupView === 'register'}
                  >
                    Create account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthPopupView('login')
                      setLoginPopupTouched(false)
                    }}
                    className={cn(
                      "h-8 px-3 rounded-small text-xs font-medium transition-colors outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none",
                      authPopupView === 'login'
                        ? "bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        : "text-white/65 hover:bg-white/[0.03] hover:text-white/90"
                    )}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-pressed={authPopupView === 'login'}
                  >
                    Login
                  </button>
                </div>

                {authPopupView === 'register' ? (
                  <form
                    className="mt-4 space-y-3.5"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setRegisterFormTouched(true)
                      if (!canSubmitRegisterForm) return
                      setIsUserLoggedIn(true)
                      setRegisterPopupOpen(false)
                      setRegisterFormTouched(false)
                      setRegisterForm({ email: '', password: '', mobile: '', username: '' })
                      setRegisterCountryCode('+1')
                      setRegisterDob({ day: '', month: '', year: '' })
                    }}
                  >
                    <div className="space-y-1">
                      <input
                        type="email"
                        placeholder="Email address"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                        className={walletFieldClass}
                      />
                      {registerFormTouched && registerFormErrors.email && (
                        <p className="text-xs text-[#ff8d8d]">{registerFormErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Username"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, username: e.target.value }))}
                        className={walletFieldClass}
                      />
                      {registerFormTouched && registerFormErrors.username && (
                        <p className="text-xs text-[#ff8d8d]">{registerFormErrors.username}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="relative">
                        <input
                          type={registerPasswordVisible ? 'text' : 'password'}
                          placeholder="Create password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                          className={`${walletFieldClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setRegisterPasswordVisible((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 hover:text-white/85"
                          aria-label={registerPasswordVisible ? 'Hide password' : 'Show password'}
                        >
                          {registerPasswordVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {registerFormTouched && registerFormErrors.password && (
                        <p className="text-xs text-[#ff8d8d]">{registerFormErrors.password}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="relative w-[88px] shrink-0">
                          <select
                            value={registerCountryCode}
                            onChange={(e) => setRegisterCountryCode(e.target.value)}
                            className="auth-popup-select h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 pr-8 text-sm text-white appearance-none focus:outline-none focus:ring-0 focus:border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                          >
                            <option value="+1" className="bg-[#11151d] text-white">+1</option>
                            <option value="+44" className="bg-[#11151d] text-white">+44</option>
                            <option value="+34" className="bg-[#11151d] text-white">+34</option>
                            <option value="+61" className="bg-[#11151d] text-white">+61</option>
                          </select>
                          <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        </div>
                        <input
                          type="tel"
                          inputMode="numeric"
                          placeholder="Mobile number"
                          value={registerForm.mobile}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, mobile: formatLocalMobileInput(e.target.value) }))}
                          className={walletFieldClass}
                        />
                      </div>
                      {registerFormTouched && registerFormErrors.mobile && (
                        <p className="text-xs text-[#ff8d8d]">{registerFormErrors.mobile}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="relative w-[86px] shrink-0">
                          <select
                            value={registerDob.day}
                            onChange={(e) => setRegisterDob((prev) => ({ ...prev, day: e.target.value }))}
                            className={walletSelectClass}
                          >
                            <option value="" disabled className="bg-[#11151d] text-white/60">DD</option>
                            {Array.from({ length: 31 }).map((_, i) => (
                              <option key={`reg-day-${i + 1}`} value={`${i + 1}`} className="bg-[#11151d] text-white">{i + 1}</option>
                            ))}
                          </select>
                          <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        </div>
                        <div className="relative w-[96px] shrink-0">
                          <select
                            value={registerDob.month}
                            onChange={(e) => setRegisterDob((prev) => ({ ...prev, month: e.target.value }))}
                            className={walletSelectClass}
                          >
                            <option value="" disabled className="bg-[#11151d] text-white/60">MM</option>
                            {[
                              { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' },
                              { label: 'Apr', value: '4' }, { label: 'May', value: '5' }, { label: 'Jun', value: '6' },
                              { label: 'Jul', value: '7' }, { label: 'Aug', value: '8' }, { label: 'Sep', value: '9' },
                              { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' },
                            ].map((month) => (
                              <option key={`reg-month-${month.value}`} value={month.value} className="bg-[#11151d] text-white">{month.label}</option>
                            ))}
                          </select>
                          <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        </div>
                        <div className="relative w-[106px] shrink-0">
                          <select
                            value={registerDob.year}
                            onChange={(e) => setRegisterDob((prev) => ({ ...prev, year: e.target.value }))}
                            className={walletSelectClass}
                          >
                            <option value="" disabled className="bg-[#11151d] text-white/60">YYYY</option>
                            {Array.from({ length: 90 }).map((_, i) => {
                              const y = `${currentYear - i}`
                              return <option key={`reg-year-${y}`} value={y} className="bg-[#11151d] text-white">{y}</option>
                            })}
                          </select>
                          <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        </div>
                      </div>
                      {registerFormTouched && registerFormErrors.dob && (
                        <p className="text-xs text-[#ff8d8d]">{registerFormErrors.dob}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="mt-3 w-full h-11 rounded-small border border-[#ff7a2f]/45 bg-gradient-to-r from-[#ff7a2f] via-[#ff5a14] to-[#9a3f1f] text-white font-bold hover:brightness-110"
                    >
                      Create account
                    </Button>
                    <div className="pt-3">
                      <div className="my-2 h-px bg-white/10" />
                      <p className="mb-3 mt-3 text-center text-xs text-white/55">Or sign up with</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-10 rounded-small bg-[#1a1d22] border border-white/10 text-white/85 hover:bg-[#22262c] justify-center gap-2"
                        >
                          <Image
                            src="/games/google-icon-logo.svg"
                            alt="Google"
                            width={14}
                            height={14}
                            className="w-[14px] h-[14px] object-contain"
                            unoptimized
                          />
                          <span>Google</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-10 rounded-small bg-[#1a1d22] border border-white/10 text-white/85 hover:bg-[#22262c] justify-center gap-2"
                        >
                          <Image
                            src="/games/MetaMask_Fox.svg.png"
                            alt="MetaMask"
                            width={14}
                            height={14}
                            className="w-[14px] h-[14px] object-contain"
                            unoptimized
                          />
                          <span>MetaMask</span>
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form
                    className="mt-4 space-y-3.5"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setLoginPopupTouched(true)
                      if (!canSubmitLogin) return
                      setIsUserLoggedIn(true)
                      setRegisterPopupOpen(false)
                      setLoginPopupTouched(false)
                      setLoginForm({ identifier: '', password: '', keepLoggedIn: false })
                    }}
                  >
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Email address or username"
                        value={loginForm.identifier}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, identifier: e.target.value }))}
                        className={walletFieldClass}
                      />
                      {loginPopupTouched && loginForm.identifier.trim().length === 0 && (
                        <p className="text-xs text-[#ff8d8d]">Please enter your email or username</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="relative">
                        <input
                          type={loginPasswordVisible ? 'text' : 'password'}
                          placeholder="Password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                          className={`${walletFieldClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setLoginPasswordVisible((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 hover:text-white/85"
                          aria-label={loginPasswordVisible ? 'Hide password' : 'Show password'}
                        >
                          {loginPasswordVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {loginPopupTouched && loginForm.password.trim().length < 6 && (
                        <p className="text-xs text-[#ff8d8d]">Use at least 6 characters</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="mt-2 w-full h-11 rounded-small border border-[#9a86d1]/75 text-[#121417] font-semibold hover:text-[#121417]"
                      style={{ backgroundColor: '#c9b4ff', boxShadow: '0 6px 18px rgba(122, 92, 196, 0.28)' }}
                    >
                      Login
                    </Button>
                    <div className="pt-3">
                      <div className="my-2 h-px bg-white/10" />
                      <p className="mb-3 mt-3 text-center text-xs text-white/55">Or continue with</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-10 rounded-small bg-[#1a1d22] border border-white/10 text-white/85 hover:bg-[#22262c] justify-center gap-2"
                        >
                          <Image
                            src="/games/google-icon-logo.svg"
                            alt="Google"
                            width={14}
                            height={14}
                            className="w-[14px] h-[14px] object-contain"
                            unoptimized
                          />
                          <span>Google</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-10 rounded-small bg-[#1a1d22] border border-white/10 text-white/85 hover:bg-[#22262c] justify-center gap-2"
                        >
                          <Image
                            src="/games/MetaMask_Fox.svg.png"
                            alt="MetaMask"
                            width={14}
                            height={14}
                            className="w-[14px] h-[14px] object-contain"
                            unoptimized
                          />
                          <span>MetaMask</span>
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay (casino-style behavior) */}
        <AnimatePresence mode="wait">
          {searchOverlayOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[220] overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSearchOverlayOpen(false)
                  setSearchQuery('')
                }
              }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="min-h-screen bg-[#1a1a1a] text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-[#1a1a1a]/60 backdrop-blur-xl border-b border-white/10 z-10 px-6 py-4">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-end mb-4">
                      <button
                        onClick={() => {
                          setSearchOverlayOpen(false)
                          setSearchQuery('')
                        }}
                        className="p-2 hover:bg-white/10 rounded-small transition-colors"
                        aria-label="Close search"
                      >
                        <IconX className="w-6 h-6 text-white/70 hover:text-white" />
                      </button>
                    </div>
                    <div className="relative">
                      <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-small text-white placeholder:text-white/50 focus:outline-none focus:border-white/20"
                        autoFocus
                      />
                      {searchQuery ? (
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded transition-colors"
                          title="Search"
                        >
                          <IconArrowRight className="w-5 h-5 text-white/70 hover:text-white" />
                        </button>
                      ) : (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <kbd className="px-2 py-1 text-xs font-semibold text-white/50 bg-white/5 border border-white/10 rounded">↵</kbd>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Account Details Drawer */}
        <Drawer 
          open={accountDrawerOpen} 
          onOpenChange={(open) => {
            setAccountDrawerOpen(open)
            if (!open) {
              setAccountDrawerView('account')
            } else {
              setVipDrawerOpen(false)
              setDepositDrawerOpen(false)
            }
          }}
          direction={isMobile ? "bottom" : "right"}
          shouldScaleBackground={false}
        >
          <DrawerContent 
            showOverlay={true}
            overlayClassName={!isMobile ? "bg-[#0f1728]/52 backdrop-blur-[2px]" : "bg-black/45 backdrop-blur-[1.5px]"}
            className={cn(
              "w-full sm:max-w-md bg-[var(--ds-sidebar-bg,#121417)] text-white flex flex-col overscroll-contain outline-none",
              isMobile ? "!border-0 rounded-t-[10px]" : "border-l border-white/10"
            )}
            style={isMobile ? {
              height: '80vh',
              maxHeight: '80vh',
              top: 'auto',
              bottom: 0,
            } : undefined}
          >
            {isMobile && <DrawerHandle />}
            <DrawerHeader className={cn("flex-shrink-0", isMobile ? "px-4 pt-4 pb-3" : "px-4 pt-4 pb-3")}>
              <div className="flex items-center justify-between gap-3">
                {accountDrawerView === 'notifications' ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      variant="ghost"
                      onClick={() => setAccountDrawerView('account')}
                      className="h-8 w-8 p-0 hover:bg-white/10 -ml-2"
                    >
                      <IconChevronLeft className="h-5 w-5 text-white/70" />
                    </Button>
                    <h2 className="text-lg font-semibold text-white">Messages</h2>
                  </div>
                ) : accountDrawerView === 'transactions' ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      variant="ghost"
                      onClick={() => setAccountDrawerView('account')}
                      className="h-8 w-8 p-0 hover:bg-white/10 -ml-2"
                    >
                      <IconChevronLeft className="h-5 w-5 text-white/70" />
                    </Button>
                    <h2 className="text-lg font-semibold text-white">Transactions History</h2>
                  </div>
                ) : accountDrawerView === 'security' ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      variant="ghost"
                      onClick={() => setAccountDrawerView('account')}
                      className="h-8 w-8 p-0 hover:bg-white/10 -ml-2"
                    >
                      <IconChevronLeft className="h-5 w-5 text-white/70" />
                    </Button>
                    <h2 className="text-lg font-semibold text-white">Security Central</h2>
                  </div>
                ) : accountDrawerView === 'createAccount' || accountDrawerView === 'createAccountConfirmation' || accountDrawerView === 'login' ? (
                  <div className="flex items-center gap-3 flex-1">
                    {accountDrawerView === 'createAccount' || accountDrawerView === 'login' ? (
                      <Button
                        variant="ghost"
                        onClick={() => setAccountDrawerView('account')}
                      className="h-8 w-8 p-0 hover:bg-white/10 -ml-2"
                      >
                        <IconChevronLeft className="h-5 w-5 text-white/70" />
                      </Button>
                    ) : (
                      <div className="w-6" />
                    )}
                    <h2 className="text-lg font-semibold text-white">
                      {accountDrawerView === 'createAccount' ? 'Create Account' : accountDrawerView === 'login' ? 'Log In' : 'Confirm Your Email'}
                    </h2>
                  </div>
                ) : isUserLoggedIn ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarFallback className="bg-transparent text-white flex items-center justify-center text-sm font-semibold">
                        <IconUser className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-white text-left">5Aces</div>
                      <div className="text-xs text-white/55 text-left">#290847</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarFallback className="bg-transparent text-white flex items-center justify-center text-sm font-semibold">
                        <IconUser className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-white text-left">Guest</div>
                      <div className="text-xs text-white/55 text-left">Not signed in</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {accountDrawerView !== 'account' || !isUserLoggedIn ? null : (
                    <button 
                      onClick={() => setAccountDrawerView('notifications')}
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                        "bg-white/10 hover:bg-white/15 relative"
                      )}
                    >
                      <IconBell className="h-4 w-4 text-white/75" />
                      <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--ds-primary,#ff6a1a)] border-2 border-[#121417]" />
                    </button>
                  )}
                  {!isMobile && (
                    <DrawerClose asChild>
                      <button className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0">
                        <IconX className="h-4 w-4 text-white/75" />
                      </button>
                    </DrawerClose>
                  )}
                </div>
              </div>
            </DrawerHeader>
            
            <div
              className={cn("flex-1 overflow-y-auto overscroll-contain text-white", isMobile ? "px-4 pt-4 pb-4" : "px-4 pt-6 pb-4")}
              style={isMobile ? { WebkitOverflowScrolling: 'touch', paddingBottom: 'max(env(safe-area-inset-bottom), 14px)' } : undefined}
            >
              {accountDrawerView === 'account' ? (
                <>
                  {isUserLoggedIn ? (
                    <>
                      {/* Balance Information */}
                      <div className="mb-4">
                        <div className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/80">Available Balance</span>
                            <span className="text-sm font-semibold text-white">
                              {currentBrand.symbol}
                              <NumberFlow value={displayBalance} format={{ notation: 'standard', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/80">Bonus</span>
                            <span className="text-sm font-semibold text-white">$0.00</span>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-white/10 mb-3" />

                      <div className="space-y-0.5 w-full mb-3">
                        <Button
                          variant="ghost"
                          className="w-full justify-center gap-2 h-10 px-3 border border-[#9a86d1]/75 text-[#121417] font-semibold hover:text-[#121417]"
                          style={{ backgroundColor: '#c9b4ff', boxShadow: '0 6px 18px rgba(122, 92, 196, 0.28)' }}
                          onClick={() => {
                            setAccountDrawerOpen(false)
                            openDepositDrawer()
                          }}
                        >
                          <IconWallet className="w-4 h-4" />
                          <span>Wallet</span>
                        </Button>
                      </div>

                      <Separator className="bg-white/10 mb-6" />

                      <div className="space-y-1 w-full mb-8">
                        <Button variant="ghost" className="group w-full justify-start text-white hover:bg-white/[0.06] hover:text-white h-12 px-3 min-w-0 transition-colors duration-200">
                          <IconUser className="w-5 h-5 mr-3 text-white/65 transition-colors duration-200 group-hover:text-white/90" />
                          <span className="flex-1 text-left text-white">My Profile</span>
                        </Button>

                        <Button
                          variant="ghost"
                          className="group w-full justify-start text-white hover:bg-white/[0.06] hover:text-white h-12 px-3 min-w-0 transition-colors duration-200"
                          onClick={() => setAccountDrawerView('notifications')}
                        >
                          <IconBell className="w-5 h-5 mr-3 text-white/65 flex-shrink-0 transition-colors duration-200 group-hover:text-white/90" />
                          <span className="flex-1 text-left text-white">Messages</span>
                          {webInboxUnreadCount > 0 && (
                            <span className="bg-[var(--ds-primary,#ff6a1a)] text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                              {webInboxUnreadCount}
                            </span>
                          )}
                        </Button>

                        <Button variant="ghost" className="group w-full justify-start text-white hover:bg-white/[0.06] hover:text-white h-12 px-3 transition-colors duration-200">
                          <IconGift className="w-5 h-5 mr-3 text-white/65 transition-colors duration-200 group-hover:text-white/90" />
                          <span className="flex-1 text-left text-white">My Bonus</span>
                        </Button>

                        <Button
                          variant="ghost"
                          className="group w-full justify-start text-white hover:bg-white/[0.06] hover:text-white h-12 px-3 transition-colors duration-200"
                          onClick={() => {
                            setAccountDrawerView('transactions')
                          }}
                        >
                          <IconCurrencyDollar className="w-5 h-5 mr-3 text-white/65 transition-colors duration-200 group-hover:text-white/90" />
                          <span className="flex-1 text-left text-white">Transactions History</span>
                        </Button>

                        <Button
                          variant="ghost"
                          className="group w-full justify-start text-white hover:bg-white/[0.06] hover:text-white h-12 px-3 transition-colors duration-200"
                          onClick={() => {
                            setAccountDrawerOpen(false)
                            router.push('/sports?account=betHistory')
                          }}
                        >
                          <IconTicket className="w-5 h-5 mr-3 text-white/65 transition-colors duration-200 group-hover:text-white/90" />
                          <span className="flex-1 text-left text-white">Bet History</span>
                        </Button>

                        <Button
                          variant="ghost"
                          className="group w-full justify-start text-white hover:bg-white/[0.06] hover:text-white h-12 px-3 transition-colors duration-200"
                          onClick={() => setAccountDrawerView('security')}
                        >
                          <IconShield className="w-5 h-5 mr-3 text-white/65 transition-colors duration-200 group-hover:text-white/90" />
                          <span className="flex-1 text-left text-white">Security</span>
                        </Button>
                      </div>

                      <Separator className={cn("bg-white/10", isMobile ? "my-4" : "my-5")} />

                      <Button
                        variant="ghost"
                        className="w-full justify-center text-white/60 hover:bg-white/[0.06] hover:text-white/70 h-10 px-2 min-w-0"
                        onClick={() => {
                          setIsUserLoggedIn(false)
                          setAccountDrawerView('account')
                        }}
                      >
                        <span className="text-sm">Log out</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900">You are logged out</p>
                        <p className="mt-1 text-xs text-gray-600">Log back in or create an account to place bets and access your wallet.</p>
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => setAccountDrawerView('login')}
                          className="h-10 rounded-small border border-gray-300 bg-white !text-gray-900 hover:bg-gray-100 hover:!text-gray-900"
                        >
                          Login
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setAccountDrawerView('createAccount')}
                          className="h-10 rounded-small border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500 hover:border-emerald-500"
                        >
                          Create Account
                        </Button>
                      </div>

                      <Separator className="bg-gray-200 mb-3" />

                      <div className="space-y-1 w-full mb-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-900 hover:bg-gray-100 hover:text-gray-900 h-11 px-3"
                          onClick={() => {
                            setAccountDrawerOpen(false)
                            openDepositDrawer()
                          }}
                        >
                          <IconWallet className="w-5 h-5 mr-3 text-gray-700" />
                          <span className="flex-1 text-left text-gray-900">Banking</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-900 hover:bg-gray-100 hover:text-gray-900 h-11 px-3"
                        >
                          <IconLifebuoy className="w-5 h-5 mr-3 text-gray-700" />
                          <span className="flex-1 text-left text-gray-900">Help Center</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-900 hover:bg-gray-100 hover:text-gray-900 h-11 px-3"
                          onClick={() => {
                            openVipDrawer()
                          }}
                        >
                          <IconCrown className="w-5 h-5 mr-3 text-gray-700" />
                          <span className="flex-1 text-left text-gray-900">VIP Rewards</span>
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ) : accountDrawerView === 'transactions' ? (
                <div className="space-y-3">
                  {accountTransactionRows.map((row) => (
                    <div
                      key={row.id}
                      className="rounded-small border border-white/[0.08] bg-white/[0.03] px-3 py-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{row.type}</p>
                          <p className="text-xs text-white/55">{row.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">{row.amount}</p>
                          <p className="text-[11px] text-white/55">{row.date}</p>
                        </div>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-2 py-0.5">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            row.status === 'COMPLETED'
                              ? "bg-emerald-400"
                              : row.status === 'PENDING'
                                ? "bg-amber-300"
                                : "bg-blue-300"
                          )}
                        />
                        <span className="text-[10px] text-white/70">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : accountDrawerView === 'security' ? (
                <div className="space-y-3">
                  <div className="rounded-small border border-white/[0.08] bg-white/[0.03] px-3 py-3">
                    <p className="text-sm font-semibold text-white">Security Central</p>
                    <p className="mt-1 text-xs text-white/65">
                      Manage password, login checks, and trusted access settings.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-small border border-white/[0.1] bg-white/[0.03] px-3 py-3 text-left hover:bg-white/[0.05] transition-colors"
                  >
                    <p className="text-sm font-semibold text-white">Security Recommendations</p>
                    <p className="mt-0.5 text-xs text-white/60">Review important actions to protect your account.</p>
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-small border border-white/[0.1] bg-white/[0.03] px-3 py-3 text-left hover:bg-white/[0.05] transition-colors"
                  >
                    <p className="text-sm font-semibold text-white">Change Password</p>
                    <p className="mt-0.5 text-xs text-white/60">Keep your account secure with regular password updates.</p>
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-small border border-white/[0.1] bg-white/[0.03] px-3 py-3 text-left hover:bg-white/[0.05] transition-colors"
                  >
                    <p className="text-sm font-semibold text-white">2-Factor Authentication</p>
                    <p className="mt-0.5 text-xs text-white/60">Add an extra verification step at sign-in.</p>
                  </button>
                </div>
              ) : accountDrawerView === 'login' ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-3 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Email or Account Number</label>
                      <input
                        value={loginForm.identifier}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, identifier: e.target.value }))}
                        placeholder="Email or Account Number"
                        className={createAccountInputClass}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-700">Password</label>
                        <button type="button" className="text-xs font-semibold text-gray-600 hover:text-gray-900">Forgot Password?</button>
                      </div>
                      <div className="relative">
                        <input
                          type={loginPasswordVisible ? 'text' : 'password'}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                          placeholder="Password"
                          className={`${createAccountInputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setLoginPasswordVisible((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          aria-label={loginPasswordVisible ? 'Hide password' : 'Show password'}
                        >
                          {loginPasswordVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <Checkbox
                        checked={loginForm.keepLoggedIn}
                        onCheckedChange={(checked) => setLoginForm((prev) => ({ ...prev, keepLoggedIn: checked === true }))}
                        className="h-5 w-5 rounded-[4px] border-gray-300 bg-white data-[state=checked]:bg-[#ee3536] data-[state=checked]:border-[#ee3536]"
                      />
                      <span className="text-sm text-gray-700">Keep me logged in</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button type="button" className="text-gray-500 hover:text-gray-700">
                            <IconInfoCircle className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="center" side="top" className="w-[320px] bg-white border border-gray-300 text-gray-700 p-4 shadow-xl">
                          <p className="text-sm leading-relaxed">
                            Choosing <span className="font-semibold">"Keep me logged in"</span> reduces the number of times you&apos;re asked to Log-In on this device.
                          </p>
                          <p className="text-sm leading-relaxed mt-3">
                            To keep your account secure, use this option only on your personal devices (do not use on shared or public devices).
                          </p>
                        </PopoverContent>
                      </Popover>
                    </label>
                  </div>

                  {isMobile && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full h-11 rounded-small border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => {
                        setLoginForm((prev) => ({ ...prev, identifier: 'face-id@betonline.com', password: '******' }))
                        setIsUserLoggedIn(true)
                        setAccountDrawerOpen(false)
                        setAccountDrawerView('account')
                      }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <IconFingerprint className="h-4 w-4" />
                        <span>Use Biometrics</span>
                      </span>
                    </Button>
                  )}

                  <Button
                    type="button"
                    disabled={!canSubmitLogin}
                    className="w-full h-11 rounded-small bg-[#059669] hover:bg-[#10b981] text-white disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={() => {
                      setIsUserLoggedIn(true)
                      setAccountDrawerOpen(false)
                      setAccountDrawerView('account')
                    }}
                  >
                    Log In
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-xs font-medium text-gray-700 hover:text-gray-900"
                      onClick={() => setAccountDrawerView('createAccount')}
                    >
                      Don&apos;t have an account yet? <span className="text-[#ee3536] font-semibold">Sign Up!</span>
                    </button>
                  </div>
                </div>
              ) : accountDrawerView === 'createAccount' ? (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/banners/casino/casino_banner1.svg"
                      alt="Signup offer banner"
                      width={1200}
                      height={360}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-3 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Full Name *</label>
                      <input
                        value={createAccountForm.fullName}
                        onChange={(e) => setCreateAccountForm((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Your full name"
                        className={createAccountInputClass}
                      />
                      {createAccountTouched && createAccountErrors.fullName && (
                        <p className="text-xs text-[#ee3536]">{createAccountErrors.fullName}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        value={createAccountForm.email}
                        onChange={(e) => setCreateAccountForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                        className={createAccountInputClass}
                      />
                      {createAccountTouched && createAccountErrors.email && (
                        <p className="text-xs text-[#ee3536]">{createAccountErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Password *</label>
                      <div className="relative">
                        <input
                          type={createAccountPasswordVisible ? 'text' : 'password'}
                          value={createAccountForm.password}
                          onChange={(e) => setCreateAccountForm((prev) => ({ ...prev, password: e.target.value }))}
                          placeholder="Password"
                          className={`${createAccountInputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setCreateAccountPasswordVisible((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          aria-label={createAccountPasswordVisible ? 'Hide password' : 'Show password'}
                        >
                          {createAccountPasswordVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                        </button>
                      </div>
                      {createAccountTouched && createAccountErrors.password && (
                        <p className="text-xs text-[#ee3536]">{createAccountErrors.password}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">Phone Number *</label>
                      <div className="grid grid-cols-[120px_1fr] gap-2 mt-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button type="button" className={`${createAccountSelectClass} flex items-center justify-between`}>
                              <span className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-xs ring-1 ring-gray-200">
                                  {createAccountForm.countryCode === '+1' ? '🇺🇸' : createAccountForm.countryCode === '+44' ? '🇬🇧' : createAccountForm.countryCode === '+34' ? '🇪🇸' : '🇦🇺'}
                                </span>
                                <span>
                                  {createAccountForm.countryCode === '+1' ? 'US +1' : createAccountForm.countryCode === '+44' ? 'UK +44' : createAccountForm.countryCode === '+34' ? 'ES +34' : 'AU +61'}
                                </span>
                              </span>
                              <IconChevronDown className="h-4 w-4 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-[150px] bg-white border border-gray-200">
                            <DropdownMenuItem onClick={() => setCreateAccountForm((prev) => ({ ...prev, countryCode: '+1' }))} className="text-gray-900 hover:bg-gray-100">
                              <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-xs ring-1 ring-gray-200 mr-2">🇺🇸</span>
                              US +1
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCreateAccountForm((prev) => ({ ...prev, countryCode: '+44' }))} className="text-gray-900 hover:bg-gray-100">
                              <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-xs ring-1 ring-gray-200 mr-2">🇬🇧</span>
                              UK +44
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCreateAccountForm((prev) => ({ ...prev, countryCode: '+34' }))} className="text-gray-900 hover:bg-gray-100">
                              <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-xs ring-1 ring-gray-200 mr-2">🇪🇸</span>
                              ES +34
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCreateAccountForm((prev) => ({ ...prev, countryCode: '+61' }))} className="text-gray-900 hover:bg-gray-100">
                              <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white text-xs ring-1 ring-gray-200 mr-2">🇦🇺</span>
                              AU +61
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <input
                          type="tel"
                          value={createAccountForm.phone}
                          onChange={(e) => setCreateAccountForm((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Phone Number"
                          className={createAccountInputClass}
                        />
                      </div>
                      {createAccountTouched && createAccountErrors.phone && (
                        <p className="text-xs text-[#ee3536] mt-1">{createAccountErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">Date of Birth *</label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <input
                          ref={dobDayRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          value={createAccountDob.day}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, '').slice(0, 2)
                            setCreateAccountDob((prev) => ({ ...prev, day: next }))
                            if (next.length === 2) dobMonthRef.current?.focus()
                          }}
                          placeholder="DD"
                          className={createAccountInputClass}
                        />
                        <input
                          ref={dobMonthRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          value={createAccountDob.month}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, '').slice(0, 2)
                            setCreateAccountDob((prev) => ({ ...prev, month: next }))
                            if (next.length === 2) dobYearRef.current?.focus()
                          }}
                          placeholder="MM"
                          className={createAccountInputClass}
                        />
                        <input
                          ref={dobYearRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          value={createAccountDob.year}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, '').slice(0, 4)
                            setCreateAccountDob((prev) => ({ ...prev, year: next }))
                          }}
                          placeholder="YYYY"
                          className={createAccountInputClass}
                        />
                      </div>
                      {createAccountTouched && createAccountErrors.dob && (
                        <p className="text-xs text-[#ee3536] mt-1">{createAccountErrors.dob}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setCreateAccountTouched(true)
                      if (!isCreateAccountStepValid) return
                      setAccountDrawerView('createAccountConfirmation')
                    }}
                    disabled={!isCreateAccountStepValid}
                    className="w-full h-11 rounded-small bg-[#059669] hover:bg-[#10b981] text-white disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    Continue
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-xs font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2"
                      onClick={() => setAccountDrawerView('login')}
                    >
                      Already have an account? Log in
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-gray-600 gap-1.5">
                          <IconShield className="text-green-600 w-3.5 h-3.5" />
                          <span className="text-xs font-medium">SAFE &amp; SECURE</span>
                        </div>
                        <div className="w-px h-3.5 bg-gray-300" />
                        <div className="flex items-center text-gray-600 gap-1.5">
                          <IconLock className="text-blue-600 w-3.5 h-3.5" />
                          <span className="text-xs font-medium">TRUSTED EXPERIENCE</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-center text-xs">
                        Your details are encrypted and protected.
                      </p>
                    </div>
                  </div>
                </div>
              ) : accountDrawerView === 'createAccountConfirmation' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[#ee3536]" />
                    <div className="flex-1 h-1.5 rounded-full bg-[#ee3536]" />
                  </div>
                  <div className="text-xs text-gray-500">Step 2 of 2: Verify your email</div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#059669] flex items-center justify-center">
                        <IconCheck className="h-3.5 w-3.5 text-white" />
                      </span>
                      <p className="text-sm font-semibold text-gray-900">Account created</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      We sent an activation email to <span className="font-medium text-gray-900">{createAccountForm.email || 'your email'}</span>. Activate your account from that email to start betting.
                    </p>
                    <div className="mt-3 space-y-1">
                      <label className="text-xs font-medium text-gray-700">Alias / Nickname (optional)</label>
                      <input
                        value={createAccountAlias}
                        onChange={(e) => setCreateAccountAlias(e.target.value)}
                        placeholder="How should we display your name?"
                        className={createAccountInputClass}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setAccountDrawerView('account')
                      setCreateAccountTouched(false)
                      setCreateAccountPasswordVisible(false)
                      setCreateAccountDob({ day: '', month: '', year: '' })
                      setCreateAccountAlias('')
                      setCreateAccountForm({ fullName: '', email: '', password: '', countryCode: '+1', phone: '', dob: '' })
                    }}
                    className="w-full h-11 rounded-small bg-[#059669] hover:bg-[#10b981] text-white"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <NotificationHub />
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>

        {/* VIP Rewards Drawer */}
        <Drawer 
          open={vipDrawerOpen} 
          onOpenChange={handleVipDrawerOpenChange}
          direction={isMobile ? "bottom" : "right"}
          shouldScaleBackground={false}
        >
          <DrawerContent 
            showOverlay={isMobile}
            className={cn(
              "bg-[#1a1a1a] text-white flex flex-col relative",
              "w-full sm:max-w-md border-l border-white/10 overflow-hidden",
              isMobile && "rounded-t-[10px]"
            )}
            style={isMobile ? {
              height: '80vh',
              maxHeight: '80vh',
              top: 'auto',
              bottom: 0,
            } : { display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}
          >
            {isMobile && <DrawerHandle variant="light" />}
            
            {/* Title + Close button for desktop only */}
            {!isMobile && (
              <div className="relative px-4 pt-4 pb-2 flex-shrink-0 flex items-center justify-between z-50">
                <h2 className="text-base font-semibold text-white">VIP Hub</h2>
                <DrawerClose asChild>
                  <button className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0">
                    <IconX className="h-4 w-4 text-white/70" />
                  </button>
                </DrawerClose>
              </div>
            )}
            
            <VipDrawerContent
              vipActiveTab={vipActiveTab}
              setVipActiveTab={setVipActiveTab}
              canScrollVipLeft={canScrollVipLeft}
              setCanScrollVipLeft={setCanScrollVipLeft}
              canScrollVipRight={canScrollVipRight}
              setCanScrollVipRight={setCanScrollVipRight}
              vipTabsContainerRef={vipTabsContainerRef}
              vipDrawerOpen={vipDrawerOpen}
              brandPrimary={brandPrimary}
              claimedBoosts={claimedBoosts}
              setClaimedBoosts={setClaimedBoosts}
              boostProcessing={boostProcessing}
              setBoostProcessing={setBoostProcessing}
              boostClaimMessage={boostClaimMessage}
              setBoostClaimMessage={setBoostClaimMessage}
              onBoostClaimed={handleBoostClaimed}
              profitBoostOptedIn={profitBoostOptedIn}
              setProfitBoostOptedIn={setProfitBoostOptedIn}
            />
          </DrawerContent>
        </Drawer>

        {/* Deposit Drawer */}
        <Drawer open={depositDrawerOpen} onOpenChange={handleDepositDrawerOpenChange} direction={isMobile ? "bottom" : "right"} shouldScaleBackground={false}>
          <DrawerContent 
                showOverlay={true}
                overlayClassName={!isMobile ? "bg-[#0f1728]/52 backdrop-blur-[2px]" : "bg-black/45 backdrop-blur-[1.5px]"}
                className={cn(
                  "w-full sm:max-w-md bg-[var(--ds-sidebar-bg,#121417)] text-white flex flex-col overscroll-contain outline-none",
                  isMobile ? "!border-0 rounded-t-[10px]" : "border-l border-white/10"
                )}
                style={isMobile ? {
                  height: '80vh',
                  maxHeight: '80vh',
                  top: 'auto',
                  bottom: 0,
                } : { display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}
              >
                {isMobile && <DrawerHandle />}
            
                {!isMobile && (
              <DrawerHeader className="relative flex-shrink-0 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-white">Wallet</h2>
                  <DrawerClose asChild>
                    <button className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0">
                      <IconX className="h-4 w-4 text-white/75" />
                    </button>
                  </DrawerClose>
              </div>
            </DrawerHeader>
            )}
            <div className={cn("w-full overflow-y-auto flex-1 min-h-0", isMobile ? "px-4 pt-4 pb-6" : "px-4 pt-4 pb-4")} style={{ WebkitOverflowScrolling: 'touch', overflowY: 'auto', flex: '1 1 auto', minHeight: 0, paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 20px)' : undefined }}>
              <Card className="bg-white/[0.04] border border-white/10 shadow-none">
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-white">Quick Wallet</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Quick deposit content is temporarily removed while we align this drawer with the global account hub style.
                  </p>
                </CardContent>
              </Card>

              {false && (!showDepositConfirmation ? (
              <>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className={cn(isMobile ? "p-4" : "p-5")}>
                  {/* Saved Methods Dropdown */}
                  <div className={cn(isMobile ? "mb-4" : "mb-5")}>
                    <div className={cn("flex items-center justify-between", isMobile ? "mb-3" : "mb-3")}>
                      <label className="block text-sm font-semibold text-gray-900">
                        Saved Methods
                      </label>
                      <button
                        onClick={() => {
                          console.log("Add new deposit method clicked");
                        }}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        + Add Method
                      </button>
                    </div>
                    <div className="relative">
                      <div className="relative">
                        <select
                          value={selectedPaymentMethod}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 appearance-none cursor-pointer hover:border-gray-300 transition-all shadow-sm pr-12"
                        >
                          <option value="bitcoin">Bitcoin</option>
                          <option value="card1">Mastercard **** 0740</option>
                          <option value="card2">Visa **** 5234</option>
                          <option value="card3">American Express **** 1234</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <IconChevronDown className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className={cn("bg-gray-200", isMobile ? "my-4" : "my-5")} />

                  {/* Deposit Amount */}
                  <div>
                    {!useManualAmount ? (
                      <>
                        <UsageBasedPricing
                          className="w-full"
                          min={25}
                          max={10000}
                          snapTo={25}
                          currency={currentBrand.symbol}
                          basePrice={0}
                          includedCredits={0}
                          value={depositAmount}
                          onChange={setDepositAmount}
                          onChangeEnd={(v) => {
                            console.log("Deposit amount committed:", v);
                            setDepositAmount(v);
                          }}
                          title=""
                          subtitle=""
                        />
                        <div className="flex items-center justify-end mt-3">
                          <button
                            onClick={() => setUseManualAmount(true)}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            + Add Manual Amount
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className={cn("space-y-3", isMobile && "space-y-2")}>
                        <div>
                          <label className={cn("block font-semibold text-gray-900 mb-2", isMobile ? "text-xs" : "text-sm")}>
                            Deposit Amount
                          </label>
                          <Input
                            type="number"
                            min={25}
                            max={10000}
                            step={0.01}
                            value={depositAmount}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              if (value >= 25 && value <= 10000) {
                                setDepositAmount(value);
                              } else if (value > 10000) {
                                setDepositAmount(10000);
                              } else if (value < 25 && e.target.value !== '') {
                                setDepositAmount(25);
                              }
                            }}
                            onBlur={(e) => {
                              const value = parseFloat(e.target.value) || 25;
                              if (value < 25) {
                                setDepositAmount(25);
                              } else if (value > 10000) {
                                setDepositAmount(10000);
                              } else {
                                setDepositAmount(value);
                              }
                            }}
                            className={cn(
                              "w-full bg-white border-2 border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 hover:border-gray-300 transition-all",
                              isMobile ? "px-3 py-2.5 text-sm" : "px-4 py-3 text-base"
                            )}
                            placeholder="Enter amount (25 - 10,000)"
                          />
                          <p className={cn("text-gray-500 mt-1.5", isMobile ? "text-[10px]" : "text-xs")}>
                            Min. {currentBrand.symbol}25 / Max. {currentBrand.symbol}10,000
                          </p>
                        </div>
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => setUseManualAmount(false)}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Use Slider
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className={cn("bg-gray-200", isMobile ? "my-6" : "my-8")} />

                  {/* Deposit Summary */}
                  <div>
                    <div className={cn("bg-gray-50 rounded-lg", isMobile ? "space-y-2 p-3" : "space-y-2 p-4")}>
                      <div className={cn("flex justify-between", isMobile ? "text-xs" : "text-sm")}>
                        <span className="text-gray-600">Deposit Amount:</span>
                        <span className="text-gray-900 font-medium">{currentBrand.symbol}{depositAmount.toFixed(2)}</span>
                      </div>
                      <div className={cn("flex justify-between", isMobile ? "text-xs" : "text-sm")}>
                        <span className="text-gray-600">Fee (9.75%):</span>
                        <span className="text-gray-900 font-medium">{currentBrand.symbol}{(depositAmount * 0.0975).toFixed(2)}</span>
                      </div>
                      <div className={cn("flex justify-between pt-1.5 border-t border-gray-200", isMobile ? "text-sm" : "text-base")}>
                        <span className="text-gray-900 font-semibold">Total Amount:</span>
                        <span className="text-gray-900 font-bold">{currentBrand.symbol}{(depositAmount + depositAmount * 0.0975).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        console.log("Deposit: Proceed with amount:", depositAmount);
                        setIsDepositLoading(true)
                        const txId = Math.floor(Math.random() * 10000000).toString()
                        setTransactionId(txId)
                        setTimeout(() => {
                          setIsDepositLoading(false)
                          setShowDepositConfirmation(true)
                          setStepLoading({started: true, processing: false, almost: false, complete: false})
                          setTimeout(() => {
                            setDepositStep('started')
                            setStepLoading({started: false, processing: true, almost: false, complete: false})
                            setTimeout(() => {
                              setDepositStep('processing')
                              setStepLoading({started: false, processing: false, almost: true, complete: false})
                              setTimeout(() => {
                                setDepositStep('almost')
                                setStepLoading({started: false, processing: false, almost: false, complete: true})
                                setTimeout(() => {
                                  setDepositStep('complete')
                                  setStepLoading({started: false, processing: false, almost: false, complete: false})
                                }, 800)
                              }, 1500)
                            }, 800)
                          }, 500)
                        }, 1000)
                      }}
                      disabled={depositAmount < 25 || depositAmount > 10000 || isDepositLoading}
                      className={cn("w-full bg-[#059669] text-white hover:bg-[#10b981] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-md font-semibold transition-colors cursor-pointer", isMobile ? "h-11 mt-4 text-sm" : "h-12 mt-4")}
                      style={{ pointerEvents: 'auto', zIndex: 10 }}
                    >
                      {isDepositLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <IconLoader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        `DEPOSIT ${currentBrand.symbol}${depositAmount > 0 ? depositAmount.toFixed(2) : "0.00"}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Section */}
              <div className={cn("border-t border-gray-200", isMobile ? "mt-4 pt-4" : "mt-5 pt-5 pb-4")} style={isMobile ? { paddingBottom: '0px', marginBottom: 0 } : undefined}>
                <div className={cn("flex flex-col items-center", isMobile ? "gap-2" : "gap-2.5")}>
                  <div className={cn("flex items-center", isMobile ? "gap-2" : "gap-3")}>
                    <div className={cn("flex items-center text-gray-600", isMobile ? "gap-1" : "gap-1.5")}>
                      <IconShield className={cn("text-green-600", isMobile ? "w-3 h-3" : "w-3.5 h-3.5")} />
                      <span className={cn("font-medium", isMobile ? "text-[10px]" : "text-xs")}>SSL Encrypted</span>
                    </div>
                    <div className={cn("bg-gray-300", isMobile ? "w-px h-2.5" : "w-px h-3.5")} />
                    <div className={cn("flex items-center text-gray-600", isMobile ? "gap-1" : "gap-1.5")}>
                      <IconLock className={cn("text-blue-600", isMobile ? "w-3 h-3" : "w-3.5 h-3.5")} />
                      <span className={cn("font-medium", isMobile ? "text-[10px]" : "text-xs")}>Secure Payment</span>
                    </div>
                  </div>
                  <p className={cn("text-gray-500 text-center max-w-sm leading-tight", isMobile ? "text-[10px]" : "text-xs")}>
                    Your payment information is secure and encrypted. We never store your full card details.
                  </p>
                </div>
              </div>
              </>
              ) : (
                /* Deposit Confirmation Screen */
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">Your deposit is on the way...</h2>
                    <p className="text-gray-500 text-sm">Transaction ID: {transactionId}</p>
                  </div>

                  <Card className="bg-gray-50 border border-gray-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Deposit Amount</span>
                          <span className="text-lg font-semibold text-gray-900">{currentBrand.symbol}{depositAmount.toFixed(2)}</span>
                        </div>
                        <Separator className="bg-gray-200" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Payment Method</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedPaymentMethod === 'bitcoin' ? 'Bitcoin' : 
                             selectedPaymentMethod === 'card1' ? 'Mastercard **** 0740' :
                             selectedPaymentMethod === 'card2' ? 'Visa **** 5234' :
                             selectedPaymentMethod === 'card3' ? 'American Express **** 1234' : selectedPaymentMethod}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                    
                    {/* Stepper Progress Card */}
                    <Card className="bg-white border border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="relative">
                          <div className="flex items-start justify-between px-1">
                            {/* Started Step */}
                            <div className="flex flex-col items-center flex-1 min-w-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                depositStep === 'started' || depositStep === 'processing' || depositStep === 'almost' || depositStep === 'complete'
                                  ? 'bg-[#059669] shadow-sm' : 'bg-gray-200 border-2 border-gray-300'
                              }`}>
                                {stepLoading.started ? (
                                  <IconLoader2 className="w-4 h-4 text-white animate-spin" />
                                ) : depositStep === 'started' || depositStep === 'processing' || depositStep === 'almost' || depositStep === 'complete' ? (
                                  <IconCheck className="w-5 h-5 text-white" />
                                ) : null}
                              </div>
                              <span className="text-gray-900 text-xs font-medium whitespace-nowrap">Started</span>
                            </div>
                            
                            <div className={`flex-1 h-1 mt-5 mx-2 transition-all rounded-full ${
                              depositStep === 'processing' || depositStep === 'almost' || depositStep === 'complete'
                                ? 'bg-[#059669]' : 'bg-gray-200'
                            }`} />
                            
                            {/* Processing Step */}
                            <div className="flex flex-col items-center flex-1 min-w-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                depositStep === 'processing'
                                  ? 'bg-white border-2 border-gray-300 shadow-sm' 
                                  : depositStep === 'almost' || depositStep === 'complete'
                                  ? 'bg-[#059669] shadow-sm'
                                  : 'bg-gray-200 border-2 border-gray-300'
                              }`}>
                                {stepLoading.processing ? (
                                  <IconLoader2 className="w-4 h-4 text-gray-900 animate-spin" />
                                ) : depositStep === 'processing' ? (
                                  <IconLoader2 className="w-4 h-4 text-gray-900 animate-spin" />
                                ) : depositStep === 'almost' || depositStep === 'complete' ? (
                                  <IconCheck className="w-5 h-5 text-white" />
                                ) : (
                                  <span className="text-gray-400 text-xs font-bold">B</span>
                                )}
                              </div>
                              <span className={`text-xs font-medium whitespace-nowrap ${
                                depositStep === 'processing' || depositStep === 'almost' || depositStep === 'complete'
                                  ? 'text-gray-900' : 'text-gray-500'
                              }`}>Processing</span>
                            </div>
                            
                            <div className={`flex-1 h-1 mt-5 mx-2 transition-all rounded-full ${
                              depositStep === 'almost' || depositStep === 'complete'
                                ? 'bg-[#059669]' : 'bg-gray-200'
                            }`} />
                            
                            {/* Almost Done Step */}
                            <div className="flex flex-col items-center flex-1 min-w-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                depositStep === 'almost' || depositStep === 'complete'
                                  ? 'bg-[#059669] shadow-sm' : 'bg-gray-200 border-2 border-gray-300'
                              }`}>
                                {stepLoading.almost ? (
                                  <IconLoader2 className="w-4 h-4 text-white animate-spin" />
                                ) : depositStep === 'almost' || depositStep === 'complete' ? (
                                  <IconCheck className="w-5 h-5 text-white" />
                                ) : null}
                              </div>
                              <span className={`text-xs font-medium whitespace-nowrap ${
                                depositStep === 'almost' || depositStep === 'complete'
                                  ? 'text-gray-900' : 'text-gray-500'
                              }`}>Almost Done</span>
                            </div>
                            
                            <div className={`flex-1 h-1 mt-5 mx-2 transition-all rounded-full ${
                              depositStep === 'complete'
                                ? 'bg-[#059669]' : 'bg-gray-200'
                            }`} />
                            
                            {/* Complete Step */}
                            <div className="flex flex-col items-center flex-1 min-w-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                depositStep === 'complete'
                                  ? 'bg-[#059669] shadow-sm' : 'bg-gray-200 border-2 border-gray-300'
                              }`}>
                                {stepLoading.complete ? (
                                  <IconLoader2 className="w-4 h-4 text-white animate-spin" />
                                ) : depositStep === 'complete' ? (
                                  <IconCheck className="w-5 h-5 text-white" />
                                ) : null}
                              </div>
                              <span className={`text-xs font-medium whitespace-nowrap ${
                                depositStep === 'complete'
                                  ? 'text-gray-900' : 'text-gray-500'
                              }`}>Complete</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Play Now Button */}
                    {depositStep === 'complete' && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowDepositConfirmation(false)
                          setDepositDrawerOpen(false)
                          setDepositStep('started')
                          setStepLoading({started: false, processing: false, almost: false, complete: false})
                          setTimeout(() => {
                            const newBalance = balance + depositAmount
                            setBalance(newBalance)
                            const startBalance = displayBalance
                            const endBalance = newBalance
                            const duration = 1000
                            const startTime = Date.now()
                            const animate = () => {
                              const elapsed = Date.now() - startTime
                              const progress = Math.min(elapsed / duration, 1)
                              const easeOutCubic = 1 - Math.pow(1 - progress, 3)
                              const currentBalance = Math.round(startBalance + (endBalance - startBalance) * easeOutCubic)
                              setDisplayBalance(currentBalance)
                              if (progress < 1) {
                                requestAnimationFrame(animate)
                              }
                            }
                            requestAnimationFrame(animate)
                          }, 300)
                        }}
                        className="w-full h-11 mt-4 border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400 rounded-md font-semibold transition-colors"
                      >
                        Play Now
                      </Button>
                    )}
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>

      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <SidebarProvider>
      <HomePageContent />
    </SidebarProvider>
  )
}
