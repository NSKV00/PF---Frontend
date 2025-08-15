import {Icon} from "@iconify/react"
interface IconifyProps {
    icon:string,
    color?:string,
    className?:string
    onClick?:()=>void
}
export const Iconify=({icon,color,className,onClick}:IconifyProps)=>{
    return <Icon onClick={onClick} className={className} icon={icon} width={24} height={24} color={color??"#000"}/>
}