import { ICierre } from "../../interfaces/ICierre";


const API =process.env.REACT_APP_API;
export const api_createCierre = async (cierre:ICierre) => {
    try{
     
        const resp = await fetch(`${API}/cierre`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(  
          cierre
        )
      });


      return resp;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
};


export const get_cierres = async () => {
  try{
  
      const resp = await fetch(`${API}/cierre`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      
      },
    
    });
    if(resp.status===200){
      const data = await resp.json().catch((error) => {
        console.log("error en fetch data", error);
      });
      return data;
    }
    return [];


  
  }catch(error){
      console.log("Erron en fetch",error)
  }
};