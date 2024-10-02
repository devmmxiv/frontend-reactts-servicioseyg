import './select.css'
import Select, { SingleValue } from 'react-select'

import { ICliente } from '../../interfaces/ICliente'
import { ICierre } from '../../interfaces/ICierre'
import * as u from '../../../utils/utilidades'

interface props{
  cierres:ICierre[]
  handleSelect: (label?:string,value?:number)=>void
}
const SelectSearchCierres = ({cierres,handleSelect}:props) => {
  

//        

  return (
    <>
     <div className="select-box">
      <label>Listado de Cierres</label>
      <Select
   
        options={cierres.map(c=> (
          {label:'ID Cierre : '+c.id+'- Fecha Cierre : '+u.dateFormatter(c.fechaCierre!)+' Cantidad Entregas : '+ c.cantidad ,value:c.id}         
        ))}
        onChange={(e)=>{handleSelect(e?.label,e?.value)}}
      />


     </div>
    </>
  )
}

export default SelectSearchCierres
