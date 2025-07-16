import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { plugin as phionPlugin } from "phion"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Only load Phion plugin in development, not in production builds
    ...(process.env.NODE_ENV !== 'production' ? [phionPlugin()] : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "/src/": path.resolve(__dirname, "./src/"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets", 
    emptyOutDir: true,
    target: 'es2020',
    // Optimize chunk sizes
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Ensure proper module format
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    // Build configuration for production
    rollupOptions: {
      // Remove external packages list - let bundler handle all dependencies properly
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: (id) => {
          // Vendor libraries with granular splitting
          if (id.includes('node_modules')) {
            // Skip development-only packages
            if (id.includes('phion') || id.includes('@21st-extension')) {
              return 'vendor-dev';
            }
            
            // Core React ecosystem (essential for startup)
            if ((id.includes('react') && !id.includes('react-hook-form') && !id.includes('@radix-ui')) ||
                id.includes('react-dom') ||
                id.includes('use-sync-external-store') ||
                id.includes('scheduler')) {
              return 'vendor-react-core';
            }
            
            // Animation libraries (heavy, can be loaded later)
            if (id.includes('framer-motion') || 
                id.includes('motion/react')) {
              return 'vendor-animations';
            }
            
            // Icon libraries (large sets, can be split)
            if (id.includes('lucide-react') || 
                id.includes('@tabler/icons-react')) {
              return 'vendor-icons';
            }
            
            // Radix UI components (large component library)
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            
            // Form and interaction libraries
            if (id.includes('react-hook-form') ||
                id.includes('cmdk') ||
                id.includes('sonner') ||
                id.includes('vaul') ||
                id.includes('react-resizable-panels')) {
              return 'vendor-forms';
            }
            
            // Theme and styling utilities
            if (id.includes('next-themes') ||
                id.includes('class-variance-authority') || 
                id.includes('clsx') || 
                id.includes('tailwind-merge')) {
              return 'vendor-utils';
            }
            
            // Analytics (can be loaded asynchronously)
            if (id.includes('@vercel/analytics')) {
              return 'vendor-analytics';
            }
            
            // Everything else including Supabase
            return 'vendor-misc';
          }
          
          // Critical above-the-fold components (load first)
          if (id.includes('DecryptedHeroTitle') || 
              id.includes('DecryptedText') || 
              id.includes('DecryptedHeader') ||
              id.includes('swoosh')) {
            return 'ui-hero-critical';
          }
          
          // Navigation and layout (needed early)
          if (id.includes('glow-menu') || 
              id.includes('navigation-menu') ||
              id.includes('banner')) {
            return 'ui-navigation';
          }
          
          // Below-the-fold components (can be lazy loaded)
          if (id.includes('testimonials-columns-1') || 
              id.includes('animated-testimonials') ||
              id.includes('logo-carousel')) {
            return 'ui-testimonials';
          }
          
          if (id.includes('apple-cards-carousel') || 
              id.includes('carousel-context')) {
            return 'ui-carousel';
          }
          
          if (id.includes('faq-section')) {
            return 'ui-faq';
          }
          
          if (id.includes('footer2') || 
              id.includes('stacked-circular-footer')) {
            return 'ui-footer';
          }
          
          // Feature-specific chunks
          if (id.includes('feature-flags') || 
              id.includes('use-banner') ||
              id.includes('FlagDebugger')) {
            return 'features-config';
          }
          
          // Animation and interaction utilities
          if (id.includes('use-intersection-observer')) {
            return 'utils-animation';
          }
        }
      }
    },
  },
})
