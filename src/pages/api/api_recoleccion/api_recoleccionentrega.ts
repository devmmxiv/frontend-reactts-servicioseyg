
import { IActualizarEstadoRecoleccion, IRecoleccion, IRecoleccionEntrega } from "../../interfaces/IRecoleccionEntrega";
import Recoleccion from "../../recoleccion/Recoleccion";

const API =process.env.REACT_APP_API;
export const api_recoleccion = async (recoleccion:IRecoleccionEntrega) => {
    try{
      console.log('datos del api',recoleccion)
        const resp = await fetch(`${API}/recoleccion-entrega`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(  
        recoleccion
        ),
      });
      const data = await resp.json().catch((error) => {
        console.log("error en fetch data", error);
      });
      return data;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };
  export const api_getRecoleccion = async () => {
    try{
  
        const resp = await fetch(`${API}/recoleccion-entrega`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
       
      });
      const data = await resp.json().catch((error) => {
        console.log("error en fetch data", error);
      });
      return data;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };

  export const api_updateRecoleccion = async (id: number, recoleccion: IActualizarEstadoRecoleccion) => {
    try{
      console.log('datos del api',recoleccion)
        const resp = await fetch(`${API}/recoleccion-entrega/${recoleccion.id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(  
        recoleccion
        ),
      });
      const data = await resp.json().catch((error) => {
        console.log("error en fetch data", error);
      });
      return data;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };
  
  export const api_deleteRecoleccion = async (id: number) => {
    try{
  
        const resp = await fetch(`${API}/recoleccion-entrega/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        
      });
      const data = await resp.json().catch((error) => {
        console.log("error en fetch data", error);
      });
      return resp;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };