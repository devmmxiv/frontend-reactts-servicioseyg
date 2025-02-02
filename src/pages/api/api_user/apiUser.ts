const API =process.env.REACT_APP_API;
export const api_newUser = async (token:String,user:string) => {
    try{
        
        const headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
          const resp = await fetch(`${API}/usuario/createuser`, {
          method: "POST",
          mode: "cors",
          headers:headers,
          body: JSON.stringify(  
            {username:user,
                password:user,
                estado:false,
                correo:user+'@'+user+'.com'
            })
         
          
          
        });
       
  
       
        return resp;
      
      }catch(error){
          console.log("Erron en fetch CREATE USER",error)
      }
};
