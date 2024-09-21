import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { ICliente } from '../interfaces/ICliente';
interface props {
  id: number;
  onselect:(e:React.ChangeEvent<HTMLSelectElement>)=>void

}
const Departamento = ({ id,onselect }: props) => {
  const { municipios } = useAuth()

  return (
    <>

      <div className="input-group mb-3" >
        <span className="input-group-text">Municipio</span>
        <select className="form-select" aria-label="Default select example" name='s-municipio'
        onChange={(e)=>onselect(e)}
        value={id}>
          <option value='0' selected>Seleccione un Municipio</option>
          {municipios.map((m) => {

            return <option value={m.id}>{m.nombre}</option>
          })}


        </select>

      </div>
    </>
  )
}

export default Departamento
