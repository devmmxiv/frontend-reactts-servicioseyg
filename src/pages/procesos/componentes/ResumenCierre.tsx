import React, { useState } from 'react'
import { ESTATUSRECOLECCION, IRecoleccion, IRecoleccionResumenCierre } from '../../interfaces/IRecoleccionEntrega'
import ConfirmDialog from '../../shared/confirmDialog/ConfirmDialog'

import { api_createCierre } from '../../api/api_cierre/api_cierre'
import { api_getRecoleccioneToCierre} from '../../api/api_recoleccion/api_recoleccionentrega'
import Alert from '../../shared/Alert'
import DetalleRecoleccionCierre from './DetalleRecoleccionCierre'
import { ICierre } from '../../interfaces/ICierre'
interface props {
    onRefresh:()=>void
    resumen: IRecoleccionResumenCierre[]
    recolecciones: IRecoleccion[]
    handlerCierre:()=>void
    onChangeCerrada:(id:number,isCerrada:boolean)=>void
}
const ResumenCierre = ({ resumen, onRefresh,onChangeCerrada,recolecciones,handlerCierre

}: props) =>
{

    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState('')
    const [clase, setClase] = useState('')

    const onclick=()=>{
        
    }

   
     
      const mostrarAlert = (mensaje: string, clase: string) => {
        setShow(true)
        setMensaje(mensaje)
        setClase(clase)
      }

    const dateFormatter = () => {
        const date = new Date();
        const formattedDateTime = date.toLocaleString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });


        return formattedDateTime;

    }
 
      
    const toggle = () => {
        setShow(false)
      }
  
    return (
        <>
            <div className="card m-1" style={{ width: '25rem' }}>
            <Alert show={show} mensaje={mensaje} clase={clase} toogle={toggle}></Alert>
                <div className="card-body p-0">
                    <div className="pane py-2 px-3 border-bottom">
                        <div>
                            <h2 className="card-title mb-3 mt-0 lead">Resumen de Cierre</h2>
                            <p className="text-muted">
                                Informacion de recolecciones que estan en estado <strong>'ENTREGADA' y 'NO RECIBIDA'</strong>
                            </p>
                        </div>
                    </div>
                    <div className="pane py-2 px-3 border-bottom">

                        {resumen.length > 0 ? (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th > Estado</th>
                                            <th>Cantidad</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resumen.map((x, i) => {
                                            return (
                                                <tr key={i + 1}>
                                                    <td>{i + 1}</td>
                                                    <td>{x.estado}</td>
                                                    <td>{x.cantidad}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>  <button className="btn btn-flat btn-sm btn-outline-danger ms-auto m-1"
                                            data-bs-toggle="modal" data-bs-target="#modalDetalleCierre"
                                            onClick={onclick}
                                            >
                                                Ver Detalle
                                            </button></td>
                                            <td></td>
                                            
                                        </tr>
                                    </tfoot>
                                </table>



                            </div>
                        ) : 'NO HAY RECOLECCIONES PARA CIERRE'}



                    </div>
                    <div className="pane py-2 px-3">
                        <div>

                            <p className="text-muted">{dateFormatter()}</p>
                        </div>
                    </div>
                </div>
            </div>
          
            <DetalleRecoleccionCierre recolecciones={recolecciones} 
            onChangeCerrada={onChangeCerrada} handlerConfirmacion={handlerCierre} 
           />
        </>
    )
}

export default ResumenCierre
