import { useContext } from "react"
import MunicipioContext from "../../context/MunicipiosContext"



export const useMunicipios =()=>{
    const {municipios}=useContext(MunicipioContext)

    return{
 
        municipios,
    
    }
}