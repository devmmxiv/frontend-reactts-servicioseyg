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
  export const api_updateCliente = async (client:ICliente) => {
    try{
     
        const resp = await fetch(`${API}/cliente`, {
        method: "PUT",
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
  export const api_getClientes = async () => {
    try {
     
        const resp = await fetch(`${API}/cliente`);
     
        if (resp.ok) {
     
            const data = await resp.json().catch((error) => {
                console.log("error en fetch data", error);
            });
  
            return data;
        } else {
            return resp;
        }


    } catch (error) {
        console.log("Erron en fetch", error)
    }
};
export  const api_getpartialdata=async()=>{
  try {
     
    const resp = await fetch(`${API}/cliente/getallactive`);
 
    if (resp.ok) {
 
        const data = await resp.json().catch((error) => {
            console.log("error en fetch data", error);
        });

        return data;
    } else {
        return resp;
    }


} catch (error) {
    console.log("Erron en fetch", error)
}
}
export const getMunicipios = async () => {
    try {
     
        const resp = await fetch(`${API}/municipio`);
     
        if (resp.ok) {
     
            const data = await resp.json().catch((error) => {
                console.log("error en fetch data", error);
            });
  
            return data;
        } else {
            return resp;
        }


    } catch (error) {
        console.log("Erron en fetch", error)
    }
};
