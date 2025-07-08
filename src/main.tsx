import { TwentyFirstToolbar } from "@21st-extension/toolbar-react"
import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import App from "./App"
import "./index.css"

// Only render toolbar in development with proper error handling
const DevToolbar = () => {
  const [shouldRender, setShouldRender] = React.useState(false)

  React.useEffect(() => {
    // Check if we're in development and can connect to VS Code
    if (import.meta.env.DEV) {
      // Try to ping one of the ports to see if VS Code is available
      fetch('http://localhost:5747/ping/stagewise', { method: 'GET' })
        .then(() => setShouldRender(true))
        .catch(() => {
          // Silently fail - VS Code not available
          setShouldRender(false)
        })
    }
  }, [])

  return shouldRender ? <TwentyFirstToolbar /> : null
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
      <DevToolbar />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
)
