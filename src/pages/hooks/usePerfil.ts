import { useContext } from "react"
import PerfilContext from "../../context/PerfilContext"

export const usePerfil=()=>{
const {perfil,handlePerfil}=useContext(PerfilContext)
return{
    perfil,
    handlePerfil
}
}