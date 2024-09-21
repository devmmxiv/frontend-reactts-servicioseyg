import { useState } from 'react'
import { ETipoCuentaBancaria, ICuentaBancaria } from '../../interfaces/ICuentaBancaria'
import Cuenta from './Cuenta'
import ListadoCuentas from './ListadoCuentas'
import { IBanco } from '../../interfaces/IBanco'

interface props {
  cuentas: ICuentaBancaria[]
  ManejadorCuenta: (cuenta: ICuentaBancaria, accion: number) => void

}


const initCuenta = {
  id: 0,
  numeroCuenta: 0,
  tipoCuenta: ETipoCuentaBancaria.MONETARIA,
  banco: {
    id: 0,
    nombre: ''
  }
}
const MainCuentas = ({ cuentas, ManejadorCuenta }: props) => {
  const [cuenta, setCuenta] = useState<ICuentaBancaria>(initCuenta)
  const [esNuevaCuenta, setEsNuevaCuenta] = useState<Boolean>(true)
  const onselect = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if (e.target.name === 'tipoCuenta') {
      let nombre = e.target.name;

      setCuenta({ ...cuenta, [nombre]: e.target.value })

    } else {

      const id: number = Number(e.target.value)
     
      const b: IBanco = {
        id: id,
        nombre: e.target[e.target.selectedIndex].textContent?.toString()
      }
      setCuenta({ ...cuenta, banco: b })
    
    }


  }
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nombre = e.target.name;
    let value = e.target.value;

    setCuenta({ ...cuenta, [nombre]: value })
  }
  const onNuevaCuenta = () => {
    setCuenta(initCuenta)
    setEsNuevaCuenta(true);

  }
  const onUpdateCuenta = (cuenta: ICuentaBancaria) => {
    setCuenta(cuenta)
    setEsNuevaCuenta(false);
  }

  return (
    <div>
      <div className="card-header  mb-3">
        Datos Bancarios del Cliente

      </div>
      <div className="card-body">
        <Cuenta cuenta={cuenta}
          onselect={onselect}
          onchange={onchange}
          onNuevaCuenta={onNuevaCuenta}
          esNuevaCuenta={esNuevaCuenta}
          ManejadorCuenta={ManejadorCuenta}
        ></Cuenta>
        <ListadoCuentas cuentas={cuentas} onUpdateCuenta={onUpdateCuenta} ManejadorCuenta={ManejadorCuenta}></ListadoCuentas>
      </div>

    </div>
  )
}

export default MainCuentas