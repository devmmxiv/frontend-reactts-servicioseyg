import {  useEffect, useState } from "react"
import ModalCliente from "./Modal_Cliente"
import { IDireccion, ETipoDireccion } from "../interfaces/IDireccion"
import { ICliente } from "../interfaces/ICliente"
import { ETipoCuentaBancaria, ICuentaBancaria } from "../interfaces/ICuentaBancaria"

import { api_createCliente, api_getClientes, api_updateCliente } from '../api/api_cliente/apiclientes'
import * as f from './functions'



const initCliente: ICliente = {
  nombre: '',
  id: 0,
  codigoCliente: "",
  apellido: "",
  nombrePagina: "",
  telefono: "",
  estado: true,
  direcciones: [

  ], cuentas: [

  ]

}


const Cliente = () => {
  const [status,setStatus]=useState(false)
  const [clientes, setClientes] = useState<ICliente[]>([])
  const [cliente, setCliente] = useState<ICliente>(initCliente)
  const [update, setUpdate] = useState(false)

  //alerta
  const [show, setShow] = useState(false)
  const [mensaje, setMensaje] = useState('')






  const onClickeAgregar = (c: ICliente, opcion: boolean) => {

    if (opcion) {
      setCliente(c)
    } else {
      setCliente(initCliente)
    }
    setUpdate(opcion);
   
  }
  const close=()=>{
    console.log('se agrega un evento al boton cerrar')
  }

  const onSaveChanges = async () => {
   
    if (!update) {

      const resp = await api_createCliente(cliente);
      f.alerta('Cliente Creado con Exito')
      setCliente(initCliente)
    } else {
 
      const resp = await api_updateCliente(cliente);
      f.alerta('Cliente Actualizado con Exito')
      setCliente(initCliente)
    }

    listarClientes();

  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });

  }

  /**MANEJADOR CUENTAS BANCARIAS */
  const ManejadorCuentas = (cuenta: ICuentaBancaria, accion: number) => {


    //1 agregar o actualizar
    //2 eliminar
    if (accion === 1) {
      if (cuenta.id === 0) {//es cuenta nueva la agrego al arreglo de cuentas
        const nCuentas = [...cliente.cuentas, cuenta]
        setCliente({
          ...cliente,
          cuentas: nCuentas
        })
      } else {
        const nCuentas = actualizarCuentas(cuenta);
        setCliente({
          ...cliente,
          cuentas: nCuentas
        })
      }



    } else { //se elimina la cuenta
      if (update) {//como es cliente existente se elimina de la base de datos y del array
        //llamar al api para eliminar en base de datos
      }
      const nCuentas = cliente.cuentas.filter(x => x.numeroCuenta != cuenta.numeroCuenta)
      setCliente({
        ...cliente,
        cuentas: nCuentas
      })
    }

  }
  const actualizarCuentas = (c: ICuentaBancaria) => {

    const cuentas = cliente?.cuentas?.map((d) => {
      if (d.id === c.id) {

        return {
          ...d,
          numeroCuenta: c.numeroCuenta,
          tipoCuenta: c.tipoCuenta,
          banco: c.banco

        }
      }
      return d;
    });
    return cuentas
  }
  /****************************************/
  /**MANEJADOR DIRECCIONES */
  const ManejadorDirecciones = (direccion: IDireccion, accion: number) => {
    console.log('manejador  DIRECCION accion', accion)

    //1 agregar o actualizar
    //2 eliminar
    if (accion === 1) {
      if (direccion.id === 0) {// direccion nueva la agrego al arreglo de cuentas

        //const d = cliente.direcciones.filter(x => x.tipoDireccion == direccion.tipoDireccion)
        //if (d.length > 0) {
        //  setMensaje(`Ya hay una direccion como ${direccion.tipoDireccion}`)
        //  toogle()
        //  return
        //}
        const nDirecciones = [...cliente.direcciones, direccion]

        setCliente({
          ...cliente,
          direcciones: nDirecciones
        })
      } else {
        const nDirecciones = actualizarDirecciones(direccion);
        setCliente({
          ...cliente,
          direcciones: nDirecciones
        })
      }



    } else { //se elimina la cuenta
      if (update) {//como es cliente existente se elimina de la base de datos y del array
        //llamar al api para eliminar en base de datos
      }
      const nDirecciones = cliente.direcciones.filter(x => x.id != direccion.id)
      setCliente({
        ...cliente,
        direcciones: nDirecciones
      })
    }

  }
  const actualizarDirecciones = (direccion: IDireccion) => {

    const cuentas = cliente?.direcciones?.map((d) => {
      if (direccion.id === d.id) {

        return {
          ...d,
          direccionCompleta: direccion.direccionCompleta,
          zona: direccion.zona,
          municipio: direccion.municipio,
          tipoDireccion: direccion.tipoDireccion
        }
      }
      return d;
    });
    return cuentas
  }
  /****************************************/
  const listarClientes = async () => {
    const data = await api_getClientes();

    setClientes(data)
  }
  useEffect(() => {


    listarClientes()
  }, [])

  //test modaltest
  const [showTest,setShowTest]=useState(false)
  const toogleTest=()=>{
    setShowTest(!showTest)
  }
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-12">
   
            <div className="card">
              <div className="card-header">
                <p className="text-center h1 mt-2">Catalogo de Clientes</p>
                <div className="row mt-4 ">
                  <div className="col-md-4">

                    <button
                     name="btnAgregar"
                      onClick={(e) => onClickeAgregar(initCliente, false)}
                      className="btn btn-success"
                      data-bs-toggle="modal" data-bs-target="#clienteModal"


                    >

                      <i className="bi bi-person-add m-2" ></i>Agregar
                    </button>

                  </div>
                </div>

              </div>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary"></h6>
                <table className="table  table-striped table-hover caption-top">
                  <caption>Listado de Clientes</caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Codigo de Cliente</th>
                      <th scope="col">Nombre </th>
                      <th scope="col">Apellido </th>
                      <th scope="col">Pagina </th>
                      <th scope="col">Telefono </th>
                      <th scope="col">Datos Cuenta Bancaria </th>
                      <th scope="col">Direccion - Municipio</th>

                      <th scope="col">Operaciones</th>

                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((m, i) => {
                      return (
                        <tr key={m.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{m.codigoCliente}</td>
                          <td>{m.nombre}</td>
                          <td>{m.apellido}</td>
                          <td>{m.nombrePagina}</td>

                          <td>{m.telefono}
                          </td>
                          <td>{
                            m.cuentas.map((c, i) => {
                              return (
                                <tr key={c.id}>


                                  <td >{c.numeroCuenta}</td>
                                  <td>-</td>
                                  <td>{c.tipoCuenta}</td>
                                  <td>-</td>
                                  <td>{c.banco.nombre}</td>
                                </tr>

                              )
                            })

                          }

                          </td>
                          <td>{
                            m.direcciones.map((c, i) => {
                              return (
                                <tr key={c.id}>


                                  <td >{c.direccionCompleta}</td>
                                  <td>-</td>
                                  <td>{c.municipio.nombre}</td>

                                </tr>

                              )
                            })

                          }

                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              style={{ marginRight: 5 }}

                              data-bs-toggle="modal" data-bs-target="#clienteModal"
                              onClick={(e) => onClickeAgregar(m, true)}

                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>

                            <button className="btn btn-danger"   >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>)
                    })}






                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>


      <ModalCliente  

      cliente={cliente} update={update} onChange={onChange}
        ManejadorCuenta={ManejadorCuentas}
        ManejadorDirecciones={ManejadorDirecciones}
        onSaveChanges={onSaveChanges}

      ></ModalCliente>
    </>

  )
}

export default Cliente
