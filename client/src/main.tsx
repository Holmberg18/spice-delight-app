import React from "react"
import ReactDOM from "react-dom/client"
import App from "@/App.tsx"
import "@/index.css"
import { useAuthProvider } from "@/auth/hooks/auth-provider";


const { AuthProvider } = useAuthProvider()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
