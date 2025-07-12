import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import App from "./App"
import "./index.css"

// Error Boundary for production debugging
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1e293b] text-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-[#fbbf24]">Something went wrong</h1>
            <p className="text-gray-300">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#fbbf24] text-black px-4 py-2 rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <App />
        <Analytics />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
