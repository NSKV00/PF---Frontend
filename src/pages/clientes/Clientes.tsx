import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"


export const Clientes = ()=>{
   const navigate = useNavigate()

   

    return<>
    
    <Header/>

    <Footer/>
    </>
}