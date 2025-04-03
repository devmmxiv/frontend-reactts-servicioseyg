import { useState } from "react"
import { useMunicipios } from "../../hooks/useMunicipios"
import { ESTATUSRECOLECCION, IRecoleccion, TIPOPAGO } from "../../interfaces/IRecoleccionEntrega"

import { IEmpleado } from "../../interfaces/IEmpleado";
import { Modal } from "react-bootstrap";

import { useAsyncError } from "react-router-dom";
import Alert from "../../shared/Alert";
import ModalConfirm from "../../shared/ModalConfirm";

interface props {
    hideModal: () => void;
    show: boolean;
    recoleccion: IRecoleccion;
    disableInputoCostoPRoducto: boolean;
    updateRecoleccion: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTotal: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangePagaEnvio: (e: boolean) => void;
    empleados: IEmpleado[]
}

const DetalleRecoleccion = ({ hideModal, show, recoleccion, updateRecoleccion, onChange, onSelect, onChangeTotal, onChangePagaEnvio, disableInputoCostoPRoducto, empleados }: props) => {

    const [showAlert, setShowAlert] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    const [showConfirmacion,setShowConfirmacion]=useState(false);


    const { municipios } = useMunicipios();
 
    const handlerConfirmacion = () => {
       
        if (recoleccion.empleadoAsignado == null || recoleccion.empleadoAsignado.id==undefined) {
            setMensajeAlerta('Debe de seleccionar un Mensajero')
            setShowAlert(true);
            return

        } 
        setShowConfirmacion(true);
    }
    const handlerConfirmacionModal = () => {
      updateRecoleccion();
    
        hideModal()
        setShowConfirmacion(false)
    }

    const toogleAlerta = () => {
        setShowAlert(!showAlert)
    }
    const cerrarModal = () => {
       hideModal();
       setShowAlert(false);
    }
    const hideModalConfirmacion = () => {

        setShowConfirmacion(false);
     }
    return (
        <>

            <Modal show={show} onHide={cerrarModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {recoleccion.id < 1 ? (
                            <p className="text-center h4 mt-2">     Actualizar datos de Recoleccion del cliente </p>
                        ) : (<p className="text-center h4 mt-2"> Actualizar datos de Recoleccion <strong>{recoleccion.clienteEnvia.nombre} {recoleccion.clienteEnvia.apellido}</strong></p>)}
                    </Modal.Title>
                    <ModalConfirm show={showConfirmacion} handleConfiracion={handlerConfirmacionModal} hideModal={hideModalConfirmacion}></ModalConfirm>
                </Modal.Header>
                <Modal.Body>
                    <Alert show={showAlert} toogle={toogleAlerta} mensaje={mensajeAlerta} clase={"alert alert-danger alert-dismissible fade show"}></Alert>
                    <div className="input-group mb-3">

                        <span className="input-group-text bi"><i className="bi bi-person-add p-1"></i>   Nombre Recibe</span>
                        <input type="text" id="nombreRecibe" aria-label="name"
                            value={recoleccion.nombreRecibe}
                            name='nombreRecibe'
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />

                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-person-add p-1"></i>Apellido Recibe</span>
                        <input type="text" id="apellidoRecibe" aria-label="name"
                            value={recoleccion.apellidoRecibe}
                            name='apellidoRecibe'
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-signpost p-1"></i>Direccion</span>
                        <input type="text" id="direccionEntrega" aria-label="address"
                            value={recoleccion.direccionEntrega}
                            name='direccionEntrega'
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-signpost p-1"></i>Zona</span>
                        <input type="number" id="zona" aria-label="address"
                            value={recoleccion.zonaEntrega}
                            name='zonaEntrega'
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="input-group mb-3" >
                        <span className="input-group-text"><i className="bi bi-building p-1"></i>
                            Municipio</span>
                        <select className="form-select" name='municipioRecibe'
                            onChange={(e) => onSelect(e)}
                            required
                            value={recoleccion.municipioRecibe.id}
                        >
                            <option value='0' selected disabled>Seleccione un Municipio</option>
                            {municipios.map((x) => (
                                <option value={x.id} key={x.id}>{x.nombre}</option>
                            ))}


                        </select>

                    </div>
                    <div className="input-group mb-3" >
                        <span className="input-group-text"><i className="bi bi-cash-coin p-1"></i>Forma de Pago</span>
                        <select className="form-select" aria-label="Default select example" name='tipoPago'
                            onChange={(e) => onSelect(e)
                            }
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

                            disabled={disableInputoCostoPRoducto}
                            onChange={(e) => onChangeTotal(e)}
                        //  onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="input-group mb-3" >
                        <span className="input-group-text"><i className="bi bi-currency-dollar p-1"></i>Precio Envio Q.</span>
                        <input type="number" className="form-control" aria-describedby="emailHelp"
                            value={recoleccion.precioEnvio}
                            name='precioEnvio'


                            // onChange={(e) => onChangeTotal(e)}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="input-group mb-3">

                        <span className="input-group-text bi"><i className="bi bi-person-add p-1"></i>Empleado Asignado</span>


                        <select className="form-select" aria-label="Default select example" name='empleadoAsignado'
                            onChange={(e) => onSelect(e)}
                            value={recoleccion.empleadoAsignado == null ? 0 : recoleccion.empleadoAsignado.id}
                        >
                            { recoleccion.empleadoAsignado == null &&
                                <option key='0' value='0'>Seleccione Empleado </option>
                            }

                            {empleados.map((e) => {

                                return (

                                    <option key={e.id} value={e.id}>{e.nombre + ' ' + e.apellido}</option>
                                )

                            })}


                        </select>

                    </div>
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



                
            </Modal.Body>
             <Modal.Footer>
                                        <button type="button" id='btnCerrarModalCliente' className="btn btn-secondary"
                                     
                                            onClick={() => cerrarModal()}
                                        >Cerrar</button>
                                        {recoleccion.id < 1 ? (
                                            <button type="button" className="btn btn-primary"
            
                                                onClick={() => handlerConfirmacion()}
                                            >Guardar</button>
                                        ) : (
                                            <button type="button" className="btn btn-primary"
            
            
                                                onClick={() => handlerConfirmacion()}
            
                                            >Actualizar</button>
                                        )
            
                                        }
            
                                    </Modal.Footer>
        </Modal >
                                        


                <div className="modal fade" id="modalUpdateConfirmacion" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Pregunta de Confirmacion</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <p id='p1'>Seguro desea Actualizar el Registro</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handlerConfirmacion} data-bs-dismiss="modal">SI</button>
                                <button type="button"
                                    className="btn btn-danger"
                                    data-bs-target='#modalUpdateRecoleccion'

                                    data-bs-toggle="modal">NO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default DetalleRecoleccion
