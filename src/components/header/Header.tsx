import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { createIcons, icons } from "lucide"
import style from "./style.module.css"
import "../../index.css"
import Logo from "../../assets/Logo.png"
import { useAuth } from "../../hooks/useAuth"

export const Header:React.FC=()=>{
    
    const MenuLateral = ()=>{
        const overlay = document.getElementById("overlay")
        const menu = document.getElementById("Menu")

        if (menu && overlay) {
            menu.classList.toggle(style.open)
            overlay.style.display = menu.classList.contains(style.open) ? "block" : "none"
        }
    }

    const MenuUsuario = ()=>{
        const overlayU = document.getElementById("overlayU")
        const menuU = document.getElementById("menuU")

        if (menuU && overlayU){
            menuU.classList.toggle(style.open)
            overlayU.style.display = menuU.classList.contains(style.open) ? "block":"none"
        }
    }

    useEffect(()=>{
        // const userData = localStorage.getItem("user")
        // setUsuario(userData.admin)
        createIcons({ icons })
    }, [])

    return <>
        <header className={style.header}>

            <Link to="/">
                 <img className={style.Logo} src={Logo} alt="logo" />
            </Link>
            {/* <img className={style.Logo} src={Logo} alt="logo" /> */}

            <div id="overlay" className={style.overlay} onClick={MenuLateral}></div>

            <div id="Menu" className={style.Menu}>
                <Link to="/"><span data-lucide="home"></span>Home</Link>
                <Link to="/agendamento" ><span data-lucide="notebook-tabs"></span>Agendamento</Link>
                <Link to="/servicos" ><span data-lucide="square-scissors"></span>Serviços</Link>
                <Link to="/clientes"><span data-lucide="client">Clientes</span></Link>
                {/* {userData.admin === true && (<Link to="/clientes"><span data-lucide="users"></span>Clientes</Link>)} */}
            </div>

            <div id="overlayU" className={style.overlayU} onClick={MenuUsuario}></div>

            <div id="menuU" className={style.MenuU}>
                <div className={style.profileSection}>
                <img src=""/*{userData?.fotoPerfil || "/default-profile.png"}*/ alt="Foto de Perfil" className={style.profilePic} />
                <label htmlFor="uploadFoto" className={style.changePhoto}>
                    Trocar Foto
                </label>
                <input id="uploadFoto" type="file" accept="image/*" style={{ display: "none" }}
                /*onChange={handleTrocarFoto}*/ />
                </div>

                <Link to="/meusAgendamentos">Meus Agendamentos</Link>

                <button className={style.logoutBtn} /*</div>onClick={handleLogout}*/>
                    <span data-lucide="log-out"></span> Logout
                </button>
            </div>

            <div className={style.MenuLateral} onClick={MenuLateral}>
                <span className={style.menu} data-lucide="menu"></span>
            </div>
            <div className={style.MenuUsuario} onClick={MenuUsuario}>
                <span className={style.menu} data-lucide="user"></span>
            </div>
            
        </header>
    </>
}