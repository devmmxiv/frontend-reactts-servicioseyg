import React, { useState } from 'react'
import { ESTATUSRECOLECCION } from '../../interfaces/IRecoleccionEntrega'

interface props {
    estado:ESTATUSRECOLECCION
    toggle: () => void
}
const StateDialog = ({ toggle ,estado}: props) => {
    const toggleChange = () => {
      
      }
    return (
        <>
            <div className="modal fade" id="modalStatus" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Pregunta de Confirmacion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-check">
                                
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                                    
                                    defaultChecked={estado===ESTATUSRECOLECCION.CREADA?true:false}
                                    
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    {ESTATUSRECOLECCION.CREADA}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                        defaultChecked={estado===ESTATUSRECOLECCION.RECOLECTADA?true:false}/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                      {ESTATUSRECOLECCION.RECOLECTADA}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"  />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                      {ESTATUSRECOLECCION.ENRUTA}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"  />
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                      {ESTATUSRECOLECCION.NORECIBIDA}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5"  />
                                    <label className="form-check-label" htmlFor="flexRadioDefault5">
                                      {ESTATUSRECOLECCION.ENTREGADA}
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Grabar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default StateDialog
