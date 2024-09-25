import React, { useState } from 'react'
import { ICuentaBancaria, ETipoCuentaBancaria } from '../../interfaces/ICuentaBancaria'
import Bancos from '../../shared/componente_bancos'
import Alert from '../../shared/Alert'

interface props {

  cuenta: ICuentaBancaria
  onNuevaCuenta: () => void
  onselect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  esNuevaCuenta: Boolean
  ManejadorCuenta: (cuenta: ICuentaBancaria, accion: number) => void
}
const Cuenta = ({ cuenta, onselect, onchange, onNuevaCuenta, esNuevaCuenta, ManejadorCuenta }: props) => {
  const [showAlert,setShowAlert]=useState(false)
  const [mensajeAlerta,setMensajeAlerta]=useState('')

  const onClick = () => {
    onNuevaCuenta()
  }
  const onButtonAgregarModificar = () => {
  
    if (cuenta.banco.id === 0) {
      setMensajeAlerta('Debe de Seleccionar un Banco')
     toogle()
      return
    }else if(cuenta.tipoCuenta !== ETipoCuentaBancaria.AHORRO && cuenta.tipoCuenta !== ETipoCuentaBancaria.MONETARIA ){
      setMensajeAlerta('Debe de Seleccionar un tipo de cuenta') 
      toogle()
       return
    }else if(cuenta.numeroCuenta==0){
      setMensajeAlerta('El numero de cuenta no puede se Cero') 
      toogle()
       return
    }
    ManejadorCuenta(cuenta, 1)
  }
  const toogle=()=>{
    setShowAlert(!showAlert)
  }
  return (
    <div>
      <Alert show={showAlert} toogle={toogle} mensaje={mensajeAlerta} clase="alert alert-danger alert-dismissible fade show"></Alert>
      <form >

        <div className="input-group mb-3" >
          <span className="input-group-text">Tipo Cuenta</span>
          <select className="form-select" aria-label="Default select example" name='tipoCuenta'
            onChange={(e) => onselect(e)}
            value={cuenta.tipoCuenta}>
            <option value='0' selected>Seleccione tipo de Cuenta</option>
            <option value={ETipoCuentaBancaria.MONETARIA}>Monetaria</option>
            <option value={ETipoCuentaBancaria.AHORRO}>Ahorro</option>

          </select>

        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Numero Cuenta Bancaria</span>
          <input type="text" aria-label="First name"
            value={
              cuenta.numeroCuenta}
            onChange={(e) => (onchange(e))}
            name='numeroCuenta' className="form-control" />

        </div>

        <div className="input-group mb-3">
          <Bancos id={cuenta.banco.id} onselect={onselect}
          ></Bancos>


        </div>
        <button className='btn btn-success m-1'
          type='button'
          onClick={() => onButtonAgregarModificar()}
        >{esNuevaCuenta ? 'Agregar Cuenta' : 'Modificar Cuenta'} </button>
        <button className='btn btn-warning' type='button' onClick={() => onClick()}>Nueva Cuenta </button>
      </form>

    </div>
  )
}

export default Cuenta