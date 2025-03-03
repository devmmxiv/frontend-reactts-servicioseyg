import { createContext, useEffect, useState } from "react";
import { IEmpleado } from "../pages/interfaces/IEmpleado";
import {  api_getEmpleadosTecnicos } from "../pages/api/api_empleado/apiempleado";


export interface EmpleadosContextProps{
    mensajeros:IEmpleado[];


}
interface props {
    children: JSX.Element | JSX.Element[]
}

const EmpleadosContext = createContext<EmpleadosContextProps>({} as EmpleadosContextProps);
const EmpleadosProvider= ({children}:props)=>{
    const [mensajeros,setMensajeros]=useState<IEmpleado[]>([])
    const listaMensajeros = async () => {
          
            const d = await api_getEmpleadosTecnicos();
    
            if(d !=null){
                setMensajeros(d)
     
    
            }
    
        }
        useEffect(() => {
 
            listaMensajeros();
       
            
          }, []);
    return (
        <EmpleadosContext.Provider value={{mensajeros}}>{children}</EmpleadosContext.Provider>

    );
}
export {EmpleadosProvider}
export default EmpleadosContext;