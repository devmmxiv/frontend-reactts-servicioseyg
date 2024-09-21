import { ICliente } from "../../interfaces/ICliente";

const API =process.env.REACT_APP_API;
export const api_createCliente = async (client:ICliente) => {
    try{
     
        const resp = await fetch(`${API}/cliente`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(  
        client
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