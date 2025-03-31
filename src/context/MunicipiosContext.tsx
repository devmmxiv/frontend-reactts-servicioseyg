import { createContext, useEffect, useState } from "react";
import { IMunicipio } from "../pages/interfaces/iMunicipio";
import { getMunicipios } from "../pages/api/api_cliente/apiclientes";


export interface MunicipioContextProps{
    municipios:IMunicipio[];


}
interface props {
    children: JSX.Element | JSX.Element[]
}

const MunicipioContext = createContext<MunicipioContextProps>({} as MunicipioContextProps);





const MunicipioProvider= ({children}:props)=>{



    const [municipios,setMunicipios]=useState<IMunicipio[]>([])
    const listaMunicipioss = async () => {
          
            const d = await getMunicipios();
     
            if(d !=null){
              
                setMunicipios(d)
     
                //console.log("municipios"+d.length)
            }
    
        }
        useEffect(() => {
 
            listaMunicipioss();
       
            
          }, []);
    return (
        <MunicipioContext.Provider value={{municipios}}>{children}</MunicipioContext.Provider>

    );
}
export {MunicipioProvider}
export default MunicipioContext;