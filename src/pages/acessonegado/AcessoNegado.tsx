// src/pages/Forbidden.tsx
import { Link } from "react-router-dom"

export default function AcessoNegado(){
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "6rem", color: "#d9534f", margin: 0 }}>403</h1>
      <h2 style={{ fontSize: "2rem", margin: "1rem 0", color: "#333" }}>
        Acesso Negado
      </h2>
      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
        Você não tem permissão para visualizar esta página.
      </p>
      <Link
        to="/"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#d9534f",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          transition: "background 0.3s"
        }}
        onMouseOver={(e) => {
          if (e.target instanceof HTMLElement) {
            e.target.style.backgroundColor = "#c9302c";
          }
        }}
        onMouseOut={(e) => {
          if (e.target instanceof HTMLElement) {
            e.target.style.backgroundColor = "#d9534f";
          }
        }}
      >
        Voltar para a Home
      </Link>
    </div>
  )
}