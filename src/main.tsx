import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import App from "./App"
import { DevToolbar } from "./components/DevToolbar"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
      <DevToolbar />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
)
