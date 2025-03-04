const API =process.env.REACT_APP_API;
export const get_reporte = async (idCierre:number,idCliente:number) => {
    try{
    
        const resp = await fetch(`${API}/reports/cierre/${idCierre}/${idCliente}`, {
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
  export const get_reportecierreempleado = async (idCierre:number,idEmpleado:number) => {
    try{
    
        const resp = await fetch(`${API}/reports/cierreporempleado/${idCierre}/${idEmpleado}`, {
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
  export const get_reporteMenusal = async (idCliente:number,fechaInicio:String) => {
    try{
    
        const resp = await fetch(`${API}/reports/cierrecliente/${idCliente}/${fechaInicio}`, {
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