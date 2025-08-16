import style from "./style.module.css"
import Logo  from "../../assets/Logo.png"

export const Footer=()=>{
    return <>
        <footer className={style.footer}>
            <img src={Logo} alt="logo" />
            <a className={style.a}> © 2025 Gravus Barbearia - Todos os direitos reservados </a>
        </footer>
    
    </>
}

// export const Footer=()=>{
//     return <footer className={style.footer}> © 2025 Doces CallMaria - Todos os direitos reservados </footer>
// }