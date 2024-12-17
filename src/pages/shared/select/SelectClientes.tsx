import './select.css'
import Select, { SingleValue } from 'react-select'

import { ICliente } from '../../interfaces/ICliente'



interface props{
  clientes:ICliente[]
  handleSelect: (label?:string,value?:number)=>void
}

const SelectClientes = ({clientes,handleSelect}:props) => {


  return (
    <>
     <div className="select-box">
      <label>Seleccione un Cliente para Cierre</label>
      <Select
        
        options={
                 clientes.map(c=>({label:c.codigoCliente+'-'+c.nombre+' '+ c.apellido ,value:c.id}))
                 }
        onChange={(e)=>{handleSelect(e?.label,e?.value)}}
      />


     </div>
    </>
  )
}

export default SelectClientes