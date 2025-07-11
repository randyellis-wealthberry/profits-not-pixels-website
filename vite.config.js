import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { plugin as phionPlugin } from "phion"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), phionPlugin()],
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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@tabler/icons-react') || id.includes('lucide-react') || id.includes('@radix-ui/react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge') || id.includes('next-themes')) {
              return 'vendor-utils';
            }
            if (id.includes('@relume')) {
              return 'vendor-relume';
            }
            // Other vendor libraries
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
