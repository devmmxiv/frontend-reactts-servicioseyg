import { ICuentaBancaria } from "./ICuentaBancaria";
import { IDireccion } from "./IDireccion";


export interface ICliente{
    id:number;
    codigoCliente:string;
    nombre:string;
    apellido:string;
    nombrePagina:string;
    telefono:string;
    estado:boolean;
    direcciones:IDireccion[];
    cuentas:ICuentaBancaria[];
}