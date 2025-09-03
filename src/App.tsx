import { MainRoutes } from "./routes/Routes"
import { AuthProvider } from "./context/AuthContext"
import "react-day-picker/style.css";

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  )
}

export default App
