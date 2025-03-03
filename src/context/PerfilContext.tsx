import { createContext, useEffect, useState } from "react";
import { IUser, IUserLogin } from "../pages/interfaces/iUser";

import {  api_perfil_cliente, api_perfil_empleado } from "../pages/api/api_auth/apiPerfil";
import { ETipoDireccion, IDireccion } from "../pages/interfaces/IDireccion";

export interface PerfilContextProps{
perfil:IUser
handlePerfil:(userLogin:IUserLogin)=>void,


}
interface props {
    children: JSX.Element | JSX.Element[]
}

const PerfilContext = createContext<PerfilContextProps>({} as PerfilContextProps);



const perfilInicial: IUser = {
    id: 0,
    codigo:'000',
    usuario: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: {
        id: 1,
        direccionCompleta: '',
        calle: 0,
        avenida: 0,
        zona: 0,
        tipoDireccion: ETipoDireccion.PRINCIPAL,
        municipio: {
            id: 1,
            nombre: 'Amatitlan',
          
        },
    },
   
    isCliente:false
}
const direccionInicial:IDireccion={
    id: 0,
    direccionCompleta: "",
    calle: 0,
    avenida: 0,
    zona: 0,
    tipoDireccion: ETipoDireccion.PRINCIPAL,
    municipio: {
        id: 0
    }
}

const PerfilProvider= ({children}:props)=>{

    const [direcciones,setDirecciones]=useState<IDireccion[]>([])

    const [perfil,setPerfil]=useState(perfilInicial)
    const handlePerfil=async(userLogin:IUserLogin)=>{
        if(userLogin.perfilUsuario=='EMPLEADO'){
            const resp = await api_perfil_empleado(userLogin.username);
            if(resp?.status == 200){
                const data = await resp.json().catch((error) => {
                    console.log("error en fetch data", error);
                  });
               
                try{ setPerfil({...perfil,id:data.id,
                     usuario:userLogin.username,
                     codigo:data.codigoEmpleado,
                     nombre:data.nombre,
                     apellido:data.apellido,
                     isCliente:false
               
                  })
                    if(data.direcciones.lenght>0){
                        setDirecciones(data.direcciones);
                        const dp=direcciones.find(x=>x.tipoDireccion=='PRINCIPAL')
                        console.log('direccion principal',dp)
                        setPerfil({...perfil,direccion:dp!})
                        
                    }else{
                        console.log('no hay direcciones')

                    }

      
             //setUsuario({ ...usuario,direccion:{...usuario.direccion,municipio:m}})
                      
                }catch(e){
                    console.log('error en obtener el perfil del empleado',e)
                }
            }
       

        }else{
            const resp = await api_perfil_cliente(userLogin.username);
            if(resp?.status == 200){
                const data = await resp.json().catch((error) => {
                    console.log("error en fetch data", error);
                  });
            
                try{ 
                    console.log('dataperfilcliente',data);
                    setPerfil({...perfil,id:data.id,
                        usuario:userLogin.username,
                        codigo:data.codigoCliente,
                     nombre:data.nombre,
                     apellido:data.apellido,
                     isCliente:true
               
                  })
                  setDirecciones(data.direcciones);
                   direcciones.map((x)=>{
                    if(x.tipoDireccion=='PRINCIPAL'){
                        setPerfil({...perfil,direccion:x})
                    }
                 
                   })

      
        
                      
                }catch(e){
                    console.log('error en obtener el perfil del empleado',e)
                }
            }
        }
        
     
    }
 
    const data={handlePerfil,perfil}
    return (
        <PerfilContext.Provider value={data}>{children}</PerfilContext.Provider>

    );
}
export {PerfilProvider}
export default PerfilContext;