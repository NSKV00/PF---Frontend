import React, { createContext, useState } from 'react';
import type { returnUser } from '../schemas/usuarios.schemas';

interface iContext {
    user: returnUser,
    setUser: React.Dispatch<React.SetStateAction<returnUser>>
    name:string,
    setName: React.Dispatch<React.SetStateAction<string>>
}

export const MainContext = createContext<iContext>({} as iContext);

interface MainContextProps {
    children: React.ReactNode
}

export const MainContextProvider=({children}:MainContextProps)=>{
    const [user,setUser] = useState({} as returnUser)
    const [name,setName] = useState("")
    return <MainContext.Provider value={{user,setUser,name,setName}}>

        {children}

    </MainContext.Provider>
} 