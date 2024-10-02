import { IRecoleccion } from "./IRecoleccionEntrega";

export interface ICierre{
    id:number;
    fechaCierre?:Date;
    cantidad?:number;
   recolecciones?:IRecoleccion[]
}