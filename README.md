# 📚 Profits, Not Pixels - Professional Landing Page

> **A sophisticated ebook landing page for "Profits, Not Pixels: A Guide for Designers to Shift from Visual Appeal to Boardroom Fluency"**

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://boardroombookblitz-b1xumiue7-wealthberrylabs.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

## 🌐 **Live Website**
**Production URL**: https://boardroombookblitz-b1xumiue7-wealthberrylabs.vercel.app

---

## ✨ **Features**

### 🎯 **Core Components**
- **Hero Section** - Professional landing with call-to-action buttons
- **FAQ Section** - 8 book-specific questions with accordion interface  
- **Testimonials** - Animated testimonial carousel with smooth transitions
- **Logo Carousel** - Company logos with infinite scroll animation
- **BentoGrid** - Modern feature highlights in grid layout
- **Navigation** - Smooth scroll menu with glow effects
- **Author Section** - Professional author bio and credentials
- **Footer** - Stacked circular design with contact information

### 🎨 **Design System**
- **Professional Color Scheme** - Navy blue (#1e293b) and business yellow (#fbbf24)
- **Typography** - Clean, readable fonts optimized for conversion
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Accessibility** - ARIA labels, focus states, and keyboard navigation
- **Animations** - Framer Motion for smooth, professional interactions

### 🛠️ **Technical Stack**
- **React 18.3.1** with TypeScript 5.8.3
- **Vite 5.4.19** for fast development and optimized builds
- **Tailwind CSS 3.4.17** with custom CSS variables
- **shadcn/ui** component library built on Radix UI primitives
- **Framer Motion 12.23.0** for animations
- **Lucide React** for consistent iconography

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- pnpm package manager
- VS Code or Cursor IDE (recommended)

### **1. Development Setup**
```bash
# Start complete development environment
pnpm start
```

This command will:
- ✅ Install all dependencies automatically
- ✅ Start development server at `http://localhost:5173`
- ✅ Enable Phion cloud sync for real-time collaboration
- ✅ Set up browser integration for live editing

### **2. Individual Commands**
```bash
# Development server only
pnpm dev

# Cloud sync only  
pnpm sync

# Production build
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm type-check

# Code linting
pnpm lint
```

---

## 📁 **Project Structure**

```
src/
├── components/
│   ├── ui/                    # shadcn/ui component library
│   │   ├── faq-section.tsx    # FAQ accordion component
│   │   ├── accordion.tsx      # Base accordion primitive
│   │   ├── button.tsx         # CVA button variants
│   │   ├── card.tsx           # Content container components
│   │   └── ...                # Additional UI primitives
│   ├── MenuBarDemo.tsx        # Navigation component
│   └── AnimatedTestimonialsDemo.tsx
├── hooks/                     # Custom React hooks
├── lib/
│   └── utils.ts               # Utility functions (cn, clsx)
└── App.tsx                    # Main application component
```

### **Key Components**

#### **FAQ Section** (`src/components/ui/faq-section.tsx`)
- 8 book-specific questions and answers
- Accordion interface with smooth animations
- Professional styling matching brand colors

#### **Navigation** (`src/components/MenuBarDemo.tsx`)  
- Smooth scroll to page sections
- Glow effects on hover
- Responsive mobile design

#### **UI Component Library**
- Built on **Radix UI** primitives for accessibility
- **Class Variance Authority (CVA)** for variant-based styling
- **React.forwardRef** for proper ref handling
- **TypeScript** strict typing throughout

---

## 🎨 **Design Guidelines**

### **Color Palette**
```css
--primary: #1e293b (Navy Blue)
--accent: #fbbf24 (Business Yellow)  
--background: #0f172a (Dark Navy)
--foreground: #ffffff (White)
--muted: #64748b (Gray)
```

### **Typography**
- **Headings**: Light font weight for elegance
- **Body**: Inter font family for readability
- **CTAs**: Semibold for emphasis

### **Spacing & Layout**
- **Container**: Max-width responsive containers
- **Sections**: Generous vertical padding (py-20 lg:py-40)
- **Grid**: CSS Grid and Flexbox for layouts
- **Responsive**: Mobile-first breakpoints

---

## 🚀 **Deployment**

### **Automatic Deployment**
- **Platform**: Vercel (connected to GitHub)
- **Trigger**: Push to `main` branch
- **Build Time**: ~18 seconds
- **Bundle Size**: 415.73 kB (gzipped)

### **Manual Deployment**
```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel list
```

### **Environment Configuration**
- **Node Version**: 18+
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Framework**: Vite

---

## 🛠️ **Development Workflow**

### **Branch Strategy**
- **main**: Production branch (auto-deployed)
- **feature/**: Feature development branches
- **Merge Policy**: All conflicts resolved in favor of latest work

### **Code Quality**
- **TypeScript**: Strict mode enabled
- **ESLint**: React and TypeScript rules
- **Prettier**: Code formatting (via VS Code)
- **Git Hooks**: Pre-commit linting

### **Testing & Build**
```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Production build test
pnpm build && pnpm preview
```

---

## 📊 **Performance**

### **Build Metrics**
- **Bundle Size**: 1,715.80 kB (raw), 415.73 kB (gzipped)
- **Build Time**: ~18 seconds
- **Dependencies**: 446 packages
- **Tree Shaking**: Enabled for optimal bundle size

### **Runtime Performance**
- **React 18**: Concurrent features for smooth UX
- **Vite**: Fast HMR during development
- **Code Splitting**: Manual chunks recommended for large bundle

---

## 🔧 **Configuration Files**

### **Key Configuration**
- `vite.config.js` - Build tool configuration
- `tailwind.config.js` - Styling and theme setup  
- `tsconfig.json` - TypeScript compiler settings
- `vercel.json` - Deployment configuration
- `CLAUDE.md` - AI assistant development guidelines

---

## 📝 **Project Context**

### **Book Information**
- **Title**: "Profits, Not Pixels: A Guide for Designers to Shift from Visual Appeal to Boardroom Fluency"
- **Target Audience**: Designers wanting to advance their careers
- **Goal**: Transform from creative executors to strategic business partners

### **Website Purpose**
- Professional landing page for ebook marketing
- FAQ section addressing common reader questions
- Testimonials and social proof elements
- Clear call-to-action for book purchase
- Mobile-optimized for maximum conversion

---

## 🤝 **Contributing**

### **Development Setup**
1. Clone the repository
2. Run `pnpm start` for complete setup
3. Edit files in `src/` directory
4. Changes auto-sync via Phion platform

### **Issue Tracking**
- See [GitHub Issues](https://github.com/randyellis-wealthberry/profits-not-pixels-website/issues) for current tasks
- Labels: `feature/ui-components`, `bug/typescript`, `enhancement/styling`, `deployment/vercel`

---

## 📄 **License**

This project is proprietary software developed for the "Profits, Not Pixels" book marketing campaign.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and deployed on Vercel**

🤖 *Development assisted by Claude Code AI*