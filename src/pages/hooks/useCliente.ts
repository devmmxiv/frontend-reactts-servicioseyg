import { useContext } from "react"
import CrudClienteContext from "../../context/CrudClientesContext"

export const useCliente=()=>{
    const {cliente,clientes,handleCliente,handlerEliminaCliente,selectedCliente,actualizarClientes,listarClientes}=useContext(CrudClienteContext)
    return{
      cliente,  clientes,handleCliente,handlerEliminaCliente,selectedCliente,actualizarClientes,listarClientes
    }
}
