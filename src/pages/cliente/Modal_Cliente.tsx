import React, { FC, useState } from 'react'

import { ICliente } from '../interfaces/ICliente'

import ComponenteDireccion from './direccion/MainDirecciones'
import { IDireccion } from '../interfaces/IDireccion'
import MainCuentas from './cuenta_bancaria/MainCuentas'
import { ICuentaBancaria } from '../interfaces/ICuentaBancaria'
import MainDirecciones from './direccion/MainDirecciones'
import Alert from '../shared/Alert'



interface props {

    cliente: ICliente,
    update: Boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ManejadorCuenta: (cuenta: ICuentaBancaria, accion: number) => void
    ManejadorDirecciones: (direccion: IDireccion, accion: number) => void
    onSaveChanges: () => void
}

const ModalCliente: FC<props> = ({ cliente, update, onChange, ManejadorDirecciones, ManejadorCuenta, onSaveChanges}: props): JSX.Element => {
    const [showAlert, setShowAlert] = useState(false)
    const [mensajeAlerta, setMensajeAlerta] = useState('')

    const toogleAlerta = () => {
        setShowAlert(false);
    }

    
    /**funciones */
    const onSave = () => {
        if(cliente.nombre.trim()==='' || cliente.apellido.trim()==='' || cliente.telefono.trim()===''){
            setMensajeAlerta('No puede dejar campos vacios, por favor revise')
            setShowAlert(true);
            return
        }
        onSaveChanges()

    }

    return (
        <>

            <div>

                {/* Modal */}
                
                <div className= "modal fade"  id="clienteModal"  tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-xl">
                  
                        <div className="modal-content">
                    
                            <div className="modal-header">
                   
                                <h1 className="modal-title fs-5" id="exampleModalLabel">

                                    {!update ? 'Llenar los datos de un nuevo Cliente' : 'Modificar los datos del cliente ' + cliente.codigoCliente}
                                </h1>
                                <button type="button"   className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div>

                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="datospersonales" data-bs-toggle="tab" href="#datospersonales_tab" role="tab" aria-controls="simple-tabpanel-0" aria-selected="true">Datos Personales</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="direccion" data-bs-toggle="tab" href="#direccion_tab" role="tab" aria-controls="simple-tabpanel-1" aria-selected="false">Direccion</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="datosbancarios" data-bs-toggle="tab" href="#datosbancarios_tab" role="tab" aria-controls="simple-tabpanel-2" aria-selected="false">Cuenta Bancaria</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-5" id="tab-content">
                       
                                        <div className="tab-pane active" id="datospersonales_tab" role="tabpanel" aria-labelledby="simple-tab-0">
                                            <div className="card">
                                                <div className="card-header">
                                       
                                                    Datos Personales del Cliente
                                                    {update && (<> Codigo cliente {cliente.codigoCliente}</>)}

                                                </div>
                                                <Alert show={showAlert} toogle={toogleAlerta} mensaje={mensajeAlerta} clase={"alert alert-danger alert-dismissible fade show" }></Alert>
                                  
                                                <div className="card-body">
                                            
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Nombre</span>
                                                        <input type="text" id="firstname" aria-label="First name"
                                                            value={cliente.nombre}
                                                            name='nombre'
                                                            className="form-control"
                                                            onChange={(e) => onChange(e)}
                                                        />


                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Apellido</span>
                                                        <input type="text" aria-label="Last name"
                                                            value={cliente.apellido}
                                                            onChange={(e) => onChange(e)}
                                                            name='apellido' className="form-control" />

                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Telefono</span>
                                                        <input type="text" aria-label="phone"
                                                            value={cliente.telefono}
                                                            onChange={(e) => onChange(e)}
                                                            name='telefono' className="form-control" />

                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text ">Pagina Web</span>
                                                        <input type="text" aria-label="pagina"
                                                            value={cliente.nombrePagina}
                                                            onChange={(e) => onChange(e)}
                                                            name='nombrePagina' className="form-control" />

                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                        <div className="tab-pane" id="direccion_tab" role="tabpanel" aria-labelledby="simple-tab-1">
                                            <div className="card">
                                                <MainDirecciones direcciones={cliente.direcciones} ManejadorDirecciones={ManejadorDirecciones}
                                                > </MainDirecciones>

                                            </div>
                                        </div>
                                        <div className="tab-pane" id="datosbancarios_tab" role="tabpanel" aria-labelledby="simple-tab-2">
                                            <div className="card">
                                                <MainCuentas cuentas={cliente.cuentas} ManejadorCuenta={ManejadorCuenta}></MainCuentas>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" id='btnCerrarModalCliente' className="btn btn-secondary" 
                                data-bs-dismiss="modal" 
                                onClick={()=>setShowAlert(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary"
                        
                                onClick={onSave}>{cliente.id === 0 ? 'Grabar' : 'Grabar Cambios'}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>

            </div>
        </>


    )
}

export default ModalCliente
