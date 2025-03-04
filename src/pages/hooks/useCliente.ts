import { useContext } from "react"
import CrudClienteContext from "../../context/CrudClientesContext"

export const useCliente=()=>{
    const {clientes,handleCliente,handlerEliminaCliente}=useContext(CrudClienteContext)
    return{
        clientes,handleCliente,handlerEliminaCliente
    }
}
