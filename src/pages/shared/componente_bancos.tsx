import React, { useEffect, useState } from 'react'
import {getBancos} from '../api/api_banco/apibanco'
import { IBanco } from '../interfaces/IBanco';
interface props {

    id: number;
    onselect:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
  
  }
const Bancos = ({id,onselect}:props) => {
    const [bancos,setBancos]=useState<IBanco[]>([])
    const listaBancos=async ()=>{
        const data= await getBancos();
        setBancos(data)
    }
    useEffect(()=>{
        listaBancos();

    },[])
  return (
    <>

    <div className="input-group mb-3" >
      <span className="input-group-text">Banco</span>
      <select className="form-select" aria-label="Default select example" name='banco'
      onChange={(e)=>onselect(e)}
      value={id}>
        <option value='0' selected>Seleccione un Banco</option>
        {bancos.map((m) => {

          return <option value={m.id} key={m.id}>{m.nombre}</option>
        })}


      </select>

    </div>
  </>
  )
}

export default Bancos