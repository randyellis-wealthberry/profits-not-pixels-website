import { useState } from 'react'

interface BannerConfig {
  id: string
  content: string
  actionText?: string
  actionUrl?: string
  icon?: string
  type?: 'announcement' | 'info' | 'warning'
}

interface UseBannerOptions {
  defaultVisible?: boolean
}

export function useBanner(config: BannerConfig, options: UseBannerOptions = {}) {
  const { defaultVisible = true } = options
  const [isVisible, setIsVisible] = useState(defaultVisible)

  const closeBanner = () => {
    setIsVisible(false)
  }

  const resetBanner = () => {
    setIsVisible(true)
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
      content: 'New Feature: Master Boardroom Fluency with our updated framework!',
      actionText: 'Learn More',
      actionUrl: '#features',
      type: 'announcement'
    },
    {
      defaultVisible: true
    }
  )
}