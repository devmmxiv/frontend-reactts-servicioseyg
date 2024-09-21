import { IBanco } from "./IBanco";

export interface ICuentaBancaria{
    id?:number;
    numeroCuenta:number;
    tipoCuenta:ETipoCuentaBancaria;
    banco:IBanco

}

export enum ETipoCuentaBancaria {
    MONETARIA='MONETARIA',
    AHORRO='AHORRO',
   
}