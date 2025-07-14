import { useState, useEffect } from 'react'

interface BannerConfig {
  id: string
  content: string
  actionText?: string
  actionUrl?: string
  icon?: string
  type?: 'announcement' | 'info' | 'warning'
}

interface UseBannerOptions {
  storageKey?: string
  defaultVisible?: boolean
}

export function useBanner(config: BannerConfig, options: UseBannerOptions = {}) {
  const { storageKey = `banner-${config.id}`, defaultVisible = true } = options
  const [isVisible, setIsVisible] = useState(defaultVisible)

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored === 'false') {
        setIsVisible(false)
      }
    }
  }, [storageKey])

  const closeBanner = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'false')
    }
  }

  const resetBanner = () => {
    setIsVisible(true)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey)
    }
  }

  return {
    isVisible,
    closeBanner,
    resetBanner,
    config
  }
}

// Pre-configured banner for global announcements
export function useAnnouncementBanner() {
  return useBanner(
    {
      id: 'global-announcement',
      content: '🎉 New Feature: Master Boardroom Fluency with our updated framework!',
      actionText: 'Learn More',
      actionUrl: '#features',
      type: 'announcement'
    },
    {
      storageKey: 'global-announcement-banner',
      defaultVisible: true
    }
  )
}