import { ICliente } from "../ICliente";
import { ETipoDireccion } from "../IDireccion";
import { IEmpleado } from "../IEmpleado";
import { ESTATUSRECOLECCION, IEntrega, IRecoleccion, TIPOPAGO } from "../IRecoleccionEntrega";

export const clienteInit: ICliente = {
    id: 0,
    codigoCliente: '',
    nombre: '',
    apellido: '',
    nombrePagina: '',
    telefono: '',
    estado: false,
    direcciones: [
        {
            id: 0,
            direccionCompleta: '',
            calle: 0,
            avenida: 0,
            zona: 0,
            tipoDireccion: ETipoDireccion.PRINCIPAL,
            municipio: {
                id: 0,
                nombre: ''
            }
        }
    ],
    cuentas: []
}
export const entregaInit:IEntrega={
  id: 0,
  clienteEnvia: {id:0},
  nombreRecibe: "",
  apellidoRecibe: "",
  telefonoRecibe: "",
  precioEnvio: "25.00",
  direccionEntrega: "",
  zonaEntrega: 0,
  estado: ESTATUSRECOLECCION.CREADA,
  tipoPago: TIPOPAGO.EFECTIVO,
  municipioRecibe:{
    id: 0
  },
  totalCobrar: "",
  fechaCreacion: new Date(),
  isCerrada: false,
  empleadoAsignado: {id:0}
}
export const recoleccionInit: IRecoleccion = {

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
  zona: 1,
  estado: ESTATUSRECOLECCION.CREADA,
  tipoPago: TIPOPAGO.EFECTIVO,
  municipioRecibe: {
    id: 0
  },
  totalCobrar: '0',
  precioEnvio: '25.00',
  fechaCreacion: new Date(),
  isCerrada: false,
  empleadoAsignado: {
    id:0
  },

}
