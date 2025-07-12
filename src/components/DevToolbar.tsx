import React from "react"

// Only render toolbar in development with proper error handling
export const DevToolbar = () => {
  const [shouldRender, setShouldRender] = React.useState(false)
  const [ToolbarComponent, setToolbarComponent] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    // Only load in development environment
    if (import.meta.env.DEV) {
      // Dynamically import the toolbar to avoid production bundle issues
      import("@21st-extension/toolbar-react")
        .then((module) => {
          // Try to ping one of the ports to see if VS Code is available
          return fetch('http://localhost:5747/ping/stagewise', { method: 'GET' })
            .then(() => {
              setToolbarComponent(() => module.TwentyFirstToolbar)
              setShouldRender(true)
            })
        })
        .catch(() => {
          // Silently fail - either package not available or VS Code not running
          setShouldRender(false)
          setToolbarComponent(null)
        })
    }
  }, [])

  // Return null for production builds or when toolbar isn't available
  if (!import.meta.env.DEV || !shouldRender || !ToolbarComponent) {
    return null
  }

  return <ToolbarComponent />
}