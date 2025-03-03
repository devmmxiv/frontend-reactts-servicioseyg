import { ICliente, IClienteEnvia } from "./ICliente";
import { IDireccion } from "./IDireccion";
import { IEmpleado } from "./IEmpleado";
import { IMunicipio } from "./iMunicipio";

export interface IRecoleccionEntrega {
    id?: number;
    nombreRecibe: string;
    apellidoRecibe: string;
    telefonoRecibe: string;

   // precioProducto: string;
    precioEnvio: string;
    direccionEntrega: string;
    zonaEntrega:number,

    estado: ESTATUSRECOLECCION;
    tipoPago: TIPOPAGO;

    clienteEnvia: number;

    direccionEnvia:IDireccion;
    municipioEnvia:IMunicipio;
    clienteRecibePagaEnvio?:boolean;
    municipioRecibe: number;
    totalCobrar: string;
   
    empleadoAsignado:IEmpleado

}
export interface IRecoleccion {
    clienteEnvia: ICliente;
    id: number;
    nombreRecibe: string;
    apellidoRecibe: string;
    telefonoRecibe: string;
   // precioProducto: string;
   precioEnvio: string;
    direccionEntrega: string;
    zona:number,
    estado: ESTATUSRECOLECCION;
    tipoPago: TIPOPAGO;
    municipioRecibe: IMunicipio;
    totalCobrar: string;
    fechaCreacion: Date;
    isCerrada:boolean;
   // clienteRecibePagaEnvio?:boolean;
   empleadoRecolecta?:IEmpleado;
   empleadoEntrega?:IEmpleado;
   empleadoAsignado:IEmpleado;
    fechaRecoleccion?:Date;
    fechaEntrega?:Date;
}

export interface IRecoleccionResumenCierre {

    estado: ESTATUSRECOLECCION;
    cantidad: string;
}
export interface IActualizarEstadoRecoleccion {

    id: number;
    estado: ESTATUSRECOLECCION;

}
export enum ESTATUSRECOLECCION {
    CREADA = 'CREADA',
    RECOLECTADA = 'RECOLECTADA',
    ENRUTA = 'EN RUTA',
    ENTREGADA = 'ENTREGADA',
    NORECIBIDA = 'NO RECIBIDA'


}
export enum TIPOPAGO {
    EFECTIVO = 'EFECTIVO',
    TRANSFERENCIA = 'TRANSFERENCIA',
    TARJETA = 'TARJETA',
    YAPAGADO = 'YA PAGADO',


}

export interface IEntrega {
    id: number;
    clienteEnvia: IClienteEnvia;

    nombreRecibe: string;
    apellidoRecibe: string;
    telefonoRecibe: string;
   // precioProducto: string;
    precioEnvio: string;
    direccionEntrega: string;
    zonaEntrega:number,
    estado: ESTATUSRECOLECCION;
    tipoPago: TIPOPAGO;
    municipioRecibe: IMunicipio;
    totalCobrar: string;
    fechaCreacion: Date;
    isCerrada:boolean;
   // clienteRecibePagaEnvio?:boolean;

    empleadoAsignado:IEmpleado;
    fechaRecoleccion?:Date;
    fechaEntrega?:Date;

}