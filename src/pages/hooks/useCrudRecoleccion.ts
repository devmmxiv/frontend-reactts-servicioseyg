import { useContext } from "react"
import CrudRecoleccionContext from "../../context/CrudRecoleccionContext"




export const useCrudRecoleccion =()=>{
    const {clientes,entrega,entregas,envia,recoleccionesEntregadasNoCerradas,handleSelect,handleInicia,handleRecoleccion,handleElimina,handleUpdate,
        handleLimpiarEntrega, handleRecoleccionesEntregadasNoCerradas,handleSetRecoleccionesEntregadas,
        onChange,onSelect}=useContext(CrudRecoleccionContext)

    return{
        clientes,
        entrega,
        entregas,
        envia,
        recoleccionesEntregadasNoCerradas,
        handleSelect,
        handleInicia,
        handleElimina,
        handleUpdate,
        handleRecoleccion,
        handleLimpiarEntrega,
        handleRecoleccionesEntregadasNoCerradas,
        handleSetRecoleccionesEntregadas,
        onChange,
        onSelect
  
    }
}

