import React, { useEffect, useState } from 'react'
import { ESTATUSRECOLECCION, IActualizarEstadoRecoleccion, IRecoleccion, TIPOPAGO, } from '../interfaces/IRecoleccionEntrega'
import { api_getRecoleccion, api_updateRecoleccionEstado, api_deleteRecoleccion, api_updateRecoleccion } from '../api/api_recoleccion/api_recoleccionentrega'
import ConfirmDialog from '../shared/confirmDialog/ConfirmDialog'

import * as f from './util.js'
import DetalleRecoleccion from './componentes/DetalleRecoleccion'
import { IMunicipio } from '../interfaces/iMunicipio'

const init: IRecoleccion = {

  clienteEnvia: {
    id: 0,
    codigoCliente: "",
    nombre: "",
    apellido: "",
    nombrePagina: "",
    telefono: "",
    estado: false,
    direcciones: [],
    cuentas: []
  },
  id: 0,
  nombreRecibe: "",
  apellidoRecibe: "",
  telefonoRecibe: "",
  montoCobrar: "",
  costoEnvio: "",
  direccionEntrega: "",
  estado: ESTATUSRECOLECCION.CREADA,
  tipoPago: TIPOPAGO.EFECTIVO,
  municipioRecibe: {
    id: 0
  },
  total: 0,
  fechaCreacion: new Date(),
  isCerrada: false
}
const Home = () => {
  const [id, setId] = useState(0);
  const [mensajeConfirmacion,setMensajeConfirmacion]=useState('')
  const [idModal,setIdModal]=useState('')
  const [estado, setEstado] = useState<ESTATUSRECOLECCION>(ESTATUSRECOLECCION.CREADA)
  const [recolecciones, setRecolecciones] = useState<IRecoleccion[]>([])
  const [recoleccion, setRecoleccion] = useState<IRecoleccion>(init)
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
    setMensajeConfirmacion('Seguro desea Eliminar El registro')
    setIdModal('modalDialog')
    setId(id)
  }
  const handlerEditButton = (r: IRecoleccion) => {

    setRecoleccion(r)
  }

  const handlerConfirmacion = () => {
    eliminarRecoleccion(id);
  }
  const eliminarRecoleccion = async (id: number) => {
    const resp = await api_deleteRecoleccion(id)
    if (resp != null) {
      if (resp.status === 200) {

        const newrecoleccion = recolecciones.filter(m => m.id != id);
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
      const respuesta = await api_updateRecoleccionEstado(id, recoleccion);

    } catch (error) {
      f.mensaje("No se pudo actualizar el estado de la recoleccion " + error)
    }


  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setRecoleccion({
      ...recoleccion,
      [e.target.name]: e.target.value
    });


  }
  const onChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {

    let t=0;
    if(e.target.name==='costoEnvio'){
     
        t= Number(e.target.value) + Number(recoleccion.montoCobrar);
       
        setRecoleccion({
            ...recoleccion,
            costoEnvio:e.target.value,
            total:t
        });



    }else{
        t= Number(e.target.value) +  Number(recoleccion.costoEnvio)
        setRecoleccion({
            ...recoleccion,
            montoCobrar:e.target.value,
            total:t
        });
    }

}
  const updateRecoleccion = () => {
    if (recoleccion.id > 0) {
      const total:number=Number(recoleccion.costoEnvio)+Number(recoleccion.montoCobrar);
      setRecoleccion({...recoleccion,total:total})

      const r = recolecciones.map((d) => {
        if (d.id === recoleccion.id) {
          return {
            ...d,
            nombreRecibe: recoleccion.nombreRecibe,
            apellidoRecibe: recoleccion.apellidoRecibe,
            direccionEntrega: recoleccion.direccionEntrega,
            municipioRecibe: recoleccion.municipioRecibe,
            tipoPago: recoleccion.tipoPago,
            total:total,
            montoCobrar:recoleccion.montoCobrar,
            costoEnvio:recoleccion.costoEnvio
          }

        }

        return d;
      });
      
      setRecolecciones(r)
      actualizarRecoleccion(recoleccion.id,recoleccion);
    }

  }
  
  const actualizarRecoleccion = async (id: number, recoleccion: IRecoleccion) => {
    try {
      const respuesta = await api_updateRecoleccion(id, recoleccion);
      console.log('respuesta',respuesta)

    } catch (error) {
      f.mensaje("No se pudo actualizar el estado de la recoleccion " + error)
    }

  }
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {


    if (e.target.name === 'municipioRecibe') {
      const m: IMunicipio = { id: Number(e.target.value), nombre: e.target[e.target.selectedIndex].textContent?.toString() }
      setRecoleccion({ ...recoleccion, municipioRecibe: m })
    } else {

      setRecoleccion({
        ...recoleccion,
        [e.target.name]: e.target.value
      });
    }
  }

  useEffect(() => {
    obtenerRecolecciones();

  }, [])
  return (
    <>
      <div className="container-fluid">

        <p className="text-center h1 mt-2">Listado de recoleccion y entrega de paquetes</p>

        <h6>Muesta los datos </h6>
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
              <th scope="col">Forma de Pago</th>
              <th scope="col">$ Monto Cobrar</th>
              <div className="vr"></div>
              <th scope="col">$ Costo Envio</th>
              <th scope="col">Fecha Envio</th>
              <th scope="col">Estado</th>
              <th scope="col">Operacion</th>
            </tr>
          </thead>
          <tbody>
            {recolecciones.map((m, i) => {
              return (
                <tr key={m.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{m.clienteEnvia.nombre + ' ' + m.clienteEnvia.apellido}</td>
                  <td className="vr"></td>
                  <td>{m.nombreRecibe + ' ' + m.apellidoRecibe}</td>
                  <td>{m.direccionEntrega}</td>
                  <td>{m.municipioRecibe.nombre}</td>
                  <td className="vr"></td>
                  <td>{m.tipoPago}</td>
                  <td>{currencyFormatter(m.montoCobrar)}

                  </td>
                  <td className="vr"></td>
                  <td>{currencyFormatter(m.costoEnvio)}

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

                    <div className='mb-1'>       <button className={`btn btn-warning ${m.estado === ESTATUSRECOLECCION.ENTREGADA && 'disabled'}  `}
                      onClick={() => handlerEditButton(m)}

                      data-bs-toggle="modal"
                      data-bs-target="#modalUpdateRecoleccion"
                    >
                      <i className="bi bi-card-list " ></i>
                    </button></div>

                    <div> 
                       <button className={`btn btn-danger ${m.estado !== ESTATUSRECOLECCION.CREADA && 'disabled'}  `}
                      onClick={() => handlerDeleteButton(m.id)}

                      data-bs-toggle="modal"
                      data-bs-target="#modalDialog"
                    >
                      <i className="bi bi-trash3"></i>
                    </button></div>

                  </td>
                </tr>)
            })}



          </tbody>
        </table>



      </div>
      <ConfirmDialog handlerConfirmacion={handlerConfirmacion} mensaje={"Seguro desea Eliminar El registro"} idModal='modalDialog' ></ConfirmDialog>
      <DetalleRecoleccion recoleccion={recoleccion} onChange={onChange} updateRecoleccion={updateRecoleccion} onSelect={onSelect} onChangeTotal={onChangeTotal} ></DetalleRecoleccion>
    </>
  )
}

export default Home