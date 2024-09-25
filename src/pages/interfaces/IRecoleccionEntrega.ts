import { ICliente } from "./ICliente";
import { IDireccion } from "./IDireccion";
import { IMunicipio } from "./iMunicipio";

export interface IRecoleccionEntrega{
    id?:number;

    nombreRecibe:string;


    apellidoRecibe: string;

    telefonoRecibe: string;

    montoCobrar: string;
    costoEnvio:string;
    direccionEntrega: string;
    

    estado: ESTATUSRECOLECCION;
    tipoPago:TIPOPAGO;

    clienteEnvia: number;


    direccionClienteEnvia:number;



    municipioRecibe:number;
    total:number;

}
export interface IRecoleccion{
    clienteEnvia: ICliente;
    id:number;
    nombreRecibe:string;
    apellidoRecibe: string;
    telefonoRecibe: string;
    montoCobrar: string;
    costoEnvio:string;
    direccionEntrega: string;
    estado: ESTATUSRECOLECCION;
    tipoPago:TIPOPAGO;
    municipioRecibe:IMunicipio;
    total:number;
    fechaCreacion:Date;
}
export interface IActualizarEstadoRecoleccion{
  
    id:number;
    estado: ESTATUSRECOLECCION;

}
export enum ESTATUSRECOLECCION {
    CREADA='CREADA',
    RECOLECTADA='RECOLECTADA',
    ENRUTA='EN RUTA',
    ENTREGADA='ENTREGADA',
    NORECIBIDA='NO RECIBIDA'
   
   
}
export enum TIPOPAGO {
    EFECTIVO='EFECTIVO',
    TRANSFERENCIA='TRANSFERENCIA',
    TARJETA='TARJETA',
    YAPAGADO='YA PAGADO',


}