import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const useAuth =()=>{
    const {user,municipios,logged}=useContext(AuthContext)

    return{
        user,
        municipios,
        logged
    }
}