
const API =process.env.REACT_APP_API;
  export const api_perfil_cliente = async (usuario:String) => {
    try{
     
      const headers = new Headers({
        'Content-Type': 'application/json',

      })
        const resp = await fetch(`${API}/cliente/clientebyusernameforperfil/${usuario}`, {
        method: "GET",
        mode: "cors",
        headers:headers
      });
     

     
      return resp;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };
  export const api_perfil_empleado = async (usuario:String) => {
    try{
     
      const headers = new Headers({
        'Content-Type': 'application/json',

      })
        const resp = await fetch(`${API}/empleado/empleadobyusernameforperfil/${usuario}`, {
        method: "GET",
        mode: "cors",
        headers:headers
       
        
        
      });
     

     
      return resp;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };