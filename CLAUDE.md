# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Commands
- `pnpm start` - Complete development setup (installs dependencies, checks updates, starts dev server with browser integration)
- `pnpm dev` - Start local development server only (http://localhost:5173)
- `pnpm build` - Build production bundle
- `pnpm preview` - Preview production build locally

### Code Quality
- `pnpm lint` - Run ESLint with TypeScript rules
- `pnpm type-check` - Run TypeScript compiler checks (tsc --noEmit)

### Phion Integration
- `pnpm sync` - Start Phion cloud sync service
- `pnpm setup:browser` - Install browser extension for development
- `pnpm clear:ports` - Clear development ports (5173, 3333, 3334)

## Architecture Overview

### Tech Stack
- **Frontend**: React 18.3.1 + TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19 with React plugin
- **Styling**: Tailwind CSS 3.4.17 with custom CSS variables
- **UI Components**: shadcn/ui-inspired system built on Radix UI
- **State Management**: React hooks (useState, localStorage for persistence)
- **Development Platform**: Phion framework integration

### Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components (shadcn/ui style)
│   └── Onboarding.tsx # App onboarding flow
├── hooks/            # Custom React hooks
├── lib/
│   └── utils.ts      # Utility functions (cn, clsx, tailwind-merge)
└── App.tsx           # Main application component
```

### UI Component System

**Design Principles**:
- Built on Radix UI primitives for accessibility
- Uses Class Variance Authority (CVA) for variant-based styling
- Compound components pattern (Card, Dialog export multiple sub-components)
- React.forwardRef for proper ref handling
- CSS custom properties for theming

**Import Patterns**:
- `@/` alias points to `src/`
- `@/components/ui/` for base UI components
- `@/lib/utils` for utility functions (cn helper)

**Styling Conventions**:
- Tailwind utility classes with CSS custom properties
- Consistent focus-visible styles with ring system
- Mobile-first responsive design
- Dark/light mode support via CSS variables
- Animation support via tailwindcss-animate

### Key Features
- **Onboarding Flow**: Persistent localStorage-based onboarding state
- **Theme System**: Dark/light mode toggle with CSS custom properties
- **Phion Integration**: Real-time cloud sync and browser development tools
- **TypeScript**: Strict type checking with path mapping

### Development Patterns
- Use existing UI components from `src/components/ui/`
- Follow compound component patterns for complex UI
- Extend native HTML element props for components
- Use `cn()` utility for conditional styling
- Implement proper TypeScript prop typing
- Use React.forwardRef for ref handling