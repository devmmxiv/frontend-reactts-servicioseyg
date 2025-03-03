import { useContext } from "react"
import CrudRecoleccionContext from "../../context/CrudRecoleccionContext"




export const useCrudRecoleccion =()=>{
    const {clientes,entrega,entregas,envia,handleSelect,handleInicia,handleRecoleccion,handleElimina,handleUpdate,
        handleLimpiarEntrega,
        onChange,onSelect}=useContext(CrudRecoleccionContext)

    return{
        clientes,
        entrega,
        entregas,
        envia,
        handleSelect,
        handleInicia,
        handleElimina,
        handleUpdate,
        handleRecoleccion,
        handleLimpiarEntrega,
        onChange,
        onSelect
  
    }
}

