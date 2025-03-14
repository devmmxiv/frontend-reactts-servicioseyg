import React, { useEffect, useState } from 'react'
import { ESTATUSRECOLECCION, IActualizarEstadoRecoleccion, IRecoleccion, TIPOPAGO, } from '../interfaces/IRecoleccionEntrega'
import { api_getRecoleccion, api_updateRecoleccionEstado, api_deleteRecoleccion, api_updateRecoleccion, api_getRecoleccionPagination } from '../api/api_recoleccion/api_recoleccionentrega'
import ConfirmDialog from '../shared/confirmDialog/ConfirmDialog'

import * as f from './util.js'
import DetalleRecoleccion from './componentes/DetalleRecoleccion'
import { IMunicipio } from '../interfaces/iMunicipio'
import { IEmpleado } from '../interfaces/IEmpleado'
import { api_getEmpleados } from '../api/api_empleado/apiempleado'
import Pagination from '../shared/pagination/Pagination'
import { Table } from 'react-bootstrap'

const initEmpleado: IEmpleado = {
  id: 0,
  codigoEmpleado: '',
  nombre: '',
  apellido: '',
  telefono: '',
  estado: false
}
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
  //precioProducto: "",
  //costoEnvio: "",
  direccionEntrega: "",
  zonaEntrega: 1,
  estado: ESTATUSRECOLECCION.CREADA,
  tipoPago: TIPOPAGO.EFECTIVO,
  municipioRecibe: {
    id: 0
  },
  totalCobrar: '0',
  precioEnvio: '25.00',
  fechaCreacion: new Date(),
  isCerrada: false,
  empleadoAsignado: initEmpleado,
  empleadoEntrega: initEmpleado,
  empleadoRecolecta: initEmpleado
}
const Home = () => {
  const [id, setId] = useState(0);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('')
  const [idModal, setIdModal] = useState('')
  const [estado, setEstado] = useState<ESTATUSRECOLECCION>(ESTATUSRECOLECCION.CREADA)
  const [recolecciones, setRecolecciones] = useState<IRecoleccion[]>([])
  const [temporalRecolecciones, setTemporalRecolecciones] = useState<IRecoleccion[]>([])
  const [recoleccion, setRecoleccion] = useState<IRecoleccion>(init)
  const [disableInputoCostoPRoducto, setdisableCostoPRoducto] = useState(false);
  const [empleados, setEmpleados] = useState<IEmpleado[]>([initEmpleado]);
  const [currentPage,setCurrentPage]=useState(0)
  const [count,setCount]=useState(0)
  const [take,setTake]=useState(100)
  const [busqueda,setBusqueda]=useState("");
  const obtenerRecolecciones = async (take:number,page:number=1) => {
    const resultado = await api_getRecoleccionPagination(take,page)

    if (resultado !== null) {
      setTemporalRecolecciones(resultado.data);
      setRecolecciones(resultado.data)
      setCurrentPage(resultado.currentPage)
      setTake(take)
      setCount(resultado.count)

    }
  }
  const pagination=(page:number)=>{
   
    obtenerRecolecciones(take,page);
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
console.log("recoleccion a actualizar",r)
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
  const onChangePagaEnvio = (paga: boolean) => {
    /*  let t = 0
      if (paga) {
          t = Number(recoleccion.precioProducto) + Number(recoleccion.costoEnvio)
      } else {
          t = Number(recoleccion.precioProducto)
      }
  
      setRecoleccion({
          ...recoleccion,
       //   clienteRecibePagaEnvio: paga,
          totalCobrar: t
  
      });
  */

  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setRecoleccion({
      ...recoleccion,
      [e.target.name]: e.target.value
    });


  }
  const onChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {

    setRecoleccion({
      ...recoleccion,
      totalCobrar: e.target.value
    });
    /*
        let t = 0;
        if (e.target.name === 'costoEnvio') {
    
          t =Number(recoleccion.precioProducto);
    
          setRecoleccion({
            ...recoleccion,
            costoEnvio: e.target.value,
            totalCobrar: t
          });
    
    
    
        } else {
          t = Number(e.target.value)
          setRecoleccion({
            ...recoleccion,
            precioProducto: e.target.value,
            totalCobrar: t
          });
        }
    */
  }
  const updateRecoleccion = () => {
    if (recoleccion.id > 0) {
      const r = recolecciones.map((d) => {
        if (d.id === recoleccion.id) {
          return {
            ...d,
            nombreRecibe: recoleccion.nombreRecibe,
            apellidoRecibe: recoleccion.apellidoRecibe,
            direccionEntrega: recoleccion.direccionEntrega,
            municipioRecibe: recoleccion.municipioRecibe,
            tipoPago: recoleccion.tipoPago,
            // precioProducto: recoleccion.precioProducto,
            totalCobrar: recoleccion.totalCobrar,
            precioEnvio: recoleccion.precioEnvio,
            // costoEnvio: recoleccion.costoEnvio
            zonaEntrega: recoleccion.zonaEntrega,
            estado: recoleccion.estado,
            empleadoAsignado: recoleccion.empleadoAsignado
          }

        }
 
        return d;
      });


   
      actualizarRecoleccion(recoleccion.id, recoleccion);
      setRecolecciones(r.filter(r=>r.estado!=ESTATUSRECOLECCION.ENTREGADA))
    }

  }

  const actualizarRecoleccion = async (id: number, recoleccion: IRecoleccion) => {
    try {

      const respuesta = await api_updateRecoleccion(id, recoleccion);
     

    } catch (error) {
      f.mensaje("No se pudo actualizar el estado de la recoleccion " + error)
    }

  }

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if (e.target.name === 'municipioRecibe') {
      const m: IMunicipio = { id: Number(e.target.value), nombre: e.target[e.target.selectedIndex].textContent?.toString() }
      setRecoleccion({ ...recoleccion, municipioRecibe: m })
    } else if ((e.target.name === 'empleadoAsignado')) {
      const id = Number(e.target.value);
      const em = empleados.find((x) => {
        if (x.id == id) {
          return x;
        }
      });

      setRecoleccion({ ...recoleccion, empleadoAsignado: { id: em?.id, nombre: em?.nombre, apellido: em?.apellido } })
    } else if ((e.target.name === 'estado')) {

      switch (e.target.value) {
        case ESTATUSRECOLECCION.CREADA: {
          setRecoleccion({ ...recoleccion, estado: ESTATUSRECOLECCION.CREADA })
          break;
        }
        case ESTATUSRECOLECCION.ENRUTA: {

          setRecoleccion({ ...recoleccion, estado: ESTATUSRECOLECCION.ENRUTA })
          break;
        }
        case ESTATUSRECOLECCION.ENTREGADA: {
          setRecoleccion({ ...recoleccion, estado: ESTATUSRECOLECCION.ENTREGADA })
          break;
        }
        case ESTATUSRECOLECCION.RECOLECTADA: {
          setRecoleccion({ ...recoleccion, estado: ESTATUSRECOLECCION.RECOLECTADA })
          break;
        }
        case ESTATUSRECOLECCION.NORECIBIDA: {
          setRecoleccion({ ...recoleccion, estado: ESTATUSRECOLECCION.NORECIBIDA })
          break;
        }


      }


    }
    else {

      if (e.target.value === TIPOPAGO.YAPAGADO) {

        setdisableCostoPRoducto(true);
        setRecoleccion({
          ...recoleccion,
          [e.target.name]: e.target.value,
          totalCobrar: '0.00'
        });
      }
      else {
        setdisableCostoPRoducto(false);
        setRecoleccion({
          ...recoleccion,
          [e.target.name]: e.target.value,

        });
      }



    }
  }
  const filtro = () => {

    const filtroRecolecciones = temporalRecolecciones.filter(
      c => {
        return (
          c.empleadoAsignado.nombre!
            .toLowerCase()
            .includes(busqueda.toLowerCase()) ||
          c
            .empleadoAsignado.apellido!
            .toLowerCase()
            .includes(busqueda.toLowerCase())
        );
      }
    );

    if (busqueda.length == 0) {
      setRecolecciones(temporalRecolecciones);
    } else {

      setRecolecciones(filtroRecolecciones);
    }

  }
  useEffect(() => {
    obtenerRecolecciones(take,1);
    const listarEmpleados = async () => {
      const data = await api_getEmpleados();
      setEmpleados(data);
    }
    listarEmpleados();

  }, [])
  return (
    <>
      <div className="container-fluid">

        <p className="text-center h1 mt-2">Listado de entrega de paquetes</p>
        <div className="row">
                    <div className="col">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Buscar por mensajero</span>
                        <input type="text" id="firstname" aria-label="First name"
                          value={busqueda}
                          name='nombre'
                          className="form-control"
                          onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <button
                          className="btn btn-warning"
                          style={{ marginRight: 5 }}


                          onClick={(e) => filtro()}

                        >
                          <i className="bi bi-pencil-square">Buscar</i>
                        </button>

                      </div>
                    </div>
                    <div className="col">

                    </div>

                  </div>
        <h6>Muestra los datos </h6>
        <Table striped bordered hover>
          <thead >
            <tr>
              <th >#</th>
              <th   > Cliente Envia</th>
              
              <th scope="col">Persona Recibe</th>
              <th scope="col">Direccion Persona Recibe</th>
              <th scope="col">Municipio</th>
          
              <th scope="col">Forma de Pago</th>
              <th scope="col">$ Monto Cobrar</th>
              <th scope="col">$ Precio Envio</th>
          

              <th scope="col">Fecha </th>
              <th scope="col">Estado</th>
              <th scope="col">Mensajero</th>
              <th scope="col">Operacion</th>
            </tr>
          </thead>
          <tbody style={{fontSize:14}}>
            {recolecciones && recolecciones.length > 0}
            
            {recolecciones.map((m, i) => {
              return (
                <tr key={m.id}>
                  <td >{i + 1}</td>
                  <td>{m.clienteEnvia.nombre + ' ' + m.clienteEnvia.apellido}</td>
                
                  <td>{m.nombreRecibe + ' ' + m.apellidoRecibe}</td>
                  <td>{m.direccionEntrega}</td>
                  <td>{m.municipioRecibe.nombre}</td>
              
                  <td>{m.tipoPago}</td>
                  <td>{currencyFormatter(m.totalCobrar.toString())} </td>
                  <td>{currencyFormatter(m.precioEnvio.toString())}
                  </td>
                

                  <td>{dateFormatter(m.fechaCreacion)}

                  </td>

                  <td >{m.estado}</td>
                  <td>{m.empleadoAsignado.nombre + ' ' + m.empleadoAsignado.apellido}</td>

                  <td>
                    <div className="row">
                      <div className="col-6"> <div className='mb-1'>       <button className={`btn btn-warning ${m.estado === ESTATUSRECOLECCION.ENTREGADA && 'enable'}  `}
                      onClick={() => handlerEditButton(m)}
                
                      data-bs-toggle="modal"
                      data-bs-target="#modalUpdateRecoleccion"
                    >
                      <i className="bi bi-card-list " style={{fontSize:8}}></i>
                    </button></div></div>
                      <div className="col">
                      <div>
                      <button className={`btn btn-danger ${m.estado !== ESTATUSRECOLECCION.CREADA && 'disabled'}  `}
                        onClick={() => handlerDeleteButton(m.id)}

                        data-bs-toggle="modal"
                        data-bs-target="#modalDialog"
                      >
                        <i className="bi bi-trash3" style={{fontSize:8}} ></i>
                      </button></div>
                      </div>
                    </div>

                   

                    

                  </td>
                </tr>)
            })}
            
           


          </tbody>
        </Table>
        {(recolecciones && recolecciones.length > 100 ) ? 
        <nav aria-label="...">
            <Pagination
             currentPage={currentPage}
             count={count}
             take={take}
            onPageChange={pagination}
      />
</nav>  :""
        }
      
      </div>
      <ConfirmDialog mensaje={mensajeConfirmacion} handlerConfirmacion={handlerConfirmacion} idModal={idModal}></ConfirmDialog>
      <DetalleRecoleccion
        disableInputoCostoPRoducto={disableInputoCostoPRoducto}
        recoleccion={recoleccion}
        onChange={onChange}
        updateRecoleccion={updateRecoleccion}
        onSelect={onSelect}
        onChangeTotal={onChangeTotal}
        onChangePagaEnvio={onChangePagaEnvio}
        empleados={empleados}></DetalleRecoleccion>
    </>
  )
}

export default Home