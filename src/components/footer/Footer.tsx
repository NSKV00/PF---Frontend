import style from "./style.module.css"
import Logo  from "../../assets/Logo.png"

export const Footer=()=>{
    return <>
        <footer className={style.footer}>
            <img src={Logo} alt="logo" />
            <div>
                <p className={style.p}> © 2025 Gravus Barbearia   |   Todos os direitos reservados </p>
                <div className={style.Contatodiv}>
                    <p className={style.contato}>CONTATO:</p>
                    <p className={style.email}>gravusbarber@hotmail.com.br</p>
                </div>
            </div>
        </footer>
    
    </>
}

// export const Footer=()=>{
//     return <footer className={style.footer}> © 2025 Doces CallMaria - Todos os direitos reservados </footer>
// }