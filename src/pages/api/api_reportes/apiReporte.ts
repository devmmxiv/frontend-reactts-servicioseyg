const API =process.env.REACT_APP_API;
export const get_reporte = async (idCierre:number) => {
    try{
    
        const resp = await fetch(`${API}/reports/cierre/${idCierre}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/pdf",
        
        },
      
      });
       return resp;
 

    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };