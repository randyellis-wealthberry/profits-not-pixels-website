import { useState } from "react"
import { Home, BookOpen, Target, User, Phone, MessageSquare } from "lucide-react"
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
    icon: MessageSquare,
    label: "Testimonials",
    href: "#testimonials",
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
    icon: Phone,
    label: "Contact",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
    iconColor: "text-[#fbbf24]",
  },
]

export function MenuBarDemo() {
  const [activeItem, setActiveItem] = useState<string>("Home")

  const handleItemClick = (label: string) => {
    setActiveItem(label)
    // Scroll to section based on href
    const href = menuItems.find(item => item.label === label)?.href
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
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