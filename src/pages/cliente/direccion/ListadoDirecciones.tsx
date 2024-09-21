import React from 'react'
import { IDireccion, ETipoDireccion } from '../../interfaces/IDireccion'
import Departamento from '../../shared/Departamento'
import ComponenteFrmDireccion from './MainDirecciones';
import { ICuentaBancaria } from '../../interfaces/ICuentaBancaria';
interface props {
  direcciones: IDireccion[];
  onUpdateDireccion: (direccion:IDireccion) => void
ManejadorDirecciones:(direccion:IDireccion,accion:number)=>void
}
const ListadoDirecciones = ({ direcciones,onUpdateDireccion ,ManejadorDirecciones}: props) => {

  const onclick=(direccion:IDireccion)=>{
    onUpdateDireccion(direccion);
  }
  const onClickEliminar=(direccion:IDireccion)=>{
    ManejadorDirecciones(direccion,2)
  }

  return (
    <>
            
  
         
                <table className="table mt-3">
                  <thead>
                    <tr >
                      <th scope="col">#</th>
                      <th scope="col">Tipo Direccion</th>
                      <th scope="col">Direccion Completa</th>
                      <th scope="col">Zona</th>
                      <th scope="col">Municipio</th>
                      <th scope="col">Operaciones</th>

                    </tr>
                  </thead>
                  <tbody>
                    {(direcciones !== null && direcciones.length > 0) ? ( 
                      <>
                        {direcciones.map((m,i) => { return(
                          <tr  key = {m.id}>
                            <th scope="row">{i+1}</th>
                            <td>{m.tipoDireccion}</td>
                            <td>{m.direccionCompleta}</td>
                            <td>{m.zona}</td>
                          
                            <td>{m.municipio.nombre}
                            </td>
                            <td>
                            <button
                            className="btn btn-warning"
                            style={{marginRight:5}}
                            //onClick={()=>onUpdateDireccion(m)}
                            onClick={()=>onclick(m)}
                          >
                          <i className="bi bi-pencil-square"></i>
                          </button>
                
                          <button className="btn btn-danger"   
                                      onClick={()=>onClickEliminar(m)}
                          >
                          <i className="bi bi-trash3"></i>
                          
                          </button>
                            </td>
                          </tr>)
                        })}

                      </>
                    ) : ''



                    }

                 
                  </tbody>
                </table>
         

    </>
  )
}

export default ListadoDirecciones