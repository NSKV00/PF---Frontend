import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { createIcons, icons } from "lucide"
import style from "./style.module.css"
import "../../index.css"
import Logo from "../../assets/Logo.png"
import { apiController } from "@/controller/api.controller"
import { toast } from "react-toastify"
import type { returnUser } from "@/schemas/usuario.schema"
import { useAuth } from "../../hooks/useAuth"

export const Header:React.FC=()=>{
    const { user } = useAuth()

    const [menuUOpen, setMenuUOpen] = useState(false)
    const menuURef = useRef<HTMLDivElement | null>(null)
    const buttonURef = useRef<HTMLDivElement | null>(null)
    const [cliente, setCliente] = useState<returnUser[]>([])

    const MenuLateral = ()=>{
        const overlay = document.getElementById("overlay")
        const menu = document.getElementById("Menu")
        
        if (menu && overlay) {
            menu.classList.toggle(style.open)
            overlay.style.display = menu.classList.contains(style.open) ? "block" : "none"
        }
    }

      const pegarUsuario = async () => {
        try {
          const valor = localStorage.getItem("user")
          if (!valor) return

          const user = JSON.parse(valor)
          const id2 = user.id

          const { data } = await apiController.get("usuario", {
            params: { id:id2 }
          })

          setCliente(data)
        } catch (error) {
          console.error("Erro ao buscar usuário:", error)
        }
      }

    const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        try {
        const formData = new FormData()
        formData.append("imagem", file) 

        const user = localStorage.getItem("user")
        if (!user) return
        const { id } = JSON.parse(user)

        await apiController.patch(`usuario/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        toast.success("Foto de perfil atualizada com sucesso!")
        } catch (error) {
        console.error("Erro ao atualizar foto:", error)
        toast.error("Erro ao salvar foto, tente novamente.")
        }
    }
    }

      

    const toggleMenuUsuario = ()=>{
        setMenuUOpen(prev => !prev)
    }

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuURef.current && 
                !menuURef.current.contains(event.target as Node) &&
                buttonURef.current &&
                !buttonURef.current.contains(event.target as Node)
            ) {
                setMenuUOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return ()=> document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(()=>{
        createIcons({ icons })
        pegarUsuario()
          console.log("user (useAuth):", user)
  console.log("cliente (api):", cliente)
    }, [menuUOpen, user])

    return <>
        <header className={style.header}>
            <Link to="/">
                 <img className={style.Logo} src={Logo} alt="logo" />
            </Link>

            <div id="overlay" className={style.overlay} onClick={MenuLateral}></div>
            <div id="Menu" className={style.Menu}>
                <Link to="/"><span data-lucide="home"></span>Home</Link>
                <Link to="/agendamento"><span data-lucide="notebook-tabs"></span>Agendamento</Link>
                <Link to="/servicos"><span data-lucide="square-scissors"></span>Serviços</Link>
            </div>

            <div className={style.MenuLateral} onClick={MenuLateral}>
                <span className={style.menu} data-lucide="menu"></span>
            </div>

            <div ref={buttonURef} className={style.MenuUsuario} onClick={toggleMenuUsuario}>
                <span className={style.menu} data-lucide="user"></span>
                <div ref={menuURef} className={`${style.MenuU} ${menuUOpen ? style.open : ""}`}>
                    {user?.ativo && (<div className={style.profileSection}>
                        <img src={cliente[0]?.imagem ? `data:image/png;base64,${cliente[0].imagem}` : "/default-profile.png"}  alt="Foto de Perfil" className={style.profilePic} />
                        <label htmlFor="uploadFoto" className={style.changePhoto}>
                            Trocar Foto
                        </label>
                        <input id="uploadFoto" type="file" accept="image/*" style={{ display: "none" }} onChange={ async(e) => {
                            await handleFotoChange(e)
                            await pegarUsuario()
                        }
                            }/>
                    </div>)}

                    {user?.ativo && (<Link to="/meusAgendamentos"><span data-lucide="calendar-check"></span>Meus Agendamentos</Link>)}

                    {user?.admin && (<Link to="/clientes"><span data-lucide="users"></span>Clientes</Link>)}
                    {user?.admin && (<Link to="/agendamentos"><span data-lucide="clock"></span>Agendamentos</Link>)}
                    {user?.admin && (<Link to="/funcionarios"><span data-lucide="contact-round"></span>Funcionarios</Link>)}
                    {user?.admin && (<Link to="/semana"><span data-lucide="calendar"></span>Semana</Link>)}


                    {user ?<button className={style.logoutBtn} 
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}>
                    <span data-lucide="log-out"></span> Logout
                </button>: <button className={style.loginBtn} onClick={()=>{
                    window.location.href = "/login"
                    }}>
                    <span data-lucide="log-in"></span>Login
                </button>}
            </div>
        </div>
    </header>
</>
}