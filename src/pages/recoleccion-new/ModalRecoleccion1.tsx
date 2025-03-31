import React, { useEffect, useState } from 'react'
import { useEmpleados } from '../hooks/useEmpleados'
import { useCrudRecoleccion } from '../hooks/useCrudRecoleccion'
import { useMunicipios } from '../hooks/useMunicipios'
import { ESTATUSRECOLECCION, TIPOPAGO } from '../interfaces/IRecoleccionEntrega'
import Alert from '../shared/Alert'
import './css/custom_modal.css'
import { Button, Modal } from 'react-bootstrap'

interface props {
    hideModal: () => void
    show: boolean
}
const ModalRecoleccion1 = ({ show, hideModal }: props) => {

    const { mensajeros } = useEmpleados()
    const { municipios } = useMunicipios()
    const { envia, entrega: recoleccion, onChange, handleRecoleccion, handleLimpiarEntrega, onSelect } = useCrudRecoleccion()
    const [showAlert, setShowAlert] = useState(false)
    const [mensajeAlerta, setMensajeAlerta] = useState('')


    const toogleAlerta = () => {
        setShowAlert(false);
    }
    const cerrarModal = () => {
        setShowAlert(false);
        hideModal();
        handleLimpiarEntrega();
    }

    /**funciones */
    const onSave = () => {
        if (recoleccion.nombreRecibe.trim() === '' || recoleccion.apellidoRecibe.trim() === '' || recoleccion.telefonoRecibe.trim() === '') {
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
        handleRecoleccion(recoleccion)
        handleLimpiarEntrega()
        hideModal();



    }
    const onClose = () => {

        setShowAlert(false);
    }



    return (

        <>

            <div className="container mt-4">
             



                    <Modal show={show} onHide={cerrarModal} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {recoleccion.id < 1 ? (
                                    <p className="text-center h4 mt-2">Ingreso datos de Entrega para los envios de <strong>{envia.nombre} {envia.apellido}</strong></p>
                                ) : (<p className="text-center h4 mt-2">Modificacion de datos de entrega del cliente <strong>{envia.nombre} {envia.apellido}</strong></p>)}



                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

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
                            {recoleccion.id > 0.001 && (
                                <div className="input-group mb-3">

                                    <span className="input-group-text bi"><i className="bi bi-person-add p-1"></i>Estado</span>


                                    <select className="form-select" aria-label="Default select example" name='estado'
                                        onChange={(e) => onSelect(e)}
                                        value={recoleccion.estado}
                                    >

                                        <option value={ESTATUSRECOLECCION.CREADA}>{ESTATUSRECOLECCION.CREADA}</option>
                                        <option value={ESTATUSRECOLECCION.RECOLECTADA}>{ESTATUSRECOLECCION.RECOLECTADA}</option>
                                        <option value={ESTATUSRECOLECCION.ENRUTA}>{ESTATUSRECOLECCION.ENRUTA}</option>
                                        <option value={ESTATUSRECOLECCION.ENTREGADA}>{ESTATUSRECOLECCION.ENTREGADA}</option>
                                        <option value={ESTATUSRECOLECCION.NORECIBIDA}>{ESTATUSRECOLECCION.NORECIBIDA}</option>

                                    </select>

                                </div>

                            )}
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

                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" id='btnCerrarModalCliente' className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => cerrarModal()}
                            >Cerrar</button>
                            {recoleccion.id < 1 ? (
                                <button type="button" className="btn btn-primary"

                                    onClick={() => onSave()}
                                >Guardar</button>
                            ) : (
                                <button type="button" className="btn btn-primary"


                                    onClick={() => onSave()}

                                >Actualizar</button>
                            )

                            }

                        </Modal.Footer>
                    </Modal>
                </div>





       


        </>

    )

}

export default ModalRecoleccion1
