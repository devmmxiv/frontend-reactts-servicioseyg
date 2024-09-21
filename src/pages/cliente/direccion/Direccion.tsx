import React, { useState } from 'react'
import { IDireccion, ETipoDireccion } from '../../interfaces/IDireccion'
import Departamento from '../../shared/Departamento'
import { IMunicipio } from '../../interfaces/iMunicipio'
import Alert from '../../shared/Alert'
interface props {
  children?: React.ReactNode
  direccion: IDireccion
  actualizar: Boolean
  direcciones:IDireccion[]
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onselect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onNuevaDireccion: () => void;

  ManejadorDirecciones: (direccion: IDireccion, accion: number) => void

}
const Direccion = ({ direccion, onchange, onselect, onNuevaDireccion, actualizar, ManejadorDirecciones,direcciones}: props) => {
  const [showAlert,setShowAlert]=useState(false)
  const [mensajeAlerta,setMensajeAlerta]=useState('')
  const toogleAlerta=()=>{
    setShowAlert(false)
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
 

    onNuevaDireccion()

  }
  const onButtonAgregarModificar = () => {

    if(direccion.municipio.id===0){
      setMensajeAlerta('Debe de Seleccionar un Municipio')
      setShowAlert(true)
      return;
    }else if(direccion.tipoDireccion!==ETipoDireccion.PRINCIPAL && direccion.tipoDireccion!==ETipoDireccion.SECUNDARIA){
      setMensajeAlerta('Debe de Seleccionar un tipo de Direccion')
      setShowAlert(true)
      return; 
    }else if(direccion.direccionCompleta.trim()===''){
      setMensajeAlerta('debe de Escribir la direccion completa')
      setShowAlert(true)
      return
    }else{
 
      const d=direcciones.filter(x=>x.tipoDireccion=direccion.tipoDireccion)
      if(d.length>0){
        setMensajeAlerta(`ya hay una direccion como  ${direccion.tipoDireccion}`)
        setShowAlert(true)
        return;
      }
    }
    
    ManejadorDirecciones(direccion, 1)
  }

  return (
    <div>            
      <Alert show={showAlert} toogle={toogleAlerta} mensaje={mensajeAlerta}></Alert>

      <form >
        <div className="input-group mb-3" >
          <span className="input-group-text">Tipo Direccion</span>

          <select className="form-select" aria-label="Default select example" name='tipoDireccion'
            onChange={(e) => onselect(e)}
            value={direccion.tipoDireccion}>
            <option selected>Seleccione tipo de Direccion</option>
            <option value={ETipoDireccion.PRINCIPAL}>PRINCIPAL</option>
            <option value={ETipoDireccion.SECUNDARIA}>SECUNDARIA</option>

          </select>

        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Direccion Completa</span>
          <input type="text" aria-label="First name"
            value={
              direccion.direccionCompleta}
            onChange={(e) => (onchange(e))}
            name='direccionCompleta' className="form-control" />

        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Zona</span>
          <input type="number" aria-label="First name"
            value={
              direccion.zona}
            onChange={(e) => (onchange(e))}
            name='zona' className="form-control" />

        </div>
        <div className="input-group mb-3">
          <Departamento id={
            direccion.municipio.id}
            onselect={onselect}
          ></Departamento>


        </div>
        <button className='btn btn-success ' type='button'
          onClick={() => onButtonAgregarModificar()}
        >
          {actualizar ? 'Modificar Direccion' : 'Agregar'}
        </button>
        <button className='btn btn-warning' style={{ marginLeft: 5 }} type='button' onClick={(e) => onClick(e)}>Nueva Direccion </button>
      </form>

    </div>
  )
}

export default Direccion