import './select.css'
import Select, { SingleValue } from 'react-select'

import { ICliente } from '../../interfaces/ICliente'


interface props{
  clientes:ICliente[]
  handleSelect: (label?:string,value?:number)=>void
}
const SelectSearch = ({clientes,handleSelect}:props) => {
  



  return (
    <>
     <div className="select-box">
      <label>Cliente que Envia el Producto</label>
      <Select
        options={clientes.map(c=>({label:c.codigoCliente+'-'+c.nombre+' '+ c.apellido+' - '+c.direcciones[0].direccionCompleta ,value:c.id}))}
        onChange={(e)=>{handleSelect(e?.label,e?.value)}}
      />


     </div>
    </>
  )
}

export default SelectSearch
