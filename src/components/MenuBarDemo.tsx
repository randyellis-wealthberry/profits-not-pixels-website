import { useState } from "react"
import { Home, BookOpen, Target, User, Building2, Users } from "lucide-react"
import { MenuBar } from "@/components/ui/glow-menu"

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "#home",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
  {
    icon: BookOpen,
    label: "About Book",
    href: "#about",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
  {
    icon: Target,
    label: "Features",
    href: "#features",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
  {
    icon: User,
    label: "Author",
    href: "#author",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
  {
    icon: Building2,
    label: "Corporate",
    href: "#corporate",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
  {
    icon: Users,
    label: "Participate",
    href: "#participate",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
]

export function MenuBarDemo() {
  const [activeItem, setActiveItem] = useState<string>("Home")

  const handleItemClick = (label: string) => {
    console.log('🔍 Menu item clicked:', label)
    setActiveItem(label)
    
    // Scroll to section based on href
    const href = menuItems.find(item => item.label === label)?.href
    console.log('🎯 Target href:', href)
    
    if (href) {
      const element = document.querySelector(href)
      console.log('🔍 Found element:', element)
      
      if (element) {
        // Calculate offset to account for fixed header
        const headerHeight = 100 // Approximate header height with padding
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight
        
        console.log('📏 Scroll calculation:', {
          elementTop: element.getBoundingClientRect().top,
          windowScrollY: window.scrollY,
          headerHeight,
          finalPosition: elementPosition
        })
        
        // Try multiple scroll methods for maximum compatibility
        try {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
          console.log('✅ window.scrollTo() executed')
        } catch (error) {
          console.log('❌ window.scrollTo() failed, trying fallback:', error)
          // Fallback to scrollIntoView with offset
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Then adjust for header
          setTimeout(() => {
            window.scrollBy(0, -headerHeight)
          }, 100)
        }
      } else {
        console.log('❌ Element not found for:', href)
      }
    }
  }

  return (
    <MenuBar
      items={menuItems}
      activeItem={activeItem}
      onItemClick={handleItemClick}
      className="bg-[#1e293b]/90 border-[#fbbf24]/20"
    />
  )
}