import React, { useEffect, useState } from 'react'
import { ESTATUSRECOLECCION, IRecoleccion, IRecoleccionEntrega } from '../../interfaces/IRecoleccionEntrega'
import { api_getRecoleccioneToCierre } from '../../api/api_recoleccion/api_recoleccionentrega'
import * as f from '../../../utils/utilidades'
import ConfirmDialog from '../../shared/confirmDialog/ConfirmDialog'
interface props {
    recolecciones: IRecoleccion[]
    onChangeCerrada:(id:number,isCerrada:boolean)=>void
    handlerConfirmacion:()=>void

}
const DetalleRecoleccionCierre = ({ recolecciones,onChangeCerrada ,handlerConfirmacion}: props) => {
const onClick=()=>{


}


    return (
        <div >

            <div className="modal fade" id="modalDetalleCierre" data-bs-keyboard="true" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Listado de Recolecciones a Cerrar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"> Cliente Envia</th>
                                        <div className="vr"></div>
                                        <th scope="col">Persona Recibe</th>
                                        <th scope="col">Direccion Persona Recibe</th>
                                        <th scope="col">Municipio</th>
                                        <div className="vr"></div>
                                        <th scope="col">Forma de Pago</th>
                                        <th scope="col">$ Monto Cobrar</th>

                                        <th scope="col">Fecha Envio</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Cierre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recolecciones.map((m, i) => {
                                        return (
                                            <tr key={m.id}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{m.clienteEnvia.nombre + ' ' + m.clienteEnvia.apellido}</td>
                                                <div className="vr"></div>
                                                <td>{m.nombreRecibe + ' ' + m.apellidoRecibe}</td>
                                                <td>{m.direccionEntrega}</td>
                                                <td>{m.municipioRecibe.nombre}</td>
                                                <div className="vr"></div>
                                                <td>{m.tipoPago}</td>
                                                <td>{f.currencyFormatter(m.montoCobrar)}

                                                </td>

                                                <td>{f.dateFormatter(m.fechaCreacion)}

                                                </td>

                                                <td>{m.estado }
                                                </td>

                                                <td>

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" 
                                                        type="checkbox" role="switch"
                                                        name={`${m.id}`} id={`${m.id}`}
                                                        checked={m.isCerrada}
                                                        disabled={m.estado === ESTATUSRECOLECCION.RECOLECTADA ? true : false}
                                                        onChange={(e) => onChangeCerrada(m.id, m.isCerrada)}
                                                        />
                                                        <label className="form-check-label"
                                                         htmlFor={`${m.id}`}></label>
                                                    </div>
                                                </td>

                                            </tr>)
                                    })}



                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                        <button type="button" onClick={onClick} className="btn btn-success"   data-bs-toggle="modal" data-bs-target="#modalDialog">Realizar Cierre</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Salir</button>

                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDialog handlerConfirmacion={handlerConfirmacion} mensaje={"Seguro desea Realizar Cierre?Esta accion es irreversible"} idModal='modalDetalleCierre'></ConfirmDialog>
        </div>
    )
}

export default DetalleRecoleccionCierre
