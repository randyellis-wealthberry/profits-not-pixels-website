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
    target: 'es2018',
    // Build configuration for production
    rollupOptions: {
      // Remove external packages list - let bundler handle all dependencies properly
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // Skip development-only packages (they should not be in production bundle anyway)
            if (id.includes('phion') || id.includes('@21st-extension')) {
              return 'vendor-dev';
            }
            
            // Keep ALL React ecosystem together for proper initialization
            if (id.includes('react') || 
                id.includes('@radix-ui') ||
                id.includes('framer-motion') ||
                id.includes('next-themes') ||
                id.includes('cmdk') ||
                id.includes('sonner') ||
                id.includes('vaul') ||
                id.includes('react-hook-form') ||
                id.includes('react-resizable-panels') ||
                id.includes('@tabler/icons-react') || 
                id.includes('lucide-react') ||
                id.includes('use-sync-external-store') ||
                id.includes('scheduler')) {
              return 'vendor-react';
            }
            
            // Utility libraries (safe to separate)
            if (id.includes('class-variance-authority') || 
                id.includes('clsx') || 
                id.includes('tailwind-merge')) {
              return 'vendor-utils';
            }
            
            // Analytics can be separate
            if (id.includes('@vercel/analytics')) {
              return 'vendor-analytics';
            }
            
            // Everything else including Supabase
            return 'vendor-misc';
          }
          
          // Heavy UI components that can be split
          if (id.includes('testimonials-columns-1') || id.includes('animated-testimonials')) {
            return 'ui-testimonials';
          }
          if (id.includes('apple-cards-carousel') || id.includes('carousel-context')) {
            return 'ui-carousel';
          }
          if (id.includes('bento-grid')) {
            return 'ui-bento';
          }
          if (id.includes('faq-section')) {
            return 'ui-faq';
          }
          if (id.includes('footer2') || id.includes('stacked-circular-footer')) {
            return 'ui-footer';
          }
          if (id.includes('glow-menu') || id.includes('navigation-menu')) {
            return 'ui-navigation';
          }
        }
      }
    },
  },
})
