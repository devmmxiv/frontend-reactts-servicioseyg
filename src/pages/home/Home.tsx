import React, { useEffect, useState } from 'react'
import { ESTATUSRECOLECCION, IActualizarEstadoRecoleccion, IRecoleccion, } from '../interfaces/IRecoleccionEntrega'
import { api_getRecoleccion, api_updateRecoleccion, api_deleteRecoleccion } from '../api/api_recoleccion/api_recoleccionentrega'
import ConfirmDialog from '../shared/confirmDialog/ConfirmDialog'

import * as f from './util.js'
const Home = () => {
  const [id, setId] = useState(0);
  const [estado, setEstado] = useState<ESTATUSRECOLECCION>(ESTATUSRECOLECCION.CREADA)
  const [recolecciones, setRecolecciones] = useState<IRecoleccion[]>([])

  const obtenerRecolecciones = async () => {
    const resultado = await api_getRecoleccion()
    if (resultado !== null) {
      setRecolecciones(resultado)
    }
  }

  const currencyFormatter = (value: string) => {
    const valor = Number(value)
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency: 'GTQ'
    })
    return formatter.format(valor)
  }
  const dateFormatter = (fecha: Date) => {
    const date = new Date(fecha);
    const formattedDateTime = date.toLocaleString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });


    return formattedDateTime;

  }
  const costoEnvio = (valor1: string, valor2: string) => {
    let value = Number(valor1) - Number(valor2);
    if (value < 0) {
      value = 0;
    }
    return currencyFormatter(value.toString())

  }
  const handlerDeleteButton = (id: number) => {
    setId(id)
  }


  const handlerEliminar = () => {
    eliminarRecoleccion(id);
  }
  const eliminarRecoleccion = async (id: number) => {
    const resp= await api_deleteRecoleccion(id)
    if(resp !=null){
      if(resp.status===200){

        const newrecoleccion=recolecciones.filter(m=>m.id!=id);
        setRecolecciones(newrecoleccion)
      }
    }

  }
  const onChangeStatus = (id: number, estado: ESTATUSRECOLECCION) => {

    const r = recolecciones.map((d) => {
      if (d.id === id) {

        return {
          ...d,
          estado: estado


        }
      }
      return d;
    });

    setRecolecciones(r)
    //actualizar estado de recoleccion
    actualizarEstado(id, estado)
  }
  const actualizarEstado = async (id: number, estado: ESTATUSRECOLECCION) => {
    const recoleccion: IActualizarEstadoRecoleccion = {
      id: id,
      estado: estado
    }

    try {
      const respuesta = await api_updateRecoleccion(id, recoleccion);

    } catch (error) {
      f.mensaje("No se pudo actualizar el estado de la recoleccion " + error)
    }


  }
  useEffect(() => {
    obtenerRecolecciones();

  }, [])
  return (
    <>
      <div className="container-fluid">


        <p className="text-center h1 mt-2">Listado de recoleccion y entrega de paquetes</p>



        <h6>Muesta los datos  del usuario jngalicia</h6>
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
              <th scope="col">$ Monto Cobrar</th>
              <th scope="col">$ Envio</th>
              <th scope="col">$ Depositar</th>
              <th scope="col">Fecha Envio</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {recolecciones.map((m, i) => {
              return (
                <tr key={m.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{m.clienteEnvia.nombre + ' ' + m.clienteEnvia.apellido}</td>
                  <div className="vr"></div>
                  <td>{m.nombreRecibe}</td>
                  <td>{m.direccionEntrega}</td>
                  <td>{m.municipioRecibe.nombre}</td>
                  <div className="vr"></div>
                  <td>{currencyFormatter(m.montoCobrar)}

                  </td>
                  <td>{currencyFormatter(m.costoEnvio)}

                  </td>
                  <td>{costoEnvio(m.montoCobrar, m.costoEnvio)}

                  </td>
                  <td>{dateFormatter(m.fechaCreacion)}

                  </td>
                  <td>
                    <div>
                      <div className="form-check">

                        <input className="form-check-input" type="radio" name={`${m.id}`} id={`${m.id}-1`}

                          defaultChecked={m.estado === ESTATUSRECOLECCION.CREADA ? true : false}
                          onChange={(e) => onChangeStatus(m.id, ESTATUSRECOLECCION.CREADA)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          {ESTATUSRECOLECCION.CREADA}
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name={`${m.id}`} id={`${m.id}-2`}
                          defaultChecked={m.estado === ESTATUSRECOLECCION.RECOLECTADA ? true : false}
                          onChange={(e) => onChangeStatus(m.id, ESTATUSRECOLECCION.RECOLECTADA)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          {ESTATUSRECOLECCION.RECOLECTADA}
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name={`${m.id}`} id={`${m.id}-2`}
                          defaultChecked={m.estado === ESTATUSRECOLECCION.ENRUTA ? true : false}
                          onChange={(e) => onChangeStatus(m.id, ESTATUSRECOLECCION.ENRUTA)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          {ESTATUSRECOLECCION.ENRUTA}
                        </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="radio" name={`${m.id}`} id={`${m.id}-2`}
                          defaultChecked={m.estado === ESTATUSRECOLECCION.ENTREGADA ? true : false}
                          onChange={(e) => onChangeStatus(m.id, ESTATUSRECOLECCION.ENTREGADA)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          {ESTATUSRECOLECCION.ENTREGADA}
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name={`${m.id}`} id={`${m.id}-2`}
                          defaultChecked={m.estado === ESTATUSRECOLECCION.NORECIBIDA ? true : false}
                          onChange={(e) => onChangeStatus(m.id, ESTATUSRECOLECCION.NORECIBIDA)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          {ESTATUSRECOLECCION.NORECIBIDA}
                        </label>
                      </div>

                    </div>


                  </td>


                  <td>


                    <button className={`btn btn-danger ${m.estado !== ESTATUSRECOLECCION.CREADA && 'disabled'}  `}
                      onClick={() => handlerDeleteButton(m.id)}

                      data-bs-toggle="modal"
                      data-bs-target="#modalDialog"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>)
            })}



          </tbody>
        </table>



      </div>
      <ConfirmDialog handlerEliminar={handlerEliminar} ></ConfirmDialog>

    </>
  )
}

export default Home