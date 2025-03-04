import React, { useState } from 'react'
import { ICliente } from '../interfaces/ICliente'
import { useCliente } from '../hooks/useCliente'

import ConfirmDialogModal from '../shared/confirmDialog/ConfirmDialogModal'
import { Modal } from 'react-bootstrap'
interface props{
    clientes:ICliente[]

}
const TableCliente = ({clientes}:props) => {
    const {handleCliente,handlerEliminaCliente}=useCliente()
    const [id,setId]=useState(0);
    const [mensaje,setMensaje]=useState("")
    const [show,setShow]=useState(false);
    const eliminarCliente=(id:number)=>{
     const buttonElement = document.activeElement as HTMLElement; 
      buttonElement.blur();
   
      setMensaje("Seguro desea Eliminar el Cliente");
      setId(id)
    }
    const cerrarModal=()=>{
      setShow(false);
    }
    const handlerConfirmacion=()=>{
      
      handlerEliminaCliente(id);
      setId(0);
    }
  return (
    <div>
           <table className="table  table-striped table-hover caption-top">
                  <caption>Listado de Clientes</caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Codigo de Cliente</th>
                      <th scope="col">Nombre </th>
                      <th scope="col">Apellido </th>
                      <th scope="col">Pagina </th>
                      <th scope="col">Telefono </th>
                      <th scope="col">Datos Cuenta Bancaria </th>
                      <th scope="col">Direccion - Municipio</th>

                      <th scope="col">Operaciones</th>

                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((m, i) => {
                      return (
                        <tr key={m.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{m.codigoCliente}</td>
                          <td>{m.nombre}</td>
                          <td>{m.apellido}</td>
                          <td>{m.nombrePagina}</td>

                          <td>{m.telefono}
                          </td>
                          <td>{
                            m.cuentas.map((c, i) => {
                              return (
                                <tr key={c.id}>


                                  <td >{c.numeroCuenta}</td>
                                  <td>-</td>
                                  <td>{c.tipoCuenta}</td>
                                  <td>-</td>
                                  <td>{c.banco.nombre}</td>
                                </tr>

                              )
                            })

                          }

                          </td>
                          <td>{
                            m.direcciones.map((c, i) => {
                              return (
                                <tr key={c.id}>


                                  <td >{c.direccionCompleta}</td>
                                  <td>-</td>
                                  <td>{c.municipio.nombre}</td>

                                </tr>

                              )
                            })

                          }

                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              style={{ marginRight: 5 }}

                              data-bs-toggle="modal" data-bs-target="#clienteModal"
                              onClick={(e) => handleCliente(m)}

                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>

                            <button className="btn btn-danger" aria-hidden="true"   
                              onClick={()=>eliminarCliente(m.id)}
                              data-bs-toggle="modal"
                              data-bs-target="#modalDialog"                    >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>)
                    })}






                  </tbody>
                </table>
                
                <ConfirmDialogModal mensaje={mensaje} handlerConfirmacion={handlerConfirmacion} ></ConfirmDialogModal>
    </div>
    
  )
}

export default TableCliente