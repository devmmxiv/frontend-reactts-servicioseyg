
import { IActualizarEstadoRecoleccion, IRecoleccion, IRecoleccionEntrega } from "../../interfaces/IRecoleccionEntrega";
import Recoleccion from "../../recoleccion/Recoleccion";

const API =process.env.REACT_APP_API;
export const api_recoleccion = async (recoleccion:IRecoleccionEntrega) => {
    try{
    
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
      return resp;
    
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

  export const api_updateRecoleccionEstado = async (id: number, recoleccion: IActualizarEstadoRecoleccion) => {
    try{
 
        const resp = await fetch(`${API}/recoleccion-entrega/update/estado/${recoleccion.id}`, {
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
  export const api_updateRecoleccion = async (id: number, recoleccion: IRecoleccion) => {
    try{

        const resp = await fetch(`${API}/recoleccion-entrega/update/${recoleccion.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(  
        recoleccion
        )
      });
      if(resp.ok){
        const data = await resp.json().catch((error) => {
          console.log("error en fetch data", error);
        });
        console.log('datos del apiiiii',data)

      }
      return resp;

    }catch(error){
        console.log("Error en fetch",error)
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
  export const api_getDatosCierre=async()=>{
    try{
     
        const resp = await fetch(`${API}/recoleccion-entrega/datoscierre`, {
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
  }
  export const api_getRecoleccionesEstado=async()=>{
    try{
     
        const resp = await fetch(`${API}/recoleccion-entrega/recoleccionesestado`, {
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
  }
  export const api_RealizarCierre = async () => {
    try{
    
        const resp = await fetch(`${API}/recoleccion-entrega/realizarcierre`, {
        method: "UPDATE",
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
  export const api_getRecoleccioneToCierre=async()=>{
    try{
     
        const resp = await fetch(`${API}/recoleccion-entrega/listadorecoleccionescierre`, {
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
  }