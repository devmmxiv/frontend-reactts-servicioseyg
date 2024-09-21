import { IMunicipio } from "./iMunicipio";

export interface IDireccion{
    id:number;
    direccionCompleta:string;
    calle:number;
    avenida:number;
    zona:number;
    tipoDireccion:ETipoDireccion;
    municipio:IMunicipio
}
export enum ETipoDireccion{
    PRINCIPAL='PRINCIPAL',
    SECUNDARIA='SECUNDARIA',
}