import './select.css'
import Select, { SingleValue } from 'react-select'

import {IEmpleado} from '../../interfaces/IEmpleado';


interface props{
  empleados:IEmpleado[]
  handleSelect: (label?:string,value?:number)=>void
}
const SelectEmpleados = ({empleados,handleSelect}:props) => {
  



  return (
    <>
     <div className="select-box">
      <label>Seleccione Empleado</label>
      <Select
        
        options={empleados.map(c=>({label:c.codigoEmpleado+'-'+c.nombre+' '+ c.apellido ,value:c.id}))}
        onChange={(e)=>{handleSelect(e?.label,e?.value)}}
      />


     </div>
    </>
  )
}

export default SelectEmpleados