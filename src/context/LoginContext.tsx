import { createContext, useEffect, useState } from "react";
import { IUser, IUserLogin } from "../pages/interfaces/iUser";
import { api_dataUser, api_login } from "../pages/api/api_auth/apiLogin";

export interface LoginContextProps{
userLogin:IUserLogin
handleLogin:(usuario:String,passwd:String)=>void,


}
interface props {
    children: JSX.Element | JSX.Element[]
}

const LoginContext = createContext<LoginContextProps>({} as LoginContextProps);

const u:String="";
const passwd:String=""

const user1: IUserLogin = {
    username: "admin",
    correo: "",
    estado: false,
    perfilUsuario: "EMPLEADO",
    logged: false,
    token:""
}

const LoginProvider= ({children}:props)=>{


  
    const [userLogin,setUser]=useState(user1)
    const handleLogin=async(usuario:String,passwd:String)=>{
        const resp = await api_login(usuario,passwd);
        if(resp?.status==201){
            const data = await resp.json().catch((error) => {
                console.log("error en fetch data", error);
              });
       
              const respUser =await api_dataUser(data.accessToken);
              if(respUser?.status==200){
                const dataUser = await respUser.json().catch((error) => {
                    console.log("error en fetch data", error);
                  });
                     
                //  let jsonObj = JSON.parse(dataUser);
                setUser({
                    ...userLogin,
                    logged: true,
                    estado:dataUser.estado,
                    username:dataUser.username,
                    perfilUsuario:dataUser.perfilUsuario,
                    token:data.accessToken
                  });
          
              }
        }else if(resp?.status==401){

            setUser({
                ...userLogin,
                logged: false
              });
       
        }
     
    }
 
    const data={handleLogin,userLogin}
    return (
        <LoginContext.Provider value={data}>{children}</LoginContext.Provider>

    );
}
export {LoginProvider}
export default LoginContext;