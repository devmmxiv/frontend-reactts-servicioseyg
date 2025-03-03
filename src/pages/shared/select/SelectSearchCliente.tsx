import './select.css'
import Select, { SingleValue } from 'react-select'
import { useCrudRecoleccion } from '../../hooks/useCrudRecoleccion'

const SelectSearchCliente = () => {
  
  const {clientes,handleSelect}=useCrudRecoleccion()


  return (
    <>
     <div className="select-box">
      <label>Seleccione Cliente</label>
      <Select
        
        options={clientes.map(c=>({label:c.codigoCliente+'-'+c.nombre+' '+ c.apellido+' - '+c.direcciones[0].direccionCompleta +' - '+c.telefono ,value:c.id}))}
        onChange={(e)=>{
          handleSelect(e?.label,e?.value)
        }}
      />


     </div>
    </>
  )
}

export default SelectSearchCliente
