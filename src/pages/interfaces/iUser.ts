import { IDireccion } from "./IDireccion";
import { IMunicipio } from "./iMunicipio";

export interface IUser{
    id:number;
    codigo:string;
    usuario:string;
    nombre:string;
    apellido:string;
    telefono:string;
    direccion:IDireccion;

    
    isCliente:Boolean;
   
}
export interface IUserLogin{

    username: string,
    correo: String,
    estado: Boolean,
    perfilUsuario: String,
    logged:Boolean
    token:String
}