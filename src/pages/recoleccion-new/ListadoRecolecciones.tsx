import React, { useState } from 'react'
import { useCrudRecoleccion } from '../hooks/useCrudRecoleccion'
import { currencyFormatter, dateFormatter } from '../../utils/utilidades'
import { ESTATUSRECOLECCION, IEntrega } from '../interfaces/IRecoleccionEntrega'
import Recoleccion from '../recoleccion/Recoleccion'
import { EmpleadosProvider } from '../../context/EmpleadosContext'
import ModalRecoleccion from './ModalRecoleccion'
interface props{
  openModal: ()=>void
  entregas:IEntrega[]
  entregadas:boolean
  }
const ListadoRecolecciones = ({openModal,entregas,entregadas}:props) => {
  const [id,setId]=useState(0);
 
  const { entrega, handleElimina,handleUpdate } = useCrudRecoleccion()
  const updateRecolecicon=(entrega:IEntrega)=>{
    openModal();
    handleUpdate(entrega);

  }
  return (
    <div>
      {entregas.length > 0 && (

        <div className="flex-container">
          <div className="row">

            <div className="col">
              <p className="h3">Listado  entrega de paquetes</p>


              <div className="table">
                <table className="table table-bordered table-striped " style={{fontSize:12}}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      {entregadas&&(
               <th scope="col">Cliente Envia</th>
                      )}
                 
                      <th scope="col">Persona Recibe</th>
                      <th scope="col">Direccion</th>
                      <th scope="col">Municipio</th>
                      <th scope="col">Forma de Pago</th>
                      <th scope="col">$ Monto Cobrar</th>
                      <th scope="col">$ Precio Envio</th>
                      <th scope="col">Fecha </th>
                      <th scope="col">Estado</th>
                      <th scope="col">Mensajero</th>
                      <th scope="col">Operacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entregas && entregas.length > 0}

                    {entregas.map((m, i) => {
                      return (
                        <tr key={m.id}>
                          <th scope="row">{i + 1}</th>
                          {entregadas&&(        <td>{m.clienteEnvia.nombre + ' ' + m.clienteEnvia.apellido}</td>)}
                          <td>{m.nombreRecibe + ' ' + m.apellidoRecibe}</td>
                          <td>{m.direccionEntrega}</td>
                          <td>{m.municipioRecibe.nombre}</td>
                          <td>{m.tipoPago}</td>
                          <td>{currencyFormatter(m.totalCobrar.toString())} </td>
                          <td>{currencyFormatter(m.precioEnvio.toString())}
                          </td>
                          <td>{dateFormatter(m.fechaCreacion)}

                          </td>

                          <td>{m.estado}</td>
                          <td>{m.empleadoAsignado==null?"Mensajero no Asignado": m.empleadoAsignado.nombre+ '' +m.empleadoAsignado.apellido}</td>

                          <td>

                            <div className="row">
                              <div className="col-sm-6">      
                                <button className={`btn btn-warning`}
                            
                            onClick={() => updateRecolecicon(m)}
                           
                              >
                                <i className="bi bi-card-list" style={{ fontSize: 8 }} ></i>         
                                </button></div>
                              <div className="col-sm-6">
                                <button className={`btn btn-danger ${m.estado !== ESTATUSRECOLECCION.CREADA && 'disabled'}  `}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalUpdateConfirmacion"
                                  
                                >
                                  <i className="bi bi-trash3 " style={{ fontSize: 8 }}></i>
                                </button>
                              </div>
                            </div>
                          </td>

                        </tr>)
                    })}




                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>
      )}
      <div className="modal fade" id="modalUpdateConfirmacion" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Pregunta de Confirmacion</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p id='p1'>Seguro desea Eliminar el Registro</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                         onClick={() => handleElimina(id)}
              >SI</button>
              <button type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal">NO</button>
            </div>
          </div>
        </div>
      </div>
      {entrega.id > 0 && (
        <><EmpleadosProvider>
          <ModalRecoleccion 
          
          ></ModalRecoleccion>
        </EmpleadosProvider></>
      )}
    </div>

  )
}

export default ListadoRecolecciones
