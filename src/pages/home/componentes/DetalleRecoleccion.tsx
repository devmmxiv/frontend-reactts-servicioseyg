import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { IRecoleccion, TIPOPAGO } from "../../interfaces/IRecoleccionEntrega"
import ConfirmDialog from "../../shared/confirmDialog/ConfirmDialog"

interface props {
    recoleccion: IRecoleccion
    updateRecoleccion: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeTotal: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void


}

const DetalleRecoleccion = ({ recoleccion, updateRecoleccion, onChange, onSelect,onChangeTotal }: props) => {


    const { municipios } = useAuth()
    const handlerConfirmacion = () => {
  
        updateRecoleccion()
    }


    return (
        <>

            <div className="modal fade" id="modalUpdateRecoleccion" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Actualizar datos de Recoleccion
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">

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
                                <span className="input-group-text"><i className="bi bi-currency-dollar p-1"></i>Monto a Cobrar Q.</span>
                                <input type="number" className="form-control" aria-describedby="emailHelp"
                                    value={recoleccion.montoCobrar}
                                    name='montoCobrar'
                                    required
                                    onChange={(e) => onChangeTotal(e)}
                                />
                            </div>
                            <div className="input-group mb-3" >
                                <span className="input-group-text"><i className="bi bi-currency-dollar p-1"></i>Costo Envio Q.</span>
                                <input type="number" className="form-control" aria-describedby="emailHelp"
                                    value={recoleccion.costoEnvio}
                                    name='costoEnvio'
                                    required
                                    onChange={(e) => onChangeTotal(e)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='btnCerrarModalCliente' className="btn btn-secondary"
                                data-bs-dismiss="modal"
                         
                            >Cerrar</button>
                            <button type="button" className="btn btn-primary"
                                   
                                data-bs-toggle="modal"
                                data-bs-target="#modalUpdateConfirmacion"    
                            >Grabar </button>
                        </div>
                    </div>
                </div>
            </div>

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
              <button type="button" className="btn btn-success" onClick={handlerConfirmacion}  data-bs-dismiss="modal">SI</button>
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
