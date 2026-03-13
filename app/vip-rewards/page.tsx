'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VipRewardsRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to casino with VIP view parameter
    router.replace('/casino?vip=true')
  }, [router])

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/30" />
    </div>
  )
}
