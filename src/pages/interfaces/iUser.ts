import { IMunicipio } from "./iMunicipio";

export interface IUser{
    id:number;
    usuario:string;
    nombre:string;
    apellido:string;
    telefono:string;
    direccion:string;
    municipio:IMunicipio;

}