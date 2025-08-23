import { MainRoutes } from "./routes/Routes"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  )
}

export default App
