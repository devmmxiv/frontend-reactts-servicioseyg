import { useEffect, useState } from "react"
import ModalCliente from "./Modal_Cliente"
import { IDireccion, ETipoDireccion } from "../interfaces/IDireccion"
import { ICliente } from "../interfaces/ICliente"
import { ETipoCuentaBancaria, ICuentaBancaria } from "../interfaces/ICuentaBancaria"

import { api_createCliente, api_getClientes, api_updateCliente } from '../api/api_cliente/apiclientes'
import * as f from './functions'
import { api_newUser } from "../api/api_user/apiUser"
import { useLogin } from "../hooks/useLogin"
import TableCliente from "./TableCliente"
import { useCliente } from "../hooks/useCliente"
import { CrudClienteProvider } from "../../context/CrudClientesContext"



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
 
  const [listaClientes, setListaClientes] = useState<ICliente[]>([])
  const [temporalClientes, setTemporalClientes] = useState<ICliente[]>([])
  const [cliente, setCliente] = useState<ICliente>(initCliente)
  const [update, setUpdate] = useState(false)
  const [busqueda, setBusqueda] = useState("");


  const { userLogin } = useLogin()
  const {clientes }=useCliente();



  const onClickeAgregar = (c: ICliente, opcion: boolean) => {

    if (opcion) {
      setCliente(c)
    } else {
      setCliente(initCliente)
    }
    setUpdate(opcion);

  }


  const onSaveChanges = async () => {

    if (!update) {
      //primero creamos el usaurio

      const a = cliente.nombre.charAt(0);
      const b = cliente.apellido.split(" ");
      const apellido = b[0];
      const username = a + apellido;
      setCliente({ ...cliente, })
      const respuser = await api_newUser(userLogin.token, username.toLowerCase())
      if (respuser?.status) {
        const resp = await api_createCliente(cliente);
        f.alerta('Cliente Creado con Exito')
        setCliente(initCliente)
      } else {
        f.alerta('No se pudo crear el cliente')
      }

    } else {

      const resp = await api_updateCliente(cliente.id, cliente);
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
 
    setListaClientes(clientes);
   // setTemporalClientes(clientes)
  
  }
  const filtro = () => {

    const filtroClientes = temporalClientes.filter(
      c => {
        return (
          c
            .nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase()) ||
          c
            .apellido
            .toLowerCase()
            .includes(busqueda.toLowerCase())
        );
      }
    );

    if (busqueda.length == 0) {
      setListaClientes(clientes);
    } else {

      setListaClientes(filtroClientes);
    }

  }
  useEffect(() => {

    listarClientes()

  }, [clientes])



  return (
    <>
      <div className="flex-container mt-4">
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
                <div>
                  <div className="row">
                    <div className="col">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Busqueda</span>
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


                </div>
                
            
              <TableCliente clientes={listaClientes}></TableCliente>
          
                
                {/**  <table className="table  table-striped table-hover caption-top">
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
                </table>*/}
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
