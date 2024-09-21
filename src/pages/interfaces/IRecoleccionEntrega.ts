import { ICliente } from "./ICliente";
import { IDireccion } from "./IDireccion";
import { IMunicipio } from "./iMunicipio";

export interface IRecoleccionEntrega{
    id?:number;

    nombreRecibe:string;


    apellidoRecibe: string;

    telefonoRecibe: string;

    montoCobrar: number;
    costoEnvio:number;
    direccionEntrega: string;
    

    estado: ESTATUSRECOLECCION;

    clienteEnvia: number;


    direccionClienteEnvia:number;



    municipioRecibe:number;

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