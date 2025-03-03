import { useContext } from "react"
import EmpleadosContext from "../../context/EmpleadosContext"

export const useEmpleados =()=>{
    const {mensajeros} =useContext(EmpleadosContext)

    return{mensajeros}
}
