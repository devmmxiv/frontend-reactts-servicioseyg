import React, { useEffect, useState } from 'react'
import { useEmpleados } from '../hooks/useEmpleados'
import { useCrudRecoleccion } from '../hooks/useCrudRecoleccion'
import { useMunicipios } from '../hooks/useMunicipios'
import { TIPOPAGO } from '../interfaces/IRecoleccionEntrega'
import Alert from '../shared/Alert'


const ModalRecoleccion = () => {
    
    const { mensajeros } = useEmpleados()
    const { municipios } = useMunicipios()
    const { envia, entrega: recoleccion, onChange, handleRecoleccion, onSelect } = useCrudRecoleccion()
    const [showAlert, setShowAlert] = useState(false)
    const [mensajeAlerta, setMensajeAlerta] = useState('')


    const toogleAlerta = () => {
        setShowAlert(false);
    }

    /**funciones */
    const onSave = () => {
      
       /* if (recoleccion.nombreRecibe.trim() === '' || recoleccion.apellidoRecibe.trim() === '' || recoleccion.telefonoRecibe.trim() === '') {
            setMensajeAlerta('No puede dejar campos vacios, por favor revise')
            setShowAlert(true);
            return
        }
        if (recoleccion.direccionEntrega.length == 0) {
            setMensajeAlerta('Debe ingresar al menos una direccion')
            setShowAlert(true);
            return
        }
        if (recoleccion.municipioRecibe.id == 0) {
            setMensajeAlerta('Debe seleccionar un municipio')
            setShowAlert(true);
            return
        }
        if (recoleccion.empleadoAsignado.id == 0) {
            setMensajeAlerta('Debe de seleccionar un Mensajero')
            setShowAlert(true);
            return
        }
        // handleRecoleccion(recoleccion)
        setShowAlert(false);*/
        
       

    }
    const onClose=()=>{

        setShowAlert(false);
    }



    return (

        <>
       
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className='modal fade'

                         id="modalRecoleccion" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">

                                        {recoleccion.id < 1 ? (
                                            <p className="text-center h4 mt-2">Ingreso datos de Entrega para los envios de <strong>{envia.nombre} {envia.apellido}</strong></p>
                                        ) : (<p className="text-center h4 mt-2">Modificacion de datos de entrega del cliente <strong>{envia.nombre} {envia.apellido}</strong></p>)}





                                    </div>
                                    <div className="modal-body">
                                        <Alert show={showAlert} toogle={toogleAlerta} mensaje={mensajeAlerta} clase={"alert alert-danger alert-dismissible fade show"}></Alert>
                                        <div className="input-group mb-3">

                                            <span className="input-group-text bi"><i className="bi bi-person-add p-1"></i>Nombre </span>
                                            <input type="text" id="nombreRecibe" aria-label="name"
                                                value={recoleccion.nombreRecibe}
                                                name='nombreRecibe'
                                                className="form-control"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>
                                        <div className="input-group mb-3">

                                            <span className="input-group-text bi"><i className="bi bi-person-add p-1"></i>Apellido</span>
                                            <input type="text" id="apellidoRecibe" aria-label="name"
                                                value={recoleccion.apellidoRecibe}
                                                name='apellidoRecibe'
                                                className="form-control"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>
                                        <div className="input-group mb-3" >
                                            <span className="input-group-text">Telefonos</span>
                                            <input type="text" className="form-control" id="telefonoRecibe" aria-describedby="emailHelp"
                                                value={recoleccion.telefonoRecibe}
                                                name='telefonoRecibe'
                                                onChange={(e) => onChange(e)}
                                                required
                                            />

                                        </div>
                                        <div className="input-group mb-3">

                                            <span className="input-group-text bi"><i className="bi bi-signpost p-1"></i>Direccion</span>
                                            <input type="text" id="direccionEntrega" aria-label="name"
                                                value={recoleccion.direccionEntrega}
                                                name='direccionEntrega'
                                                className="form-control"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><i className="bi bi-signpost p-1"></i>Zona</span>
                                            <input type="number" aria-label="address"
                                                value={recoleccion.zonaEntrega}
                                                name='zonaEntrega'
                                                className="form-control"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>
                                        <div className="input-group mb-3" >
                                            <span className="input-group-text bi"><i className="bi bi-building p-1"></i>Municipio</span>
                                            <select className="form-select" name='municipioRecibe'
                                                onChange={(e) => onSelect(e)}
                                                value={recoleccion.municipioRecibe.id}
                                                required

                                            >
                                                <option value='0' selected disabled>Seleccione un Municipio</option>
                                                {municipios.map((x, i) => (
                                                    <option value={x.id} key={x.id}>{x.nombre}</option>
                                                ))}


                                            </select>

                                        </div>

                                        <div className="input-group mb-3" >
                                            <span className="input-group-text"><i className="bi bi-currency-dollar p-1"></i>Costo Envio Q.</span>
                                            <input type="number" className="form-control" aria-describedby="emailHelp"
                                                value={recoleccion.precioEnvio}
                                                name='precioEnvio'
                                                required
                                                onChange={(e) => onChange(e)}

                                            />

                                        </div>
                                        <div className="input-group mb-3" >
                                            <span className="input-group-text"><i className="bi bi-cash-coin p-1"></i>Forma de Pago</span>
                                            <select className="form-select" aria-label="Default select example" name='tipoPago'
                                                onChange={(e) => onSelect(e)}
                                                value={recoleccion.tipoPago}

                                            >

                                                <option value={TIPOPAGO.EFECTIVO}>Efectivo</option>
                                                <option value={TIPOPAGO.TRANSFERENCIA}>Transferencia</option>
                                                <option value={TIPOPAGO.TARJETA}>Tarjeta Credito/Debito</option>
                                                <option value={TIPOPAGO.YAPAGADO}>Ya Pagado</option>
                                            </select>

                                        </div>
                                        <div className="input-group mb-3" >
                                            <span className="input-group-text"><i className="bi bi-currency-dollar p-1"></i>Total a Cobrar Q.</span>
                                            <input type="number" className="form-control" aria-describedby="emailHelp"
                                                value={recoleccion.totalCobrar}
                                                name='totalCobrar'
                                                required
                                                onChange={(e) => onChange(e)}

                                            />

                                        </div>

                                        <div className="input-group mb-3">

                                            <span className="input-group-text bi"><i className="bi bi-person-add p-1"></i>Mensajero Asignado</span>


                                            <select className="form-select" aria-label="Default select example" name='empleadoAsignado'
                                                onChange={(e) => onSelect(e)}
                                                value={recoleccion.empleadoAsignado.id}
                                            >
                                                <option value='0' selected disabled>Seleccione un Mensajero</option>
                                                {mensajeros.map((e) => {
                                                    return (
                                                        <option key={e.id} value={e.id}>{e.nombre + ' ' + e.apellido}</option>
                                                    )
                                                })}


                                            </select>

                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                      
                                        <button type="button" id='btnCerrarModalCliente' className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                                onClick={()=>onClose()}
                                        >Cerrar</button>
                                        {recoleccion.id < 1 ? (
                                            <button type="button" className="btn btn-primary"
                                           
                                                onClick={() => onSave()}
                                            >Guardar</button>
                                        ) : (
                                            <button type="button" className="btn btn-primary"

                                            data-bs-target='#modalConfirmaciontest' 
              
                                            data-bs-toggle="modal"
       
                                          
                                            >Actualizar</button>
                                        )

                                        }

                                    </div>

                                </div>

                            </div>

                        </div>
            
                        <div className="modal fade" id="modalConfirmaciontest" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Pregunta de Confirmacion</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <p id='p1'>{recoleccion.id < 1 ? ('Seguro desea Guardar el registro') : 'Seguro desea Actualizar el registro'}</p>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" 
                                        data-bs-dismiss="modal"
                                       
                                            onClick={() => handleRecoleccion(recoleccion)}
                                        >SI</button>
                                        <button type="button"
                                            className="btn btn-danger"
                                            data-bs-target='#modalRecoleccion'

                                            data-bs-toggle="modal">NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        
        </>

    )

}

export default ModalRecoleccion
