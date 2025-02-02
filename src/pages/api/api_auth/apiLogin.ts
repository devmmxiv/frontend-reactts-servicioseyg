const API =process.env.REACT_APP_API;
export const api_login = async (user:String,passwd:String) => {
    try{
        
        const resp = await fetch(`${API}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(  
        {username:user,
            password:passwd
        }
        
        ),
      });
      

     
      return resp;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };
  export const api_dataUser = async (token:String) => {
    try{

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
        const resp = await fetch(`${API}/auth/data-user`, {
        method: "GET",
        mode: "cors",
        headers:headers
       
        
        
      });
     

     
      return resp;
    
    }catch(error){
        console.log("Erron en fetch",error)
    }
  };