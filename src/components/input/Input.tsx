interface Inputprops {
    label: string
    type:"text"|"password",
    placeholder: string
    onchenge: (e:React.ChangeEvent<HTMLInputElement>)=>void
    errorMsg?: string
    register: {}
}

export const Input = ({onchenge}:Inputprops)=>{
    return <input type="text" onChange={onchenge} />
}